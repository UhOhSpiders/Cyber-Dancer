export default class LifeCounter {
  constructor(
    character,
    scene,
    midiAndMp3Player,
    squisher,
    cameraController,
    game
  ) {
    this.character = character;
    this.scene = scene;
    this.midiAndMp3Player = midiAndMp3Player;
    this.squisher = squisher;
    this.cameraController = cameraController;
    this.game = game;
    this.maxLives = 8;
    this.currentLifeCount = this.maxLives;
    this.isDead = false;
  }

  async loseLife() {
    if (this.currentLifeCount > 0) {
      this.currentLifeCount -= 1;
      this.dispatchLifeCounterEvent();
      if (this.currentLifeCount <= 0) {
        this.isDead = true;
        this.game.loseGame();
      }
    }
  }

  dispatchLifeCounterEvent() {
    const lifeCounterEvent = new CustomEvent("HUDEvent", {
      detail: {
        key: "lifeCounter",
        lifeCountPercentage: (this.currentLifeCount / this.maxLives) * 100,
        barColor: "red",
        barBackgroundColor: "pink",
      },
    });
    document.dispatchEvent(lifeCounterEvent);
  }

  gainLife() {
    if (this.currentLifeCount < this.maxLives) {
      this.currentLifeCount += 1;
    }
  }

  reset() {
    this.currentLifeCount = this.maxLives;
    this.isDead = false;
    this.dispatchLifeCounterEvent()
  }
}
