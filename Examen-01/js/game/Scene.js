export class GameScene {
  constructor(engine, canvas) {
    this.engine = engine;
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
  }

  create() {
    const scene = new BABYLON.Scene(this.engine);
    scene.collisionsEnabled = true;

    // Fondo
    scene.clearColor = new BABYLON.Color4(0.03, 0.05, 0.08, 1);

    // Fog suave
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.012;
    scene.fogColor = new BABYLON.Color3(0.02, 0.04, 0.05);

    // Luces
    const hemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.6;

    const moon = new BABYLON.DirectionalLight("moon", new BABYLON.Vector3(-0.4, -1, 0.2), scene);
    moon.position = new BABYLON.Vector3(30, 60, -30);
    moon.intensity = 0.7;

    // Suelo
    const MAP_SIZE = 120;
    const HALF = MAP_SIZE / 2;

    const matGround = new BABYLON.StandardMaterial("groundMat", scene);
    matGround.diffuseColor = new BABYLON.Color3(0.08, 0.18, 0.10);

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: MAP_SIZE, height: MAP_SIZE },
      scene
    );
    ground.material = matGround;
    ground.checkCollisions = true;

    scene.metadata = { mapHalfSize: HALF };

    // Cámara tipo GTA
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      22,
      BABYLON.Vector3.Zero(),
      scene
    );

    camera.attachControl(this.canvas, true);
    camera.useInputToRestoreState = false;

    camera.lowerRadiusLimit = 14;
    camera.upperRadiusLimit = 30;
    camera.wheelDeltaPercentage = 0.008;

    // ✅ Menos sensibilidad + más suavidad
    camera.inertia = 0.92;
    camera.angularSensibilityX = 900; // antes 400 (más alto = menos sensible)
    camera.angularSensibilityY = 900;

    // PointerLock
    this.#enablePointerLock(scene, camera);

    this.camera = camera;
    this.scene = scene;
    return scene;
  }

  #enablePointerLock(scene, camera) {
    const canvas = this.canvas;

    const sensitivity = 0.0002; 

    canvas.addEventListener("click", () => {
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock();
      }
    });

    const onMouseMove = (evt) => {
      if (document.pointerLockElement === canvas) {
        camera.alpha -= evt.movementX * sensitivity;
        camera.beta -= evt.movementY * sensitivity;

        const minBeta = 0.15;
        const maxBeta = Math.PI / 2.05;
        camera.beta = Math.max(minBeta, Math.min(maxBeta, camera.beta));
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}
