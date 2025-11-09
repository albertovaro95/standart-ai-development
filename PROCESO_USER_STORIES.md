# Proceso Automatizado: De User Story a Pull Request

Este documento describe el proceso completo para leer user stories de Jira, implementarlas y crear pull requests en GitHub.

## 📋 Índice

1. [Leer User Stories de Jira](#1-leer-user-stories-de-jira)
2. [Crear Archivo user_stories.md](#2-crear-archivo-user_storiesmd)
3. [Implementar la User Story](#3-implementar-la-user-story)
4. [Crear Pull Request en GitHub](#4-crear-pull-request-en-github)
5. [Actualizar Estado en Jira](#5-actualizar-estado-en-jira)

---

## 1. Leer User Stories de Jira

### 1.1 Listar Proyectos Disponibles

```bash
# Usar MCP de Jira para listar proyectos
mcp_jira_list_projects
```

### 1.2 Leer un Ticket Específico

```bash
# Leer ticket por su clave (ej: SCRUM-1)
mcp_jira_read_ticket SCRUM-1
mcp_jira_get_ticket SCRUM-1
```

### 1.3 Obtener Estados Disponibles

```bash
# Ver todos los estados disponibles en Jira
mcp_jira_get_all_statuses
```

**Estados comunes:**
- Idea (10000)
- Tareas por hacer / To Do (10001)
- En curso / In Progress (10002)
- Pruebas / Testing (10003)
- Finalizada / Done (10004)

---

## 2. Crear Archivo user_stories.md

### 2.1 Formato del Archivo

Crear o actualizar `user_stories.md` con el siguiente formato:

```markdown
# User Stories

Este archivo contiene las user stories sincronizadas desde Jira del proyecto AI Standart (SCRUM).

## SCRUM-{NUMERO}: {Título de la User Story}

**Descripción:**
{Descripción detallada de la user story}

**Criterios de Aceptación:**
- {Criterio 1}
- {Criterio 2}
- {Criterio 3}

**Story Points:** {Número}
**Prioridad:** {Alta/Media/Baja}
**Estado:** {Estado actual}
**Tecnologías:** {Tecnologías involucradas}
**Pull Request:** {URL del PR si existe}
```

### 2.2 Mejorar la Definición

Al crear el archivo, mejorar la definición de la user story:
- Convertir descripciones técnicas en formato "Como [rol], quiero [objetivo] para [beneficio]"
- Expandir criterios de aceptación con detalles específicos
- Agregar información relevante (tecnologías, enlaces, etc.)

---

## 3. Implementar la User Story

### 3.1 Estructura del Proyecto

Para SCRUM-1 (Crear proyecto base), la estructura incluye:

```
standart-ai-development/
├── backend/              # API FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── frontend/             # Aplicación React con Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .cursor/              # Configuración MCP
├── .gitignore
├── README.md
└── user_stories.md
```

### 3.2 Backend (Python/FastAPI)

**Archivos a crear:**

1. **backend/main.py**
```python
"""
Backend principal de la aplicación AI Standart
Framework: FastAPI
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Standart API",
    description="API backend para el proyecto AI Standart",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

2. **backend/requirements.txt**
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
```

3. **backend/README.md** (ver ejemplo en el repositorio)

### 3.3 Frontend (React/Vite)

**Crear proyecto React con Vite:**
```bash
npm create vite@latest frontend -- --template react --yes
cd frontend
npm install
```

**Archivos principales:**
- `frontend/package.json` - Dependencias
- `frontend/vite.config.js` - Configuración de Vite
- `frontend/src/App.jsx` - Componente principal
- `frontend/src/main.jsx` - Punto de entrada

### 3.4 Archivos de Configuración

1. **.gitignore**
```
# Configuración MCP de Jira y GitHub (contiene credenciales)
.cursor/mcp.json

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

2. **README.md** - Actualizar con información del proyecto

---

## 4. Crear Pull Request en GitHub

### 4.1 Verificar Repositorio

```bash
# Verificar remoto configurado
git remote -v

# Verificar estado
git status
```

### 4.2 Crear Rama y Commit

```bash
# Crear rama con nombre descriptivo
git checkout -b feature/SCRUM-{NUMERO}-{descripcion}

# Agregar todos los archivos
git add .

# Crear commit con mensaje descriptivo
git commit -m "feat: Implementar SCRUM-{NUMERO} - {Título}

- {Cambio 1}
- {Cambio 2}
- {Cambio 3}

Cumple con todos los criterios de aceptación de SCRUM-{NUMERO}"
```

### 4.3 Usar MCP de GitHub (si git push falla)

Si hay problemas de permisos con git push, usar el MCP de GitHub:

#### 4.3.1 Crear README inicial en main (si el repo está vacío)

```javascript
mcp_github_create_or_update_file(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  path: "README.md",
  content: "# AI Standart Development\n\nProyecto full-stack...",
  message: "Initial commit",
  branch: "main"
)
```

#### 4.3.2 Crear Rama Feature

```javascript
mcp_github_create_branch(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  branch: "feature/SCRUM-{NUMERO}-{descripcion}"
)
```

#### 4.3.3 Subir Archivos

```javascript
mcp_github_push_files(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  branch: "feature/SCRUM-{NUMERO}-{descripcion}",
  message: "feat: Implementar SCRUM-{NUMERO} - {Título}\n\n- Cambio 1\n- Cambio 2",
  files: [
    { path: "README.md", content: "..." },
    { path: "backend/main.py", content: "..." },
    // ... más archivos
  ]
)
```

### 4.4 Crear Pull Request

```javascript
mcp_github_create_pull_request(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  title: "feat: SCRUM-{NUMERO} - {Título}",
  head: "feature/SCRUM-{NUMERO}-{descripcion}",
  base: "main",
  body: `## 📋 Descripción

Implementación de la user story **SCRUM-{NUMERO}: {Título}**.

## ✅ Criterios de Aceptación Cumplidos

- ✅ {Criterio 1}
- ✅ {Criterio 2}

## 🚀 Cambios Realizados

### Backend
- {Cambio backend 1}
- {Cambio backend 2}

### Frontend
- {Cambio frontend 1}

## 🔗 Relacionado

- Jira: SCRUM-{NUMERO}`
)
```

---

## 5. Actualizar Estado en Jira

### 5.1 Obtener Transiciones Disponibles

```bash
# Obtener transiciones disponibles para el ticket
curl -X GET "https://mslp.atlassian.net/rest/api/3/issue/SCRUM-{NUMERO}/transitions" \
  -u "{EMAIL}:{API_KEY}" \
  -H "Accept: application/json" | python3 -m json.tool
```

**Transiciones comunes:**
- "En curso" (ID: 31) → Estado: En curso (10002)
- "Testing" (ID: 41) → Estado: Pruebas (10003)
- "Listo" (ID: 51) → Estado: Finalizada (10004)

### 5.2 Actualizar Descripción del Ticket

```javascript
mcp_jira_edit_ticket(
  issueIdOrKey: "SCRUM-{NUMERO}",
  description: "{Descripción original}\n\n**Estado actual:** Pruebas (Testing)\n**Pull Request:** {URL_PR}"
)
```

### 5.3 Cambiar Estado del Ticket

```bash
# Cambiar a estado "Pruebas" (Testing)
curl -X POST "https://mslp.atlassian.net/rest/api/3/issue/SCRUM-{NUMERO}/transitions" \
  -u "{EMAIL}:{API_KEY}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"transition":{"id":"41"}}'
```

**IDs de transición:**
- 11: Idea
- 21: Por hacer
- 31: En curso
- 41: Testing (Pruebas)
- 51: Listo (Finalizada)

### 5.4 Verificar Cambio de Estado

```bash
# Verificar estado actual
curl -X GET "https://mslp.atlassian.net/rest/api/3/issue/SCRUM-{NUMERO}?fields=status" \
  -u "{EMAIL}:{API_KEY}" \
  -H "Accept: application/json" | python3 -m json.tool | grep -A 5 "status"
```

### 5.5 Actualizar user_stories.md Local

Actualizar el archivo `user_stories.md` con:
- Estado actualizado
- Enlace al Pull Request

```markdown
**Estado:** Pruebas (Testing)
**Pull Request:** https://github.com/albertovaro95/standart-ai-development/pull/{NUMERO}
```

---

## 🔄 Flujo Completo Resumido

1. **Leer user story de Jira** → `mcp_jira_read_ticket SCRUM-{NUMERO}`
2. **Crear/actualizar user_stories.md** → Mejorar definición y formato
3. **Implementar cambios** → Crear estructura, código, configuraciones
4. **Crear rama y commit** → `git checkout -b feature/...` y `git commit`
5. **Subir a GitHub** → `git push` o usar `mcp_github_push_files`
6. **Crear Pull Request** → `mcp_github_create_pull_request`
7. **Actualizar Jira** → Editar descripción y cambiar estado a "Pruebas"
8. **Actualizar user_stories.md** → Reflejar estado y PR

---

## 📝 Notas Importantes

### Credenciales
- Las credenciales de Jira y GitHub están en `.cursor/mcp.json`
- Este archivo está en `.gitignore` y no debe subirse al repositorio

### Variables de Entorno
- `JIRA_URL`: https://mslp.atlassian.net
- `JIRA_API_MAIL`: Tu email de Atlassian
- `JIRA_API_KEY`: Token de API de Jira
- `GITHUB_PERSONAL_ACCESS_TOKEN`: Token de GitHub

### Comandos Útiles

```bash
# Verificar conexión a Jira
mcp_jira_list_projects

# Verificar conexión a GitHub
mcp_github_list_issues owner="albertovaro95" repo="standart-ai-development"

# Ver estado actual del ticket
curl -X GET "https://mslp.atlassian.net/rest/api/3/issue/SCRUM-{NUMERO}?fields=status" \
  -u "{EMAIL}:{API_KEY}" \
  -H "Accept: application/json"
```

---

## 🚀 Ejemplo Completo: SCRUM-1

Este proceso fue ejecutado exitosamente para SCRUM-1:

1. ✅ Leída user story "Crear proyecto" de Jira
2. ✅ Creado `user_stories.md` con definición mejorada
3. ✅ Implementada estructura completa (backend FastAPI + frontend React)
4. ✅ Creado PR #1 en GitHub: https://github.com/albertovaro95/standart-ai-development/pull/1
5. ✅ Estado actualizado a "Pruebas" en Jira

**Resultado:** User story completa, PR creado, estado en Testing.

---

## 📚 Referencias

- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Model Context Protocol](https://modelcontextprotocol.io/)

