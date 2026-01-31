import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

export async function GET() {
  try {
    await connectDB();
    const careers = await Career.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, careers });
  } catch (error) {
    console.error("Public careers fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}
