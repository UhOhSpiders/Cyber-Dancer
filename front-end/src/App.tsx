import { Midi } from "@tonejs/midi";
import playMidiAndMP3 from "./utilities/playMidiAndMP3"
import ThreeJsScene from "./ThreeJsScene";
import { addCube } from "./ThreeJsScene/3d";

const midi = await Midi.fromUrl("../midi-to-click-test.MID");

function App() {
  const handleClick = async () => {
    playMidiAndMP3(midi);
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
