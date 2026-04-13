import React, { useState } from "react";
import { useSound } from "./context/sound-context";
//import { SoundProvider } from "./context/sound-context";
import { GameLoop } from "./game-loop";
import { SoundConfirmScreen } from "./pages/sound-confirm-screen";

import { SoundToggle } from "./components/sound-toggle";

const App: React.FC = () => {
  const [soundConfirmed, setSoundConfirmed] = useState(false);
  const { setSoundEnabled } = useSound();

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
