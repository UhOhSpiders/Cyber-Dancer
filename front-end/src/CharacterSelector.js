import Character from "./character";
import * as THREE from "three";

export default class CharacterSelector {
  constructor(loadedGltf, scene, mixer, noteColumns) {
    this.loadedGltf = loadedGltf;
    this.scene = scene;
    this.mixer = mixer;
    this.noteColumns = noteColumns;
    this.characters = [];
    this.displayedCharacterIndex = 0;
    this.getCharacters(loadedGltf);
    this.characterSelectorGroup = new THREE.Group();
    this.characterSelectorGroup.scale.set(0.7,0.7,0.7)
    this.characterSelectorGroup.position.set(0,-0.05,0)
    this.scene.add(this.characterSelectorGroup)
    this.characterSelectorGroup.add(this.characters[0].object3D)
  }
  getCharacters(gltf) {
    gltf.scene.children.forEach((object3D) => {
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

  incrementPreview(i) {
    let increment = parseInt(i);
    this.deletePreview()
    if (this.displayedCharacterIndex + increment < 0) {
      this.displayedCharacterIndex = this.characters.length -1;
    } else if (
      this.displayedCharacterIndex + increment <
      this.characters.length
    ) {
      this.displayedCharacterIndex += increment;
    } else {
      this.displayedCharacterIndex = 0;
    }
    this.characterSelectorGroup.add(this.characters[this.displayedCharacterIndex].object3D)
  }

  deletePreview() {
    this.characterSelectorGroup.children = []
  }
}
