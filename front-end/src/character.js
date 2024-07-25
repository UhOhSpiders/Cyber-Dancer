import * as THREE from "three";
import { assignDanceMovesToNotes } from "./utilities/assignDanceMovesToNotes";
import LifeCounter from "./LifeCounter";

export default class Character {
  constructor(object3D, scene, animationMixer, noteColumns) {
    this.object3D = object3D;
    this.scene = scene;
    this.animationMixer = animationMixer;
    this.noteColumns = noteColumns;
    this.idle = null;
    this.danceMoves = [];
    this.isDancing = false;
    this.create();
  }
  create() {
    return new Promise((resolve) => {
      let character = this.object3D;
      const idleClip = THREE.AnimationClip.findByName(
        this.object3D.animations,
        `idle`
      );
      const idleAction = this.animationMixer.clipAction(
        idleClip,
        this.object3D
      );
      idleAction.loop = THREE.LoopPingPong;
      character.position.set(0, -0.55, 0);
      character.scale.set(0.3, 0.3, 0.3);
      this.idle = idleAction;
      this.idle.play();
      this.animationMixer.addEventListener("finished", () => {
        this.isDancing = false;
        idleAction.reset();
        idleAction.fadeIn(0.1);
        idleAction.play();
      });
      resolve();
    }, undefined).then(() => {
      this.danceMoves = assignDanceMovesToNotes(
        this.object3D,
        this.scene,
        this.animationMixer,
        this.noteColumns
      );
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
      let danceMove = this.danceMoves[notePitch].danceMove;
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
    console.log("explodes");
  }
}
