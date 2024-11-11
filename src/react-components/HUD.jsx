import React, { useEffect, useState } from "react";
import HUDBar from "./HUDBar";
import HUDHitText from "./HUDHitText";
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
  const [hitText, setHitText] = useState({
    text: null,
  });

  useEffect(() => {
    const handleHUDEvent = (event) => {
      if (event.type == "score") {
        setScore(event);
      } else if (event.type == "lifeCounter") {
        setLifeCounter(event);
      } else if (event.type == "hitText") {
        setHitText(event);
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
    <>
      <HUDHitText hitText={hitText} />
      <div className="HUD menu-container">
        <div>
          <p
            style={{
              color: score.backgroundColor,
              margin: 0,
              padding: 0,
              fontSize: "2rem",
            }}
          >
            x{score.streakMultiplier}
          </p>
          <p style={{ fontSize: "1rem", padding: 0, margin: 0 }}>
            streak bonus
          </p>
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
    </>
  );
};

export default HUD;
