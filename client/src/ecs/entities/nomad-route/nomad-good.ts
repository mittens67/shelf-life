import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const nomadGood = {
  id: "nomadGood",
  components: {
    dialogue: new DialogueComponent([
      "You found a sustainable travel lifestyle.",
      "New friends, purpose, and freedom! Life feels vibrant."
    ]),
    ending: new EndingComponent("good"),
    asset: new AssetComponent("/assets/images/nomad/nomad-good.png", ""),
    metadata: new NodeMetadataComponent("nomadGood", "ending")
  }
};