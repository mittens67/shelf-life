import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const nomadNeutral = {
  id: "nomadNeutral",
  components: {
    dialogue: new DialogueComponent([
      "You ran out of savings but gained stories and lessons.",
      "Life continues."
    ]),
    ending: new EndingComponent("neutral"),
    asset: new AssetComponent("/assets/images/nomad/nomad-neutral.png", ""),
    metadata: new NodeMetadataComponent("nomadNeutral", "ending")
  }
};