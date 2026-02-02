# Game Design Document (GDD) - Vault Protocol
**Versión:** 1.0  
**Fecha:** 01/02/2025  
**Autor:** Carlos Morales
**Género:** Sigilo táctico + Puzzle + Gestión ligera de recursos  
**Plataforma objetivo:** PC / Web (según motor seleccionado)  

> **Importante:** Este documento corresponde a **pre-producción y diseño técnico**.  
> **No incluye código funcional**. El objetivo es documentar un blueprint completo para implementación futura.

---

## 1. Visión General del Juego

### 1.1 Concepto Principal
**Vault Protocol** es un videojuego de sigilo donde el jugador infiltra instalaciones de alta seguridad para recuperar **fragmentos de datos** sin ser detectado por **cámaras** y **drones**. La experiencia se centra en leer patrones, elegir rutas y administrar recursos (energía/gadgets).

### 1.2 Fantasía del Jugador
“Soy un infiltrador inteligente que vence al sistema con estrategia, paciencia y decisiones tácticas”.

### 1.3 Proposición de Valor (USP)
1) **Visión de Señales:** revela temporalmente rutas de vigilancia y zonas seguras.  
2) **Energía como decisión:** sprint y gadgets consumen energía; obliga a elegir.  
3) **Rutas múltiples:** cada nivel ofrece al menos 2 caminos (seguro-lento vs riesgoso-rápido).  

### 1.4 Audiencia Objetivo
- Jugadores que disfrutan puzzles, planificación y tensión controlada.
- Edad recomendada: 12+  
- Sesiones por nivel: 10–20 minutos

### 1.5 Objetivos de Diseño
- Diseñar un juego coherente aplicando el framework **MDA**.
- Definir sistemas medibles: detección, energía, movimiento, gadgets, progreso.
- Diseñar 10 niveles con progresión de dificultad.
- Definir UI/UX clara y minimalista con feedback inmediato.

---

## 2. Framework MDA (Núcleo del Diseño)

### 2.1 Aesthetics (Emociones objetivo)
- **Tensión/Suspenso:** “si cometo un error me detectan”.
- **Descubrimiento:** “encuentro rutas, atajos y patrones”.
- **Competencia:** “optimizo mis runs: menos alertas, menos gasto, más loot”.

### 2.2 Dynamics (Comportamientos emergentes)
- **Jugar por ventanas seguras:** observar → actuar → esconderse → avanzar.
- **Riesgo/Recompensa:** más fragmentos/loot implican más exposición.
- **Aprendizaje iterativo:** cada fallo enseña una mejor ruta.

### 2.3 Mechanics (Reglas medibles - parámetros objetivo)
> Estos valores son “targets” iniciales para balance (no implementación).

**Movimiento**
- Caminar: 4.0 u/s  
- Agacharse: 1.8 u/s (menos ruido)  
- Sprint: 6.5 u/s (alto ruido + consumo energía)

**Detección**
- Cámaras: cono 60°, alcance 12m, detección completa 1.2s  
- Drones: detección 0.8s si distancia < 4m y línea de visión  
- Alertas: 3 niveles (0 normal, 1 sospecha, 2 persecución)

**Visión de Señales**
- Duración: 3s  
- Cooldown: 10s  
- Costo: -15 energía  
- Efecto: resalta rutas de vigilancia y zonas de riesgo

---

## 3. Core Loop y Metajuego

### 3.1 Core Loop (Ciclo principal)
1) Leer patrones (cámaras/drones)  
2) Infiltrar (moverse con sigilo)  
3) Hackear / obtener acceso  
4) Recuperar fragmento/loot  
5) Escapar (mayor riesgo al cargar loot)  
6) Mejorar loadout (desbloqueos)  

### 3.2 Progresión (Metajuego)
- Fragmentos recuperados desbloquean:
  - Gadgets nuevos
  - Mejoras de energía
  - Rutas alternativas
- Objetivo final: completar los 10 niveles y recuperar el paquete completo de datos.

---

## 4. Sistemas del Juego

### 4.1 Sistema de Detección (cámaras/drones)
**Reglas clave**
- Entrar al cono de visión inicia un contador de detección.
- Si el jugador sale antes de completar el tiempo → queda “sospecha”.
- Si se completa el tiempo → “detectado” y sube alerta.

**Estados de Alerta**
- **Nivel 0 (Normal):** patrullas estándar.
- **Nivel 1 (Sospecha):** aumenta frecuencia de patrulla, búsqueda corta.
- **Nivel 2 (Persecución):** rutas bloqueadas, drones aceleran, alarmas activas.

### 4.2 Sistema de Energía
- Energía máxima: 100
- Sprint: -12 energía/s
- Hack: -20 energía por intento
- Visión de Señales: -15 energía
- Batería consumible (pickup): +40 energía

**Objetivo del diseño:** obligar a decisiones tácticas (velocidad vs seguridad).

### 4.3 Sistema de Gadgets
**Must (obligatorio)**
- Visión de Señales
- Herramienta de Hack

**Should (deseable)**
- Distractor (genera ruido en un punto)
- Llave temporal (abre una puerta por pocos segundos)

**Could (opcional)**
- EMP (desactiva cámara 2s)

