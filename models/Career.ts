import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareer extends Document {
  slug: string;
  title: string;
  location?: string;
  type?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    location: { type: String },
    type: { type: String },
    summary: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    requirements: [{ type: String, required: true }],
    benefits: [{ type: String }],
  },
  { timestamps: true }
);

const Career: Model<ICareer> =
  mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema);

export default Career;
