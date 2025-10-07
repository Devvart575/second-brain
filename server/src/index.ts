import express from "express";
import type{ Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/links", linkRoutes);

// Example protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hello ${(req as any).user?.email}, protected route` });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
