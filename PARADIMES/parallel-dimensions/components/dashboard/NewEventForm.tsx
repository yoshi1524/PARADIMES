"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TierDraft = { name: string; price: string; description: string };

export default function NewEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [tiers, setTiers] = useState<TierDraft[]>([{ name: "Regular", price: "", description: "" }]);

  function updateTier(i: number, field: keyof TierDraft, value: string) {
    setTiers((t) => t.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          status: form.get("status"),
          date: form.get("date"),
          venue: form.get("venue"),
          city: form.get("city"),
          host: form.get("host"),
          lineup: String(form.get("lineup") || "").split(",").map((s) => s.trim()).filter(Boolean),
          eventPartners: String(form.get("eventPartners") || "").split(",").map((s) => s.trim()).filter(Boolean),
          dressCode: form.get("dressCode"),
          ageRequirement: form.get("ageRequirement"),
          summary: form.get("summary"),
          description: form.get("description"),
          tickets: tiers
            .filter((t) => t.name && t.price)
            .map((t) => ({ name: t.name, price: Number(t.price), description: t.description })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to post event.");
      setDone(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post event.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="border border-static/70 bg-iron/40 p-6">
        <p className="text-sm text-bone">Event posted — it&apos;s now live on the public Events page.</p>
        <button
          onClick={() => setDone(false)}
          className="mt-4 border border-bone px-4 py-2 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
        >
          Post Another
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full border border-static bg-void px-3 py-2 text-bone placeholder:text-ash focus:border-silver focus:outline-none";
  const labelClass = "block font-mono text-xs uppercase tracking-widest text-silver";

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Event Title</label>
          <input name="title" required className={inputClass} placeholder="e.g. Neon Nights" />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" className={inputClass} defaultValue="upcoming">
            <option value="upcoming">Upcoming</option>
            <option value="present">On Sale Now</option>
            <option value="past">Past / Recap</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Venue</label>
          <input name="venue" required className={inputClass} placeholder="Venue name" />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input name="city" className={inputClass} placeholder="Metro Manila" defaultValue="Metro Manila" />
        </div>
        <div>
          <label className={labelClass}>Host / Organizer</label>
          <input name="host" className={inputClass} placeholder="Parallel Dimensions" defaultValue="Parallel Dimensions" />
        </div>
        <div>
          <label className={labelClass}>Age Requirement</label>
          <input name="ageRequirement" className={inputClass} placeholder="18+" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>DJs / Lineup / Performers</label>
          <input name="lineup" className={inputClass} placeholder="DJ Nome, DJ Reverie, MC Alto (comma-separated)" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Event Partners / Sponsors</label>
          <input name="eventPartners" className={inputClass} placeholder="Venue Co., Brand Partner (comma-separated)" />
        </div>
        <div>
          <label className={labelClass}>Dress Code</label>
          <input name="dressCode" className={inputClass} placeholder="Smart casual, all-black, etc." />
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Summary</label>
        <input name="summary" required className={inputClass} placeholder="One line for the event card" />
      </div>
      <div>
        <label className={labelClass}>Full Description</label>
        <textarea name="description" rows={4} className={inputClass} placeholder="What guests need to know" />
      </div>

      <div>
        <p className={labelClass}>Ticket Tiers</p>
        <div className="mt-2 space-y-2">
          {tiers.map((t, i) => (
            <div key={i} className="grid grid-cols-[1fr_6rem_1fr_auto] gap-2">
              <input
                value={t.name}
                onChange={(e) => updateTier(i, "name", e.target.value)}
                placeholder="Tier name"
                className="border border-static bg-void px-2 py-1.5 text-sm text-bone focus:border-silver focus:outline-none"
              />
              <input
                value={t.price}
                onChange={(e) => updateTier(i, "price", e.target.value)}
                type="number"
                placeholder="₱"
                className="border border-static bg-void px-2 py-1.5 text-sm text-bone focus:border-silver focus:outline-none"
              />
              <input
                value={t.description}
                onChange={(e) => updateTier(i, "description", e.target.value)}
                placeholder="Description"
                className="border border-static bg-void px-2 py-1.5 text-sm text-bone focus:border-silver focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setTiers((rows) => rows.filter((_, idx) => idx !== i))}
                className="px-2 text-ash hover:text-bone"
                aria-label="Remove tier"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTiers((rows) => [...rows, { name: "", price: "", description: "" }])}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-silver hover:text-bone"
        >
          + Add Tier
        </button>
      </div>

      {error && <p className="text-xs text-silver">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="border border-bone bg-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
      >
        {loading ? "Posting…" : "Post Event"}
      </button>
    </form>
  );
}
