import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from "stats.js";
import NoteDropper from "../NoteDropper.js";
import CharacterSelector from "../CharacterSelector.js";
import playMidiAndMP3 from "../utilities/playMidiAndMP3.js";
import Score from "../Score.js";
import Background from "../Background.js";
import Lights from "../Lights.js";

export default class Game {
  constructor(loadedGltf) {
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
    this.camera.position.z = 1;
    this.camera.position.y = -0.2;

    this.scene = new THREE.Scene();

    this.mixer = new THREE.AnimationMixer(this.scene);

    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.background = new Background(this.scene, loadedGltf, "psych_test");
    this.noteDropper = new NoteDropper();
    this.characterSelector = new CharacterSelector(
      loadedGltf,
      this.scene,
      this.mixer,
      this.noteDropper.noteColumns
    );
    this.selectedCharacter = null;
    this.score = new Score(this.scene, this.camera.position);
    this.lights = new Lights(this.scene);

    this.loadedGltf = loadedGltf;

    // this.stats = new Stats();
    // this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(this.stats.dom);

    this.animation = this.animation.bind(this);
    this.mount = this.mount.bind(this);
    this.resize = this.resize.bind(this);
    this.gameIsPlaying = false;

    this.renderer.setAnimationLoop(this.animation);
    window.game = this;
  }

  hitAttempt(e) {
    if (!this.gameIsPlaying) return;
    let checkedHit = this.noteDropper.checkHit(e);
    if (checkedHit.isHit) {
      this.selectedCharacter.dance(checkedHit.pitch);
      this.score.increase(checkedHit.isHit);
    } else {
      this.selectedCharacter.stumble();
      this.score.breakStreak();
    }
  }

  resize() {
    const container = this.renderer.domElement.parentNode;
    if (container) {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.noteDropper.setSize(width);
      this.score.setSize(width, height);

    }
  }

  loadGraphics(gltfName) {
    this.noteDropper = new NoteDropper(
      this.loadedGltf,
      gltfName,
      this.scene,
      this.camera,
      this.renderer,
      this.score
    );
    this.noteDropper.create();
    this.score.createDisplay();
    this.resize();
  }

  deleteGraphics() {
    if (this.noteDropper.loadedGltf) {
      this.noteDropper = this.noteDropper.delete();
    }
  }

  play(gltfName, midiName, mp3Name) {
    this.gameIsPlaying = true;
    this.deleteGraphics();
    this.loadGraphics(gltfName);
    this.score.reset();
    playMidiAndMP3(this, midiName, mp3Name);
  }

  replay(midiName, mp3Name) {
    this.gameIsPlaying = true
    this.score.reset();
    playMidiAndMP3(this, midiName, mp3Name);
  }

  animation(time) {
    if (!this.renderer.domElement.parentNode) return;
    // this.stats.begin();
    let delta = this.clock.getDelta();
    TWEEN.update();
    this.mixer.update(delta);
    this.characterSelector.characterSelectorGroup.rotateY(0.01)
    this.renderer.render(this.scene, this.camera);
    // this.stats.end();
  }

  mount(container) {
    if (container) {
      this.input = document.querySelector("body");
      this.input.addEventListener("keydown", (e) => this.hitAttempt(e));
      this.input.addEventListener("mousedown", (e) => this.hitAttempt(e));
      window.addEventListener("resize", () => this.resize());
      container.insertBefore(this.renderer.domElement, container.firstChild);
      this.resize();
    } else {
      this.renderer.domElement.remove();
    }
  }
}
