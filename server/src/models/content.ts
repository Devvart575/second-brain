import mongoose, { Schema, Document, Types } from "mongoose";
import User from "./user.js";

const contentTypes = ["image", "video", "article", "audio"] as const;
type ContentType = typeof contentTypes[number];

export interface IContent extends Document {
  link: string;
  type: ContentType;
  title: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: async function (value: Types.ObjectId) {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User does not exist");
      }
    }
  }
}, { timestamps: true });

// Pre-save hook (extra safety)
contentSchema.pre("save", async function (next) {
  const user = await User.findById(this.userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  next();
});

export default mongoose.model<IContent>("Content", contentSchema);
