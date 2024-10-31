import * as THREE from "three";
import { Text } from "troika-three-text";
import { createScalePulseTween } from "./utilities/tweens/createScalePulseTween";
import { KEYCODES } from "./constants/constants";
export default class NoteTarget {
  constructor(loadedGltf, noteDropperGroup, textGroup, gltfName) {
    this.noteDropperGroup = noteDropperGroup;
    this.textGroup = textGroup;
    this.object3D =
      loadedGltf && loadedGltf.scene.getObjectByName(`${gltfName}_target`)
        ? loadedGltf.scene.getObjectByName(`${gltfName}_target`)
        : new THREE.Mesh(
            new THREE.CircleGeometry(0.02, 8),
            new THREE.MeshPhongMaterial({ color: "blue" })
          );
    this.object3D.scale.set(0.2, 0.2, 0.2);
    this.object3D.tween = createScalePulseTween(
      this.object3D,
      this.object3D.scale
    );
  }
  create(position, keystroke) {
    const newTarget = this.object3D.clone();
    newTarget.position.set(position.x, position.y, position.z);
    let text = new Text();
    this.textGroup.add(text);
    text.text = KEYCODES[keystroke];
    newTarget.name = keystroke;
    text.position.x = position.x;
    text.position.y = position.y;
    text.position.z = position.z + 0.05;
    text.color = "orange";
    text.anchorX = "center";
    text.anchorY = "middle";
    text.fontSize = 0.03;
    text.sync();
    this.noteDropperGroup.add(newTarget);
  }
}
