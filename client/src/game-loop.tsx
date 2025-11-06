import React, { useState } from "react";
import { GameLoader } from "./pages/game-loader";
import { StartScreen } from "./pages/start-page";
import { GamePage } from "./pages/game-page";
import { EndScreen } from "./pages/end-screen";

export const GameLoop: React.FC = () => {
  const [screen, setScreen] = useState<"loading" | "start" | "game" | "end">("loading");

  switch (screen) {
    case "loading":
      return <GameLoader onLoaded={() => setScreen("start")} />;

    case "start":
      return <StartScreen onStart={() => setScreen("game")} />;

    case "game":
      return <GamePage onEnd={() => setScreen("end")} />;

    case "end":
      return <EndScreen onRestart={() => setScreen("game")} />;

    default:
      return null;
  }
};
