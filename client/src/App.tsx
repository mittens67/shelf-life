// src/App.tsx
import React, { useState } from "react";
import { GameLoader } from "./pages/game-loader";
import { StartScreen } from "./pages/start-page";
import { GamePage } from "./pages/game-page";
import { EndScreen } from "./pages/end-screen";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"loading" | "start" | "game" | "end">("loading");

  if (screen === "loading") {
    return <GameLoader onLoaded={() => setScreen("start")} />;
  }

  if (screen === "start") {
    return <StartScreen onStart={() => setScreen("game")} />;
  }

  if (screen === "game") {
    return <GamePage />;
  }

  if (screen === "end") {
    return <EndScreen onRestart={() => setScreen("start")} />;
  }

  return null;
};

export default App;
