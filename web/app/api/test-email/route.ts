import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to");

  if (!to) {
    return NextResponse.json(
      { ok: false, message: "Missing ?to=email@example.com query param" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, message: "RESEND_API_KEY is not set" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    to,
    from: process.env.SENDER_EMAIL || "info@outline-online.com",
    subject: "Outline Online — Resend test email",
    html: `<p>This is a test email sent via Resend at ${new Date().toISOString()}.</p>`,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Failed to send email", error },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "Email sent", id: data?.id });
}
