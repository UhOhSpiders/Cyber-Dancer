import { Text } from "troika-three-text";
import { MOBILE_BREAKPOINT } from "./constants/constants";

export default class Score {
  constructor(scene, cameraPosition) {
    this.scene = scene;
    this.cameraPosition = cameraPosition;
    this.scoreDetails = { total: 0, notesMissed: 0, allStreaks: [] };
    this.currentStreak = 0;
    this.streakMultiplier = 1;
    this.text = new Text();
  }
  createDisplay() {
    this.text.text = this.scoreDetails.total;
    this.text.position.y = this.cameraPosition.y + 0.15;
    this.text.position.z = this.cameraPosition.z - 0.4;
    this.text.fontSize = 0.04;
    this.text.anchorX = "right";
    this.text.sync();
    this.scene.add(this.text);
  }
  increase(checkedHit) {
    this.currentStreak += 1;
    this.setStreakMultiplier()
    this.scoreDetails.total += (checkedHit.isPerfect ? 2 : 1) * this.streakMultiplier;
    this.text.text = this.scoreDetails.total
    this.text.sync();
  }

  setStreakMultiplier() {
    if (this.currentStreak < 50) {
      this.streakMultiplier = Math.floor(this.currentStreak / 10 + 1);
    }
  }
  breakStreak() {
    this.scoreDetails.allStreaks.push(this.currentStreak);
    this.currentStreak = 0;
    this.scoreDetails.notesMissed += 1;
  }
  reset() {
    this.scoreDetails = { total: 0, notesMissed: 0, allStreaks: [] };
    this.currentStreak = 0;
    this.text.text = this.scoreDetails.total;
    this.text.sync();
  }
  getScoreDetails() {
    this.scoreDetails.allStreaks.push(this.currentStreak);
    return this.scoreDetails;
  }

  setSize(width) {
    if (width < MOBILE_BREAKPOINT) {
      this.text.position.x = this.cameraPosition.x + 0.065;
      this.text.fontSize = 0.02;
      this.text.sync();
    } else {
      this.text.position.x = this.cameraPosition.x + 0.25;
      this.text.fontSize = 0.03;
    }
  }
}
