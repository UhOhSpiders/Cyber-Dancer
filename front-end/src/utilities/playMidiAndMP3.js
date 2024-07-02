import * as Tone from "tone";
import { fallTime } from "../constants/constants";

export default async function playMidi(midiTrack, game) {
    console.log(midiTrack);
  
    const player = await new Promise((resolve, reject) => {
      const player = new Tone.Player({
        "url": "../midi-to-click-test.mp3",
        "onload": () => resolve(player.toDestination()),
        "onerror": (err) => reject(err),
        "autostart":"true"
      });
    });
      const now = Tone.now()
    midiTrack.tracks.forEach((track) => {
        track.notes.forEach((note) => {
            // create cascading note visual ahead of time
            Tone.getDraw().schedule(function () {
                if (track.name == 'dance_moves') {
                    game.noteDropper.addNote(note.name, note.time)
                }
            }, now + note.time - fallTime)
            // dispose of object
            Tone.getDraw().schedule(function () {
                if (track.name == 'dance_moves') {
                    game.noteDropper.deleteNote(note.name + note.time)
                }
            }, now + note.time + 0.5)
        });
    });
  }