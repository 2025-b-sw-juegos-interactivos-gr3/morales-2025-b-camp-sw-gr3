import { Game } from "./Game";
import { GameStateType } from "./GameState";

export interface WaveConfig {
    enemyType: string;
    count: number;
    spawnInterval: number; // segundos entre spawns
}

export class WaveManager {
    private game: Game;
    private waves: WaveConfig[];
    private currentWave: number = 0;
    private enemiesSpawned: number = 0;
    private spawnTimer: number = 0;
    private waveInProgress: boolean = false;
    
    constructor(game: Game, waves: WaveConfig[]) {
        this.game = game;
        this.waves = waves;
    }
    
    public startNextWave(): void {
        if (this.currentWave >= this.waves.length) {
            return;
        }
        
        this.currentWave++;
        this.enemiesSpawned = 0;
        this.spawnTimer = 0;
        this.waveInProgress = true;
        
        this.game.gameState.setState(GameStateType.WAVE_ACTIVE);
        console.log(`🌊 Oleada ${this.currentWave} iniciada!`);
    }
    
    public update(deltaTime: number): void {
        if (!this.waveInProgress) return;
        
        const wave = this.waves[this.currentWave - 1];
        if (!wave) return;
        
        // Spawn de enemigos
        if (this.enemiesSpawned < wave.count) {
            this.spawnTimer += deltaTime;
            
            if (this.spawnTimer >= wave.spawnInterval) {
                this.spawnTimer = 0;
                this.spawnEnemy(wave.enemyType);
                this.enemiesSpawned++;
            }
        } else {
            // Todos los enemigos han sido spawneados
            this.waveInProgress = false;
        }
    }
    
    private spawnEnemy(type: string): void {
        this.game.enemyManager.spawnEnemy(type);
    }
    
    public isWaveComplete(): boolean {
        return !this.waveInProgress;
    }
    
    public hasMoreWaves(): boolean {
        return this.currentWave < this.waves.length;
    }
    
    public getCurrentWave(): number {
        return this.currentWave;
    }
    
    public getTotalWaves(): number {
        return this.waves.length;
    }
}
