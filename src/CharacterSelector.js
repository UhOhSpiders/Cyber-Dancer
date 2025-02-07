import Character from "./character";
import * as THREE from "three";

export default class CharacterSelector {
  constructor(loadedGltfs, scene, mixer) {
    this.loadedGltfs = loadedGltfs;
    this.scene = scene;
    this.mixer = mixer;
    this.characters = this.getCharacters(loadedGltfs);
    this.displayedCharacterIndex = 0;
    this.characterSelectorGroup = new THREE.Group();
    this.characterSelectorGroup.scale.set(0.8, 0.8, 0.8);
    this.characterSelectorGroup.position.set(0, 0.1, 0);
    this.scene.add(this.characterSelectorGroup);
    this.characterSelectorGroup.add(this.characters[0].object3D);
  }
  getCharacters(gltfs) {
    let charactersTemp = []
    gltfs.forEach((gltf) => {
      // gltf.scene.children[0].animations = gltf.animations
      const character = new Character(gltf, this.scene, this.mixer);
      charactersTemp.push(character);
    });
    return charactersTemp;
  }

  incrementPreview(i) {
    let increment = parseInt(i);
    this.deletePreview();
    if (this.displayedCharacterIndex + increment < 0) {
      this.displayedCharacterIndex = this.characters.length - 1;
    } else if (
      this.displayedCharacterIndex + increment <
      this.characters.length
    ) {
      this.displayedCharacterIndex += increment;
    } else {
      this.displayedCharacterIndex = 0;
    }
    this.characterSelectorGroup.add(
      this.characters[this.displayedCharacterIndex].object3D
    );
  }

  deletePreview() {
    this.characterSelectorGroup.children = [];
  }
}
