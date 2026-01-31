import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Workshop from "@/models/Workshop";

export async function GET() {
  try {
    await connectDB();
    const workshops = await Workshop.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select({ title: 1, slug: 1, _id: 0 })
      .lean();

    if (workshops.length > 0) {
      return NextResponse.json({ workshops });
    }
  } catch (error) {
    console.error("Workshops fetch error:", error);
  }

  return NextResponse.json({
    workshops: [{ title: "Satellite Workshop", slug: "satellite-workshop" }],
  });
}
