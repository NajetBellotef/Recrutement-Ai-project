from fastapi import FastAPI
from app.database.database import engine
from sqlalchemy import text
from app.database.base import Base

# Importer les modèles pour que SQLAlchemy les connaisse
from app.models import *

from app.api.auth import router as auth_router
from app.api.cvs import router as cvs_router
from app.api.jobs import router as jobs_router
from app.api import matching
from app.api.matches import router as matches_router
from app.api.dashboard import router as dashboard_router
from app.api.ranking import router as ranking_router
from app.api.search import router as search_router
from app.api.report import router as report_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.candidate_dashboard import router as candidate_dashboard_router
from app.api import candidate_matching
from app.api.profile import router as profile_router
from fastapi.staticfiles import StaticFiles
import os
from app.api.admin import router as admin_router
from app.api.user import router as user_router

app = FastAPI(
    title="Recruitment AI API",
    version="1.0.0"
)
# Créer le dossier uploads s'il n'existe pas
os.makedirs("uploads/profile", exist_ok=True)

# Rendre le dossier uploads accessible depuis le navigateur
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(cvs_router)
app.include_router(jobs_router)
app.include_router(matching.router)
app.include_router(matches_router)
app.include_router(dashboard_router)
app.include_router(ranking_router)
app.include_router(search_router)
app.include_router(report_router)
app.include_router(candidate_dashboard_router)
app.include_router(candidate_matching.router)
app.include_router(profile_router)
app.include_router(admin_router)
app.include_router(user_router)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Bienvenue sur Recruitment AI"
    }


@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            version = conn.execute(text("SELECT version()")).scalar()
            return {
                "status": "OK",
                "version": version
            }

    except Exception as e:
        print(repr(e))
        return {"error": repr(e)}

