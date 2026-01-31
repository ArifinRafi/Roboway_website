import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkshop extends Document {
  title: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Workshop: Model<IWorkshop> =
  mongoose.models.Workshop || mongoose.model<IWorkshop>("Workshop", WorkshopSchema);

export default Workshop;
