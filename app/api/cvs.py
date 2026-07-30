from fastapi import APIRouter, UploadFile, File, Depends
import os
import shutil
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.auth_service import get_current_user

from app.models.user import User
from app.models.cv import CV
from app.models.match import Match
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import (
    analyze_cv,
    
)
from app.services.skill_extractor import extract_skills

from app.services.embedding_service import generate_embedding
import json
from app.services.ocr_service import extract_text_from_image
from fastapi import HTTPException
import uuid
from app.services.matching_service import match_cv_with_jobs

router = APIRouter(
    prefix="/cvs",
    tags=["CV"]
)

UPLOAD_FOLDER = "uploads/cvs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png"
]


@router.post("/upload")
async def upload_cv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Vérifier que c'est un PDF
    

    if file.content_type not in ALLOWED_TYPES:
     return {
        "error": "Formats autorisés : PDF, JPG, PNG."
    }
    # Vérifier si l'utilisateur possède déjà un CV
    old_cv = (
        db.query(CV)
        .filter(CV.user_id == current_user.id)
        .order_by(CV.created_at.desc())
        .first()
    )
    print("Ancien CV :", old_cv)
    # Si oui, supprimer les anciens matchs puis le CV
    if old_cv:
         # Supprimer tous les matchs liés à ce CV
       db.query(Match).filter(
        Match.cv_id == old_cv.id
        ).delete()

       db.commit()

      # Supprimer le fichier du disque
       if os.path.exists(old_cv.file_path):
            os.remove(old_cv.file_path)
 # Supprimer le CV
       db.delete(old_cv)
       db.commit()

    # Chemin de sauvegarde
    extension = os.path.splitext(file.filename)[1]

    unique_filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
          UPLOAD_FOLDER,
          unique_filename
    )
    

    # Sauvegarde du fichier
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Extraction automatique du texte
    if file.content_type == "application/pdf":

     extracted_text = extract_text_from_pdf(file_path)

    elif file.content_type in [
    "image/jpeg",
    "image/png"
]:

     extracted_text = extract_text_from_image(file_path)

    else:

      return {
        "error": "Format non supporté."
    }

    analysis = analyze_cv(extracted_text)

    skills = extract_skills(extracted_text)

    embedding = generate_embedding(extracted_text)

    embedding_json = json.dumps(embedding)

    skills_json = json.dumps(skills)

    # Création du CV
    new_cv = CV(
        filename=file.filename,
        file_path=file_path,
        extracted_text=extracted_text,
        analysis=analysis,
        embedding=embedding_json,
        skills=skills_json,
        user_id=current_user.id
    )

    # Enregistrement dans PostgreSQL
    db.add(new_cv)
    db.commit()
    db.refresh(new_cv)
    
  # Lancer automatiquement le matching
    match_cv_with_jobs(
       db=db,
       cv_id=new_cv.id
       
    )
    # Réponse
    return {
    "message": "CV enregistré avec succès.",
    "cv_id": new_cv.id,
    "filename": new_cv.filename,
    "user_id": new_cv.user_id,
    "analysis": analysis,
    "skills": skills,
    "text_length": len(extracted_text),
    "embedding_dimension": len(embedding)
}

@router.get("/me")
def get_my_cv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cv = (
        db.query(CV)
        .filter(CV.user_id == current_user.id)
        .order_by(CV.created_at.desc())
        .first()
    )

    if cv is None:
        raise HTTPException(
            status_code=404,
            detail="Aucun CV trouvé."
        )

    return {
        "id": cv.id,
        "filename": cv.filename,
        "created_at": cv.created_at,
        "analysis": cv.analysis,
        "skills": json.loads(cv.skills),
        "file_path": cv.file_path
    }