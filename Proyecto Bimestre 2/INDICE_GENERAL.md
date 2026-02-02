# Índice General - Documentación VAULT PROTOCOL
**Proyecto:** Vault Protocol  
**Desarrollador:** [TU NOMBRE AQUÍ]  
**Bimestre:** Segundo  
**Año Académico:** 2025  

---

## Tabla de Contenidos

### 1. Gestión del Proyecto
Documentación sobre la planeación, organización y seguimiento del desarrollo del juego (fase de pre-producción y diseño técnico).

**Documentos:**
- `01_Gestion/01_descripcion_proyecto.md`
  - Información general del proyecto
  - Descripción conceptual
  - Objetivos principales
  - Alcance del proyecto (incluido/excluido)
  - Equipo y tecnologías propuestas
  - Entregables

- `01_Gestion/02_backlog_tareas.md`
  - Épicas principales
  - Tareas desglosadas por épica
  - Estado de cada tarea
  - Estimaciones de tiempo
  - Métricas y riesgos
  - Próximos pasos

---

### 2. Game Design Document (GDD)
Documento completo que especifica todos los aspectos del diseño del videojuego y justifica decisiones con el Framework MDA.

**Documentos:**
- `02_Game_Design_Document/GDD_completo.md`
  - Visión general y concepto principal
  - Análisis MDA (Aesthetics, Dynamics, Mechanics)
  - Core Loop y sistemas principales
  - Narrativa y construcción del mundo
  - Diseño de niveles (10 niveles)
  - Especificaciones del jugador y enemigos
  - UI/UX (mockups descritos)
  - Dirección visual y arte
  - Sistema de audio
  - Arquitectura conceptual (UML + patrones)
  - Especificaciones técnicas objetivo
  - Consideraciones futuras y calidad (QA)

---

### 3. Documentación de Assets
Inventario y especificaciones de los recursos (visual, UI, audio) planificados para producción.

**Documentos:**
- `03_Assets/assets_documentacion.md`
  - Inventario total de assets (planificado)
  - Especificación de fondos (10 niveles)
  - Documentación del personaje y enemigos
  - UI (menú, HUD, pantallas)
  - Audio (SFX + música)
  - Resoluciones y formatos
  - Requisitos de almacenamiento
  - Atribuciones y licencias

---

## Resumen Ejecutivo

### Visión del Proyecto
**Vault Protocol** es un videojuego de **sigilo táctico + puzzles** donde el jugador infiltra instalaciones de seguridad para recuperar **fragmentos de datos** sin ser detectado por cámaras, drones y sistemas de alarma.  
La experiencia se diseña aplicando formalmente **MDA**, garantizando coherencia entre reglas (mecánicas), comportamiento (dinámicas) y emoción (estética).

> **Nota importante (regla del proyecto):** Este repositorio corresponde a **pre-producción y diseño técnico**.  
> **No se incluye código funcional**. El objetivo es entregar un **blueprint listo para producción**.

---

## Objetivos Logrados (Entregable de Diseño)
✓ Análisis completo con Framework **MDA**  
✓ Diseño detallado de **Core Loop** y sistemas  
✓ Planificación tipo ágil con **Épicas y User Stories**  
✓ Arquitectura conceptual con **UML** y patrones  
✓ Diseño de **10 niveles** con progresión  
✓ Mockups descritos de UI/UX + dirección de arte + audio  
✓ Documentación de assets y especificaciones técnicas objetivo  

---

## Tecnologías Propuestas (Stack objetivo)
**Motor:** Unity / Godot / Babylon.js (selección justificada en el GDD)  
**Lenguaje:** C# (Unity) / GDScript (Godot) / TypeScript (Babylon.js)  
**Persistencia (diseño):** JSON (config) + Savegame JSON  
**Gestión:** Git + GitHub Projects / Trello  
**Diseño UI/UX:** Figma (o mockups en imágenes)  

---

## Estadísticas del Proyecto (Estimadas)
| Métrica | Valor |
|---|---:|
| Documentos principales | 4 |
| Diagramas (UML + Core Loop) | 4 |
| Niveles diseñados | 10 |
| Sistemas diseñados | 5 (detección, energía, gadgets, loot, progreso) |
| Horas estimadas totales | 28–34 |

---

## Estructura de Directorios (Repositorio)
