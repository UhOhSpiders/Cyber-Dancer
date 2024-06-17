import { Midi } from "@tonejs/midi";
import playMidi from "./utilities/playMidi";
import ThreeJsScene from "./ThreeJsScene";
import { addCube } from "./ThreeJsScene/3d";

const midi = await Midi.fromUrl("../ghostbusters_edit.midi");

function App() {
  const handleClick = async () => {
    playMidi(midi);
  };

  const resetCube = () => {
    addCube("F#", 2.0);
  };

  if (midi) {
    return (
      <>
        <button onClick={handleClick}>Play midi</button>
        <button onClick={resetCube}>Reset Cube</button>
        <ThreeJsScene />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
export default App;
