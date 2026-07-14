import { NextRequest, NextResponse } from "next/server";
import { addInquiry } from "@/lib/data/staff";
import { getSession } from "@/lib/session";
import { sendMail } from "@/lib/mail";
import { clientInquiryEmail } from "@/lib/contactRouting";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = await req.json();
  const { eventType, venue, date, requirements } = body ?? {};
  if (!requirements) {
    return NextResponse.json({ error: "Missing requirements." }, { status: 400 });
  }

  const inquiry = addInquiry({
    clientName: session.name,
    clientEmail: session.email,
    eventType: eventType || "General",
    venue: venue || "TBD",
    date: date || "TBD",
    requirements,
  });

  await sendMail({
    to: clientInquiryEmail,
    subject: `New client inquiry — ${session.name}`,
    text: `Client: ${session.name} (${session.email})\nEvent type: ${eventType || "General"}\nVenue: ${venue || "TBD"}\nDate: ${date || "TBD"}\n\nRequirements:\n${requirements}\n\nReview at /admin/inquiries.`,
    replyTo: session.email,
  });

  await sendMail({
    to: session.email,
    subject: "We received your inquiry — Parallel Dimensions",
    text: `Hi ${session.name},\n\nYour inquiry has been submitted and our team will follow up shortly. You can track its status any time at /portal.\n\n-- Parallel Dimensions`,
  });

  return NextResponse.json({ ok: true, inquiry });
}
