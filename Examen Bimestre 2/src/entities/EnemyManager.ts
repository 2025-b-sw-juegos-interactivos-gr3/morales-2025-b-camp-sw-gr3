import {
    Scene,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Mesh
} from "@babylonjs/core";
import { Game } from "../game/Game";
import { ENEMY_CONFIGS, EnemyConfig } from "../config/enemies.config";
import { PathPoint } from "../systems/Grid";

export class Enemy {
    public mesh: Mesh;
    public config: EnemyConfig;
    public health: number;
    public maxHealth: number;
    public isDead: boolean = false;
    
    private scene: Scene;
    private game: Game;
    private path: PathPoint[];
    private currentWaypointIndex: number = 0;
    private healthBar: Mesh | null = null;
    
    constructor(scene: Scene, game: Game, config: EnemyConfig, path: PathPoint[]) {
        this.scene = scene;
        this.game = game;
        this.config = config;
        this.path = path;
        this.health = config.health;
        this.maxHealth = config.health;
        
        this.createMesh();
        this.createHealthBar();
        
        // Posición inicial
        if (path.length > 0) {
            this.mesh.position = new Vector3(path[0].x, 0.3, path[0].z);
        }
    }
    
    private createMesh(): void {
        // Drone Scout: esfera pequeña
        this.mesh = MeshBuilder.CreateSphere(
            `enemy_${Date.now()}`,
            { diameter: 0.4 },
            this.scene
        );
        
        // Material
        const material = new StandardMaterial("enemyMat", this.scene);
        material.diffuseColor = Color3.FromHexString(this.config.color);
        material.emissiveColor = Color3.FromHexString(this.config.color).scale(0.4);
        this.mesh.material = material;
    }
    
    private createHealthBar(): void {
        // Fondo de la barra de vida
        const bgBar = MeshBuilder.CreateBox(
            "healthBg",
            { width: 0.5, height: 0.08, depth: 0.05 },
            this.scene
        );
        bgBar.position.y = 0.5;
        bgBar.parent = this.mesh;
        
        const bgMat = new StandardMaterial("healthBgMat", this.scene);
        bgMat.diffuseColor = new Color3(0.2, 0.2, 0.2);
        bgBar.material = bgMat;
        
        // Barra de vida (verde)
        this.healthBar = MeshBuilder.CreateBox(
            "healthBar",
            { width: 0.48, height: 0.06, depth: 0.06 },
            this.scene
        );
        this.healthBar.position.y = 0.5;
        this.healthBar.position.z = -0.01;
        this.healthBar.parent = this.mesh;
        
        const healthMat = new StandardMaterial("healthMat", this.scene);
        healthMat.diffuseColor = new Color3(0, 1, 0);
        healthMat.emissiveColor = new Color3(0, 0.3, 0);
        this.healthBar.material = healthMat;
    }
    
    private updateHealthBar(): void {
        if (!this.healthBar) return;
        
        const healthPercent = this.health / this.maxHealth;
        this.healthBar.scaling.x = healthPercent;
        this.healthBar.position.x = -(1 - healthPercent) * 0.24;
        
        // Cambiar color según vida
        const mat = this.healthBar.material as StandardMaterial;
        if (healthPercent > 0.5) {
            mat.diffuseColor = new Color3(0, 1, 0);
        } else if (healthPercent > 0.25) {
            mat.diffuseColor = new Color3(1, 1, 0);
        } else {
            mat.diffuseColor = new Color3(1, 0, 0);
        }
    }
    
    public update(deltaTime: number): void {
        if (this.isDead) return;
        
        // Movimiento hacia el siguiente waypoint
        this.moveTowardsWaypoint(deltaTime);
    }
    
    private moveTowardsWaypoint(deltaTime: number): void {
        if (this.currentWaypointIndex >= this.path.length) {
            // Llegó al final - daña el núcleo
            this.reachCore();
            return;
        }
        
        const targetWaypoint = this.path[this.currentWaypointIndex];
        const target = new Vector3(targetWaypoint.x, 0.3, targetWaypoint.z);
        
        const direction = target.subtract(this.mesh.position);
        const distance = direction.length();
        
        if (distance < 0.1) {
            // Llegó al waypoint, ir al siguiente
            this.currentWaypointIndex++;
        } else {
            // Moverse hacia el waypoint
            direction.normalize();
            const moveDistance = this.config.speed * deltaTime;
            this.mesh.position.addInPlace(direction.scale(Math.min(moveDistance, distance)));
        }
    }
    
    private reachCore(): void {
        // Dañar el núcleo
        this.game.damageCore(10);
        
        // Morir sin dar recompensa
        this.die(false);
    }
    
    public takeDamage(damage: number): void {
        if (this.isDead) return;
        
        this.health -= damage;
        this.updateHealthBar();
        
        if (this.health <= 0) {
            this.die(true);
        }
    }
    
    private die(giveReward: boolean): void {
        this.isDead = true;
        
        if (giveReward) {
            this.game.economySystem.earn(this.config.reward);
        }
        
        // Efecto de muerte simple (escalar hacia abajo)
        const interval = setInterval(() => {
            this.mesh.scaling.scaleInPlace(0.85);
            if (this.mesh.scaling.x < 0.1) {
                clearInterval(interval);
                this.dispose();
            }
        }, 30);
    }
    
    public dispose(): void {
        this.mesh.dispose();
    }
}

export class EnemyManager {
    private scene: Scene;
    private game: Game;
    private enemies: Enemy[] = [];
    
    constructor(scene: Scene, game: Game) {
        this.scene = scene;
        this.game = game;
    }
    
    public spawnEnemy(type: string): void {
        const config = ENEMY_CONFIGS[type];
        if (!config) {
            console.error(`Tipo de enemigo desconocido: ${type}`);
            return;
        }
        
        const path = this.game.grid.getPath();
        const enemy = new Enemy(this.scene, this.game, config, path);
        this.enemies.push(enemy);
    }
    
    public update(deltaTime: number): void {
        // Actualizar enemigos
        for (const enemy of this.enemies) {
            enemy.update(deltaTime);
        }
        
        // Limpiar enemigos muertos
        this.enemies = this.enemies.filter(e => !e.isDead);
    }
    
    public getEnemies(): Enemy[] {
        return this.enemies;
    }
    
    public getEnemyCount(): number {
        return this.enemies.filter(e => !e.isDead).length;
    }
}
