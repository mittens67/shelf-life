import { useEffect, useRef } from "react";

export function useMusicManager() {
  const currentTrack = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = (track: string) => {
    // Prevent restarting the same music
    if (currentTrack.current === track) return;

    // Stop previous track if any
    if (audioRef.current) {
      fadeOut(audioRef.current, 1000);
    }

    // Create new audio
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    currentTrack.current = track;

    // Start playback with fade-in
    audio.play().catch(() => {
      console.warn("Autoplay blocked; will resume on user action");
    });
    fadeIn(audio, 1000);
  };

  const stopMusic = () => {
    if (audioRef.current) fadeOut(audioRef.current, 1000);
    currentTrack.current = null;
  };

  const fadeIn = (audio: HTMLAudioElement, duration: number) => {
    let volume = 0;
    const step = 0.05;
    const interval = setInterval(() => {
      volume += step;
      if (volume >= 1) {
        volume = 1;
        clearInterval(interval);
      }
      audio.volume = volume;
    }, duration * step);
  };

  const fadeOut = (audio: HTMLAudioElement, duration: number) => {
    let volume = audio.volume;
    const step = 0.05;
    const interval = setInterval(() => {
      volume -= step;
      if (volume <= 0) {
        volume = 0;
        clearInterval(interval);
        audio.pause();
      }
      audio.volume = volume;
    }, duration * step);
  };

  // stop on unmount
  useEffect(() => {
    return () => stopMusic();
  }, []);

  return { playMusic, stopMusic };
}
