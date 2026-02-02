import {
    Scene,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Mesh
} from "@babylonjs/core";

export enum CellType {
    BUILDABLE = "BUILDABLE",
    PATH = "PATH",
    BLOCKED = "BLOCKED",
    OCCUPIED = "OCCUPIED"
}

export interface PathPoint {
    x: number;
    z: number;
}

export class Cell {
    public x: number;
    public z: number;
    public type: CellType;
    public mesh: Mesh;
    
    constructor(x: number, z: number, type: CellType, mesh: Mesh) {
        this.x = x;
        this.z = z;
        this.type = type;
        this.mesh = mesh;
    }
}

export class Grid {
    private scene: Scene;
    private width: number;
    private height: number;
    private cells: Cell[][] = [];
    private path: PathPoint[];
    
    // Materiales
    private buildableMaterial: StandardMaterial;
    private pathMaterial: StandardMaterial;
    private occupiedMaterial: StandardMaterial;
    
    constructor(scene: Scene, width: number, height: number, path: PathPoint[]) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.path = path;
        
        this.createMaterials();
        this.createGrid();
    }
    
    private createMaterials(): void {
        // Material para celdas construibles
        this.buildableMaterial = new StandardMaterial("buildableMat", this.scene);
        this.buildableMaterial.diffuseColor = new Color3(0.15, 0.15, 0.25);
        this.buildableMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        
        // Material para el camino
        this.pathMaterial = new StandardMaterial("pathMat", this.scene);
        this.pathMaterial.diffuseColor = new Color3(0.24, 0.24, 0.36); // #3d3d5c
        this.pathMaterial.specularColor = new Color3(0.2, 0.2, 0.2);
        
        // Material para celdas ocupadas
        this.occupiedMaterial = new StandardMaterial("occupiedMat", this.scene);
        this.occupiedMaterial.diffuseColor = new Color3(0.1, 0.3, 0.3);
        this.occupiedMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
    }
    
    private createGrid(): void {
        // Crear array de celdas
        for (let x = 0; x < this.width; x++) {
            this.cells[x] = [];
            for (let z = 0; z < this.height; z++) {
                const isPath = this.isPathCell(x, z);
                const type = isPath ? CellType.PATH : CellType.BUILDABLE;
                
                // Crear mesh de la celda
                const cell = MeshBuilder.CreateBox(
                    `cell_${x}_${z}`,
                    { width: 0.95, height: 0.1, depth: 0.95 },
                    this.scene
                );
                cell.position = new Vector3(x, 0, z);
                cell.material = isPath ? this.pathMaterial : this.buildableMaterial;
                
                this.cells[x][z] = new Cell(x, z, type, cell);
            }
        }
    }
    
    private isPathCell(x: number, z: number): boolean {
        return this.path.some(point => point.x === x && point.z === z);
    }
    
    public getCell(x: number, z: number): Cell | null {
        if (x < 0 || x >= this.width || z < 0 || z >= this.height) {
            return null;
        }
        return this.cells[x][z];
    }
    
    public canBuild(x: number, z: number): boolean {
        const cell = this.getCell(x, z);
        return cell !== null && cell.type === CellType.BUILDABLE;
    }
    
    public occupyCell(x: number, z: number): void {
        const cell = this.getCell(x, z);
        if (cell && cell.type === CellType.BUILDABLE) {
            cell.type = CellType.OCCUPIED;
            cell.mesh.material = this.occupiedMaterial;
        }
    }
    
    public getPath(): PathPoint[] {
        return this.path;
    }
    
    public getWorldPosition(x: number, z: number): Vector3 {
        return new Vector3(x, 0, z);
    }
}
