import { Router } from "express";
import { addEntity, getEntityById } from "../controllers/entity-controller";

const router = Router();

router.get("/:id", getEntityById);
router.post("/", addEntity);

export default router;
