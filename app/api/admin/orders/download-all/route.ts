import { NextRequest } from "next/server";
import archiver from "archiver";
import { PassThrough, Readable } from "stream";
import { createReadStream } from "fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export const runtime = "nodejs";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

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

async function getFileStream(filePath: string, fileName: string) {
  if (filePath.startsWith("r2://") || filePath.startsWith("http")) {
    const bucket = filePath.startsWith("r2://")
      ? filePath.replace("r2://", "").split("/")[0]
      : process.env.R2_BUCKET;
    const key = getKeyFromFilePath(filePath);
    if (!bucket || !key) {
      throw new Error("Invalid R2 file path");
    }
    const client = getR2Client();
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return response.Body as Readable;
  }
  return createReadStream(filePath);
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return new Response(JSON.stringify({ error: "orderId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectDB();
    const order = await Order.findOne({ orderId }).lean();
    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const files =
      order.fileInfos && order.fileInfos.length > 0 ? order.fileInfos : [order.fileInfo];

    const stream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      stream.destroy(err);
    });

    archive.pipe(stream);

    for (const file of files) {
      const fileStream = await getFileStream(file.filePath, file.fileName);
      archive.append(fileStream, { name: file.fileName });
    }

    await archive.finalize();

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="order-${orderId}-files.zip"`,
      },
    });
  } catch (error) {
    console.error("Download all error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate zip" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
