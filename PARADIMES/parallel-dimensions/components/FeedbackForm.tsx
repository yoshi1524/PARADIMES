"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          affiliation: form.get("affiliation"),
          quote: form.get("quote"),
          rating,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="border border-static/70 bg-iron/40 p-6 text-sm text-bone">
        Thanks — your feedback was submitted and will be reviewed before it goes live.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Name</label>
        <input
          name="name"
          required
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Affiliation</label>
        <input
          name="affiliation"
          placeholder="Attendee, venue partner, etc."
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Rating</label>
        <div className="mt-2 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={`h-9 w-9 border font-mono text-sm ${
                n <= rating ? "border-bone bg-bone text-void" : "border-static text-ash"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Feedback</label>
        <textarea
          name="quote"
          required
          rows={4}
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      {status === "error" && <p className="text-xs text-silver">Something went wrong — try again.</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-bone bg-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
      >
        {status === "loading" ? "Sending…" : "Submit Feedback"}
      </button>
    </form>
  );
}
