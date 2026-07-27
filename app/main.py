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
app = FastAPI(
    title="Recruitment AI API",
    version="1.0.0"
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

