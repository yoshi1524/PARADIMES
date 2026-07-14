import { services } from "@/lib/data/team";

export const metadata = { title: "Services | Parallel Dimensions" };

export default function ServicesAdminPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Reference</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Services</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Edited in <code className="text-silver">lib/data/team.ts</code>. Shown publicly on the
        Home and About pages.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.title} className="border border-static/70 bg-iron/40 p-5">
            <p className="font-display text-base uppercase text-bone">{s.title}</p>
            <p className="mt-1 text-sm text-ash">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
