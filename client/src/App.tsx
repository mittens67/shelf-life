import React, { useEffect, useState } from "react";
import { useSound } from "./context/sound-context";
//import { SoundProvider } from "./context/sound-context";
import { GameLoop } from "./game-loop";
import { SoundConfirmScreen } from "./pages/sound-confirm-screen";
import { WakeUpPage } from "./pages/wake-up-page";

import { SoundToggle } from "./components/sound-toggle";

const App: React.FC = () => {
  const [serverAwake, setServerAwake] = useState(false);
  const [soundConfirmed, setSoundConfirmed] = useState(false);
  const { setSoundEnabled, toggleSound } = useSound();

  // Global "M" shortcut to mute/unmute, mirroring the SoundToggle button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyM" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleSound();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSound]);

  if (!serverAwake) {
    return <WakeUpPage onSuccess={() => setServerAwake(true)} />;
  }

  if (!soundConfirmed) {
    return (
      <SoundConfirmScreen
        onSelect={(enableSound: boolean) => {
          setSoundEnabled(enableSound);
          setSoundConfirmed(true);
        }}
      />
    );
  }

  return (
    <>
      <SoundToggle />
      <GameLoop />
    </>
  );
};

export default App;
