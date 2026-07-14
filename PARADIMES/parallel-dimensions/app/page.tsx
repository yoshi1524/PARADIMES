import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import TestimonialCard from "@/components/TestimonialCard";
import Link from "next/link";
import { events } from "@/lib/data/events";
import { services } from "@/lib/data/team";
import { partners } from "@/lib/data/testimonials";
import { getPublishedTestimonials } from "@/lib/data/staff";

export default function HomePage() {
  const featured = events.filter((e) => e.status !== "past").slice(0, 3);
  const testimonials = getPublishedTestimonials();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="On the calendar"
          title="Present &amp; Upcoming"
          description="What's on sale now, and what's coming next."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
        <Link
          href="/events"
          className="mt-10 inline-block font-mono text-xs uppercase tracking-widest text-silver hover:text-bone"
        >
          View all events →
        </Link>
      </section>

      <section className="border-y border-static/70 bg-iron/30">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <SectionHeading
            eyebrow="What we run"
            title="Services"
            description="Full-stack promotions for bar parties and venue partners."
          />
          <div className="grid gap-px overflow-hidden border border-static/70 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-void p-6">
                <h3 className="font-display text-lg uppercase tracking-wide text-bone">{s.title}</h3>
                <p className="mt-2 text-sm text-ash">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <SectionHeading eyebrow="From the floor" title="Testimonials" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
        <Link
          href="/testimonials"
          className="mt-10 inline-block font-mono text-xs uppercase tracking-widest text-silver hover:text-bone"
        >
          Read more feedback →
        </Link>
      </section>

      <section className="border-t border-static/70 bg-iron/30">
        <div className="mx-auto max-w-6xl overflow-hidden px-5 py-14 md:px-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-silver">Partners &amp; Venues</p>
          <div className="marquee-track animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={i}
                className="mr-12 whitespace-nowrap font-display text-3xl uppercase text-ash/60"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
