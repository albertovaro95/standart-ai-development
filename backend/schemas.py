"""
Esquemas Pydantic para validación de datos
"""

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class LeadCreate(BaseModel):
    """Esquema para crear un nuevo lead"""
    name: str = Field(..., min_length=1, max_length=100, description="Nombre completo")
    email: EmailStr = Field(..., description="Email válido")
    phone: str = Field(..., min_length=9, max_length=20, description="Número de teléfono")


class LeadResponse(BaseModel):
    """Esquema para respuesta de lead"""
    id: int
    name: str
    email: str
    phone: str
    created_at: datetime

    class Config:
        from_attributes = True

