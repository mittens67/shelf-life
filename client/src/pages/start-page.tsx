// src/pages/start-screen.tsx
import React, { useEffect, useRef, useState } from "react";
import { preloadAssets } from "../utils/preload-assets";

interface StartScreenProps {
  onStart: () => void;
}

// ✅ define your start screen assets
const START_ASSETS = {
  bg: "/assets/images/start-end-screens/intro-screen.jpg",
  title: "/assets/images/game-ui/title.png",
  button: "/assets/images/game-ui/start-btn.png",
  clickSound: "/assets/sounds/button.mp3",
};

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload start screen assets
  useEffect(() => {
    const assets = [START_ASSETS.bg, START_ASSETS.title, START_ASSETS.button, START_ASSETS.clickSound];
    preloadAssets(assets, () => {}).then(() => setLoaded(true));
  }, []);

  // Handle Start button click
  const handleStartClick = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(START_ASSETS.clickSound);
    }
    try {
      await audioRef.current.play();
    } catch (err) {
      console.warn("Click sound failed to play:", err);
    }
    // Small delay so the sound finishes before switching
    setTimeout(() => onStart(), 300);
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Loading start screen...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: `url(${START_ASSETS.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title */}
      <img
        src={START_ASSETS.title}
        alt="Game Title"
        className="w-[60%] max-w-2xl mb-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
      />

      {/* Start button */}
      <img
        src={START_ASSETS.button}
        alt="Start"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleStartClick}
        className={`cursor-pointer transition-transform duration-150 ${
          hover ? "scale-110" : "scale-100"
        }`}
        style={{
          width: "200px",
          filter: hover ? "brightness(1.1)" : "brightness(1)",
        }}
      />

      {/* Hint text */}
      <p className="absolute bottom-10 text-white/80 text-sm animate-pulse">
        Click the button or press Enter to start
      </p>
    </div>
  );
};
