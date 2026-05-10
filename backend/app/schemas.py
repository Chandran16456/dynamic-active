from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    id: int
    full_name: str
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ForgotPasswordRequest(BaseModel):
    username_or_email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class ObservationCreate(BaseModel):
    student_name: str
    class_name: str
    engagement_score: int
    behavior_score: int
    participation_score: int
    notes: str


class ObservationOut(BaseModel):
    id: int
    teacher_id: int
    student_name: str
    class_name: str
    engagement_score: int
    behavior_score: int
    participation_score: int
    notes: str

    class Config:
        from_attributes = True


class ObservationUpdate(BaseModel):
    student_name: Optional[str] = None
    class_name: Optional[str] = None
    engagement_score: Optional[int] = None
    behavior_score: Optional[int] = None
    participation_score: Optional[int] = None
    notes: Optional[str] = None


class GoalCreate(BaseModel):
    title: str
    description: str
    student_name: str
    status: str = "In Progress"
    progress: int = 0


class GoalOut(BaseModel):
    id: int
    title: str
    description: str
    student_name: str
    assigned_by_id: int
    status: str
    progress: int

    class Config:
        from_attributes = True


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    student_name: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[int] = None


class NoteCreate(BaseModel):
    target_type: str
    target_name: str
    title: str
    body: str


class NoteOut(BaseModel):
    id: int
    author_id: int
    target_type: str
    target_name: str
    title: str
    body: str

    class Config:
        from_attributes = True


class NoteUpdate(BaseModel):
    target_type: Optional[str] = None
    target_name: Optional[str] = None
    title: Optional[str] = None
    body: Optional[str] = None


class ReviewCreate(BaseModel):
    teacher_id: int
    summary: str
    rating: str = "Strong Performance"
    status: str = "Draft"


class StudentProfileCreate(BaseModel):
    user_id: Optional[int] = None
    full_name: str
    student_code: str
    grade_level: str
    class_name: str
    guardian_name: Optional[str] = None
    guardian_email: Optional[str] = None
    guardian_phone: Optional[str] = None
    support_needs: Optional[str] = None
    learning_goals: Optional[str] = None
    progress_summary: Optional[str] = None


class StudentProfileUpdate(BaseModel):
    user_id: Optional[int] = None
    full_name: Optional[str] = None
    student_code: Optional[str] = None
    grade_level: Optional[str] = None
    class_name: Optional[str] = None
    guardian_name: Optional[str] = None
    guardian_email: Optional[str] = None
    guardian_phone: Optional[str] = None
    support_needs: Optional[str] = None
    learning_goals: Optional[str] = None
    progress_summary: Optional[str] = None
    is_active: Optional[bool] = None


class StudentProfileOut(BaseModel):
    id: int
    user_id: Optional[int]
    full_name: str
    student_code: str
    grade_level: str
    class_name: str
    guardian_name: Optional[str]
    guardian_email: Optional[str]
    guardian_phone: Optional[str]
    support_needs: Optional[str]
    learning_goals: Optional[str]
    progress_summary: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class ScheduleItemCreate(BaseModel):
    title: str
    schedule_type: str
    target_role: str
    target_name: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    description: Optional[str] = None
    meeting_link: Optional[str] = None
    task_status: Optional[str] = "Scheduled"


class ScheduleItemUpdate(BaseModel):
    title: Optional[str] = None
    schedule_type: Optional[str] = None
    target_role: Optional[str] = None
    target_name: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    description: Optional[str] = None
    meeting_link: Optional[str] = None
    task_status: Optional[str] = None


class ScheduleItemOut(BaseModel):
    id: int
    title: str
    schedule_type: str
    target_role: str
    target_name: Optional[str]
    start_time: datetime
    end_time: datetime
    location: Optional[str]
    description: Optional[str]
    meeting_link: Optional[str]
    task_status: Optional[str]
    created_by_id: int

    class Config:
        from_attributes = True


class AttendanceSessionCreate(BaseModel):
    class_name: str
    session_title: str
    session_date: datetime


class AttendanceSessionUpdate(BaseModel):
    class_name: Optional[str] = None
    session_title: Optional[str] = None
    session_date: Optional[datetime] = None


class AttendanceSessionOut(BaseModel):
    id: int
    class_name: str
    session_title: str
    session_date: datetime
    created_by_id: int

    class Config:
        from_attributes = True


class AttendanceRecordCreate(BaseModel):
    student_id: Optional[int] = None
    student_name: str
    status: str = "Present"
    notes: Optional[str] = None


class AttendanceBulkCreate(BaseModel):
    records: list[AttendanceRecordCreate]


class AttendanceRecordUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class AttendanceRecordOut(BaseModel):
    id: int
    session_id: int
    student_id: Optional[int]
    student_name: str
    status: str
    notes: Optional[str]
    marked_by_id: int

    class Config:
        from_attributes = True


class AIReportOut(BaseModel):
    id: int
    report_type: str
    title: str
    status: str
    source_summary: Optional[Dict[str, Any]] = None
    report_text: str
    created_by_id: int
    created_at: datetime

    class Config:
        from_attributes = True
        