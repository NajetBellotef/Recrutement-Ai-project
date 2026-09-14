
import json
from app.services.ai_service import (
    analyze_job,
    extract_job_skills,
    generate_embedding
)

from sqlalchemy.orm import Session
from app.models.job import Job
# ==========================
# Créer une offre
# ==========================
def create_job(
    db: Session,
    recruiter_id: int,
    title: str,
    company: str,
    location: str,
    description: str,
    required_skills: str
):

    analysis = analyze_job(description)

    skills = extract_job_skills(description)

    embedding = generate_embedding(description)

    embedding_json = json.dumps(embedding)

    skills_json = json.dumps(skills)

    job = Job(
        recruiter_id=recruiter_id,
        title=title,
        company=company,
        location=location,
        description=description,
        required_skills=required_skills,
        analysis=analysis,
        skills=skills_json,
        embedding=embedding_json
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job
# ==========================
# Récuperer Toutes les offres
# ==========================
def get_jobs(db: Session):

    return db.query(Job).all()
# ==========================
# Recuperer offres d'un recruteur
# ==========================
def get_jobs_by_recruiter(
    db: Session,
    recruiter_id: int
):

    return db.query(Job).filter(
        Job.recruiter_id == recruiter_id
    ).all()
# ==========================
# Une offre
# ==========================
def get_job(
    db: Session,
    job_id: int
):

    return db.query(Job).filter(
        Job.id == job_id
    ).first()


# ==========================
# Modifier une offre
# ==========================
def update_job(
    db: Session,
    job_id: int,
    data,
    recruiter_id: int
):

    job = (
        db.query(Job)
        .filter(
            Job.id == job_id,
            Job.recruiter_id == recruiter_id
        )
        .first()
    )

    if not job:
        return None

    job.title = data.title
    job.company = data.company
    job.location = data.location
    job.description = data.description
    job.required_skills = data.required_skills

    # Nouvelle analyse
    job.analysis = analyze_job(data.description)

    skills = extract_job_skills(data.description)
    job.skills = json.dumps(skills)

    # Nouvel embedding
    embedding = generate_embedding(data.description)
    job.embedding = json.dumps(embedding)

    db.commit()
    db.refresh(job)

    return job
# ==========================
# Supprimer une offre
# ==========================
def delete_job(
    db: Session,
    job_id: int,
    recruiter_id: int
):

    job = (
        db.query(Job)
        .filter(
            Job.id == job_id,
            Job.recruiter_id == recruiter_id
        )
        .first()
    )

    if not job:
        return False

    db.delete(job)
    db.commit()

    return True