import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Innovation from "@/models/Innovation";

export async function GET() {
  try {
    await connectDB();
    const innovations = await Innovation.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, innovations });
  } catch (error) {
    console.error("Admin innovations fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch innovations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { slug, title, description, coverImage, tags } = body;
    if (!slug || !title || !description || !coverImage || !tags || tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, description, coverImage, tags" },
        { status: 400 }
      );
    }

    const innovation = await Innovation.create(body);
    return NextResponse.json({ success: true, innovation });
  } catch (error: any) {
    console.error("Admin innovation create error:", error);
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create innovation" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, slug, title, description, coverImage, tags } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Innovation id is required" }, { status: 400 });
    }
    if (!slug || !title || !description || !coverImage || !tags || tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, description, coverImage, tags" },
        { status: 400 }
      );
    }

    const updated = await Innovation.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ error: "Innovation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, innovation: updated });
  } catch (error: any) {
    console.error("Admin innovation update error:", error);
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update innovation" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Innovation id is required" }, { status: 400 });
    }

    const removed = await Innovation.findByIdAndDelete(id).lean();
    if (!removed) {
      return NextResponse.json({ error: "Innovation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin innovation delete error:", error);
    return NextResponse.json({ error: "Failed to delete innovation" }, { status: 500 });
  }
}
