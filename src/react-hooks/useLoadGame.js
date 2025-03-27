import { useState, useEffect } from "react";
import { loadAllAssets } from "../utilities/loadAllAssets";
import Game from "../ThreeJsScene/3d";
import fetchSongs from "../utilities/api-helpers/fetchSongs";

const useLoadGame = () => {
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadGame = () => {
    setIsLoading(true);
    Promise.all([loadAllAssets()])
      .then(([graphics]) => {
        setGame(new Game(graphics));
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

  return { game, isLoading, error };
};
export default useLoadGame;
