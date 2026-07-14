"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Inquiry } from "@/lib/data/staff";

export default function InquiryCard({ inquiry }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await fetch(`/api/inquiries/${inquiry.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setText("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-static/70 bg-iron/40 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-lg text-bone">{inquiry.clientName}</p>
          <p className="text-xs text-ash">{inquiry.eventType} — {inquiry.venue} — {inquiry.date}</p>
        </div>
        <span
          className={`border px-2 py-0.5 font-mono text-[10px] uppercase ${
            inquiry.status === "Confirmed"
              ? "border-bone text-bone"
              : inquiry.status === "Declined"
              ? "border-static text-ash"
              : "border-silver text-silver"
          }`}
        >
          {inquiry.status}
        </span>
      </div>
      <p className="mt-3 text-sm text-bone">{inquiry.requirements}</p>

      {inquiry.comments.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-static/70 pt-4">
          {inquiry.comments.map((c, i) => (
            <p key={i} className="text-xs text-ash">
              <span className="text-silver">{c.author}</span> ({c.at}): {c.text}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note…"
          className="flex-1 border border-static bg-void px-3 py-2 text-sm text-bone placeholder:text-ash focus:border-silver focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-bone px-4 py-2 font-mono text-xs uppercase text-bone hover:bg-bone hover:text-void disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
