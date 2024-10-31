import { useState, useEffect } from "react";
import { loadGltf } from "../utilities/loadGltf";
import Game from "../ThreeJsScene/3d";
import fetchSongs from "../utilities/api-helpers/fetchSongs";

const useLoadGame = () => {
  const [game, setGame] = useState();
  const [songs, setSongs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadGame = () => {
    setIsLoading(true);

    Promise.all([loadGltf(), fetchSongs()])
      .then(([gltf, songData]) => {
        setGame(new Game(gltf));
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
