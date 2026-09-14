import os

from dotenv import load_dotenv
from google import genai


# ==========================================
# CONFIGURATION
# ==========================================

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIMENSION = 3072


# ==========================================
# GÉNÉRATION D'EMBEDDING
# ==========================================

def generate_embedding(text: str):

    if not text or text.strip() == "":
        print("Texte vide.")
        return [0.0] * EMBEDDING_DIMENSION

    try:

        response = client.models.embed_content(
            model=EMBEDDING_MODEL,
            contents=text
        )

        return response.embeddings[0].values

    except Exception as e:

        print("Erreur Embedding :", e)

        return [0.0] * EMBEDDING_DIMENSION