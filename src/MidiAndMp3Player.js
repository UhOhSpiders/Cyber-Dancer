import * as Tone from "tone";
import { FALL_TIME } from "./constants/constants";
import { Midi } from "@tonejs/midi";

export default class MidiAndMp3Player {
  constructor(noteDropper, trackName, levelComplete) {
    this.noteDropper = noteDropper;
    this.trackName = trackName
    this.levelComplete = levelComplete;
    this.player = null;
    this.midiTrack = null;
  }

  async startTrack() {
    this.midiTrack = await Midi.fromUrl(`../songs/${this.trackName}/${this.trackName}.MID`);
    this.player = await new Promise((resolve, reject) => {
      const player = new Tone.Player({
        url: `../songs/${this.trackName}/${this.trackName}.mp3`,
        onload: () => {
          resolve(player.toDestination());
        },
        onerror: (err) => reject(err),
        autostart: "true",
        onstop: () => {
          this.levelComplete();
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
              this.noteDropper.addNote(note.name, note.time);
            }
          }.bind(this),
          now + note.time - FALL_TIME
        );

        // force miss
        Tone.getDraw().schedule(
          function () {
            if (track.name === "dance_moves") {
              // this.miss(`${note.name}_${note.time}`);
              this.noteDropper.forceMiss(`${note.name}_${note.time}`)
              
            }
          }.bind(this),
          now + note.time + 0.4
        );

        // dispose of object
        Tone.getDraw().schedule(
          function () {
            if (track.name === "dance_moves") {
              this.noteDropper.deleteNote();
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
