import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateFeedbackStatus } from "@/lib/data/staff";

const ALLOWED_ROLES = ["marketing", "promotions", "system_admin", "administrative"];

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    return NextResponse.json({ error: "Not authorized to moderate testimonials." }, { status: 403 });
  }

  const { action, rejectionReason } = await req.json();
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "Action must be 'approve' or 'reject'." }, { status: 400 });
  }

  const entry = updateFeedbackStatus(
    params.id,
    action === "approve" ? "Published" : "Rejected",
    session.name,
    rejectionReason
  );

  if (!entry) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  return NextResponse.json({ ok: true, entry });
}
