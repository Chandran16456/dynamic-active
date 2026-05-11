import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.database import Base, engine

from app.routes.auth_routes import router as auth_router
from app.routes.student_routes import router as student_router
from app.routes.observation_routes import router as observation_router
from app.routes.goal_routes import router as goal_router
from app.routes.note_routes import router as note_router
from app.routes.schedule_routes import router as schedule_router
from app.routes.attendance_routes import router as attendance_router
from app.routes.ai_report_routes import router as ai_report_router
from app.routes.dev_seed_routes import router as dev_seed_router

from app.services.scheduler_service import start_scheduler, stop_scheduler


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dynamic Active API")


frontend_url = os.getenv("FRONTEND_URL", "").strip()

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://dynamic-active-production.up.railway.app",
]

if frontend_url and frontend_url not in allowed_origins:
    allowed_origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.up\.railway\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(student_router)
app.include_router(observation_router)
app.include_router(goal_router)
app.include_router(note_router)
app.include_router(schedule_router)
app.include_router(attendance_router)
app.include_router(ai_report_router)
app.include_router(dev_seed_router)


@app.get("/")
def root():
    return {"message": "Dynamic Active API is running"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Dynamic Active API",
    }


@app.on_event("startup")
def on_startup():
    start_scheduler()


@app.on_event("shutdown")
def on_shutdown():
    stop_scheduler()
    