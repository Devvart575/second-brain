
import type {  Request , Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import type { IUser } from "../models/user.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// POST /api/auth/signup
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const createdUser = await User.create({ name, email, password: hashed });
  const user = createdUser as IUser;

  const accessToken = generateAccessToken((user._id as unknown as string));
  const refreshToken = generateRefreshToken((user._id as unknown as string));

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    accessToken,
  });
});

// POST /api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken((user._id as string | { toString(): string }).toString());
  const refreshToken = generateRefreshToken((user._id as string | { toString(): string }).toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    accessToken,
  });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookie = req.cookies?.refreshToken;

  if (cookie) {
    const user = await User.findOne({ refreshToken: cookie });
    if (user) {
    user.refreshToken = "";
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
});

// GET /api/auth/refresh
export const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cookie = req.cookies?.refreshToken;
    if (!cookie) {
      res.status(401);
      throw new Error("No refresh token");
    }

    const user = await User.findOne({ refreshToken: cookie }) as IUser;
    if (!user) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    try {
      const decoded = jwt.verify(
        cookie,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as { id: string };

      if (decoded.id !== (user._id as string | { toString(): string }).toString()) {
        res.status(401);
        throw new Error("Token mismatch");
      }
    } catch (err) {
      user.refreshToken = "";
      await user.save();
      res.clearCookie("refreshToken");
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken((user._id as string | { toString(): string }).toString());
    const newRefreshToken = generateRefreshToken((user._id as string | { toString(): string }).toString());

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  }
);
