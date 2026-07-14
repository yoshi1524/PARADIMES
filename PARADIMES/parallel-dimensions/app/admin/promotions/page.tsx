import StatCard from "@/components/dashboard/StatCard";
import { promoters, promotionsSummary } from "@/lib/data/staff";
import { getSession } from "@/lib/session";

export const metadata = { title: "Promotions | Parallel Dimensions" };

export default function PromotionsPage() {
  const session = getSession();
  const isPromoter = session?.role === "promoter";

  const rows = isPromoter
    ? promoters.filter((p) => p.host.toLowerCase() === session?.name.toLowerCase())
    : promoters;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">
        {isPromoter ? "My Referrals" : "Promotions Department"}
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">
        {isPromoter ? "Commissions & Referrals" : "Promoter Activity & Commissions"}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        {isPromoter
          ? "Your referral and commission activity from the current event cycle."
          : "Monitors promoter activity, campaigns, referrals, and commission-related operations. Figures are pulled from your LOVE SICK 2026 guestlist workbook (AUTOCOUNTER sheet) — a representative sample, not the full list."}
      </p>

      {!isPromoter && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total Guests" value={promotionsSummary.totalGuests.toLocaleString()} />
          <StatCard label="Ticket Commission" value={`₱${promotionsSummary.totalTicketCommission.toLocaleString()}`} />
          <StatCard label="Table Commission" value={`₱${promotionsSummary.totalTableCommission.toLocaleString()}`} />
          <StatCard label="Total Commission" value={`₱${promotionsSummary.totalCommission.toLocaleString()}`} />
        </div>
      )}

      <div className="mt-10 overflow-x-auto border border-static/70">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
            <tr>
              {!isPromoter && <th className="px-4 py-3">Manager</th>}
              <th className="px-4 py-3">Host</th>
              <th className="px-4 py-3">Pax</th>
              <th className="px-4 py-3">Sales</th>
              <th className="px-4 py-3">Commission</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ash">
                  No referral activity recorded for this account yet — this is a demo dataset,
                  not every promoter name will match.
                </td>
              </tr>
            )}
            {rows.map((p, i) => (
              <tr key={i} className="border-b border-static/40 text-ash">
                {!isPromoter && <td className="px-4 py-3 text-bone">{p.manager}</td>}
                <td className="px-4 py-3 text-bone">{p.host}</td>
                <td className="px-4 py-3">{p.totalPax}</td>
                <td className="px-4 py-3">₱{p.totalSales.toLocaleString()}</td>
                <td className="px-4 py-3">₱{p.commission.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`border px-2 py-0.5 font-mono text-[10px] uppercase ${
                      p.status === "Eligible" ? "border-bone text-bone" : "border-static text-ash"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
