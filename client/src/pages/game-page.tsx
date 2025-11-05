import React, { useEffect, useState } from "react";
import { DialogueBox } from "../ecs/systems/dialogue-box";
import { ChoiceBox } from "../ecs/systems/choice-box";
import { CardGameBox } from "../ecs/systems/card-game-box";
import { WheelGameBox } from "../ecs/systems/wheel-game-box";
import { BackgroundRenderSystem } from "../ecs/systems/background-render";
import { startNodeEntity } from "../ecs/entities/start-node";
import { useMusicManager } from "../hooks/use-music-manager";
import { ENTITY_MAP } from "../ecs/entities/_registry";
import { MiniGameComponent } from "../ecs/components/mini-game";

interface GamePageProps {
  onEnd: () => void; // 👈 add this prop
}

export const GamePage: React.FC<GamePageProps> = ({ onEnd }) => {
  const [currentEntity, setCurrentEntity] = useState(startNodeEntity);
  const [phase, setPhase] = useState<"dialogue" | "choice" | "miniGame">("dialogue");
  const { playMusic, stopMusic } = useMusicManager();

  const bgSystem = new BackgroundRenderSystem();

  // 🎵 Start background music when entering the game
  useEffect(() => {
    playMusic("/assets/music/main-bgm.mp3");
    return () => stopMusic();
  }, []);

  const handleDialogueComplete = () => {
    if (currentEntity.components.choice) {
      setPhase("choice");
    } else if (currentEntity.components.miniGame) {
      setPhase("miniGame");
    } else if (currentEntity.components.ending) {
      // 🎯 Reached an ending — go to End Screen
      onEnd();
    }
  };

  const handleChoiceSelect = (nextNode: string) => {
    const nextEntity = ENTITY_MAP[nextNode];
    if (nextEntity) {
      setCurrentEntity(nextEntity);
      setPhase("dialogue");
    } else {
      console.warn("No entity found for nextNode:", nextNode);
    }
  };

  const handleMiniGameComplete = (nextNode: string) => {
    const nextEntity = ENTITY_MAP[nextNode];
    if (nextEntity) {
      setCurrentEntity(nextEntity);
      setPhase("dialogue");
    } else {
      console.warn("No entity found for nextNode:", nextNode);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 🎨 Background */}
      {bgSystem.render(currentEntity)}

      {/* 🎮 Gameplay layer */}
      <div className="absolute inset-0 flex justify-center items-end">
        {phase === "dialogue" && (
          <DialogueBox
            entity={currentEntity}
            onComplete={handleDialogueComplete}
          />
        )}

        {phase === "choice" && (
          <ChoiceBox
            entity={currentEntity}
            onChoiceSelect={handleChoiceSelect}
          />
        )}

        {phase === "miniGame" &&
          currentEntity.components.miniGame?.type === "card-match" && (
            <CardGameBox
              entity={currentEntity}
              onComplete={handleMiniGameComplete}
            />
          )}

        {phase === "miniGame" &&
          currentEntity.components.miniGame?.type === "wheel-of-fortune" && (
            <WheelGameBox
              entity={currentEntity}
              onComplete={handleMiniGameComplete}
            />
          )}
      </div>
    </div>
  );
};
