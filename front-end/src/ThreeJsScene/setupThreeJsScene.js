export default function setupThreeJsScene(containerRef) {
    if (!sceneMounted) {
      window.game.mount(containerRef.current);
      sceneMounted = true; // Set flag after mounting
    }
  }
  
  let sceneMounted = false; // Flag to track scene mounting