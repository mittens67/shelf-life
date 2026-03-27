import { AssetCache } from "./asset-cache";
import { getAudioContext } from "./audio-manager";

export interface PreloadResult {
  total: number;
  loaded: number;
  progress: number; // 0 → 1
}

export async function preloadAssets(
  assets: string[],
  onProgress?: (result: PreloadResult) => void
): Promise<void> {
  const uniqueAssets = assets.filter((url) => !AssetCache.has(url));
  const total = uniqueAssets.length;

  if (total === 0) {
    onProgress?.({ total: 0, loaded: 0, progress: 1 });
    return;
  }

  let loaded = 0;

  const update = () => {
    loaded++;
    onProgress?.({ total, loaded, progress: loaded / total });
  };

  const audioContext = getAudioContext();

  const promises = uniqueAssets.map(async (url) => {
    try {
      if (url.match(/\.(mp3|wav|ogg)$/i)) {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        await audioContext.decodeAudioData(arrayBuffer);
      } else if (url.match(/\.(png|jpg|jpeg|gif)$/i)) {
        const img = new Image();
        img.src = url;
        await img.decode();
      }
      AssetCache.add(url);
    } catch (err) {
      console.warn(`⚠️ Failed to preload asset: ${url}`, err);
    } finally {
      update();
    }
  });

  await Promise.all(promises);
}
