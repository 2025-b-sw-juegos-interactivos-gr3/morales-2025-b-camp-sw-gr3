# Tower Defense - Game Design Document (GDD)
**Versión:** 1.0  
**Fecha:** 01/02/2025
**Equipo de desarrollo:** Carlos Morales
**Institución:** Escuela Politécnica Nacional  
**Materia:** Desarrollo de Software de Juegos Interactivos  

---

## Índice
1. Resumen Ejecutivo  
2. Concepto del Juego  
3. Mecánicas de Juego  
4. Diseño de Niveles  
5. Sistema de Economía  
6. Interfaz de Usuario (UI)  
7. Arte y Estilo Visual  
8. Audio y Música  
9. Especificaciones Técnicas  
10. Cronograma de Desarrollo  
11. Guía de Lectura Recomendada  
12. Glosario  
13. Historial de Cambios  

---

# 1. Resumen Ejecutivo

## 1.1 Concepto Principal
**Tower Defense** es un juego de estrategia en tiempo real en **3D** donde el jugador debe **defender un núcleo de energía** contra oleadas de enemigos alienígenas mediante la **construcción estratégica de torres defensivas**. Ambientado en un futuro sci-fi, el jugador asume el rol de comandante de una estación espacial que debe proteger el **Núcleo de Energía Cuántica** de los invasores.

## 1.2 Características Clave
- Estética **sci-fi minimalista** (formas geométricas + colores neón sobre fondos oscuros)
- **5 tipos de torres** con habilidades únicas y sistema de mejoras
- **4 tipos de enemigos** con comportamientos distintos
- Sistema de **oleadas progresivas** con jefes
- Economía basada en **créditos** por eliminación de enemigos
- **3 niveles** con mapas únicos

## 1.3 Público Objetivo
Jugadores casuales y de estrategia entre **12–35 años** que disfrutan juegos de defensa de torres y estrategia en tiempo real. Accesible para principiantes, con profundidad para jugadores experimentados.

## 1.4 Plataforma y Tecnología
- **Plataforma:** Web (navegador)
- **Motor:** Babylon.js (WebGL)
- **Lenguaje:** JavaScript / TypeScript
- **Resolución objetivo:** 1920x1080 (responsive)

---

# 2. Concepto del Juego

## 2.1 Historia y Ambientación
Año **2347**. La humanidad ha expandido su presencia por la galaxia, estableciendo estaciones espaciales en puntos estratégicos. La **Estación Omega-7**, ubicada en el borde del territorio conocido, alberga el **Núcleo de Energía Cuántica**, una fuente vital para las colonias cercanas.

Una raza alienígena conocida como los **“Void Walkers”** ha detectado la energía del núcleo y ha enviado oleadas de invasores para capturarlo. Como comandante de defensa de la estación, tu misión es **construir y gestionar defensas** para repeler cada ataque.

## 2.2 Objetivo del Juego
- **Objetivo principal:** Defender el núcleo de energía de todas las oleadas sin que su integridad llegue a **cero**.
- **Objetivos secundarios:**
  - Completar niveles con el menor daño posible al núcleo
  - Maximizar puntuación eliminando enemigos eficientemente
  - Desbloquear todas las torres y mejoras

## 2.3 Flujo de Juego (Core Loop)
1. **Fase de Preparación:** el jugador coloca torres en posiciones válidas usando créditos iniciales.
2. **Fase de Oleada:** enemigos aparecen y siguen el camino hacia el núcleo. Las torres atacan automáticamente.
3. **Entre Oleadas:** se pueden construir más torres, mejorar o vender.
4. **Victoria/Derrota:** victoria al completar todas las oleadas; derrota si el núcleo es destruido.

## 2.4 Análisis MDA
**Mecánicas**
- Colocación de torres en grid
- Targeting automático
- Pathfinding de enemigos
- Economía de créditos

**Dinámicas**
- Gestión de recursos limitados
- Priorización de amenazas
- Optimización de posicionamiento

**Estéticas**
- Desafío estratégico
- Satisfacción al defender exitosamente
- Progresión y mejora

---

# 3. Mecánicas de Juego

## 3.1 Sistema de Torres
Las torres son la herramienta principal de defensa. Cada torre tiene ventajas para distintos tipos de enemigos.

### Tabla de Torres
| Torre | Costo | Daño | Alcance | Cadencia | Especial |
|------|------:|-----:|--------:|---------:|----------|
| Láser Básico | 100 | 10 | Medio | Rápida | Ninguno |
| Cañón de Plasma | 200 | 35 | Corto | Lenta | Daño en área (AOE) |
| Torre Tesla | 250 | 15 | Medio | Media | Cadena a 3 enemigos |
| Misiles Guiados | 300 | 50 | Largo | Muy lenta | Persigue objetivo |
| Ralentizador | 150 | 0 | Medio | Continua | Reduce velocidad 40% |

### Sistema de Mejoras
- Cada torre puede mejorarse hasta **nivel 3**.
- Cada mejora:
  - Incrementa estadísticas base en **+30%**
  - Cuesta **50%** del precio original de la torre

