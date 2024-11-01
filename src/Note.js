import * as THREE from "three";
import { createFallTween } from "./utilities/tweens/createFallTween";
import { createHitEffect } from "./utilities/createHitEffect";
export default class Note {
  constructor(loadedGltf, fallingGroup, scene, gltfName) {
    this.fallingGroup = fallingGroup;
    this.scene = scene;
    this.gltfName = gltfName;
    this.noteHitMaterial = new THREE.MeshPhongMaterial({
      color: "green",
    });
    this.noteGoodHitMaterial = new THREE.MeshPhongMaterial({
      color: "blue",
    });
    this.notePerfectHitMaterial = new THREE.MeshPhongMaterial({
      color: "red",
    });
    this.noteMissedMaterial = new THREE.MeshBasicMaterial({
      color: "grey",
      transparent: true,
      opacity: 0.5,
    });
    this.object3D =
      loadedGltf && loadedGltf.scene.getObjectByName(`${this.gltfName}_note`)
        ? loadedGltf.scene.getObjectByName(`${this.gltfName}_note`)
        : new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({ color: "red" })
          );
    this.object3D.scale.set(0.2, 0.2, 0.2);
    this.effectSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.01, 32, 16),
      new THREE.MeshPhongMaterial({
        color: "blue",
        transparent: true,
        opacity: 0.3,
      })
    );
    this.effectSphere.scale.set(0.2, 0.2, 0.2);
  }

  add(position, targetPosition, pitch, time) {
    const object3D = this.object3D.clone();
    object3D.position.set(position.x, position.y, position.z);
    object3D.name = `${pitch}_${time}`;
    this.fallingGroup.add(object3D);
    const fallTween = createFallTween(object3D, targetPosition);
    fallTween.start();
    return object3D.name;
  }

  hit(note, hitDetails) {
    hitDetails.isPerfect
      ? this.perfectHit(note)
      : hitDetails.isGood
      ? this.goodHit(note)
      : (note.material = this.noteHitMaterial);
  }

  perfectHit(note) {
    note.material = this.notePerfectHitMaterial;
    createHitEffect(this.effectSphere, 3, this.scene, note.position);
  }

  goodHit(note) {
    note.material = this.noteGoodHitMaterial;
  }

  miss(note) {
    note.material = this.noteMissedMaterial;
  }
}
