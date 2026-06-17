import React, { useEffect, useState } from "react";
import api from "../api/axios";

interface WakeUpPageProps {
  onSuccess: () => void;
}

export const WakeUpPage: React.FC<WakeUpPageProps> = ({ onSuccess }) => {
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"waking" | "failed">("waking");
  const MAX_ATTEMPTS = 5;
  const DELAY = 10000; // 10 seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const wakeServer = async () => {
      try {
        // Calling the health check route we verified earlier in app.ts
        const response = await api.get("/");
        if (response.status === 200) {
          onSuccess();
        }
      } catch (err) {
        if (attempts + 1 < MAX_ATTEMPTS) {
          setAttempts((prev) => prev + 1);
          timer = setTimeout(wakeServer, DELAY);
        } else {
          setStatus("failed");
        }
      }
    };

    wakeServer();
    return () => clearTimeout(timer);
  }, [attempts, onSuccess]);

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-rose-300">Server is Sleepy...</h1>
        <p className="text-base sm:text-lg mb-8 max-w-md px-2">
          We tried waking up the game server, but it's not responding.
          Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 sm:px-8 py-3 bg-[#563232] hover:bg-[#6b3f3f] rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden px-4">
      {/* Interesting Animation: Pulsing Ring + Rotating Glow */}
      <div className="relative w-36 sm:w-48 h-36 sm:h-48 mb-10 sm:mb-12">
        <div className="absolute inset-0 border-4 border-rose-300/20 rounded-full scale-110 animate-ping" />
        <div className="absolute inset-0 border-4 border-rose-300 rounded-full animate-[spin_3s_linear_infinite] border-t-transparent" />
        <div className="absolute inset-4 border-2 border-[#563232]/70 rounded-full animate-[spin_2s_linear_infinite_reverse] border-b-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-rose-300 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 animate-pulse">Waking up the server</h2>
        <p className="text-rose-300/80 mb-6 italic">"Good things take time..."</p>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mb-4">
          {[...Array(MAX_ATTEMPTS)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                i < attempts ? "bg-rose-300" : i === attempts ? "bg-white animate-bounce" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Attempt {attempts + 1} of {MAX_ATTEMPTS}
        </p>
      </div>
    </div>
  );
};
