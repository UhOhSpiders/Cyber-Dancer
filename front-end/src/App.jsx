import { Midi } from "@tonejs/midi";
import MemoizedThreeJsScene from "./ThreeJsScene/index.jsx";
import Menu from "./components/Menu.jsx";
import "./App.css";
import useLoadGame from "./hook/useLoadGame.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NavBar from "./components/NavBar.jsx";

const midi = await Midi.fromUrl("../midi-to-click-test.MID");

function App() {
  const { game, isLoading, error } = useLoadGame("psych_test");
  if (!isLoading) {
    return (
      <>
        <NavBar/>
        <div className="game-container">
        <div className="menu-container fade-in"></div>
        <Menu game={game} midi={midi} />
        <MemoizedThreeJsScene/>
        </div>
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      <div className="game-container">
      <LoadingScreen/>
      </div>
      </>
    );
  }
}
export default App;
