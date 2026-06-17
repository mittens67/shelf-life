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
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          Enable Sound?
        </h1>

        <div className="flex gap-4 sm:gap-12">
          {/* Yes Button — rose accent */}
          <button
            onMouseEnter={() => setHover("on")}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(true)}
            className={`px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-xl font-semibold text-amber-900 transition-all duration-200 shadow-[0_0_20px_rgba(255,182,193,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
              hover === "on"
                ? "scale-110 bg-rose-200 shadow-[0_0_30px_rgba(255,182,193,0.8)]"
                : "bg-rose-300"
            }`}
          >
            Yes
          </button>

          {/* No Button — deeper rose/brown */}
          <button
            onMouseEnter={() => setHover("off")}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(false)}
            className={`px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-xl font-semibold text-white transition-all duration-200 shadow-[0_0_20px_rgba(86,50,50,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
              hover === "off"
                ? "scale-110 bg-[#6b3f3f] shadow-[0_0_30px_rgba(86,50,50,0.7)]"
                : "bg-[#563232]"
            }`}
          >
            No
          </button>
        </div>

        {/* Subtle note */}
        <p className="mt-8 sm:mt-10 text-sm md:text-base text-white/80 animate-pulse">
          You can toggle sound anytime later
        </p>
      </div>
    </div>
  );
};
