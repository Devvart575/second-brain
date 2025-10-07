import { Router } from "express";
import { createUser, loginUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup",protect ,createUser);
router.post("/login",protect ,loginUser);
export default router;
