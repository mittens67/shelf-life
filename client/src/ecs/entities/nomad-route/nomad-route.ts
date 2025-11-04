import { AssetComponent } from "../../components/asset";
import { DialogueComponent } from "../../components/dialog";
import { MiniGameComponent } from "../../components/mini-game";
import { NodeMetadataComponent } from "../../components/node-meta";

export const nomadRouteNode = {
  id: "nomadRoute",
  components: {
    dialogue: new DialogueComponent([
      "You’ve always wanted to travel the world.",
      "Time to take a leap of faith and explore new possibilities.",
    ]),
    miniGame: new MiniGameComponent({
      type: "card-match",
      theme: "vacation",
      cards: [
        "/assets/images/mini-games/card-game/nomad-route/camera.png",
        "/assets/images/mini-games/card-game/nomad-route/luggage.png",
        "/assets/images/mini-games/card-game/nomad-route/hat.png",
        "/assets/images/mini-games/card-game/nomad-route/sunglasses.png",
        "/assets/images/mini-games/card-game/nomad-route/passport.png",
      ],
      pairs: 4,
      scores: {
        10: "nomadBad",
        20: "nomadNeutral",
        30: "nomadNeutral",
        40: "nomadGood",
      },
    }),
    asset: new AssetComponent("/assets/images/nomad/nomad-start.png", ""),
    metadata: new NodeMetadataComponent("nomadRoute", "mini-game"),
  },
};
