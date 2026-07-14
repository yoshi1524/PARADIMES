import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { NAV_BY_ROLE, ROLE_LABELS, StaffRole } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();
  if (!session || session.role === "client") redirect("/login");

  const role = session.role as StaffRole;
  const nav = NAV_BY_ROLE[role];

  return (
    <AdminShell nav={nav} roleLabel={ROLE_LABELS[role]} userName={session.name}>
      {children}
    </AdminShell>
  );
}
