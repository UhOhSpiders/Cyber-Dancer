import Character from "./character";

export default class CharacterSelector {
  constructor(loadedGltf, scene, mixer, noteColumns) {
    this.loadedGltf = loadedGltf;
    this.scene = scene;
    this.mixer = mixer;
    this.noteColumns = noteColumns;
    this.characters = [];
    this.getCharacters(loadedGltf);
  }
  getCharacters(gltf) {
    gltf.scene.children.forEach((object3D) => {
      // console.log(gltf)
      if (object3D.name.includes("character")) {
        object3D.animations = this.loadedGltf.animations;
        const character = new Character(
          object3D,
          this.scene,
          this.mixer,
          this.noteColumns
        );
        this.characters.push(character);
      }
    });
  }
}
