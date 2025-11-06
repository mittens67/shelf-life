// src/context/SoundContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

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
