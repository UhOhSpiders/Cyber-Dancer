export default class Background {
  constructor(scene, mesh) {
    this.scene = scene;
    this.mesh = mesh;
    this.mesh.position.set(0, -0.55, 1);
    this.create()
  }

  create() {
    this.scene.add(this.mesh);
  }

  delete() {
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.mesh.id
    );
  }
}
