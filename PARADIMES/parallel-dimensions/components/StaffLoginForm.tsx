"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function StaffLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/staff-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed.");
      router.push(next ?? data.redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Internal System</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Staff Access</h1>
      <p className="mt-3 text-sm text-ash">
        Enter your personal user code. Codes are department-prefixed —
        Marketing starts with <span className="text-silver">M</span>, Promotions with{" "}
        <span className="text-silver">P</span>, and so on. If you don&apos;t have one yet,
        ask your department lead or System Administrator.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-silver">User Code</label>
          <input
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="M-7XQ2"
            className="mt-2 w-full border border-static bg-void px-3 py-2 font-mono tracking-widest text-bone placeholder:text-ash focus:border-silver focus:outline-none"
          />
        </div>
        {error && <p className="text-xs text-silver">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-bone bg-bone py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
        >
          {loading ? "Checking…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
