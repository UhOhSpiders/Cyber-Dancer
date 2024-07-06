import React, { useState, useEffect } from "react";

const Menu = ({ game, midi }) => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const handlePlayerStop = (score) => {
      setPlaying(false);
      setScore(score)
    };
    document.addEventListener("playerStopped", function(evt){
      handlePlayerStop(evt.detail.score)
      console.log(evt)
    },false);
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, [playing]);

  const handleClickPlay = () => {
    game.play(midi, "psych_test");
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScore(null)
    game.replay(midi);
  };

  if (!playing && !score) {
    return (<div className="menu-container"><button onClick={handleClickPlay}>Start Game</button></div>);
  } else if (score) {
    return (<div className="menu-container"><p>You Scored {score}</p><button onClick={handleClickReplay}>Replay</button></div>);
  }
  return null;

};

export default Menu;
