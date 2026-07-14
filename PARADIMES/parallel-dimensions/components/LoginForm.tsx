"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEMO_USERS } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed.");
      setName(data.name);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
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
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Client &amp; Partner Portal</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Sign In</h1>
      <p className="mt-3 text-sm text-ash">
        For business and venue partners. Enter your email, then use code{" "}
        <span className="text-silver">123456</span> at the OTP step (demo only — no real accounts
        yet). Staff sign in separately with a personal user code.
      </p>

      {step === "email" ? (
        <form onSubmit={submitEmail} className="mt-8 space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-silver">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@paralleldimensions.ph"
              className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
            />
          </div>
          {error && <p className="text-xs text-silver">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-bone bg-bone py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
          >
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitOtp} className="mt-8 space-y-4">
          <p className="border border-static/70 bg-iron/40 p-3 text-xs text-ash">
            Signed in as <span className="text-bone">{name}</span> ({email})
          </p>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-silver">One-Time Code</label>
            <input
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="mt-2 w-full border border-static bg-void px-3 py-2 text-bone focus:border-silver focus:outline-none"
            />
          </div>
          {error && <p className="text-xs text-silver">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-bone bg-bone py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-transparent hover:text-bone disabled:opacity-40"
          >
            {loading ? "Verifying…" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-center font-mono text-xs uppercase tracking-widest text-ash hover:text-bone"
          >
            Use a different email
          </button>
        </form>
      )}

      <div className="mt-10 border-t border-static/70 pt-6">
        <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Demo Account</p>
        <ul className="mt-3 space-y-1 text-xs text-ash">
          {DEMO_USERS.filter((u) => u.role === "client").map((u) => (
            <li key={u.email}>
              <span className="text-bone">Client</span> — {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
