"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
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
        Thanks for reaching out — we always prioritize your availability, and our team
        will follow up to schedule an initial call (usually 1–2 hours).
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Reason</label>
        <select
          name="reason"
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        >
          <option>Venue / Business Partnership</option>
          <option>Event Inquiry</option>
          <option>Ticketing / Payment Issue</option>
          <option>Press / Media</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Name</label>
        <input
          name="name"
          required
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-silver">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
        />
      </div>
      {status === "error" && <p className="text-xs text-silver">Something went wrong — try again.</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-bone bg-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
