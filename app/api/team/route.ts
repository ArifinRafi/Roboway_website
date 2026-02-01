import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectDB();
    const team = await TeamMember.find({}).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}
