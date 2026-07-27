import spacy

# Chargement du modèle une seule fois
nlp = spacy.load("en_core_web_lg")

# Liste des compétences connues
KNOWN_SKILLS = {
    "python", "java", "javascript", "typescript", "php", "c", "c++", "c#",
    "react", "angular", "flutter", "django", "flask", "fastapi",
    "spring", "spring boot", "symfony",
    "docker", "kubernetes",
    "postgresql", "mysql", "mongodb", "firebase", "supabase",
    "tensorflow", "pytorch", "keras",
    "machine learning", "deep learning",
    "pandas", "numpy", "scikit-learn",
    "spark", "hadoop", "kafka",
    "git", "github", "gitlab",
    "rest", "rest api", "graphql", "grpc",
    "linux", "azure", "aws", "gcp",
    "html", "css", "bootstrap"
}


def extract_skills(text: str):
    text = text.lower()

    skills = []

    for skill in KNOWN_SKILLS:
        if skill in text:
            skills.append(skill.title())

    return sorted(list(set(skills)))