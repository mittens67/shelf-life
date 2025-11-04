import React from "react";

interface Props {
  progress: number;
}

export const LoadingPage: React.FC<Props> = ({ progress }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <h1 className="text-3xl mb-8 font-bold">Loading...</h1>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="bg-pink-400 h-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-4 text-sm">{Math.round(progress * 100)}%</p>
    </div>
  );
};
