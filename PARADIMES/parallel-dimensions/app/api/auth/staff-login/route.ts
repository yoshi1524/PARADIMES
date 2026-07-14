import { NextRequest, NextResponse } from "next/server";
import { DEMO_USERS, defaultRouteFor } from "@/lib/auth";
import { roleForPrefix } from "@/lib/userCodes";
import { encodeSession, SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const trimmed = String(code || "").trim().toUpperCase();

  const user = DEMO_USERS.find((u) => u.code === trimmed);

  if (!user) {
    // Give a slightly more useful error if the prefix is at least
    // recognizable, without confirming whether a specific code exists.
    const prefix = trimmed.split("-")[0];
    const role = roleForPrefix(prefix);
    const hint = role ? " Check the code with your department lead — it wasn't recognized." : " That prefix isn't recognized at all.";
    return NextResponse.json({ error: `Invalid user code.${hint}` }, { status: 401 });
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
