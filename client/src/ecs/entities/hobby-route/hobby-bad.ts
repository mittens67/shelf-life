import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const hobbyBad = {
  id: "hobbyBad",
  components: {
    dialogue: new DialogueComponent([
      "You struggled too much and compared yourself harshly to others.",
      "Your motivation fades."
    ]),
    ending: new EndingComponent("bad"),
    asset: new AssetComponent("/assets/images/hobby/hobby-bad.png", ""),
    metadata: new NodeMetadataComponent("hobbyBad", "ending")
  }
};