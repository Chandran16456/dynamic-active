from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


def utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(120), nullable=False)
    username = Column(String(80), unique=True, index=True, nullable=False)
    email = Column(String(160), unique=True, index=True, nullable=False)

    hashed_password = Column(String(255), nullable=False)

    role = Column(String(30), nullable=False)  # admin, teacher, student
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String(255), unique=True, nullable=False)
    used = Column(Boolean, default=False)

    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    user = relationship("User")


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)

    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    student_name = Column(String(120), nullable=False)
    class_name = Column(String(120), nullable=False)

    engagement_score = Column(Integer, nullable=False)
    behavior_score = Column(Integer, nullable=False)
    participation_score = Column(Integer, nullable=False)

    notes = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)

    teacher = relationship("User")


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    student_name = Column(String(120), nullable=False)

    assigned_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    status = Column(String(40), default="In Progress")
    progress = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    assigned_by = relationship("User")


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_type = Column(String(40), nullable=False)  # student, teacher, class
    target_name = Column(String(120), nullable=False)

    title = Column(String(200), nullable=False)
    body = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)

    author = relationship("User")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    summary = Column(Text, nullable=False)
    rating = Column(String(60), default="Strong Performance")
    status = Column(String(40), default="Draft")

    created_at = Column(DateTime(timezone=True), default=utc_now)

    teacher = relationship("User", foreign_keys=[teacher_id])
    reviewer = relationship("User", foreign_keys=[reviewer_id])


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, unique=True)

    full_name = Column(String(120), nullable=False)
    student_code = Column(String(80), unique=True, index=True, nullable=False)
    grade_level = Column(String(40), nullable=False)
    class_name = Column(String(120), nullable=False)

    guardian_name = Column(String(120), nullable=True)
    guardian_email = Column(String(160), nullable=True)
    guardian_phone = Column(String(60), nullable=True)

    support_needs = Column(Text, nullable=True)
    learning_goals = Column(Text, nullable=True)
    progress_summary = Column(Text, nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    user = relationship("User")


class ScheduleItem(Base):
    __tablename__ = "schedule_items"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(180), nullable=False)
    schedule_type = Column(String(60), nullable=False)  # class, meeting, observation, review
    target_role = Column(String(40), nullable=False)  # student, teacher, admin, all
    target_name = Column(String(120), nullable=True)

    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)

    meeting_link = Column(String(300), nullable=True)
    task_status = Column(String(40), default="Scheduled")

    location = Column(String(160), nullable=True)
    description = Column(Text, nullable=True)

    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    created_by = relationship("User")


class AttendanceSession(Base):
    __tablename__ = "attendance_sessions"

    id = Column(Integer, primary_key=True, index=True)

    class_name = Column(String(120), nullable=False)
    session_title = Column(String(180), nullable=False)
    session_date = Column(DateTime(timezone=True), nullable=False)

    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    created_by = relationship("User")


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(Integer, ForeignKey("attendance_sessions.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("student_profiles.id"), nullable=True)

    student_name = Column(String(120), nullable=False)
    status = Column(String(40), nullable=False, default="Present")
    notes = Column(Text, nullable=True)

    marked_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    session = relationship("AttendanceSession")
    student = relationship("StudentProfile")
    marked_by = relationship("User")


class AIReport(Base):
    __tablename__ = "ai_reports"

    id = Column(Integer, primary_key=True, index=True)

    report_type = Column(String(80), nullable=False, default="weekly_admin")
    title = Column(String(180), nullable=False)
    status = Column(String(50), nullable=False, default="Generated")

    source_summary = Column(JSON, nullable=True)
    report_text = Column(Text, nullable=False)

    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    created_by = relationship("User")