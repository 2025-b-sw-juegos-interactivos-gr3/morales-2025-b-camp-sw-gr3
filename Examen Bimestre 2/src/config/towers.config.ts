export interface TowerConfig {
    id: string;
    name: string;
    cost: number;
    damage: number;
    range: number;
    fireRate: number; // disparos por segundo
    color: string;
    description: string;
}

export const TOWER_CONFIGS: { [key: string]: TowerConfig } = {
    laser: {
        id: "laser",
        name: "Láser Básico",
        cost: 100,
        damage: 10,
        range: 3,
        fireRate: 2,
        color: "#00ffff",
        description: "Torre básica con disparo rápido"
    },
    plasma: {
        id: "plasma",
        name: "Cañón de Plasma",
        cost: 200,
        damage: 35,
        range: 2,
        fireRate: 0.8,
        color: "#ff6600",
        description: "Daño alto en área pequeña"
    },
    tesla: {
        id: "tesla",
        name: "Torre Tesla",
        cost: 250,
        damage: 15,
        range: 3,
        fireRate: 1.5,
        color: "#9933ff",
        description: "Cadena de daño a múltiples enemigos"
    },
    missile: {
        id: "missile",
        name: "Misiles Guiados",
        cost: 300,
        damage: 50,
        range: 5,
        fireRate: 0.5,
        color: "#ff3333",
        description: "Largo alcance, persigue objetivos"
    },
    slow: {
        id: "slow",
        name: "Ralentizador",
        cost: 150,
        damage: 0,
        range: 2.5,
        fireRate: 4,
        color: "#33ccff",
        description: "Reduce velocidad de enemigos 40%"
    }
};
