# Crear Proyecto desde Plantilla - Generador de Repositorios

Este command crea un nuevo repositorio en GitHub con una estructura similar a este proyecto, adaptada según el objetivo especificado.

## 🎯 Cómo Usar

Ejecuta este command desde el chat de Cursor usando:

```
/create-project-from-template MVP
/create-project-from-template hackathon
/create-project-from-template production
/create-project-from-template standard
```

El command te pedirá:
1. Nombre del repositorio
2. Descripción del proyecto
3. Visibilidad (público/privado)
4. Owner de GitHub (cuenta u organización)

Luego creará automáticamente el repositorio con toda la estructura necesaria.

## 📋 Parámetro: $ARGUMENT$

El parámetro `$ARGUMENT$` define el **objetivo del proyecto** y determina qué estructura, agentes y commands se incluirán:

### Objetivos Disponibles:
- **`MVP`** - Minimum Viable Product: Estructura mínima, tests básicos, agentes esenciales
- **`hackathon`** - Proyecto rápido: Estructura simplificada, sin tests exhaustivos, agentes básicos
- **`production`** - Producción: Estructura completa, tests completos, todos los agentes
- **`standard`** - Estándar: Estructura completa similar a este proyecto (por defecto)

---

## 🚀 Fase 1: Análisis del Objetivo

### 1.1 Determinar Configuración según Objetivo

Basado en `$ARGUMENT$`, determinar:

**Para MVP:**
- Tests: Mínimos (solo tests críticos)
- Agentes: `hexagonal-backend-architect`, `frontend-developer`
- Commands: `create-new-gh-issue`, `explore-plan`
- Estructura: Simplificada, sin documentación exhaustiva

**Para hackathon:**
- Tests: Mínimos o ninguno
- Agentes: `hexagonal-backend-architect`, `frontend-developer`, `shadcn-ui-architect`
- Commands: `create-new-gh-issue`, `explore-plan`
- Estructura: Muy simplificada, enfoque en velocidad

**Para production:**
- Tests: Completos (backend + frontend + E2E)
- Agentes: Todos los agentes disponibles
- Commands: Todos los commands disponibles
- Estructura: Completa con documentación exhaustiva

**Para standard (por defecto):**
- Tests: Completos
- Agentes: Todos los agentes
- Commands: Todos los commands
- Estructura: Igual a este proyecto

### 1.2 Solicitar Información Adicional

Antes de crear el repositorio, preguntar al usuario:
1. **Nombre del repositorio**: ¿Qué nombre quieres para el repositorio?
2. **Descripción**: ¿Descripción del proyecto?
3. **Visibilidad**: ¿Público o privado? (por defecto: privado)
4. **Owner de GitHub**: ¿En qué cuenta/organización crear el repo? (por defecto: albertovaro95)

**IMPORTANTE**: Esperar las respuestas del usuario antes de continuar.

---

## 📁 Fase 2: Crear Estructura Local Temporal

### 2.1 Crear Directorio Temporal
```bash
mkdir -p /tmp/new-project-$(date +%s)
cd /tmp/new-project-$(date +%s)
```

### 2.2 Crear Estructura Base del Proyecto

```
nuevo-proyecto/
├── backend/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   ├── main.py
│   ├── database.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   │   ├── queries/
│   │   │   ├── mutations/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
├── .cursor/
│   ├── agents/
│   ├── commands/
│   ├── doc/
│   ├── hooks/
│   ├── sessions/
│   ├── mcp.json.example
│   └── settings.json
├── .gitignore
├── Makefile
├── README.md
└── user_stories.md
```

---

## 📝 Fase 3: Generar Archivos Base

### 3.1 Backend - Estructura Base

**backend/main.py:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API",
    description="API REST con FastAPI",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API funcionando"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**backend/requirements.txt:**
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
sqlalchemy==2.0.23
pydantic==2.5.0
pydantic[email]==2.5.0
```

**backend/database.py:**
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Por ahora sin base de datos, se puede agregar después
Base = declarative_base()
```

**backend/schemas.py:**
```python
from pydantic import BaseModel

# Schemas base - agregar según necesidad
```

**backend/README.md:**
```markdown
# Backend

API REST desarrollada con FastAPI siguiendo arquitectura hexagonal.

## Instalación

```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

El servidor estará disponible en http://localhost:8000
- Documentación API: http://localhost:8000/docs
```

### 3.2 Frontend - Estructura Base

**frontend/package.json:**
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7",
    "vitest": "^2.1.0"
  }
}
```

**frontend/vite.config.js:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

**frontend/src/App.jsx:**
```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Nuevo Proyecto</h1>
      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>
    </div>
  )
}

export default App
```

**frontend/src/main.jsx:**
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**frontend/index.html:**
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo Proyecto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 3.3 .cursor/ - Agentes y Commands según Objetivo

**IMPORTANTE**: Los archivos de agentes y commands deben copiarse desde el proyecto actual (standart-ai-development) en `.cursor/agents/` y `.cursor/commands/`.

#### Para MVP:
**Agentes mínimos:**
- `hexagonal-backend-architect.md`
- `frontend-developer.md`

