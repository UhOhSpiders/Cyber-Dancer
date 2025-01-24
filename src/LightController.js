import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { createDefaultLights } from "./utilities/lights/createDefaultLights";
import { createSpotLight } from "./utilities/lights/createSpotLight";
import { createStrobeLight } from "./utilities/lights/createStrobeLight";

export default class LightController {
  constructor(scene) {
    this.scene = scene;
    this.lights = new THREE.Group();
    this.targetObject = new THREE.Object3D();
    this.targetObject.position.set(0, -1.2, -2.5);
    this.scene.add(this.targetObject);
    this.defaultLights = createDefaultLights(this.targetObject);
    this.streakLights = createDefaultLights(this.targetObject);
    this.strobeLight = createStrobeLight();
    this.streakLights.visible = false;
    this.defaultLights.visible = true;
    this.dangerLights = createSpotLight(0xff7070, { x: 0, y: 0.7, z: 0.2 });
    this.dangerLights.visible = false;
    this.lights.add(this.strobeLight);
    this.lights.add(this.dangerLights);
    this.lights.add(this.defaultLights);
    this.lights.add(this.streakLights);
    this.scene.add(this.lights);
  }

  triggerDangerLights() {
    this.dangerLights.visible = true;
    this.defaultLights.visible = false
  }

  fadeOutDefaultLights() {
    this.defaultLights.visible = false;
  }

  changeColor(hexColor) {
    this.strobeLight.strobeTween.start();
    if (this.streakLights.children[1].color.getHex() != hexColor) {
      this.fadeOutDefaultLights();
      this.streakLights.visible = true;
      this.streakLights.children.forEach((light) => {
        if (light.type == "DirectionalLight") {
          light.color.setHex(hexColor);
        }
        if (light.type == "HemisphereLight") {
          light.fadeOutTween.start();
        }
      });
    }
  }

 

  reset() {
    if (!this.defaultLights.visible) {
      this.streakLights.visible = false;
      this.dangerLights.visible = false;
      this.defaultLights.visible = true;
      this.defaultLights.children.forEach((light) => {
        light.fadeInTween.start();
      });
    }
  }
}
