import React from "react";

const HUDBar = ({ text, barColor, backgroundColor, progressPercentage }) => {
  return (
    <div style={{ display: "flex", width: "100%", alignItems: "center"}}>
      <h4 style={{ fontSize: "1rem", margin:0.5 }}>{text}: </h4>
      <div
        style={{
          width: "100%",
          backgroundColor: `${backgroundColor}`,
    
          display: "flex",
          height: "7px",
          
        }}
      >
        <div
          style={{
            backgroundColor: `${barColor}`,
            width: `${progressPercentage}%`,
            transition: progressPercentage === 0 ? "width 0s":"width 0.2s ease",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HUDBar;
