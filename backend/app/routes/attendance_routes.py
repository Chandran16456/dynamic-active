from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import admin_or_owner, require_roles
from app.database import get_db
from app.models import AttendanceRecord, AttendanceSession, StudentProfile, User
from app.schemas import (
    AttendanceBulkCreate,
    AttendanceRecordOut,
    AttendanceRecordUpdate,
    AttendanceSessionCreate,
    AttendanceSessionOut,
    AttendanceSessionUpdate,
)

router = APIRouter(prefix="/api/attendance", tags=["Attendance"])


@router.post("/sessions", response_model=AttendanceSessionOut)
def create_attendance_session(
    payload: AttendanceSessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    session = AttendanceSession(
        class_name=payload.class_name,
        session_title=payload.session_title,
        session_date=payload.session_date,
        created_by_id=current_user.id,
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


@router.get("/sessions", response_model=list[AttendanceSessionOut])
def list_attendance_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    query = db.query(AttendanceSession)

    if current_user.role == "admin":
        return query.order_by(AttendanceSession.session_date.desc()).all()

    if current_user.role == "teacher":
        return (
            query.filter(AttendanceSession.created_by_id == current_user.id)
            .order_by(AttendanceSession.session_date.desc())
            .all()
        )

    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        return []

    records = (
        db.query(AttendanceRecord)
        .filter(AttendanceRecord.student_id == profile.id)
        .all()
    )

    session_ids = [record.session_id for record in records]

    if not session_ids:
        return []

    return (
        query.filter(AttendanceSession.id.in_(session_ids))
        .order_by(AttendanceSession.session_date.desc())
        .all()
    )


@router.patch("/sessions/{session_id}", response_model=AttendanceSessionOut)
def update_attendance_session(
    session_id: int,
    payload: AttendanceSessionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    session = (
        db.query(AttendanceSession)
        .filter(AttendanceSession.id == session_id)
        .first()
    )

    if not session:
        raise HTTPException(status_code=404, detail="Attendance session not found.")

    if not admin_or_owner(current_user, session.created_by_id):
        raise HTTPException(
            status_code=403,
            detail="You cannot edit this attendance session.",
        )

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(session, key, value)

    db.commit()
    db.refresh(session)

    return session


@router.delete("/sessions/{session_id}")
def delete_attendance_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    session = (
        db.query(AttendanceSession)
        .filter(AttendanceSession.id == session_id)
        .first()
    )

    if not session:
        raise HTTPException(status_code=404, detail="Attendance session not found.")

    if not admin_or_owner(current_user, session.created_by_id):
        raise HTTPException(
            status_code=403,
            detail="You cannot delete this attendance session.",
        )

    db.query(AttendanceRecord).filter(
        AttendanceRecord.session_id == session.id
    ).delete()

    db.delete(session)
    db.commit()

    return {"message": "Attendance session deleted successfully."}


@router.get("/students/{class_name}")
def get_students_for_attendance(
    class_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    students = (
        db.query(StudentProfile)
        .filter(StudentProfile.class_name == class_name)
        .order_by(StudentProfile.full_name.asc())
        .all()
    )

    return students


@router.post(
    "/sessions/{session_id}/records",
    response_model=list[AttendanceRecordOut],
)
def mark_attendance_bulk(
    session_id: int,
    payload: AttendanceBulkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    session = (
        db.query(AttendanceSession)
        .filter(AttendanceSession.id == session_id)
        .first()
    )

    if not session:
        raise HTTPException(status_code=404, detail="Attendance session not found.")

    if not admin_or_owner(current_user, session.created_by_id):
        raise HTTPException(
            status_code=403,
            detail="You cannot mark attendance for this session.",
        )

    saved_records = []

    for item in payload.records:
        existing_record = (
            db.query(AttendanceRecord)
            .filter(
                AttendanceRecord.session_id == session_id,
                AttendanceRecord.student_name == item.student_name,
            )
            .first()
        )

        if existing_record:
            existing_record.status = item.status
            existing_record.notes = item.notes
            existing_record.marked_by_id = current_user.id
            saved_records.append(existing_record)
        else:
            record = AttendanceRecord(
                session_id=session_id,
                student_id=item.student_id,
                student_name=item.student_name,
                status=item.status,
                notes=item.notes,
                marked_by_id=current_user.id,
            )

            db.add(record)
            saved_records.append(record)

    db.commit()

    for record in saved_records:
        db.refresh(record)

    return saved_records


@router.get(
    "/sessions/{session_id}/records",
    response_model=list[AttendanceRecordOut],
)
def list_attendance_records(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    session = (
        db.query(AttendanceSession)
        .filter(AttendanceSession.id == session_id)
        .first()
    )

    if not session:
        raise HTTPException(status_code=404, detail="Attendance session not found.")

    if current_user.role == "admin":
        return (
            db.query(AttendanceRecord)
            .filter(AttendanceRecord.session_id == session_id)
            .order_by(AttendanceRecord.student_name.asc())
            .all()
        )

    if current_user.role == "teacher":
        if session.created_by_id != current_user.id:
            raise HTTPException(status_code=403, detail="You cannot view this session.")

        return (
            db.query(AttendanceRecord)
            .filter(AttendanceRecord.session_id == session_id)
            .order_by(AttendanceRecord.student_name.asc())
            .all()
        )

    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        return []

    return (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.session_id == session_id,
            AttendanceRecord.student_id == profile.id,
        )
        .all()
    )


@router.patch("/records/{record_id}", response_model=AttendanceRecordOut)
def update_attendance_record(
    record_id: int,
    payload: AttendanceRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    record = (
        db.query(AttendanceRecord)
        .filter(AttendanceRecord.id == record_id)
        .first()
    )

    if not record:
        raise HTTPException(status_code=404, detail="Attendance record not found.")

    session = (
        db.query(AttendanceSession)
        .filter(AttendanceSession.id == record.session_id)
        .first()
    )

    if not admin_or_owner(current_user, session.created_by_id):
        raise HTTPException(
            status_code=403,
            detail="You cannot edit this attendance record.",
        )

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(record, key, value)

    db.commit()
    db.refresh(record)

    return record
