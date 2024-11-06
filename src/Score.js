export default class Score {
  constructor(scene) {
    this.scene = scene;
    this.scoreDetails = { total: 0, notesMissed: 0, allStreaks: [] };
    this.currentStreak = 0;
    this.streakMultiplier = 1;
    this.streakProgressPercentage = 0;
    this.barColors = ["white", "#ffbe0b", "#1aff00", "#0320FF", "#e100ff", "#FF0000"];
    this.dispatchScoreEvent();
  }

  increase(checkedHit) {
    this.currentStreak += 1;
    this.setStreakMultiplier();
    this.scoreDetails.total +=
      (checkedHit.isPerfect ? 2 : 1) * this.streakMultiplier;
    this.dispatchScoreEvent();
  }

  dispatchScoreEvent() {
    const scoreEvent = new CustomEvent("HUDEvent", {
      detail: {
        key: "score",
        total: this.scoreDetails.total,
        streakMultiplier: this.streakMultiplier,
        streakProgressPercentage: this.streakProgressPercentage,
        barColor: this.barColors[this.streakMultiplier],
        backgroundColor: this.barColors[this.streakMultiplier - 1],
      },
    });
    document.dispatchEvent(scoreEvent);
  }

  setStreakMultiplier() {
    if (this.currentStreak < (this.barColors.length - 1) * 10) {
      this.streakMultiplier = Math.floor(this.currentStreak / 10 + 1);
      this.streakProgressPercentage =
        (1 - (this.streakMultiplier - this.currentStreak / 10)) * 100;
    }
  }
  breakStreak() {
    this.scoreDetails.allStreaks.push(this.currentStreak);
    this.currentStreak = 0;
    this.streakMultiplier = 1;
    this.streakProgressPercentage = 0;
    this.scoreDetails.notesMissed += 1;
    this.dispatchScoreEvent();
  }
  reset() {
    this.scoreDetails = { total: 0, notesMissed: 0, allStreaks: [] };
    this.currentStreak = 0;
  }
  getScoreDetails() {
    this.scoreDetails.allStreaks.push(this.currentStreak);
    return this.scoreDetails;
  }
}
