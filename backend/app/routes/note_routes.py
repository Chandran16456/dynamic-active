from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import admin_or_owner, require_roles
from app.database import get_db
from app.models import Note, StudentProfile, User
from app.schemas import NoteCreate, NoteOut, NoteUpdate

router = APIRouter(prefix="/api/notes", tags=["Notes"])


@router.post("", response_model=NoteOut)
def create_note(
    payload: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    note = Note(
        **payload.model_dump(),
        author_id=current_user.id,
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


@router.get("", response_model=list[NoteOut])
def list_notes(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher", "student")),
):
    query = db.query(Note)

    if current_user.role == "admin":
        return query.order_by(Note.id.desc()).all()

    if current_user.role == "teacher":
        return (
            query.filter(Note.author_id == current_user.id)
            .order_by(Note.id.desc())
            .all()
        )

    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == current_user.id)
        .first()
    )

    student_name = profile.full_name if profile else current_user.full_name

    return (
        query.filter(Note.target_name == student_name)
        .order_by(Note.id.desc())
        .all()
    )


@router.patch("/{note_id}", response_model=NoteOut)
def update_note(
    note_id: int,
    payload: NoteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found.")

    if not admin_or_owner(current_user, note.author_id):
        raise HTTPException(status_code=403, detail="You cannot edit this note.")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(note, key, value)

    db.commit()
    db.refresh(note)

    return note


@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found.")

    if not admin_or_owner(current_user, note.author_id):
        raise HTTPException(status_code=403, detail="You cannot delete this note.")

    db.delete(note)
    db.commit()

    return {"message": "Note deleted successfully."}
