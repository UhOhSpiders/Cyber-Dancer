import { Midi } from "@tonejs/midi";
import MemoizedThreeJsScene from "./ThreeJsScene/index.jsx";
import Game from "./ThreeJsScene/3d.jsx";
import Menu from "./components/Menu.jsx";
import "./App.css";

const midi = await Midi.fromUrl("../midi-to-click-test.MID");
const game = new Game();

function App() {
  if (game) {
    return (
      <>
        <Menu game={game} midi={midi} />
        <MemoizedThreeJsScene />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
export default App;
