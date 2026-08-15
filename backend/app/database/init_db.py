from app.database.database import engine
from app.database.base import Base
from app.models.job import Job

# importer les modèles
from app.models.user import User
from app.models.cv import CV
from app.models.match import Match

print("Création des tables...")

Base.metadata.create_all(bind=engine)

print("Toutes les tables ont été créées avec succès !")