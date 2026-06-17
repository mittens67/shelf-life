import { useCallback, useEffect, useRef } from "react";
import { useSound } from "../context/sound-context";

export function useMusicManager() {
  const { soundEnabled } = useSound();
  const currentTrack = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cancel any in-flight fade so a new one never fights over audio.volume
  const clearActiveFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement, duration: number) => {
    clearActiveFade();
    let volume = audio.volume;
    const step = 0.05;
    fadeIntervalRef.current = setInterval(() => {
      volume += step;
      if (volume >= 1) {
        volume = 1;
        clearActiveFade();
      }
      audio.volume = volume;
    }, duration * step);
  }, [clearActiveFade]);

  const fadeOut = useCallback((audio: HTMLAudioElement, duration: number) => {
    clearActiveFade();
    let volume = audio.volume;
    const step = 0.05;
    fadeIntervalRef.current = setInterval(() => {
      volume -= step;
      if (volume <= 0) {
        volume = 0;
        clearActiveFade();
        audio.pause();
      }
      audio.volume = volume;
    }, duration * step);
  }, [clearActiveFade]);

  const playMusic = useCallback((track: string) => {
    // Prevent restarting the same music
    if (currentTrack.current === track) return;

    // Stop previous track if any (no need to wait for its fade — clearActiveFade
    // inside fadeOut/fadeIn already prevents the old and new fades from racing)
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create new audio
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    currentTrack.current = track;

    if (soundEnabled) {
      // Start playback with fade-in
      audio.play().catch(() => {
        console.warn("Autoplay blocked; will resume on user action");
      });
      fadeIn(audio, 1000);
    }
  }, [soundEnabled, fadeIn]);

  const stopMusic = useCallback(() => {
    if (audioRef.current) fadeOut(audioRef.current, 1000);
    currentTrack.current = null;
  }, [fadeOut]);

  // Handle sound toggle
  useEffect(() => {
    if (!soundEnabled && audioRef.current) {
      fadeOut(audioRef.current, 500);
    } else if (soundEnabled && audioRef.current && currentTrack.current) {
      audioRef.current.play().catch(() => {});
      fadeIn(audioRef.current, 1000);
    }
  }, [soundEnabled, fadeOut, fadeIn]);

  // stop on unmount
  useEffect(() => {
    return () => {
      clearActiveFade();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [clearActiveFade]);

  return { playMusic, stopMusic };
}
