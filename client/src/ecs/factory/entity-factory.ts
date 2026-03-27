import { DialogueComponent } from "../components/dialog";
import { ChoiceComponent } from "../components/choice";
import { AssetComponent } from "../components/asset";
import { NodeMetadataComponent } from "../components/node-meta";
import { MiniGameComponent } from "../components/mini-game";
import { Entity } from "../types";

const COMPONENT_REGISTRY = {
  dialogue: (data: any) => new DialogueComponent(data.lines),
  choice: (data: any) => new ChoiceComponent(data.options),
  asset: (data: any) => new AssetComponent(data.image, data.music),
  metadata: (data: any) => new NodeMetadataComponent(data.id, data.type),
  miniGame: (data: any) => new MiniGameComponent(data)
};

export function createEntityFromJSON(json: any): Partial<Entity> {
  const entity: Partial<Entity> = { id: json.id, components: {} };

  for (const [key, data] of Object.entries(json.components)) {
    console.log("Component key: ", key);
    console.log("Component data: ", data);
    const factory = COMPONENT_REGISTRY[key];
    if (factory) {
      entity.components[key] = factory(data);
    } else {
      console.warn(`⚠️ Unknown component type: ${key}`);
    }
  }

  return entity;
}
