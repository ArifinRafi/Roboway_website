/**
 * Orders List API Route
 *
 * GET /api/3d-printing/orders
 *
 * Returns a list of orders for the admin dashboard.
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order, { OrderStatus } from "@/models/Order";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;

const getR2Client = () => {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials are missing");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
};

const getKeyFromFilePath = (filePath: string) => {
  if (filePath.startsWith("r2://")) {
    const withoutScheme = filePath.replace("r2://", "");
    const [, ...rest] = withoutScheme.split("/");
    return rest.join("/");
  }
  if (filePath.startsWith("http")) {
    const url = new URL(filePath);
    return url.pathname.replace(/^\/+/, "");
  }
  return null;
};

const deleteFileFromStorage = async (filePath: string) => {
  if (!filePath) return;

  if (filePath.startsWith("r2://") || filePath.startsWith("http")) {
    if (!R2_BUCKET) {
      throw new Error("R2 bucket is not configured");
    }
    const bucket = filePath.startsWith("r2://")
      ? filePath.replace("r2://", "").split("/")[0]
      : R2_BUCKET;
    const key = getKeyFromFilePath(filePath);
    if (!key) return;
    const client = getR2Client();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    return;
  }

  if (existsSync(filePath)) {
    await unlink(filePath);
  }
};

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, status } = body || {};

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId } = body || {};

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await Order.findOne({ orderId }).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const files =
      order.fileInfos && order.fileInfos.length > 0 ? order.fileInfos : [order.fileInfo];
    await Promise.all(files.map((file) => deleteFileFromStorage(file.filePath)));

    await Order.deleteOne({ orderId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
