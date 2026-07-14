import { NextRequest, NextResponse } from "next/server";
import { decodeSession, SESSION_COOKIE_NAME } from "@/lib/session";
import { canAccess, defaultRouteFor } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/portal");
  if (!isProtected) return NextResponse.next();

  const session = decodeSession(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (!session) {
    const isStaffArea = pathname.startsWith("/admin");
    const loginUrl = new URL(isStaffArea ? "/staff-access" : "/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccess(session.role, pathname)) {
    return NextResponse.redirect(new URL(defaultRouteFor(session.role), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
