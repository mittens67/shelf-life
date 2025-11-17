import { useEffect, useState } from "react";
import { createEntityFromJSON } from "../ecs/factory/entity-factory";
import { getEntityAssets } from "../utils/get-entity-assets";
import { usePreload } from "./use-preload";

export function useEntityLoader(entityId: string) {
  const [entity, setEntity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchEntity() {
      setLoading(true);
      try {
        const res = await fetch(`/api/entity/${entityId}`);
        const json = await res.json();
        if (cancelled) return;

        const builtEntity = createEntityFromJSON(json);
        const assets = getEntityAssets(builtEntity);

        // Preload all entity assets before exposing it
        const { preloadAssets } = await import("../utils/preload-assets");
        await preloadAssets(assets);
        if (!cancelled) setEntity(builtEntity);
      } catch (err) {
        console.error(`Failed to load entity ${entityId}:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEntity();
    return () => {
      cancelled = true;
    };
  }, [entityId]);

  return { entity, loading };
}
