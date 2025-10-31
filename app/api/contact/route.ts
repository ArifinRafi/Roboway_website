import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = "teamroboway@gmail.com";

    if (!apiKey) {
      // No provider configured -> do NOT pretend success
      console.warn("[contact] RESEND_API_KEY not set; logging message only", { name, email, message });
      return NextResponse.json(
        { ok: false, error: "Email is not configured on the server (missing RESEND_API_KEY)." },
        { status: 501 },
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Roboway Website <onboarding@resend.dev>",
        to: [to],
        subject: `New contact form message from ${name}`,
        reply_to: email,
        html: `<div style="font-family:Inter,system-ui,sans-serif;color:#111">
          <h2>New Message from Roboway Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[contact] Resend error:", text);
      return NextResponse.json({ ok: false, error: "Email provider error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


