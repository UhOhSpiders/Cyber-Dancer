import React, { useEffect, useState } from "react";
import HUDBar from "./HUDBar";
const HUD = () => {
  const [score, setScore] = useState({
    total: "0",
    streakMultiplier: 1,
    streakProgressPercentage: 0,
    barColor: "FFC971",
    backgroundColor: "white",
  });
  const [lifeCounter, setLifeCounter] = useState({
    lifeCountPercentage: 100,
    barColor: "red",
    backgroundColor: "white",
  });

  useEffect(() => {
    const handleHUDEvent = (event) => {
      if (event.key == "score") {
        setScore(event);
      } else if (event.key == "lifeCounter") {
        setLifeCounter(event);
      }
    };
    document.addEventListener(
      "HUDEvent",
      function (evt) {
        handleHUDEvent(evt.detail);
      },
      false
    );
  }, []);

  return (
    <div className="HUD menu-container">
      <div>
        <p style={{ color: score.backgroundColor, margin: 0, padding: 0, fontSize: "2rem" }}>
          x{score.streakMultiplier}
        </p>
        <p style={{ fontSize: "1rem", padding:0, margin:0 }}>streak bonus</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          margin: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <HUDBar
          text={"streak"}
          barColor={score.barColor}
          backgroundColor={score.backgroundColor}
          progressPercentage={score.streakProgressPercentage}
        />
        <HUDBar
          text={"danger"}
          barColor={lifeCounter.barColor}
          backgroundColor={lifeCounter.backgroundColor}
          progressPercentage={100 - lifeCounter.lifeCountPercentage}
        />
      </div>
      <p>{score.total}</p>
    </div>
  );
};

export default HUD;
