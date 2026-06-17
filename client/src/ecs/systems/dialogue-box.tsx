import { useState, useEffect, useRef, useCallback } from "react";
import { DialogueComponent } from "../components/dialog";
import type { Entity } from "../types";
import { useSound } from "../../context/sound-context";

interface DialogueBoxProps {
  entity: Entity;
  onComplete: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  entity,
  onComplete,
}) => {
  const { soundEnabled } = useSound();
  const dialogue = entity.components.dialogue as DialogueComponent;
  const [currentLine, setCurrentLine] = useState(dialogue.currentLine);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fullLine = dialogue.lines[currentLine] ?? "";

  /** Prepare the audio once */
  useEffect(() => {
    const audio = new Audio("/assets/sounds/typing.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
  }, []);

  /** Handle soundEnabled changes */
  useEffect(() => {
    if (!soundEnabled && audioRef.current) {
      audioRef.current.pause();
    } else if (soundEnabled && isTyping && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [soundEnabled, isTyping]);

  /** Unlock audio after first click or key press */
  useEffect(() => {
    const unlock = () => {
      if (!audioUnlocked && audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
          setAudioUnlocked(true);
        }).catch(() => {});
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [audioUnlocked]);

  /** Typewriter effect */
  useEffect(() => {
    if (!fullLine) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setDisplayedText("");
    setIsTyping(true);

    if (soundEnabled && audioUnlocked && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    let index = 0;
    intervalRef.current = setInterval(() => {
      index++;
      setDisplayedText(fullLine.slice(0, index));

      if (index >= fullLine.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsTyping(false);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }, 35);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [fullLine, audioUnlocked]);

  const advanceDialogue = useCallback(() => {
    if (isTyping) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setDisplayedText(fullLine);
      setIsTyping(false);
      return;
    }
    if (currentLine < dialogue.lines.length - 1) {
      const next = currentLine + 1;
      setCurrentLine(next);
      dialogue.currentLine = next;
    } else {
      onComplete();
    }
  }, [isTyping, fullLine, currentLine, dialogue, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        advanceDialogue();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advanceDialogue]);

  return (
    <div
      className="
        absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-[92%] sm:w-3/4 select-none
        p-4 sm:p-6 bg-black/40 border-4 sm:border-8 border-[#563232] ring-2 sm:ring-4 ring-[#4f200f] rounded-3xl sm:rounded-[3rem]
        shadow-2xl shadow-black/80 text-white backdrop-blur-md
      "
    >
      <p className="mb-4 sm:mb-8 text-base sm:text-xl leading-relaxed min-h-16 sm:min-h-20">
        {displayedText}
        {isTyping && <span className="animate-pulse">▋</span>}
      </p>

      <div className="flex justify-end">
        <button
          onClick={advanceDialogue}
          className="
            px-5 sm:px-6 py-2 rounded-xl text-base sm:text-lg font-semibold
            bg-rose-300 text-amber-900
            border-2 border-amber-900
            hover:bg-rose-200 hover:scale-[1.02] transition duration-150
            shadow-md
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
          "
        >
          {isTyping ? "Skip" : "Next"}
        </button>
      </div>
    </div>
  );
};
