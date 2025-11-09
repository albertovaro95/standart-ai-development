# Backend - AI Standart

Backend desarrollado con FastAPI para el proyecto AI Standart.

## Instalación

1. Crear un entorno virtual:
```bash
python -m venv venv
```

2. Activar el entorno virtual:
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

## Ejecución

### Modo desarrollo
```bash
python main.py
```

O usando uvicorn directamente:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en: http://localhost:8000

### Documentación
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Estructura del proyecto

```
backend/
├── main.py              # Aplicación principal FastAPI
├── requirements.txt     # Dependencias Python
├── .env.example         # Ejemplo de variables de entorno
└── README.md           # Este archivo
```
