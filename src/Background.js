export default class Background {
  constructor(scene, gltf) {
    this.scene = scene;
    this.gltf = gltf;
    this.backgrounds = [];
    this.getBackgrounds(this.gltf);
    this.scene.add(this.backgrounds[0]);
    this.activeBackground = this.backgrounds[0];
  }

  getBackgrounds(gltf) {
    gltf.scene.children.forEach((object3D) => {
      if (object3D.name.includes("background")) {
        object3D.position.set(0, -0.55, 1);
        this.backgrounds.push(object3D);
      }
    });
  }
  create(mapName) {
    this.delete()
    this.backgrounds.forEach((background) => {
      if (background.name.includes(mapName)) {
        this.scene.add(background);
        this.activeBackground = background;
      }
    });
  }

  delete() {
    if (this.activeBackground) {
      this.scene.children = this.scene.children.filter(
        (item) => item.id !== this.activeBackground.id
      );
    }
  }
}
