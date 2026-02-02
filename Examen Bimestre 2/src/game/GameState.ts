export enum GameStateType {
    MENU = "MENU",
    PREPARING = "PREPARING",
    WAVE_ACTIVE = "WAVE_ACTIVE",
    WAVE_COMPLETE = "WAVE_COMPLETE",
    VICTORY = "VICTORY",
    DEFEAT = "DEFEAT",
    PAUSED = "PAUSED"
}

export class GameState {
    private currentState: GameStateType = GameStateType.MENU;
    
    public setState(state: GameStateType): void {
        console.log(`🔄 Estado: ${this.currentState} → ${state}`);
        this.currentState = state;
    }
    
    public getState(): GameStateType {
        return this.currentState;
    }
    
    public isPlaying(): boolean {
        return this.currentState === GameStateType.WAVE_ACTIVE || 
               this.currentState === GameStateType.PREPARING ||
               this.currentState === GameStateType.WAVE_COMPLETE;
    }
}
