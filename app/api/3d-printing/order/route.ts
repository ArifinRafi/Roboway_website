/**
 * 3D Printing Order API Route
 * 
 * POST /api/3d-printing/order
 * 
 * Accepts multipart/form-data with:
 * - file: STL/OBJ file
 * - fullName: Customer full name
 * - address: Customer address
 * - phone: Customer phone number
 * - email: Customer email
 * - material: Selected material type
 * - infillDensity: Infill percentage (0-100)
 * - quotation: JSON string of quotation data
 * 
 * Returns:
 * - success: boolean
 * - orderId: Unique order identifier
 * - message: Success message
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order, { OrderStatus } from "@/models/Order";
import { saveFile, validateFile } from "@/lib/fileStorage";

// Input validation helpers
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePhone(phone: string): boolean {
  // Accepts international format: +1234567890 or local: 1234567890
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function generateOrderId(): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `ORD-${timestamp}-${randomString}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse multipart/form-data
    const formData = await request.formData();

    // Extract form fields
    const files =
      (formData.getAll("files") as File[]).length > 0
        ? (formData.getAll("files") as File[])
        : (formData.getAll("file") as File[]);
    const expectedCount = parseInt(formData.get("fileCount") as string);
    if (expectedCount && files.length !== expectedCount) {
      return NextResponse.json(
        { error: "Some files did not upload. Please try again." },
        { status: 400 }
      );
    }
    const fullName = formData.get("fullName") as string | null;
    const address = formData.get("address") as string | null;
    const phone = formData.get("phone") as string | null;
    const email = formData.get("email") as string | null;
    const material = formData.get("material") as string | null;
    const infillDensity = formData.get("infillDensity") as string | null;
    const quotationStr = formData.get("quotation") as string | null;

    // Validate required fields
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "STL files are required" },
        { status: 400 }
      );
    }

    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!address || !address.trim()) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    if (!material) {
      return NextResponse.json(
        { error: "Material type is required" },
        { status: 400 }
      );
    }

    if (!infillDensity) {
      return NextResponse.json(
        { error: "Infill density is required" },
        { status: 400 }
      );
    }

    if (!quotationStr) {
      return NextResponse.json(
        { error: "Quotation data is required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Validate file
    for (const file of files) {
      const fileValidation = validateFile(file);
      if (!fileValidation.valid) {
        return NextResponse.json(
          { error: fileValidation.error || "File validation failed" },
          { status: 400 }
        );
      }
    }

    // Parse quotation data
    let quotation;
    try {
      quotation = JSON.parse(quotationStr);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid quotation data format" },
        { status: 400 }
      );
    }

    // Validate quotation structure
    if (
      !quotation.material ||
      typeof quotation.volume !== "number" ||
      typeof quotation.weight !== "number" ||
      typeof quotation.pricePerGram !== "number" ||
      typeof quotation.totalPrice !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid quotation data structure" },
        { status: 400 }
      );
    }

    // Validate infill density
    const infill = parseInt(infillDensity);
    if (isNaN(infill) || infill < 0 || infill > 100) {
      return NextResponse.json(
        { error: "Infill density must be between 0 and 100" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Save file to storage
    let fileInfos;
    try {
      fileInfos = await Promise.all(files.map((file) => saveFile(file, orderId)));
    } catch (fileError) {
      console.error("Error saving file:", fileError);
      return NextResponse.json(
        { error: fileError instanceof Error ? fileError.message : "Failed to save file" },
        { status: 500 }
      );
    }

    // Connect to MongoDB
    try {
      await connectDB();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please check your MongoDB configuration." },
        { status: 500 }
      );
    }

    // Create order document
    try {
      const order = new Order({
        orderId,
        customerInfo: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          address: address.trim(),
        },
        fileInfo: {
          fileName: fileInfos[0].fileName,
          filePath: fileInfos[0].filePath,
          fileSize: fileInfos[0].fileSize,
          mimeType: fileInfos[0].mimeType,
        },
        fileInfos: fileInfos.map((info, index) => ({
          fileName: files[index].name,
          filePath: info.filePath,
          fileSize: info.fileSize,
          mimeType: info.mimeType,
        })),
        printConfig: {
          material: material.trim(),
          infillDensity: infill,
          volume: quotation.volume,
          weight: quotation.weight,
          pricePerGram: quotation.pricePerGram,
          totalPrice: quotation.totalPrice,
        },
        status: OrderStatus.PENDING,
      });

      await order.save();

      // TODO: Send confirmation email
      // Example with Resend (you already have RESEND_API_KEY in your project):
      // const apiKey = process.env.RESEND_API_KEY;
      // if (apiKey) {
      //   try {
      //     await fetch("https://api.resend.com/emails", {
      //       method: "POST",
      //       headers: {
      //         Authorization: `Bearer ${apiKey}`,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         from: "Roboway <onboarding@resend.dev>",
      //         to: [email.trim().toLowerCase()],
      //         subject: `Order Confirmation - ${orderId}`,
      //         html: `
      //           <h2>Thank you for your order!</h2>
      //           <p>Your order ID: <strong>${orderId}</strong></p>
      //           <p>We'll contact you shortly with order details.</p>
      //         `,
      //       }),
      //     });
      //   } catch (emailError) {
      //     console.error("Failed to send confirmation email:", emailError);
      //     // Don't fail the order if email fails
      //   }
      // }

      return NextResponse.json({
        success: true,
        orderId,
        message: "Order created successfully",
      });
    } catch (dbError: any) {
      console.error("Error saving order to database:", dbError);

      // Handle duplicate order ID (very rare, but possible)
      if (dbError.code === 11000) {
        // Retry with new order ID
        const retryOrderId = generateOrderId();
        // Note: In production, you might want to retry the entire operation
        return NextResponse.json(
          { error: "Order ID conflict. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to save order to database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in order API:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
