import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

export async function GET() {
  try {
    await connectDB();
    const careers = await Career.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, careers });
  } catch (error) {
    console.error("Admin careers fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { slug, title, summary, responsibilities, requirements } = body;
    if (!slug || !title || !summary || !responsibilities || !requirements) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, summary, responsibilities, requirements" },
        { status: 400 }
      );
    }

    const career = await Career.create(body);
    return NextResponse.json({ success: true, career });
  } catch (error: any) {
    console.error("Admin career create error:", error);
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
  }
}
