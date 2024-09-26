import { Text } from "troika-three-text";
import * as THREE from "three";
import { characterPosition } from "./constants/constants";
import { createFadeTween } from "./utilities/tweens/createFadeTween";
export default class HitText {
  constructor(scene) {
    this.scene = scene;
    this.text = new Text();
    this.text.fontSize = 0.02;
    this.text.anchorX = "center";
    this.text.anchorY = "middle";
    this.text.fontWeight = "bold";
    this.text.material.transparent = true;
  }
  triggerText(hitDetails) {
    switch (true) {
      case hitDetails.isPerfect:
        this.createHitText(hitDetails.note.position, "perfect!", 0x52014a);
        break;
      case hitDetails.isGood:
        this.createHitText(hitDetails.note.position, "good!", 0x52014a);
        break;
      case hitDetails.isHit:
        this.createHitText(hitDetails.note.position, "hit!", 0x52014a);
        break;
      default:
        this.createHitText(hitDetails.note.position, "miss!", 0x52014a);
    }
  }

  createHitText(position, textContent, color) {
    const text = this.text.clone();
    text.text = textContent;
    text.material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
    });
    text.position.set(position.x, position.y, position.z + 0.05);
    text.tween = createFadeTween(text, 1, 0, 1000);
    text.sync();
    this.scene.add(text);
    text.tween.start().onComplete(() => {
      this.scene.children = this.scene.children.filter(
        (item) => item.id !== text.id
      );
    });
  }
}
