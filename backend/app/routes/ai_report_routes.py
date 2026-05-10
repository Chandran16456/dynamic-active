from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.role_checker import require_roles
from app.database import get_db
from app.models import AIReport, User
from app.schemas import AIReportOut
from app.jobs.weekly_ai_report_job import create_automated_weekly_admin_report
from app.services.ai_report_service import (
    collect_admin_report_context,
    generate_report_with_groq,
)

router = APIRouter(prefix="/api/ai-reports", tags=["AI Reports"])


@router.post("/admin/weekly", response_model=AIReportOut)
def generate_admin_weekly_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    context = collect_admin_report_context(db)
    report_text = generate_report_with_groq(context)

    report = AIReport(
        report_type="weekly_admin",
        title="Weekly Admin Insight Report",
        status="Generated",
        source_summary=context,
        report_text=report_text,
        created_by_id=current_user.id,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


@router.get("", response_model=list[AIReportOut])
def list_ai_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    return db.query(AIReport).order_by(AIReport.created_at.desc()).all()

@router.post("/admin/run-automation-now", response_model=AIReportOut)
def run_admin_report_automation_now(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    try:
        report = create_automated_weekly_admin_report(
            db=db,
            created_by_id=current_user.id,
        )
        return report

    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

@router.get("/{report_id}", response_model=AIReportOut)
def get_ai_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    report = db.query(AIReport).filter(AIReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="AI report not found.")

    return report


@router.delete("/{report_id}")
def delete_ai_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    report = db.query(AIReport).filter(AIReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="AI report not found.")

    db.delete(report)
    db.commit()

    return {"message": "AI report deleted successfully."}
