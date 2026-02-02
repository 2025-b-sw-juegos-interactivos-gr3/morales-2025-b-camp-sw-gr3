import {
    Scene,
    Vector3,
    HemisphericLight,
    ArcRotateCamera,
    Color3,
    Color4,
    MeshBuilder,
    StandardMaterial
} from "@babylonjs/core";
import { GameState, GameStateType } from "./GameState";
import { Grid } from "../systems/Grid";
import { WaveManager } from "./WaveManager";
import { EconomySystem } from "../systems/EconomySystem";
import { TowerManager } from "../entities/TowerManager";
import { EnemyManager } from "../entities/EnemyManager";
import { HUD } from "../ui/HUD";
import { LEVEL_1 } from "../levels/Level1";

export class Game {
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    
    // Sistemas
    public gameState: GameState;
    public grid: Grid;
    public waveManager: WaveManager;
    public economySystem: EconomySystem;
    public towerManager: TowerManager;
    public enemyManager: EnemyManager;
    public hud: HUD;
    
    // Núcleo
    public coreHealth: number = 100;
    public maxCoreHealth: number = 100;
    
    constructor(scene: Scene, canvas: HTMLCanvasElement) {
        this.scene = scene;
        this.canvas = canvas;
        
        // Configurar escena
        this.setupScene();
        
        // Inicializar sistemas
        this.gameState = new GameState();
        this.economySystem = new EconomySystem(LEVEL_1.initialCredits);
        this.grid = new Grid(scene, LEVEL_1.gridWidth, LEVEL_1.gridHeight, LEVEL_1.path);
        this.enemyManager = new EnemyManager(scene, this);
        this.towerManager = new TowerManager(scene, this);
        this.waveManager = new WaveManager(this, LEVEL_1.waves);
        this.hud = new HUD(scene, this);
        
        // Crear núcleo
        this.createCore();
        
        // Configurar controles
        this.setupControls();
        
        // Estado inicial
        this.gameState.setState(GameStateType.PREPARING);
        
        console.log("🎮 Tower Defense iniciado!");
        console.log(`💰 Créditos iniciales: ${this.economySystem.getCredits()}`);
    }
    
    private setupScene(): void {
        // Color de fondo
        this.scene.clearColor = new Color4(0.04, 0.04, 0.1, 1); // #0a0a1a
        
        // Cámara
        const camera = new ArcRotateCamera(
            "camera",
            -Math.PI / 2,  // alpha - rotación horizontal
            Math.PI / 3,   // beta - ángulo desde arriba
            15,            // radius - distancia
            new Vector3(5, 0, 5), // target - centro del grid
            this.scene
        );
        camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = 8;
        camera.upperRadiusLimit = 25;
        camera.lowerBetaLimit = 0.3;
        camera.upperBetaLimit = Math.PI / 2.2;
        
        // Iluminación
        const light = new HemisphericLight(
            "mainLight",
            new Vector3(0, 1, 0),
            this.scene
        );
        light.intensity = 0.8;
        light.diffuse = new Color3(1, 1, 1);
        light.groundColor = new Color3(0.2, 0.2, 0.3);
    }
    
    private createCore(): void {
        // Crear el núcleo de energía (esfera dorada)
        const core = MeshBuilder.CreateSphere("core", { diameter: 0.8 }, this.scene);
        
        // Posición al final del camino
        const lastWaypoint = LEVEL_1.path[LEVEL_1.path.length - 1];
        core.position = new Vector3(lastWaypoint.x, 0.5, lastWaypoint.z);
        
        // Material dorado o con textura si existe
        const coreMaterial = new StandardMaterial("coreMaterial", this.scene);
        try {
            coreMaterial.diffuseTexture = new Texture("/assets/textures/core.png", this.scene);
        } catch (e) {
            coreMaterial.diffuseColor = new Color3(1, 0.84, 0); // Dorado
        }
        coreMaterial.emissiveColor = new Color3(0.5, 0.42, 0); // Brillo
        coreMaterial.specularColor = new Color3(1, 1, 1);
        coreMaterial.specularPower = 64;
        core.material = coreMaterial;
    }
    
    private setupControls(): void {
        // Click para colocar torres
        this.canvas.addEventListener("pointerdown", (event) => {
            if (event.button === 0) { // Click izquierdo
                this.handleClick(event);
            }
        });
        
        // Teclado
        window.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "Space":
                    this.handleSpaceBar();
                    break;
                case "Digit1":
                    this.towerManager.selectTowerType("laser");
                    break;
                case "Escape":
                    this.towerManager.deselectTower();
                    break;
            }
        });
    }
    
    private handleClick(event: PointerEvent): void {
        const pickResult = this.scene.pick(event.clientX, event.clientY);
        
        if (pickResult?.hit && pickResult.pickedMesh) {
            const meshName = pickResult.pickedMesh.name;
            
            // Si clickeamos en una celda del grid
            if (meshName.startsWith("cell_")) {
                const coords = meshName.replace("cell_", "").split("_");
                const x = parseInt(coords[0]);
                const z = parseInt(coords[1]);
                
                this.towerManager.tryPlaceTower(x, z);
            }
        }
    }
    
    private handleSpaceBar(): void {
        const state = this.gameState.getState();
        
        if (state === GameStateType.PREPARING || state === GameStateType.WAVE_COMPLETE) {
            this.waveManager.startNextWave();
        }
    }
    
    public update(): void {
        const deltaTime = this.scene.getEngine().getDeltaTime() / 1000;
        
        // Actualizar según el estado del juego
        const state = this.gameState.getState();
        
        if (state === GameStateType.WAVE_ACTIVE) {
            // Actualizar oleada
            this.waveManager.update(deltaTime);
            
            // Actualizar enemigos
            this.enemyManager.update(deltaTime);
            
            // Actualizar torres (targeting y disparo)
            this.towerManager.update(deltaTime);
            
            // Verificar si la oleada terminó
            if (this.waveManager.isWaveComplete() && this.enemyManager.getEnemyCount() === 0) {
                if (this.waveManager.hasMoreWaves()) {
                    this.gameState.setState(GameStateType.WAVE_COMPLETE);
                    console.log("🎉 Oleada completada! Presiona ESPACIO para continuar.");
                } else {
                    this.victory();
                }
            }
        }
        
        // Actualizar HUD
        this.hud.update();
    }
    
    public damageCore(damage: number): void {
        this.coreHealth -= damage;
        console.log(`💔 Núcleo dañado! Vida: ${this.coreHealth}/${this.maxCoreHealth}`);
        
        if (this.coreHealth <= 0) {
            this.coreHealth = 0;
            this.defeat();
        }
    }
    
    public victory(): void {
        this.gameState.setState(GameStateType.VICTORY);
        console.log("🏆 ¡VICTORIA! Has defendido el núcleo.");
        this.hud.showVictoryScreen();
    }
    
    public defeat(): void {
        this.gameState.setState(GameStateType.DEFEAT);
        console.log("💀 DERROTA. El núcleo ha sido destruido.");
        this.hud.showDefeatScreen();
    }
    
    public restart(): void {
        // Reiniciar el juego
        window.location.reload();
    }
}
