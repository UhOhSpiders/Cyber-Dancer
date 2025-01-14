import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Stats from "stats.js";
import NoteDropper from "../NoteDropper.js";
import CharacterSelector from "../CharacterSelector.js";
import Score from "../Score.js";
import Background from "../Background.js";
import LightController from "../LightController.js";
import LifeCounter from "../LifeCounter.js";
import MidiAndMp3Player from "../MidiAndMp3Player.js";
import Squisher from "../Squisher.js";
import CameraController from "../CameraController.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { COMBO_COLORS } from "../constants/constants";


export default class Game {
  constructor(loadedGltf) {
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);

    this.scene = new THREE.Scene();
    this.cameraController = new CameraController(this.camera, this.scene);

    this.mixer = new THREE.AnimationMixer(this.scene);

    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    // post processing effects
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      1.5,
      3.68
    );

    this.bloomPass.enabled = true;
    this.bloomPass.renderToScreen = true;
    this.composer.addPass(this.bloomPass);

    this.outputPass = new OutputPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight)
    );
    this.composer.addPass(this.outputPass);

    this.background = new Background(this.scene, loadedGltf, "psych_test");
    this.squisher = new Squisher(loadedGltf, this.scene);
    this.noteDropper = new NoteDropper();
    this.midiAndMp3Player = new MidiAndMp3Player();
    this.selectedCharacter = null;
    this.characterSelector = new CharacterSelector(
      loadedGltf,
      this.scene,
      this.mixer,
      this.selectedCharacter
    );
    this.score = new Score();
    this.lifeCounter = new LifeCounter();
    this.lights = new LightController(this.scene);

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

  hitAttempt(e) {
    if (!this.gameIsPlaying) return;
    let checkedHit = this.noteDropper.checkHit(e);
    if (checkedHit.isHit) {
      this.selectedCharacter.dance(checkedHit.name);
      this.lifeCounter.reset();
      this.score.increase(checkedHit);
      if (this.score.streakMultiplier >= 2 && !this.lights.streakLightsActive) {
        this.lights.triggerStreakLights();
        this.noteDropper.toggleGlowEffect();
      }
      let colorHex = "0x" + COMBO_COLORS[this.score.streakMultiplier - 1].slice(1)
      this.noteDropper.note.glowingMaterial.emissive.setHex(colorHex)
      this.noteDropper.note.glowingMaterial.emissiveIntensity = 2 * this.score.streakMultiplier;
    } else {
      this.miss();
    }
  }

  miss() {
    this.selectedCharacter.stumble();
    this.lifeCounter.loseLife();
    if (this.score.streakMultiplier >= 2) {
      this.noteDropper.toggleGlowEffect();
    }
    this.score.breakStreak();
    this.lights.reset();
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
      this.composer.setSize(width, height);
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
    this.lifeCounter = new LifeCounter(this);
    this.noteDropper = new NoteDropper(
      this.loadedGltf,
      mapName,
      this.scene,
      this.camera,
      this.renderer,
      this.score,
      this.lifeCounter,
      this
    );
    this.loadGraphics(mapName);
    this.gameIsPlaying = true;
    this.selectedCharacter.object3D.visible = true;
    this.selectedCharacter.startLoopingDance();
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
    this.selectedCharacter.startLoopingDance();
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

  levelComplete() {
    const playerStoppedEvent = new CustomEvent("playerStopped", {
      detail: {
        scoreDetails: this.score.getScoreDetails(),
        isDead: this.lifeCounter.isDead,
      },
    });
    this.gameIsPlaying = false;
    this.lights.reset();
    this.selectedCharacter.stopLoopingDance();
    document.dispatchEvent(playerStoppedEvent);
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
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
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
