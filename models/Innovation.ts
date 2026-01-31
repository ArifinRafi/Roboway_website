import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInnovation extends Document {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  videoUrl?: string;
  coverImage: string;
  gallery?: string[];
  techDetails?: string[];
  team?: {
    name: string;
    role?: string;
    image?: string;
    socials?: { linkedin?: string; github?: string; twitter?: string };
  }[];
  tags: string[];
  features?: { title: string; description: string; icon?: string }[];
  specsHardware?: { label: string; value: string }[];
  specsSoftware?: { label: string; value: string }[];
  useCases?: { title: string; description: string; icon?: string }[];
  actionGallery?: { title: string; image: string }[];
  upgrades?: { title: string; description: string; icon?: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const InnovationSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    videoUrl: { type: String },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    techDetails: [{ type: String }],
    team: [
      {
        name: { type: String, required: true },
        role: { type: String },
        image: { type: String },
        socials: {
          linkedin: { type: String },
          github: { type: String },
          twitter: { type: String },
        },
      },
    ],
    tags: [{ type: String, required: true }],
    features: [{ title: String, description: String, icon: String }],
    specsHardware: [{ label: String, value: String }],
    specsSoftware: [{ label: String, value: String }],
    useCases: [{ title: String, description: String, icon: String }],
    actionGallery: [{ title: String, image: String }],
    upgrades: [{ title: String, description: String, icon: String }],
  },
  { timestamps: true }
);

const Innovation: Model<IInnovation> =
  mongoose.models.Innovation || mongoose.model<IInnovation>("Innovation", InnovationSchema);

export default Innovation;
