import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { MIDI_SCALE_X_POSITIONS } from "../constants/constants";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer, mixer, clock, light;
let noteBlockGeometry,
  noteBlockMaterial,
  noteBlockPlayedMaterial,
  noteBlockMissedMaterial,
  fleshMaterial,
  noteBlockMesh,
  lineMaterial,
  lineGeometry,
  line;
let linePoints = [];
let fallingGroup, fallSpeed, leftHandAction, rightHandAction;
init();
let KeyWNotesToHit = [];
let KeyANotesToHit = [];
let KeySNotesToHit = [];
let KeyDNotesToHit = [];

const input = document.querySelector("body");
input.addEventListener("keydown", hitKey);
function init() {
  camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  noteBlockGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
  noteBlockMaterial = new THREE.MeshBasicMaterial({ color: "red" });
  noteBlockPlayedMaterial = new THREE.MeshBasicMaterial({ color: "green" });
  noteBlockMissedMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
  noteBlockMesh = new THREE.Mesh(noteBlockGeometry, noteBlockMaterial);
  fallingGroup = new THREE.Group();
  fallingGroup.add(noteBlockMesh);
  fallingGroup.position.set(0, 0, 0);
  scene.add(fallingGroup);

  fleshMaterial = new THREE.MeshPhongMaterial({ color: "darkorange" });

  lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  linePoints.push(new THREE.Vector3(1, 0, 0));
  linePoints.push(new THREE.Vector3(-1, 0, 0));
  lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  line = new THREE.Line(lineGeometry, lineMaterial);
  line.position.y = -0.25;
  scene.add(line);

  light = new THREE.PointLight(0x404040, 400);
  scene.add(light);
  mixer = new THREE.AnimationMixer(scene);
  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setAnimationLoop(animation);
  fallSpeed = 0.3;
  const loader = new GLTFLoader();

  loader.load(
    "/ddrman.gltf",
    function (gltf) {
      gltf.scene.name = "drrman";
      gltf.scene.children[0].children[0].material = fleshMaterial;
      gltf.scene.position.z = -5;
      gltf.scene.position.y = -2;
      gltf.scene.position.x = -1;
      gltf.scene.animations = gltf.animations;
      const idleClip = THREE.AnimationClip.findByName(
        gltf.scenes[0].animations,
        "idle"
      );
      const leftHandClip = THREE.AnimationClip.findByName(
        gltf.scenes[0].animations,
        "left_hand"
      );
      const rightHandClip = THREE.AnimationClip.findByName(
        gltf.scenes[0].animations,
        "right_hand"
      );
      const idleAction = mixer.clipAction(idleClip);
      leftHandAction = mixer.clipAction(leftHandClip);
      rightHandAction = mixer.clipAction(rightHandClip);
      leftHandAction.setLoop(THREE.LoopOnce);
      rightHandAction.setLoop(THREE.LoopOnce);
      idleAction.loop = THREE.LoopPingPong;
      scene.add(gltf.scenes[0]);
      idleAction.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function getNewCubeXPosition(noteName) {
  if (MIDI_SCALE_X_POSITIONS[noteName]) {
    return MIDI_SCALE_X_POSITIONS[noteName];
  } else return 0;
}

// function screenToWorld() {
//   const coords = new THREE.Vector3(
//       (500/window.innerWidth) * 2 - 1,
//       -(500/window.innerHeight) * 2 + 1,
//       1
//   )
//   const worldPosition = new THREE.Vector3()
//   const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1))
//   const raycaster = new THREE.Raycaster()
//   raycaster.setFromCamera(coords, camera)
//   let targetCoords = raycaster.ray.intersectPlane(plane, worldPosition)
//   let newNoteBlock = noteBlockMesh.clone();
//   newNoteBlock.position.set(targetCoords.x, targetCoords.y, targetCoords.z);
//   console.log(newNoteBlock.position)
//   return raycaster.ray.intersectPlane(plane, worldPosition)
// }

export function addCube(noteName, noteTime) {
  let newNoteBlock = noteBlockMesh.clone();
  let Xposition = getNewCubeXPosition(noteName);
  let Yposition = 0.4 - fallingGroup.position.y;
  newNoteBlock.position.set(Xposition, Yposition, 0);
  newNoteBlock.name = noteName + noteTime;
  newNoteBlock.timeCreated = clock.elapsedTime;
  fallingGroup.add(newNoteBlock);
  KeyWNotesToHit.push(newNoteBlock.name);

  // animate fall
  const targetPosition = new THREE.Vector3(Xposition, -0.25, 0);
  // for smooth exit the y coordinate of the exit position must be the same distance from the target as the note's initial position
  const exitPosition = new THREE.Vector3(Xposition, -0.9, 0);
  const fallTween = new TWEEN.Tween(newNoteBlock.position)
    .to(targetPosition, 2000)
    .onUpdate(function (newPostion) {
      newNoteBlock.position.set(newPostion.x, newPostion.y, newPostion.z);
    });
  const exitTween = new TWEEN.Tween(newNoteBlock.position)
    .to(exitPosition, 2000)
    .onUpdate(function (newPostion) {
      newNoteBlock.position.set(newPostion.x, newPostion.y, newPostion.z);
    });
  fallTween.chain(exitTween)
  fallTween.start();
}

export function dance(noteName) {
  if (noteName.includes("#") || noteName.includes("A")) {
    leftHandAction.stop();
    leftHandAction.play();
  } else {
    rightHandAction.stop();
    rightHandAction.play();
  }
}

export function playNote(noteName, noteTime) {
  let objectName = noteName + noteTime;
  // let noteToChange = scene.getObjectByName(objectName);
  // let worldPosition = noteToChange.getWorldPosition(new THREE.Vector3());
  // console.log(worldPosition.y)
}

function hitKey(e) {
  if (e.code == "KeyW" && KeyWNotesToHit.length) {
    let noteAttempt = scene.getObjectByName(KeyWNotesToHit[0]);
    let noteAttemptWorldPosition = noteAttempt.getWorldPosition(
      new THREE.Vector3()
    );
    if (
      noteAttemptWorldPosition.y < -0.2 &&
      noteAttemptWorldPosition.y > -0.6
    ) {
      noteAttempt.material = noteBlockPlayedMaterial;
      console.log(
        "hit!" + KeyWNotesToHit[0] + "at" + noteAttemptWorldPosition.y
      );
      dance(KeyWNotesToHit[0]);
      KeyWNotesToHit = KeyWNotesToHit.filter((e) => e !== noteAttempt.name);
    } else {
      console.log("miss!");
      noteAttempt.material = noteBlockMissedMaterial;
      KeyWNotesToHit = KeyWNotesToHit.filter((e) => e !== noteAttempt.name);
    }
  }
}

export function deleteNote(noteName) {
  // need to add logic here to remove item from the correct notes to hit arrays once the correct midi track is in place
  // KeyWNotesToHit.shift();
  KeyWNotesToHit = KeyWNotesToHit.filter((e) => e !== noteName);
  fallingGroup.children.shift();
}

// takes 2d pixel value and returns a 3d vector (world position)
function to3d(pixelX, pixelY) {
  pixelX = (window.innerWidth * (pixelX + 1)) / 2;
  pixelY = (-window.innerHeight * (pixelY - 1)) / 2;
  let vector3position = new THREE.Vector3(x, y, -1).unproject(camera);
  console.log(vector3position);
}



function animation(time) {
  // do not render if not in DOM:

  if (!renderer.domElement.parentNode) return;
  let delta = clock.getDelta();
  TWEEN.update();
  mixer.update(delta);
  renderer.render(scene, camera);
}

// respond to size changes:

function resize() {
  const container = renderer.domElement.parentNode;

  if (container) {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

window.addEventListener("resize", resize);

resize();

// expose a function to interact with react.js:

export default function mount(container) {
  if (container) {
    container.insertBefore(renderer.domElement, container.firstChild);
    resize();
  } else {
    renderer.domElement.remove();
  }
}
