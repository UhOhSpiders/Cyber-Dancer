import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Text } from "troika-three-text";
import { keyCodes } from "./constants/constants";
import { getColumnXPositions } from "./utilities/getColumnXPositions";
import { fallTime } from "./constants/constants.js";
import { assignNotesToColumns } from "./utilities/assignNotesToColumns.js";

export default class NoteDropper {
  constructor(width, scene, camera) {
    this.width = width;
    this.scene = scene;
    this.camera = camera;
    this.keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
    this.targetYPosition = -0.25;
    this.notesToHit = this.keys.reduce(
      (acc, curr) => ((acc[curr] = []), acc),
      {}
    );
   
    this.noteDropperGroup = new THREE.Group();
    this.fallingGroup = new THREE.Group();
    this.noteDropperGroup.add(this.fallingGroup);
    this.columnXPositions = getColumnXPositions(width, this.keys.length);
    this.noteColumns = assignNotesToColumns(this.columnXPositions, this.keys);
    this.noteGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
    this.noteMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    this.notePlayedMaterial = new THREE.MeshBasicMaterial({
      color: "green",
    });
    this.noteMissedMaterial = new THREE.MeshBasicMaterial({
      color: "grey",
    });
    this.noteMesh = new THREE.Mesh(this.noteGeometry, this.noteMaterial);
  }
  load() {
    let linePoints = [];
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    linePoints.push(new THREE.Vector3(this.width / 2, this.targetYPosition, 0));
    linePoints.push(
      new THREE.Vector3(this.width / -2, this.targetYPosition, 0)
    );
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    let line = new THREE.Line(lineGeometry, lineMaterial);

    let targetGeometry = new THREE.CircleGeometry(0.02, 8);
    let targetMaterial = new THREE.MeshPhongMaterial({ color: "blue" });
    let targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
    for (let step = 0; step < this.columnXPositions.length; step++) {
      let newTarget = targetMesh.clone();
      let text = new Text();
      this.noteDropperGroup.add(text);
      text.text = keyCodes[this.keys[step]];
      newTarget.name = this.keys[step]
      text.position.x = this.columnXPositions[step];
      text.position.y = this.targetYPosition;
      text.color = "white";
      text.anchorX = "center";
      text.anchorY = "middle";
      text.fontSize = 0.03;
      text.sync();
      newTarget.position.set(
        this.columnXPositions[step],
        this.targetYPosition,
        0
      );
      this.noteDropperGroup.add(newTarget);
    }

    this.noteDropperGroup.add(line);
    this.scene.add(this.noteDropperGroup);
  }

  addNote(notePitch, noteTime) {
    let mesh = this.noteMesh.clone();
    let Xposition = this.noteColumns[notePitch].XPosition;
    let Yposition = 0.4;
    mesh.position.set(Xposition, Yposition, 0);
    mesh.name = notePitch + noteTime;
    mesh.pitch = notePitch;
    this.notesToHit[this.noteColumns[notePitch].keyEvent].push(mesh.name);
    this.fallingGroup.add(mesh);
    const targetPosition = new THREE.Vector3(
      Xposition,
      this.targetYPosition,
      0
    );
    // for smooth exit the y coordinate of the exit position must be the same distance from the target as the note's initial position, this allows two tweens to chain together and look like 1 smooth motion while still having an exact target halfway through
    const exitPosition = new THREE.Vector3(
      Xposition,
      this.targetYPosition - (Yposition - this.targetYPosition),
      0
    );
    const fallTween = new TWEEN.Tween(mesh.position)
      .to(targetPosition, fallTime * 1000)
      .onUpdate(function (newPostion) {
        mesh.position.set(newPostion.x, newPostion.y, newPostion.z);
      });
    const exitTween = new TWEEN.Tween(mesh.position)
      .to(exitPosition, fallTime * 1000)
      .onUpdate(function (newPostion) {
        mesh.position.set(newPostion.x, newPostion.y, newPostion.z);
      });
    fallTween.chain(exitTween);
    fallTween.start();
  }

  deleteNote(noteName) {
    for (const key in this.notesToHit) {
      const array = this.notesToHit[key];
      const index = array.indexOf(noteName);
      if (index !== -1) {
        array.splice(index, 1);
        return;
      }
    }
    this.fallingGroup.children.shift();
  }

  checkHit(e) {
    if (this.notesToHit[e.code]){
        const targetResponse = this.noteDropperGroup.getObjectByName(e.code)
        const targetResponseTween = new TWEEN.Tween(new THREE.Vector3(1,1,1))
      .to(new THREE.Vector3(1.7,1.7,1.7), 80)
      targetResponseTween.onUpdate(function (newScale) {
        targetResponse.scale.set(newScale.x, newScale.y, newScale.z);
      })
      targetResponseTween.repeat(1)
      targetResponseTween.yoyo(true)
      targetResponseTween.start()
    }
    if (!this.notesToHit[e.code] || !this.notesToHit[e.code].length) return;

    const noteAttempt = this.scene.getObjectByName(this.notesToHit[e.code][0]);
   
    const noteAttemptWorldPosition = noteAttempt.getWorldPosition(
      new THREE.Vector3()
    );

    const isHit =
      noteAttemptWorldPosition.y < this.targetYPosition + 0.07 &&
      noteAttemptWorldPosition.y > this.targetYPosition - 0.07;

    noteAttempt.material = isHit
      ? this.notePlayedMaterial
      : this.noteMissedMaterial;

    this.notesToHit[e.code] = this.notesToHit[e.code].filter(
      (e) => e !== noteAttempt.name
    );

    return { pitch: noteAttempt.pitch, isHit: isHit };
  }

  setSize(width, height) {

  }
}
