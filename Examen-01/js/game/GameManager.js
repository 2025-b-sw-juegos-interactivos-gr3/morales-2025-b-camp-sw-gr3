import { GameScene } from "./Scene.js";
import { InputManager } from "./InputManager.js";
import { Player } from "./Player.js";
import { GameObjects } from "./GameObjects.js";

export class GameManager {
  constructor(engine, canvas) {
    this.engine = engine;
    this.canvas = canvas;

    this.sceneWrapper = null;
    this.scene = null;

    this.input = null;
    this.player = null;
    this.objects = null;

    this.actionKey = "e";
    this.distAction = 2.6;

    this.ui = null;
    this.uiStateText = null;
    this.uiScoreText = null;
    this.uiToast = null;

    this.hasItem = false;
    this.score = 0;

    this._camTarget = null;
  }

  async init() {
    // Scene
    this.sceneWrapper = new GameScene(this.engine, this.canvas);
    this.scene = this.sceneWrapper.create();

    // Input
    this.input = new InputManager(this.scene);
    this.input.init();

    // Player (✅ PASAMOS CÁMARA)
    this.player = new Player(this.scene, this.sceneWrapper.camera);
    await this.player.create();

    // Objects
    this.objects = new GameObjects(this.scene);
    await this.objects.create();

    // UI
    this.#initUI();

    // Pickup/Drop logic
    this.#initPickupDropLogic();

    // Loop
    this.scene.onBeforeRenderObservable.add(() => {
      this.player.update(this.input);
      this.#updateCameraFollow();
    });
  }

  start() {
    this.engine.runRenderLoop(() => this.scene.render());
  }

  #initUI() {
    this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

    const help = new BABYLON.GUI.TextBlock();
    help.text =
      "Tema: ALQUIMISTA | WASD: mover | E: recoger/entregar\n" +
      "Objetivo: recoge ingredientes del bosque y entrégalos al caldero.\n" +
      "(Click en el canvas para activar cámara libre)";
    help.color = "white";
    help.fontSize = 18;
    help.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    help.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    help.paddingTop = "12px";
    help.paddingLeft = "12px";
    this.ui.addControl(help);

    this.uiStateText = new BABYLON.GUI.TextBlock();
    this.uiStateText.text = "Estado: SIN ingrediente";
    this.uiStateText.color = "white";
    this.uiStateText.fontSize = 20;
    this.uiStateText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.uiStateText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.uiStateText.paddingTop = "70px";
    this.uiStateText.paddingLeft = "12px";
    this.ui.addControl(this.uiStateText);

    this.uiScoreText = new BABYLON.GUI.TextBlock();
    this.uiScoreText.text = "Entregas: 0";
    this.uiScoreText.color = "white";
    this.uiScoreText.fontSize = 20;
    this.uiScoreText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.uiScoreText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.uiScoreText.paddingTop = "100px";
    this.uiScoreText.paddingLeft = "12px";
    this.ui.addControl(this.uiScoreText);

    this.uiToast = new BABYLON.GUI.TextBlock();
    this.uiToast.text = "";
    this.uiToast.color = "yellow";
    this.uiToast.fontSize = 20;
    this.uiToast.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.uiToast.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.uiToast.paddingBottom = "18px";
    this.ui.addControl(this.uiToast);
  }

  #toast(msg) {
    this.uiToast.text = msg;
    setTimeout(() => (this.uiToast.text = ""), 900);
  }

  #initPickupDropLogic() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type !== BABYLON.KeyboardEventTypes.KEYDOWN) return;

      const key = kbInfo.event.key.toLowerCase();
      if (key !== this.actionKey) return;

      // ===== RECOGER =====
      if (!this.hasItem) {
        const dist = BABYLON.Vector3.Distance(
          this.player.mesh.position,
          this.objects.item.position
        );

        if (dist < this.distAction) {
          this.objects.item.parent = this.player.mesh;
          this.objects.item.position = new BABYLON.Vector3(0.6, 0.9, 0.3);
          this.objects.item.rotation = BABYLON.Vector3.Zero();

          this.hasItem = true;
          this.player.hasItem = true;
          this.uiStateText.text = "Estado: CON ingrediente";
          this.#toast("✅ Ingrediente recogido");
        } else {
          this.#toast("⚠️ Acércate al ingrediente para recoger");
        }
        return;
      }

      // ===== ENTREGAR =====
      const distDrop = BABYLON.Vector3.Distance(
        this.player.mesh.position,
        this.objects.dropZone.position
      );

      if (distDrop < this.distAction) {
        // dejar en caldero
        this.objects.item.parent = null;
        this.objects.item.position = this.objects.dropZone.position.clone();
        this.objects.item.position.y = 0.6;

        this.hasItem = false;
        this.player.hasItem = false;
        this.uiStateText.text = "Estado: SIN ingrediente";

        // Score
        this.score += 1;
        this.uiScoreText.text = `Entregas: ${this.score}`;
        this.#toast("🎉 Entregado. ¡Aparece otro ingrediente!");

        // Respawn random con delay
        setTimeout(() => {
          this.objects.respawnItem();
        }, 650);
      } else {
        this.#toast("⚠️ Ve al caldero (zona azul) para entregar");
      }
    });
  }

  #updateCameraFollow() {
    const cam = this.sceneWrapper.camera;
    const p = this.player.mesh?.position;
    if (!cam || !p) return;

    if (!this._camTarget) this._camTarget = p.clone();

    this._camTarget = BABYLON.Vector3.Lerp(this._camTarget, p, 0.08);
    cam.target.copyFrom(this._camTarget);
  }
}
