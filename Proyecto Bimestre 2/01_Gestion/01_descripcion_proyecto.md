# Gestión del Proyecto - Vault Protocol

> **Tipo de entrega:** Pre-producción y Diseño Técnico  
> **Regla del proyecto:** No se incluye código funcional. Este documento describe el blueprint listo para producción.

---

## 1. Información General del Proyecto

**Nombre del Proyecto:** Vault Protocol  
**Tipo de Proyecto:** Videojuego de entretenimiento (sigilo + puzzle)  
**Género:** Sigilo táctico / Puzzle / Gestión ligera de recursos  
**Plataforma Objetivo:** PC / Web (según motor seleccionado)  
**Duración del Desarrollo (documentación):** Segundo Bimestre  
**Estado del Proyecto:** Documentación finalizada (Blueprint listo)

---

## 2. Descripción del Proyecto (Concepto)

Vault Protocol es un videojuego donde el jugador infiltra instalaciones de alta seguridad para recuperar “fragmentos de datos” sin ser detectado por cámaras y drones.  
La experiencia busca generar tensión y satisfacción al optimizar rutas, administrar energía y tomar decisiones tácticas con información parcial.

**Fantasia del jugador:** “Soy un infiltrador inteligente que vence al sistema por estrategia, no por fuerza”.

---

## 3. Objetivos Principales

1) Diseñar un juego con coherencia completa usando **Framework MDA**.  
2) Definir **mecánicas medibles** (detección, energía, movimiento) y su relación con la emoción del jugador.  
3) Diseñar 10 niveles con progresión clara y objetivos por nivel.  
4) Planificar el proyecto con metodología ágil (épicas, user stories, tiempos).  
5) Proponer una arquitectura conceptual (UML + patrones) lista para implementación futura.

---

## 4. Alcance

### Incluido en el Proyecto (Blueprint)
- GDD completo con análisis MDA
- Core Loop + sistemas principales (detección, gadgets, energía, loot, progreso)
- Diseño de 10 niveles (concepto, objetivos, dificultad, eventos)
- UI/UX: wireframes descritos y flujo de pantallas
- Arte y audio: dirección, moodboard y lista de assets (planificados)
- Arquitectura: UML (casos de uso, clases conceptual, FSM estados) + patrones

### Excluido del Proyecto (por regla del curso)
- Código funcional
- Implementación real del motor
- Assets finales producidos (solo especificaciones/referencias)
- Multijugador, online services reales
- Monetización real y analítica de producción

---

## 5. Público Objetivo

- Jugadores que disfrutan puzzles, planificación y tensión controlada
- Edad recomendada: 12+
- Sesiones: 10–20 minutos por run

---

## 6. Equipo del Proyecto

**Desarrollador:** [TU NOMBRE]  
**Rol asumido (simulado):**
- Game Designer (sistemas + niveles)
- Technical Designer (arquitectura conceptual)
- UI/UX Designer (wireframes)
- Producer (planificación y riesgos)

---

## 7. Tecnologías Propuestas (Stack Objetivo)

> Nota: el stack final depende de la plataforma y del alcance real, pero aquí se documenta una propuesta coherente.

**Opción A (industrial):** Unity + C#  
**Opción B (indie/2D):** Godot + GDScript  
**Opción C (web):** Babylon.js + TypeScript

**Persistencia (diseño):**
- Config: JSON (niveles, parámetros de cámaras/drones)
- Savegame: JSON (progreso, gadgets desbloqueados)

**Gestión:**
- Git (versionado)
- GitHub Projects / Trello (tablero ágil)

---

## 8. Entregables

1) `01_Gestion/01_descripcion_proyecto.md`  
2) `01_Gestion/02_backlog_tareas.md`  
3) `02_Game_Design_Document/GDD_completo.md`  
4) `03_Assets/assets_documentacion.md`

---

## 9. Criterios de Éxito (Aceptación del blueprint)

- El GDD debe permitir que un tercero implemente el juego sin ambigüedades.
- El análisis MDA debe justificar todas las decisiones principales.
- La arquitectura debe ser coherente con sistemas y UI.
- La planificación debe mostrar épicas, tareas y estimaciones realistas.
- Los assets deben estar especificados con formatos, resoluciones y propósito.

---

**Fin del documento**
