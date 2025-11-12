# Jira Issue Workflow - Proceso Completo: De User Story a Pull Request

Este command automatiza el proceso completo desde leer una user story de Jira hasta crear el Pull Request en GitHub.

## 📋 Fase 1: Setup y Lectura de Jira Issue #$ARGUMENT$

### 1.1 Setup Inicial
1. Fetch latest branches: `git fetch origin`
2. Verificar conexión a Jira: `mcp_jira_list_projects`

### 1.2 Leer User Story de Jira
1. Leer ticket completo: `mcp_jira_read_ticket $ARGUMENT$`
2. Obtener detalles completos: `mcp_jira_get_ticket $ARGUMENT$`
3. Extraer información:
   - Título de la user story
   - Descripción detallada
   - Criterios de aceptación
   - Story Points
   - Prioridad
   - Estado actual
   - Tecnologías involucradas

### 1.3 Obtener Estados Disponibles (si es necesario)
```bash
mcp_jira_get_all_statuses
```

**Estados comunes:**
- Idea (10000)
- Tareas por hacer / To Do (10001)
- En curso / In Progress (10002)
- Pruebas / Testing (10003)
- Finalizada / Done (10004)

---

## 📁 Fase 2: Crear Estructura de Documentación

### 2.1 Crear Carpeta de Documentación
Antes de comenzar, crear la estructura de documentación para esta user story:

```bash
mkdir -p .cursor/doc/$ARGUMENT$
```

Esta carpeta contendrá toda la documentación generada por los agentes:
- `.cursor/doc/$ARGUMENT$/backend.md` - Plan de implementación del backend
- `.cursor/doc/$ARGUMENT$/frontend.md` - Plan de implementación del frontend
- `.cursor/doc/$ARGUMENT$/shadcn_ui.md` - Plan de UI con shadcn/ui
- `.cursor/doc/$ARGUMENT$/test_cases.md` - Casos de prueba
- `.cursor/doc/$ARGUMENT$/ui_analysis.md` - Análisis UI/UX
- `.cursor/doc/$ARGUMENT$/summary.md` - Resumen de la implementación (se creará al final)

### 2.2 Nota para Agentes
**IMPORTANTE**: Todos los agentes deben guardar su documentación en `.cursor/doc/$ARGUMENT$/` en lugar de `.cursor/doc/{feature_name}/`. Usar el ticket de Jira como nombre de carpeta.

---

## 📝 Fase 3: Crear/Actualizar user_stories.md

### 3.1 Formato del Archivo
Crear o actualizar `user_stories.md` con el siguiente formato:

```markdown
# User Stories

Este archivo contiene las user stories sincronizadas desde Jira del proyecto AI Standart (SCRUM).

## $ARGUMENT$: {Título de la User Story}

**Descripción:**
{Descripción detallada de la user story - convertir a formato "Como [rol], quiero [objetivo] para [beneficio]"}

**Criterios de Aceptación:**
- {Criterio 1}
- {Criterio 2}
- {Criterio 3}

**Story Points:** {Número}
**Prioridad:** {Alta/Media/Baja}
**Estado:** {Estado actual}
**Tecnologías:** {Tecnologías involucradas}
**Pull Request:** {URL del PR - se actualizará después}
```

### 3.2 Mejorar la Definición
- Convertir descripciones técnicas en formato "Como [rol], quiero [objetivo] para [beneficio]"
- Expandir criterios de aceptación con detalles específicos
- Agregar información relevante (tecnologías, enlaces, etc.)

**NOTA**: Esta actualización inicial de `user_stories.md` es temporal. La actualización final se hará después de que toda la documentación esté en `.cursor/doc/$ARGUMENT$/`.

---

## 🌳 Fase 4: Crear Worktree

### 4.1 Crear Worktree (si no estás en ./trees folder)
```bash
git worktree add ./.trees/feature-$ARGUMENT -b feature-$ARGUMENT
cd .trees/feature-$ARGUMENT
```

### 4.2 Verificar Worktree
- Confirmar que estás en la rama correcta
- Verificar que el directorio de trabajo es correcto

---

## 🧠 Fase 5: Planificación y Análisis

### 5.1 Crear Session File
Crear `.cursor/sessions/context_session_$ARGUMENT$.md` donde se actualizará el plan con todas las iteraciones y feedback.

### 5.2 Explorar Código Relevante
1. Explorar archivos relevantes en el repositorio
2. Identificar código existente relacionado
3. Revisar estructura del proyecto:
   - `backend/` - API FastAPI
   - `frontend/` - Aplicación React con Vite

