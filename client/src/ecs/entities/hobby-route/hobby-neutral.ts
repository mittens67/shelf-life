import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const hobbyNeutral = {
  id: "hobbyNeutral",
  components: {
    dialogue: new DialogueComponent([
      "You enjoyed baking and painting, but nothing significant changes.",
      "Still, life feels a bit brighter."
    ]),
    ending: new EndingComponent("neutral"),
    asset: new AssetComponent("/assets/images/hobby/hobby-neutral.png", ""),
    metadata: new NodeMetadataComponent("hobbyNeutral", "ending")
  }
};