import { cookies } from "next/headers";
import type { DemoUser } from "@/lib/auth";

const COOKIE_NAME = "pd_session";

export type Session = DemoUser;

// DEMO ONLY: the cookie is plain base64 JSON, not signed or encrypted.
// Anyone could forge one by hand. Replace with signed sessions (iron-session,
// NextAuth, JWT, or Laravel's own session handling) before this touches
// real user data.
//
// Uses atob/btoa (not Node's Buffer) so the same encode/decode logic works
// in both Route Handlers and Edge middleware.
export function encodeSession(user: DemoUser): string {
  return btoa(JSON.stringify(user));
}

export function decodeSession(raw: string | undefined | null): Session | null {
  if (!raw) return null;
  try {
    return JSON.parse(atob(raw));
  } catch {
    return null;
  }
}

export function getSession(): Session | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  return decodeSession(raw);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
