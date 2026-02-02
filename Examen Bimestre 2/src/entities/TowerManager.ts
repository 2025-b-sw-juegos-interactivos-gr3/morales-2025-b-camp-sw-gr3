import {
    Scene,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Mesh,
    Texture
} from "@babylonjs/core";
import { Game } from "../game/Game";
import { TOWER_CONFIGS, TowerConfig } from "../config/towers.config";
import { Enemy } from "./EnemyManager";

export class Tower {
    public mesh: Mesh;
    public config: TowerConfig;
    public gridX: number;
    public gridZ: number;
    
    private scene: Scene;
    private fireCooldown: number = 0;
    private target: Enemy | null = null;
    private game: Game;
    
    constructor(scene: Scene, game: Game, config: TowerConfig, x: number, z: number) {
        this.scene = scene;
        this.game = game;
        this.config = config;
        this.gridX = x;
        this.gridZ = z;
        
        this.createMesh();
    }
    
    private createMesh(): void {
        // Base de la torre
        const base = MeshBuilder.CreateCylinder(
            `tower_base_${this.gridX}_${this.gridZ}`,
            { height: 0.3, diameter: 0.6 },
            this.scene
        );
        
        // Cañón de la torre
        const barrel = MeshBuilder.CreateCylinder(
            `tower_barrel_${this.gridX}_${this.gridZ}`,
            { height: 0.5, diameter: 0.2 },
            this.scene
        );
        barrel.position.y = 0.4;
        
        // Esfera en la punta
        const tip = MeshBuilder.CreateSphere(
            `tower_tip_${this.gridX}_${this.gridZ}`,
            { diameter: 0.25 },
            this.scene
        );
        tip.position.y = 0.7;
        
        // Combinar en un mesh padre
        this.mesh = new Mesh(`tower_${this.gridX}_${this.gridZ}`, this.scene);
        base.parent = this.mesh;
        barrel.parent = this.mesh;
        tip.parent = this.mesh;
        
        // Material (usar textura si existe, fallback a color)
        const material = new StandardMaterial(`towerMat_${this.gridX}_${this.gridZ}`, this.scene);
        try {
            const texPath = `/assets/textures/tower_${this.config.id}.png`;
            material.diffuseTexture = new Texture(texPath, this.scene);
        } catch (e) {
            material.diffuseColor = Color3.FromHexString(this.config.color);
        }
        material.emissiveColor = Color3.FromHexString(this.config.color).scale(0.3);
        material.specularColor = new Color3(0.5, 0.5, 0.5);

        base.material = material;
        barrel.material = material;
        tip.material = material;
        
        // Posición
        this.mesh.position = new Vector3(this.gridX, 0.15, this.gridZ);
    }
    
    public update(deltaTime: number, enemies: Enemy[]): void {
        // Cooldown
        if (this.fireCooldown > 0) {
            this.fireCooldown -= deltaTime;
        }
        
        // Buscar objetivo
        this.findTarget(enemies);
        
        // Disparar si hay objetivo
        if (this.target && this.fireCooldown <= 0) {
            this.fire();
        }
    }
    
    private findTarget(enemies: Enemy[]): void {
        // Limpiar objetivo si ya no es válido
        if (this.target && (this.target.isDead || !this.isInRange(this.target))) {
            this.target = null;
        }
        
        // Buscar nuevo objetivo
        if (!this.target) {
            let closestEnemy: Enemy | null = null;
            let closestDistance = Infinity;
            
            for (const enemy of enemies) {
                if (enemy.isDead) continue;
                
                const distance = this.getDistanceTo(enemy);
                if (distance <= this.config.range && distance < closestDistance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
            
            this.target = closestEnemy;
        }
    }
    
    private isInRange(enemy: Enemy): boolean {
        return this.getDistanceTo(enemy) <= this.config.range;
    }
    
    private getDistanceTo(enemy: Enemy): number {
        const dx = enemy.mesh.position.x - this.mesh.position.x;
        const dz = enemy.mesh.position.z - this.mesh.position.z;
        return Math.sqrt(dx * dx + dz * dz);
    }
    
    private fire(): void {
        if (!this.target) return;
        
        // Resetear cooldown
        this.fireCooldown = 1 / this.config.fireRate;
        
        // Crear efecto láser
        this.createLaserEffect(this.target);
        
        // Aplicar daño
        this.target.takeDamage(this.config.damage);
    }
    
    private createLaserEffect(target: Enemy): void {
        const start = this.mesh.position.clone();
        start.y = 0.7;
        const end = target.mesh.position.clone();
        end.y = 0.3;
        
        // Crear línea láser
        const laser = MeshBuilder.CreateTube(
            "laser",
            {
                path: [start, end],
                radius: 0.03,
                updatable: false
            },
            this.scene
        );
        
        // Material del láser
        const laserMat = new StandardMaterial("laserMat", this.scene);
        laserMat.emissiveColor = Color3.FromHexString(this.config.color);
        laserMat.disableLighting = true;
        laser.material = laserMat;
        
        // Eliminar después de un corto tiempo
        setTimeout(() => {
            laser.dispose();
        }, 100);
    }
    
    public dispose(): void {
        this.mesh.dispose();
    }
}

export class TowerManager {
    private scene: Scene;
    private game: Game;
    private towers: Tower[] = [];
    private selectedTowerType: string = "laser";
    
    constructor(scene: Scene, game: Game) {
        this.scene = scene;
        this.game = game;
    }
    
    public selectTowerType(type: string): void {
        if (TOWER_CONFIGS[type]) {
            this.selectedTowerType = type;
            console.log(`🗼 Torre seleccionada: ${TOWER_CONFIGS[type].name}`);
        }
    }
    
    public deselectTower(): void {
        this.selectedTowerType = "";
        console.log("🗼 Selección cancelada");
    }
    
    public getSelectedTowerType(): string {
        return this.selectedTowerType;
    }
    
    public getSelectedTowerConfig(): TowerConfig | null {
        return TOWER_CONFIGS[this.selectedTowerType] || null;
    }
    
    public tryPlaceTower(x: number, z: number): boolean {
        // Verificar que hay una torre seleccionada
        if (!this.selectedTowerType) {
            console.log("❌ Selecciona una torre primero (tecla 1)");
            return false;
        }
        
        const config = TOWER_CONFIGS[this.selectedTowerType];
        if (!config) return false;
        
        // Verificar si se puede construir en esa celda
        if (!this.game.grid.canBuild(x, z)) {
            console.log("❌ No se puede construir aquí");
            return false;
        }
        
        // Verificar créditos
        if (!this.game.economySystem.canAfford(config.cost)) {
            console.log(`❌ Créditos insuficientes. Costo: ${config.cost}`);
            return false;
        }
        
        // Gastar créditos
        this.game.economySystem.spend(config.cost);
        
        // Ocupar celda
        this.game.grid.occupyCell(x, z);
        
        // Crear torre
        const tower = new Tower(this.scene, this.game, config, x, z);
        this.towers.push(tower);
        
        console.log(`✅ Torre ${config.name} construida en (${x}, ${z})`);
        return true;
    }
    
    public update(deltaTime: number): void {
        const enemies = this.game.enemyManager.getEnemies();
        
        for (const tower of this.towers) {
            tower.update(deltaTime, enemies);
        }
    }
    
    public getTowers(): Tower[] {
        return this.towers;
    }
}
