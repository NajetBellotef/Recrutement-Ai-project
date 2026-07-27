
import json
from app.services.gemini_service import (
    analyze_job,
)
from app.services.skill_extractor import extract_skills
from app.services.embedding_service import generate_embedding

from sqlalchemy.orm import Session
from app.models.job import Job
# ==========================
# Créer une offre
# ==========================
def create_job(
    db: Session,
    title: str,
    company: str,
    location: str,
    description: str,
    required_skills: str
):

    analysis = analyze_job(description)

    skills = extract_skills(description)

    embedding = generate_embedding(description)

    embedding_json = json.dumps(embedding)

    skills_json = json.dumps(skills)

    job = Job(
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
# Toutes les offres
# ==========================
def get_jobs(db: Session):

    return db.query(Job).all()


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
    data
):

    job = get_job(db, job_id)

    if not job:
        return None

    job.title = data.title
    job.company = data.company
    job.location = data.location
    job.description = data.description
    job.required_skills = data.required_skills

    # Nouvelle analyse
    job.analysis = analyze_job(data.description)
    skills = extract_skills(data.description)
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
    job_id: int
):

    job = get_job(db, job_id)

    if not job:
        return False

    db.delete(job)
    db.commit()

    return True