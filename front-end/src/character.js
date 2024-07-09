import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { assignDanceMovesToNotes } from "./utilities/assignDanceMovesToNotes";

export default class Character {
  constructor(object3D, scene, animationMixer, noteColumns) {
    this.object3D = object3D;
    this.scene = scene;
    this.animationMixer = animationMixer;
    this.noteColumns = noteColumns;
    this.idle = null;
    this.danceMoves = [];

  }
  create() {
    return new Promise((resolve) => {
      console.log(this.object3D)
      let character = this.object3D;
      const idleClip = THREE.AnimationClip.findByName(
        this.object3D.animations,
        "idle"
      );
      const idleAction = this.animationMixer.clipAction(idleClip);
      idleAction.loop = THREE.LoopPingPong;
      character.position.set(0, -0.55, 0);
      character.scale.set(0.3, 0.3, 0.3);
      this.scene.add(character);
      this.idle = idleAction;
      this.idle.play();
      this.animationMixer.addEventListener("finished", function(){
        idleAction.reset()
        idleAction.fadeIn(0.1)
        idleAction.play()
      })
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
  dance(notePitch) {
    let danceMove = this.danceMoves[notePitch].danceMove;
    this.idle.fadeOut(0.1)
    danceMove.reset()
    danceMove.fadeIn(0.1)
    danceMove.play()
  }
  stumble() {
    // play stumble animation
  }
}
