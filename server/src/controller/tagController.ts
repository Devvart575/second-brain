import type{ Request, Response } from "express";
import Tag from "../models/tag.js";
import { tagSchema } from "../validations/tagValidation.js";

export const createTag = async (req: Request, res: Response) => {
  try {
    const parsedData = tagSchema.parse(req.body);
    const tag = new Tag(parsedData);
    await tag.save();
    res.status(201).json(tag);
  } catch (error: any) {
    res.status(400).json({ error: error.errors ?? error.message });
  }
};

export const getTags = async (_: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.status(200).json({ message: "Tag deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
