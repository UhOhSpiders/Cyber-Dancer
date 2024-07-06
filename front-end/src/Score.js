import { Text } from "troika-three-text";

export default class Score {
  constructor(scene, cameraPosition) {
    this.scene = scene;
    this.cameraPosition = cameraPosition;
    this.total = 0;
    this.text = new Text();
  }
  createDisplay() {
    this.text.text = this.total;
    this.text.position.x = this.cameraPosition.x + 0.17;
    this.text.position.y = this.cameraPosition.y + 0.15;
    this.text.position.z = this.cameraPosition.z - 0.4
    this.text.fontSize = 0.04
    this.text.sync();
    this.scene.add(this.text);
  }
  increase() {
    this.total += 1;
    this.text.text = this.total;
    this.text.sync();
  }
  breakStreak() {
    console.log("streak broken");
  }
  reset() {
    this.total = 0;
    this.text.text = this.total;
    this.text.sync();
  }
}
