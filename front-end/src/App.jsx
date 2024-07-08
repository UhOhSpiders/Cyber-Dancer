import { Midi } from "@tonejs/midi";
import MemoizedThreeJsScene from "./ThreeJsScene/index.jsx";
import Menu from "./components/Menu.jsx";
import "./App.css";
import useLoadGame from "./hook/useLoadGame.js";

const midi = await Midi.fromUrl("../midi-to-click-test.MID");
// const game = new Game();

function App() {
  const { game, isLoading, error } = useLoadGame("psych_test");
  if (!isLoading) {
    return (
      <>
        <div className="menu-container fade-in"></div>
        <Menu game={game} midi={midi} />
        <MemoizedThreeJsScene/>
      </>
    );
  } else {
    return (
      <div className="menu-container loading">
        <p id="loading-text">Loading...</p>
      </div>
    );
  }
}
export default App;
