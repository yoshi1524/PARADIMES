import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { generateUserCode } from "@/lib/userCodes";
import type { StaffRole } from "@/lib/auth";

const STAFF_ROLES: StaffRole[] = ["system_admin", "administrative", "manager", "admin", "marketing", "promotions", "promoter"];

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || (session.role !== "system_admin" && session.role !== "administrative")) {
    return NextResponse.json({ error: "Not authorized to generate user codes." }, { status: 403 });
  }

  const { role } = await req.json();
  if (!STAFF_ROLES.includes(role)) {
    return NextResponse.json({ error: "Unknown role." }, { status: 400 });
  }

  return NextResponse.json({ code: generateUserCode(role) });
}
