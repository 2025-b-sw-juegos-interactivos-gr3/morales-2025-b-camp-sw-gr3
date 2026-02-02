import {
    Scene,
    Color3
} from "@babylonjs/core";
import {
    AdvancedDynamicTexture,
    TextBlock,
    Rectangle,
    Control,
    Button,
    StackPanel
} from "@babylonjs/gui";
import { Game } from "../game/Game";
import { GameStateType } from "../game/GameState";

export class HUD {
    private scene: Scene;
    private game: Game;
    private advancedTexture: AdvancedDynamicTexture;
    
    // Elementos UI
    private creditsText: TextBlock;
    private healthText: TextBlock;
    private waveText: TextBlock;
    private messageText: TextBlock;
    private startWaveButton: Button;
    
    // Paneles
    private gameOverPanel: Rectangle | null = null;
    
    constructor(scene: Scene, game: Game) {
        this.scene = scene;
        this.game = game;
        
        // Crear textura UI
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
        
        // Crear elementos
        this.creditsText = this.createCreditsDisplay();
        this.healthText = this.createHealthDisplay();
        this.waveText = this.createWaveDisplay();
        this.messageText = this.createMessageDisplay();
        this.startWaveButton = this.createStartWaveButton();
        this.createTowerSelector();
    }
    
    private createCreditsDisplay(): TextBlock {
        const text = new TextBlock("credits");
        text.text = "💰 Créditos: 300";
        text.color = "#00ffff";
        text.fontSize = 24;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.left = "20px";
        text.top = "20px";
        text.shadowColor = "#000000";
        text.shadowBlur = 4;
        this.advancedTexture.addControl(text);
        return text;
    }
    
    private createHealthDisplay(): TextBlock {
        const text = new TextBlock("health");
        text.text = "❤️ Núcleo: 100/100";
        text.color = "#ffd700";
        text.fontSize = 24;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.left = "20px";
        text.top = "55px";
        text.shadowColor = "#000000";
        text.shadowBlur = 4;
        this.advancedTexture.addControl(text);
        return text;
    }
    
    private createWaveDisplay(): TextBlock {
        const text = new TextBlock("wave");
        text.text = "🌊 Oleada: 0/5";
        text.color = "#ffffff";
        text.fontSize = 24;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.left = "20px";
        text.top = "90px";
        text.shadowColor = "#000000";
        text.shadowBlur = 4;
        this.advancedTexture.addControl(text);
        return text;
    }
    
    private createMessageDisplay(): TextBlock {
        const text = new TextBlock("message");
        text.text = "Presiona ESPACIO para iniciar la oleada";
        text.color = "#00ff00";
        text.fontSize = 20;
        text.fontFamily = "Arial";
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.top = "20px";
        text.shadowColor = "#000000";
        text.shadowBlur = 4;
        this.advancedTexture.addControl(text);
        return text;
    }
    
    private createStartWaveButton(): Button {
        const button = Button.CreateSimpleButton("startWave", "▶ INICIAR OLEADA");
        button.width = "200px";
        button.height = "50px";
        button.color = "white";
        button.background = "#27ae60";
        button.fontSize = 18;
        button.cornerRadius = 10;
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        button.top = "60px";
        
        button.onPointerClickObservable.add(() => {
            const state = this.game.gameState.getState();
            if (state === GameStateType.PREPARING || state === GameStateType.WAVE_COMPLETE) {
                this.game.waveManager.startNextWave();
            }
        });
        
        this.advancedTexture.addControl(button);
        return button;
    }
    
    private createTowerSelector(): void {
        // Panel inferior para selección de torres
        const panel = new Rectangle("towerPanel");
        panel.width = "300px";
        panel.height = "80px";
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.top = "-20px";
        panel.background = "rgba(0,0,0,0.7)";
        panel.cornerRadius = 10;
        panel.thickness = 2;
        panel.color = "#00ffff";
        this.advancedTexture.addControl(panel);
        
        // Stack para los botones de torres
        const stack = new StackPanel("towerStack");
        stack.isVertical = false;
        panel.addControl(stack);
        
        // Botón de torre láser
        const laserBtn = Button.CreateSimpleButton("laserBtn", "🔫 Láser\n$100 [1]");
        laserBtn.width = "90px";
        laserBtn.height = "60px";
        laserBtn.color = "#00ffff";
        laserBtn.background = "#1a1a2e";
        laserBtn.fontSize = 12;
        laserBtn.cornerRadius = 5;
        laserBtn.onPointerClickObservable.add(() => {
            this.game.towerManager.selectTowerType("laser");
        });
        stack.addControl(laserBtn);
        
        // Instrucciones
        const instructions = new TextBlock("instructions");
        instructions.text = "Click en celda\npara construir";
        instructions.color = "#888888";
        instructions.fontSize = 11;
        instructions.width = "100px";
        instructions.textWrapping = true;
        stack.addControl(instructions);
    }
    
