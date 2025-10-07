import express from "express";
import {
  signup,
  login,
  logout,
  refreshTokenHandler,
} from "../controller/authConroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshTokenHandler);

export default router;
