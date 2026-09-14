import os
import requests


AI_SERVICE_URL = os.getenv(
    "AI_SERVICE_URL",
    "http://localhost:8001"
)


def _post(endpoint: str, data: dict):
    """
    Envoie une requête au AI Service.
    """

    url = f"{AI_SERVICE_URL}{endpoint}"

    response = requests.post(
        url,
        json=data,
        timeout=120
    )

    response.raise_for_status()

    return response.json()


# ==========================================
# ANALYSE CV
# ==========================================

def analyze_cv(cv_text: str):

    return _post(
        "/ai/analyze-cv",
        {
            "text": cv_text
        }
    )["analysis"]


# ==========================================
# ANALYSE OFFRE
# ==========================================

def analyze_job(job_text: str):

    return _post(
        "/ai/analyze-job",
        {
            "text": job_text
        }
    )["analysis"]


# ==========================================
# EXTRACTION COMPÉTENCES CV
# ==========================================

def extract_cv_skills(cv_text: str):

    return _post(
        "/ai/extract-cv-skills",
        {
            "text": cv_text
        }
    )["skills"]


# ==========================================
# EXTRACTION COMPÉTENCES OFFRE
# ==========================================

def extract_job_skills(job_text: str):

    return _post(
        "/ai/extract-job-skills",
        {
            "text": job_text
        }
    )["skills"]


# ==========================================
# EMBEDDING
# ==========================================

def generate_embedding(text: str):

    return _post(
        "/ai/embedding",
        {
            "text": text
        }
    )["embedding"]


# ==========================================
# MATCHING
# ==========================================

def calculate_matching(data: dict):

    return _post(
        "/matching",
        data
    )