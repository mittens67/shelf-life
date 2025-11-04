import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { EndingComponent } from "../../components/ending";
import { NodeMetadataComponent } from "../../components/node-meta";

export const nomadBad = {
  id: "nomadBad",
  components: {
    dialogue: new DialogueComponent([
      "Everything collapsed: scams, lost money, and isolation.",
      "You regret quitting your stable job."
    ]),
    ending: new EndingComponent("bad"),
    asset: new AssetComponent("/assets/images/nomad/nomad-bad.png", ""),
    metadata: new NodeMetadataComponent("nomadBad", "ending")
  }
};