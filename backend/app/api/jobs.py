from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


import json

from app.database.dependencies import get_db

from app.schemas.job import (
    JobCreate,
    JobUpdate,
    JobResponse
)

from app.services.job_service import (
    create_job,
    get_jobs,
    get_job,
    update_job,
    delete_job
)

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


# ==========================
# Créer
# ==========================
@router.post(
    "/",
    response_model=JobResponse
)
def create(
    job: JobCreate,
    db: Session = Depends(get_db)
):

    return create_job(
        db=db,
        title=job.title,
        company=job.company,
        location=job.location,
        description=job.description,
        required_skills=job.required_skills
    )


# ==========================
# Toutes les offres
# ==========================
@router.get(
    "/",
    response_model=list[JobResponse]
)
def read_all(
    db: Session = Depends(get_db)
):

    return get_jobs(db)


# ==========================
# Une offre
# ==========================
@router.get(
    "/{job_id}",
    response_model=JobResponse
)
def read_one(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = get_job(db, job_id)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Offre introuvable."
        )

    return job


# ==========================
# Modifier
# ==========================
@router.put(
    "/{job_id}",
    response_model=JobResponse
)
def update(
    job_id: int,
    data: JobUpdate,
    db: Session = Depends(get_db)
):

    job = update_job(
        db,
        job_id,
        data
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Offre introuvable."
        )

    return job


# ==========================
# Supprimer
# ==========================
@router.delete("/{job_id}")
def delete(
    job_id: int,
    db: Session = Depends(get_db)
):

    ok = delete_job(
        db,
        job_id
    )

    if not ok:
        raise HTTPException(
            status_code=404,
            detail="Offre introuvable."
        )

    return {
        "message": "Offre supprimée."
    }