import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WorkshopRegistration from "@/models/WorkshopRegistration";

const MAX_SEATS = 10;

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const validatePhone = (phone: string) => /^[0-9+\-\s]{8,20}$/.test(phone.trim());

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      educationLevel,
      classSemester,
      phone,
      email,
      bkashCode,
    } = body || {};

    if (!fullName || !educationLevel || !classSemester || !phone || !email || !bkashCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    await connectDB();

    const currentCount = await WorkshopRegistration.countDocuments({
      workshop: "satellite-workshop",
    });
    if (currentCount >= MAX_SEATS) {
      return NextResponse.json(
        { error: "All seats are filled", remaining: 0, max: MAX_SEATS },
        { status: 409 }
      );
    }

    await WorkshopRegistration.create({
      workshop: "satellite-workshop",
      fullName: String(fullName).trim(),
      educationLevel,
      classSemester: String(classSemester).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      bkashCode: String(bkashCode).trim(),
    });

    const remaining = Math.max(0, MAX_SEATS - (currentCount + 1));
    return NextResponse.json({
      success: true,
      remaining,
      max: MAX_SEATS,
      total: currentCount + 1,
    });
  } catch (error) {
    console.error("Workshop registration error:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
