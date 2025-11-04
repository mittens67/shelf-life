import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const iceCreamBad = {
  id: "iceCreamBad",
  components: {
    dialogue: new DialogueComponent([
      "Bad luck! The ice cream made you sick.",
      "You’re stuck at home, grumpier than before."
    ]),
    ending: new EndingComponent("bad"),
    asset: new AssetComponent("/assets/images/ice-cream/ice-cream-bad.png", ""),
    metadata: new NodeMetadataComponent("iceCreamBad", "ending")
  }
};