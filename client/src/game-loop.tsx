import React, { useState } from "react";
import { GameLoader } from "./pages/game-loader";
import { StartScreen } from "./pages/start-page";
import { GamePage } from "./pages/game-page";
import { EndScreen } from "./pages/end-screen";

export const GameLoop: React.FC = () => {
  const [screen, setScreen] = useState<"start" | "loading" | "game" | "end">("start");

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
