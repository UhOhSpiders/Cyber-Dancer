import * as THREE from "three";
import { characterPosition } from "./constants/constants";

export default class Character {
  constructor(object3D, scene, animationMixer) {
    this.object3D = object3D;
    this.scene = scene;
    this.animationMixer = animationMixer;
    this.idle = null;
    this.danceMoves = this.getDanceMoves();
    this.loopingDance = this.danceMoves[0];
    this.isDancing = false;
    this.currentDanceMove = null;
    this.stumbleAnimation = this.getStumbleAnimation();
    this.create();
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
        // add check here to only affect the selected character
        this.isDancing = false;
        this.loopingDance.reset();
        this.loopingDance.fadeIn(0.1);
        this.loopingDance.play();
      });
    }
  }

  getDanceMoves() {
    let danceMoves = []
    this.object3D.animations.forEach((animation) => {
      if (
        !animation.name.includes("idle") &&
        !animation.name.includes("stumble") &&
        animation.name.includes(this.object3D.name.split("_")[0])
      ) {
        let clip = THREE.AnimationClip.findByName(
          this.object3D.animations,
          animation.name
        );
        let action = this.animationMixer.clipAction(clip, this.object3D);
        danceMoves.push(action);
      }
    });
    return danceMoves;
  }

  getCharacterAnimationByCategory(category){
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
    return animations ? animations : null;
  }

  getStumbleAnimation() {
    let stumbles = this.getCharacterAnimationByCategory("stumble");
    if (stumbles[0]){
      stumbles[0].setLoop(THREE.LoopOnce);
      return stumbles[0];
    }else{
      return null;
    }
  }

  delete() {
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.object3D.id
    );
    return null;
  }

  startLoopingDance(){
    this.loopingDance.setLoop(THREE.LoopRepeat);
    this.idle.fadeOut(0.1);
    this.loopingDance.reset();
    this.loopingDance.fadeIn(0.1);
    this.loopingDance.play();
  }

  stopLoopingDance(){
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
    if(!this.stumbleAnimation){
      return;
    }
    if (this.isDancing) {
      this.currentDanceMove.fadeOut(0.1);
    } else {
      this.idle.fadeOut(0.1);
    }
    this.stumbleAnimation.reset();
    this.stumbleAnimation.fadeIn(0.1);
    this.stumbleAnimation.play();
  }

  explode() {
    this.object3D.visible = false;
  }
}
