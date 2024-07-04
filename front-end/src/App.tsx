import { Midi } from "@tonejs/midi";
import playMidiAndMP3 from "./utilities/playMidiAndMP3.js";
import ThreeJsScene from "./ThreeJsScene/index.jsx";
import Game from "./ThreeJsScene/3d.jsx";
import { useEffect, useState } from "react";

const midi = await Midi.fromUrl("../midi-to-click-test.MID");

function App() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handlePlayerStop = () => {
      setPlaying(false);
    };
    document.addEventListener("playerStopped", handlePlayerStop);
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, []);

  const game = new Game();
  game.loadGraphics({ x: 0, y: -1.2, z: -2.5 }, "psych_test");
  const handleClick = () => {
    playMidiAndMP3(midi, game);
    setPlaying(true);
  };

  if (midi && game) {
    return (
      <>
        {playing ? null : (
          <button
            style={{
              position: "fixed",
              margin: "auto",
              inset: "0px",
              width: "20rem",
              height: "5rem",
            }}
            onClick={handleClick}
          >
            Start Game
          </button>
        )}
        <ThreeJsScene playing={playing} />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
export default App;
