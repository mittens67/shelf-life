import { useEffect, useState } from "react";
import { preloadAssets } from "../utils/preload-assets";
import { CRITICAL_ASSETS } from "../assets/asset-manifest";

export function usePreload() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const allAssets = [...CRITICAL_ASSETS.images, ...CRITICAL_ASSETS.sounds];

    preloadAssets(allAssets, ({ progress }) => {
      setProgress(progress);
    }).then(() => {
      setIsLoaded(true);
    });
  }, []);

  return { progress, isLoaded };
}
