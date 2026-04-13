import React, { useState } from "react";
import { useSound } from "./context/sound-context";
//import { SoundProvider } from "./context/sound-context";
import { GameLoop } from "./game-loop";
import { SoundConfirmScreen } from "./pages/sound-confirm-screen";
import { WakeUpPage } from "./pages/wake-up-page";

import { SoundToggle } from "./components/sound-toggle";

const App: React.FC = () => {
  const [serverAwake, setServerAwake] = useState(false);
  const [soundConfirmed, setSoundConfirmed] = useState(false);
  const { setSoundEnabled } = useSound();

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
