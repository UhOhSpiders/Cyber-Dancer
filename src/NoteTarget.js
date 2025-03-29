import * as THREE from "three";
import { Text } from "troika-three-text";
import { createScalePulseTween } from "./utilities/tweens/createScalePulseTween";
import { KEYCODES } from "./constants/constants";
export default class NoteTarget {
  constructor(loadedGltf, noteDropperGroup, textGroup, levelName) {
    this.noteDropperGroup = noteDropperGroup;
    this.textGroup = textGroup;
    this.object3D = loadedGltf
    // this.object3D.tween = createScalePulseTween(
    //   this.object3D,
    //   this.object3D.scale
    // );
  }
  
  create(position, keystroke) {
    const newTarget = this.object3D.clone();
    newTarget.tween = createScalePulseTween(
      newTarget,
      newTarget.scale
    );
    newTarget.position.set(position.x, position.y, position.z);
    let text = new Text();
    this.textGroup.add(text);
    text.text = KEYCODES[keystroke];
    newTarget.name = keystroke;
    newTarget.isTarget = true
    text.position.x = position.x;
    text.position.y = position.y;
    text.position.z = position.z + 0.3;
    text.color = "orange";
    text.anchorX = "center";
    text.anchorY = "middle";
    text.fontSize = 0.23;
    text.sync();
    this.noteDropperGroup.add(newTarget);
  }
}
