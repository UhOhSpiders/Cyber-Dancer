import * as THREE from "three";
import { characterPosition } from "./constants/constants";
import { createTransformPositionTween } from "./utilities/tweens/createTransformPositionTween";
import * as Tone from "tone";

export default class Squisher {
  constructor(gltf, scene) {
    this.gltf = gltf;
    this.scene = scene;
    this.squishers = [];
    this.splat = null;
    this.activeSquisher = null;
    this.landingPosition = new THREE.Vector3(
      characterPosition.x,
      characterPosition.y,
      characterPosition.z
    );
    this.sound = new Tone.Player(`../squish.wav`).toDestination();
    this.getSquishers(this.gltf);
    this.getSplat(this.gltf);
  }
  getSquishers(gltf) {
    gltf.scene.children.forEach((object3D) => {
      if (object3D.name.includes("squisher")) {
        if (object3D.userData.has_bump_map) {
          let bmap = new THREE.TextureLoader().load(
            `${object3D.name}_bump.png`
          );
          bmap.flipY = false;
          object3D.material.bumpMap = bmap;
        }
        object3D.position.set(0, 2, 0);
        object3D.scale.set(0.3, 0.3, 0.3);
        object3D.tween = createTransformPositionTween(
          object3D,
          this.landingPosition,
          700
        );
        this.squishers.push(object3D);
      }
    });
  }

  getSplat(gltf) {
    gltf.scene.children.forEach((object3D) => {
      if (object3D.name.includes("splat")) {
        object3D.position.set(
          this.landingPosition.x,
          this.landingPosition.y,
          this.landingPosition.z
        );
        object3D.scale.set(0.3, 0.3, 0.3);
        this.splat = object3D;
      }
    });
  }

  delete() {
    if (!this.activeSquisher) return;
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.activeSquisher.id
    );
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.splat.id
    );
  }

  async squish() {
    this.activeSquisher =
      this.squishers[Math.floor(Math.random() * this.squishers.length)];
    this.scene.add(this.activeSquisher);
    return new Promise((resolve) => {
      this.activeSquisher.tween.start().onComplete(() => {
        resolve();
        this.scene.add(this.splat);
        this.sound.start();
      });
    });
  }
}
