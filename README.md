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
├── backend/              # API FastAPI
│   ├── domain/           # Lógica de negocio (arquitectura hexagonal)
│   ├── application/      # Casos de uso y servicios
│   ├── infrastructure/   # Adaptadores y repositorios
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── frontend/             # Aplicación React con Vite
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── schemas/
│   ├── package.json
│   └── vite.config.js
├── .cursor/              # Configuración Cursor (MCP, Commands, Agentes)
│   ├── agents/           # Agentes especializados de IA
│   ├── commands/         # Commands para automatizar procesos
│   ├── doc/              # Documentación generada por user story
│   │   └── SCRUM-X/      # Documentación por ticket de Jira
│   ├── hooks/            # Scripts de automatización
│   ├── sessions/         # Contexto de conversaciones
│   ├── mcp.json          # Configuración MCP (credenciales)
│   └── settings.json     # Configuración de Cursor
├── .trees/               # Git worktrees para features
├── user_stories.md        # User stories sincronizadas desde Jira
└── README.md
```

## 🔧 Configuración MCP de Jira, GitHub y Figma para Cursor

Este proyecto está configurado para usar el Model Context Protocol (MCP) de Jira, GitHub y Figma, permitiendo que Cursor pueda leer user stories desde Jira, crear pull requests en GitHub y acceder a diseños de Figma.

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

#### Configuración de Figma:

Figma ofrece dos opciones de servidor MCP:

**Opción 1: Servidor MCP Local (Desktop)** - Recomendado
- Requiere la aplicación de escritorio de Figma
- Se ejecuta en `http://127.0.0.1:3845/mcp`
- Pasos para habilitarlo:
  1. Abre la aplicación de escritorio de Figma
  2. Abre un archivo de diseño
  3. Activa el Modo Desarrollador (Dev Mode) con `Shift + D`
  4. En el panel derecho, haz clic en "Habilitar servidor MCP de escritorio"
  5. El servidor estará disponible en `http://127.0.0.1:3845/mcp`

**Opción 2: Servidor MCP Remoto**
- Se ejecuta en `https://mcp.figma.com/mcp`
- No requiere la aplicación de escritorio
- Funciona desde el navegador

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

### Con Figma

Una vez configurado, puedes pedirle a Cursor que:

- "Obtén el contexto de diseño del frame seleccionado en Figma"
- "Genera código React basado en el diseño de Figma"
- "Extrae los colores y estilos del diseño actual"
- "Convierte el diseño de Figma a componentes React"
- "Muestra las especificaciones de diseño del frame seleccionado"

Cursor podrá interactuar directamente con Jira, GitHub y Figma a través del protocolo MCP.

---

## 🤖 Sistema de Agentes y Commands de Cursor

Este proyecto incluye un sistema completo de **agents** (agentes especializados) y **commands** (comandos automatizados) que permiten trabajar de forma estructurada con user stories de Jira, implementar features siguiendo metodologías específicas, y automatizar todo el flujo desde la lectura de la user story hasta la creación del Pull Request.

### 🎯 Commands Disponibles

Los commands son procesos automatizados que puedes ejecutar desde el chat de Cursor usando el formato `/command-name argument`:

#### `/start-working-on-jira-issue SCRUM-X`
**El command principal** - Automatiza todo el proceso desde leer una user story de Jira hasta crear el Pull Request:

1. Lee la user story de Jira
2. Crea estructura de documentación en `.cursor/doc/SCRUM-X/`
3. Crea/actualiza `user_stories.md`
4. Crea worktree para la feature
5. Planifica la implementación (explora, selecciona agentes, crea plan)
6. Implementa con TDD (Test-Driven Development)
7. Valida tests y builds
8. Crea resumen de implementación
9. Hace commit y push
10. Crea Pull Request en GitHub
11. Actualiza estado en Jira
12. Actualiza `user_stories.md` con documentación

**Ejemplo de uso:**
```
/start-working-on-jira-issue SCRUM-3
```

#### `/explore-plan "descripción de feature"`
Crea un plan detallado de implementación siguiendo el flujo: Explore → Team Selection → Plan → Advice → Update → Clarification → Iterate.

#### `/worktree-tdd issue-number`
Crea un worktree y trabaja en modo TDD (Test-Driven Development), implementando funcionalidad por funcionalidad.

#### `/worktree issue-number`
Crea un worktree para trabajar en una issue de GitHub.

#### `/create-new-gh-issue "descripción"`
Crea un nuevo issue en GitHub con estructura completa (problema, valor de usuario, criterios de aceptación, etc.).

#### `/implement-feedback issue-number`
Implementa feedback recibido en un PR o issue.

