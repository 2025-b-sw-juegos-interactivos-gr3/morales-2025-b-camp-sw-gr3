# Índice General - Documentación Tower Defense

**Proyecto:** Tower Defense  
**Integrante:** Carlos Morales  
**Fecha:** 01/02/2026  
**Materia:** Desarrollo de Software de Juegos Interactivos  
**Plataforma:** Web (Navegador)  
**Motor:** Babylon.js 6.x  
**Lenguaje:** TypeScript  
**Build Tool:** Vite  
**Control de Versiones:** Git + GitHub  
**Gestión:** GitHub Projects (Kanban)

---

## Tabla de Contenidos

### 1. Gestión del Proyecto
Documentación sobre la planeación, organización y seguimiento del desarrollo del juego.

**1.1 Descripción del Proyecto**
- Información general del proyecto
- Descripción conceptual y narrativa
- Objetivos principales
- Alcance del proyecto (completo y slice para examen)
- Integrantes y tecnologías
- Entregables del proyecto

**1.2 Backlog de Tareas**
- Épicas principales del desarrollo
- Historias de usuario (Implementación IM-)
- Tareas de Kanban para GDD (TAR-)
- Estado de cada tarea
- Estimaciones (puntos de historia)
- Métricas y riesgos
- Próximos pasos

📁 Ruta sugerida:
- `01_Gestion/01_descripcion_proyecto.md`
- `01_Gestion/02_backlog_tareas.md`

---

### 2. Game Design Document (GDD)
Documento completo que especifica todos los aspectos del diseño del videojuego.

**GDD Completo**
- Resumen ejecutivo
- Concepto, historia y ambientación (sci-fi)
- Objetivo del juego y flujo de juego (Preparación → Oleada → Entre oleadas)
- Mecánicas: torres, enemigos, oleadas, economía, controles
- Diseño de niveles (Nivel 1, 2, 3)
- Interfaz de usuario (HUD, menú, pantallas)
- Arte y estilo visual (sci-fi minimalista con neón)
- Audio y música (planificado)
- Especificaciones técnicas y arquitectura del proyecto
- Cronograma de desarrollo

📁 Ruta sugerida:
- `02_Game_Design_Document/GDD_completo.md`

---

### 3. Documentación de Assets
Inventario completo y especificaciones de recursos (modelos, UI, efectos y audio).

**Documentación de Assets**
- Inventario total de assets (3D, UI, VFX, SFX)
- Especificaciones técnicas y formatos
- Integración en el código (rutas y uso)
- Requisitos de almacenamiento
- Notas de derechos y atribuciones

📁 Ruta sugerida:
- `03_Assets/assets_documentacion.md`

---

## Resumen Ejecutivo

### Visión del Proyecto
**Tower Defense** es un videojuego **3D** de estrategia en tiempo real con temática **Sci-Fi**. El jugador debe defender un **núcleo de energía** de oleadas de enemigos alienígenas, colocando torres estratégicamente en un mapa tipo **grid**.

### Objetivos (Globales)
- Defender el núcleo de energía hasta completar todas las oleadas.
- Administrar recursos (créditos) para construir y mejorar torres.
- Diseñar niveles con rutas definidas para el tránsito de enemigos.
- Presentar una UI clara (créditos, vida del núcleo, oleada actual).

### Slice Vertical para Examen
Para la evaluación se implementa un **slice vertical del Nivel 1**:
- Grid 10x10
- Camino en forma de “S”
- 1 torre funcional (Láser Básico)
- 1 enemigo funcional (Drone Scout)
- Sistema de oleadas básico (5 oleadas)
- Economía (ganar/gastar créditos)
- HUD básico
- Victoria/Derrota

---

## Tecnologías Utilizadas
- **Motor 3D:** Babylon.js 6.x
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Plataforma:** Web (Navegador con WebGL 2.0)
- **Control de versiones:** Git + GitHub
- **Gestión:** GitHub Projects (Kanban)

---

## Estructura de Directorios (Referencia)