**Won’t (no incluido en esta iteración)**
- IA avanzada de humanos armados

### 4.4 Sistema de Loot y Objetivos
- **Fragmentos de datos:** objetivo principal.
- **Chatarra/Componentes:** mejora gadgets (progreso).
- **Llaves:** desbloquean rutas.

---

## 5. Narrativa y Ambientación

### 5.1 Premisa
Una corporación ha ocultado información crítica en bóvedas de seguridad. El jugador debe infiltrar instalaciones, recuperar datos y escapar antes de ser detectado.

### 5.2 Storytelling Ambiental
- Señalética de seguridad, cámaras visibles, pantallas con logs.
- Sonidos diegéticos: ventilación, puertas, alarmas.
- Visual sci-fi sobrio: luz fría y contrastes marcados.

---

## 6. Diseño de Niveles (10 niveles)

### 6.1 Plantilla por Nivel
- Objetivo: fragmentos (1 a 3)
- Amenazas: cámaras/drones/puertas
- Rutas: A (segura y lenta) / B (rápida y riesgosa)
- Twist: introduce variación o nuevo patrón

### 6.2 Tabla de niveles
| Nivel | Nombre | Enfoque | Introduce | Objetivo |
|---:|---|---|---|---|
| 1 | Lobby de Seguridad | Tutorial | cámara fija + cobertura | 1 fragmento |
| 2 | Pasillo de Cámaras | Patrones | cámaras encadenadas | 1 fragmento |
| 3 | Data Hall | Patrulla | dron básico | 2 fragmentos |
| 4 | Oficina Blindada | Rutas | llaves + puertas | 2 fragmentos |
| 5 | Sala de Servidores | Energía | consumo alto | 2 fragmentos |
| 6 | Almacén | Distracción | distractor | 2 fragmentos |
| 7 | Laboratorio | Tiempo | eventos de alerta | 3 fragmentos |
| 8 | Torre Central | Multicapa | cámaras + drones | 3 fragmentos |
| 9 | Vault Exterior | Escape | bloqueos por alerta | 3 fragmentos |
| 10 | Vault Core | Final | doble vigilancia | 3 fragmentos + extracción |

### 6.3 Curva de Dificultad
- N1–2: aprendizaje
- N3–5: dominio + energía
- N6–8: complejidad + rutas
- N9–10: presión máxima + bloqueo

---

## 7. Personajes y Entidades

### 7.1 Jugador
- Habilidades: caminar, agacharse, sprint, interactuar, hack, visión de señales.
- Debilidades: energía limitada y detección rápida.

### 7.2 Amenazas
- Cámara: patrón fijo y cono de visión.
- Dron: patrulla con reacción a alertas.
- Puertas: bloqueos y accesos por llaves/hack.

---

## 8. UI/UX

### 8.1 Pantallas
1) Menú principal  
2) Briefing de misión (objetivo + mapa simple)  
3) Gameplay HUD  
4) Pausa  
5) Resumen de extracción  

### 8.2 HUD (jerarquía)
- Energía (arriba izquierda)
- Alerta (arriba derecha)
- Gadget + cooldown (abajo derecha)
- Prompt de interacción (centro inferior)

### 8.3 Principios UI
- Minimalismo
- Feedback inmediato
- Legibilidad y accesibilidad (alto contraste)

---

## 9. Arte y Dirección Visual

### 9.1 Estilo
- Sci-fi sobrio: instalaciones, metal, luz fría.
- Colores de señalización: amarillo (interacción), rojo (peligro).

### 9.2 Paleta (referencial)
- Base: grises/azules
- Interacción: amarillo
- Peligro: rojo
- Sigilo: verde suave

---

## 10. Audio

### 10.1 SFX (mínimos)
- pasos (walk/crouch/sprint)
- hack (inicio/éxito/fallo)
- alerta (niveles)
- puertas (abrir/cerrar/bloquear)
- dron (cerca/lejos)
- pickup (fragmento)

### 10.2 Música (deseable)
- menú: ambient
- gameplay: tensión baja
- alerta: intensificación

---

## 11. Arquitectura Conceptual (UML + Patrones)

### 11.1 Casos de Uso
- Infiltrar zona
- Hackear terminal
- Recuperar fragmento
- Evitar detección
- Extraer/escapar

### 11.2 Componentes (conceptual)
- GameManager
- PlayerController
- DetectionSystem
- EnergySystem
- GadgetSystem
- UIManager
- LevelManager

### 11.3 Patrones
- **Singleton:** GameManager/UIManager
- **Observer:** UI reacciona a cambios (energía/alerta)
- **State Pattern:** FSM de jugador y estados del juego

---

## 12. Calidad y Criterios de Aceptación (Diseño)

- MDA coherente: emociones ↔ dinámicas ↔ mecánicas.
- Cada nivel agrega complejidad real (no repetición).
- UI clara y no invasiva.
- Sistemas acoplados lógicamente (energía influye decisiones; alerta altera rutas).

---

## 13. Consideraciones Futuras
- Más gadgets
- Modos desafío (no-alert / speedrun)
- Niveles adicionales (11–20)
- Guardado y estadísticas

---

## Historial de Cambios
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | 2025 | Documento inicial completo |

---

**Fin del documento**
