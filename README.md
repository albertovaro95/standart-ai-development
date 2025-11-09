# AI Standart Development

Proyecto full-stack desarrollado con Python (FastAPI) para el backend y React (Vite) para el frontend.

## 🚀 Inicio Rápido

### Opción 1: Usando Makefile (Recomendado)

```bash
# Instalar todas las dependencias
make install

# Levantar backend y frontend en paralelo
make dev

# O levantar por separado:
make backend    # Solo backend
make frontend   # Solo frontend
```

### Opción 2: Manual

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

El backend estará disponible en http://localhost:8000
- Documentación API: http://localhost:8000/docs

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en http://localhost:5173

### Comandos Makefile disponibles

```bash
make help              # Ver todos los comandos disponibles
make install           # Instalar todas las dependencias
make install-backend   # Instalar solo dependencias del backend
make install-frontend  # Instalar solo dependencias del frontend
make backend           # Levantar solo el backend
make frontend          # Levantar solo el frontend
make dev               # Levantar backend y frontend en paralelo
make status            # Verificar estado de los servidores
make clean             # Limpiar archivos generados
make clean-db          # Limpiar solo la base de datos
make build-frontend    # Compilar frontend para producción
```

## 📁 Estructura del Proyecto

```
standart-ai-development/
├── backend/          # API FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── frontend/         # Aplicación React con Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .cursor/          # Configuración MCP
└── README.md
```

## 🔧 Configuración MCP de Jira y GitHub para Cursor

Este proyecto está configurado para usar el Model Context Protocol (MCP) de Jira y GitHub, permitiendo que Cursor pueda leer user stories desde Jira y crear pull requests en GitHub.

## Instalación de los MCPs

Los servidores MCP se instalan automáticamente cuando Cursor los necesita usando `npx`. No es necesario instalarlos manualmente, pero asegúrate de tener Node.js instalado en tu sistema.

### Verificar Node.js

```bash
node --version
npm --version
```

Si no tienes Node.js instalado:
- **macOS**: `brew install node`
- **Linux**: `sudo apt install nodejs npm`
- **Windows**: Descarga desde [nodejs.org](https://nodejs.org/)

## Configuración

### 1. Configurar MCP en Cursor

La configuración MCP se encuentra en `.cursor/mcp.json`. Si no existe, cópiala desde el ejemplo:

```bash
cp .cursor/mcp.json.example .cursor/mcp.json
```

### 2. Editar la configuración

Edita `.cursor/mcp.json` con tus credenciales:

#### Configuración de Jira:
- **JIRA_URL**: La URL de tu instancia de Jira (ej: `https://tu-empresa.atlassian.net`)
- **JIRA_API_MAIL**: Tu email de cuenta de Atlassian/Jira
- **JIRA_API_KEY**: Tu token de API de Jira

#### Configuración de GitHub:
- **GITHUB_PERSONAL_ACCESS_TOKEN**: Tu Personal Access Token de GitHub

### 3. Obtener tus tokens

#### API Token de Jira:
1. Ve a: https://id.atlassian.com/manage-profile/security/api-tokens
2. Haz clic en "Create API token"
3. Dale un nombre descriptivo (ej: "Cursor MCP")
4. Copia el token generado y pégalo en `.cursor/mcp.json`

#### Personal Access Token de GitHub:
1. Ve a: https://github.com/settings/tokens
2. Haz clic en "Generate new token" → "Generate new token (classic)"
3. Dale un nombre descriptivo (ej: "Cursor MCP")
4. Selecciona los scopes necesarios:
   - `repo` (acceso completo a repositorios)
   - `pull_requests` (crear y gestionar pull requests)
   - `read:org` (opcional, si trabajas con organizaciones)
5. Copia el token generado y pégalo en `.cursor/mcp.json`

### 4. Reiniciar Cursor

Después de configurar, reinicia Cursor para que cargue la configuración MCP.

## Uso

### Con Jira

Una vez configurado, puedes pedirle a Cursor que:

- "Lee las user stories del proyecto PROJ"
- "Muéstrame las user stories en progreso"
- "Crea un resumen de las user stories del sprint actual"
- "Sincroniza las user stories del archivo user_stories.md con Jira"
- "Obtén los detalles de la user story PROJ-123"

### Con GitHub

Puedes pedirle a Cursor que:

- "Crea un pull request con estos cambios"
- "Abre un PR desde la rama feature/nueva-funcionalidad hacia main"
- "Muéstrame los pull requests abiertos en este repositorio"
- "Crea un PR relacionado con la user story PROJ-123"
- "Revisa el PR #42 y sugiere mejoras"
- "Lista los archivos modificados en el PR #10"

Cursor podrá interactuar directamente con Jira y GitHub a través del protocolo MCP.

## Servidores MCP instalados

### Jira MCP (`@mcp-devtools/jira`)
- Permite leer y gestionar issues de Jira
- Soporta búsquedas con JQL
- Acceso a user stories, bugs, tareas, etc.

### GitHub MCP (`@modelcontextprotocol/server-github`)
- Permite crear y gestionar pull requests
- Acceso a repositorios, branches, commits
- Gestión de issues y pull requests

## Notas

- El archivo `.cursor/mcp.json` contiene credenciales sensibles, asegúrate de no subirlo al repositorio (está en `.gitignore`)
- La configuración MCP también puede hacerse a nivel global del usuario en `~/.cursor/mcp.json`
- Los servidores MCP se ejecutan automáticamente cuando Cursor los necesita usando `npx`
- Asegúrate de tener los permisos necesarios en GitHub para crear pull requests en el repositorio
- Los MCPs se instalan automáticamente la primera vez que se usan, no necesitas instalarlos manualmente

## Solución de problemas

### El MCP no se conecta
1. Verifica que las credenciales en `.cursor/mcp.json` sean correctas
2. Asegúrate de haber reiniciado Cursor después de configurar
3. Verifica que Node.js esté instalado: `node --version`

### Error al instalar el servidor MCP
- Los servidores se instalan automáticamente con `npx`, asegúrate de tener conexión a internet
- Si hay problemas, puedes instalar manualmente: `npm install -g @mcp-devtools/jira @modelcontextprotocol/server-github`
