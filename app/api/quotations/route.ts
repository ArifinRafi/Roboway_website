import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Quotation from "@/models/Quotation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectSlug, projectTitle, name, email, phone, organization, details } = body || {};

    if (!projectSlug || !projectTitle || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();
    await Quotation.create({
      projectSlug: String(projectSlug).trim(),
      projectTitle: String(projectTitle).trim(),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      organization: organization ? String(organization).trim() : undefined,
      details: details ? String(details).trim() : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quotation submission error:", error);
    return NextResponse.json({ error: "Failed to submit quotation" }, { status: 500 });
  }
}
