import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { addEvent, type PDEvent } from "@/lib/data/events";
import { canAccess } from "@/lib/auth";

// Roles allowed to post event listings — Marketing owns "event postings"
// per Chapter 3's Table 3, Admin/Manager/System Admin/Administrative can too
// since they already manage events operationally.
const ALLOWED_ROLES = ["marketing", "admin", "manager", "system_admin", "administrative"];

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    return NextResponse.json({ error: "Not authorized to post events." }, { status: 403 });
  }

  const body = await req.json();
  const { title, status, date, dateLabel, venue, city, summary, description, host, lineup, eventPartners, dressCode, ageRequirement, tickets } = body ?? {};

  if (!title || !date || !venue || !summary) {
    return NextResponse.json({ error: "Missing title, date, venue, or summary." }, { status: 400 });
  }

  const event = addEvent({
    title,
    status: (status as PDEvent["status"]) || "upcoming",
    date,
    dateLabel: dateLabel || new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    venue,
    city: city || "Metro Manila",
    cover: "rift-1",
    summary,
    description: description || summary,
    host: host || "Parallel Dimensions",
    lineup: Array.isArray(lineup) ? lineup.filter(Boolean) : undefined,
    eventPartners: Array.isArray(eventPartners) ? eventPartners.filter(Boolean) : undefined,
    dressCode: dressCode || undefined,
    ageRequirement: ageRequirement || undefined,
    tickets: Array.isArray(tickets) ? tickets : undefined,
    createdBy: session.name,
  });

  return NextResponse.json({ ok: true, event });
}
