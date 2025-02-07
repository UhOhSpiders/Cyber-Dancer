import { useState, useEffect } from "react";
import { loadAllAssets } from "../utilities/loadAllAssets";
import Game from "../ThreeJsScene/3d";
import fetchSongs from "../utilities/api-helpers/fetchSongs";

const useLoadGame = () => {
  const [game, setGame] = useState();
  const [songs, setSongs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadGame = () => {
    setIsLoading(true);
    Promise.all([loadAllAssets(), fetchSongs()])
      .then(([graphics, songData]) => {
        setGame(new Game(graphics));
        setSongs(songData);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    handleLoadGame();
  }, []);

  return { game, songs, isLoading, error };
};
export default useLoadGame;
