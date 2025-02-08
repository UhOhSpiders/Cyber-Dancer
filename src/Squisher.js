import * as THREE from "three";
import { characterPosition } from "./constants/constants";
import { createTransformPositionTween } from "./utilities/tweens/createTransformPositionTween";
import * as Tone from "tone";

export default class Squisher {
  constructor(gltfs, miscs, scene) {
    this.scene = scene;
    this.activeSquisher = null;
    this.landingPosition = new THREE.Vector3(
      characterPosition.x,
      characterPosition.y,
      characterPosition.z
    );
    this.squishers = this.getSquishers(gltfs);
    this.splat = this.getSplat(miscs);
    this.sound = new Tone.Player(`../squish.wav`).toDestination();
  }
  getSquishers(gltfs) {
    let squishersTemp = [];

    gltfs.forEach((mesh) => {
      if (mesh.userData.has_bump_map) {
        let bmap = new THREE.TextureLoader().load(
          `graphics/bump_maps/${mesh.userData.name}_bump.png`
        );
        bmap.flipY = false;
        mesh.material.bumpMap = bmap;
      }
      mesh.position.set(0, 3, 0);
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.tween = createTransformPositionTween(
        mesh,
        this.landingPosition,
        700
      );
      squishersTemp.push(mesh);
    });
    return squishersTemp;
  }

  getSplat(gltfs) {
    let splat
    gltfs.forEach((mesh) => {
      if (mesh.name == "splat") {
        mesh.position.set(
          this.landingPosition.x,
          this.landingPosition.y,
          this.landingPosition.z
        );
        mesh.scale.set(0.7, 0.7, 0.7);
      }
      splat = mesh
    });
    return splat
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
