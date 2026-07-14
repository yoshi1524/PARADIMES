"use client";

import { useState } from "react";
import type { PDEvent } from "@/lib/data/events";

export default function TicketWidget({ event }: { event: PDEvent }) {
  const tickets = event.tickets ?? [];
  const [tierName, setTierName] = useState(tickets[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const tier = tickets.find((t) => t.name === tierName);
  const total = (tier?.price ?? 0) * quantity;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!tier || !name || !email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          ticketTierName: tier.name,
          quantity,
          buyerName: name,
          buyerEmail: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed.");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Checkout failed.");
    }
  }

  if (!tickets.length) {
    return (
      <div className="border border-static/70 bg-iron/40 p-6 text-sm text-ash">
        Ticket tiers for this event haven&apos;t been published yet. Check back closer to the date.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-static/70 bg-iron/40 p-6">
      <h3 className="font-display text-xl uppercase text-bone">Get Tickets</h3>
      <p className="mt-1 text-xs text-ash">Processed via HelixPay — GCash and card accepted.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-silver">Ticket Tier</label>
          <select
            value={tierName}
            onChange={(e) => setTierName(e.target.value)}
            className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
          >
            {tickets.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} — ₱{t.price.toLocaleString()}
              </option>
            ))}
          </select>
          {tier && <p className="mt-2 text-xs text-ash">{tier.description}</p>}
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-silver">Quantity</label>
          <input
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-silver">Full Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-silver">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-static/70 pt-4">
        <span className="font-mono text-xs uppercase tracking-widest text-ash">Total</span>
        <span className="font-display text-2xl text-bone">₱{total.toLocaleString()}</span>
      </div>

      {status === "error" && <p className="mt-3 text-xs text-silver">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full border border-bone bg-bone py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-transparent hover:text-bone disabled:opacity-40"
      >
        {status === "loading" ? "Redirecting to checkout…" : "Continue to Checkout"}
      </button>
    </form>
  );
}
