import { Router } from "express";
import {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
} from "../controller/contentController.js";

const router = Router();

router.post("/", createContent); // Create content
router.get("/", getContents); // Get all content
router.get("/:id", getContentById); // Get single content
router.put("/:id", updateContent); // Update content
router.delete("/:id", deleteContent); // Delete content

export default router;
