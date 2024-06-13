import * as Tone from "tone";
import { addCube, changeColor, deleteNote, dance } from "../ThreeJsScene/3d";

export default function playMidi(midiTrack) {

    const synths = [];

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
            // create cascading note visual ahead of time (offset time is now + note.time - (container height /350))
            Tone.Draw.schedule(function () {
                if (track.name == "ACOU BASS") {
                    addCube(note.name, note.time)
                }
            }, now + note.time - (window.innerHeight / 350))
            // hit note now
            Tone.Draw.schedule(function () {
                if (track.name == "ACOU BASS") {
                    changeColor(note.name, note.time)
                    dance(note.name)
                }
            }, now + note.time)
            // dispose of object
            Tone.Draw.schedule(function () {
                if (track.name == "ACOU BASS") {
                    deleteNote()
                }
            }, now + note.time + 0.5)
        });
    });
    // Tone.Transport.scheduleRepeat(function () {
    //     console.log("toot")
    // }, "1n");

    Tone.getTransport().start()
}