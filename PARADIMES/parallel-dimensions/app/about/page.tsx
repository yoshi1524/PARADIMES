import SectionHeading from "@/components/SectionHeading";
import { team, companyBlurb, services } from "@/lib/data/team";

export const metadata = { title: "About | Parallel Dimensions" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading eyebrow="Who we are" title="About Parallel Dimensions" />
      <p className="max-w-2xl leading-relaxed text-ash">{companyBlurb}</p>

      <div className="mt-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-silver">Org Chart</p>
        <div className="grid gap-px overflow-hidden border border-static/70 sm:grid-cols-2 md:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className={`p-6 ${m.isLeadership ? "bg-iron" : "bg-void"}`}
            >
              <p className="font-display text-lg uppercase text-bone">{m.name}</p>
              <p className="mt-1 text-xs text-ash">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-silver">What We Run</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="border border-static/70 p-5">
              <p className="font-display text-base uppercase text-bone">{s.title}</p>
              <p className="mt-1 text-sm text-ash">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 border border-static/70 bg-iron/40 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-silver">Working With Us</p>
        <p className="mt-3 max-w-2xl text-sm text-ash">
          We always prioritize the availability of our clients when scheduling. A first
          negotiation call typically runs 1–2 hours, with follow-up processing over the
          following business days.
        </p>
      </div>
    </div>
  );
}
