from sqlalchemy.orm import Session

from app.models.match import Match


# ==========================
# Enregistrer un matching
# ==========================

def create_match(
    db: Session,
    cv_id: int,
    job_id: int,
    score: float,
    embedding_score: float,
    skills_score: float,
    common_skills: list,
    missing_skills: list,
    comment: str
):

    match = Match(
        cv_id=cv_id,
        job_id=job_id,
        score=score,
        embedding_score=embedding_score,
        skills_score=skills_score,
        common_skills=", ".join(common_skills),
        missing_skills=", ".join(missing_skills),
        comment=comment
    )

    db.add(match)
    db.commit()
    db.refresh(match)

    return match



# ==========================
# Tous les matchings
# ==========================
def get_matches(db: Session):

    return db.query(Match).all()


# ==========================
# Matching par id
# ==========================
def get_match(
    db: Session,
    match_id: int
):

    return db.query(Match).filter(
        Match.id == match_id
    ).first()


# ==========================
# Matching d'un CV
# ==========================
def get_matches_by_cv(
    db: Session,
    cv_id: int
):

    return db.query(Match).filter(
        Match.cv_id == cv_id
    ).all()


# ==========================
# Matching d'une offre
# ==========================
def get_matches_by_job(
    db: Session,
    job_id: int
):

    return db.query(Match).filter(
        Match.job_id == job_id
    ).all()


# ==========================
# Supprimer
# ==========================
def delete_match(
    db: Session,
    match_id: int
):

    match = get_match(db, match_id)

    if not match:
        return False

    db.delete(match)
    db.commit()

    return True