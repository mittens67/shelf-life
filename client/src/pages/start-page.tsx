import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePreload } from "../hooks/use-preload";
import { useSound } from "../context/sound-context";
import { LoadingPage } from "./loading-page";

interface StartScreenProps {
  onStart: () => void;
}

const START_ASSETS = [
  "/assets/images/start-end-screens/intro-screen.jpg",
  "/assets/images/game-ui/title.png",
  "/assets/images/game-ui/start-btn.png",
  "/assets/sounds/button.mp3",
];

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { soundEnabled } = useSound();
  const { progress, isLoaded } = usePreload(START_ASSETS);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartClick = useCallback(async () => {
    if (soundEnabled) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/assets/sounds/button.mp3");
      }
      try {
        await audioRef.current.play();
      } catch (err) {
        console.warn("Something went wrong with playing sound: ", err);
      }
    }
    setTimeout(() => onStart(), 300);
  }, [soundEnabled, onStart]);

  // Allow Enter/Space to start, matching the on-screen hint. All hooks must
  // run unconditionally (before the `isLoaded` early return below), so the
  // "don't fire until assets are ready" check lives inside the handler.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLoaded) return;
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        handleStartClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoaded, handleStartClick]);

  if (!isLoaded) {
    return <LoadingPage progress={progress} />;
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url(/assets/images/start-end-screens/intro-screen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src="/assets/images/game-ui/title.png"
        alt="Game Title"
        className="w-[80%] sm:w-[60%] max-w-2xl mb-8 sm:mb-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
      />
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleStartClick}
        aria-label="Start Game"
        className={`cursor-pointer transition-transform duration-150 w-32 sm:w-40 md:w-48 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
          hover ? "scale-110" : "scale-100"
        }`}
      >
        <img
          src="/assets/images/game-ui/start-btn.png"
          alt=""
          className="w-full"
          style={{ filter: hover ? "brightness(1.1)" : "brightness(1)" }}
        />
      </button>
      <p className="absolute bottom-8 sm:bottom-10 text-white/80 text-xs sm:text-sm animate-pulse px-4">
        Click the button or press Enter to start
      </p>
    </div>
  );
};
