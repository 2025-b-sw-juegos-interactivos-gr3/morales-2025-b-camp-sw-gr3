# Documentación de Assets - Tower Defense
**Versión:** 1.0  
**Fecha:** 01/02/202 
**Proyecto:** Tower Defense (Sci-Fi 3D)  
**Motor:** Babylon.js 6.x (WebGL)  
**Equipo:** Dorian Tituaña, Alexander Vera  

---

## 1. Introducción
Los **assets** son todos los recursos visuales, de audio y UI utilizados en el videojuego **Tower Defense**.  
Esta documentación lista el inventario de assets necesarios, sus especificaciones técnicas y su propósito dentro del juego.

> Nota: El estilo del proyecto prioriza **formas geométricas 3D simples** (primitivas) + **materiales neón** para acelerar el desarrollo y mantener coherencia visual.

---

## 2. Inventario de Assets

### 2.1 Resumen por Tipo
| Tipo | Cantidad aprox. | Formato / Tecnología | Observación |
|---|---:|---|---|
| Modelos 3D (primitivas) | 10+ | Babylon.js MeshBuilder | Se generan por código |
| Materiales/Colores | 10+ | PBR/StandardMaterial | Paleta neón definida |
| UI (paneles/íconos) | 10–20 | PNG/SVG o HTML/CSS | HUD + menús |
| VFX (partículas/beam) | 5+ | ParticleSystem / Mesh | Láser, trails, impactos |
| Audio (SFX + música) | 10–15 | MP3/WAV/OGG | Eventos de gameplay |

---

## 3. Assets Visuales (3D)

## 3.1 Torres (Modelos 3D por Primitivas)
Todas las torres se representan con geometría simple, con materiales neón.

### Torre 1: Láser Básico
- **Forma base:** Cilindro + esfera en la punta  
- **Color/material:** Cyan neón `#00ffff`  
- **Uso:** Disparo rápido (proyectil/beam simple)

### Torre 2: Cañón de Plasma
- **Forma base:** Cubo + cilindro grueso como cañón  
- **Color/material:** Cyan neón con glow suave  
- **Uso:** Disparo lento con daño alto (AOE visual al impactar)

### Torre 3: Torre Tesla
- **Forma base:** Esfera + anillos giratorios  
- **Color/material:** Cyan neón con efecto eléctrico  
- **Uso:** Cadena a 3 enemigos (rayos conectando objetivos)

### Torre 4: Misiles Guiados
- **Forma base:** Plataforma + 4 tubos de lanzamiento  
- **Color/material:** Cyan neón + detalles grises metálicos  
- **Uso:** Proyectil que persigue objetivo (misil)

### Torre 5: Ralentizador
- **Forma base:** Pirámide invertida + onda/halo  
- **Color/material:** Cyan neón (halo semitransparente)  
- **Uso:** Campo que reduce velocidad 40%

---

## 3.2 Enemigos (Modelos 3D por Primitivas)

### Enemigo 1: Drone Scout
- **Forma:** Esfera pequeña  
- **Color:** Rojo/Magenta neón `#ff0055`  
- **VFX:** Trail de partículas  
- **Notas:** Unidad básica, rápida y frágil

### Enemigo 2: Heavy Walker
- **Forma:** Cubo grande + 4 cilindros (patas)  
- **Color:** Magenta con detalles oscuros  
- **Notas:** Tanque resistente, velocidad lenta

### Enemigo 3: Stealth Unit
- **Forma:** Tetraedro  
- **Material:** Semi-transparente (invisibilidad por 3s)  
- **Notas:** Cambia visibilidad durante oleadas avanzadas

### Enemigo 4: Boss Titan
- **Forma:** Composición de múltiples primitivas  
- **Tamaño:** 3x el enemigo normal  
- **Notas:** Jefe de oleada (cada 5 oleadas)

---

## 3.3 Mapa / Escenario (Nivel 1 - Slice Vertical Examen)
### Grid y Camino
- **Dimensiones del mapa:** 10x10 celdas  
- **Camino:** forma de S (ruta por donde avanzan enemigos)  
- **Zonas buildable:** 15 espacios de colocación (terreno válido)  

