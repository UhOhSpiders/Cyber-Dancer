import * as THREE from "three";
import { Text } from "troika-three-text";
import { keyCodes } from "./constants/constants";
import { getColumnXPositions } from "./utilities/getColumnXPositions";
import { assignNotesToColumns } from "./utilities/assignNotesToColumns.js";
import { createFallTween } from "./utilities/tweens/createFallTween.js";
import { createScalePulseTween } from "./utilities/tweens/createScalePulseTween.js";

export default class NoteDropper {
  constructor(loadedGltf, gltfName, scene, camera, renderer, score) {
    this.loadedGltf = loadedGltf;
    this.gltfName = gltfName;
    this.width = 0.5;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.score = score;
    this.hitMargin = { upper: 0.07, lower: -0.07 };
    this.noteStartPosition = new THREE.Vector3(0, 0.2, 0.5);
    this.noteTargetPosition = new THREE.Vector3(0, -0.35, 0.5);
    this.keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
    this.notesToHit = this.keys.reduce(
      (acc, curr) => ((acc[curr] = []), acc),
      {}
    );

    this.noteDropperGroup = new THREE.Group();
    this.fallingGroup = new THREE.Group();
    this.textGroup = new THREE.Group();

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
      transparent: true,
      opacity: 0.5,
    });
    this.noteMesh = new THREE.Mesh(this.noteGeometry, this.noteMaterial);
    this.noteScale = new THREE.Vector3(0.2, 0.2, 0.2);
    this.targetMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.02, 8),
      new THREE.MeshPhongMaterial({ color: "blue" })
    );
    this.targetMeshScale = new THREE.Vector3(0.2, 0.2, 0.2);
    this.raycaster = new THREE.Raycaster();
  }
  create() {
    let customNoteMesh = this.loadedGltf.scene.getObjectByName(
      `${this.gltfName}_note`
    );
    this.noteMesh = customNoteMesh ? customNoteMesh : this.noteMesh;

    let customTargetMesh = this.loadedGltf.scene.getObjectByName(
      `${this.gltfName}_target`
    );
    this.targetMesh = customTargetMesh ? customTargetMesh : this.targetMesh;
    this.targetMesh.scale.set(
      this.targetMeshScale.x,
      this.targetMeshScale.y,
      this.targetMeshScale.z
    );
    // turn this into an add targets function
    for (let step = 0; step < this.columnXPositions.length; step++) {
      let newTarget = this.targetMesh.clone();
      let text = new Text();
      this.textGroup.add(text);
      this.scene.add(this.textGroup);
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
    mesh.scale.set(this.noteScale.x, this.noteScale.y, this.noteScale.z);
    mesh.position.set(
      this.noteStartPosition.x,
      this.noteStartPosition.y,
      this.noteStartPosition.z
    );

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

  deleteNote() {
    this.fallingGroup.children.shift();
  }

  checkClick(e) {
    const element = this.renderer.domElement;
    const rect = element.getBoundingClientRect();

    const offsetX = rect.left;
    const offsetY = rect.top;

    const coords = new THREE.Vector2(
      ((e.clientX - offsetX) / element.clientWidth) * 2 - 1,
      -(((e.clientY - offsetY) / element.clientHeight) * 2 - 1)
    );

    this.raycaster.setFromCamera(coords, this.camera);

    const intersections = this.raycaster.intersectObject(
      this.noteDropperGroup,
      true
    );
    if (intersections.length > 0) {
      return intersections[0].object.parent.name;
    } else return false;
  }

  checkHit(e) {
    let keyCode = e.type === "mousedown" ? this.checkClick(e) : e.code;

    if (this.notesToHit[keyCode]) {
      const targetResponse = this.noteDropperGroup.getObjectByName(keyCode);
      const targetResponseTween = createScalePulseTween(
        targetResponse,
        this.targetMeshScale
      );
      targetResponseTween.start();
    }
    if (!this.notesToHit[keyCode] || !this.notesToHit[keyCode].length)
      return { isHit: false };

    const noteAttempt = this.scene.getObjectByName(this.notesToHit[keyCode][0]);
    const noteAttemptWorldPosition = noteAttempt.getWorldPosition(
      new THREE.Vector3()
    );

    const isHit =
      noteAttemptWorldPosition.y <
        this.noteTargetPosition.y + this.hitMargin.upper &&
      noteAttemptWorldPosition.y >
        this.noteTargetPosition.y + this.hitMargin.lower;

    noteAttempt.material = isHit
      ? this.notePlayedMaterial
      : this.noteMissedMaterial;

    this.notesToHit[keyCode] = this.notesToHit[keyCode].filter(
      (e) => e !== noteAttempt.name
    );
    return { pitch: noteAttempt.pitch, isHit: isHit };
  }

  forceMiss(noteName) {
    for (const key in this.notesToHit) {
      const array = this.notesToHit[key];
      const index = array.indexOf(noteName);
      if (index !== -1) {
        this.score.breakStreak();
        array.splice(index, 1);
      }
    }
  }
  setSize(width) {
    if (width < 800) {
      this.noteDropperGroup.scale.set(0.45, 0.45, 0.45);
      this.noteDropperGroup.position.set(0, -0.27, 0);
      this.noteDropperGroup.children.forEach((item) => {
        if (item.userData.name && item.userData.name.includes("target")) {
          item.scale.set(0.4,0.4,0.4)
        }
      });
      this.targetMeshScale = new THREE.Vector3(0.4, 0.4, 0.4);
      this.noteStartPosition = new THREE.Vector3(0, 1, 0.5);
      this.noteScale = new THREE.Vector3(0.5, 0.5, 0.5);
      this.hitMargin = { upper: 0.04, lower: -0.4 };
      this.textGroup.visible = false;
    }
    else {
      this.noteDropperGroup.scale.set(1, 1, 1);
      this.noteDropperGroup.position.set(0, 0, 0);
      this.noteStartPosition = new THREE.Vector3(0, 0.2, 0.5);
      this.noteDropperGroup.children.forEach((item) => {
        if (item.userData.name && item.userData.name.includes("target")) {
          item.scale.set(0.2,0.2,0.2)
        }
      });
      this.targetMeshScale = new THREE.Vector3(0.2, 0.2, 0.2);
      this.noteScale = new THREE.Vector3(0.2, 0.2, 0.2);
      this.hitMargin = { upper: 0.07, lower: -0.07 };
      this.textGroup.visible = true;
    }
  }
}
