import { subscribers } from "@/lib/data/staff";

export const metadata = { title: "Newsletter | Parallel Dimensions" };

export default function NewsletterAdminPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Marketing</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Newsletter Subscribers</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Sample list — no signup form is wired up on the public site yet. Add one (a simple email
        field + API route, same pattern as the feedback form) if you want this to fill with real
        subscribers.
      </p>

      <div className="mt-8 overflow-x-auto border border-static/70">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.email} className="border-b border-static/40 text-ash">
                <td className="px-4 py-3 text-bone">{s.email}</td>
                <td className="px-4 py-3">{s.subscribedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
