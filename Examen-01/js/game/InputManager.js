export class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.inputMap = {};
  }

  init() {
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);

    this.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key.toLowerCase()] = true;
      })
    );

    this.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key.toLowerCase()] = false;
      })
    );
  }

  isDown(key) {
    return !!this.inputMap[key.toLowerCase()];
  }
}
