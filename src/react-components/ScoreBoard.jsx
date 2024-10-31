import React from "react";

const ScoreBoard = ({ scores }) => {

  const medals = ["🏆", "🥈", "🥉"];
  const table = scores.map((item, index) => {
    return (
      <div className="grid-element" key={index}>
        {index < 3 ? (
          <p>
            {medals[index]} {item.user}
          </p>
        ) : (
          <p>{item.user}</p>
        )}
        <p>{item.points}</p>
        <hr className="grid-hr"></hr>
      </div>
    );
  });

  return (
    <div className="scoreboard-container">
        <h3 className="table-header">✨ world dance rankings ✨</h3>
      <div className="highscore-grid-container">
        {table}
      </div>
    </div>
  );
};

export default ScoreBoard;
