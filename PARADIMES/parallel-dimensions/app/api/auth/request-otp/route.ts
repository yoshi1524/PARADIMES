import { NextRequest, NextResponse } from "next/server";
import { DEMO_USERS } from "@/lib/auth";

/**
 * Step 1 of the Client login flow: look up the email, "send" an OTP.
 * No real SMTP is wired up (see .env.example / README) — the OTP is
 * always the fixed demo code, and this just confirms the email is a
 * known Client account so the UI can move to the OTP step.
 *
 * Staff no longer use this path at all — they sign in with a personal
 * user code at /staff-access (see app/api/auth/staff-login/route.ts).
 * This route rejects staff emails on purpose, so the two login paths
 * stay genuinely separate rather than both quietly accepting email.
 */
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase());

  if (!user || user.role !== "client") {
    return NextResponse.json(
      { error: "No client account found for that email. Staff sign in with a user code at /staff-access instead." },
      { status: 404 }
    );
  }

  console.log(`[auth:otp] Demo OTP for ${user.email} is 123456 (no real SMTP configured yet).`);
  return NextResponse.json({ ok: true, name: user.name, role: user.role });
}
