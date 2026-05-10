from datetime import datetime, timedelta, timezone

from app.database import SessionLocal
from app.models import (
    Goal,
    Note,
    Observation,
    ScheduleItem,
    StudentProfile,
    User,
)


def seed_demo_workflow():
    db = SessionLocal()

    admin = db.query(User).filter(User.username == "admin").first()
    teacher = db.query(User).filter(User.username == "teacher").first()
    student_user = db.query(User).filter(User.username == "student").first()

    if not admin or not teacher or not student_user:
        print("Demo users missing. Run python -m app.seed first.")
        db.close()
        return

    # Student profile
    existing_profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.student_code == "STU-1001")
        .first()
    )

    if not existing_profile:
        profile = StudentProfile(
            user_id=student_user.id,
            full_name="Maya Student",
            student_code="STU-1001",
            grade_level="Grade 6",
            class_name="6A",
            guardian_name="Parent Demo",
            guardian_email="parent@example.com",
            guardian_phone="555-123-4567",
            support_needs="Needs support with reading reflection and writing organization.",
            learning_goals="Improve reading comprehension and complete weekly reflections.",
            progress_summary="Making steady progress with teacher support.",
        )
        db.add(profile)

    # Goal
    existing_goal = (
        db.query(Goal)
        .filter(Goal.title == "Improve Reading Reflection")
        .first()
    )

    if not existing_goal:
        goal = Goal(
            title="Improve Reading Reflection",
            description="Complete one structured reading reflection every week using 4-5 complete sentences.",
            student_name="Maya Student",
            assigned_by_id=teacher.id,
            status="In Progress",
            progress=72,
        )
        db.add(goal)

    # Note
    existing_note = (
        db.query(Note)
        .filter(Note.title == "Reading Support Note")
        .first()
    )

    if not existing_note:
        note = Note(
            author_id=teacher.id,
            target_type="student",
            target_name="Maya Student",
            title="Reading Support Note",
            body="Maya is improving in participation but needs a writing organizer before starting her reflection.",
        )
        db.add(note)

    # Observation
    existing_observation = (
        db.query(Observation)
        .filter(
            Observation.student_name == "Maya Student",
            Observation.class_name == "6A Reading",
        )
        .first()
    )

    if not existing_observation:
        observation = Observation(
            teacher_id=teacher.id,
            student_name="Maya Student",
            class_name="6A Reading",
            engagement_score=4,
            behavior_score=5,
            participation_score=4,
            notes="Maya participated well during group reading and completed most of the reflection task.",
        )
        db.add(observation)

    # Schedule items
    now = datetime.now(timezone.utc)

    schedule_items = [
        {
            "title": "Reading Reflection Check-in",
            "schedule_type": "class",
            "target_role": "student",
            "target_name": "Maya Student",
            "start_time": now + timedelta(days=1, hours=1),
            "end_time": now + timedelta(days=1, hours=2),
            "location": "Room 204",
            "description": "Weekly reading reflection and progress check-in.",
            "created_by_id": teacher.id,
        },
        {
            "title": "Math Practice Support",
            "schedule_type": "support",
            "target_role": "student",
            "target_name": "Maya Student",
            "start_time": now + timedelta(days=2, hours=2),
            "end_time": now + timedelta(days=2, hours=3),
            "location": "Room 112",
            "description": "Small-group support session for math practice.",
            "created_by_id": teacher.id,
        },
        {
            "title": "Goal Progress Review",
            "schedule_type": "meeting",
            "target_role": "student",
            "target_name": "Maya Student",
            "start_time": now + timedelta(days=3, hours=1),
            "end_time": now + timedelta(days=3, hours=2),
            "location": "Advisor Room",
            "description": "Review student progress and update goal completion.",
            "created_by_id": admin.id,
        },
    ]

    for item in schedule_items:
        exists = (
            db.query(ScheduleItem)
            .filter(
                ScheduleItem.title == item["title"],
                ScheduleItem.target_name == item["target_name"],
            )
            .first()
        )

        if not exists:
            db.add(ScheduleItem(**item))

    db.commit()
    db.close()

    print("Demo workflow data seeded successfully.")


if __name__ == "__main__":
    seed_demo_workflow()
    