**Colores recomendados:**
- Fondo: `#0a0a1a` (azul muy oscuro)
- Camino: `#3d3d5c` (gris metálico)
- Núcleo: `#ffd700` (dorado)

### Núcleo (Objetivo a Defender)
- **Forma:** esfera/estructura central con glow dorado
- **Color:** `#ffd700`
- **Feedback visual:** parpadeo o pulso cuando recibe daño

---

## 4. UI (Interfaz)

## 4.1 HUD en Juego
**Elementos mínimos:**
- Panel superior izquierdo:
  - Créditos
  - Vida del núcleo
  - Oleada actual
- Panel inferior:
  - Selector de torres (iconos + costo + atajo 1–5)
- Panel derecho:
  - Información de torre seleccionada (stats, botones mejorar/vender)
- Centro superior:
  - Botón “Iniciar oleada” + indicador de tiempo entre oleadas

**Formatos recomendados:**
- Iconos: PNG (64x64) o SVG
- Paneles: PNG con 9-slicing o UI HTML/CSS (según implementación)

---

## 4.2 Menú Principal
- Botón: Jugar (selección de nivel)
- Botón: Opciones (volumen/calidad)
- Botón: Créditos

---

## 4.3 Pantallas de Estado
- **Victoria:** estadísticas + botón siguiente nivel
- **Derrota:** game over + reintentar
- **Pausa:** continuar / reiniciar / salir

---

## 5. VFX (Efectos Visuales)

### 5.1 Disparo Láser (Torre Láser)
- Beam simple (línea/mesh) o proyectil rápido
- Color: cyan `#00ffff`
- Glow leve + fade-out rápido

### 5.2 Impacto Plasma (AOE)
- Partículas circulares + expansión breve
- Flash corto en zona de impacto

### 5.3 Rayo Tesla (Cadena)
- Rayo con jitter (línea segmentada) conectando 2–3 enemigos
- Sonido eléctrico asociado

### 5.4 Trail de Enemigos
- Drone Scout con partículas pequeñas
- Boss con trail más intenso

### 5.5 Feedback de Daño al Núcleo
- Pulso dorado + pantalla con leve flash (opcional)
- Alarma sonora corta

---

## 6. Audio

## 6.1 Música
- Menú: ambient electrónico atmosférico
- Oleadas: synthwave con tensión
- Entre oleadas: tema más calmado
- Boss: tema intenso

## 6.2 Efectos de Sonido (SFX)
| Evento | Descripción |
|---|---|
| Colocar torre | click metálico + zumbido |
| Láser | “pew” sintético corto |
| Plasma | whoosh profundo + explosión |
| Tesla | chisporroteo eléctrico |
| Misil | silbido de cohete + explosión |
| Enemigo destruido | pop digital + sonido créditos |
| Daño al núcleo | alarma corta + impacto grave |
| Nueva oleada | sirena corta |
| Victoria | fanfarria épica corta |
| Derrota | explosión larga + tono grave descendente |

---

## 7. Formatos, Tamaños y Reglas

### 7.1 Reglas de Formato
- **Modelos:** preferir primitivas generadas por código (sin necesidad de .glb)
- **Texturas:** usar solo si es necesario (optimización)
- **UI:** PNG/SVG; tipografía legible; contraste alto
- **Audio:** MP3/OGG para música, WAV/OGG para SFX (según peso)

### 7.2 Objetivos de Optimización
- Mantener tiempo de carga bajo (assets livianos)
- Reutilizar materiales (paleta neón)
- Partículas limitadas para no bajar FPS

---

## 8. Estructura de Carpetas (Assets)
Sugerencia dentro del proyecto:

public/assets/  
├── ui/  
│   ├── icons/  
│   ├── panels/  
│   └── fonts/  
├── audio/  
│   ├── music/  
│   └── sfx/  
├── vfx/  
│   ├── particles/  
│   └── shaders/  
└── references/  
    ├── towers/  
    ├── enemies/  
    └── ui/  

---

## 9. Derechos y Atribuciones
- Si se usan audios/imágenes externas, documentar:
  - Fuente
  - Licencia
  - Enlace original
- Ideal: usar recursos propios o libres (CC0 / royalty-free).

---

## 10. Historial de Cambios
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Dic 2024 | Inventario inicial completo |

---
**Fin del documento**
