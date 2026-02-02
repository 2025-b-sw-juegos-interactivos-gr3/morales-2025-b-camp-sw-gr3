# 🗼 Tower Defense

Juego de Tower Defense 3D con temática Sci-Fi desarrollado con Babylon.js.

## 📋 Descripción

Tower Defense es un juego de estrategia en tiempo real donde el jugador debe defender un núcleo de energía de oleadas de enemigos alienígenas mediante la construcción estratégica de torres defensivas.

## 👥 Equipo

- **Carlos Morales**

## 🛠️ Tecnologías

- **Motor 3D:** Babylon.js 6.x
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Gestión:** GitHub Projects

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Entrar al directorio
cd tower-defense

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🎮 Controles

| Tecla/Acción | Función |
|--------------|---------|
| Click Izquierdo | Colocar torre |
| Tecla 1 | Seleccionar Torre Láser |
| Espacio | Iniciar oleada |
| Escape | Cancelar selección |
| WASD / Flechas | Mover cámara |
| Rueda del Mouse | Zoom |

## 📁 Estructura del Proyecto

```
tower-defense/
├── src/
│   ├── main.ts              # Punto de entrada
│   ├── game/
│   │   ├── Game.ts          # Clase principal
│   │   ├── GameState.ts     # Estados del juego
│   │   └── WaveManager.ts   # Sistema de oleadas
│   ├── entities/
│   │   ├── TowerManager.ts  # Torres y su gestión
│   │   └── EnemyManager.ts  # Enemigos y su gestión
│   ├── systems/
│   │   ├── Grid.ts          # Sistema de grid/mapa
│   │   └── EconomySystem.ts # Sistema de créditos
│   ├── ui/
│   │   └── HUD.ts           # Interfaz de usuario
│   ├── levels/
│   │   └── Level1.ts        # Configuración nivel 1
│   └── config/
│       ├── towers.config.ts  # Stats de torres
│       └── enemies.config.ts # Stats de enemigos
├── public/
│   └── assets/
├── index.html
├── package.json
└── tsconfig.json
```

## 🎯 Características

- ✅ Grid 10x10 con camino en forma de S
- ✅ Torre Láser Básico con targeting automático
- ✅ Enemigo Drone Scout con pathfinding
- ✅ Sistema de 5 oleadas progresivas
- ✅ Sistema de créditos (ganar/gastar)
- ✅ HUD con información del juego
- ✅ Pantallas de victoria/derrota

## 📊 Kanban

- **GDD (TAR-):** [URL del Kanban TAR]
- **Implementación (IM-):** [URL del Kanban IM]

## 📄 Documentación

- Game Design Document (GDD)
- Documento de Entrega
- Tareas del Kanban

## 📝 Licencia

MIT License - Proyecto académico EPN
