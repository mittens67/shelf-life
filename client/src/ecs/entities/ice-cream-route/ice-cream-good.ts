import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const iceCreamGood = {
  id: "iceCreamGood",
  components: {
    dialogue: new DialogueComponent([
      "A little joy sparks your creativity again!",
      "Plus, an all-expenses-paid trip to Paris!",
      "Looks like your life if gonna be exciting after a long while!"
    ]),
    ending: new EndingComponent("good"),
    asset: new AssetComponent("/assets/images/ice-cream/ice-cream-good.png", ""),
    metadata: new NodeMetadataComponent("iceCreamGood", "ending")
  }
};