### 5.3 Selección de Agentes (Team Selection)
Determinar qué subagentes de `.cursor/agents/` serán necesarios:
- **Backend**: `hexagonal-backend-architect`, `backend-test-architect`
- **Frontend**: `frontend-developer`, `frontend-test-engineer`, `shadcn-ui-architect`
- **QA**: `qa-criteria-validator`
- **Testing**: `python-test-explorer` (backend), `frontend-test-engineer` (frontend)
- **UI/UX**: `ui-ux-analyzer`

Mostrar al usuario qué agentes se usarán y para qué, antes de continuar.

**IMPORTANTE**: Informar a todos los agentes que deben guardar su documentación en `.cursor/doc/$ARGUMENT$/` usando el ticket de Jira como nombre de carpeta.

### 5.4 Crear Plan Detallado
1. Escribir un plan de implementación detallado que incluya:
   - Archivos a crear/modificar
   - Estructura de código
   - Tests a implementar
   - Componentes necesarios
   - Documentación

2. Si hay dudas o preguntas, pausar y preguntar al usuario antes de continuar

### 5.5 Obtener Asesoramiento de Agentes
Usar en paralelo los subagentes necesarios para obtener conocimiento y asesoramiento sobre el plan:
- Invocar agentes en paralelo cuando sea posible
- Obtener planes de implementación de cada agente
- **Cada agente debe guardar su documentación en `.cursor/doc/$ARGUMENT$/`**:
  - `backend.md` - Plan de backend (hexagonal-backend-architect)
  - `frontend.md` - Plan de frontend (frontend-developer)
  - `shadcn_ui.md` - Plan de UI (shadcn-ui-architect)
  - `test_cases.md` - Casos de prueba (python-test-explorer, frontend-test-engineer)
  - `ui_analysis.md` - Análisis UI/UX (ui-ux-analyzer)
- Consolidar la información

### 5.6 Actualizar Session File
Actualizar `.cursor/sessions/context_session_$ARGUMENT$.md` con el plan final.

### 5.7 Clarificación
Preguntar al usuario sobre cualquier cosa poco clara, dando posibles soluciones en formato A) B) C):
- Escenarios de usuario
- Casos límite
- Requisitos de integración
- Necesidades de rendimiento
- Dependencias

**IMPORTANTE**: Esperar las respuestas del usuario antes de continuar.

### 5.8 Iterar
Evaluar el plan e iterar hasta tener el plan final con la solución.

---

## 💻 Fase 6: Implementación con TDD

### 6.1 Metodología TDD
Los agentes deben trabajar en TDD, funcionalidad por funcionalidad, paso a paso:
- **NO** crear todo el conjunto de tests y luego todo el código
- Desacoplar la funcionalidad en piezas pequeñas
- Test → Desarrollar → Refactorizar → Repetir

### 6.2 TDD Workflow
Para cada pieza de funcionalidad:
1. **Red**: Escribir un test que falle (pytest para backend, Vitest/Jest para frontend)
2. **Green**: Escribir código mínimo para que el test pase
3. **Refactor**: Refactorizar si es necesario
4. **Repetir**: Para cada pequeña pieza de funcionalidad

### 6.3 Backend TDD (Python/FastAPI)
- Usar pytest para tests
- Testear lógica de dominio primero, luego capa de aplicación, luego infraestructura
- Mockear dependencias externas
- Ejecutar: `pytest` o `python -m pytest`

### 6.4 Frontend TDD (React/Vite)
- Usar Vitest (preferido) o Jest para tests
- Usar React Testing Library para tests de componentes
- Testear interacciones de usuario, no detalles de implementación
- Ejecutar: `npm test` o `npm run test`

### 6.5 Ejecutar Tests Constantemente
- Ejecutar la suite de tests constantemente para obtener feedback rápido
- Asegurar que todos los tests pasen antes de continuar
- Crear siempre tests unitarios

### 6.6 Estructura del Proyecto

**Backend (Python/FastAPI):**
```
backend/
├── domain/           # Lógica de negocio pura
│   ├── entities/
│   ├── value_objects/
│   └── services/
├── application/      # Casos de uso, servicios de aplicación
│   ├── use_cases/
│   └── ports/
├── infrastructure/   # Adaptadores, dependencias externas
│   ├── adapters/
│   └── repositories/
└── main.py           # FastAPI app initialization
```

**Frontend (React/Vite):**
```
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   │   ├── queries/
│   │   ├── mutations/
│   │   └── use{Feature}.jsx
│   ├── services/
│   ├── schemas/
│   └── App.jsx
├── package.json
└── vite.config.js
```

