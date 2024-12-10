import { HIT_COLORS } from "./constants/constants";
export default class HitText {
  constructor() {}
  triggerText(hitDetails) {
    switch (true) {
      case hitDetails.isPerfect:
        const perfectHitTextEvent = this.createHitText(
          "perfect!",
          HIT_COLORS.perfect,
          true
        );
        document.dispatchEvent(perfectHitTextEvent);
        break;
      case hitDetails.isGood:
        const goodHitTextEvent = this.createHitText("good!", HIT_COLORS.good);
        document.dispatchEvent(goodHitTextEvent);
        break;
      case hitDetails.isHit:
        const basicHitTextEvent = this.createHitText("hit!", HIT_COLORS.hit);
        document.dispatchEvent(basicHitTextEvent);
        break;
      default:
        const missHitTextEvent = this.createHitText("miss!", HIT_COLORS.miss);
        document.dispatchEvent(missHitTextEvent);
    }
  }

  createHitText(text, color, isShiny) {
    const hitTextEvent = new CustomEvent("HUDEvent", {
      detail: {
        type: "hitText",
        text: text,
        color: color,
        isVisible: true,
        isShiny: isShiny,
      },
    });
    return hitTextEvent;
  }
}
