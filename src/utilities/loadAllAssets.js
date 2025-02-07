import Background from "three/examples/jsm/renderers/common/Background.js";
import { loadGltf } from "./loadGltf";

export async function loadAllAssets() {
  const assetGroups = {
    characters: ["plink", "hoot", "blarf"],
    levels: ["neoprene", "psych_test"],
    squishers: ["anvil"],
    misc: ["splat"],
  };

  const [
    loadedCharacters,
    loadedSquishers,
    loadedNotes,
    loadedTargets,
    loadedBackgrounds,
    loadedMisc,
  ] = await Promise.all([
    Promise.all(
      assetGroups.characters.map((c) =>
        loadGltf(`/graphics/characters/${c}.gltf`)
      )
    ),
    Promise.all(
      assetGroups.squishers.map((s) =>
        loadGltf(`/graphics/squishers/${s}.gltf`)
      )
    ),
    Promise.all(
      assetGroups.levels.map((n) =>
        loadGltf(`/graphics/levels/notes/${n}_note.gltf`)
      )
    ),
    Promise.all(
      assetGroups.levels.map((t) =>
        loadGltf(`/graphics/levels/targets/${t}_target.gltf`)
      )
    ),
    Promise.all(
      assetGroups.levels.map((b) =>
        loadGltf(`/graphics/levels/backgrounds/${b}_background.gltf`)
      )
    ),
    Promise.all(
      assetGroups.misc.map((m) => loadGltf(`/graphics/misc/${m}.gltf`))
    ),
  ]);

  let assets = {
    characters: loadedCharacters,
    squishers: loadedSquishers,
    notes: loadedNotes,
    targets: loadedTargets,
    backgrounds: loadedBackgrounds,
    misc: loadedMisc,
  };

  console.log(assets)
  return assets
}
