"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInquiryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="border border-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
      >
        Submit New Inquiry
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4 border border-static/70 bg-iron/40 p-6">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Event Type</label>
        <input name="eventType" className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Venue</label>
        <input name="venue" className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Preferred Date</label>
        <input name="date" className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Requirements</label>
        <textarea name="requirements" required rows={4} className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none" />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="border border-bone bg-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
        >
          {loading ? "Sending…" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-6 py-3 font-mono text-xs uppercase tracking-widest text-ash hover:text-bone"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
