// src/pages/GameLoader.tsx
import React, { useEffect } from "react";
import { usePreload } from "../hooks/use-preload";
import { LoadingPage } from "./loading-page";
import { CRITICAL_ASSETS } from "../assets/asset-manifest";

interface GameLoaderProps {
  onLoaded: () => void;
  assets?: string[]; // optional list of assets to preload
}

export const GameLoader: React.FC<GameLoaderProps> = ({ onLoaded, assets }) => {
  const assetList = assets ?? [...CRITICAL_ASSETS.images, ...CRITICAL_ASSETS.sounds];
  const { progress, isLoaded } = usePreload(assetList);

  useEffect(() => {
    if (isLoaded) {
      onLoaded();
    }
  }, [isLoaded, onLoaded]);

  if (!isLoaded) {
    return <LoadingPage progress={progress} />;
  }
  
  return null;
};
