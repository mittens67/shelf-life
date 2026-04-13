import React from "react";
import { useSound } from "../context/sound-context";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid/index.js";

export const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      className="fixed top-4 right-4 z-100 p-3 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white border border-white/20 shadow-lg backdrop-blur-sm"
      aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
    >
      {soundEnabled ? (
        <SpeakerWaveIcon className="w-6 h-6" />
      ) : (
        <SpeakerXMarkIcon className="w-6 h-6" />
      )}
    </button>
  );
};
