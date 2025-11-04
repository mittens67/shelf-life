import React, { useEffect, useRef, useState } from "react";
import type { Entity } from "../types";
import { MiniGameSystem } from "./mini-game";
import { MiniGameComponent } from "../components/mini-game";

const WHEEL_IMG = "/assets/images/mini-games/wheel-of-fortune/wheel.png";
const PIN_IMG = "/assets/images/mini-games/wheel-of-fortune/wheel-pin.png";
const SPIN_BTN_IMG = "/assets/images/mini-games/wheel-of-fortune/spin-btn.png";
const SPIN_SFX = "/assets/sounds/wheel-spin.mp3";

export const WheelGameBox: React.FC<{
  entity: Entity;
  onComplete: (nextNode: string) => void;
}> = ({ entity, onComplete }) => {
  const miniGame = entity.components.miniGame as MiniGameComponent;
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const system = new MiniGameSystem();

  // 🎵 Preload sound
  useEffect(() => {
    audioRef.current = new Audio(SPIN_SFX);
  }, []);

  // 🎮 Allow spacebar to trigger spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Play spin sound
    audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
    audioRef.current?.play().catch(() => {});

    // Determine random result (1–6)
    const outcome = Math.floor(Math.random() * 6) + 1;

    // Each section = 360/6 = 60 degrees
    const extraSpins = 5;
    const randomOffset = (outcome - 1) * 60 + Math.random() * 5 - 2.5;
    const finalRotation = 360 * extraSpins + randomOffset;

    setRotation((prev) => prev + finalRotation);

    // Stop after spin duration
    setTimeout(() => {
      setSpinning(false);
      setResult(outcome);

      const nextNode = system.handleMiniGame(entity, outcome);
      if (nextNode) onComplete(nextNode);
    }, 5000);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
      {/* 🎯 Wheel container */}
      <div
        className="relative w-[85vw] max-w-[30rem] sm:max-w-[35rem] md:max-w-[40rem] aspect-square"
        style={{ perspective: 1000 }}
      >
        {/* 🌀 Wheel */}
        <img
          src={WHEEL_IMG}
          alt="Wheel"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 5s cubic-bezier(0.2, 0.9, 0.3, 1)"
              : "none",
          }}
        />

        {/* 📍 Pin */}
        <img
          src={PIN_IMG}
          alt="Pin"
          className="absolute top-[-1%] left-1/2 -translate-x-1/2 w-[8vw] max-w-[2.5rem] sm:max-w-[3rem] md:max-w-[3.5rem] object-contain z-10"
        />
      </div>

      {/* 🔘 Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className={`mt-10 transition-transform hover:scale-105 active:scale-95 focus:outline-none ${
          spinning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Spin the wheel (or press Space)"
      >
        <img
          src={SPIN_BTN_IMG}
          alt="Spin Button"
          className="w-[20vw] max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem] object-contain"
        />
      </button>

      {result && !spinning && (
        <p className="text-white mt-6 text-lg sm:text-xl font-semibold tracking-wide animate-pulse">
          Result: {result}
        </p>
      )}
    </div>
  );
};
