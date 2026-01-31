/**
 * File Storage Utility
 * 
 * Handles STL file storage with validation and proper file handling.
 * 
 * Storage Options:
 * 1. Local Filesystem (fallback)
 *    - Files stored in /uploads/orders/ directory
 *    - Works for development and some hosting platforms
 *    - NOT suitable for serverless/ephemeral file systems (Vercel, some Render configs)
 * 
 * 2. Cloudflare R2 (recommended for production)
 *    - S3-compatible object storage
 *    - Use env vars to enable R2 uploads
 * 
 * To switch to cloud storage, configure the R2 environment variables.
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Maximum file size: 50MB (adjust as needed)
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// Allowed file types
const ALLOWED_MIME_TYPES = [
  "model/stl",
  "application/octet-stream", // Some STL files may have this MIME type
  "application/x-navistyle", // Alternative STL MIME type
];

const ALLOWED_EXTENSIONS = [".stl", ".obj"];

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;
const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;

const useR2Storage =
  Boolean(R2_ACCOUNT_ID) &&
  Boolean(R2_ACCESS_KEY_ID) &&
  Boolean(R2_SECRET_ACCESS_KEY) &&
  Boolean(R2_BUCKET);

/**
 * Validates uploaded file
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file extension
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return {
      valid: false,
      error: `Invalid file type. Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed.`,
    };
  }

  // Check MIME type (if available)
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    // Some browsers may not set MIME type correctly for STL files
    // So we only validate if MIME type is present
    console.warn(`Unexpected MIME type: ${file.type} for file: ${file.name}`);
  }

  return { valid: true };
}

/**
 * Generates a unique filename to prevent conflicts
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.substring(originalName.lastIndexOf("."));
  return `${timestamp}-${randomString}${extension}`;
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

async function saveFileToR2(
  file: File,
  orderId: string
): Promise<{ filePath: string; fileName: string; fileSize: number; mimeType: string }> {
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || "File validation failed");
  }

  const fileName = generateFileName(file.name);
  const key = `orders/${orderId}/${fileName}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  const baseUrl = R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const filePath = baseUrl ? `${baseUrl}/${key}` : `r2://${R2_BUCKET}/${key}`;

  return {
    filePath,
    fileName,
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
  };
}

/**
 * Saves file to local filesystem
 * 
 * @param file - The file to save
 * @param orderId - Unique order ID for organizing files
 * @returns Object with file path and metadata
 */
export async function saveFile(
  file: File,
  orderId: string
): Promise<{ filePath: string; fileName: string; fileSize: number; mimeType: string }> {
  if (useR2Storage) {
    return saveFileToR2(file, orderId);
  }

  // Validate file first
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || "File validation failed");
  }

  // Create uploads directory structure: uploads/orders/{orderId}/
  const uploadsDir = join(process.cwd(), "uploads", "orders", orderId);
  
  // Ensure directory exists
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }

  // Generate unique filename
  const fileName = generateFileName(file.name);
  const filePath = join(uploadsDir, fileName);

  // Convert File to Buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  return {
    filePath: filePath, // Full system path
    fileName: fileName, // Just the filename
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
  };
}

/**
 * Alternative: Save to Supabase Storage
 * 
 * Uncomment and configure if using Supabase Storage:
 * 
 * import { createClient } from '@supabase/supabase-js';
 * 
 * const supabase = createClient(
 *   process.env.SUPABASE_URL!,
 *   process.env.SUPABASE_SERVICE_ROLE_KEY!
 * );
 * 
 * export async function saveFileToSupabase(
 *   file: File,
 *   orderId: string
 * ): Promise<{ filePath: string; fileName: string; fileSize: number; mimeType: string }> {
 *   const validation = validateFile(file);
 *   if (!validation.valid) {
 *     throw new Error(validation.error || "File validation failed");
 *   }
 * 
 *   const fileName = generateFileName(file.name);
 *   const filePath = `orders/${orderId}/${fileName}`;
 * 
 *   const bytes = await file.arrayBuffer();
 *   const buffer = Buffer.from(bytes);
 * 
 *   const { data, error } = await supabase.storage
 *     .from('stl-files')
 *     .upload(filePath, buffer, {
 *       contentType: file.type || 'application/octet-stream',
 *       upsert: false,
 *     });
 * 
 *   if (error) {
 *     throw new Error(`Failed to upload file: ${error.message}`);
 *   }
 * 
 *   return {
 *     filePath: filePath, // Path in Supabase storage
 *     fileName: fileName,
 *     fileSize: file.size,
 *     mimeType: file.type || "application/octet-stream",
 *   };
 * }
 */
