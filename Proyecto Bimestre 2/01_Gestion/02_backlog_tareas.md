# Backlog de Tareas - Tower Defense

**Integrante:** Carlos Morales  
**Fecha:** 01/02/2026

---

## 1. Enfoque del Backlog

Este backlog integra dos frentes:
- **TAR-**: tareas para completar/gestionar documentación del GDD (Kanban GDD).
- **IM-**: historias de usuario para implementar el slice vertical del Nivel 1 (Kanban Implementación).

Para la evaluación se prioriza el **slice vertical del Nivel 1** (grid + torre + enemigo + oleadas + economía + HUD + win/lose).

---

## 2. Épicas (Resumen)

### Épica A: Gestión del Proyecto (TAR-/General)
- Configurar repositorio y tableros Kanban
- Mantener documentación y control de cambios

### Épica B: Diseño y Documentación (TAR-)
- Completar GDD (mecánicas, niveles, economía, UI, arte, técnica, cronograma)
- Definir assets mínimos para el slice vertical

### Épica C: Implementación Slice Vertical (IM-)
- Setup Babylon + TypeScript
- Grid 10x10 + camino en “S”
- Núcleo (vida/daño)
- Torre Láser (targeting + disparo)
- Enemigo Drone Scout (movimiento por camino)
- Oleadas (WaveManager)
- Economía (créditos)
- HUD básico
- Victoria/Derrota + game loop

---

## 3. Backlog Detallado (Implementación - IM-)

> Nota: “Estado” recomendado para Kanban: **To Do / In Progress / Done**

---

## 🚀 CONFIGURACIÓN DEL PROYECTO

### IM-001: Configurar proyecto Babylon.js con TypeScript
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Proyecto creado con Vite (vanilla-ts)
  - Babylon.js instalado y escena básica renderizando
  - Hot reload funcionando
- **Estimación:** 3 puntos

### IM-002: Crear estructura de carpetas y archivos base
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Carpetas: src/game, src/entities, src/systems, src/ui, src/levels, src/config
  - Archivos base (Game.ts, main.ts) y imports correctos
- **Estimación:** 2 puntos

---

## 🗺️ SISTEMA DE MAPA Y GRID

### IM-003: Implementar sistema de grid para el mapa
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Grid 10x10 visible
  - Celdas diferenciadas (PATH vs BUILDABLE)
  - Coordenadas funcionando
  - Cámara configurada para ver todo el mapa
- **Estimación:** 5 puntos

### IM-004: Diseñar e implementar el camino del Nivel 1
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Camino en forma de S visible
  - Spawn de enemigos marcado
  - Núcleo marcado al final del camino
- **Estimación:** 3 puntos

---

## 🧠 NÚCLEO / OBJETIVO

### IM-005: Implementar núcleo de energía
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Núcleo visible en escena
  - Vida inicial definida
  - Recibe daño si los enemigos llegan al final
- **Estimación:** 3 puntos

---

## 🏗️ TORRES, TARGETING Y DISPARO

### IM-007: Implementar Torre Láser Básico
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Torre se coloca en celda válida
  - Detecta enemigos en rango
  - Dispara (daño aplica correctamente)
- **Estimación:** 8 puntos

### IM-008: Implementar Targeting System
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Selección automática de objetivo
  - Priorización consistente (por ejemplo: el más cercano al final)
  - Update por frame (delta time)
- **Estimación:** 5 puntos

---

## 👾 ENEMIGOS Y PATHFINDING

### IM-011: Implementar enemigo Drone Scout
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Enemigo se spawnea y recorre el camino
  - Vida y velocidad definidas
  - Muerte al llegar a 0 HP
- **Estimación:** 5 puntos

### IM-012: Implementar Pathfinding / movimiento sobre el camino
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Sigue waypoints del camino del Nivel 1
  - Movimiento estable con delta time
- **Estimación:** 5 puntos

---

## 🌊 OLEADAS

