import os
import json

from dotenv import load_dotenv
from google import genai


# ==========================================
# CONFIGURATION GEMINI
# ==========================================

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


#MODEL_NAME = "gemini-flash-latest"
MODEL_NAME = "gemini-3.6-flash"


# ==========================================
# ANALYSE CV
# ==========================================

def analyze_cv(cv_text: str):

    if not cv_text or cv_text.strip() == "":
        return "Le CV est vide."

    prompt = f"""
Tu es un expert RH.

Analyse le CV suivant.

Réponds uniquement sous cette forme :

Résumé :
...

Compétences techniques :
- ...

Compétences humaines :
- ...

Expérience :
...

Niveau :
Junior / Confirmé / Senior

Forces :
- ...

Faiblesses :
- ...

Recommandation finale :
...

CV :

{cv_text}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:

        print("Erreur Gemini (CV) :", e)

        return """
Résumé :
Analyse indisponible.

Compétences techniques :
-

Compétences humaines :
-

Expérience :
Non disponible.

Niveau :
Inconnu

Forces :
-

Faiblesses :
-

Recommandation finale :
Analyse Gemini momentanément indisponible.
"""


# ==========================================
# ANALYSE OFFRE D'EMPLOI
# ==========================================

def analyze_job(job_description: str):

    if not job_description or job_description.strip() == "":
        return "La description est vide."

    prompt = f"""
Tu es un expert en recrutement.

Analyse cette offre.

Donne :

1. Résumé du poste

2. Compétences techniques obligatoires

3. Compétences souhaitées

4. Niveau d'expérience

5. Profil idéal

6. Recommandations

Offre :

{job_description}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:

        print("Erreur Gemini (JOB) :", e)

        return """
Résumé :
Analyse indisponible.

Compétences obligatoires :
-

Compétences souhaitées :
-

Niveau :
Inconnu

Profil idéal :
Non disponible.

Recommandations :
Analyse Gemini momentanément indisponible.
"""


# ==========================================
# EXPLICATION DU MATCHING
# ==========================================

def explain_match(
    cv_analysis: str,
    job_analysis: str,
    job_title: str,
    embedding_score: float,
    skills_score: float,
    common_skills: list,
    missing_skills: list
):

    prompt = f"""
Tu es un expert RH spécialisé dans le recrutement de profils IT.

Tu analyses le résultat du matching entre un candidat et une offre d'emploi.

Ton rôle est d'aider le recruteur à comprendre le score obtenu, et non de prendre la décision finale à sa place.

Les scores ci-dessous sont déjà calculés automatiquement. Tu ne dois jamais les recalculer ni afficher leurs valeurs numériques.

=========================
INFORMATIONS DISPONIBLES
=========================

Poste analysé :
{job_title}

Score de similarité sémantique :
{embedding_score} %

Score des compétences :
{skills_score} %

Compétences communes :
{', '.join(common_skills) if common_skills else 'Aucune'}

Compétences manquantes :
{', '.join(missing_skills) if missing_skills else 'Aucune'}

Analyse du CV :
{cv_analysis}

Analyse de l'offre :
{job_analysis}

=========================
MISSION
=========================

Rédige une analyse RH professionnelle de 8 à 10 lignes destinée à un recruteur.

L'analyse doit :

- expliquer clairement pourquoi le candidat obtient ce niveau d'adéquation avec le poste analysé ;
- mettre en évidence les principaux points forts du profil ;
- expliquer comment les compétences manquantes influencent le résultat du matching ;
- préciser si le candidat possède un potentiel d'évolution vers ce poste grâce à une montée en compétences ou à une formation complémentaire ;
- terminer par une recommandation professionnelle concernant la poursuite du processus de recrutement.

=========================
RÈGLES À RESPECTER
=========================

- Ne jamais afficher les valeurs numériques des scores.
- Ne jamais recopier les listes des compétences communes ou manquantes.
- Utiliser ces informations uniquement pour justifier l'analyse.
- Ne pas résumer simplement le CV.
- L'analyse doit être centrée sur le poste : "{job_title}".
- Expliquer les raisons du score obtenu et non décrire uniquement le candidat.
- Adopter un ton objectif, neutre et professionnel.
- Ne jamais prendre la décision finale à la place du recruteur.
- Ne jamais utiliser des expressions telles que :
  * "rejeter la candidature"
  * "ne pas retenir"
  * "ne pas convoquer"
  * "impossible"
  * "totalement irréaliste"
  * "nous déconseillons"
- Préférer des formulations comme :
  * "présente une adéquation limitée"
  * "pourrait évoluer vers ce poste"
  * "une montée en compétences serait nécessaire"
  * "un entretien pourrait être envisagé selon les besoins de l'entreprise"
  * "le recruteur pourra approfondir certains points lors d'un entretien"

Réponds uniquement par un paragraphe fluide, sans titre, sans listes à puces et sans Markdown.
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:

        print("Erreur Gemini (MATCH) :", e)

        return (
            "L'analyse IA n'a pas pu être générée car le service Gemini est "
            "actuellement indisponible ou le quota API est dépassé.\n\n"
            "Le score de matching ainsi que l'analyse des compétences "
            "restent néanmoins valides."
        )


# ==========================================
# EXTRACTION DES COMPÉTENCES DU CV
# ==========================================

def extract_cv_skills(cv_text: str):

    if not cv_text or cv_text.strip() == "":
        return []

    prompt = f"""
Tu es un expert RH.

Extrais uniquement les compétences techniques du CV.

Réponds uniquement en JSON.

Exemple :

[
    "Python",
    "FastAPI",
    "Docker",
    "PostgreSQL"
]

CV :

{cv_text}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return json.loads(response.text)

    except Exception as e:

        print("Erreur Extraction CV :", e)

        return []


# ==========================================
# EXTRACTION DES COMPÉTENCES DE L'OFFRE
# ==========================================

def extract_job_skills(job_text: str):

    if not job_text or job_text.strip() == "":
        return []

    prompt = f"""
Tu es un expert RH.

Extrais uniquement les compétences techniques demandées.

Réponds uniquement en JSON.

Exemple :

[
    "Python",
    "Docker",
    "TensorFlow"
]

Offre :

{job_text}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return json.loads(response.text)

    except Exception as e:

        print("Erreur Extraction JOB :", e)

        return []