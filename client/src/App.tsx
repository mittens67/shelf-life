\import React, { useState } from "react";
import { SoundProvider } from "./context/sound-context";
import { GameLoop } from "./game-loop";
import { SoundConfirmScreen } from "./pages/sound-confirm-screen";

const App: React.FC = () => {
  const [soundConfirmed, setSoundConfirmed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

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
    <SoundProvider>
      <GameLoop />
    </SoundProvider>
  );
};

export default App;
