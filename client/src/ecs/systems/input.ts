import type { Entity } from "../types";
import { GameStateSystem } from "./game-state";

export class InputSystem {
  handleInput(action: any) {
    const entity: Entity | null = GameStateSystem.getCurrentEntity();

    if (!entity) return;
    
    if (entity.components.dialogue) {
      // e.g., advance dialogue
    } else if (entity.components.choice) {
      // e.g., select choice
    } else if (entity.components.miniGame) {
      // e.g., trigger mini-game result
    }
  }
}
