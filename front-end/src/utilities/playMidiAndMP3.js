import * as Tone from "tone";
import { fallTime } from "../constants/constants";
import * as THREE from "three";

export default async function playMidiAndMP3(midiTrack, game) {
  const player = await new Promise((resolve, reject) => {
    const player = new Tone.Player({
      url: "../midi-to-click-test.mp3",
      onload: () => {
        resolve(player.toDestination());
      },
      onerror: (err) => reject(err),
      autostart: "true",
      onstop: () => {
        const playerStoppedEvent = new CustomEvent("playerStopped", {
          detail: { scoreDetails: game.score.scoreDetails },
        });
        document.dispatchEvent(playerStoppedEvent);
      },
    });
  });
  const now = Tone.now();
  midiTrack.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      // create cascading note visual ahead of time
      Tone.getDraw().schedule(function () {
        if (track.name == "dance_moves") {
          game.noteDropper.addNote(note.name, note.time);
        }
      }, now + note.time - fallTime);
      // force miss
      Tone.getDraw().schedule(function () {
        if (track.name == "dance_moves") {
          game.noteDropper.forceMiss(note.name + note.time);
        }
      }, now + note.time + 0.4);
      // dispose of object
      Tone.getDraw().schedule(function () {
        if (track.name == "dance_moves") {
          game.noteDropper.deleteNote();
        }
      }, now + note.time + 0.5);


    });
  });
}