### IM-014: Implementar WaveManager (oleadas)
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - 5 oleadas (Nivel 1)
  - Spawns controlados por tiempo/cantidad
  - Avanza oleada al eliminar todos
- **Estimación:** 8 puntos

---

## 💰 ECONOMÍA

### IM-017: Implementar sistema de créditos
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Créditos iniciales configurables (Nivel 1: 300)
  - Ganancia por kill
  - Gasto al construir torre
- **Estimación:** 3 puntos

---

## 🖥️ UI / HUD

### IM-022: Implementar HUD básico
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Muestra créditos actuales
  - Muestra vida del núcleo
  - Muestra oleada actual
- **Estimación:** 5 puntos

---

## ✅ CONDICIONES DE VICTORIA / DERROTA + LOOP

### IM-028: Implementar game loop principal
- **Estado:** To Do
- **Prioridad:** Alta
- **Criterios de aceptación:**
  - Update de torres (targeting/disparo)
  - Update de enemigos (movimiento)
  - Condiciones de win/lose evaluadas
  - Delta time aplicado
- **Estimación:** 5 puntos

---

## 4. Tareas Kanban para GDD (TAR-) - Referencia

Estas tareas se crean en el tablero Kanban del GDD. Ejemplos relevantes:
- TAR-008: Diseñar sistema de enemigos (stats + recompensas)
- TAR-009: Diseñar sistema de oleadas (curva + jefes)
- TAR-010: Definir controles del juego (mouse/teclado/atajos)
- TAR-011: Diseñar Nivel 1 (grid 10x10 + camino + oleadas)
- TAR-014: Definir sistema de economía
- TAR-016: Definir arte y estilo visual
- TAR-018: Documentar especificaciones técnicas
- TAR-019: Crear cronograma de desarrollo

---

## 5. Historias CRÍTICAS (Mínimo para Examen)

| ID     | Historia                  | Puntos |
|--------|---------------------------|:------:|
| IM-001 | Setup Babylon.js          |   3    |
| IM-003 | Sistema de Grid           |   5    |
| IM-004 | Camino Nivel 1            |   3    |
| IM-005 | Núcleo                    |   3    |
| IM-007 | Torre Láser               |   8    |
| IM-008 | Targeting                 |   5    |
| IM-011 | Drone Scout               |   5    |
| IM-012 | Pathfinding               |   5    |
| IM-014 | WaveManager               |   8    |
| IM-017 | Sistema créditos          |   3    |
| IM-022 | HUD básico                |   5    |
| IM-028 | Game loop                 |   5    |
| **TOTAL** |                         | **58** |

---

## 6. Métricas (Iniciales)

| Métrica | Valor |
|--------:|:------|
| Historias críticas (IM-) | 12 |
| Puntos críticos | 58 |
| Nivel del slice | Nivel 1 (grid 10x10, camino “S”, 5 oleadas) |
| Motor / Lenguaje | Babylon.js + TypeScript |
| Gestión | GitHub Projects (Kanban) |

---

## 7. Riesgos Identificados y Mitigación

### Riesgo 1: Pathfinding/movimiento inestable (saltos, jitter, desincronización)
- **Mitigación:** usar waypoints simples + delta time y pruebas por oleada.

### Riesgo 2: UI/HUD consume tiempo por integración con escena
- **Mitigación:** HUD mínimo obligatorio primero (créditos, vida, oleada).

### Riesgo 3: Falta de tiempo para polish (efectos, animaciones, audio)
- **Mitigación:** priorizar funcionalidades críticas; efectos como “deseables”.

---

## 8. Próximos Pasos (Recomendado)

1) IM-001 + IM-002 (setup y estructura)  
2) IM-003 + IM-004 (grid + camino)  
3) IM-005 (núcleo y vida)  
4) IM-011 + IM-012 (enemy + movimiento)  
5) IM-007 + IM-008 (torre + targeting/disparo)  
6) IM-014 (oleadas)  
7) IM-017 (economía)  
8) IM-022 (HUD)  
9) IM-028 (game loop + win/lose)  

---

**Fin del Backlog**
