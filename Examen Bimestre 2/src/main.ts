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

// Ocultar pantalla de carga cuando la escena esté lista (lo registramos
// antes de instanciar el juego para asegurarnos de que se ejecute aunque
// la construcción del juego falle)
scene.executeWhenReady(() => {
    if (loadingDiv) loadingDiv.style.display = "none";
});

// Inicializar el juego con manejo de errores para capturar excepciones
// que podrían evitar que se oculte la pantalla de carga.
let game: any;
try {
    game = new Game(scene, canvas);
} catch (err) {
    console.error("Error al inicializar el juego:", err);
    if (loadingDiv) {
        // Mostrar mensaje de error en la pantalla de carga para el usuario
        loadingDiv.innerHTML = `<p style=\"color:#ff6666;\">Error al cargar el juego. Revisa la consola.</p>`;
    }
}

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
