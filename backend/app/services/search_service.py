from sqlalchemy.orm import Session
from app.models.cv import CV
from app.models.job import Job


# ==========================
# Recherche candidats
# ==========================

def search_candidates(
    db: Session,
    skill: str
):

    skill = skill.lower()

    cvs = db.query(CV).all()

    results = []

    for cv in cvs:

        if not cv.skills:
            continue

        if skill in cv.skills.lower():
          candidate = cv.user

          if candidate is None:
                continue
          results.append({
                 "id": cv.id,
                "filename": cv.filename,
                "user_id": candidate.id,
                "full_name": candidate.full_name,
                "email": candidate.email,
                "phone": candidate.phone,
                "city": candidate.city,
                "country": candidate.country,
                "profile_image": candidate.profile_image
            })

    return results


# ==========================
# Recherche offres
# ==========================

def search_jobs(
    db: Session,
    skill: str
):

    skill = skill.lower()

    jobs = db.query(Job).all()

    results = []

    for job in jobs:

        if not job.skills:
            continue

        if skill in job.skills.lower():

            results.append({
                "id": job.id,
                "title": job.title,
                "company": job.company
            })

    return results