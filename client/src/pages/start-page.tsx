import React, { useRef, useState } from "react";
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

  if (!isLoaded) {
    return <LoadingPage progress={progress} />;
  }

  const handleStartClick = async () => {
    if (soundEnabled) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/assets/sounds/button.mp3");
      }
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Something went wrong with playing sound: ", err);
      }
    }
    setTimeout(() => onStart(), 300);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: "url(/assets/images/start-end-screens/intro-screen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src="/assets/images/game-ui/title.png"
        alt="Game Title"
        className="w-[60%] max-w-2xl mb-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
      />
      <img
        src="/assets/images/game-ui/start-btn.png"
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
      <p className="absolute bottom-10 text-white/80 text-sm animate-pulse">
        Click the button or press Enter to start
      </p>
    </div>
  );
};
