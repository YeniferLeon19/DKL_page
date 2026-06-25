import urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Coloca tu contraseña limpia en una variable de texto
password_plana = "KeJk8U&zgsj9_f34"

# 2. Escapamos los caracteres especiales automáticamente
password_escapada = urllib.parse.quote_plus(password_plana)

# 3. Armamos la URL inyectando la contraseña ya formateada
DATABASE_URL = f"postgresql://postgres:{password_escapada}@db.vedpwyhgnwvhkbptqilf.supabase.co:5432/postgres"

# El resto del archivo se queda exactamente igual:
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()