**Commands mínimos:**
- `create-new-gh-issue.md`
- `explore-plan.md`

**Pasos:**
1. Leer archivos desde `.cursor/agents/hexagonal-backend-architect.md`
2. Leer archivos desde `.cursor/agents/frontend-developer.md`
3. Leer archivos desde `.cursor/commands/create-new-gh-issue.md`
4. Leer archivos desde `.cursor/commands/explore-plan.md`
5. Escribir estos archivos en el directorio temporal en `.cursor/agents/` y `.cursor/commands/`

#### Para hackathon:
**Agentes básicos:**
- `hexagonal-backend-architect.md`
- `frontend-developer.md`
- `shadcn-ui-architect.md`

**Commands básicos:**
- `create-new-gh-issue.md`
- `explore-plan.md`

**Pasos:** Similar a MVP, agregando `shadcn-ui-architect.md`

#### Para production/standard:
**Todos los agentes disponibles:**
- `hexagonal-backend-architect.md`
- `backend-test-architect.md`
- `frontend-developer.md`
- `frontend-test-engineer.md`
- `python-test-explorer.md`
- `qa-criteria-validator.md`
- `shadcn-ui-architect.md`
- `ui-ux-analyzer.md`

**Todos los commands disponibles:**
- `create-new-gh-issue.md`
- `explore-plan.md`
- `start-working-on-jira-issue.md`
- `worktree-tdd.md`
- `worktree.md`
- `implement-feedback.md`
- `update-feedback.md`
- `analyze_bug.md`
- `rule2hook.md`
- `enrich_us.md` (si existe)
- `enrichus.md` (si existe)

**Pasos:**
1. Listar todos los archivos en `.cursor/agents/` del proyecto actual
2. Listar todos los archivos en `.cursor/commands/` del proyecto actual
3. Leer cada archivo y escribirlo en el directorio temporal

**Nota sobre implementación:**
- Usar `list_dir` para obtener lista de agentes y commands
- Usar `read_file` para leer cada archivo
- Usar `write` para escribir en el directorio temporal
- Manejar errores si algún archivo no existe

### 3.4 .cursor/settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(mkdir:*)",
      "Bash(find:*)",
      "Bash(mv:*)",
      "Bash(grep:*)",
      "Bash(npm:*)",
      "Bash(pip:*)",
      "Bash(python:*)",
      "Bash(ls:*)",
      "Bash(cp:*)",
      "Write",
      "Edit",
      "Bash(touch:*)",
      "Bash(pip install:*)",
      "Bash(uvicorn:*)",
      "Bash(git worktree:*)",
      "Bash(pytest:*)",
      "mcp_github_create_pull_request",
      "mcp_github_create_branch",
      "mcp_github_push_files",
      "mcp_github_create_or_update_file"
    ],
    "deny": []
  },
  "enabledMcpjsonServers": ["github"],
  "hooks": {}
}
```

### 3.5 .cursor/mcp.json.example

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "TU_TOKEN_AQUI"
      }
    }
  }
}
```

### 3.6 Makefile

Copiar el Makefile desde este proyecto y adaptarlo si es necesario.

### 3.7 .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
*.egg-info/
dist/
build/

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
dist/
dist-ssr/
*.local

# Cursor
.cursor/mcp.json
.cursor/sessions/
.cursor/doc/
.trees/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.*.local
```

### 3.8 README.md Principal

```markdown
# {NOMBRE_DEL_PROYECTO}

{DESCRIPCION_DEL_PROYECTO}

## 🚀 Inicio Rápido

### Opción 1: Usando Makefile (Recomendado)

```bash
# Instalar todas las dependencias
make install

# Levantar backend y frontend en paralelo
make dev
```

### Opción 2: Manual

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/              # API FastAPI
├── frontend/             # Aplicación React con Vite
└── .cursor/              # Configuración Cursor (Agentes, Commands)
```

## 🔧 Configuración

1. Copia `.cursor/mcp.json.example` a `.cursor/mcp.json`
2. Edita `.cursor/mcp.json` con tus credenciales de GitHub
3. Reinicia Cursor

## 📝 Notas

Este proyecto fue generado usando el template de standart-ai-development.
Objetivo: $ARGUMENT$
```

### 3.9 Tests según Objetivo

**Para MVP/hackathon:**
- No crear estructura de tests inicial
- Solo comentarios en README sobre cómo agregar tests después

**Para production/standard:**
- Crear estructura de tests:
  - `backend/tests/` (con `__init__.py` y `conftest.py`)
  - `frontend/src/test/` (con `setup.js`)
  - Agregar pytest a requirements.txt
  - Configurar vitest en package.json (ya incluido)

---

## 🚀 Fase 4: Crear Repositorio en GitHub

### 4.1 Crear Repositorio

Usar GitHub MCP para crear el repositorio:

```javascript
mcp_github_create_repository(
  name: "{NOMBRE_REPOSITORIO}",
  description: "{DESCRIPCION}",
  private: {true/false}
)
```

### 4.2 Inicializar Git y Push Inicial

