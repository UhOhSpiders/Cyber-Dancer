export default class HitText {
  constructor() {
  }
  triggerText(hitDetails) {
    switch (true) {
      case hitDetails.isPerfect:
        const perfectHitTextEvent = this.createHitText("perfect!");
        document.dispatchEvent(perfectHitTextEvent);
        break;
      case hitDetails.isGood:
        const goodHitTextEvent = this.createHitText("good!");
        document.dispatchEvent(goodHitTextEvent);
        break;
      case hitDetails.isHit:
        const basicHitTextEvent = this.createHitText("hit!");
        document.dispatchEvent(basicHitTextEvent);
        break;
      default:
        const missHitTextEvent = this.createHitText("miss!");
        document.dispatchEvent(missHitTextEvent);
    }
  }

  createHitText(text) {
    const hitTextEvent = new CustomEvent("HUDEvent", {
      detail: {
        type: "hitText",
        text: text,
        isVisible: true
      },
    });
    return hitTextEvent;
  }
}
