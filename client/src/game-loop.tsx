import React, { useState } from "react";
import { GameLoader } from "./pages/game-loader";
import { useSound } from "./context/sound-context";
import { StartScreen } from "./pages/start-page";
import { GamePage } from "./pages/game-page";
import { EndScreen } from "./pages/end-screen";

export const GameLoop: React.FC = () => {
  const [screen, setScreen] = useState<"start" | "loading" | "game" | "end">("start");
  const { soundEnabled } = useSound();
  console.log("Sound enabled flag is : ", soundEnabled);

  switch (screen) {
    case "start":
      return <StartScreen onStart={() => setScreen("loading")} />;

    case "loading":
      return <GameLoader onLoaded={() => setScreen("game")} />;

    case "game":
      return <GamePage onEnd={() => setScreen("end")} />;

    case "end":
      // Restart should reset back into gameplay fresh
      return <EndScreen onRestart={() => setScreen("game")} />;

    default:
      return null;
  }
};
