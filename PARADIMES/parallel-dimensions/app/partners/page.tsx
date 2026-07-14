import SectionHeading from "@/components/SectionHeading";
import { partners } from "@/lib/data/testimonials";
import Link from "next/link";

export const metadata = { title: "Partners | Parallel Dimensions" };

export default function PartnersPage() {
  const venues = partners.filter((p) => p.type === "Venue");
  const brands = partners.filter((p) => p.type === "Brand");

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Who we work with"
        title="Partners &amp; Sponsors"
        description="Venues we run events with, and the platforms behind ticketing and payments."
      />

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-silver">Venue Partners</p>
          <ul className="space-y-px border border-static/70">
            {venues.map((v) => (
              <li key={v.name} className="bg-iron/40 px-5 py-4 font-display text-lg uppercase text-bone">
                {v.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-silver">Platform Partners</p>
          <ul className="space-y-px border border-static/70">
            {brands.map((b) => (
              <li key={b.name} className="bg-iron/40 px-5 py-4 font-display text-lg uppercase text-bone">
                {b.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 border border-static/70 bg-iron/40 p-8">
        <p className="font-display text-2xl uppercase text-bone">Become a Venue Partner</p>
        <p className="mt-3 max-w-xl text-sm text-ash">
          Startup and new bars get access to our promoter network, social marketing, and
          full event operations — with no promotions team required on your end.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block border border-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
