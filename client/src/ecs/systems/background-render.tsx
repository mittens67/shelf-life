import React from "react";
import { AssetComponent } from "../components/asset";
import type { Entity } from "../types";

export class BackgroundRenderSystem {
  render(entity: Entity) {
    const asset = entity.components.asset as AssetComponent | undefined;
    if (!asset?.image) return null;

    return (
      <div
        className="
          absolute inset-0 w-full h-full bg-cover bg-center
          transition-all duration-700 ease-in-out
        "
        style={{ backgroundImage: `url(${asset.image})` }}
      />
    );
  }
}
