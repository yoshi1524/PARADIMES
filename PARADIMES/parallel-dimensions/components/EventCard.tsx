import Link from "next/link";
import type { PDEvent } from "@/lib/data/events";

const covers: Record<string, string> = {
  "rift-1": "from-static via-iron to-void",
  "rift-2": "from-silver/40 via-iron to-void",
  "rift-3": "from-ash/30 via-iron to-void",
};

const statusLabel: Record<PDEvent["status"], string> = {
  upcoming: "Upcoming",
  present: "On Sale Now",
  past: "Recap",
};

export default function EventCard({ event }: { event: PDEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block border border-static/70 bg-iron/40 transition-colors hover:border-silver"
    >
      <div className={`relative flex h-44 items-end bg-gradient-to-br p-5 ${covers[event.cover] ?? covers["rift-1"]}`}>
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone/80">
          {statusLabel[event.status]}
        </span>
        <span
          className="rift absolute right-5 top-5 font-display text-4xl uppercase text-bone/10"
          data-text={event.title.slice(0, 2)}
          aria-hidden="true"
        >
          {event.title.slice(0, 2)}
        </span>
      </div>
      <div className="p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-silver">{event.dateLabel}</p>
        <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-bone group-hover:text-silver">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-ash">{event.summary}</p>
        <p className="mt-4 text-xs text-ash">{event.venue} — {event.city}</p>
      </div>
    </Link>
  );
}
