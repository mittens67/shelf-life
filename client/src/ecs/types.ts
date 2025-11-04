import { DialogueComponent } from "./components/dialog";
import { ChoiceComponent } from "./components/choice";
import { MiniGameComponent } from "./components/mini-game";
import { EndingComponent } from "./components/ending";
import { AssetComponent } from "./components/asset";
import { NodeMetadataComponent } from "./components/node-meta";

export type Entity = {
  id: string;
  components: {
    dialogue?: DialogueComponent;
    choice?: ChoiceComponent;
    miniGame?: MiniGameComponent;
    ending?: EndingComponent;
    asset?: AssetComponent;
    metadata: NodeMetadataComponent;
  };
};