#### `/update-feedback issue-number`
Obtiene feedback de QA usando el agente `qa-criteria-validator` y actualiza el PR.

#### `/analyze_bug sentry-issue`
Analiza un bug de Sentry sin implementar cambios, solo investiga.

#### `/rule2hook`
Convierte reglas del proyecto en hooks de Cursor para automatización.

### 👥 Agentes Especializados

Los agentes son especialistas en diferentes áreas que se invocan automáticamente por los commands o manualmente cuando los necesites:

#### Backend
- **`hexagonal-backend-architect`** - Diseña arquitectura hexagonal para Python/FastAPI
- **`backend-test-architect`** - Crea tests unitarios con pytest siguiendo arquitectura hexagonal
- **`python-test-explorer`** - Diseña casos de prueba exhaustivos para código Python

#### Frontend
- **`frontend-developer`** - Desarrolla features React siguiendo arquitectura basada en features
- **`frontend-test-engineer`** - Crea tests con Vitest/Jest y React Testing Library
- **`shadcn-ui-architect`** - Diseña interfaces usando shadcn/ui components
- **`ui-ux-analyzer`** - Analiza UI/UX usando Playwright y proporciona feedback de diseño

#### QA y Validación
- **`qa-criteria-validator`** - Define criterios de aceptación y valida implementaciones con Playwright

### 📚 Estructura de Documentación

Cada user story genera documentación organizada en `.cursor/doc/{JIRA_TICKET}/`:

```
.cursor/doc/SCRUM-3/
├── backend.md          # Plan de implementación del backend
├── frontend.md         # Plan de implementación del frontend
├── shadcn_ui.md        # Plan de UI con shadcn/ui
├── test_cases.md       # Casos de prueba exhaustivos
├── ui_analysis.md      # Análisis UI/UX
└── summary.md          # Resumen final de la implementación
```

Esta documentación se referencia en `user_stories.md` para mantener trazabilidad completa.

### 🔧 Hooks y Sessions

#### Hooks (`.cursor/hooks/`)
Scripts que se ejecutan automáticamente en momentos específicos:
- **Stop Hook**: Se ejecuta cuando Cursor termina de responder
- **SubagentStop Hook**: Se ejecuta cuando un subagente termina
- **Notification Hook**: Se ejecuta cuando Cursor envía notificaciones (ej: pronuncia mensajes)

#### Sessions (`.cursor/sessions/`)
Archivos de contexto que mantienen el estado de una conversación o tarea:
- Guardan el contexto de una user story
- Registran iteraciones y decisiones
- Permiten retomar conversaciones sin perder información
- Coordinan múltiples agentes

### 🚀 Flujo de Trabajo Recomendado

1. **Iniciar trabajo en user story:**
   ```
   /start-working-on-jira-issue SCRUM-3
   ```

2. **La IA automáticamente:**
   - Lee la user story de Jira
   - Crea estructura de documentación
   - Planifica la implementación
   - Coordina agentes especializados
   - Implementa con TDD
   - Crea PR y actualiza Jira

3. **Revisar documentación generada:**
   - Ver `.cursor/doc/SCRUM-3/` para planes detallados
   - Ver `user_stories.md` para resumen y estado

### 📋 Metodología de Trabajo

El proyecto sigue una metodología estructurada:

- **Arquitectura Hexagonal** para backend (Python/FastAPI)
- **Arquitectura basada en Features** para frontend (React/Vite)
- **Test-Driven Development (TDD)** para implementación
- **Integración continua** con Jira y GitHub
- **Documentación automática** por cada user story

### 🎓 Cómo Ejecutar Commands

**Desde el chat de Cursor (Recomendado):**
```
/start-working-on-jira-issue SCRUM-3
```

**Ventajas:**
- Contexto visible en el chat
- Historial completo de la conversación
- Fácil seguimiento del progreso
- Puedes interrumpir o hacer preguntas

Los commands son procesos interactivos que pueden hacerte preguntas, mostrar progreso, y esperar tu confirmación antes de continuar.

## Servidores MCP instalados

### Jira MCP (`@mcp-devtools/jira`)
- Permite leer y gestionar issues de Jira
- Soporta búsquedas con JQL
- Acceso a user stories, bugs, tareas, etc.
- **Usado por:** `start-working-on-jira-issue` command

### GitHub MCP (`@modelcontextprotocol/server-github`)
- Permite crear y gestionar pull requests
- Acceso a repositorios, branches, commits
- Gestión de issues y pull requests
- **Usado por:** `start-working-on-jira-issue`, `create-new-gh-issue`, `implement-feedback` commands

