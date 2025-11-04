import React from "react";

interface EndScreenProps {
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-black text-white"
      onClick={onRestart}
      tabIndex={0}
    >
      <h1 className="text-5xl font-bold mb-4">The End</h1>
      <p className="text-lg opacity-70">Click to return to Start</p>
    </div>
  );
};
