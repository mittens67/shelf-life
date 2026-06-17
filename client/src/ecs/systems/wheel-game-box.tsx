import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Entity } from "../types";
import { MiniGameSystem } from "./mini-game";
import { useSound } from "../../context/sound-context";

const WHEEL_IMG = "/assets/images/mini-games/wheel-of-fortune/wheel.png";
const PIN_IMG = "/assets/images/mini-games/wheel-of-fortune/wheel-pin.png";
const SPIN_BTN_IMG = "/assets/images/mini-games/wheel-of-fortune/spin-btn.png";
const SPIN_SFX = "/assets/sounds/wheel-spin.mp3";

// Stateless system — a single shared instance keeps handleSpin's identity stable
const system = new MiniGameSystem();

export const WheelGameBox: React.FC<{
  entity: Entity;
  onComplete: (nextNode: string) => void;
}> = ({ entity, onComplete }) => {
  const { soundEnabled } = useSound();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Preload sound
  useEffect(() => {
    audioRef.current = new Audio(SPIN_SFX);
  }, []);

  const handleSpin = useCallback(() => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Play spin sound
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

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
  }, [spinning, soundEnabled, entity, onComplete]);

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
  }, [handleSpin]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
      {/* 🎯 Wheel container — clamp() keeps the wheel, pin, and button scaling
          smoothly and proportionally across the whole viewport range instead
          of each hitting its own max-width cap at a different breakpoint */}
      <div
        className="relative w-[clamp(16rem,85vw,40rem)] aspect-square"
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
          className="absolute top-[-1%] left-1/2 -translate-x-1/2 w-[clamp(1.75rem,8vw,3.5rem)] object-contain z-10"
        />
      </div>

      {/* 🔘 Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className={`mt-10 transition-transform hover:scale-105 active:scale-95 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          spinning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Spin the wheel (or press Space)"
      >
        <img
          src={SPIN_BTN_IMG}
          alt="Spin Button"
          className="w-[clamp(5rem,20vw,12rem)] object-contain"
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
