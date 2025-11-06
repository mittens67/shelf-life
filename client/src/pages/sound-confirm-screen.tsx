import React, { useState } from "react";

interface Props {
  onSelect: (soundEnabled: boolean) => void;
}

export const SoundConfirmScreen: React.FC<Props> = ({ onSelect }) => {
  const [hover, setHover] = useState<"on" | "off" | null>(null);

  return (
    <div
      className="relative w-screen h-screen flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/assets/images/start-end-screens/intro-screen.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          Enable Sound?
        </h1>

        <div className="flex gap-12">
          {/* Yes Button — lighter pink */}
          <button
            onMouseEnter={() => setHover("on")}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(true)}
            className={`px-10 py-4 rounded-2xl text-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(255,182,193,0.4)] ${
              hover === "on"
                ? "scale-110 bg-pink-500 shadow-[0_0_30px_rgba(255,182,193,0.8)]"
                : "bg-pink-400"
            }`}
          >
            Yes
          </button>

          {/* No Button — darker pink */}
          <button
            onMouseEnter={() => setHover("off")}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(false)}
            className={`px-10 py-4 rounded-2xl text-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(255,105,180,0.3)] ${
              hover === "off"
                ? "scale-110 bg-pink-800 shadow-[0_0_30px_rgba(255,105,180,0.6)]"
                : "bg-pink-700"
            }`}
          >
            No
          </button>
        </div>

        {/* Subtle note */}
        <p className="mt-10 text-sm text-white/80 animate-pulse">
          You can toggle sound anytime later
        </p>
      </div>
    </div>
  );
};
