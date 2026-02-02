export interface EnemyConfig {
    id: string;
    name: string;
    health: number;
    speed: number;
    reward: number;
    color: string;
    description: string;
}

export const ENEMY_CONFIGS: { [key: string]: EnemyConfig } = {
    drone: {
        id: "drone",
        name: "Drone Scout",
        health: 30,
        speed: 2,
        reward: 10,
        color: "#ff0055",
        description: "Unidad básica, rápida pero frágil"
    },
    heavy: {
        id: "heavy",
        name: "Heavy Walker",
        health: 150,
        speed: 0.8,
        reward: 25,
        color: "#aa0033",
        description: "Tanque blindado, lento pero resistente"
    },
    stealth: {
        id: "stealth",
        name: "Stealth Unit",
        health: 50,
        speed: 1.5,
        reward: 30,
        color: "#ff00ff",
        description: "Se vuelve invisible temporalmente"
    },
    boss: {
        id: "boss",
        name: "Boss Titan",
        health: 500,
        speed: 0.5,
        reward: 100,
        color: "#ff0000",
        description: "Jefe de oleada, muy resistente"
    }
};
