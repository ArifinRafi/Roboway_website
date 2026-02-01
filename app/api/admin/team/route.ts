import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectDB();
    const team = await TeamMember.find({}).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Admin team fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await connectDB();
    const existing = await TeamMember.findOne({ slug: body.slug }).lean();
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const created = await TeamMember.create(body);
    return NextResponse.json({ success: true, member: created });
  } catch (error) {
    console.error("Admin team create error:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body || {};
    if (!id) {
      return NextResponse.json({ error: "Member id is required" }, { status: 400 });
    }

    await connectDB();
    if (rest.slug) {
      const exists = await TeamMember.findOne({ slug: rest.slug, _id: { $ne: id } }).lean();
      if (exists) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    const updated = await TeamMember.findByIdAndUpdate(id, rest, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    console.error("Admin team update error:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body || {};
    if (!id) {
      return NextResponse.json({ error: "Member id is required" }, { status: 400 });
    }

    await connectDB();
    const removed = await TeamMember.findByIdAndDelete(id).lean();
    if (!removed) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin team delete error:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
