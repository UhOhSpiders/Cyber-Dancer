import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { assignDanceMovesToNotes } from "../utilities/assignDanceMovesToNotes.js";
import Stats from "stats.js";
import Character from "../character.js";
import NoteDropper from "../NoteDropper.js";
import { loadGltf } from "../utilities/loadGltf.js";

export default class Game {
  constructor() {
    this.noteDropperWidth = 0.7;
    this.danceMoves = [];
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.light = new THREE.HemisphereLight(0x1c51ff, 0xff3bba, 6);
    this.scene.add(this.light);
    this.mixer = new THREE.AnimationMixer(this.scene);
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.noteDropper = new NoteDropper();

    window.addEventListener("resize", () => this.resize());
    this.input = document.querySelector("body");
    this.input.addEventListener("keydown", (e) => this.hitKey(e));

    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    this.animation = this.animation.bind(this);
    this.mount = this.mount.bind(this);
    this.resize = this.resize.bind(this);

    this.resize();

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
      this.noteDropper.setSize(width, height);
    }
  }

  loadGraphics(position, gltfName) {
    loadGltf(gltfName).then((loadedGltf) => {
      let character = new Character(
        loadedGltf,
        gltfName,
        position,
        this.scene,
        this.mixer
      );
      character.create().then(() => {
        // move this to inside of the character class
        this.danceMoves = assignDanceMovesToNotes(
          gltfName,
          this.scene,
          this.mixer,
          this.noteDropper.noteColumns
        );
      });
      this.noteDropper = new NoteDropper(
        loadedGltf,
        gltfName,
        this.noteDropperWidth,
        this.scene,
        this.camera
      );
      this.noteDropper.create();
    });
  }

  dance(notePitch, isHit) {
    if (isHit) {
      let danceMove = this.danceMoves[notePitch].danceMove;
      danceMove.stop();
      danceMove.play();
    } else {
      // play stumble animation
    }
  }

  hitKey(e) {
    let checkedHit = this.noteDropper.checkHit(e);
    if (checkedHit) {
      this.dance(checkedHit.pitch, checkedHit.isHit);
    }
  }

  animation(time) {
    // do not render if not in DOM:
    if (!this.renderer.domElement.parentNode) return;
    this.stats.begin();
    let delta = this.clock.getDelta();
    TWEEN.update();
    this.mixer.update(delta);
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  }

  mount(container) {
    // try putting event listener setup in here
    if (container) {
      container.insertBefore(this.renderer.domElement, container.firstChild);
      this.resize();
    } else {
      this.renderer.domElement.remove();
    }
  }
}
