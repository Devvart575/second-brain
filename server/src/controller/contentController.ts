import type{ Request, Response } from "express";
import Content from "../models/content.js";
import { contentSchema } from "../validations/contentValidation.js";

export const createContent = async (req: Request, res: Response) => {
  try {
    const parsedData = contentSchema.parse(req.body);
    const content = new Content(parsedData);
    await content.save();
    res.status(201).json(content);
  } catch (error: any) {
    res.status(400).json({ error: error.errors ?? error.message });
  }
};

export const getContents = async (_: Request, res: Response) => {
  try {
    const contents = await Content.find()
      .populate("userId", "username")
      .populate("tags", "title");
    res.status(200).json(contents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate("userId", "username")
      .populate("tags", "title");
    if (!content) return res.status(404).json({ error: "Content not found" });
    res.status(200).json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const parsedData = contentSchema.partial().parse(req.body);
    const content = await Content.findByIdAndUpdate(req.params.id, parsedData, { new: true });
    if (!content) return res.status(404).json({ error: "Content not found" });
    res.status(200).json(content);
  } catch (error: any) {
    res.status(400).json({ error: error.errors ?? error.message });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: "Content not found" });
    res.status(200).json({ message: "Content deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
