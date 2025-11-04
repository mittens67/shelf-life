import { DialogueComponent } from "../components/dialog";
import { ChoiceComponent } from "../components/choice";
import { AssetComponent } from "../components/asset";
import { NodeMetadataComponent } from "../components/node-meta";

// Example: start node entity
export const startNodeEntity = {
  id: "start",
  components: {
    dialogue: new DialogueComponent([
      "You are working as a librarian. It pays enough for your daily needs and a bit of saving, but after 10 years, the monotony is wearing you down.",
      "You see your school mean girl on Instagram. She became a famous singer after taking a leap of faith and following her passion.",
      "You feel restless. What do you do?"
    ]),
    choice: new ChoiceComponent([
      { label: "Rediscover your flair as an artist and baking skills", nextNode: "hobbyRoute" },
      { label: "Take a leap of faith! Quit your job and travel", nextNode: "nomadRoute" },
      { label: "Buy some ice cream and call it a day", nextNode: "iceCreamRoute" }
    ]),
    asset: new AssetComponent(
      "/assets/images/start/start-node.png", // image placeholder
      ""  // music placeholder
    ),
    metadata: new NodeMetadataComponent("start", "dialogue")
  }
};
