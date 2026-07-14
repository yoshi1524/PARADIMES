import { NextRequest, NextResponse } from "next/server";
import { addInquiryComment, getInquiries } from "@/lib/data/staff";
import { getSession } from "@/lib/session";
import { sendMail } from "@/lib/mail";
import { clientInquiryEmail } from "@/lib/contactRouting";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "Missing comment text." }, { status: 400 });

  const before = getInquiries().find((i) => i.id === params.id);
  if (!before) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });

  const inquiry = addInquiryComment(params.id, {
    author: session.name,
    text,
    at: new Date().toISOString().slice(0, 10),
  });

  // Notify whichever side didn't just write the comment, so replies
  // actually reach an inbox instead of only living in the dashboard.
  if (session.role === "client") {
    await sendMail({
      to: clientInquiryEmail,
      subject: `New reply on inquiry — ${before.clientName}`,
      text: `${session.name} replied on their inquiry (${before.eventType}, ${before.venue}):\n\n"${text}"\n\nView at /admin/inquiries.`,
    });
  } else {
    await sendMail({
      to: before.clientEmail,
      subject: "New update on your inquiry — Parallel Dimensions",
      text: `Hi ${before.clientName},\n\n${session.name} added an update on your inquiry:\n\n"${text}"\n\nView and reply at /portal.\n\n-- Parallel Dimensions`,
    });
  }

  return NextResponse.json({ ok: true, inquiry });
}
