import { notFound } from "next/navigation";
import Link from "next/link";
import { events, getEventBySlug } from "@/lib/data/events";
import TicketWidget from "@/components/TicketWidget";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  return { title: event ? `${event.title} | Parallel Dimensions` : "Event | Parallel Dimensions" };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <Link href="/events" className="font-mono text-xs uppercase tracking-widest text-ash hover:text-bone">
        ← All Events
      </Link>

      <div className="mt-6 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver">{event.dateLabel} — {event.venue}, {event.city}</p>
          <h1
            className="rift mt-3 font-display text-5xl uppercase leading-none text-bone md:text-6xl"
            data-text={event.title}
          >
            {event.title}
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ash">{event.description}</p>

          <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            {event.host && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-silver">Host</dt>
                <dd className="mt-1 text-bone">{event.host}</dd>
              </div>
            )}
            {event.ageRequirement && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-silver">Age</dt>
                <dd className="mt-1 text-bone">{event.ageRequirement}</dd>
              </div>
            )}
            {event.dressCode && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-silver">Dress Code</dt>
                <dd className="mt-1 text-bone">{event.dressCode}</dd>
              </div>
            )}
            {event.lineup && event.lineup.length > 0 && (
              <div className="col-span-2 sm:col-span-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-silver">Lineup</dt>
                <dd className="mt-1 text-bone">{event.lineup.join(" · ")}</dd>
              </div>
            )}
            {event.eventPartners && event.eventPartners.length > 0 && (
              <div className="col-span-2 sm:col-span-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-silver">Event Partners</dt>
                <dd className="mt-1 text-bone">{event.eventPartners.join(" · ")}</dd>
              </div>
            )}
          </dl>

          {event.status === "past" && event.attendance && (
            <div className="mt-8 flex gap-8 border-y border-static/70 py-6">
              <div>
                <p className="font-display text-3xl text-bone">{event.attendance.toLocaleString()}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-ash">Guests</p>
              </div>
            </div>
          )}
        </div>

        <div>
          {event.status === "past" ? (
            <div className="border border-static/70 bg-iron/40 p-6 text-sm text-ash">
              This event has already happened — ticket sales are closed. Browse{" "}
              <Link href="/events?status=upcoming" className="text-silver hover:text-bone">upcoming events</Link>.
            </div>
          ) : (
            <TicketWidget event={event} />
          )}
        </div>
      </div>
    </div>
  );
}
