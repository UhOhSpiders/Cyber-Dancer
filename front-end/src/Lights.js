import * as THREE from "three";
import { createLightFlashTween } from "./utilities/tweens/createLightFlashTween";

export default class Score {
  constructor(scene) {
    this.scene = scene;
    this.light = new THREE.HemisphereLight(0x1c51ff, 0xff3bba, 2);
    this.directionalLight1 = new THREE.DirectionalLight(0x1c51ff, 30)
    this.directionalLight1.position.set(-3, 9, -5);

    this.directionalLight2 = new THREE.DirectionalLight(0xff3bba, 30);
    this.directionalLight2.position.set(3, 9, -5);

    this.directionalLight3 = new THREE.DirectionalLight(0xffdcad, 5);
    this.directionalLight3.position.set(2, 4, 5);

    this.scene.add(this.light);
    this.targetObject = new THREE.Object3D();
    this.targetObject.position.set(0, -1.2, -2.5);
    this.scene.add(this.targetObject);

    this.directionalLight1.target = this.targetObject;
    this.directionalLight2.target = this.targetObject;
    this.directionalLight3.target = this.targetObject;

    this.scene.add(this.directionalLight1);
    this.scene.add(this.directionalLight2);
    this.scene.add(this.directionalLight3);
    
  }

}
