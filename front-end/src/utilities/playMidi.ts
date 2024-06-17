import * as Tone from "tone";
import { addCube, playNote, deleteNote, dance } from "../ThreeJsScene/3d";

export default function playMidi(midiTrack) {
    console.log(midiTrack)
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
            Tone.getDraw().schedule(function () {
                if (track.name == 'SLAPBASS 1') {
                    addCube(note.name, note.time)
                }
            }, now + note.time - 2)
            // hit note now
            Tone.getDraw().schedule(function () {
                if (track.name == 'SLAPBASS 1') {
                    playNote(note.name, note.time)
                    // dance(note.name)
                }
            }, now + note.time)
            // dispose of object
            Tone.getDraw().schedule(function () {
                if (track.name == 'SLAPBASS 1') {
                    deleteNote(note.name + note.time)
                }
            }, now + note.time + 0.1)
        });
    });
    // Tone.Transport.scheduleRepeat(function () {
    //     console.log("toot")
    // }, "1n");
    // Tone.getTransport().bpm.value = 60
    Tone.getTransport().start()
}