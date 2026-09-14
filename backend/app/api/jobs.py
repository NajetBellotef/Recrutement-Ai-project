from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.auth_service import get_current_user
from app.models.user import User

from app.database.dependencies import get_db

from app.schemas.job import (
    JobCreate,
    JobUpdate,
    JobResponse
)

from app.services.job_service import (
    create_job,
    get_jobs,
    get_jobs_by_recruiter,
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux recruteurs."
        )

    return create_job(
        db=db,
        recruiter_id=current_user.id,
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
# uniquement les offres du recruteur connecté
# ==========================
@router.get(
    "/mine",
    response_model=list[JobResponse]
)
def read_my_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux recruteurs."
        )

    return get_jobs_by_recruiter(
        db,
        current_user.id
    )
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux recruteurs."
        )

    job = update_job(
        db,
        job_id,
        data,
        current_user.id
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Offre introuvable ou accès interdit."
        )

    return job
# ==========================
# Supprimer
# ==========================
@router.delete("/{job_id}")
def delete(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux recruteurs."
        )

    ok = delete_job(
        db,
        job_id,
        current_user.id
    )

    if not ok:
        raise HTTPException(
            status_code=404,
            detail="Offre introuvable ou accès interdit."
        )

    return {
        "message": "Offre supprimée."
    }