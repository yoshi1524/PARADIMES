import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { getDepartmentEmail } from "@/lib/contactRouting";

/**
 * Sends the submission to the right department inbox (see
 * lib/contactRouting.ts) and a short confirmation back to whoever
 * submitted it. Both go through lib/mail.ts, which logs instead of
 * sending until GMAIL_USER/GMAIL_APP_PASSWORD are set in .env.local —
 * so this works immediately in dev, and starts really sending the moment
 * you configure Gmail.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, reason } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing name, email, or message." }, { status: 400 });
  }

  const to = getDepartmentEmail(reason);

  await sendMail({
    to,
    subject: `New inquiry — ${reason || "General"} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nReason: ${reason || "General"}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  await sendMail({
    to: email,
    subject: "We received your message — Parallel Dimensions",
    text: `Hi ${name},\n\nThanks for reaching out to Parallel Dimensions — we received your message and someone from our team will follow up soon. We always prioritize your availability when scheduling, and a first call typically runs 1-2 hours.\n\nYour message:\n${message}\n\n-- Parallel Dimensions`,
  });

  return NextResponse.json({ ok: true });
}
