from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ⚠️ Reemplaza con tus datos reales de Supabase (Connection String en modo URI)
DATABASE_URL = "postgresql://postgres:[KeJk8U&zgsj9_f34]@db.vedpwyhgnwvhkbptqilf.supabase.co:5432/postgres"

# El motor de la base de datos
engine = create_engine(DATABASE_URL)

# La sesión para interactuar con la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# La clase base de la cual heredarán nuestros modelos
Base = declarative_base()

# Dependencia para obtener la base de datos en los endpoints de FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()