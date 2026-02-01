import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  slug: string;
  name: string;
  title: string;
  image: string;
  summary?: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
  education?: string[];
  expertise?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    summary: { type: String, trim: true },
    socials: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },
    education: [{ type: String, trim: true }],
    expertise: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
