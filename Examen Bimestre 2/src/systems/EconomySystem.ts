export class EconomySystem {
    private credits: number;
    
    constructor(initialCredits: number) {
        this.credits = initialCredits;
    }
    
    public getCredits(): number {
        return this.credits;
    }
    
    public canAfford(cost: number): boolean {
        return this.credits >= cost;
    }
    
    public spend(amount: number): boolean {
        if (this.canAfford(amount)) {
            this.credits -= amount;
            console.log(`💸 Gastado: ${amount} | Restante: ${this.credits}`);
            return true;
        }
        console.log(`❌ Créditos insuficientes. Necesitas: ${amount}, Tienes: ${this.credits}`);
        return false;
    }
    
    public earn(amount: number): void {
        this.credits += amount;
        console.log(`💰 Ganado: ${amount} | Total: ${this.credits}`);
    }
    
    public setCredits(amount: number): void {
        this.credits = amount;
    }
}
