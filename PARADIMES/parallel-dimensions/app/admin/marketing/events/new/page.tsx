import NewEventForm from "@/components/dashboard/NewEventForm";
import Link from "next/link";

export const metadata = { title: "Post New Event | Parallel Dimensions" };

export default function NewEventPage() {
  return (
    <div>
      <Link href="/admin/marketing" className="font-mono text-xs uppercase tracking-widest text-ash hover:text-bone">
        ← Marketing
      </Link>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-silver">Marketing Department</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Post New Event</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Fields below cover what event ticketing platforms and standard event-planning
        checklists treat as essential — date/venue, host, lineup, partners, dress code, age
        requirement, and ticket tiers. Posting here adds it straight to the public Events page.
      </p>

      <div className="mt-8">
        <NewEventForm />
      </div>
    </div>
  );
}
