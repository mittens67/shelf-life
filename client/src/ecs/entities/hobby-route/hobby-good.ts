import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const hobbyGood = {
  id: "hobbyGood",
  components: {
    dialogue: new DialogueComponent([
      "You rediscover your passion and start sharing your creations.",
      "You feel alive again!"
    ]),
    ending: new EndingComponent("good"),
    asset: new AssetComponent("/assets/images/hobby/hobby-good.png", ""),
    metadata: new NodeMetadataComponent("hobbyGood", "ending")
  }
};