import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePreload } from "../hooks/use-preload";
import { useSound } from "../context/sound-context";
import { LoadingPage } from "./loading-page";

interface EndScreenProps {
  onRestart: () => void;
}

const END_ASSETS_PATHS = [
  "/assets/images/start-end-screens/game-end-screen.png",
  "/assets/images/game-ui/restart-btn.png",
  "/assets/sounds/button.mp3",
];

const END_ASSETS = {
  bg: "/assets/images/start-end-screens/game-end-screen.png",
  button: "/assets/images/game-ui/restart-btn.png",
  clickSound: "/assets/sounds/button.mp3",
};

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  const { soundEnabled } = useSound();
  const { progress, isLoaded } = usePreload(END_ASSETS_PATHS);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRestart = useCallback(async () => {
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
  }, [soundEnabled, onRestart]);

  // ✅ Keyboard shortcut (Enter / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRestart]);

  if (!isLoaded) {
    return <LoadingPage progress={progress} />;
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
      {/* Restart button — slightly to the right and below center.
          Translation lives in Tailwind classes (not inline style) so it
          composes with the hover scale instead of overriding it. */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleRestart}
        aria-label="Restart Game"
        className={`absolute top-[55%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-48 rounded-2xl transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
          hover ? "scale-110" : "scale-100"
        }`}
      >
        <img
          src={END_ASSETS.button}
          alt=""
          className="w-full"
          style={{ filter: hover ? "brightness(1.1)" : "brightness(1)" }}
        />
      </button>
    </div>
  );
};
