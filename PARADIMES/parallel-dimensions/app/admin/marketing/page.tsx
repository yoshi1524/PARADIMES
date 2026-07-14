import StatCard from "@/components/dashboard/StatCard";
import { campaigns, marketingMetrics, targetAudienceSegments } from "@/lib/data/staff";
import Link from "next/link";

export const metadata = { title: "Marketing | Parallel Dimensions" };

export default function MarketingPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Marketing Department</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Campaigns &amp; Content</h1>
      <p className="mt-2 max-w-xl text-sm text-ash">
        Manages promotional content, event postings, and digital marketing campaigns — per your
        capstone&apos;s Table 3. Figures below are illustrative placeholders; swap for real ad-account
        or CRM data before launch.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/marketing/events/new"
          className="border border-bone bg-bone px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone"
        >
          + Post New Event
        </Link>
        <Link
          href="/admin/testimonials"
          className="border border-static px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ash hover:border-silver hover:text-bone"
        >
          Moderate Testimonials
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Leads" value={String(marketingMetrics.totalLeads)} />
        <StatCard label="Active Campaigns" value={String(marketingMetrics.activeCampaigns)} />
        <StatCard label="Avg. Conversion" value={`${marketingMetrics.avgConversionRate}%`} />
        <StatCard label="Total Spend" value={`₱${marketingMetrics.totalSpend.toLocaleString()}`} />
      </div>

      <div className="mt-10 overflow-x-auto border border-static/70">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
            <tr>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Leads</th>
              <th className="px-4 py-3">Conversion</th>
              <th className="px-4 py-3">Spend</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} className="border-b border-static/40 text-ash">
                <td className="px-4 py-3 text-bone">{c.name}</td>
                <td className="px-4 py-3">{c.channel}</td>
                <td className="px-4 py-3">
                  <span
                    className={`border px-2 py-0.5 font-mono text-[10px] uppercase ${
                      c.status === "Active" ? "border-bone text-bone" : "border-static text-ash"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">{c.leads}</td>
                <td className="px-4 py-3">{c.conversionRate}%</td>
                <td className="px-4 py-3">₱{c.spend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 border border-static/70 bg-iron/40 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-silver">Target Audience</p>
        <div className="mt-4 space-y-3">
          {targetAudienceSegments.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs text-ash">
                <span>{s.label}</span>
                <span>{s.share}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-static/40">
                <div className="h-1.5 bg-bone" style={{ width: `${s.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
