import { Request, Response } from "express";
import { EntityModel } from "../models/entity-model";

export const getEntityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entity = await EntityModel.findOne({ id });

    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    res.json(entity);
  } catch (err) {
    console.error("❌ Error fetching entity:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addEntity = async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(req.body);
  console.log("********************8")
  try {
    const entity = new EntityModel({
      ...data
    });
    await entity.save();
    res.status(201).json({ message: "Data add done" });
  } catch (error) {
    console.error("❌ Error fetching entity:", error);
    res.status(500).json({ message: "Server error" });
  }
}
