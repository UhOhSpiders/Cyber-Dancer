import * as THREE from "three";
import { characterPosition } from "./constants/constants";

export default class Character {
  constructor(object3D, scene, animationMixer) {
    this.object3D = object3D;
    this.scene = scene;
    this.animationMixer = animationMixer;
    this.idle = null;
    this.danceMoves = [];
    this.isDancing = false;
    this.newDanceMoves = [];
    this.create();
    this.getDanceMoves();
  }
  create() {
    let character = this.object3D;
    const idleClip = THREE.AnimationClip.findByName(
      this.object3D.animations,
      `${this.object3D.name.split("_")[0]}_idle`
    );
    character.position.set(
      characterPosition.x,
      characterPosition.y,
      characterPosition.z
    );
    character.scale.set(0.3, 0.3, 0.3);
    if (idleClip) {
      const idleAction = this.animationMixer.clipAction(
        idleClip,
        this.object3D
      );
      idleAction.loop = THREE.LoopPingPong;
      this.idle = idleAction;
      this.idle.play();
      this.animationMixer.addEventListener("finished", () => {
        this.isDancing = false;
        idleAction.reset();
        idleAction.fadeIn(0.1);
        idleAction.play();
      });
    }
  }

  getDanceMoves() {
    this.object3D.animations.forEach((animation) => {
      if (
        !animation.name.includes("idle") &&
        animation.name.includes(this.object3D.name.split("_")[0])
      ) {
        let clip = THREE.AnimationClip.findByName(
          this.object3D.animations,
          animation.name
        );
        let action = this.animationMixer.clipAction(clip, this.object3D);
        this.newDanceMoves.push(action);
      }
    });
  }

  delete() {
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.object3D.id
    );
    return null;
  }

  dance(notePitch) {
    if (!this.isDancing) {
      this.isDancing = true;
      let danceMove =
        this.newDanceMoves[
          Math.floor(Math.random() * this.newDanceMoves.length)
        ];
      danceMove.setLoop(THREE.LoopOnce);
      this.idle.fadeOut(0.1);
      danceMove.reset();
      danceMove.fadeIn(0.1);
      danceMove.play();
    }
  }
  stumble() {
    // play stumble animation
  }
  toggleIsDancing() {
    this.isDancing = !this.isDancing;
  }

  explode() {
    this.object3D.visible = false;
  }
}