```bash
# En el directorio temporal
git init
git add .
git commit -m "chore: Initial commit - Proyecto generado desde template

Objetivo: $ARGUMENT$
Generado automáticamente desde standart-ai-development"
```

### 4.3 Preparar Archivos para Push

En lugar de hacer push de todos los archivos de una vez (lo cual puede ser problemático con muchos archivos), usar una estrategia híbrida:

**Opción A: Push de archivos críticos primero**
1. Push de archivos principales usando GitHub MCP:
   - README.md
   - .gitignore
   - Makefile
   - backend/main.py
   - backend/requirements.txt
   - frontend/package.json
   - frontend/vite.config.js
   - frontend/src/App.jsx
   - frontend/src/main.jsx

**Opción B: Instrucciones para el usuario**
Después de crear el repositorio, proporcionar instrucciones al usuario para:
1. Clonar el repositorio
2. Copiar los archivos generados localmente
3. Hacer commit y push

**Opción C: Usar git directamente (si está disponible)**
Si git está configurado en el sistema:
```bash
cd /tmp/new-project-{timestamp}
git remote add origin https://github.com/{OWNER}/{NOMBRE_REPOSITORIO}.git
git branch -M main
git push -u origin main
```

**Estrategia recomendada**: 
- Crear el repositorio vacío en GitHub
- Generar todos los archivos localmente
- Intentar hacer push de archivos críticos con GitHub MCP
- Si falla o hay muchos archivos, proporcionar instrucciones claras al usuario para completar el proceso

---

## ✅ Fase 5: Verificación y Resumen

### 5.1 Verificar Repositorio Creado

Usar GitHub MCP para verificar:
- El repositorio existe
- Tiene la estructura correcta
- El README se muestra correctamente

### 5.2 Mostrar Resumen al Usuario

Mostrar un resumen completo:

```
✅ Repositorio creado exitosamente!

📦 Repositorio: https://github.com/{OWNER}/{NOMBRE_REPOSITORIO}
🎯 Objetivo: $ARGUMENT$
📁 Estructura: Backend (Python/FastAPI) + Frontend (React/Vite)

🤖 Agentes incluidos:
{lista de agentes según objetivo}

⚡ Commands incluidos:
{lista de commands según objetivo}

🧪 Tests: {configuración según objetivo}

📝 Próximos pasos:
1. Clonar el repositorio:
   git clone https://github.com/{OWNER}/{NOMBRE_REPOSITORIO}
   cd {NOMBRE_REPOSITORIO}

2. Configurar MCP (opcional pero recomendado):
   cp .cursor/mcp.json.example .cursor/mcp.json
   # Edita .cursor/mcp.json con tus credenciales de GitHub

3. Instalar dependencias:
   make install
   # O manualmente:
   # cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
   # cd frontend && npm install

4. Iniciar el proyecto:
   make dev
   # O por separado:
   # make backend  # Backend en http://localhost:8000
   # make frontend # Frontend en http://localhost:5173

5. ¡Empieza a desarrollar! 🚀
```

**IMPORTANTE**: Si el push de archivos no se completó automáticamente, proporcionar instrucciones adicionales:
- Los archivos están en: `/tmp/new-project-{timestamp}/`
- Puedes copiarlos manualmente al repositorio clonado
- O usar `git add . && git commit -m "Initial commit" && git push`

---

## 📝 Notas Importantes

### Limitaciones
- El push inicial puede requerir múltiples llamadas si hay muchos archivos
- Los agentes y commands se copian desde este proyecto, asegúrate de que existan
- La configuración MCP debe ser completada manualmente por el usuario

### Personalización
- El usuario puede modificar la estructura después de crear el repositorio
- Los agentes y commands pueden ser ajustados según necesidades específicas
- La estructura de tests puede expandirse después

### Objetivos Especiales
Si el usuario especifica un objetivo no estándar (no MVP, hackathon, production, standard):
- Usar configuración de "standard" como base
- Informar al usuario que se usó la configuración estándar
- Sugerir personalización manual después

---

## 🔄 Flujo Completo Resumido

1. ✅ **Analizar objetivo** → Determinar estructura, agentes, commands
2. ✅ **Solicitar información** → Nombre repo, descripción, visibilidad, owner
3. ✅ **Crear estructura local** → Generar todos los archivos base
4. ✅ **Copiar agentes/commands** → Según objetivo
5. ✅ **Crear repositorio GitHub** → Usar GitHub MCP
6. ✅ **Push inicial** → Subir todos los archivos
7. ✅ **Verificar y resumir** → Mostrar URL y próximos pasos

---

## 🎯 Resultado Esperado

Al finalizar este proceso:
- ✅ Repositorio GitHub creado con estructura completa
- ✅ Backend Python (FastAPI) configurado
- ✅ Frontend React (Vite) configurado
- ✅ Carpeta `.cursor/` con agentes y commands según objetivo
- ✅ Makefile para facilitar desarrollo
- ✅ README con instrucciones
- ✅ Tests configurados según objetivo
- ✅ .gitignore apropiado
- ✅ Configuración MCP base (ejemplo)

