import { useEffect } from "react";
import type { Entity } from "../ecs/types";

export const useGameLoop = (currentEntity: Entity) => {
  useEffect(() => {
    const loop = () => {
      // Update systems
      dialogueSystem.update(currentEntity);
      miniGameSystem.update(currentEntity);
      renderSystem.update(currentEntity);

      // Request next frame
      requestAnimationFrame(loop);
    };

    loop(); // start the loop
  }, [currentEntity]);
};
