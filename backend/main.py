"""
Backend principal de la aplicación AI Standart
Framework: FastAPI
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import init_db, get_db, Lead
from schemas import LeadCreate, LeadResponse

app = FastAPI(
    title="AI Standart API",
    description="API backend para el proyecto AI Standart",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Inicializar base de datos al arrancar
@app.on_event("startup")
async def startup_event():
    init_db()


@app.get("/")
async def root():
    """Endpoint raíz de la API"""
    return {
        "message": "Bienvenido a AI Standart API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Endpoint de health check"""
    return {"status": "healthy"}


@app.post("/api/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """
    Crear un nuevo lead (registro de usuario interesado)
    """
    # Verificar si el email ya existe
    existing_lead = db.query(Lead).filter(Lead.email == lead.email).first()
    if existing_lead:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este email ya está registrado"
        )
    
    # Crear nuevo lead
    db_lead = Lead(
        name=lead.name,
        email=lead.email,
        phone=lead.phone
    )
    
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    return db_lead


@app.get("/api/leads", response_model=List[LeadResponse])
async def get_leads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtener lista de leads (solo para administración)
    """
    leads = db.query(Lead).offset(skip).limit(limit).all()
    return leads


@app.get("/api/leads/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: int, db: Session = Depends(get_db)):
    """
    Obtener un lead específico por ID
    """
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead no encontrado"
        )
    return lead


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

