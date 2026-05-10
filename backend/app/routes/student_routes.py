from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import require_roles
from app.database import get_db
from app.models import StudentProfile, User
from app.schemas import StudentProfileCreate, StudentProfileOut, StudentProfileUpdate

router = APIRouter(prefix="/api/students", tags=["Students"])


@router.post("", response_model=StudentProfileOut)
def create_student(
    payload: StudentProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    existing = (
        db.query(StudentProfile)
        .filter(StudentProfile.student_code == payload.student_code)
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Student code already exists.")

    student = StudentProfile(**payload.model_dump())

    db.add(student)
    db.commit()
    db.refresh(student)

    return student


@router.get("", response_model=list[StudentProfileOut])
def list_students(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    return db.query(StudentProfile).order_by(StudentProfile.id.desc()).all()


@router.get("/me", response_model=StudentProfileOut)
def get_my_student_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("student")),
):
    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(status_code=404, detail="Student profile not found.")

    return profile


@router.patch("/{student_id}", response_model=StudentProfileOut)
def update_student(
    student_id: int,
    payload: StudentProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(student, key, value)

    db.commit()
    db.refresh(student)

    return student


@router.delete("/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully."}
