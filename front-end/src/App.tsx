import { Midi } from "@tonejs/midi";
import playMidi from "./utilities/playMidi";
import ThreeJsScene from "./ThreeJsScene";
import { addCube } from "./ThreeJsScene/3d";

const midi = await Midi.fromUrl("../ghostbusters.mid");

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
        <button
          onClick={handleClick}
          style={{
            position: "absolute",
            top: 0,
            right: 20,
          }}
        >
          Play midi
        </button>
        <button
          onClick={resetCube}
          style={{
            position: "absolute",
            top: 0,
          }}
        >
          Reset Cube
        </button>

        <div id="threejsdiv"></div>
        <ThreeJsScene />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
export default App;
