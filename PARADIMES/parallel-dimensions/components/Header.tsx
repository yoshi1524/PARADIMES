"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-static/70 bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-bone transition-colors hover:text-silver md:text-2xl"
          onClick={() => setOpen(false)}
        >
          PARALLEL DIMENSIONS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-xs uppercase tracking-widest2 transition-colors ${
                  active ? "text-bone" : "text-ash hover:text-silver"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="font-mono text-xs uppercase tracking-widest2 text-ash hover:text-silver"
          >
            Client & Partner Login
          </Link>
          <Link
            href="/events"
            className="rounded-none border border-bone px-4 py-2 font-mono text-xs uppercase tracking-widest text-bone transition-colors hover:bg-bone hover:text-void"
          >
            Get Tickets
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-static/70 px-5 pb-5 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-ash hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="py-3 font-mono text-sm uppercase tracking-widest text-ash hover:text-bone"
          >
            Client & Partner Login
          </Link>
          <Link
            href="/events"
            onClick={() => setOpen(false)}
            className="mt-2 border border-bone px-4 py-3 text-center font-mono text-sm uppercase tracking-widest text-bone"
          >
            Get Tickets
          </Link>
        </nav>
      )}
    </header>
  );
}
