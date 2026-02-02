# Game Design Document (GDD) - Vault Protocol
**Versión:** 1.0  
**Fecha:** 2025  
**Autor:** [TU NOMBRE]  
**Género:** Sigilo táctico + Puzzle + Gestión ligera  
**Plataforma:** PC / Web (según motor elegido)  
**Nota:** Documento de pre-producción. No contiene código funcional.

---

## 1. Visión General del Juego

### 1.1 Concepto Principal
Vault Protocol es un juego donde el jugador infiltra instalaciones de seguridad para recuperar fragmentos de datos sin ser detectado. El énfasis está en leer patrones, planear rutas, gestionar energía y resolver mini-puzzles de hackeo.

### 1.2 Proposición de Valor (USP)
1) **Visión de Señales:** habilidad que revela rutas de vigilancia por pocos segundos (no rompe el juego, tiene costo).  
2) **Energía como decisión:** sprint y gadgets consumen batería; obliga a elegir entre velocidad o seguridad.  
3) **Rutas múltiples:** siempre hay al menos dos caminos (uno seguro y lento, otro riesgoso y rápido).

### 1.3 Audiencia Objetivo
- Jugadores que disfrutan planificación, tensión controlada y puzzles breves.
- Sesiones 10–20 minutos por nivel/run.

### 1.4 Referencias (Inspiración)
- Sigilo táctico (lectura de patrones)
- Puzzle de rutas y riesgos
- Estética sci-fi sobria / instalaciones de seguridad

---

## 2. Análisis MDA (Núcleo del diseño)

### 2.1 Aesthetics (Experiencia / Emociones objetivo)
- **Tensión / Suspenso:** “me pueden descubrir en cualquier momento”.
- **Descubrimiento:** “entiendo patrones, encuentro atajos y rutas”.
- **Competencia:** “optimizo mi run: menos alertas, menos energía, más fragmentos”.

### 2.2 Dynamics (Comportamientos emergentes)
- **Sigilo por ventanas seguras:** patrones de cámaras y drones generan ciclos “observar → actuar”.
- **Riesgo/recompensa:** más loot implica mayor exposición/consumo de recursos.
- **Aprendizaje iterativo:** fallar enseña rutas; cada intento mejora planificación.

### 2.3 Mechanics (Reglas medibles)
> Valores base sujetos a balance en producción. Aquí se definen como “targets”.

**Movimiento**
- Walk: 4.0 u/s (ruido 3m)
- Crouch: 1.8 u/s (ruido 1m, mejora sigilo)
- Sprint: 6.5 u/s (ruido 10m, energía -12/s)

**Detección**
- Cámaras: cono 60°, alcance 12m, detección completa en 1.2s
- Drones: detección en 0.8s si distancia < 4m y línea de visión
- Alerta: 3 niveles
  - 0: normal
  - 1: sospecha (más patrulla)
  - 2: persecución (cierres de puertas / rutas bloqueadas)

**Visión de Señales**
- Duración: 3s
- Cooldown: 10s
- Costo energía: -15 por uso
- Efecto: muestra rutas de vigilancia como líneas/ondas

---

## 3. Core Loop y Sistemas

### 3.1 Core Loop (ciclo principal)
1) **Leer patrón** (cámaras/drones)  
2) **Moverse** (sigilo + cobertura)  
3) **Hackear / obtener llave**  
4) **Recolectar fragmento**  
5) **Escapar** (riesgo sube al cargar loot)  
6) **Mejorar loadout** (progreso)

### 3.2 Diagrama Core Loop (Mermaid)
```mermaid
flowchart LR
A[Leer patrones] --> B[Infiltrar]
B --> C[Hack/Puzzle]
C --> D[Obtener fragmento/loot]
D --> E[Escape]
E --> F[Mejoras / Preparación]
F --> A
