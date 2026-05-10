from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import admin_or_owner, require_roles
from app.database import get_db
from app.models import Observation, User
from app.schemas import ObservationCreate, ObservationOut, ObservationUpdate

router = APIRouter(prefix="/api/observations", tags=["Observations"])


@router.post("", response_model=ObservationOut)
def create_observation(
    payload: ObservationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    observation = Observation(
        teacher_id=current_user.id,
        **payload.model_dump(),
    )

    db.add(observation)
    db.commit()
    db.refresh(observation)

    return observation


@router.get("", response_model=list[ObservationOut])
def list_observations(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    if current_user.role == "admin":
        return db.query(Observation).order_by(Observation.id.desc()).all()

    return (
        db.query(Observation)
        .filter(Observation.teacher_id == current_user.id)
        .order_by(Observation.id.desc())
        .all()
    )


@router.patch("/{observation_id}", response_model=ObservationOut)
def update_observation(
    observation_id: int,
    payload: ObservationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    observation = (
        db.query(Observation)
        .filter(Observation.id == observation_id)
        .first()
    )

    if not observation:
        raise HTTPException(status_code=404, detail="Observation not found.")

    if not admin_or_owner(current_user, observation.teacher_id):
        raise HTTPException(status_code=403, detail="You cannot edit this observation.")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(observation, key, value)

    db.commit()
    db.refresh(observation)

    return observation


@router.delete("/{observation_id}")
def delete_observation(
    observation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    observation = (
        db.query(Observation)
        .filter(Observation.id == observation_id)
        .first()
    )

    if not observation:
        raise HTTPException(status_code=404, detail="Observation not found.")

    if not admin_or_owner(current_user, observation.teacher_id):
        raise HTTPException(status_code=403, detail="You cannot delete this observation.")

    db.delete(observation)
    db.commit()

    return {"message": "Observation deleted successfully."}
