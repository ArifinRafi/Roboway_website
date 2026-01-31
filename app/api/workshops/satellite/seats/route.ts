import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WorkshopRegistration from "@/models/WorkshopRegistration";

const MAX_SEATS = 10;

export async function GET() {
  try {
    await connectDB();
    const total = await WorkshopRegistration.countDocuments({
      workshop: "satellite-workshop",
    });
    const remaining = Math.max(0, MAX_SEATS - total);
    return NextResponse.json({ remaining, max: MAX_SEATS, total });
  } catch (error) {
    console.error("Workshop seats error:", error);
    return NextResponse.json({ error: "Failed to load seats" }, { status: 500 });
  }
}
