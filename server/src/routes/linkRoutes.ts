import { Router } from "express";
import {
  createShareableLink,
  getShareableLinks,
  getShareableLinkByHash,
  deleteShareableLink,
} from "../controller/shareableLinkController.js";

const router = Router();

router.post("/", createShareableLink); // Create new link
router.get("/", getShareableLinks); // Get all links
router.get("/:hash", getShareableLinkByHash); // Get link by hash
router.delete("/:id", deleteShareableLink); // Delete link

export default router;
