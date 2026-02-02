# Gestión del Proyecto - Tower Defense

**Integrante:** Carlos Morales  
**Fecha:** 01/02/2026

---

## 1. Información General del Proyecto

**Nombre del Proyecto:** Tower Defense  
**Tipo de Juego:** Juego de Entretenimiento - Tower Defense 3D  
**Plataforma:** Web (Navegador)  
**Motor:** Babylon.js 6.x  
**Lenguaje:** TypeScript  
**Build Tool:** Vite  
**Control de Versiones:** Git + GitHub  
**Gestión del Proyecto:** GitHub Projects (Kanban)

**Período:** 2do Bimestre  
**Estado del Proyecto:** En desarrollo (enfocado en slice vertical del Nivel 1 para evaluación)

---

## 2. Descripción del Proyecto

Tower Defense es un juego de estrategia en tiempo real en 3D con temática Sci-Fi. El jugador asume el rol de comandante de defensa de una estación espacial que protege un **Núcleo de Energía Cuántica** frente a oleadas de enemigos alienígenas.

La experiencia se basa en:
- Colocación estratégica de torres en un mapa tipo **grid**
- Ataque automático (targeting) de torres contra enemigos
- Enemigos que siguen un camino predefinido (pathfinding)
- Economía de créditos para construir y mejorar defensas
- Sistema de oleadas progresivo

---

## 3. Objetivos Principales

- Implementar la colocación de torres en un grid con validación de celdas.
- Construir un sistema de targeting automático y ataque (mínimo una torre funcional).
- Implementar movimiento de enemigos sobre un camino definido (mínimo un enemigo funcional).
- Implementar oleadas progresivas (mínimo 5 oleadas para el Nivel 1).
- Implementar economía: ganar créditos por eliminar enemigos y gastar al construir/mejorar.
- Diseñar un HUD claro con información crítica: créditos, vida del núcleo y oleada actual.
- Implementar condiciones de victoria/derrota.

---

## 4. Alcance

### 4.1 Alcance Completo (Diseñado)
- 5 tipos de torres: Láser, Plasma, Tesla, Misiles, Ralentizador (con sistema de mejoras hasta nivel 3).
- 4 tipos de enemigos: Drone Scout, Heavy Walker, Stealth Unit, Boss Titan.
- Sistema de oleadas progresivo con jefes.
- Sistema de economía completo (créditos por kill, bonus, venta, upgrades).
- 3 niveles con mapas diferentes:
  - Nivel 1: Estación de Entrada (tutorial)
  - Nivel 2: Corredor Industrial
  - Nivel 3: Núcleo Central

### 4.2 Alcance para Implementación (Evaluación / Examen)
Se implementa un **slice vertical** del **Nivel 1** con mecánicas básicas:
- Grid 10x10 visible (camino vs celdas buildable)
- Camino en forma de “S” (spawn → núcleo)
- Torre funcional: **Láser Básico**
- Enemigo funcional: **Drone Scout**
- Sistema de oleadas básico (5 oleadas)
- Economía básica (créditos por eliminar + costo de torre)
- HUD básico (créditos, vida del núcleo, oleada)
- Condición de victoria/derrota

---

## 5. Equipo del Proyecto

**Integrante:** Carlos Morales  
**Roles:** Programación, Diseño de juego, Gestión del proyecto y documentación.

---

## 6. Tecnologías Utilizadas

- **Babylon.js 6.x** (render 3D)
- **TypeScript** (desarrollo)
- **Vite** (bundling + dev server)
- **Git + GitHub** (versionado)
- **GitHub Projects** (Kanban para GDD y para implementación)

---

## 7. Entregables

- Documento de entrega del proyecto (resumen técnico y organizacional)
- Game Design Document (GDD) completo
- Kanban de Gestión del GDD (prefijo: TAR-)
- Kanban de Implementación (prefijo: IM-)
- Repositorio con proyecto base configurado (Vite + Babylon.js + TS)
- Slice vertical jugable del Nivel 1
- Documentación en Markdown (Índice general + Gestión)

---

## 8. Enlaces del Proyecto (Completar)

- **Repositorio:** [Pegar URL aquí]
- **Kanban GDD (TAR-):** [Pegar URL aquí]
- **Kanban Implementación (IM-):** [Pegar URL aquí]

---

**Fin del documento**
