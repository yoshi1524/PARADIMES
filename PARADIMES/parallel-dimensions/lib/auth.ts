/**
 * Auth model for the internal system.
 *
 * This is a DEMO auth layer, not a production one — there's no real user
 * database yet (the capstone spec calls for MySQL via Laravel; this Next.js
 * build doesn't have a database wired up at all). It exists so the
 * role-based dashboards described in Chapter 3 (System Administrator,
 * Administrative, Manager, Admin, Marketing, Promotions, Promoter, Client)
 * are actually demoable and reviewable, not just described.
 *
 * Before real use:
 *   - Replace DEMO_USERS with a real users table (MySQL, per your spec, or
 *     any DB if you stay on Next.js).
 *   - Replace the plaintext session cookie with signed/encrypted sessions
 *     (e.g. iron-session, NextAuth, or Laravel's own session handling if
 *     you port this to Laravel).
 *   - Replace the fixed demo OTP ("123456") with a real emailed one-time
 *     code via your SMTP service.
 */

/**
 * Auth model for the internal system.
 *
 * This is a DEMO auth layer, not a production one — there's no real user
 * database yet (the capstone spec calls for MySQL via Laravel; this Next.js
 * build doesn't have a database wired up at all). It exists so the
 * role-based dashboards described in Chapter 3 (System Administrator,
 * Administrative, Manager, Admin, Marketing, Promotions, Promoter, Client)
 * are actually demoable and reviewable, not just described.
 *
 * Two separate login paths, matching two separate audiences:
 *   - STAFF (everyone "in the company") sign in with a personalized user
 *     code at /staff-access — a hidden route, not linked anywhere on the
 *     public site. Each code starts with a department letter (see
 *     lib/userCodes.ts) followed by a randomized suffix, e.g. a Marketing
 *     employee's code starts with "M-".
 *   - CLIENTS (external business/venue partners) sign in with email + a
 *     one-time code at /login, which the public site does link to (as
 *     "Client / Partner Login") since they're a legitimate external
 *     audience who need to find it.
 *
 * Before real use:
 *   - Replace DEMO_USERS with a real users table (MySQL, per your spec, or
 *     any DB if you stay on Next.js) — one row per actual employee, each
 *     with their own generated code.
 *   - Replace the plaintext session cookie with signed/encrypted sessions
 *     (e.g. iron-session, NextAuth, or Laravel's own session handling if
 *     you port this to Laravel).
 *   - Replace the fixed demo OTP ("123456") with a real emailed one-time
 *     code via your SMTP service, for the Client login path.
 */

export type StaffRole =
  | "system_admin"
  | "administrative"
  | "manager"
  | "admin"
  | "marketing"
  | "promotions"
  | "promoter";

export type UserRole = StaffRole | "client";

export type DemoUser = {
  email: string; // still used for Clients' login, and for staff as an internal identifier/contact
  code?: string; // staff only — this is what they actually log in with
  name: string;
  role: UserRole;
};

// Demo directory — stand-ins for the eight user types Chapter 3 defines.
// Staff sign in with their `code` at /staff-access. The Client signs in
// with their email at /login (OTP step accepts "123456").
export const DEMO_USERS: DemoUser[] = [
  { email: "sysadmin@paralleldimensions.ph", code: "S-8WYD", name: "System Administrator", role: "system_admin" },
  { email: "ceo@paralleldimensions.ph", code: "C-2MRX", name: "Michael Bazar", role: "administrative" },
  { email: "manager@paralleldimensions.ph", code: "G-9QLT", name: "Operations Manager", role: "manager" },
  { email: "admin@paralleldimensions.ph", code: "A-5JXP", name: "Events Admin", role: "admin" },
  { email: "marketing@paralleldimensions.ph", code: "M-7XQ2", name: "Marketing Team", role: "marketing" },
  { email: "promotions@paralleldimensions.ph", code: "P-3RWN", name: "Promotions Team", role: "promotions" },
  { email: "promoter@paralleldimensions.ph", code: "R-6HTK", name: "Nate Villegas", role: "promoter" },
  { email: "client@paralleldimensions.ph", name: "Demo Client", role: "client" },
];

export const DEMO_OTP = "123456";

export const ROLE_LABELS: Record<UserRole, string> = {
  system_admin: "System Administrator",
  administrative: "Administrative (CEO/Management)",
  manager: "Manager",
  admin: "Admin",
  marketing: "Marketing Department",
  promotions: "Promotions Department",
  promoter: "Promoter",
  client: "Client",
};

export type NavItem = { href: string; label: string };

const ALL_STAFF_NAV: NavItem[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/marketing", label: "Marketing" },
  { href: "/admin/marketing/events/new", label: "Post New Event" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/events", label: "Events Control" },
  { href: "/admin/org-chart", label: "Org Chart" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/inquiries", label: "Client Inquiries" },
  { href: "/admin/users", label: "User Management" },
];

// Which nav items each role can see — mirrors the "role-based dashboard
// management" requirement in Chapter 3. system_admin and administrative
// see everything; other roles see only what their section of Chapter 3
// describes them managing.
export const NAV_BY_ROLE: Record<StaffRole, NavItem[]> = {
  system_admin: ALL_STAFF_NAV,
  administrative: ALL_STAFF_NAV,
  manager: ALL_STAFF_NAV.filter((i) =>
    ["/admin", "/admin/promotions", "/admin/events", "/admin/inquiries", "/admin/marketing/events/new"].includes(i.href)
  ),
  admin: ALL_STAFF_NAV.filter((i) =>
    ["/admin", "/admin/events", "/admin/inquiries", "/admin/services", "/admin/org-chart", "/admin/marketing/events/new"].includes(
      i.href
    )
  ),
  marketing: ALL_STAFF_NAV.filter((i) =>
    [
      "/admin",
      "/admin/marketing",
      "/admin/marketing/events/new",
      "/admin/testimonials",
      "/admin/services",
      "/admin/newsletter",
      "/admin/org-chart",
    ].includes(i.href)
  ),
  promotions: ALL_STAFF_NAV.filter((i) =>
    ["/admin", "/admin/promotions", "/admin/testimonials"].includes(i.href)
  ),
  promoter: [{ href: "/admin", label: "Overview" }, { href: "/admin/promotions", label: "My Referrals" }],
};

export function canAccess(role: UserRole, path: string): boolean {
  if (role === "client") return path.startsWith("/portal");
  const nav = NAV_BY_ROLE[role];
  return nav.some((item) => (item.href === "/admin" ? path === "/admin" : path.startsWith(item.href)));
}

export function defaultRouteFor(role: UserRole): string {
  return role === "client" ? "/portal" : "/admin";
}
