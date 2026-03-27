// src/context/SoundContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { setSoundEnabled as setGlobalSoundEnabled } from "../utils/audio-manager";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync with global flag whenever it changes
  useEffect(() => {
    setGlobalSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