### Figma MCP (Servidor HTTP)
- Permite acceder a diseños de Figma desde Cursor
- Extraer contexto de diseño y especificaciones
- Generar código basado en diseños
- Sincronizar diseño y código
- **Nota:** Requiere tener Figma abierto en modo Dev Mode para el servidor local

### Otros MCPs habilitados
- **Playwright MCP**: Para testing E2E y validación de criterios de aceptación
- **shadcn MCP**: Para acceder a componentes y documentación de shadcn/ui
- **Context7 MCP**: Para resolución de librerías y documentación
- **Sequential Thinking MCP**: Para razonamiento estructurado

## 📝 Archivos Importantes

### `user_stories.md`
Contiene todas las user stories sincronizadas desde Jira con:
- Descripción en formato "Como [rol], quiero [objetivo] para [beneficio]"
- Criterios de aceptación detallados
- Estado actual y Pull Request asociado
- Referencia a documentación en `.cursor/doc/{TICKET}/`

### `.cursor/doc/{JIRA_TICKET}/`
Carpeta de documentación generada automáticamente para cada user story:
- `backend.md` - Plan de implementación del backend
- `frontend.md` - Plan de implementación del frontend
- `shadcn_ui.md` - Plan de UI
- `test_cases.md` - Casos de prueba
- `ui_analysis.md` - Análisis UI/UX
- `summary.md` - Resumen de implementación

### `.cursor/sessions/context_session_{TICKET}.md`
Archivos de contexto que mantienen el estado de cada user story durante el desarrollo.

## ⚠️ Notas Importantes

- El archivo `.cursor/mcp.json` contiene credenciales sensibles, asegúrate de no subirlo al repositorio (está en `.gitignore`)
- La configuración MCP también puede hacerse a nivel global del usuario en `~/.cursor/mcp.json`
- Los servidores MCP se ejecutan automáticamente cuando Cursor los necesita usando `npx`
- Asegúrate de tener los permisos necesarios en GitHub para crear pull requests en el repositorio
- Los MCPs se instalan automáticamente la primera vez que se usan, no necesitas instalarlos manualmente
- Los commands se ejecutan desde el chat de Cursor usando el formato `/command-name argument`
- La documentación se genera automáticamente en `.cursor/doc/` cuando trabajas con user stories

## Solución de problemas

### El MCP no se conecta
1. Verifica que las credenciales en `.cursor/mcp.json` sean correctas
2. Asegúrate de haber reiniciado Cursor después de configurar
3. Verifica que Node.js esté instalado: `node --version`

### Error al instalar el servidor MCP
- Los servidores se instalan automáticamente con `npx`, asegúrate de tener conexión a internet
- Si hay problemas, puedes instalar manualmente: `npm install -g @mcp-devtools/jira @modelcontextprotocol/server-github`

### El servidor MCP de Figma no se conecta
1. **Para servidor local (desktop):**
   - Asegúrate de tener la aplicación de escritorio de Figma abierta
   - Verifica que el Modo Desarrollador esté activado (`Shift + D`)
   - Confirma que el servidor MCP esté habilitado en el panel derecho
   - El servidor debe estar corriendo en `http://127.0.0.1:3845/mcp`
   - Reinicia Cursor después de habilitar el servidor

2. **Para servidor remoto:**
   - Verifica que tengas acceso a `https://mcp.figma.com/mcp`
   - Algunos planes de Figma tienen límites de uso (consulta la documentación)
   - Usuarios con plan Starter tienen límites de hasta 6 llamadas por mes

### Los commands no se ejecutan
1. Verifica que el command existe en `.cursor/commands/`
2. Asegúrate de usar el formato correcto: `/command-name argument`
3. Verifica que estás en el directorio raíz del proyecto
4. Revisa que el archivo del command tenga el formato correcto

### Los agentes no generan documentación
1. Verifica que la carpeta `.cursor/doc/{TICKET}/` existe
2. Los agentes deben ser informados del ticket de Jira por el command principal
3. Revisa los logs del chat para ver errores específicos

## 🎯 Ejemplo de Flujo Completo

```bash
# 1. Iniciar trabajo en una user story
/start-working-on-jira-issue SCRUM-3

# La IA automáticamente:
# - Lee SCRUM-3 de Jira
# - Crea .cursor/doc/SCRUM-3/
# - Planifica la implementación
# - Coordina agentes (backend, frontend, testing, etc.)
# - Implementa con TDD
# - Crea PR en GitHub
# - Actualiza Jira
# - Actualiza user_stories.md

# 2. Revisar documentación generada
cat .cursor/doc/SCRUM-3/summary.md

# 3. Ver estado en user_stories.md
cat user_stories.md
```

## 📖 Recursos Adicionales

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cursor Documentation](https://cursor.sh/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

