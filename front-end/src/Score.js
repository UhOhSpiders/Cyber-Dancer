import { Text } from "troika-three-text";

export default class Score {
  constructor(scene) {
    this.scene = scene;
    this.total = 0;
    this.text = new Text();
  }
  createDisplay() {
    this.text.text = this.total;
    this.text.position.x = 1;
    this.text.position.y = 0.6;
    this.text.position.z = -0.8;
    this.text.sync();
    this.scene.add(this.text);
  }
  increase(isHit) {
    if (isHit) {
      this.total += 1;
      this.text.text = this.total;
      this.text.sync();
    } else {
      this.breakStreak();
    }
  }
  breakStreak() {
    console.log("streak broken");
  }
  reset() {
    this.total = 0;
    this.text.text = this.total;
    this.text.position.x = 1;
    this.text.position.y = 0.6;
    this.text.position.z = -0.8;
    this.text.sync();
  }
}
