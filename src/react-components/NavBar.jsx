import React from "react";
import github_logo from "../assets/github_logo.svg";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div style={{ display: "flex" }}>
        <h2>Cyber Dancer</h2>
        <p
          style={{
            padding: 0,
            margin: 0,
            marginLeft: "0.2rem",
            fontSize: "small",
            borderRadius: "5px",
          }}
        >
          beta
        </p>
      </div>
      <a href="https://github.com/UhOhSpiders/Hold-Me-Closer-Cyber-Dancer">
        <img src={github_logo} style={{ width: "30px" }} />
      </a>
    </div>
  );
};

export default NavBar;
