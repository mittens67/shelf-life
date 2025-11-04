import type { Entity } from "../types";

export class GameStateSystem {
  static currentEntity: Entity | null = null;

  static setCurrentEntity(entity: Entity) {
    this.currentEntity = entity;
  }

  static getCurrentEntity() {
    return this.currentEntity;
  }
}
