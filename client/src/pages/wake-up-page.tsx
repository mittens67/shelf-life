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
        <h1 className="text-4xl font-bold mb-4 text-pink-500">Server is Sleepy...</h1>
        <p className="text-lg mb-8 max-w-md">
          We tried waking up the game server, but it's not responding. 
          Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full font-bold transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden">
      {/* Interesting Animation: Pulsing Ring + Rotating Glow */}
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full scale-110 animate-ping" />
        <div className="absolute inset-0 border-4 border-pink-400 rounded-full animate-[spin_3s_linear_infinite] border-t-transparent" />
        <div className="absolute inset-4 border-2 border-pink-600/50 rounded-full animate-[spin_2s_linear_infinite_reverse] border-b-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-pink-500 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 animate-pulse">Waking up the server</h2>
        <p className="text-pink-400/80 mb-6 italic">"Good things take time..."</p>
        
        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mb-4">
          {[...Array(MAX_ATTEMPTS)].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                i < attempts ? "bg-pink-500" : i === attempts ? "bg-white animate-bounce" : "bg-gray-700"
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
