import { GameStateSystem } from "./systems/game-state";
import { entitiesMap } from "./entities-map";
import { gameLoop } from "./game-loop";


// Set starting entity
GameStateSystem.setCurrentEntity(entitiesMap.start);

// Kick off game loop
gameLoop();
