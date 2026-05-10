from app.auth.password_handler import hash_password
from app.database import Base, SessionLocal, engine
from app.models import User


def seed_demo_users():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    demo_users = [
        {
            "full_name": "Admin User",
            "username": "admin",
            "email": "admin@dynamicactive.com",
            "password": "admin123",
            "role": "admin",
        },
        {
            "full_name": "Elaine Borg",
            "username": "teacher",
            "email": "teacher@dynamicactive.com",
            "password": "teacher123",
            "role": "teacher",
        },
        {
            "full_name": "Maya Student",
            "username": "student",
            "email": "student@dynamicactive.com",
            "password": "student123",
            "role": "student",
        },
    ]

    for item in demo_users:
        existing_user = db.query(User).filter(User.username == item["username"]).first()

        if existing_user:
            continue

        user = User(
            full_name=item["full_name"],
            username=item["username"],
            email=item["email"],
            hashed_password=hash_password(item["password"]),
            role=item["role"],
            is_active=True,
        )

        db.add(user)

    db.commit()
    db.close()

    print("Demo users seeded successfully.")


if __name__ == "__main__":
    seed_demo_users()
    