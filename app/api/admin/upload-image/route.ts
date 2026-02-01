import { NextRequest, NextResponse } from "next/server";
import { extname } from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export async function POST(req: NextRequest) {
  try {
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
    const R2_BUCKET = process.env.R2_BUCKET;
    const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;

    if (
      !R2_ACCOUNT_ID ||
      !R2_ACCESS_KEY_ID ||
      !R2_SECRET_ACCESS_KEY ||
      !R2_BUCKET ||
      !R2_PUBLIC_BASE_URL
    ) {
      return NextResponse.json(
        { error: "R2 is not configured for image uploads" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "Image too large (max 10MB)" }, { status: 400 });
    }

    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
    }

    const ext = extname(file.name) || ".jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const key = `uploads/images/${fileName}`;

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    const baseUrl = R2_PUBLIC_BASE_URL.replace(/\/$/, "");
    const publicUrl = `${baseUrl}/${key}`;

    return NextResponse.json({ success: true, path: publicUrl });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
