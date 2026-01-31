import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Innovation from "@/models/Innovation";

export async function GET() {
  try {
    await connectDB();
    const innovations = await Innovation.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, innovations });
  } catch (error) {
    console.error("Public innovations fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch innovations" }, { status: 500 });
  }
}
