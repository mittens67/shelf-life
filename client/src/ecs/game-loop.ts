import { GameStateSystem } from "./systems/game-state";
import { DialogueSystem } from "./systems/dialogue-box";
import { ChoiceSystem } from "./systems/choice-box";
import { MiniGameSystem } from "./systems/mini-game";
import { RenderSystem } from "./systems/background-render";

const dialogueSystem = new DialogueSystem();
const choiceSystem = new ChoiceSystem();
const miniGameSystem = new MiniGameSystem();
const renderSystem = new RenderSystem();

export function gameLoop() {
  const entity = GameStateSystem.getCurrentEntity();
  if (!entity) return;

  dialogueSystem.update(entity);
  renderSystem.render(entity);

  if (entity.components.choice) {
    // wait for player input → choiceSystem.handleChoice(entity, choiceIndex)
  }

  if (entity.components.miniGame) {
    // run mini-game → miniGameSystem.handleMiniGame(entity, result)
  }
}
