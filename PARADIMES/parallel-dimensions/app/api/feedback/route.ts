import { NextRequest, NextResponse } from "next/server";
import { addPendingFeedback } from "@/lib/data/staff";
import { sendMail } from "@/lib/mail";
import { feedbackNotifyEmail } from "@/lib/contactRouting";

/**
 * Feedback submissions land in the in-memory pending-feedback store (see
 * lib/data/staff.ts) so Marketing/Admin can review them at
 * /admin/testimonials, AND trigger an email to the marketing inbox so
 * they don't have to keep the dashboard open to know something came in.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, affiliation, quote, rating } = body ?? {};

  if (!name || !quote || !rating) {
    return NextResponse.json({ error: "Missing name, quote, or rating." }, { status: 400 });
  }

  const entry = addPendingFeedback({ name, affiliation, quote, rating: Number(rating) });

  await sendMail({
    to: feedbackNotifyEmail,
    subject: `New testimonial submitted — ${name}`,
    text: `${name} (${affiliation || "no affiliation given"}) left ${rating}/5 stars:\n\n"${quote}"\n\nReview it at /admin/testimonials.`,
  });

  return NextResponse.json({ ok: true, entry });
}
