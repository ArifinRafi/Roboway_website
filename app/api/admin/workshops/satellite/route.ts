import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WorkshopRegistration from "@/models/WorkshopRegistration";

export async function GET() {
  try {
    await connectDB();
    const registrations = await WorkshopRegistration.find({ workshop: "satellite-workshop" })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error("Admin workshop fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, fullName, educationLevel, classSemester, phone, email, bkashCode } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Registration id is required" }, { status: 400 });
    }

    const updated = await WorkshopRegistration.findByIdAndUpdate(
      id,
      {
        fullName: fullName?.trim(),
        educationLevel,
        classSemester: classSemester?.trim(),
        phone: phone?.trim(),
        email: email?.trim()?.toLowerCase(),
        bkashCode: bkashCode?.trim(),
      },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    console.error("Admin workshop update error:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Registration id is required" }, { status: 400 });
    }

    const removed = await WorkshopRegistration.findByIdAndDelete(id).lean();
    if (!removed) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin workshop delete error:", error);
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
  }
}
