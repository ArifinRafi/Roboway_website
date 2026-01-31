import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;

function getKeyFromFilePath(filePath: string): string | null {
  if (!filePath) return null;
  if (filePath.startsWith("r2://")) {
    const withoutScheme = filePath.replace("r2://", "");
    const [, ...rest] = withoutScheme.split("/");
    return rest.length > 0 ? rest.join("/") : null;
  }
  if (filePath.startsWith("http")) {
    try {
      const url = new URL(filePath);
      return url.pathname.replace(/^\/+/, "") || null;
    } catch {
      return null;
    }
  }
  return null;
}

function getR2Client() {
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
}

export async function POST(req: NextRequest) {
  try {
    if (!R2_BUCKET) {
      return NextResponse.json({ error: "R2 bucket is not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { filePath } = body || {};
    if (!filePath) {
      return NextResponse.json({ error: "filePath is required" }, { status: 400 });
    }

    const key = getKeyFromFilePath(filePath);
    if (!key) {
      return NextResponse.json({ error: "File is not stored in R2" }, { status: 400 });
    }

    const client = getR2Client();
    const command = new GetObjectCommand({ Bucket: R2_BUCKET, Key: key });
    const url = await getSignedUrl(client, command, { expiresIn: 60 * 5 });

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Admin order download error:", error);
    return NextResponse.json({ error: "Failed to create download link" }, { status: 500 });
  }
}
