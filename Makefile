.PHONY: help install-backend install-frontend backend frontend dev clean test

# Variables
PYTHON := python3
PIP := pip3
NODE := node
NPM := npm
BACKEND_DIR := backend
FRONTEND_DIR := frontend
VENV := $(BACKEND_DIR)/venv
VENV_BIN := $(VENV)/bin
VENV_PYTHON := $(VENV_BIN)/python
VENV_PIP := $(VENV_BIN)/pip

# Colores para output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Mostrar esta ayuda
	@echo "$(GREEN)Comandos disponibles:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

install-backend: ## Instalar dependencias del backend
	@echo "$(GREEN)Instalando dependencias del backend...$(NC)"
	@cd $(BACKEND_DIR) && \
	if [ ! -d "venv" ]; then \
		$(PYTHON) -m venv venv; \
		echo "$(GREEN)Entorno virtual creado$(NC)"; \
	fi
	@$(VENV_PIP) install --upgrade pip
	@$(VENV_PIP) install -r $(BACKEND_DIR)/requirements.txt
	@echo "$(GREEN)✓ Dependencias del backend instaladas$(NC)"

install-frontend: ## Instalar dependencias del frontend
	@echo "$(GREEN)Instalando dependencias del frontend...$(NC)"
	@cd $(FRONTEND_DIR) && $(NPM) install
	@echo "$(GREEN)✓ Dependencias del frontend instaladas$(NC)"

install: install-backend install-frontend ## Instalar todas las dependencias

backend: ## Levantar el servidor backend
	@echo "$(GREEN)Iniciando servidor backend...$(NC)"
	@if [ ! -d "$(VENV)" ]; then \
		echo "$(RED)Error: Entorno virtual no encontrado. Ejecuta 'make install-backend' primero$(NC)"; \
		exit 1; \
	fi
	@cd $(BACKEND_DIR) && $(VENV_PYTHON) main.py

frontend: ## Levantar el servidor frontend
	@echo "$(GREEN)Iniciando servidor frontend...$(NC)"
	@if [ ! -d "$(FRONTEND_DIR)/node_modules" ]; then \
		echo "$(RED)Error: node_modules no encontrado. Ejecuta 'make install-frontend' primero$(NC)"; \
		exit 1; \
	fi
	@cd $(FRONTEND_DIR) && $(NPM) run dev

dev: ## Levantar backend y frontend en paralelo (requiere 'make' y terminales separadas)
	@echo "$(GREEN)Iniciando backend y frontend...$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:8000$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	@echo "$(YELLOW)Documentación API: http://localhost:8000/docs$(NC)"
	@echo ""
	@echo "$(GREEN)Presiona Ctrl+C para detener ambos servidores$(NC)"
	@trap 'kill 0' EXIT; \
	cd $(BACKEND_DIR) && $(VENV_PYTHON) main.py & \
	cd $(FRONTEND_DIR) && $(NPM) run dev & \
	wait

clean: ## Limpiar archivos generados
	@echo "$(YELLOW)Limpiando archivos...$(NC)"
	@rm -rf $(BACKEND_DIR)/venv
	@rm -rf $(BACKEND_DIR)/__pycache__
	@rm -rf $(BACKEND_DIR)/*.pyc
	@rm -rf $(BACKEND_DIR)/*.db
	@rm -rf $(FRONTEND_DIR)/node_modules
	@rm -rf $(FRONTEND_DIR)/dist
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

clean-db: ## Limpiar solo la base de datos
	@echo "$(YELLOW)Eliminando base de datos...$(NC)"
	@rm -f $(BACKEND_DIR)/*.db
	@echo "$(GREEN)✓ Base de datos eliminada$(NC)"

test-backend: ## Ejecutar tests del backend (si existen)
	@echo "$(GREEN)Ejecutando tests del backend...$(NC)"
	@if [ -d "$(VENV)" ]; then \
		cd $(BACKEND_DIR) && $(VENV_PYTHON) -m pytest tests/ || echo "$(YELLOW)No hay tests configurados$(NC)"; \
	else \
		echo "$(RED)Error: Entorno virtual no encontrado$(NC)"; \
	fi

test-frontend: ## Ejecutar tests del frontend (si existen)
	@echo "$(GREEN)Ejecutando tests del frontend...$(NC)"
	@cd $(FRONTEND_DIR) && $(NPM) test || echo "$(YELLOW)No hay tests configurados$(NC)"

build-frontend: ## Compilar frontend para producción
	@echo "$(GREEN)Compilando frontend para producción...$(NC)"
	@cd $(FRONTEND_DIR) && $(NPM) run build
	@echo "$(GREEN)✓ Build completado en $(FRONTEND_DIR)/dist$(NC)"

check-backend: ## Verificar que el backend está funcionando
	@echo "$(GREEN)Verificando backend...$(NC)"
	@curl -s http://localhost:8000/health | grep -q "healthy" && echo "$(GREEN)✓ Backend funcionando$(NC)" || echo "$(RED)✗ Backend no responde$(NC)"

check-frontend: ## Verificar que el frontend está funcionando
	@echo "$(GREEN)Verificando frontend...$(NC)"
	@curl -s http://localhost:5173 > /dev/null && echo "$(GREEN)✓ Frontend funcionando$(NC)" || echo "$(RED)✗ Frontend no responde$(NC)"

status: ## Mostrar estado de los servidores
	@echo "$(GREEN)Estado de los servidores:$(NC)"
	@echo ""
	@echo "$(YELLOW)Backend:$(NC)"
	@curl -s http://localhost:8000/health 2>/dev/null | grep -q "healthy" && echo "  $(GREEN)✓ Activo en http://localhost:8000$(NC)" || echo "  $(RED)✗ No está corriendo$(NC)"
	@echo ""
	@echo "$(YELLOW)Frontend:$(NC)"
	@curl -s http://localhost:5173 > /dev/null 2>&1 && echo "  $(GREEN)✓ Activo en http://localhost:5173$(NC)" || echo "  $(RED)✗ No está corriendo$(NC)"

.DEFAULT_GOAL := help

