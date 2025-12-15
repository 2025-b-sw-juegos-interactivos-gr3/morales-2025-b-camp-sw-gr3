import { ModelLoader } from "../utils/ModelLoader.js";

export class GameObjects {
  constructor(scene) {
    this.scene = scene;
    this.item = null;
    this.cauldron = null;
    this.dropZone = null;

    this.treeTemplate = null;
    this.treeClones = [];

    this.glow = null;
  }

  async create() {
    // Zona de entrega
    const matDrop = new BABYLON.StandardMaterial("matDrop", this.scene);
    matDrop.diffuseColor = new BABYLON.Color3(0.1, 0.4, 0.8);
    matDrop.alpha = 0.25;

    this.dropZone = BABYLON.MeshBuilder.CreateGround(
      "dropZone",
      { width: 8, height: 8 },
      this.scene
    );
    this.dropZone.material = matDrop;
    this.dropZone.position = new BABYLON.Vector3(-18, 0.02, 18);

    // Caldero
    this.cauldron = await ModelLoader.load(this.scene, "./assets/models/", "cauldron.glb");
    this.cauldron.position = new BABYLON.Vector3(-18, 0, 18);
    this.#fitModelToSize(this.cauldron, 2.2);
    this.#snapRootToGround(this.cauldron); // ✅ caldero apoyado

    // Cristal
    this.item = await ModelLoader.load(this.scene, "./assets/models/", "crystal.glb");
    this.#fitModelToSize(this.item, 1.3);
    this.item.position.y = 0.9;

    // Luz + Glow (una sola vez)
    const crystalLight = new BABYLON.PointLight(
      "crystalLight",
      new BABYLON.Vector3(0, 1.2, 0),
      this.scene
    );
    crystalLight.intensity = 1.2;
    crystalLight.range = 12;
    crystalLight.parent = this.item;

    this.glow = new BABYLON.GlowLayer("glow", this.scene);
    this.glow.intensity = 0.45;

    // Animación cristal (solo si no está en mano)
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.item && !this.item.parent) {
        this.item.rotation.y += 0.02;
        this.item.position.y = 0.9 + Math.sin(performance.now() * 0.004) * 0.15;
      }
    });

    // Árboles: cargar plantilla y spawnear pocos (fluido)
    await this.#tryLoadTreeAndSpawn();

    // Respawn inicial
    this.respawnItem();
  }

  async #tryLoadTreeAndSpawn() {
    try {
      this.treeTemplate = await ModelLoader.load(this.scene, "./assets/models/", "tree.glb");
      this.#fitModelToSize(this.treeTemplate, 7.0);
      this.#snapRootToGround(this.treeTemplate);

      // ocultar template
      this.treeTemplate.setEnabled(false);

      // ✅ bosque más ligero
      this.#spawnForestWithGLB(28);
    } catch (e) {
      console.warn("⚠️ No se pudo cargar tree.glb. Sin árboles.", e);
    }
  }

  #spawnForestWithGLB(count = 28) {
    if (!this.treeTemplate) return;

    const HALF = this.scene.metadata?.mapHalfSize ?? 60;
    const spacing = 18; // más separación = menos árboles visibles

    let index = 0;

    for (let x = -HALF; x <= HALF; x += spacing) {
      for (let z = -HALF; z <= HALF; z += spacing) {
        if (index >= count) return;

        // camino central
        if (Math.abs(x) < 14 && Math.abs(z) < 14) continue;

        // libre alrededor caldero
        const distDrop = BABYLON.Vector3.Distance(new BABYLON.Vector3(x, 0, z), this.dropZone.position);
        if (distDrop < 22) continue;

        const tree = this.treeTemplate.clone("tree_" + index);
        tree.setEnabled(true);

        // variación
        const s = 0.85 + Math.random() * 0.35;
        tree.scaling = tree.scaling.multiplyByFloats(s, s, s);
        tree.rotation = new BABYLON.Vector3(0, Math.random() * Math.PI * 2, 0);

        tree.position = new BABYLON.Vector3(
          x + (Math.random() * 5 - 2.5),
          0,
          z + (Math.random() * 5 - 2.5)
        );

        // ✅ CLAVE: apoyo exacto al suelo (no flota)
        this.#snapRootToGround(tree);

        // ✅ rendimiento
        tree.freezeWorldMatrix();
        tree.doNotSyncBoundingInfo = true;

        this.treeClones.push(tree);
        index++;
      }
    }
  }

  // -----------------------
  // Respawn del cristal
  // -----------------------
  getRandomPosition() {
    const HALF = this.scene.metadata?.mapHalfSize ?? 60;

    for (let i = 0; i < 80; i++) {
      const x = (Math.random() * (HALF * 2 - 10)) - (HALF - 5);
      const z = (Math.random() * (HALF * 2 - 10)) - (HALF - 5);
      const pos = new BABYLON.Vector3(x, 0.9, z);

      const distDrop = BABYLON.Vector3.Distance(pos, this.dropZone.position);
      if (distDrop < 18) continue;

      const distStart = BABYLON.Vector3.Distance(pos, new BABYLON.Vector3(10, 0.9, -10));
      if (distStart < 14) continue;

      return pos;
    }

    return new BABYLON.Vector3(18, 0.9, -18);
  }

  respawnItem() {
    if (!this.item) return;
    this.item.parent = null;
    this.item.position = this.getRandomPosition();
    this.item.rotation = BABYLON.Vector3.Zero();
  }

  // -----------------------
  // Helpers
  // -----------------------
  #fitModelToSize(rootNode, targetSizeMeters = 1.0) {
    const meshes = rootNode.getChildMeshes(false);
    if (!meshes.length) return;

    let min = new BABYLON.Vector3(Infinity, Infinity, Infinity);
    let max = new BABYLON.Vector3(-Infinity, -Infinity, -Infinity);

    for (const m of meshes) {
      const b = m.getBoundingInfo().boundingBox;
      min = BABYLON.Vector3.Minimize(min, b.minimumWorld);
      max = BABYLON.Vector3.Maximize(max, b.maximumWorld);
    }

    const size = max.subtract(min);
    const largest = Math.max(size.x, size.y, size.z);
    if (largest <= 0 || !isFinite(largest)) return;

    const s = targetSizeMeters / largest;
    rootNode.scaling = rootNode.scaling.multiplyByFloats(s, s, s);
  }

  // ✅ Apoya cualquier GLB al suelo automáticamente
#snapRootToGround(rootNode) {
  const meshes = rootNode.getChildMeshes(false);
  if (!meshes.length) return;

  let minY = Infinity;
  for (const m of meshes) {
    const b = m.getBoundingInfo().boundingBox;
    minY = Math.min(minY, b.minimumWorld.y);
  }
  if (!isFinite(minY)) return;

  // MOVIMIENTO: alinear la base (y) del árbol al suelo (ajustar si hace falta)
  rootNode.position.y -= minY; // ajuste fino para que esté sobre el suelo
}

}
