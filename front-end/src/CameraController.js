import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { createTransformPositionTween } from "./utilities/tweens/createTransformPositionTween";

export default class CameraController {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.craneUpPosition = new THREE.Vector3(0, 0.1, 2.3);
    this.gameplayPosition = new THREE.Vector3(0, -0.2, 1);
    this.shakeOffsetPosition = new THREE.Vector3(
      this.gameplayPosition.x,
      this.gameplayPosition.y + 0.02,
      this.gameplayPosition.z
    );
    this.camera.position.set(
      this.gameplayPosition.x,
      this.gameplayPosition.y,
      this.gameplayPosition.z
    );
    this.craneUpTween = createTransformPositionTween(
      this.camera,
      this.craneUpPosition,
      5000
    )
      .delay(500)
      .easing(TWEEN.Easing.Exponential.Out);
    this.craneDownTween = createTransformPositionTween(
      this.camera,
      this.gameplayPosition,
      500
    );
    this.shakeTween = createTransformPositionTween(
      this.camera,
      this.shakeOffsetPosition,
      50
    )
      .easing(TWEEN.Easing.Bounce.InOut)
      .repeat(7)
      .yoyo(true);
  }

  shake() {
    this.shakeTween.start();
  }
  craneUp() {
    this.shakeTween.chain(this.craneUpTween).start();
  }

  craneDown() {
    this.craneUpTween.stop();
    if (this.camera.position != this.gameplayPosition) {
      this.craneDownTween.startFromCurrentValues();
    }
  }
}
