import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Stats from "stats.js";
import NoteDropper from "../NoteDropper.js";
import CharacterSelector from "../CharacterSelector.js";
import Score from "../Score.js";
import Background from "../Background.js";
import Lights from "../Lights.js";
import LifeCounter from "../LifeCounter.js";
import MidiAndMp3Player from "../MidiAndMp3Player.js";
import Squisher from "../Squisher.js";
import CameraController from "../CameraController.js";

export default class Game {
  constructor(loadedGltf) {
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);

    this.scene = new THREE.Scene();
    this.cameraController = new CameraController(this.camera, this.scene);

    this.mixer = new THREE.AnimationMixer(this.scene);

    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.background = new Background(this.scene, loadedGltf, "psych_test");
    this.squisher = new Squisher(loadedGltf, this.scene);
    this.noteDropper = new NoteDropper();
    this.midiAndMp3Player = new MidiAndMp3Player();
    this.characterSelector = new CharacterSelector(
      loadedGltf,
      this.scene,
      this.mixer,
      this.noteDropper.noteColumns
    );
    this.selectedCharacter = null;
    this.score = new Score(this.scene, this.cameraController.gameplayPosition);
    this.lifeCounter = new LifeCounter();
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
      this.selectedCharacter.dance(checkedHit.name);
      this.lifeCounter.reset();
      this.score.increase(checkedHit);
    } else {
      this.selectedCharacter.stumble();
      this.lifeCounter.loseLife();
      this.score.breakStreak();
    }
  }

  touchDeviceHitAttempt(e) {
    switch (e.touches.length) {
      case 1:
        e.touches[0].type = "touchstart";
        this.hitAttempt(e.touches[0]);
        break;
      case 2:
        e.touches[0].type = "touchstart";
        e.touches[1].type = "touchstart";
        this.hitAttempt(e.touches[0]);
        this.hitAttempt(e.touches[1]);
        break;
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
    }
  }

  loadGraphics(mapName) {
    this.noteDropper.create();
    this.resize();
  }

  deleteGraphics() {
    if (this.noteDropper.loadedGltf) {
      this.noteDropper = this.noteDropper.delete();
    }
    this.squisher.delete();
  }

  play(mapName, midiName, mp3Name) {
    this.deleteGraphics();
    this.cameraController.craneDown();
    this.midiAndMp3Player = new MidiAndMp3Player(this, midiName, mp3Name);
    this.lifeCounter = new LifeCounter(
      this.selectedCharacter,
      this.scene,
      this.midiAndMp3Player,
      this.squisher,
      this.cameraController,
      this
    );
    this.noteDropper = new NoteDropper(
      this.loadedGltf,
      mapName,
      this.scene,
      this.camera,
      this.renderer,
      this.score,
      this.lifeCounter
    );
    this.loadGraphics(mapName);
    this.gameIsPlaying = true;
    this.selectedCharacter.object3D.visible = true;
    this.score.reset();
    this.lifeCounter.reset();
    this.lights.reset();
    this.noteDropper.reset();
    this.midiAndMp3Player.startTrack();
  }

  replay() {
    this.noteDropper.noteDropperGroup.visible = true;
    this.noteDropper.textGroup.visible = true;
    this.gameIsPlaying = true;
    this.resize();
    this.cameraController.craneDown();
    this.selectedCharacter.object3D.visible = true;
    this.squisher.delete();
    this.score.reset();
    this.lifeCounter.reset();
    this.lights.reset();
    this.noteDropper.reset();
    this.midiAndMp3Player.startTrack();
  }

  loseGame() {
    this.noteDropper.noteDropperGroup.visible = false;
    this.noteDropper.textGroup.visible = false;
    this.lights.triggerDangerLights();
    this.squisher.squish().then(() => {
      this.cameraController.craneUp();
      this.selectedCharacter.explode();
      this.midiAndMp3Player.stopTrack();
    });
  }

  animation(time) {
    if (!this.renderer.domElement.parentNode) return;
    // this.stats.begin();
    let delta = this.clock.getDelta();
    TWEEN.update();
    this.mixer.update(delta);
    this.characterSelector.characterSelectorGroup.rotateY(0.01);
    this.noteDropper.fallingGroup.children.forEach((object3D) => {
      object3D.rotateY(0.07);
    });
    this.renderer.render(this.scene, this.camera);
    // this.stats.end();
  }

  mount(container) {
    if (container) {
      this.input = document.querySelector("body");
      this.input.addEventListener("keydown", (e) => this.hitAttempt(e));
      this.input.addEventListener("touchstart", (e) => {
        this.touchDeviceHitAttempt(e);
      });
      window.addEventListener("resize", () => this.resize());
      container.insertBefore(this.renderer.domElement, container.firstChild);
      this.resize();
    } else {
      this.renderer.domElement.remove();
    }
  }
}
