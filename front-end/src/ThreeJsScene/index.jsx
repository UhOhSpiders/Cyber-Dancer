import { useCallback, memo} from "react";
import "./index.css";

export default function ThreeJsSceneComponent() {
  const containerRef = useCallback(window.game.mount, []);
  // alert("rerendered scene")
  return <div className="Cube-container" ref={containerRef} ></div>;
}

export const MemoizedThreeJsScene = memo(ThreeJsSceneComponent)