> Ejemplo: Láser Básico cuesta 100, cada mejora cuesta 50.

---

## 3.2 Sistema de Enemigos
Cada enemigo tiene estadísticas y comportamiento diferente.

| Enemigo | Vida | Velocidad | Recompensa | Descripción |
|--------|-----:|----------:|-----------:|-------------|
| Drone Scout | 30 | Rápida | 10 | Unidad básica: rápida pero frágil |
| Heavy Walker | 150 | Lenta | 25 | Tanque blindado: resistente |
| Stealth Unit | 50 | Media | 30 | Se vuelve invisible por 3 segundos |
| Boss Titan | 500 | Muy lenta | 100 | Jefe de oleada: aparece cada 5 oleadas |

---

## 3.3 Sistema de Oleadas
Dificultad progresiva (cantidad, mezcla de tipos y jefes).

- **Oleadas 1–5:** solo Drone Scouts (cantidad creciente **5–15**)
- **Oleadas 6–10:** se introducen Heavy Walkers (mezcla de tipos)
- **Oleadas 11–15:** aparecen Stealth Units y aumenta el ritmo de spawn
- **Oleada 5, 10 y 15:** aparece **Boss Titan** al final

---

## 3.4 Controles
| Acción | Control |
|------|---------|
| Seleccionar / Colocar torre | Click izquierdo |
| Cancelar selección | Click derecho |
| Zoom | Rueda del mouse |
| Mover cámara | WASD / Flechas |
| Mejorar torre seleccionada | Tecla **U** |
| Vender torre seleccionada | Tecla **S** |
| Iniciar oleada / Pausar | **Espacio** |
| Selección rápida de torres | **1–5** |

---

# 4. Diseño de Niveles

## 4.1 Estructura General
Cada nivel consiste en un mapa con un camino predefinido por donde transitan los enemigos. Las torres solo se pueden colocar en **zonas designadas**.

## 4.2 Nivel 1: Estación de Entrada (Tutorial)
- **Descripción:** nivel tutorial con camino simple en forma de **S**
- **Dimensiones:** 10x10 celdas
- **Puntos de colocación:** 15 espacios
- **Oleadas:** 5
- **Créditos iniciales:** 300
- **Enemigos:** solo Drone Scouts

## 4.3 Nivel 2: Corredor Industrial
- **Descripción:** camino más largo con bifurcaciones que se vuelven a unir
- **Dimensiones:** 15x12 celdas
- **Puntos de colocación:** 25 espacios
- **Oleadas:** 10
- **Créditos iniciales:** 400
- **Enemigos:** Drone Scouts + Heavy Walkers

## 4.4 Nivel 3: Núcleo Central (Final)
- **Descripción:** nivel final con múltiples puntos de entrada de enemigos
- **Dimensiones:** 20x15 celdas
- **Puntos de colocación:** 40 espacios
- **Oleadas:** 15
- **Créditos iniciales:** 500
- **Enemigos:** todos los tipos

---

# 5. Sistema de Economía

## 5.1 Fuentes de Créditos
- Créditos iniciales por nivel: **300–500**
- Eliminación de enemigos: **10–100** según tipo
- Bonus por oleada perfecta: **+50** si el núcleo no recibe daño
- Venta de torres: **70%** del valor total invertido

## 5.2 Gastos
- Construcción de torres: **100–300**
- Mejoras: **50%** del costo base por nivel

## 5.3 Balance Económico
El sistema obliga decisiones estratégicas: **más torres básicas** vs **menos torres avanzadas**. Un jugador promedio debería poder completar niveles con un margen de error del **20%** en decisiones económicas.

---

# 6. Interfaz de Usuario (UI)

## 6.1 HUD Principal (Durante el Juego)
- **Superior izquierdo:** créditos actuales, vida del núcleo, oleada actual
- **Inferior:** barra de selección de torres (iconos, costos, atajos)
- **Derecha:** información de torre seleccionada (stats, mejorar, vender)
- **Superior centro:** botón “Iniciar oleada” + indicador de tiempo entre oleadas

## 6.2 Menú Principal
- Jugar (selección de nivel)
- Opciones (volumen, calidad gráfica)
- Créditos

## 6.3 Pantallas de Estado
- **Victoria:** estadísticas del nivel, puntuación, botón siguiente nivel
- **Derrota:** mensaje game over, botón reintentar
- **Pausa:** continuar, reiniciar, salir al menú

---

# 7. Arte y Estilo Visual

## 7.1 Dirección Artística
Estilo **sci-fi minimalista**: formas geométricas limpias + colores neón sobre fondos oscuros.

## 7.2 Paleta de Colores
| Elemento | Color | Hex |
|---|---|---|
| Fondo | Azul muy oscuro | `#0a0a1a` |
| Torres aliadas | Cyan neón | `#00ffff` |
| Enemigos | Rojo/Magenta neón | `#ff0055` |
| Núcleo | Dorado | `#ffd700` |
| Camino | Gris metálico | `#3d3d5c` |
| UI/Texto | Blanco | `#ffffff` |

