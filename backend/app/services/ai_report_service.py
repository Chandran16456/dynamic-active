import json
import os
from collections import Counter, defaultdict

import requests
from dotenv import load_dotenv
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")


def table_exists(db: Session, table_name: str) -> bool:
    inspector = inspect(db.bind)
    return inspector.has_table(table_name)


def safe_rows(db: Session, sql: str, params: dict | None = None) -> list[dict]:
    rows = db.execute(text(sql), params or {}).mappings().all()
    return [dict(row) for row in rows]


def normalize_json(data):
    return json.loads(json.dumps(data, default=str))


def collect_admin_report_context(db: Session) -> dict:
    context = {
        "attendance": [],
        "attendance_counts": {},
        "attendance_risk_students": [],
        "goals": [],
        "notes": [],
        "observations": [],
    }

    if table_exists(db, "attendance_records") and table_exists(
        db, "attendance_sessions"
    ):
        attendance_rows = safe_rows(
            db,
            """
            SELECT
                ar.id,
                ar.student_name,
                ar.status,
                ar.notes,
                s.class_name,
                s.session_title,
                s.session_date
            FROM attendance_records ar
            JOIN attendance_sessions s ON ar.session_id = s.id
            ORDER BY s.session_date DESC
            LIMIT 120
            """,
        )

        context["attendance"] = attendance_rows

        status_counts = Counter(row.get("status") for row in attendance_rows)
        context["attendance_counts"] = dict(status_counts)

        student_risk = defaultdict(lambda: {"Absent": 0, "Late": 0, "Excused": 0})

        for row in attendance_rows:
            status = row.get("status")
            student_name = row.get("student_name")

            if status in ["Absent", "Late", "Excused"] and student_name:
                student_risk[student_name][status] += 1

        risk_students = []

        for student_name, counts in student_risk.items():
            total_flags = counts["Absent"] + counts["Late"] + counts["Excused"]

            if total_flags > 0:
                risk_students.append(
                    {
                        "student_name": student_name,
                        "absent": counts["Absent"],
                        "late": counts["Late"],
                        "excused": counts["Excused"],
                        "total_flags": total_flags,
                    }
                )

        context["attendance_risk_students"] = sorted(
            risk_students,
            key=lambda item: item["total_flags"],
            reverse=True,
        )[:10]

    if table_exists(db, "goals"):
        context["goals"] = safe_rows(
            db,
            """
            SELECT
                id,
                title,
                description,
                student_name,
                status,
                progress,
                created_at
            FROM goals
            ORDER BY id DESC
            LIMIT 80
            """,
        )

    if table_exists(db, "notes"):
        context["notes"] = safe_rows(
            db,
            """
            SELECT
                id,
                target_type,
                target_name,
                title,
                body,
                created_at
            FROM notes
            ORDER BY id DESC
            LIMIT 80
            """,
        )

    if table_exists(db, "observations"):
        context["observations"] = safe_rows(
            db,
            """
            SELECT
                id,
                student_name,
                class_name,
                engagement_score,
                behavior_score,
                participation_score,
                notes,
                created_at
            FROM observations
            ORDER BY id DESC
            LIMIT 60
            """,
        )

    return normalize_json(context)


def build_fallback_report(context: dict) -> str:
    attendance_counts = context.get("attendance_counts", {})
    risk_students = context.get("attendance_risk_students", [])
    goals = context.get("goals", [])
    notes = context.get("notes", [])
    observations = context.get("observations", [])

    lines = []

    lines.append("# Weekly Admin Insight Report")
    lines.append("")
    lines.append("## 1. Attendance Overview")
    lines.append(f"- Present: {attendance_counts.get('Present', 0)}")
    lines.append(f"- Absent: {attendance_counts.get('Absent', 0)}")
    lines.append(f"- Late: {attendance_counts.get('Late', 0)}")
    lines.append(f"- Excused: {attendance_counts.get('Excused', 0)}")

    lines.append("")
    lines.append("## 2. Student Support Priorities")

    if risk_students:
        for item in risk_students[:5]:
            lines.append(
                f"- {item['student_name']} has {item['total_flags']} attendance flag(s): "
                f"{item['absent']} absent, {item['late']} late, {item['excused']} excused."
            )
    else:
        lines.append("- No attendance risk patterns detected yet.")

    lines.append("")
    lines.append("## 3. Goal and Documentation Signals")
    lines.append(f"- Goal records reviewed: {len(goals)}")
    lines.append(f"- Teacher notes reviewed: {len(notes)}")
    lines.append(f"- Classroom observations reviewed: {len(observations)}")

    lines.append("")
    lines.append("## 4. Recommended Admin Actions")
    lines.append("- Review students with repeated absences or late arrivals.")
    lines.append("- Ask teachers to add support notes for students with attendance flags.")
    lines.append("- Compare attendance patterns with goal progress before making decisions.")
    lines.append("- Schedule support check-ins for students with both attendance and progress concerns.")

    lines.append("")
    lines.append("## 5. Workflow Automation Opportunity")
    lines.append(
        "- This report can be generated automatically every week using APScheduler and saved for admin review."
    )

    return "\n".join(lines)


def generate_report_with_groq(context: dict) -> str:
    fallback_report = build_fallback_report(context)

    if not GROQ_API_KEY:
        return (
            fallback_report
            + "\n\n---\n"
            + "Note: GROQ_API_KEY is missing, so this report was generated using the local fallback engine."
        )

    prompt = f"""
You are an education analytics assistant for a K-12 school administration platform.

Generate a polished weekly admin insight report from the JSON data below.

Rules:
- Be practical and concise.
- Include attendance patterns.
- Include student support priorities.
- Include teacher/admin follow-up actions.
- Include AI-assisted recommendations.
- Include workflow automation opportunities.
- Do not invent names or counts that are not present in the data.
- Use markdown headings.

Data:
{json.dumps(context, indent=2)}
"""

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": GROQ_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "You generate clear K-12 admin analytics reports.",
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                "temperature": 0.35,
                "max_tokens": 1200,
            },
            timeout=40,
        )

        response.raise_for_status()

        data = response.json()
        return data["choices"][0]["message"]["content"]

    except Exception as exc:
        return (
            fallback_report
            + "\n\n---\n"
            + f"Note: Groq generation failed, so the local fallback report was used. Error: {str(exc)}"
        )
    