import React from "react";
import { ChoiceComponent } from "../components/choice";
import type { Entity } from "../types";

interface ChoiceBoxProps {
  entity: Entity;
  onChoiceSelect: (nextNode: string) => void;
}

export const ChoiceBox: React.FC<ChoiceBoxProps> = ({ entity, onChoiceSelect }) => {
  const choice = entity.components.choice as ChoiceComponent | undefined;
  if (!choice) return null;

  return (
    <div
      className="
        absolute bottom-8 left-1/2 transform -translate-x-1/2
        flex flex-col gap-4 w-3/4 p-6
        bg-black/60 border-8 border-[#563232] ring-4 ring-[#4f200f]
        rounded-4xl shadow-2xl shadow-black/80 text-white backdrop-blur-md
      "
    >
      {choice.choices.map((option, i) => (
        <button
          key={i}
          onClick={() => onChoiceSelect(option.nextNode)}
          className="
            px-6 py-3 rounded-xl text-lg font-semibold text-left
            bg-rose-300 text-amber-900
            border-2 border-amber-900
            hover:bg-rose-200 hover:scale-[1.02]
            transition duration-150 shadow-md
          "
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
