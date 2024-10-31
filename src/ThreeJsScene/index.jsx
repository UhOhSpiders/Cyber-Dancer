import { useCallback, memo} from "react";


export default function ThreeJsSceneComponent() {
  const containerRef = useCallback(window.game.mount, []);
  return <div className="Cube-container" ref={containerRef} ></div>;
}

export const MemoizedThreeJsScene = memo(ThreeJsSceneComponent)
