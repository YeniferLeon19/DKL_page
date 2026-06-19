import os
import sys

# Esto le dice a Python: "Agrega la carpeta donde está este archivo al mapa de búsqueda"
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
import models
from database import engine, get_db

app = FastAPI(
    title="DarK Liquid (DKL) Store API",
    description="Backend transaccional para la tienda de ropa DKL",
    version="1.0.0"
)

# ===========================================================================
# CONFIGURACIÓN DE CORS (Permite que tu Frontend se conecte)
# ===========================================================================
# Aquí permitimos que cualquier origen se conecte. En producción puedes cerrarlo
# específicamente a la URL de tu sitio web.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite peticiones desde Live Server o cualquier lado
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# ===========================================================================
# ENDPOINTS / RUTAS DE PRUEBA Y CONTROL
# ===========================================================================

@app.get("/")
def inicio():
    return {
        "mensaje": "¡Bienvenido a la API de DarK Liquid (DKL) Store!",
        "estado": "Online",
        "docs_url": "/docs"
    }

@app.get("/api/health-check")
def verificar_base_datos(db: Session = Depends(get_db)):
    """Ruta para validar desde la API que la BD sigue conectada"""
    try:
        db.execute(text("SELECT 1;"))
        return {"status": "healthy", "database": "connected a Supabase"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en la BD: {str(e)}")

# ===========================================================================
# PRIMER ENDPOINT REAL: TRAER PRODUCTOS PARA EL FRONTEND
# ===========================================================================
@app.get("/api/productos")
def obtener_productos(categoria: str = None, db: Session = Depends(get_db)):
    """
    Retorna el catálogo de productos. 
    Opcionalmente se puede filtrar por categoría (ej. /api/productos?categoria=hombre)
    """
    query = db.query(models.Producto).filter(models.Producto.activo == True)
    
    if categoria:
        # Hacemos una búsqueda insensible a mayúsculas/minúsculas (ilike)
        query = query.filter(models.Producto.categoria.ilike(categoria))
        
    productos = query.all()
    return productos