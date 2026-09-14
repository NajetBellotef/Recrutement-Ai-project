import json


def skills_similarity(
    cv_skills_json: str,
    job_skills_json: str
):
    """
    Compare les compétences d'un CV et d'une offre.

    Les compétences sont reçues sous forme de chaînes JSON.
    Le score correspond au pourcentage de compétences demandées
    par l'offre qui sont présentes dans le CV.
    """

    if not cv_skills_json or not job_skills_json:
        return 0, [], []

    try:
        # Conversion JSON -> ensembles
        cv_skills = {
            skill.lower()
            for skill in json.loads(cv_skills_json)
        }

        job_skills = {
            skill.lower()
            for skill in json.loads(job_skills_json)
        }

    except Exception:
        return 0, [], []

    print("CV skills :", cv_skills)
    print("JOB skills :", job_skills)

    if len(job_skills) == 0:
        return 0, [], []

    # Compétences communes
    common = cv_skills.intersection(job_skills)

    # Score basé sur les compétences demandées
    score = (len(common) / len(job_skills)) * 100

    return (
        round(score, 2),
        sorted(list(common)),
        sorted(list(job_skills))
    )