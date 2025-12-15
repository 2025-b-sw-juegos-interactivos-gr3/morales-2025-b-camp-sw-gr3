import { ModelLoader } from "../utils/ModelLoader.js";

export class Player {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.mesh = null;   // collider
    this.model = null;  // visual

    // ✅ Menos velocidad
    this.speed = 0.45; // antes 0.7

    this.hasItem = false;

    // ✅ Gravedad más suave
    this.gravity = -0.12; // antes -0.25

    this.height = 2.4;

    // ✅ Punto medio: levanta un poquito todo
    this.groundOffset = 0.18;
  }

  async create() {
  const height = this.height;

  // Collider (capsule)
  const collider = BABYLON.MeshBuilder.CreateCapsule(
    "playerCollider",
    { height, radius: 0.5 },
    this.scene
  );

  // Posición del collider sobre el suelo
  collider.position = new BABYLON.Vector3(10, height / 2 + this.groundOffset, -10);
  collider.checkCollisions = true;
  collider.isVisible = false;

  // Cargar modelo
  const modelRoot = await ModelLoader.load(this.scene, "./assets/models/", "alchemist.glb");
  modelRoot.parent = collider;

  // Ajuste de tamaño (más grande)
  modelRoot.scaling.setAll(1.2);

  // Alineamos el modelo sobre el collider (y con el suelo)
  modelRoot.position.y = -height / 2;

  this.mesh = collider;
  this.model = modelRoot;
}


  update(input) {
    if (!this.mesh || !this.camera) return;

    // Dirección relativa a cámara 
    const forward = this.camera.getDirection(BABYLON.Axis.Z);
    const right = this.camera.getDirection(BABYLON.Axis.X);

    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    let move = BABYLON.Vector3.Zero();

    if (input.isDown("w")) move.addInPlace(forward);
    if (input.isDown("s")) move.subtractInPlace(forward);
    if (input.isDown("a")) move.subtractInPlace(right);
    if (input.isDown("d")) move.addInPlace(right);

    if (move.lengthSquared() > 0) {
      move.normalize();
      move.scaleInPlace(this.speed);

      // rotar hacia movimiento
      const angle = Math.atan2(move.x, move.z);
      if (this.model) this.model.rotation.y = angle;
    }

    // ✅ Gravedad suave
    move.y = this.gravity;

    this.mesh.moveWithCollisions(move);

    // ✅ Punto medio: evita que se vea hundido
    const minY = this.height / 2 + this.groundOffset;
    if (this.mesh.position.y < minY) this.mesh.position.y = minY;
  }
}
