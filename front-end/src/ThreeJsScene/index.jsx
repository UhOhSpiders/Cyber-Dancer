import { useCallback, useRef, useEffect } from "react";
import "./index.css";
// import setupThreeJsScene from "./setupThreeJsScene";

export default function ThreeJsSceneComponent({ playing }) {
  const containerRef = useCallback(window.game.mount, [playing]);
  return <div className="Cube-container" ref={containerRef} ></div>;
}