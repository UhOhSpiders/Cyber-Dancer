import { Midi } from "@tonejs/midi";
import playMidiAndMP3 from "./utilities/playMidiAndMP3"
import ThreeJsScene from "./ThreeJsScene";
import Game from "./ThreeJsScene/3d.jsx"

const midi = await Midi.fromUrl("../midi-to-click-test.MID");

function App() {
  const game = new Game()
  game.loadGraphics({x:0, y: -1.2, z: -2.5}, 'psych_test')
  const handleClick = () => {
    playMidiAndMP3(midi, game);
  };

  const resetCube = () => {
    game.noteDropper.addNote("F#", 2.0);
  };


  if (midi && game) {
    return (
      <>
        <button onClick={handleClick}>Play midi</button>
        <button onClick={resetCube}>Reset Cube</button>
        <ThreeJsScene/>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
export default App;
