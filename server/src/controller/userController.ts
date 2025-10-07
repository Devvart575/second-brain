import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import userValidation from "../validations/userValidation.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate request body with Zod
        const parsedData = userValidation.parse(req.body)

        // save to DB (if it is valid)
        const newUser = new User(parsedData)
        await newUser.save()
        res.status(201).json({
            sucess: true,
            user: newUser
        })
    }
    catch (error: any) {
        if (error.errors) {
            // Zod validation error
            res.status(400).json({ success: false, errors: error.errors });
        } else {
            // Other server/DB errors
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email }) as typeof User.prototype;
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

   const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Optional: You can store refreshToken in DB for token rotation
    user.refreshToken = refreshToken;
    await user.save();

    // 4. Send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};