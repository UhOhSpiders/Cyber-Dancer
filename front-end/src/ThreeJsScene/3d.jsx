import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
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
    this.scene.background = new THREE.Color(0xfcca03);

    this.mixer = new THREE.AnimationMixer(this.scene);

    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.background = new Background(this.scene, loadedGltf, "psych_test");
    this.noteDropper = new NoteDropper();
    this.characterSelector = new CharacterSelector(
      loadedGltf,
      this.scene,
      this.mixer,
      this.noteDropper.noteColumns,
      this.selectedCharacter
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

    this.renderer.setAnimationLoop(this.animation);
    window.game = this;
  }

  resize() {
    const container = this.renderer.domElement.parentNode;
    if (container) {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      // add note dropper resize in here too
      this.noteDropper.setSize(width);
      this.score.setSize(width, height)
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
    this.input = document.querySelector("body");
    this.input.addEventListener("keydown", (e) => this.hitAttempt(e));
    this.input.addEventListener("mousedown", (e) => this.hitAttempt(e));
    this.score.createDisplay();
    this.resize()
  }

  hitAttempt(e) {
    let checkedHit = this.noteDropper.checkHit(e);
    if (checkedHit.isHit) {
      this.selectedCharacter.dance(checkedHit.pitch);
      this.score.increase(checkedHit.isHit);
    } else {
      this.selectedCharacter.stumble();
      this.score.breakStreak();
    }
  }

  play(midi, gltfName) {
    this.loadGraphics(gltfName);
    playMidiAndMP3(midi, this);
  }

  replay(midi) {
    this.score.reset();
    playMidiAndMP3(midi, this);
  }

  animation(time) {
    // do not render if not in DOM:
    if (!this.renderer.domElement.parentNode) return;
    // this.stats.begin();
    let delta = this.clock.getDelta();
    TWEEN.update();
    this.mixer.update(delta);
    this.renderer.render(this.scene, this.camera);
    // this.stats.end();
  }

  mount(container) {
    if (container) {
      window.addEventListener("resize", () => this.resize());
      container.insertBefore(this.renderer.domElement, container.firstChild);
      this.resize();
    } else {
      this.renderer.domElement.remove();
    }
  }
}
