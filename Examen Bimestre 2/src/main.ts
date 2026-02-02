import { Engine, Scene } from "@babylonjs/core";
import { Game } from "./game/Game";

// Obtener el canvas
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const loadingDiv = document.getElementById("loading") as HTMLDivElement;

// Crear el motor de Babylon.js
const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
});

// Crear la escena
const scene = new Scene(engine);

// Inicializar el juego
const game = new Game(scene, canvas);

// Ocultar pantalla de carga cuando esté listo
scene.executeWhenReady(() => {
    loadingDiv.style.display = "none";
});

// Game loop principal
engine.runRenderLoop(() => {
    game.update();
    scene.render();
});

// Manejar redimensionamiento de ventana
window.addEventListener("resize", () => {
    engine.resize();
});

// Exportar para debugging
(window as any).game = game;
(window as any).scene = scene;
