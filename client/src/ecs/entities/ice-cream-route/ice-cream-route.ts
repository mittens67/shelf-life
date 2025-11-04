import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { MiniGameComponent } from "../../components/mini-game";
import { NodeMetadataComponent } from "../../components/node-meta";

export const iceCreamRouteNode = {
  id: "iceCreamRoute",
  components: {
    dialogue: new DialogueComponent([
      "You decide to get ice cream to lift your mood.",
      "The shopkeeper asks you to play a special 'Wheel of Flavors'.",
      "It's your lucky day! A free ice cream just when you needed the pampering!"
    ]),
    miniGame: new MiniGameComponent({
      type: "wheel-of-fortune",
      outcomes: {
        1: { endingNode: "iceCreamBad" },
        2: { endingNode: "iceCreamNeutral" },
        3: { endingNode: "iceCreamGood" },
        4: { endingNode: "iceCreamBad" },
        5: { endingNode: "iceCreamNeutral" },
        6: { endingNode: "iceCreamGood" }
      }
    }),
    asset: new AssetComponent("/assets/images/ice-cream/ice-cream-start.png", ""),
    metadata: new NodeMetadataComponent("iceCreamRoute", "mini-game")
  }
};