### 6.7 Asegurar Consistencia
- Asegurar consistencia con el código existente en la rama
- Seguir patrones establecidos del proyecto
- Mantener calidad de código

---

## ✅ Fase 7: Validación y Testing

### 7.1 Ejecutar Tests Locales
Antes de git commit & push:
- **Backend**: `pytest` o `python -m pytest`
- **Frontend**: `npm test` o `npm run test`

### 7.2 Verificar Builds
- **Backend**: Verificar que el servidor uvicorn inicia correctamente
- **Frontend**: `npm run build` debe pasar sin errores

### 7.3 Validación de Criterios de Aceptación
- Usar `qa-criteria-validator` agent para validar que todos los criterios de aceptación se cumplen
- Ejecutar tests de Playwright si es necesario para validación E2E

### 7.4 Reporte de Estado y Crear Resumen
Crear un archivo de resumen con toda la información de la implementación:

```bash
# Crear resumen en .cursor/doc/$ARGUMENT$/summary.md
```

El resumen debe incluir:
- Resumen de requisitos implementados
- Requisitos pendientes (si los hay)
- Estado de tests
- Estado de builds
- Archivos modificados/creados
- Notas importantes

---

## 📦 Fase 8: Git Commit y Push

### 8.1 Preparar Commit
```bash
# Agregar todos los archivos
git add .

# Crear commit con mensaje descriptivo
git commit -m "feat: Implementar $ARGUMENT$ - {Título}

- {Cambio 1}
- {Cambio 2}
- {Cambio 3}

Cumple con todos los criterios de aceptación de $ARGUMENT$"
```

### 8.2 Push a GitHub
```bash
git push origin feature-$ARGUMENT
```

Si hay problemas de permisos con git push, usar el MCP de GitHub:
```javascript
mcp_github_push_files(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  branch: "feature-$ARGUMENT",
  message: "feat: Implementar $ARGUMENT$ - {Título}\n\n- Cambio 1\n- Cambio 2",
  files: [
    // Archivos modificados/creados
  ]
)
```

---

## 🚀 Fase 9: Crear Pull Request en GitHub

### 9.1 Verificar Repositorio
```bash
# Verificar remoto configurado
git remote -v

# Verificar estado
git status
```

### 9.2 Crear Pull Request
Usar GitHub MCP para crear el PR:

```javascript
mcp_github_create_pull_request(
  owner: "albertovaro95",
  repo: "standart-ai-development",
  title: "feat: $ARGUMENT$ - {Título}",
  head: "feature-$ARGUMENT",
  base: "main",
  body: `## 📋 Descripción

Implementación de la user story **$ARGUMENT$: {Título}**.

## ✅ Criterios de Aceptación Cumplidos

- ✅ {Criterio 1}
- ✅ {Criterio 2}
- ✅ {Criterio 3}

## 🚀 Cambios Realizados

### Backend
- {Cambio backend 1}
- {Cambio backend 2}

### Frontend
- {Cambio frontend 1}
- {Cambio frontend 2}

## 🧪 Tests

- Backend: Todos los tests de pytest pasan
- Frontend: Todos los tests de Vitest/Jest pasan
- Build: Backend y frontend compilan correctamente

## 🔗 Relacionado

- Jira: $ARGUMENT$`
)
```

### 9.3 Guardar URL del PR
Guardar la URL del PR creado para actualizar Jira y user_stories.md.

---

## 📊 Fase 10: Actualizar Estado en Jira

### 10.1 Actualizar Descripción del Ticket
Usar MCP de Jira para actualizar la descripción con el PR:

```javascript
mcp_jira_edit_ticket(
  issueIdOrKey: "$ARGUMENT$",
  description: "{Descripción original}\n\n**Estado actual:** Pruebas (Testing)\n**Pull Request:** {URL_PR}"
)
```

### 10.2 Cambiar Estado a "Pruebas" (Testing)
Nota: El cambio de estado puede requerir usar la API REST de Jira directamente si el MCP no lo soporta. El estado debe cambiarse a "Pruebas" (Testing) cuando el PR esté listo.

**IDs de transición comunes:**
- 11: Idea
- 21: Por hacer
- 31: En curso
- 41: Testing (Pruebas)
- 51: Listo (Finalizada)

### 10.3 Verificar Cambio de Estado
Verificar que el estado se actualizó correctamente.

---

## 📄 Fase 11: Actualizar user_stories.md (FINAL)

