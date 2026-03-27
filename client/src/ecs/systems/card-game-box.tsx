// src/ecs/systems/card-game-box.tsx
import React, { useEffect, useState } from "react";
import type { Entity } from "../types";
import { MiniGameSystem } from "./mini-game";
import { MiniGameComponent } from "../components/mini-game";

const CARD_BACK = "/assets/images/mini-games/card-game/common/card-back.png";
const CARD_FRONT_BASE = "/assets/images/mini-games/card-game/";
const CARD_FRONT_HOBBY_BASE = "hobby-route/";
const CARD_FRONT_NOMAD_BASE = "nomad-route/";

export const CardGameBox: React.FC<{
  entity: Entity;
  onComplete: (nextNode: string) => void;
}> = ({ entity, onComplete }) => {
  const miniGame = entity.components.miniGame as MiniGameComponent;
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [failCount, setFailCount] = useState(0);
  const [locked, setLocked] = useState(false);

  const cardFrontBase = CARD_FRONT_BASE + (entity.id=== "hobbyRoute" ? CARD_FRONT_HOBBY_BASE : CARD_FRONT_NOMAD_BASE);

  const system = new MiniGameSystem();

  useEffect(() => {
    if (!miniGame.cards || miniGame.cards.length < 5) return;

    const pairs = miniGame.cards.slice(0, miniGame.pairs ?? 4);
    const trap = miniGame.cards[miniGame.cards.length - 1];
    const deck = [...pairs, ...pairs, trap];
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [miniGame]);

  const handleFlip = (index: number) => {
    if (locked || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      const [a, b] = newFlipped;
      const imgA = cards[a];
      const imgB = cards[b];

      if (imgA === imgB) {
        setMatched((prev) => [...prev, a, b]);
      } else {
        setFailCount((prev) => prev + 1);
      }

      setTimeout(() => {
        setFlipped([]);
        setLocked(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matched.length >= (miniGame.pairs ?? 4) * 2) {
      let score = 40;
      if (failCount >= 5) score = 10;
      else if (failCount >= 4) score = 20;
      else if (failCount >= 2) score = 30;

      const nextNode = system.handleMiniGame(entity, score);
      if (nextNode) {
        setTimeout(() => onComplete(nextNode), 1000);
      }
    }
  }, [matched, failCount]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          return (
            <div key={i} className="relative" style={{ perspective: 1000 }}>
              <button
                onClick={() => handleFlip(i)}
                className="w-20 sm:w-28 md:w-32 lg:w-40 xl:w-48 aspect-[3/4] p-0 border-0 bg-transparent cursor-pointer"
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 500ms",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Back face */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    <img src={CARD_BACK} alt="card back" className="w-full h-full object-cover" />
                  </div>

                  {/* Front face */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    <img src={`${cardFrontBase}${card}`} alt="card front" className="w-full h-full object-cover" />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-white mt-6 text-lg font-semibold tracking-wide">
        Mistakes: {failCount}
      </p>
    </div>
  );
};
