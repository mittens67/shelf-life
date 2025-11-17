import type { Entity } from "../ecs/types";

/**
 * Extract all asset URLs from an ECS entity's components.
 * Extend this as your component types evolve.
 */
export function getEntityAssets(entity: Partial<Entity>): string[] {
  const assets: string[] = [];

  // Background / base image
  if (entity?.components?.asset) {
    const asset = entity.components.asset;
    if (asset.image) assets.push(asset.image);
    //if (asset.overlay) assets.push(asset.overlay);
  }

  // 💬 Dialogue portraits, etc.
//   if (entity.components.dialogue) {
//     const dialogue = entity.components.dialogue;
//     if (dialogue.portrait) assets.push(dialogue.portrait);
//   }

  // 🎮 Mini-game assets
  if (entity.components.miniGame) {
    const miniGame = entity.components.miniGame;
    if (miniGame.cards?.length) assets.push(...miniGame.cards);
    // if (miniGame.background) assets.push(miniGame.background);
    // if (miniGame.ui?.length) assets.push(...miniGame.ui);
  }

  // 🪩 Any custom future asset lists, like music
  // if (entity?.components?.assets) {
  //   const list = entity.components.assets;
  //   if (Array.isArray(list)) assets.push(...list);
  // }

  // Deduplicate
  return Array.from(new Set(assets));
}
