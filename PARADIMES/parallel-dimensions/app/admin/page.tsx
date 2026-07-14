import { getSession } from "@/lib/session";
import { ROLE_LABELS, StaffRole } from "@/lib/auth";
import StatCard from "@/components/dashboard/StatCard";
import { events } from "@/lib/data/events";
import { marketingMetrics, promotionsSummary, getInquiries } from "@/lib/data/staff";
import Link from "next/link";

export const metadata = { title: "Overview | Parallel Dimensions" };

export default function AdminOverviewPage() {
  const session = getSession();
  const role = session?.role as StaffRole;
  const inquiries = getInquiries();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Overview</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">
        Welcome back, {session?.name.split(" ")[0]}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ash">
        You&apos;re signed in as {ROLE_LABELS[role]}. Below is a snapshot of what your role tracks —
        see the sidebar for the full detail on each area.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Events Listed" value={String(events.length)} />
        <StatCard label="Marketing Leads" value={String(marketingMetrics.totalLeads)} />
        <StatCard label="Promoter Commission" value={`₱${promotionsSummary.totalCommission.toLocaleString()}`} />
        <StatCard label="Open Inquiries" value={String(inquiries.filter((i) => i.status === "New").length)} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="border border-static/70 bg-iron/40 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-silver">Events on Sale / Upcoming</p>
          <ul className="mt-4 space-y-3">
            {events.filter((e) => e.status !== "past").map((e) => (
              <li key={e.slug} className="flex items-center justify-between text-sm">
                <span className="text-bone">{e.title}</span>
                <span className="text-ash">{e.dateLabel}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/events" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-silver hover:text-bone">
            Manage events →
          </Link>
        </div>

        <div className="border border-static/70 bg-iron/40 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-silver">Recent Inquiries</p>
          <ul className="mt-4 space-y-3">
            {inquiries.slice(0, 4).map((i) => (
              <li key={i.id} className="flex items-center justify-between text-sm">
                <span className="text-bone">{i.clientName}</span>
                <span className="text-ash">{i.status}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/inquiries" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-silver hover:text-bone">
            View all inquiries →
          </Link>
        </div>
      </div>
    </div>
  );
}
