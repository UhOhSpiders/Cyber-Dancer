import React from "react";
import spinner from "../assets/spinner.svg"
const LoadingScreen = () => {
  return (
    <div className="menu-container loading">
      <img src={spinner} style={{ width: "80px" }} />
    </div>
  );
};

export default LoadingScreen;
