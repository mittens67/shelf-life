// src/pages/GameLoader.tsx
import React from "react";
import { usePreload } from "../hooks/use-preload";
import { LoadingPage } from "./loading-page";

interface GameLoaderProps {
  onLoaded: () => void;
}

export const GameLoader: React.FC<GameLoaderProps> = ({ onLoaded }) => {
  const { progress, isLoaded } = usePreload();

  if (!isLoaded) {
    return <LoadingPage progress={progress} />;
  }

  // 🔥 When loaded, trigger the next screen (StartScreen)
  onLoaded();
  return null;
};
