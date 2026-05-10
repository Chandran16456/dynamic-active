from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import admin_or_owner, require_roles
from app.database import get_db
from app.models import ScheduleItem, StudentProfile, User
from app.schemas import ScheduleItemCreate, ScheduleItemOut, ScheduleItemUpdate

router = APIRouter(prefix="/api/schedules", tags=["Schedules"])


@router.post("", response_model=ScheduleItemOut)
def create_schedule_item(
    payload: ScheduleItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    schedule_data = payload.model_dump()

    if current_user.role == "student":
        profile = (
            db.query(StudentProfile)
            .filter(StudentProfile.user_id == current_user.id)
            .first()
        )

        student_name = profile.full_name if profile else current_user.full_name

        schedule_data["target_role"] = "student"
        schedule_data["target_name"] = student_name

        if schedule_data["schedule_type"] not in ["task", "meeting", "support"]:
            schedule_data["schedule_type"] = "task"

    item = ScheduleItem(
        **schedule_data,
        created_by_id=current_user.id,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.get("", response_model=list[ScheduleItemOut])
def list_schedule_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    query = db.query(ScheduleItem)

    if current_user.role == "admin":
        return query.order_by(ScheduleItem.start_time.asc()).all()

    if current_user.role == "teacher":
        return (
            query.filter(
                (ScheduleItem.target_role.in_(["teacher", "all"]))
                | (ScheduleItem.created_by_id == current_user.id)
            )
            .order_by(ScheduleItem.start_time.asc())
            .all()
        )

    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    student_name = profile.full_name if profile else current_user.full_name

    return (
        query.filter(
            (ScheduleItem.target_role.in_(["student", "all"]))
            | (ScheduleItem.target_name == student_name)
            | (ScheduleItem.created_by_id == current_user.id)
        )
        .order_by(ScheduleItem.start_time.asc())
        .all()
    )


@router.patch("/{schedule_id}", response_model=ScheduleItemOut)
def update_schedule_item(
    schedule_id: int,
    payload: ScheduleItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    item = db.query(ScheduleItem).filter(ScheduleItem.id == schedule_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Schedule item not found.")

    if not admin_or_owner(current_user, item.created_by_id):
        raise HTTPException(status_code=403, detail="You cannot edit this schedule.")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    return item


@router.delete("/{schedule_id}")
def delete_schedule_item(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    item = db.query(ScheduleItem).filter(ScheduleItem.id == schedule_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Schedule item not found.")

    if not admin_or_owner(current_user, item.created_by_id):
        raise HTTPException(status_code=403, detail="You cannot delete this schedule.")

    db.delete(item)
    db.commit()

    return {"message": "Schedule item deleted successfully."}
