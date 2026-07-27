from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.match import Match
from app.models.cv import CV
from app.models.job import Job

from app.services.pdf_report_service import generate_matching_report

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/match/{match_id}")
def generate_report(
    match_id: int,
    db: Session = Depends(get_db)
):

    match = db.query(Match).filter(
        Match.id == match_id
    ).first()

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Matching introuvable."
        )

    cv = db.query(CV).filter(
        CV.id == match.cv_id
    ).first()

    job = db.query(Job).filter(
        Job.id == match.job_id
    ).first()

    filename = f"reports/matching_{match.id}.pdf"

    generate_matching_report(
    filename=filename,
    candidate=cv.filename,
    job=job.title,
    company=job.company,

    final_score=match.score,

    embedding_score=match.embedding_score,
    skills_score=match.skills_score,

    common_skills=(
        match.common_skills.split(", ")
        if match.common_skills
        else []
    ),

    missing_skills=(
        match.missing_skills.split(", ")
        if match.missing_skills
        else []
    ),

    ai_analysis=match.comment
)
    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=f"matching_{match.id}.pdf"
    )