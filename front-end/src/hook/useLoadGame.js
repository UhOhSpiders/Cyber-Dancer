import { useState, useEffect } from "react";
import { loadGltf } from "../utilities/loadGltf";
import Game from "../ThreeJsScene/3d";

const useLoadGame = () => {
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadGame = () => {
    setIsLoading(true)
    loadGltf().then((gltf)=>{
        setGame(new Game(gltf))
        setIsLoading(false)
    }).catch((error) => {
      setError(error); 
      setIsLoading(false); 
    });
  };
  useEffect(() => {
    handleLoadGame();
  }, []);

  return { game, isLoading, error };
};
export default useLoadGame;
