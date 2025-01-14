import * as THREE from "three";
import { characterPosition } from "./constants/constants";

export default class Character {
  constructor(object3D, scene, animationMixer) {
    this.object3D = object3D;
    this.scene = scene;
    this.animationMixer = animationMixer;
    this.idle = this.getCharacterAnimationByCategory("idle");
    this.danceMoves = this.getCharacterAnimationsByCategory("dance");
    this.loopingDance = this.danceMoves[0];
    this.isDancing = false;
    this.currentDanceMove = null;
    this.stumbleAnimations = this.getCharacterAnimationsByCategory("stumble");
    this.create();
  }
  create() {
    let character = this.object3D;
    character.position.set(
      characterPosition.x,
      characterPosition.y,
      characterPosition.z
    );
    character.scale.set(0.3, 0.3, 0.3);

    if (this.idle) {
      this.idle.setLoop(THREE.LoopPingPong);
      this.idle.play();
    }
    this.animationMixer.addEventListener("finished", () => {
      this.isDancing = false;
      if (
        this.scene.getObjectByName(this.object3D.name) &&
        this.object3D.visible
      ) {
        this.loopingDance.reset();
        this.loopingDance.fadeIn(0.1);
        this.loopingDance.play();
      }
    });
  }

  getCharacterAnimationsByCategory(category) {
    let animations = [];
    this.object3D.animations.forEach((animation) => {
      if (
        animation.name.includes(category) &&
        animation.name.includes(this.object3D.name.split("_")[0])
      ) {
        let clip = THREE.AnimationClip.findByName(
          this.object3D.animations,
          animation.name
        );
        let action = this.animationMixer.clipAction(clip, this.object3D);
        animations.push(action);
      }
    });
    return animations.length ? animations : null;
  }

  getCharacterAnimationByCategory(category) {
    let clips = this.getCharacterAnimationsByCategory(category);
    return clips ? clips[0] : null;
  }

  delete() {
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.object3D.id
    );
    return null;
  }

  startLoopingDance() {
    this.loopingDance.setLoop(THREE.LoopRepeat);
    this.idle.fadeOut(0.1);
    this.loopingDance.reset();
    this.loopingDance.fadeIn(0.1);
    this.loopingDance.play();
  }

  stopLoopingDance() {
    this.loopingDance.reset();
    this.loopingDance.fadeOut(0.1);
    this.idle.reset();
    this.idle.fadeIn(0.1);
    this.idle.play();
  }

  dance(notePitch) {
    if (!this.isDancing) {
      this.isDancing = true;
      this.currentDanceMove =
        this.danceMoves[Math.floor(Math.random() * this.danceMoves.length)];
      this.currentDanceMove.setLoop(THREE.LoopOnce);
      this.loopingDance.fadeOut(0.1);
      this.currentDanceMove.reset();
      this.currentDanceMove.fadeIn(0.1);
      this.currentDanceMove.play();
    }
  }
  stumble() {
    if (this.stumbleAnimations) {
      if (this.isDancing) {
        this.currentDanceMove.fadeOut(0.1);
      } else {
        this.idle.fadeOut(0.1);
      }
      this.stumbleAnimations[0].reset();
      this.stumbleAnimations[0].fadeIn(0.1);
      this.stumbleAnimations[0].setLoop(THREE.LoopOnce);
      this.stumbleAnimations[0].play();
    }
  }

  explode() {
    this.object3D.visible = false;
    this.loopingDance.stop();
  }
}
