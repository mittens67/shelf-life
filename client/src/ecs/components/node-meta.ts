export class NodeMetadataComponent {
  nodeId: string;
  type: "dialogue" | "mini-game" | "ending" | "start-screen" | "ui";

  constructor(nodeId: string, type: "dialogue" | "mini-game" | "ending" | "start-screen" | "ui") {
    this.nodeId = nodeId;
    this.type = type;
  }
}