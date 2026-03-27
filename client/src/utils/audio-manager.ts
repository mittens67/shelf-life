let audioContext: AudioContext | null = null;
let soundEnabled = true;

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function resumeAudioContext() {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  const ctx = getAudioContext();
  if (!enabled && ctx.state === "running") {
    // Optionally suspend or just let individual players handle it
    // ctx.suspend(); 
  } else if (enabled && ctx.state === "suspended") {
    ctx.resume();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}
