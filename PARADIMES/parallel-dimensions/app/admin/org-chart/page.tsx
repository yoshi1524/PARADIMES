import { team } from "@/lib/data/team";

export const metadata = { title: "Org Chart | Parallel Dimensions" };

export default function OrgChartAdminPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Reference</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Org Chart</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Edited in <code className="text-silver">lib/data/team.ts</code>. This is the same data shown
        publicly on the About page — kept here too since Marketing and Admin both reference it.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden border border-static/70 sm:grid-cols-2 md:grid-cols-4">
        {team.map((m) => (
          <div key={m.name} className={`p-5 ${m.isLeadership ? "bg-iron" : "bg-void"}`}>
            <p className="font-display text-base uppercase text-bone">{m.name}</p>
            <p className="mt-1 text-xs text-ash">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
