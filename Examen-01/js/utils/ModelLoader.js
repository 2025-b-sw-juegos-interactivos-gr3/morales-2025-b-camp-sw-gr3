export class ModelLoader {
  static async load(scene, rootUrl, fileName) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      null,
      rootUrl,
      fileName,
      scene
    );

    const root = new BABYLON.TransformNode(fileName + "_root", scene);

    result.meshes.forEach((m) => {
      if (m.parent === null) {
        m.parent = root;
      }
    });

    return root;
  }
}
