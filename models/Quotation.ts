import mongoose, { Schema, Document, Model } from "mongoose";

export enum QuotationStatus {
  NEW = "new",
  CONTACTED = "contacted",
  CLOSED = "closed",
}

export interface IQuotation extends Document {
  projectSlug: string;
  projectTitle: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  details?: string;
  status: QuotationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationSchema: Schema = new Schema(
  {
    projectSlug: { type: String, required: true, trim: true, index: true },
    projectTitle: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    details: { type: String, trim: true },
    status: {
      type: String,
      enum: Object.values(QuotationStatus),
      default: QuotationStatus.NEW,
    },
  },
  { timestamps: true }
);

QuotationSchema.index({ createdAt: -1 });

const Quotation: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>("Quotation", QuotationSchema);

export default Quotation;
