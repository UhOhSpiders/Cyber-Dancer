import * as THREE from "three";
import { Text } from "troika-three-text";
import { keyCodes } from "./constants/constants";
import { getColumnXPositions } from "./utilities/getColumnXPositions";
import { assignNotesToColumns } from "./utilities/assignNotesToColumns.js";
import { createFallTween } from "./utilities/tweens/createFallTween.js";
import { createScalePulseTween } from "./utilities/tweens/createScalePulseTween.js";

export default class NoteDropper {
  constructor(loadedGltf, gltfName, scene, camera) {
    this.loadedGltf = loadedGltf;
    this.gltfName = gltfName;
    this.width = 0.5;
    this.scene = scene;
    this.camera = camera;
    this.noteStartPosition = new THREE.Vector3(0, 0.2, 0.5);
    this.noteTargetPosition = new THREE.Vector3(0, -0.35, 0.5);
    this.keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
    this.notesToHit = this.keys.reduce(
      (acc, curr) => ((acc[curr] = []), acc),
      {}
    );

    this.noteDropperGroup = new THREE.Group();
    this.fallingGroup = new THREE.Group();
    this.noteDropperGroup.add(this.fallingGroup);
    this.columnXPositions = getColumnXPositions(this.width, this.keys.length);
    this.noteColumns = assignNotesToColumns(this.columnXPositions, this.keys);
    this.noteGeometry = new THREE.BoxGeometry();
    this.noteMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    this.notePlayedMaterial = new THREE.MeshPhongMaterial({
      color: "green",
    });
    this.noteMissedMaterial = new THREE.MeshBasicMaterial({
      color: "grey",
      transparent:true,
      opacity: 0.5
    });
    this.noteMesh = new THREE.Mesh(this.noteGeometry, this.noteMaterial);
    this.targetMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.02, 8),
      new THREE.MeshPhongMaterial({ color: "blue" })
    );
    // this.create()
  }
  create() {
    console.log(this.loadedGltf)
    let customNoteMesh = this.loadedGltf.scene.getObjectByName(
      `${this.gltfName}_note`
    );
    this.noteMesh = customNoteMesh ? customNoteMesh : this.noteMesh;
    this.noteMesh.scale.set(0.2, 0.2, 0.2);
    this.noteMesh.position.set(
      this.noteStartPosition.x,
      this.noteStartPosition.y,
      this.noteStartPosition.z
    );

    let customTargetMesh = this.loadedGltf.scene.getObjectByName(
      `${this.gltfName}_target`
    );
    this.targetMesh = customTargetMesh ? customTargetMesh : this.targetMesh;
    this.targetMesh.scale.set(0.2, 0.2, 0.2);
    // turn this into an add targets function
    for (let step = 0; step < this.columnXPositions.length; step++) {
      let newTarget = this.targetMesh.clone();
      let text = new Text();
      this.noteDropperGroup.add(text);
      text.text = keyCodes[this.keys[step]];
      newTarget.name = this.keys[step];
      text.position.x = this.columnXPositions[step];
      text.position.y = this.noteTargetPosition.y;
      text.position.z = this.noteTargetPosition.z + 0.05;
      text.color = "orange";
      text.anchorX = "center";
      text.anchorY = "middle";
      text.fontSize = 0.03;
      text.sync();
      newTarget.position.set(
        this.columnXPositions[step],
        this.noteTargetPosition.y,
        this.noteTargetPosition.z
      );
      this.noteDropperGroup.add(newTarget);
    }

    this.scene.add(this.noteDropperGroup);
  }

  addNote(notePitch, noteTime) {
    const mesh = this.noteMesh.clone();
    
    const { XPosition, keyEvent } = this.noteColumns[notePitch];
    mesh.position.x = XPosition;
    mesh.name = notePitch + noteTime;
    mesh.pitch = notePitch;
    this.notesToHit[keyEvent].push(mesh.name);
    this.fallingGroup.add(mesh);
    const targetPosition = new THREE.Vector3(
      XPosition,
      this.noteTargetPosition.y,
      this.noteTargetPosition.z
    );
    const fallTween = createFallTween(mesh, targetPosition);
    fallTween.start();
  }

  deleteNote(noteName) {
    for (const key in this.notesToHit) {
      const array = this.notesToHit[key];
      const index = array.indexOf(noteName);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
    this.fallingGroup.children.shift();
  }

  checkHit(e) {
    if (this.notesToHit[e.code]) {
      const targetResponse = this.noteDropperGroup.getObjectByName(e.code);
      const targetResponseTween = createScalePulseTween(targetResponse);
      targetResponseTween.start();
    }
    if (!this.notesToHit[e.code] || !this.notesToHit[e.code].length) return;

    const noteAttempt = this.scene.getObjectByName(this.notesToHit[e.code][0]);
    const noteAttemptWorldPosition = noteAttempt.getWorldPosition(
      new THREE.Vector3()
    );

    const isHit =
      noteAttemptWorldPosition.y < this.noteTargetPosition.y + 0.07 &&
      noteAttemptWorldPosition.y > this.noteTargetPosition.y - 0.07;

    noteAttempt.material = isHit
      ? this.notePlayedMaterial
      : this.noteMissedMaterial;

    this.notesToHit[e.code] = this.notesToHit[e.code].filter(
      (e) => e !== noteAttempt.name
    );

    return { pitch: noteAttempt.pitch, isHit: isHit };
  }

  setSize(width, height) {}
}
