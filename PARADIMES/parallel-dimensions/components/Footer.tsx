import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-static/70 bg-void">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-bone">
              PARALLEL <span className="text-ash">DIMENSIONS</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              Metro Manila&apos;s marketing and promotions group for bar parties and events —
              built for students, young professionals, and the venues that host them.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Site</p>
            <ul className="mt-4 space-y-2 text-sm text-ash">
              <li><Link href="/events" className="hover:text-bone">Events</Link></li>
              <li><Link href="/testimonials" className="hover:text-bone">Testimonials</Link></li>
              <li><Link href="/partners" className="hover:text-bone">Partners</Link></li>
              <li><Link href="/about" className="hover:text-bone">About</Link></li>
              <li><Link href="/contact" className="hover:text-bone">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Payments</p>
            <ul className="mt-4 space-y-2 text-sm text-ash">
              <li>Ticketing via HelixPay</li>
              <li>GCash &amp; Card accepted</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-static/70 pt-6 text-xs text-ash md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Parallel Dimensions Ads Corporation. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Built for the capstone deck — replace with production copy before launch.</p>
        </div>
      </div>
    </footer>
  );
}
