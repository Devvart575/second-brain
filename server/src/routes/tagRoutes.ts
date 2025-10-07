import { Router } from "express";
import {
  createTag,
  getTags,
  deleteTag,
} from "../controller/tagController.js";

const router = Router();

router.post("/", createTag); // Create a new tag
router.get("/", getTags); // Get all tags
router.delete("/:id", deleteTag); // Delete a tag

export default router;
