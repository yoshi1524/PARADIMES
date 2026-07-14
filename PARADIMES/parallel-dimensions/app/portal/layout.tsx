import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/AdminShell";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();
  if (!session || session.role !== "client") redirect("/login");

  return (
    <AdminShell
      nav={[{ href: "/portal", label: "My Inquiries" }]}
      roleLabel="Client Portal"
      userName={session.name}
    >
      {children}
    </AdminShell>
  );
}
