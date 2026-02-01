import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Quotation from "@/models/Quotation";

export async function GET() {
  try {
    await connectDB();
    const quotations = await Quotation.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, quotations });
  } catch (error) {
    console.error("Admin quotations fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch quotations" }, { status: 500 });
  }
}
