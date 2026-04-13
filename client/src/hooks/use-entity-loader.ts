import { useEffect, useState } from "react";
import api from "../api/axios";
import { createEntityFromJSON } from "../ecs/factory/entity-factory";
import { getEntityAssets } from "../utils/get-entity-assets";
import { usePreload } from "./use-preload";

export function useEntityLoader(entityId: string) {
  const [entity, setEntity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchEntity() {
      setLoading(true);
      setProgress(0);
      try {
        const res = await api.get(`/entities/${entityId}`);
        console.log("Entity fetched: ", res);
        console.log("Entity ID: ", entityId);
        if (cancelled) return;

        const builtEntity = createEntityFromJSON(res.data);
        const assets = getEntityAssets(builtEntity);

        // Preload all entity assets before exposing it
        const { preloadAssets } = await import("../utils/preload-assets");
        await preloadAssets(assets, ({ progress }) => {
          if (!cancelled) setProgress(progress);
        });
        
        if (!cancelled) {
          setEntity(builtEntity);
          setProgress(1);
        }
        console.log("Entity loaded: ", builtEntity);
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

  return { entity, loading, progress };
}
