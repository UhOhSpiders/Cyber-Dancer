import React, { useState, useEffect } from "react";

const HUDHitText = ({ hitText }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 200);
    return () => clearTimeout(fadeTimer);
  }, [hitText]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column-reverse",
      }}
    >
      <h3
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          marginBottom: "10rem",
          fontSize:"2rem",
          color: hitText.color,
          fontWeight: "bolder",
          textShadow: "1px 1px 1px white"
        }}
        className={hitText.isShiny?"shiny":null}
      >
        {hitText.text}
      </h3>
    </div>
  );
};

export default HUDHitText;
