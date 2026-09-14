from sklearn.metrics.pairwise import cosine_similarity

from app.services.gemini_service import explain_match
from app.services.skills_service import skills_similarity


def calculate_matching(
    cv_embedding: list,
    job_embedding: list,
    cv_skills: str,
    job_skills: str,
    cv_analysis: str,
    job_analysis: str,
    job_title: str
):
    """
    Calcule le matching entre un CV et une offre.

    Le score final est composé de :
    - 70 % de similarité sémantique
    - 30 % de correspondance des compétences

    Ce service ne communique pas directement avec PostgreSQL.
    """

    print("\n==============================")
    print("===== CALCUL MATCHING IA =====")
    print("Offre :", job_title)
    print("==============================")

    # ==========================================
    # 1. VÉRIFICATION DES EMBEDDINGS
    # ==========================================

    if not cv_embedding:
        print("❌ Aucun embedding pour le CV")
        return None

    if not job_embedding:
        print("❌ Aucun embedding pour l'offre")
        return None

    # ==========================================
    # 2. SIMILARITÉ DES EMBEDDINGS
    # ==========================================

    embedding_score = cosine_similarity(
        [cv_embedding],
        [job_embedding]
    )[0][0] * 100

    embedding_score = round(
        float(embedding_score),
        2
    )

    print(
        "Embedding Score :",
        embedding_score
    )

    # ==========================================
    # 3. SIMILARITÉ DES COMPÉTENCES
    # ==========================================

    skills_score, common_skills, required_skills = (
        skills_similarity(
            cv_skills,
            job_skills
        )
    )

    skills_score = round(
        float(skills_score),
        2
    )

    print(
        "Skills Score :",
        skills_score
    )

    # ==========================================
    # 4. SCORE FINAL
    # ==========================================

    score = (
        embedding_score * 0.7
        +
        skills_score * 0.3
    )

    score_percent = round(
        float(score),
        2
    )

    print(
        "Score final :",
        score_percent
    )

    # ==========================================
    # 5. COMPÉTENCES MANQUANTES
    # ==========================================

    missing_skills = list(
        set(required_skills)
        - set(common_skills)
    )

    # ==========================================
    # 6. EXPLICATION GEMINI
    # ==========================================

    ai_comment = explain_match(
        cv_analysis=cv_analysis,
        job_analysis=job_analysis,
        job_title=job_title,
        embedding_score=embedding_score,
        skills_score=skills_score,
        common_skills=common_skills,
        missing_skills=missing_skills
    )

    # ==========================================
    # 7. RÉSULTAT
    # ==========================================

    result = {
        "score": score_percent,
        "embedding_score": embedding_score,
        "skills_score": skills_score,
        "common_skills": common_skills,
        "missing_skills": missing_skills,
        "comment": ai_comment
    }

    print("✅ Calcul IA terminé")

    return result