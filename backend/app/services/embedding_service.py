import os
from dotenv import load_dotenv
from google import genai

# Charger les variables d'environnement
load_dotenv()

# Création du client Gemini
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_embedding(text: str):
    """
    Génère un embedding à partir d'un texte.
    """

    # Vérification si le texte est vide
    if not text or text.strip() == "":
        print("Texte vide.")
        return [0.0] * 3072

    try:

        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=text
        )

        return response.embeddings[0].values

    except Exception as e:

        print("Erreur Embedding :", e)

        # Embedding de secours
        return [0.0] * 3072


# ==========================
# Test
# ==========================
if __name__ == "__main__":

    texte = """
Python
FastAPI
PostgreSQL
Docker
Machine Learning
"""

    embedding = generate_embedding(texte)

    print("Dimension :", len(embedding))
    print()
    print("Premières valeurs :")
    print(embedding[:10])