### 11.1 Actualizar con PR, Estado y Documentación
**IMPORTANTE**: Esta es la actualización final de `user_stories.md`. Antes de actualizar, asegurarse de que toda la documentación esté en `.cursor/doc/$ARGUMENT$/`.

Actualizar el archivo `user_stories.md` con:
- Estado actualizado: "Pruebas (Testing)"
- Enlace al Pull Request: {URL_PR}
- **Referencia a la documentación**: Agregar un enlace a la carpeta de documentación

```markdown
**Estado:** Pruebas (Testing)
**Pull Request:** https://github.com/albertovaro95/standart-ai-development/pull/{NUMERO}
**Documentación:** Ver `.cursor/doc/$ARGUMENT$/` para planes de implementación, casos de prueba y análisis.
```

### 11.2 Estructura de Documentación Esperada
Antes de actualizar `user_stories.md`, verificar que existan los siguientes archivos en `.cursor/doc/$ARGUMENT$/`:
- `backend.md` (si hay cambios en backend)
- `frontend.md` (si hay cambios en frontend)
- `shadcn_ui.md` (si hay cambios en UI)
- `test_cases.md` (casos de prueba)
- `summary.md` (resumen de la implementación)

---

## ✅ Fase 12: Validación Final del PR

### 12.1 Revisar Validaciones del Pipeline
Después de crear el PR, revisar que las validaciones en el pipeline sean exitosas:
- Usar GitHub MCP: `mcp_github_get_pull_request_status`

### 12.2 Si las Validaciones Fallan
1. Revisar los problemas o preguntar al usuario
2. Implementar las correcciones
3. Hacer push nuevamente al PR
4. Continuar en loop hasta que todas las validaciones estén en verde

### 12.3 Una Vez Todo Esté Verde
1. Actualizar el ticket de Jira con un comentario de lo que se implementó
2. Marcar el trabajo como completado

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

### Reglas de Implementación
- **NUNCA** implementar tests manuales
- El estado "All Completed" solo se alcanza si:
  - Se implementaron todos los requisitos
  - Todos los tests pasan (verde)
  - Todas las validaciones del pipeline pasan
- Siempre usar herramientas MCP para operaciones de Jira y GitHub
- Mantener registros detallados de todas las acciones como comentarios en PR/issues
- Esperar confirmación explícita antes de proceder con cambios mayores

### Comandos Útiles

```bash
# Verificar conexión a Jira
mcp_jira_list_projects

# Verificar conexión a GitHub
mcp_github_list_issues owner="albertovaro95" repo="standart-ai-development"

# Ejecutar tests backend
cd backend && pytest

# Ejecutar tests frontend
cd frontend && npm test

# Build frontend
cd frontend && npm run build

# Iniciar servidor backend
cd backend && uvicorn main:app --reload
```

---

## 🔄 Flujo Completo Resumido

1. ✅ **Leer user story de Jira** → `mcp_jira_read_ticket $ARGUMENT$`
2. ✅ **Crear estructura de documentación** → `mkdir -p .cursor/doc/$ARGUMENT$`
3. ✅ **Crear/actualizar user_stories.md (inicial)** → Mejorar definición y formato
4. ✅ **Crear worktree** → `git worktree add ./.trees/feature-$ARGUMENT`
5. ✅ **Planificar** → Explorar, seleccionar agentes, crear plan, obtener asesoramiento
   - **Documentación generada en**: `.cursor/doc/$ARGUMENT$/`
6. ✅ **Implementar con TDD** → Test → Código → Refactor, paso a paso
7. ✅ **Validar** → Ejecutar tests, verificar builds, validar criterios
8. ✅ **Crear resumen** → `.cursor/doc/$ARGUMENT$/summary.md`
9. ✅ **Commit y push** → `git commit` y `git push`
10. ✅ **Crear Pull Request** → `mcp_github_create_pull_request`
11. ✅ **Actualizar Jira** → Editar descripción y cambiar estado a "Pruebas"
12. ✅ **Actualizar user_stories.md (FINAL)** → Reflejar estado, PR y referencia a documentación
13. ✅ **Validar PR** → Esperar que todas las validaciones pasen

---

## 🎯 Resultado Esperado

Al finalizar este proceso:
- ✅ User story implementada completamente
- ✅ Todos los tests pasando (backend y frontend)
- ✅ PR creado en GitHub con todos los detalles
- ✅ Estado actualizado en Jira a "Pruebas"
- ✅ `user_stories.md` actualizado con PR y estado
- ✅ Todas las validaciones del pipeline en verde