    public update(): void {
        // Actualizar créditos
        this.creditsText.text = `💰 Créditos: ${this.game.economySystem.getCredits()}`;
        
        // Actualizar vida del núcleo
        this.healthText.text = `❤️ Núcleo: ${this.game.coreHealth}/${this.game.maxCoreHealth}`;
        
        // Color según vida
        const healthPercent = this.game.coreHealth / this.game.maxCoreHealth;
        if (healthPercent > 0.5) {
            this.healthText.color = "#ffd700";
        } else if (healthPercent > 0.25) {
            this.healthText.color = "#ff9900";
        } else {
            this.healthText.color = "#ff3333";
        }
        
        // Actualizar oleada
        const currentWave = this.game.waveManager.getCurrentWave();
        const totalWaves = this.game.waveManager.getTotalWaves();
        this.waveText.text = `🌊 Oleada: ${currentWave}/${totalWaves}`;
        
        // Actualizar mensaje y botón según estado
        const state = this.game.gameState.getState();
        
        if (state === GameStateType.PREPARING) {
            this.messageText.text = "Presiona ESPACIO para iniciar";
            this.messageText.color = "#00ff00";
            this.startWaveButton.isVisible = true;
        } else if (state === GameStateType.WAVE_ACTIVE) {
            const enemies = this.game.enemyManager.getEnemyCount();
            this.messageText.text = `⚔️ Enemigos restantes: ${enemies}`;
            this.messageText.color = "#ff6600";
            this.startWaveButton.isVisible = false;
        } else if (state === GameStateType.WAVE_COMPLETE) {
            this.messageText.text = "¡Oleada completada! Presiona ESPACIO";
            this.messageText.color = "#00ff00";
            this.startWaveButton.isVisible = true;
        } else {
            this.startWaveButton.isVisible = false;
        }
    }
    
    public showVictoryScreen(): void {
        this.showGameOverScreen("🏆 ¡VICTORIA!", "#27ae60", "Has defendido el núcleo exitosamente");
    }
    
    public showDefeatScreen(): void {
        this.showGameOverScreen("💀 DERROTA", "#e74c3c", "El núcleo ha sido destruido");
    }
    
    private showGameOverScreen(title: string, color: string, subtitle: string): void {
        // Panel oscuro
        this.gameOverPanel = new Rectangle("gameOverPanel");
        this.gameOverPanel.width = "100%";
        this.gameOverPanel.height = "100%";
        this.gameOverPanel.background = "rgba(0,0,0,0.8)";
        this.advancedTexture.addControl(this.gameOverPanel);
        
        // Contenedor central
        const container = new Rectangle("gameOverContainer");
        container.width = "400px";
        container.height = "250px";
        container.background = "#1a1a2e";
        container.cornerRadius = 20;
        container.thickness = 3;
        container.color = color;
        this.gameOverPanel.addControl(container);
        
        // Título
        const titleText = new TextBlock("gameOverTitle", title);
        titleText.fontSize = 48;
        titleText.color = color;
        titleText.top = "-60px";
        container.addControl(titleText);
        
        // Subtítulo
        const subText = new TextBlock("gameOverSub", subtitle);
        subText.fontSize = 20;
        subText.color = "#ffffff";
        subText.top = "0px";
        container.addControl(subText);
        
        // Estadísticas
        const stats = new TextBlock("gameOverStats");
        stats.text = `Oleada alcanzada: ${this.game.waveManager.getCurrentWave()}/${this.game.waveManager.getTotalWaves()}`;
        stats.fontSize = 16;
        stats.color = "#888888";
        stats.top = "40px";
        container.addControl(stats);
        
        // Botón reiniciar
        const restartBtn = Button.CreateSimpleButton("restartBtn", "🔄 REINICIAR");
        restartBtn.width = "150px";
        restartBtn.height = "45px";
        restartBtn.color = "white";
        restartBtn.background = color;
        restartBtn.fontSize = 18;
        restartBtn.cornerRadius = 10;
        restartBtn.top = "90px";
        restartBtn.onPointerClickObservable.add(() => {
            this.game.restart();
        });
        container.addControl(restartBtn);
    }
}
