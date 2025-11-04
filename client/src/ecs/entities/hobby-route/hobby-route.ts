import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { MiniGameComponent } from "../../components/mini-game";
import { NodeMetadataComponent } from "../../components/node-meta";

export const hobbyRouteNode = {
  id: "hobbyRoute",
  components: {
    dialogue: new DialogueComponent([
      "You dig up an old passion: painting and baking.",
      "You remember how relaxing it felt to bake cookies and decorate cakes.",
      "Maybe you could become the next Crumble Cookie!",
    ]),
    miniGame: new MiniGameComponent({
      type: "card-match",
      theme: "bakery",
      cards: [
        "/assets/images/mini-games/card-game/hobby-route/cookie.png",
        "/assets/images/mini-games/card-game/hobby-route/croissant.png",
        "/assets/images/mini-games/card-game/hobby-route/cupcake.png",
        "/assets/images/mini-games/card-game/hobby-route/donut.png",
        "/assets/images/mini-games/card-game/hobby-route/pastry.png",
      ],
      pairs: 4,
      scores: {
        10: "hobbyBad",
        20: "hobbyNeutral",
        30: "hobbyNeutral",
        40: "hobbyGood",
      },
    }),
    asset: new AssetComponent("/assets/images/hobby/hobby-start.jpg", ""),
    metadata: new NodeMetadataComponent("hobbyRoute", "mini-game"),
  },
};
