# User Stories

Este archivo contiene las user stories sincronizadas desde Jira del proyecto AI Standart (SCRUM).

## SCRUM-1: Como desarrollador, quiero crear el proyecto base

**Descripción:**
Como desarrollador del equipo, quiero crear la estructura inicial del proyecto con las tecnologías definidas (Python para backend y React para frontend) para establecer las bases del desarrollo y permitir que el equipo comience a trabajar de manera organizada.

**Criterios de Aceptación:**
- Se crea la estructura de directorios para backend (Python) y frontend (React)
- El backend incluye configuración inicial con un framework web (Flask/FastAPI/Django)
- El frontend incluye configuración inicial con React y un bundler (Vite/Webpack)
- Se configuran los archivos de gestión de dependencias (requirements.txt para Python, package.json para React)
- Se establece la estructura de carpetas siguiendo buenas prácticas
- Se configura un README.md con instrucciones de instalación y ejecución
- Se configuran los archivos .gitignore apropiados para cada tecnología
- El proyecto está listo para que el equipo comience a desarrollar funcionalidades

**Story Points:** 5
**Prioridad:** Alta
**Estado:** Pruebas (Testing)
**Tecnologías:** Python (Backend), React (Frontend)
**Pull Request:** https://github.com/albertovaro95/standart-ai-development/pull/1

---

## SCRUM-2: Como usuario, quiero registrarme en la landing page para recibir información del lanzamiento

**Descripción:**
Como usuario interesado en la próxima empresa que se va a lanzar, quiero poder registrarme en una landing page atractiva proporcionando mi nombre, teléfono y email para recibir información actualizada cuando se lance el producto y formar parte de la comunidad desde el inicio.

**Criterios de Aceptación:**
- Se crea una landing page atractiva y moderna que genere expectativa sobre el lanzamiento
- La landing page incluye un formulario con campos para: nombre, teléfono y email
- El formulario valida que todos los campos sean obligatorios
- El formulario valida el formato del email
- El formulario valida el formato del teléfono
- Al enviar el formulario, los datos se guardan en una base de datos
- Se muestra un mensaje de confirmación al usuario después del envío exitoso
- La información guardada puede ser consultada posteriormente desde el backend
- La landing page es responsive y funciona correctamente en móviles y tablets
- La landing page tiene un diseño atractivo que genera "hype" sobre el producto

**Story Points:** 8
**Prioridad:** Alta
**Estado:** Pruebas (Testing)
**Tecnologías:** Python (FastAPI), React (Frontend), SQLite (Base de datos)
**Pull Request:** Pendiente (rama local: feature/SCRUM-2-landing-page)

