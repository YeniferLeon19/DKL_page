from database import engine, SessionLocal
from sqlalchemy import text  # <-- Importamos la función de texto explícito

def probar_conexion():
    print("🔌 Intentando conectar a Supabase...")
    try:
        db = SessionLocal()
        # Envolvemos el string con text()
        resultado = db.execute(text("SELECT 1;")).fetchone()
        
        if resultado and resultado[0] == 1:
            print("✅ ¡CONEXIÓN EXITOSA! FastAPI se comunicó perfectamente con Supabase.")
        else:
            print("⚠️ Hubo respuesta, pero no fue la esperada.")
            
        db.close()
    except Exception as e:
        print("❌ Error de conexión. Revisa tus credenciales o el formato del string.")
        print(f"Detalle del error:\n{e}")

if __name__ == "__main__":
    probar_conexion()