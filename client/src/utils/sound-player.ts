import { getAudioContext, isSoundEnabled } from "./audio-manager";

const loadedSounds: Record<string, AudioBuffer> = {};

export async function loadSound(url: string): Promise<void> {
  if (loadedSounds[url]) return;
  const ctx = getAudioContext();
  const res = await fetch(url);
  const data = await res.arrayBuffer();
  const buffer = await ctx.decodeAudioData(data);
  loadedSounds[url] = buffer;
}

export function playSound(url: string, volume = 1) {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  const buffer = loadedSounds[url];
  if (!buffer) {
    console.warn("Sound not loaded:", url);
    return;
  }

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  gain.gain.value = volume;

  source.buffer = buffer;
  source.connect(gain).connect(ctx.destination);
  source.start(0);
}

export function playLoop(url: string, volume = 1) {
  if (!isSoundEnabled()) return () => {};
  const ctx = getAudioContext();
  const buffer = loadedSounds[url];
  if (!buffer) return () => {};

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.loop = true;

  source.buffer = buffer;
  source.connect(gain).connect(ctx.destination);
  source.start(0);

  return () => source.stop(); // returns stop function for cleanup
}
