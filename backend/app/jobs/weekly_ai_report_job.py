from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import AIReport, User
from app.services.ai_report_service import (
    collect_admin_report_context,
    generate_report_with_groq,
)


def create_automated_weekly_admin_report(
    db: Session,
    created_by_id: int | None = None,
) -> AIReport:
    if created_by_id:
        admin_user = db.query(User).filter(User.id == created_by_id).first()
    else:
        admin_user = (
            db.query(User)
            .filter(User.role == "admin", User.is_active == True)
            .first()
        )

    if not admin_user:
        raise ValueError("No active admin user found. Weekly AI report skipped.")

    context = collect_admin_report_context(db)
    report_text = generate_report_with_groq(context)

    report = AIReport(
        report_type="weekly_admin_auto",
        title="Automated Weekly Admin Insight Report",
        status="Generated",
        source_summary=context,
        report_text=report_text,
        created_by_id=admin_user.id,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


def generate_weekly_admin_report_job():
    db: Session = SessionLocal()

    try:
        report = create_automated_weekly_admin_report(db)
        print(f"Automated weekly admin AI report generated successfully. Report ID: {report.id}")

    except Exception as exc:
        db.rollback()
        print(f"Weekly AI report automation failed: {exc}")

    finally:
        db.close()
        