import { Text } from "troika-three-text";
import { MOBILE_BREAKPOINT } from "./constants/constants";

export default class LifeCounter {
  constructor(character, scene, midiAndMp3Player, squisher, cameraController, game) {
    this.character = character;
    this.scene = scene;
    this.midiAndMp3Player = midiAndMp3Player;
    this.squisher = squisher;
    this.cameraController = cameraController
    this.game = game
    this.maxLives = 5;
    this.currentLifeCount = this.maxLives;
    this.isDead = false;
    this.heartsArray = [];
    this.text = new Text();
    this.getHeartsArray();
  }
  createDisplay() {
    this.text.text = `${this.heartsArray.join("")}`;
    this.text.position.x = -0.26;
    this.text.position.y = this.cameraController.gameplayPosition.y + 0.138;
    this.text.position.z = this.cameraController.gameplayPosition.z - 0.4;
    this.text.fontSize = 0.02;
    this.text.anchorX = "left";
    this.text.sync();
    this.scene.add(this.text);
    console.log(this.cameraController.camera)
  }

  async loseLife() {
    if (this.currentLifeCount > 0) {
      this.currentLifeCount -= 1;
      this.heartsArray.pop();
      this.text.text = `${this.heartsArray.join("")}`;
      if (this.currentLifeCount <= 0) {
        this.text.text = `\u{1F480}`; //"💀" unicode character
        this.isDead = true;
        this.game.loseGame()
      }
    }
    this.text.sync();
  }

  getHeartsArray() {
    for (let i = 0; i < this.maxLives; i++) {
      this.heartsArray.push(`\u2665`); //"❤️" unicode chrarcter
    }
  }

  reset() {
    this.heartsArray = [];
    this.currentLifeCount = this.maxLives;
    this.isDead = false;
    this.getHeartsArray();
    this.text.text = `${this.heartsArray.join("")}`;
    this.text.sync();
  }

  setSize(width) {
    if (!this.cameraController) return;
    if (width < MOBILE_BREAKPOINT) {
      this.text.position.x = -0.08;
      this.text.fontSize = 0.012;
      this.text.position.y = this.cameraController.gameplayPosition.y + 0.145;
    } else {
      this.text.position.x = -0.26;
      this.text.position.y = this.cameraController.gameplayPosition.y + 0.138;
      this.text.fontSize = 0.02;
    }
    this.text.sync();
  }

  delete() {
    if (!this.scene) return;
    this.scene.children = this.scene.children.filter(
      (item) => item.id !== this.text.id
    );
  }
}
