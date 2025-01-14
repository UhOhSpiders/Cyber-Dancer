import * as THREE from "three";
import {
  HIT_MARGIN,
  NOTE_DROPPER_GROUP_POSITION,
  NOTE_DROPPER_GROUP_SCALE,
  NOTE_SCALE,
  NOTE_START_POSITION,
  MOBILE_BREAKPOINT,
  TARGET_SCALE,
} from "./constants/constants";
import { getColumnXPositions } from "./utilities/getColumnXPositions";
import { assignNotesToColumns } from "./utilities/assignNotesToColumns.js";
import { createScalePulseTween } from "./utilities/tweens/createScalePulseTween.js";
import Note from "./Note.js";
import NoteTarget from "./NoteTarget.js";
import { getHitDetails } from "./utilities/getHitDetails.js";
import HitText from "./HitText.js";

export default class NoteDropper {
  constructor(
    loadedGltf,
    gltfName,
    scene,
    camera,
    renderer,
    score,
    lifeCounter,
    game
  ) {
    this.loadedGltf = loadedGltf;
    this.gltfName = gltfName;
    this.width = 0.5;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.score = score;
    this.lifeCounter = lifeCounter;
    this.game = game;
    this.hitMargin = HIT_MARGIN.DESKTOP;
    this.noteStartPosition = NOTE_START_POSITION.DESKTOP;
    this.noteTargetPosition = new THREE.Vector3(0, -0.35, 0.5);
    this.keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
    this.notesToHit = this.keys.reduce(
      (acc, curr) => ((acc[curr] = []), acc),
      {}
    );

    this.noteDropperGroup = new THREE.Group();
    this.fallingGroup = new THREE.Group();
    this.fallingGroup.name = "falling group";
    this.textGroup = new THREE.Group();

    this.noteDropperGroup.add(this.fallingGroup);
    this.columnXPositions = getColumnXPositions(this.width, this.keys.length);
    this.noteColumns = assignNotesToColumns(this.columnXPositions, this.keys);

    this.raycaster = new THREE.Raycaster();

    this.note = new Note(null, this.fallingGroup, this.scene);
    this.hitText = new HitText(this.scene);
    this.noteTarget = null;
  }
  create() {
    this.note = new Note(
      this.loadedGltf,
      this.fallingGroup,
      this.scene,
      this.gltfName
    );
    this.noteTarget = new NoteTarget(
      this.loadedGltf,
      this.noteDropperGroup,
      this.textGroup,
      this.gltfName
    );
    for (let step = 0; step < this.columnXPositions.length; step++) {
      const position = new THREE.Vector3(
        this.columnXPositions[step],
        this.noteTargetPosition.y,
        this.noteTargetPosition.z
      );
      this.noteTarget.create(position, this.keys[step]);
    }
    this.scene.add(this.textGroup);
    this.scene.add(this.noteDropperGroup);
  }

