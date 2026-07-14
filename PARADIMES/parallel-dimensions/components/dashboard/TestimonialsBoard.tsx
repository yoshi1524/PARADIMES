"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PendingFeedback } from "@/lib/data/staff";

type StatusFilter = "All" | "Pending" | "Published" | "Rejected";

export default function TestimonialsBoard({ submissions }: { submissions: PendingFeedback[] }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [ratingFilter, setRatingFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [reasonDraft, setReasonDraft] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      if (ratingFilter !== "All" && s.rating !== Number(ratingFilter)) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.quote.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [submissions, statusFilter, ratingFilter, search]);

  const counts = useMemo(
    () => ({
      All: submissions.length,
      Pending: submissions.filter((s) => s.status === "Pending").length,
      Published: submissions.filter((s) => s.status === "Published").length,
      Rejected: submissions.filter((s) => s.status === "Rejected").length,
    }),
    [submissions]
  );

  async function moderate(id: string, action: "approve" | "reject") {
    setBusyId(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason: reasonDraft[id] }),
      });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["All", "Pending", "Published", "Rejected"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              statusFilter === s ? "border-bone bg-bone text-void" : "border-static text-ash hover:border-silver hover:text-bone"
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="ml-2 border border-static bg-void px-3 py-1.5 font-mono text-xs uppercase text-bone focus:border-silver focus:outline-none"
        >
          <option value="All">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
          ))}
        </select>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or quote…"
          className="ml-auto min-w-[12rem] flex-1 border border-static bg-void px-3 py-1.5 text-sm text-bone placeholder:text-ash focus:border-silver focus:outline-none"
        />
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <p className="border border-static/70 bg-iron/40 p-6 text-sm text-ash">
            No submissions match this filter.
          </p>
        ) : (
          filtered.map((s) => (
            <div key={s.id} className="border border-static/70 bg-iron/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg text-bone">{s.name}</p>
                    <span className="font-mono text-xs text-silver">{"★".repeat(s.rating)}</span>
                  </div>
                  <p className="text-xs text-ash">{s.affiliation || "No affiliation given"} — submitted {s.submittedAt}</p>
                </div>
                <span
                  className={`border px-2 py-0.5 font-mono text-[10px] uppercase ${
                    s.status === "Published"
                      ? "border-bone text-bone"
                      : s.status === "Rejected"
                      ? "border-static text-ash"
                      : "border-silver text-silver"
                  }`}
                >
                  {s.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-bone">&ldquo;{s.quote}&rdquo;</p>

              {s.status !== "Pending" && s.reviewedBy && (
                <p className="mt-2 text-xs text-ash">
                  {s.status === "Published" ? "Approved" : "Rejected"} by {s.reviewedBy} on {s.reviewedAt}
                  {s.rejectionReason && <> — &ldquo;{s.rejectionReason}&rdquo;</>}
                </p>
              )}

              {s.status === "Pending" && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-static/70 pt-4">
                  <input
                    value={reasonDraft[s.id] ?? ""}
                    onChange={(e) => setReasonDraft((d) => ({ ...d, [s.id]: e.target.value }))}
                    placeholder="Rejection reason (optional)"
                    className="min-w-[10rem] flex-1 border border-static bg-void px-3 py-1.5 text-xs text-bone placeholder:text-ash focus:border-silver focus:outline-none"
                  />
                  <button
                    onClick={() => moderate(s.id, "approve")}
                    disabled={busyId === s.id}
                    className="border border-bone bg-bone px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => moderate(s.id, "reject")}
                    disabled={busyId === s.id}
                    className="border border-static px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ash hover:border-silver hover:text-bone disabled:opacity-40"
                  >
                    Disapprove
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
