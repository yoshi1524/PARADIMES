"use client";

import { useState } from "react";
import { ROLE_LABELS, type StaffRole } from "@/lib/auth";

const STAFF_ROLES: StaffRole[] = [
  "system_admin",
  "administrative",
  "manager",
  "admin",
  "marketing",
  "promotions",
  "promoter",
];

export default function GenerateCodePanel() {
  const [role, setRole] = useState<StaffRole>("marketing");
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: StaffRole; code: string }[]>([]);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (res.ok) {
        setCode(data.code);
        setHistory((h) => [{ role, code: data.code }, ...h].slice(0, 10));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-static/70 bg-iron/40 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-silver">Generate Onboarding Code</p>
      <p className="mt-2 max-w-xl text-xs text-ash">
        For a new hire in a given department — the code is randomized and starts with that
        department&apos;s letter (Marketing = M, Promotions = P, and so on). This doesn&apos;t
        create a real account yet (there&apos;s no database of individual employees) — it shows
        the scheme you&apos;d generate real ones from once one exists.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as StaffRole)}
          className="border border-static bg-void px-3 py-2 text-sm text-bone focus:border-silver focus:outline-none"
        >
          {STAFF_ROLES.map((r) => (
            <option key={r} value={r}>{ROLE_LABELS[r]}</option>
          ))}
        </select>
        <button
          onClick={generate}
          disabled={loading}
          className="border border-bone bg-bone px-5 py-2 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
        >
          {loading ? "Generating…" : "Generate Code"}
        </button>
        {code && (
          <span className="border border-silver px-3 py-2 font-mono text-sm tracking-widest text-bone">
            {code}
          </span>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-5 border-t border-static/70 pt-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ash">Recently Generated (this session)</p>
          <ul className="mt-2 space-y-1 text-xs text-ash">
            {history.map((h, i) => (
              <li key={i}>
                <span className="font-mono text-silver">{h.code}</span> — {ROLE_LABELS[h.role]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
