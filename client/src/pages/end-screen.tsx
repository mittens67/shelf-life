import React, { useEffect, useRef, useState } from "react";
import { preloadAssets } from "../utils/preload-assets";
import { useSound } from "../context/sound-context";

interface EndScreenProps {
  onRestart: () => void;
}

const END_ASSETS = {
  bg: "/assets/images/start-end-screens/game-end-screen.png",
  button: "/assets/images/game-ui/restart-btn.png",
  clickSound: "/assets/sounds/button.mp3",
};

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  const { soundEnabled } = useSound();
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Preload assets
  useEffect(() => {
    const assets = [END_ASSETS.bg, END_ASSETS.button, END_ASSETS.clickSound];
    preloadAssets(assets, () => {}).then(() => setLoaded(true));
  }, []);

  const handleRestart = async () => {
    if (soundEnabled) {
      if (!audioRef.current) {
        audioRef.current = new Audio(END_ASSETS.clickSound);
      }
      try {
        await audioRef.current.play();
      } catch (err) {
        console.warn("Restart sound failed:", err);
      }
    }
    setTimeout(() => onRestart(), 300);
  };

  // ✅ Keyboard shortcut (Enter / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Loading end screen...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${END_ASSETS.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Restart button — slightly to the right and below center */}
      <img
        src={END_ASSETS.button}
        alt="Restart"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleRestart}
        className={`absolute transition-transform duration-150 ${
          hover ? "scale-110" : "scale-100"
        } cursor-pointer`}
        style={{
          width: "200px",
          filter: hover ? "brightness(1.1)" : "brightness(1)",
          top: "55%", // ↓ slightly below center
          left: "51%", // → slightly to the right
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
