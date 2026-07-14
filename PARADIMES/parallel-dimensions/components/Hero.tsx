import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-static/70">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-static/60 animate-drift" />
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-static/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-silver">
          Metro Manila — Bar Parties &amp; Events
        </p>
        <h1
          className="rift font-display text-6xl uppercase leading-[0.95] text-bone sm:text-7xl md:text-8xl"
          data-text="Every Night, Another Dimension."
        >
          Every Night,
          <br />
          Another Dimension.
        </h1>
        <p className="mt-8 max-w-xl text-ash md:text-lg">
          Parallel Dimensions curates themed bar parties across Metro Manila and runs the
          promotions, hosting, and event operations behind them — connecting students and
          young professionals, one door list at a time.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="border border-bone bg-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-transparent hover:text-bone"
          >
            See Upcoming Events
          </Link>
          <Link
            href="/contact"
            className="border border-static px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone transition-colors hover:border-silver"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
