import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShareableLink extends Document {
  hash: string;
  userId: Types.ObjectId;
}

const linkSchema = new Schema<IShareableLink>({
  hash: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model<IShareableLink>("ShareableLink", linkSchema);
