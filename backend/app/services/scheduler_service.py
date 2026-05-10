import os

from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv

from app.jobs.weekly_ai_report_job import generate_weekly_admin_report_job

load_dotenv()

scheduler = BackgroundScheduler()


def start_scheduler():
    enable_scheduler = os.getenv("ENABLE_SCHEDULER", "false").lower() == "true"

    if not enable_scheduler:
        print("Scheduler disabled. Set ENABLE_SCHEDULER=true to enable it.")
        return

    if scheduler.running:
        print("Scheduler already running.")
        return

    scheduler.add_job(
        generate_weekly_admin_report_job,
        trigger="cron",
        day_of_week="fri",
        hour=16,
        minute=0,
        id="weekly_admin_ai_report",
        replace_existing=True,
    )

    scheduler.start()

    print("Scheduler started: weekly admin AI report runs every Friday at 4:00 PM.")


def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()
        print("Scheduler stopped.")
        