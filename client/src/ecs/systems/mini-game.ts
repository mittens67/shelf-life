// src/ecs/systems/mini-game.ts
import { MiniGameComponent } from "../components/mini-game";
import type { Entity } from "../types";

export class MiniGameSystem {
  handleMiniGame(entity: Entity, score: number): string | null {
    const miniGame = entity.components.miniGame as MiniGameComponent;
    if (!miniGame) return null;

    if (miniGame.type === "card-match") {
      const keys = Object.keys(miniGame.scores || {}).map(Number).sort((a, b) => a - b);
      let selectedKey = keys[0];
      for (const key of keys) {
        if (score >= key) selectedKey = key;
      }

      const nextNodeId = miniGame.scores?.[selectedKey];
      return nextNodeId || null;
    }

    if (miniGame.type === "wheel-of-fortune") {
      const nextNodeId = miniGame.scores?.[score]?.endingNode;
      return nextNodeId || null;
    }

    return null;
  }
}
