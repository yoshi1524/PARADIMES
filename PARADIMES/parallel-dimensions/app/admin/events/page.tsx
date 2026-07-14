import { events } from "@/lib/data/events";
import Link from "next/link";

export const metadata = { title: "Events Control | Parallel Dimensions" };

// Mock payment verification queue — stands in for real HelixPay/GCash
// webhook data landing here once app/api/webhooks/helixpay/route.ts writes
// to a real database instead of just logging.
const pendingPayments = [
  { ref: "love-sick-2026-01", event: "LOVE SICK", buyer: "J. Dela Cruz", amount: 1600, method: "GCash" },
  { ref: "manila-mi-vida-04", event: "Manila Mi Vida", buyer: "A. Santos", amount: 800, method: "Card" },
];

export default function EventsControlPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Admin</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Events Control</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Manage events and verify payments — content here is edited in{" "}
        <code className="text-silver">lib/data/events.ts</code> for now; wire this table to a real
        database and form before non-developers need to use it.
      </p>

      <div className="mt-8 overflow-x-auto border border-static/70">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Venue</th>
              <th className="px-4 py-3">Tiers</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.slug} className="border-b border-static/40 text-ash">
                <td className="px-4 py-3 text-bone">{e.title}</td>
                <td className="px-4 py-3 capitalize">{e.status}</td>
                <td className="px-4 py-3">{e.dateLabel}</td>
                <td className="px-4 py-3">{e.venue}</td>
                <td className="px-4 py-3">{e.tickets?.length ?? 0}</td>
                <td className="px-4 py-3">
                  <Link href={`/events/${e.slug}`} className="font-mono text-xs uppercase text-silver hover:text-bone">
                    View public page →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-silver">Payment Verification Queue</p>
        <p className="mt-1 text-xs text-ash">Sample data — becomes real once HelixPay/GCash webhooks write here.</p>
        <div className="mt-4 overflow-x-auto border border-static/70">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((p) => (
                <tr key={p.ref} className="border-b border-static/40 text-ash">
                  <td className="px-4 py-3 font-mono text-xs text-bone">{p.ref}</td>
                  <td className="px-4 py-3">{p.event}</td>
                  <td className="px-4 py-3">{p.buyer}</td>
                  <td className="px-4 py-3">₱{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
