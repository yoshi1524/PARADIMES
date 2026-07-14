import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { events, type EventStatus } from "@/lib/data/events";

export const metadata = { title: "Events | Parallel Dimensions" };

const tabs: { key: EventStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "present", label: "On Sale Now" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

export default function EventsPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const active = (searchParams?.status as EventStatus | undefined) ?? "all";
  const filtered = active === "all" ? events : events.filter((e) => e.status === active);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Every dimension"
        title="Events"
        description="Past recaps, what's currently on sale, and what's coming next."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={tab.key === "all" ? "/events" : `/events?status=${tab.key}`}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active === tab.key
                ? "border-bone bg-bone text-void"
                : "border-static text-ash hover:border-silver hover:text-bone"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ash">No events in this category yet — check back soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
