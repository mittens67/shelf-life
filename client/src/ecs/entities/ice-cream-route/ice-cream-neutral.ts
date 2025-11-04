import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const iceCreamNeutral = {
  id: "iceCreamNeutral",
  components: {
    dialogue: new DialogueComponent([
      "The free ice cream was comforting, but nothing really changed.",
      "But you feel much better now. Life really is about the cheap thrills.",
      "Tomorrow may be mundane, but now its not so gloomy."
    ]),
    ending: new EndingComponent("neutral"),
    asset: new AssetComponent("/assets/images/ice-cream/ice-cream-neutral.png", ""),
    metadata: new NodeMetadataComponent("iceCreamNeutral", "ending")
  }
};