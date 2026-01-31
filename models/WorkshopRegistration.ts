import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkshopRegistration extends Document {
  workshop: "satellite-workshop";
  fullName: string;
  educationLevel: "School" | "College" | "University";
  classSemester: string;
  phone: string;
  email: string;
  bkashCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopRegistrationSchema = new Schema(
  {
    workshop: { type: String, default: "satellite-workshop", index: true },
    fullName: { type: String, required: true, trim: true },
    educationLevel: { type: String, required: true },
    classSemester: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    bkashCode: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const WorkshopRegistration: Model<IWorkshopRegistration> =
  mongoose.models.WorkshopRegistration ||
  mongoose.model<IWorkshopRegistration>("WorkshopRegistration", WorkshopRegistrationSchema);

export default WorkshopRegistration;
