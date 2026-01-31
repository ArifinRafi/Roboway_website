/**
 * Order Model/Schema
 * 
 * This defines the structure of 3D printing orders stored in MongoDB.
 * 
 * Database: roboway
 * Collection: orders
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// Order status enum
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Interface for Order document
export interface IOrder extends Document {
  orderId: string; // Unique order identifier (e.g., ORD-1234567890-ABC123)
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  fileInfo: {
    fileName: string;
    filePath: string; // Path to stored STL file
    fileSize: number; // Size in bytes
    mimeType: string; // e.g., "model/stl" or "application/octet-stream"
  };
  fileInfos?: {
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
  }[];
  printConfig: {
    material: string;
    infillDensity: number; // Percentage (0-100)
    layerHeight?: number; // Optional, in mm
    volume: number; // cm³
    weight: number; // grams
    pricePerGram: number;
    totalPrice: number;
  };
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Order Schema
const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Index for faster lookups
    },
    customerInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },
    fileInfo: {
      fileName: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
      fileSize: {
        type: Number,
        required: true,
      },
      mimeType: {
        type: String,
        required: true,
      },
    },
    fileInfos: [
      {
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
        fileSize: { type: Number, required: true },
        mimeType: { type: String, required: true },
      },
    ],
    printConfig: {
      material: {
        type: String,
        required: true,
      },
      infillDensity: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      layerHeight: {
        type: Number,
        required: false,
      },
      volume: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      pricePerGram: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create indexes for common queries
OrderSchema.index({ "customerInfo.email": 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

// Export the model
// Use existing model if available (for hot reloading in development)
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
