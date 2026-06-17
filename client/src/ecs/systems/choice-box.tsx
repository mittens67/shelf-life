import React, { useEffect, useRef } from "react";
import { ChoiceComponent } from "../components/choice";
import type { Entity } from "../types";

interface ChoiceBoxProps {
  entity: Entity;
  onChoiceSelect: (nextNode: string) => void;
}

export const ChoiceBox: React.FC<ChoiceBoxProps> = ({ entity, onChoiceSelect }) => {
  const choice = entity.components.choice as ChoiceComponent | undefined;
  // Tracks which choice is keyboard-focused without forcing a re-render —
  // actual visual focus comes from the browser via buttonRefs[i].focus().
  const focusedIndexRef = useRef(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow Up/Down to move between choices, number keys to jump straight to one
  useEffect(() => {
    if (!choice) return;
    const count = choice.choices.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        e.preventDefault();
        const next = (focusedIndexRef.current + 1) % count;
        focusedIndexRef.current = next;
        buttonRefs.current[next]?.focus();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        const next = (focusedIndexRef.current - 1 + count) % count;
        focusedIndexRef.current = next;
        buttonRefs.current[next]?.focus();
      } else if (/^Digit[1-9]$/.test(e.code)) {
        const index = Number(e.code.slice(5)) - 1;
        if (index < count) {
          e.preventDefault();
          onChoiceSelect(choice.choices[index].nextNode);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [choice, onChoiceSelect]);

  if (!choice) return null;

  return (
    <div
      className="
        absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2
        flex flex-col gap-3 sm:gap-4 w-[92%] sm:w-3/4 p-4 sm:p-6
        bg-black/60 border-4 sm:border-8 border-[#563232] ring-2 sm:ring-4 ring-[#4f200f]
        rounded-3xl sm:rounded-4xl shadow-2xl shadow-black/80 text-white backdrop-blur-md
      "
    >
      {choice.choices.map((option, i) => (
        <button
          key={i}
          ref={(el) => { buttonRefs.current[i] = el; }}
          onClick={() => onChoiceSelect(option.nextNode)}
          onFocus={() => { focusedIndexRef.current = i; }}
          className="
            px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold text-left
            bg-rose-300 text-amber-900
            border-2 border-amber-900
            hover:bg-rose-200 hover:scale-[1.02]
            transition duration-150 shadow-md
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
          "
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
