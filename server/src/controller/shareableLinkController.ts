import type{ Request, Response } from "express";
import ShareableLink from "../models/shareableLink.js";
import { shareableLinkSchema } from "../validations/shareableLinkValidation.js";

export const createShareableLink = async (req: Request, res: Response) => {
  try {
    const parsedData = shareableLinkSchema.parse(req.body);
    const link = new ShareableLink(parsedData);
    await link.save();
    res.status(201).json(link);
  } catch (error: any) {
    res.status(400).json({ error: error.errors ?? error.message });
  }
};

export const getShareableLinks = async (_: Request, res: Response) => {
  try {
    const links = await ShareableLink.find().populate("userId", "username");
    res.status(200).json(links);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getShareableLinkByHash = async (req: Request, res: Response) => {
  try {
    const link = await ShareableLink.findOne({ hash: req.params.hash }).populate("userId", "username");
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.status(200).json(link);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteShareableLink = async (req: Request, res: Response) => {
  try {
    const link = await ShareableLink.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.status(200).json({ message: "Link deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
