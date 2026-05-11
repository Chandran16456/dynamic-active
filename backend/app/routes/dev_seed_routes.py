import os

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.auth.password_handler import hash_password
from app.database import get_db
from app.models import User

router = APIRouter(prefix="/api/dev", tags=["Dev Seed"])


DEMO_USERS = [
    {
        "full_name": "Admin User",
        "username": "admin",
        "email": "admin@dynamicactive.demo",
        "password": "admin123",
        "role": "admin",
    },
    {
        "full_name": "Elaine Borg",
        "username": "teacher",
        "email": "teacher@dynamicactive.demo",
        "password": "teacher123",
        "role": "teacher",
    },
    {
        "full_name": "Maya Student",
        "username": "student",
        "email": "student@dynamicactive.demo",
        "password": "student123",
        "role": "student",
    },
]


@router.post("/seed-demo-users")
def seed_demo_users(
    x_seed_secret: str | None = Header(default=None),
    db: Session = Depends(get_db),
):
    enable_demo_seed = os.getenv("ENABLE_DEMO_SEED", "false").lower() == "true"
    seed_secret = os.getenv("SEED_SECRET", "")

    if not enable_demo_seed:
        raise HTTPException(
            status_code=403,
            detail="Demo seeding is disabled.",
        )

    if not seed_secret or x_seed_secret != seed_secret:
        raise HTTPException(
            status_code=401,
            detail="Invalid seed secret.",
        )

    created_or_updated = []

    for item in DEMO_USERS:
        user = db.query(User).filter(User.username == item["username"]).first()

        if user:
            user.full_name = item["full_name"]
            user.email = item["email"]
            user.role = item["role"]
            user.is_active = True
            user.hashed_password = hash_password(item["password"])
            action = "updated"
        else:
            user = User(
                full_name=item["full_name"],
                username=item["username"],
                email=item["email"],
                hashed_password=hash_password(item["password"]),
                role=item["role"],
                is_active=True,
            )
            db.add(user)
            action = "created"

        created_or_updated.append(
            {
                "username": item["username"],
                "role": item["role"],
                "action": action,
            }
        )

    db.commit()

    return {
        "message": "Demo users seeded successfully.",
        "users": created_or_updated,
        "credentials": [
            {"role": "admin", "username": "admin", "password": "admin123"},
            {"role": "teacher", "username": "teacher", "password": "teacher123"},
            {"role": "student", "username": "student", "password": "student123"},
        ],
    }
