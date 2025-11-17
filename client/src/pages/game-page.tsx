import React, { useEffect, useMemo, useState } from "react";
import { DialogueBox } from "../ecs/systems/dialogue-box";
import { ChoiceBox } from "../ecs/systems/choice-box";
import { CardGameBox } from "../ecs/systems/card-game-box";
import { WheelGameBox } from "../ecs/systems/wheel-game-box";
import { BackgroundRenderSystem } from "../ecs/systems/background-render";
import { useMusicManager } from "../hooks/use-music-manager";
import { useEntityLoader } from "../hooks/use-entity-loader";
import { LoadingPage } from "./loading-page";

interface GamePageProps {
  onEnd: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onEnd }) => {
  const [currentId, setCurrentId] = useState("start");
  const [phase, setPhase] = useState<"dialogue" | "choice" | "miniGame">("dialogue");
  const { entity, loading } = useEntityLoader(currentId);
  const { playMusic, stopMusic } = useMusicManager();
  const bgSystem = useMemo(() => new BackgroundRenderSystem(), []);

  useEffect(() => {
    playMusic("/assets/music/main-bgm.mp3");
    return () => stopMusic();
  }, [playMusic, stopMusic]);

  if (loading || !entity) {
    return <LoadingPage progress={1} />;
  }

  const handleDialogueComplete = () => {
    if (entity.components.choice) setPhase("choice");
    else if (entity.components.miniGame) setPhase("miniGame");
    else if (entity.components.ending) onEnd();
  };

  const handleChoiceSelect = (nextId: string) => {
    setCurrentId(nextId);
    setPhase("dialogue");
  };

  const handleMiniGameComplete = (nextId: string) => {
    setCurrentId(nextId);
    setPhase("dialogue");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {bgSystem.render(entity)}
      <div className="absolute inset-0 flex justify-center items-end">
        {phase === "dialogue" && (
          <DialogueBox entity={entity} onComplete={handleDialogueComplete} />
        )}
        {phase === "choice" && (
          <ChoiceBox entity={entity} onChoiceSelect={handleChoiceSelect} />
        )}
        {phase === "miniGame" && entity.components.miniGame?.type === "card-match" && (
          <CardGameBox entity={entity} onComplete={handleMiniGameComplete} />
        )}
        {phase === "miniGame" && entity.components.miniGame?.type === "wheel-of-fortune" && (
          <WheelGameBox entity={entity} onComplete={handleMiniGameComplete} />
        )}
      </div>
    </div>
  );
};
