import { GameManager } from "./js/game/GameManager.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const game = new GameManager(engine, canvas);
await game.init();
game.start();

window.addEventListener("resize", () => engine.resize());