## 7.3 Diseño de Torres (Formas 3D)
- Láser Básico: **cilindro** con **esfera** en la punta
- Cañón de Plasma: **cubo** con **cilindro grueso** como cañón
- Torre Tesla: **esfera** con **anillos giratorios**
- Misiles Guiados: **plataforma** con **4 tubos** de lanzamiento
- Ralentizador: **pirámide invertida** con efecto de onda

## 7.4 Diseño de Enemigos (Formas 3D)
- Drone Scout: **esfera pequeña** con trail de partículas
- Heavy Walker: **cubo grande** con “patas” (4 cilindros)
- Stealth Unit: **tetraedro semi-transparente**
- Boss Titan: composición de múltiples formas, **3x** tamaño normal

---

# 8. Audio y Música

## 8.1 Música
- Menú: ambient electrónico atmosférico
- Durante oleadas: synthwave tempo medio-alto (tensión creciente)
- Entre oleadas: música calmada de preparación
- Boss: tema intenso con batería electrónica pesada

## 8.2 Efectos de Sonido
| Acción | Sonido |
|---|---|
| Colocar torre | Click metálico + zumbido de activación |
| Disparo láser | “Pew” sintético corto |
| Disparo plasma | Whoosh profundo + explosión |
| Tesla | Chisporroteo eléctrico |
| Misil | Silbido de cohete + explosión |
| Enemigo destruido | Pop digital + sonido de créditos |
| Daño al núcleo | Alarma corta + impacto grave |
| Nueva oleada | Sirena de alerta corta |
| Victoria | Fanfarria épica corta |
| Derrota | Explosión larga + tono grave descendente |

---

# 9. Especificaciones Técnicas

## 9.1 Stack Tecnológico
- **Motor 3D:** Babylon.js 6.x
- **Lenguaje:** TypeScript
- **Build tool:** Vite
- **Control de versiones:** Git + GitHub
- **Gestión:** GitHub Projects (Kanban)

## 9.2 Arquitectura del Proyecto (Propuesta)
Estructura recomendada:

tower-defense/  
├── src/  
│   ├── main.ts  
│   ├── game/  
│   │   ├── Game.ts  
│   │   ├── GameState.ts  
│   │   └── WaveManager.ts  
│   ├── entities/  
│   │   ├── Tower.ts  
│   │   ├── Enemy.ts  
│   │   └── Projectile.ts  
│   ├── systems/  
│   │   ├── PathfindingSystem.ts  
│   │   ├── TargetingSystem.ts  
│   │   └── EconomySystem.ts  
│   ├── ui/  
│   │   ├── HUD.ts  
│   │   └── TowerSelector.ts  
│   ├── levels/  
│   │   └── Level1.ts  
│   └── config/  
│       ├── towers.config.ts  
│       └── enemies.config.ts  
├── public/  
│   └── assets/  
├── index.html  
├── package.json  
└── tsconfig.json  

## 9.3 Requisitos del Sistema
**Mínimos**
- Navegador con soporte WebGL 2.0
- 4GB RAM
- GPU integrada (Intel HD 4000+)

**Recomendados**
- Chrome/Firefox/Edge actualizado
- 8GB RAM
- GPU dedicada

---

# 10. Cronograma de Desarrollo

## 10.1 Fases del Proyecto
| Fase | Duración | Entregables |
|---|---|---|
| Pre-producción | Semana 1 | GDD, Kanban, repo configurado |
| Prototipo | Semana 2 | Core loop jugable (1 torre, 1 enemigo) |
| Alpha | Semana 3 | Mecánicas completas, 1 nivel completo |
| Beta | Semana 4 | Todos los niveles, UI completa, audio |
| Release | Semana 5 | Testing, bugfixes, deploy |

## 10.2 División de Trabajo (Propuesta)
| Integrante | Enfoque |
|---|---|
| Dorian Tituaña | Sistema de torres, targeting, UI/HUD |
| Alexander Vera | Sistema de enemigos, pathfinding, oleadas, economía, niveles |

---

# 11. Guía de Lectura Recomendada
**Para programadores**
- Mecánicas de juego (torres, enemigos, oleadas)
- Especificaciones técnicas (arquitectura y carpetas)
- UI (HUD y estados)

**Para diseñadores**
- Concepto del juego y narrativa
- Diseño de niveles
- Arte/estilo visual y paleta

**Para project managers**
- Resumen ejecutivo y alcance
- Cronograma de desarrollo
- Mecánicas + economía (riesgo de balance)

---

# 12. Glosario
- **DPS:** Damage Per Second (daño por segundo)  
- **AOE:** Area of Effect (daño en área)  
- **Spawn:** aparición de enemigos  
- **Pathfinding:** búsqueda de ruta para IA  
- **HUD:** interfaz en pantalla  
- **Core Loop:** bucle principal del juego  

---

# 13. Historial de Cambios
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Dic 2024 | Documento inicial completo |

---
**Fin del documento**
