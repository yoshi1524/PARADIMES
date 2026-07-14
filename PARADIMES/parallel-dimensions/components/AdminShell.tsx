"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { NavItem } from "@/lib/auth";

export default function AdminShell({
  nav,
  roleLabel,
  userName,
  children,
}: {
  nav: NavItem[];
  roleLabel: string;
  userName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-void">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r border-static/70 p-6 md:block">
          <p className="font-display text-lg uppercase text-bone">Parallel Dimensions</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-silver">{roleLabel}</p>

          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    active ? "bg-bone text-void" : "text-ash hover:bg-iron hover:text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-static/70 pt-4">
            <p className="text-xs text-ash">{userName}</p>
            <button
              onClick={signOut}
              className="mt-2 font-mono text-xs uppercase tracking-widest text-silver hover:text-bone"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between border-b border-static/70 px-5 py-4 md:hidden">
            <p className="font-display text-base uppercase text-bone">{roleLabel}</p>
            <button onClick={signOut} className="font-mono text-xs uppercase text-silver">Sign Out</button>
          </div>
          <nav className="flex gap-4 overflow-x-auto border-b border-static/70 px-5 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-ash hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <main className="p-6 md:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
