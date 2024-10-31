import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { createDefaultLights } from "./utilities/lights/createDefaultLights";
import { createDangerLights } from "./utilities/lights/createDangerLights";

export default class Lights {
  constructor(scene) {
    this.scene = scene;
    this.lights = new THREE.Group();
    this.targetObject = new THREE.Object3D();
    this.targetObject.position.set(0, -1.2, -2.5);
    this.scene.add(this.targetObject);

    this.defaultLights = createDefaultLights(this.targetObject);
    this.dangerLights = createDangerLights(this.targetObject);
    this.lights.add(this.defaultLights);
    this.scene.add(this.lights);
  }

  triggerDangerLights() {
    this.defaultLights.children.forEach((light) => {
      light.fadeOutTween.start();
    });
    this.lights.add(this.dangerLights);
    this.dangerLights.children[0].fadeTween
      .easing(TWEEN.Easing.Exponential.Out)
      .start();
  }

  reset() {
    if (this.defaultLights.children[0].intensity > 0) return;
    this.lights.children = [];
    this.lights.add(this.defaultLights);
    this.defaultLights.children.forEach((light) => {
      light.fadeInTween.start();
    });
  }
}
