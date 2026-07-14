import { NextRequest, NextResponse } from "next/server";
import { DEMO_USERS, DEMO_OTP, defaultRouteFor } from "@/lib/auth";
import { encodeSession, SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase());

  if (!user || user.role !== "client") {
    return NextResponse.json({ error: "No client account found for that email." }, { status: 404 });
  }
  if (otp !== DEMO_OTP) {
    return NextResponse.json({ error: "Incorrect code. Use the demo code shown on screen." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, redirectTo: defaultRouteFor(user.role) });
  res.cookies.set(SESSION_COOKIE_NAME, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
