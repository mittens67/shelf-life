export interface PreloadResult {
  total: number;
  loaded: number;
  progress: number; // 0 → 1
}

export async function preloadAssets(
  assets: string[],
  onProgress?: (result: PreloadResult) => void
): Promise<void> {
  let loaded = 0;
  const total = assets.length;

  const update = () => {
    loaded++;
    onProgress?.({ total, loaded, progress: loaded / total });
  };

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  const promises = assets.map(async (url) => {
    if (url.endsWith(".mp3") || url.endsWith(".wav") || url.endsWith(".ogg")) {
      try {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        await audioContext.decodeAudioData(arrayBuffer); // ✅ ensures audio is ready
        update();
      } catch (err) {
        console.warn("Audio failed to decode:", url, err);
        update();
      }
    } else {
      // Image case
      try {
        const img = new Image();
        img.src = url;
        await img.decode(); // ensures image is decoded before continuing
        update();
      } catch (err) {
        console.warn("Image failed to load:", url, err);
        update();
      }
    }
  });

  await Promise.all(promises);
}
