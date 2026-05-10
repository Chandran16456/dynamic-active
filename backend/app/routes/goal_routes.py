from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import admin_or_owner, require_roles
from app.database import get_db
from app.models import Goal, StudentProfile, User
from app.schemas import GoalCreate, GoalOut, GoalUpdate

router = APIRouter(prefix="/api/goals", tags=["Goals"])


@router.post("", response_model=GoalOut)
def create_goal(
    payload: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    goal = Goal(
        **payload.model_dump(),
        assigned_by_id=current_user.id,
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)

    return goal


@router.get("", response_model=list[GoalOut])
def list_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    query = db.query(Goal)

    if current_user.role == "admin":
        return query.order_by(Goal.id.desc()).all()

    if current_user.role == "teacher":
        return (
            query.filter(Goal.assigned_by_id == current_user.id)
            .order_by(Goal.id.desc())
            .all()
        )

    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    student_name = profile.full_name if profile else current_user.full_name

    return (
        query.filter(Goal.student_name == student_name)
        .order_by(Goal.id.desc())
        .all()
    )


@router.patch("/{goal_id}", response_model=GoalOut)
def update_goal(
    goal_id: int,
    payload: GoalUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found.")

    if current_user.role == "student":
        profile = (
            db.query(StudentProfile)
            .filter(StudentProfile.user_id == current_user.id)
            .first()
        )

        student_name = profile.full_name if profile else current_user.full_name

        if goal.student_name != student_name:
            raise HTTPException(status_code=403, detail="You cannot edit this goal.")

        allowed_student_updates = {}

        if payload.progress is not None:
            allowed_student_updates["progress"] = payload.progress

        if payload.status is not None:
            allowed_student_updates["status"] = payload.status

        for key, value in allowed_student_updates.items():
            setattr(goal, key, value)

        db.commit()
        db.refresh(goal)

        return goal

    if not admin_or_owner(current_user, goal.assigned_by_id):
        raise HTTPException(status_code=403, detail="You cannot edit this goal.")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(goal, key, value)

    db.commit()
    db.refresh(goal)

    return goal


@router.delete("/{goal_id}")
def delete_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found.")

    if not admin_or_owner(current_user, goal.assigned_by_id):
        raise HTTPException(status_code=403, detail="You cannot delete this goal.")

    db.delete(goal)
    db.commit()

    return {"message": "Goal deleted successfully."}
