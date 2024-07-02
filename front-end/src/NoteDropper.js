import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Text } from "troika-three-text";
import { keyCodes } from "./constants/constants";
import { getColumnXPositions } from "./utilities/getColumnXPositions";
import { fallTime } from "./constants/constants.js";
import { assignNotesToColumns } from "./utilities/assignNotesToColumns.js";

export default class NoteDropper {
  constructor(loadedGltf, gltfName, width, scene, camera) {
    this.loadedGltf = loadedGltf
    this.gltfName = gltfName
    this.width = width;
    this.scene = scene;
    this.camera = camera;
    this.keys = ["KeyA", "KeyS", "KeyD", "KeyF","KeyG"];
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
    this.noteGeometry = new THREE.BoxGeometry();
    this.noteMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    this.notePlayedMaterial = new THREE.MeshBasicMaterial({
      color: "green",
    });
    this.noteMissedMaterial = new THREE.MeshBasicMaterial({
      color: "grey",
    });
    this.noteMesh = new THREE.Mesh(this.noteGeometry, this.noteMaterial);
    this.targetMesh = new THREE.Mesh(new THREE.CircleGeometry(0.02, 8), new THREE.MeshPhongMaterial({ color: "blue" }))
  }
  create() {
    let customNoteMesh = this.loadedGltf.scene.getObjectByName(`${this.gltfName}_note`)
    this.noteMesh = customNoteMesh ? customNoteMesh : this.noteMesh
    this.noteMesh.scale.set(0.2,0.2,0.2)

    let customTargetMesh = this.loadedGltf.scene.getObjectByName(`${this.gltfName}_target`)
    this.targetMesh = customTargetMesh ? customTargetMesh : this.targetMesh
    this.targetMesh.scale.set(0.2,0.2,0.2)
    // turn this into an add targets function
    for (let step = 0; step < this.columnXPositions.length; step++) {
      let newTarget = this.targetMesh.clone();
      let text = new Text();
      this.noteDropperGroup.add(text);
      text.text = keyCodes[this.keys[step]];
      newTarget.name = this.keys[step]
      text.position.x = this.columnXPositions[step];
      text.position.y = this.targetYPosition;
      text.color = "green";
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
    // turn this into a createFallTween function
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
      // turn this into a hitTween function
        const targetResponse = this.noteDropperGroup.getObjectByName(e.code)
        const targetResponseTween = new TWEEN.Tween(new THREE.Vector3(0.2,0.2,0.2))
      .to(new THREE.Vector3(0.5,0.5,0.5), 80)
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