  delete() {
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.noteDropperGroup.id
    );
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.textGroup.id
    );
    return null;
  }

  reset() {
    this.note.hasGlowEffect = false;
    this.notesToHit = this.keys.reduce(
      (acc, curr) => ((acc[curr] = []), acc),
      {}
    );
  }

  addNote(notePitch, noteTime) {
    const { XPosition, keyEvent } = this.noteColumns[notePitch];
    const targetPosition = new THREE.Vector3(
      XPosition,
      this.noteTargetPosition.y,
      this.noteTargetPosition.z
    );
    const notePosition = new THREE.Vector3(
      XPosition,
      this.noteStartPosition.y,
      this.noteStartPosition.z
    );
    const noteName = this.note.add(
      notePosition,
      targetPosition,
      notePitch,
      noteTime
    );
    this.notesToHit[keyEvent].push(noteName);
  }

  deleteNote() {
    this.fallingGroup.children.shift();
  }

  toggleGlowEffect(){
    this.note.hasGlowEffect = !this.note.hasGlowEffect
    this.fallingGroup.children.forEach((fallingNote) => {
      fallingNote.material = this.note.hasGlowEffect ? this.note.glowingMaterial : fallingNote.material;
    })
  }

  checkTouch(e) {
    const coords = this.getNormalizedDeviceCoordinates(e);
    const intersections = this.getIntersections(coords, this.noteDropperGroup);
    return intersections.length > 0
      ? intersections[0].object.parent.name
      : false;
  }

  getNormalizedDeviceCoordinates(e) {
    const element = this.renderer.domElement;
    const rect = element.getBoundingClientRect();
    const offsetX = rect.left;
    const offsetY = rect.top;

    return new THREE.Vector2(
      ((e.clientX - offsetX) / element.clientWidth) * 2 - 1,
      -(((e.clientY - offsetY) / element.clientHeight) * 2 - 1)
    );
  }

  getIntersections(coords, targetGroup) {
    this.raycaster.setFromCamera(coords, this.camera);
    return this.raycaster.intersectObject(targetGroup, true);
  }

  checkHit(e) {
    let keyCode = e.type === "touchstart" ? this.checkTouch(e) : e.code;

    if (this.notesToHit[keyCode]) {
      const targetResponse = this.noteDropperGroup.getObjectByName(keyCode);
      targetResponse.tween.stop();
      targetResponse.tween.start();
    }
    if (!this.notesToHit[keyCode] || !this.notesToHit[keyCode].length)
      return false;

    const noteAttempt = this.scene.getObjectByName(this.notesToHit[keyCode][0]);

    const hitDetails = getHitDetails(
      noteAttempt,
      this.hitMargin,
      this.noteTargetPosition
    );

    hitDetails.isHit
      ? this.note.hit(noteAttempt, hitDetails)
      : this.note.miss(noteAttempt);

    this.hitText.triggerText(hitDetails);

    this.notesToHit[keyCode] = this.notesToHit[keyCode].filter(
      (e) => e !== noteAttempt.name
    );

    return hitDetails;
  }

  forceMiss(noteName) {
    for (const key in this.notesToHit) {
      const array = this.notesToHit[key];
      const index = array.indexOf(noteName);
      if (index !== -1) {
        this.game.miss()
        array.splice(index, 1);
      }
    }
  }

  setSize(width) {
    if (width < MOBILE_BREAKPOINT) {
      this.noteDropperGroup.scale.set(
        NOTE_DROPPER_GROUP_SCALE.MOBILE.x,
        NOTE_DROPPER_GROUP_SCALE.MOBILE.y,
        NOTE_DROPPER_GROUP_SCALE.MOBILE.z
      );
      this.noteDropperGroup.position.set(
        NOTE_DROPPER_GROUP_POSITION.MOBILE.x,
        NOTE_DROPPER_GROUP_POSITION.MOBILE.y,
        NOTE_DROPPER_GROUP_POSITION.MOBILE.z
      );
      this.targetMeshScale = TARGET_SCALE.MOBILE;
      this.noteDropperGroup.children.forEach((item) => {
        if (item.userData.name && item.userData.name.includes("target")) {
          item.scale.set(
            this.targetMeshScale.x,
            this.targetMeshScale.y,
            this.targetMeshScale.z
          );
          item.tween = createScalePulseTween(item, this.targetMeshScale);
        }
      });
      this.noteStartPosition = NOTE_START_POSITION.MOBILE;
      this.note.object3D.scale.set(
        NOTE_SCALE.MOBILE.x,
        NOTE_SCALE.MOBILE.y,
        NOTE_SCALE.MOBILE.z
      );
      this.hitMargin = HIT_MARGIN.MOBILE;
      this.textGroup.visible = false;
    } else {
      this.noteDropperGroup.scale.set(
        NOTE_DROPPER_GROUP_SCALE.DESKTOP.x,
        NOTE_DROPPER_GROUP_SCALE.DESKTOP.y,
        NOTE_DROPPER_GROUP_SCALE.DESKTOP.z
      );
      this.noteDropperGroup.position.set(
        NOTE_DROPPER_GROUP_POSITION.DESKTOP.x,
        NOTE_DROPPER_GROUP_POSITION.DESKTOP.y,
        NOTE_DROPPER_GROUP_POSITION.DESKTOP.z
      );
      this.noteStartPosition = NOTE_START_POSITION.DESKTOP;
      this.targetMeshScale = TARGET_SCALE.DESKTOP;
      this.noteDropperGroup.children.forEach((item) => {
        if (item.userData.name && item.userData.name.includes("target")) {
          item.scale.set(
            this.targetMeshScale.x,
            this.targetMeshScale.y,
            this.targetMeshScale.z
          );
          item.tween = createScalePulseTween(item, this.targetMeshScale);
        }
      });
      this.note.object3D.scale.set(
        NOTE_SCALE.DESKTOP.x,
        NOTE_SCALE.DESKTOP.y,
        NOTE_SCALE.DESKTOP.z
      );
      this.hitMargin = HIT_MARGIN.DESKTOP;
      this.textGroup.visible = true;
    }
  }
}
