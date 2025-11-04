import { useState } from "react";
import type { DialogueComponent } from "../ecs/components/dialog";

export const useDialogue = (dialogue: DialogueComponent) => {
  const [currentLine, setCurrentLine] = useState(dialogue.currentLine);

  const nextLine = () => {
    if (currentLine < dialogue.lines.length - 1) {
      const newLine = currentLine + 1;
      setCurrentLine(newLine);
      dialogue.currentLine = newLine; // sync ECS
      return false;
    } else {
      return true;
    }
  };

  return { currentLine, nextLine, lines: dialogue.lines };
};
