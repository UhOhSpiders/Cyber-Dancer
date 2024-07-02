import { useCallback } from 'react';
import './index.css';

export default function ThreeJsSceneComponent() {
	const containerRef = useCallback(window.game.mount, []);
	return <div className="Cube-container" ref={containerRef}></div>
}