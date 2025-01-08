import * as Tone from "tone";
import { FALL_TIME } from "./constants/constants";
import { Midi } from "@tonejs/midi";

export default class MidiAndMp3Player {
  constructor(game, midiName, mp3Name) {
    this.game = game;
    this.midiName = midiName;
    this.mp3Name = mp3Name;
    this.player = null;
    this.midiTrack = null;
  }

  async startTrack() {
    this.midiTrack = await Midi.fromUrl(`../${this.midiName}`);
    this.player = await new Promise((resolve, reject) => {
      const player = new Tone.Player({
        url: `../${this.mp3Name}`,
        onload: () => {
          resolve(player.toDestination());
        },
        onerror: (err) => reject(err),
        autostart: "true",
        onstop: () => {
          const playerStoppedEvent = new CustomEvent("playerStopped", {
            detail: {
              scoreDetails: this.game.score.getScoreDetails(),
              isDead: this.game.lifeCounter.isDead,
            },
          });
          this.game.gameIsPlaying = false;
          this.game.selectedCharacter.stopLoopingDance();
          document.dispatchEvent(playerStoppedEvent);
          Tone.getDraw().cancel(now - 2);
        },
      });
    });

    const now = Tone.now();
    this.midiTrack.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        // create cascading note visual ahead of time
        Tone.getDraw().schedule(
          function () {
            if (track.name === "dance_moves") {
              this.game.noteDropper.addNote(note.name, note.time);
            }
          }.bind(this),
          now + note.time - FALL_TIME
        );

        // force miss
        Tone.getDraw().schedule(
          function () {
            if (track.name === "dance_moves") {
              this.game.noteDropper.forceMiss(`${note.name}_${note.time}`);
            }
          }.bind(this),
          now + note.time + 0.4
        );

        // dispose of object
        Tone.getDraw().schedule(
          function () {
            if (track.name === "dance_moves") {
              this.game.noteDropper.deleteNote();
            }
          }.bind(this),
          now + note.time + 0.5
        );
      });
    });

    Tone.getTransport().start();
  }

  stopTrack() {
    if (this.player) {
      this.player.stop();
      Tone.getTransport().stop();
    }
  }
}
