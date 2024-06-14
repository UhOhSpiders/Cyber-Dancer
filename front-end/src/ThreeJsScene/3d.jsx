import * as THREE from "three";
import { MIDI_SCALE_X_POSITIONS } from "../constants/constants";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer, mixer, clock, light;
let geometry, material, playedMaterial, fleshMaterial, mesh;
let fallingGroup, fallSpeed, leftHandAction, rightHandAction;
init();

function init() {
  camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
  material = new THREE.MeshBasicMaterial({ color: "red" });
  playedMaterial = new THREE.MeshBasicMaterial({ color: "green" });
  fleshMaterial = new THREE.MeshPhongMaterial({ color: "darkorange" });
  mesh = new THREE.Mesh(geometry, material);
  fallingGroup = new THREE.Group();
  fallingGroup.add(mesh);
  scene.add(fallingGroup);
  light = new THREE.PointLight(0x404040, 400);
  scene.add(light);
  mixer = new THREE.AnimationMixer(scene);
  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setAnimationLoop(animation);
  fallSpeed = 0.3 
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

export function addCube(noteName, noteTime) {
  let newCube = mesh.clone();
  let Xposition = getNewCubeXPosition(noteName);
  let Yposition = 0.4 - fallingGroup.position.y
  newCube.position.set(Xposition, Yposition, 0);
  
  newCube.name = noteName + noteTime;
  newCube.timeCreated = clock.elapsedTime;
  fallingGroup.add(newCube);
  // console.log(newCube)
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

export function changeColor(noteName, noteTime) {
  let objectName = noteName + noteTime;
  let noteToChange = scene.getObjectByName(objectName);
  noteToChange.material = playedMaterial;
  console.log("life of cube: "+ (clock.elapsedTime - noteToChange.timeCreated ))
  let worldPosition = noteToChange.getWorldPosition(new THREE.Vector3)
  console.log(worldPosition)
}

export function deleteNote() {
  fallingGroup.children.shift();
}

function animation(time) {
  // do not render if not in DOM:

  if (!renderer.domElement.parentNode) return;
  let delta = clock.getDelta()
  fallingGroup.position.y -= fallSpeed * delta

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
