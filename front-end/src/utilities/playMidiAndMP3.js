import * as Tone from "tone";
import { addCube, playNote, deleteNote, dance } from "../ThreeJsScene/3d";
import { fallTime } from "../constants/constants";

export default async function playMidi(midiTrack) {
    console.log(midiTrack);
    const synths = [];
  
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
        //create a synth for each track
        const synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1,
            },
        }).toDestination();
        synths.push(synth);
        //schedule all of the notes
        track.notes.forEach((note) => {
            synth.triggerAttackRelease(
                note.name,
                note.duration,
                note.time + now,
                note.velocity
            );
            // create cascading note visual ahead of time
            Tone.getDraw().schedule(function () {
                if (track.name == 'dance_moves') {
                    addCube(note.name, note.time)
                }
            }, now + note.time - fallTime)
            // hit note now
            Tone.getDraw().schedule(function () {
                if (track.name == 'dance_moves') {
                    playNote(note.name, note.time)
                    // dance(note.name)
                }
            }, now + note.time)
            // dispose of object
            Tone.getDraw().schedule(function () {
                if (track.name == 'dance_moves') {
                    deleteNote(note.name + note.time)
                }
            }, now + note.time + 0.5)
        });
    });
  }