import React from "react";
import { useSound } from "../context/sound-context";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid/index.js";

export const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      className="fixed z-100 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white border border-white/20 shadow-lg backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
      aria-label={soundEnabled ? "Disable Sound (M)" : "Enable Sound (M)"}
    >
      {soundEnabled ? (
        <SpeakerWaveIcon className="w-6 h-6" />
      ) : (
        <SpeakerXMarkIcon className="w-6 h-6" />
      )}
    </button>
  );
};
