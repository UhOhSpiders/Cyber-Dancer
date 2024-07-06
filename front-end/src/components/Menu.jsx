import React, { useState, useEffect } from "react";

const Menu = ({ game, midi }) => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(null);
  const [level, setLevel] = useState("psych_test");

  useEffect(() => {
    const handlePlayerStop = (score) => {
      setPlaying(false);
      setScore(score);
    };
    document.addEventListener(
      "playerStopped",
      function (evt) {
        handlePlayerStop(evt.detail.score);
      },
      false
    );
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, [playing]);

  const handleClickPlay = () => {
    game.play(midi, level);
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScore(null);
    game.replay(midi);
  };
  // if(level){
  //   return (<div className="menu-container"><p>level selection</p></div>)
  // }
  if (!playing && !score) {
    return (
      <div className="menu-container">
        <h3>(hold me closer)</h3>
        <h1>Cyber Dancer</h1>
        {/* <h3>Featuring Music From MGMT</h3> */}
        <button onClick={handleClickPlay}>Start Game</button>
      </div>
    );
  } else if (score) {
    return (
      <div className="menu-container">
        <h1>Level Complete</h1>
        <p>Congratulations. You scored {score} points.</p>
        <button onClick={handleClickReplay}>Replay</button>
      </div>
    );
  }
  return null;
};

export default Menu;
