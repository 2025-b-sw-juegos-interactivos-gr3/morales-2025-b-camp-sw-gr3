# Documentación de Assets - Vault Protocol
**Versión:** 1.0  
**Fecha:** 01/02/2025
**Autor:** Carlos Morales 

> Este documento define un inventario **planificado** de assets, sus especificaciones y propósito.  
> No incluye assets finales, solo descripción técnica y guía de producción.

---

## 1. Introducción
Los assets son los recursos visuales, UI y audio utilizados en el videojuego. Esta documentación lista los assets planificados para Vault Protocol y sus especificaciones (formatos, resoluciones, uso en UI y gameplay).

---

## 2. Inventario de Assets (Planificado)

### 2.1 Resumen por tipo
| Tipo de asset | Cantidad | Formatos | Tamaño total aprox. |
|---|---:|---|---:|
| Fondos / escenarios (10 niveles) | 10 | PNG/WebP/JPG | 20–60 MB |
| Sprites jugador | 1 set | PNG (spritesheet) | 2–8 MB |
| Sprites dron/cámara | 2–3 sets | PNG | 2–6 MB |
| UI (pantallas, iconos, HUD) | 1 pack | PNG/SVG | 2–10 MB |
| SFX | 10–15 | WAV/OGG/MP3 | 5–20 MB |
| Música | 2–3 pistas | OGG/MP3 | 10–30 MB |

---

## 3. Assets Visuales - Escenarios por Nivel (10)

> Resolución recomendada:
- **Base:** 1280x720 (HD)
- **Ideal:** 1920x1080 (Full HD)
- **Formato recomendado:** WebP (peso bajo) o PNG (calidad máxima)

---

### Nivel 1 - Lobby de Seguridad
- **Archivo sugerido:** `bg_lvl01_lobby.webp`
- **Descripción:** recepción con cámaras visibles, señalética y zonas de cobertura.
- **Propósito:** nivel tutorial, lectura visual clara.

### Nivel 2 - Pasillo de Cámaras
- **Archivo sugerido:** `bg_lvl02_corridor.webp`
- **Descripción:** pasillos largos con iluminación repetitiva que refuerza patrones.
- **Propósito:** enseñar lectura de conos de visión.

### Nivel 3 - Data Hall
- **Archivo sugerido:** `bg_lvl03_datahall.webp`
- **Descripción:** racks de servidores, luces frías, sombras marcadas.
- **Propósito:** introducir dron patrulla.

### Nivel 4 - Oficina Blindada
- **Archivo sugerido:** `bg_lvl04_office.webp`
- **Descripción:** oficinas, puertas, paneles de acceso y rutas alternativas.
- **Propósito:** reforzar llaves/hack.

### Nivel 5 - Sala de Servidores (Calor)
- **Archivo sugerido:** `bg_lvl05_heat.webp`
- **Descripción:** vapor visual sutil y luces de warning.
- **Propósito:** presión por energía (decisiones más estrictas).

### Nivel 6 - Almacén
- **Archivo sugerido:** `bg_lvl06_storage.webp`
- **Descripción:** cajas y pasillos estrechos con cobertura frecuente.
- **Propósito:** introducir distractor como herramienta.

### Nivel 7 - Laboratorio
- **Archivo sugerido:** `bg_lvl07_lab.webp`
- **Descripción:** cristales/vidrios/tubos, área restringida.
- **Propósito:** timing y eventos de alerta.

### Nivel 8 - Torre Central
- **Archivo sugerido:** `bg_lvl08_tower.webp`
- **Descripción:** estructura vertical y vigilancia multicapa.
- **Propósito:** complejidad máxima.

### Nivel 9 - Vault Exterior
- **Archivo sugerido:** `bg_lvl09_vaultouter.webp`
- **Descripción:** exterior nocturno con seguridad pesada y reflectores.
- **Propósito:** escape y bloqueos por alerta.

### Nivel 10 - Vault Core
- **Archivo sugerido:** `bg_lvl10_core.webp`
- **Descripción:** bóveda final con iluminación dramática.
- **Propósito:** cierre del juego y extracción.

---

## 4. Assets Visuales - Personaje y Enemigos

### 4.1 Jugador (Infiltrador)
- **Archivo sugerido:** `spr_player_agent.png`
- **Tipo:** spritesheet (2D)
- **Resolución sugerida:** 1024–2048 (sheet)
- **Animaciones planificadas:**
  - idle
  - walk
  - crouch
  - sprint
  - interact
  - hack
- **Notas de legibilidad:**
  - silueta clara
  - contraste alto contra fondos fríos

### 4.2 Dron
- **Archivo sugerido:** `spr_enemy_drone.png`
- **Estados visuales:**
  - normal (luz verde)
  - sospecha (luz amarilla)
  - alerta (luz roja)

### 4.3 Cámara
- **Archivo sugerido:** `spr_security_camera.png`
- **Indicador de visión (UI):** overlay temporal (no permanente)

---

## 5. UI Assets

### 5.1 Pantallas UI
- **Menú Principal:** `ui_menu.png`
- **Briefing:** `ui_briefing.png`
- **Pausa:** `ui_pause.png`
- **Resumen extracción:** `ui_summary.png`

### 5.2 Elementos HUD (pack)
- `icon_energy.svg/png`
- `icon_alert.svg/png`
- `icon_gadget.svg/png`
- `icon_interact.svg/png`

### 5.3 Tipografía sugerida
- Roboto / Inter (alta legibilidad)
- Uso consistente (títulos vs texto)

---

## 6. Audio Assets

### 6.1 SFX mínimos (lista)
- `sfx_steps_walk`
- `sfx_steps_crouch`
- `sfx_steps_sprint`
- `sfx_hack_start`
- `sfx_hack_success`
- `sfx_hack_fail`
- `sfx_alert_lvl1`
- `sfx_alert_lvl2`
- `sfx_door_open`
- `sfx_door_lock`
- `sfx_drone_near`
- `sfx_drone_far`
- `sfx_pickup_fragment`

### 6.2 Música planificada
- `music_menu_ambient`
- `music_game_low_tension`
- `music_game_high_alert`

---

## 7. Especificaciones Técnicas Recomendadas

| Elemento | Recomendación |
|---|---|
| Fondos niveles | 1280x720 mínimo, 1920x1080 ideal |
| Sprites | PNG con transparencia |
| UI iconos | SVG preferible, PNG fallback |
| SFX | OGG/WAV para calidad |
| Música | OGG/MP3 (balance peso/calidad) |

---

## 8. Requisitos de Almacenamiento (estimación)
| Componente | Tamaño aprox. |
|---|---:|
| Fondos (10) | 20–60 MB |
| Sprites + UI | 5–20 MB |
| Audio total | 15–50 MB |
| Total aproximado | 40–130 MB |

---

## 9. Derechos y Atribuciones
- Si se usan recursos externos, documentar:
  - fuente
  - licencia
  - autor
  - enlace (si aplica)
- Recomendación: preferir CC0 o assets propios para evitar problemas legales.

---

## Historial de Cambios
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | 2025 | Inventario y especificaciones iniciales |

---

**Fin del documento**
