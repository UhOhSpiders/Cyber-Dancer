import MemoizedThreeJsScene from "./ThreeJsScene/index.jsx";
import Menu from "./components/Menu.jsx";
import "./App.css";
import useLoadGame from "./hook/useLoadGame.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  const { game, isLoading, error } = useLoadGame();

  return (
    <>
      <NavBar />
      {isLoading ? (
        <div className="game-container">
          <LoadingScreen />
        </div>
      ) : error ? (
        <div className="menu-container">
          <h3>something went wrong</h3>
        </div>
      ) : (
        <div className="game-container">
          <div className="menu-container fade-in"></div>
          <Menu game={game} />
          <MemoizedThreeJsScene />
        </div>
      )}
    </>
  );
}
export default App;
