// src/hooks/use-preload.ts
import { useEffect, useState } from "react";
import { preloadAssets } from "../utils/preload-assets";

export function usePreload(assets: string[]) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!assets || assets.length === 0) {
      setIsLoaded(true);
      return;
    }

    preloadAssets(assets, ({ progress }) => setProgress(progress)).then(() => {
      setIsLoaded(true);
    });
  }, [JSON.stringify(assets)]);

  return { progress, isLoaded };
}
