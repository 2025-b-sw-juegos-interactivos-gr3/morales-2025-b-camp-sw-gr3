import { PathPoint } from "../systems/Grid";
import { WaveConfig } from "../game/WaveManager";

export interface LevelConfig {
    id: string;
    name: string;
    gridWidth: number;
    gridHeight: number;
    initialCredits: number;
    coreHealth: number;
    path: PathPoint[];
    waves: WaveConfig[];
}

// Camino en forma de S para el Nivel 1
const LEVEL_1_PATH: PathPoint[] = [
    // Entrada (izquierda)
    { x: 0, z: 4 },
    { x: 1, z: 4 },
    { x: 2, z: 4 },
    { x: 3, z: 4 },
    { x: 4, z: 4 },
    // Giro hacia arriba
    { x: 4, z: 5 },
    { x: 4, z: 6 },
    { x: 4, z: 7 },
    // Giro hacia derecha
    { x: 5, z: 7 },
    { x: 6, z: 7 },
    { x: 7, z: 7 },
    // Giro hacia abajo
    { x: 7, z: 6 },
    { x: 7, z: 5 },
    { x: 7, z: 4 },
    { x: 7, z: 3 },
    { x: 7, z: 2 },
    // Giro hacia izquierda
    { x: 6, z: 2 },
    { x: 5, z: 2 },
    { x: 4, z: 2 },
    // Giro hacia abajo
    { x: 4, z: 1 },
    { x: 4, z: 0 },
    // Giro hacia derecha hasta el núcleo
    { x: 5, z: 0 },
    { x: 6, z: 0 },
    { x: 7, z: 0 },
    { x: 8, z: 0 },
    { x: 9, z: 0 },
    // Núcleo al final
    { x: 9, z: 1 },
    { x: 9, z: 2 }
];

// Configuración de oleadas para el Nivel 1
const LEVEL_1_WAVES: WaveConfig[] = [
    { enemyType: "drone", count: 5, spawnInterval: 1.5 },
    { enemyType: "drone", count: 8, spawnInterval: 1.2 },
    { enemyType: "drone", count: 10, spawnInterval: 1.0 },
    { enemyType: "drone", count: 12, spawnInterval: 0.9 },
    { enemyType: "drone", count: 15, spawnInterval: 0.8 }
];

export const LEVEL_1: LevelConfig = {
    id: "level1",
    name: "Estación de Entrada",
    gridWidth: 10,
    gridHeight: 10,
    initialCredits: 300,
    coreHealth: 100,
    path: LEVEL_1_PATH,
    waves: LEVEL_1_WAVES
};
