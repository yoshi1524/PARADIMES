import Link from "next/link";
import { getEventBySlug } from "@/lib/data/events";

export const metadata = { title: "Mock Checkout | Parallel Dimensions" };

export default function MockCheckoutPage({
  searchParams,
}: {
  searchParams?: { event?: string; tier?: string; qty?: string; method?: string; ref?: string };
}) {
  const event = searchParams?.event ? getEventBySlug(searchParams.event) : undefined;

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center md:px-8">
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Demo Mode</p>
      <h1 className="mt-3 font-display text-4xl uppercase text-bone">No Payment Was Charged</h1>
      <p className="mt-6 text-sm leading-relaxed text-ash">
        HELIXPAY_API_KEY isn&apos;t configured yet, so this stands in for the real HelixPay
        checkout page. Once real credentials are added (see <code className="text-silver">lib/helixpay.ts</code>),
        this route is replaced by an actual redirect to HelixPay.
      </p>

      <div className="mt-8 border border-static/70 bg-iron/40 p-5 text-left text-sm text-ash">
        {event && <p><span className="text-silver">Event:</span> {event.title}</p>}
        {searchParams?.tier && <p><span className="text-silver">Tier:</span> {decodeURIComponent(searchParams.tier)}</p>}
        {searchParams?.qty && <p><span className="text-silver">Quantity:</span> {searchParams.qty}</p>}
        {searchParams?.method && <p><span className="text-silver">Method:</span> {searchParams.method}</p>}
        {searchParams?.ref && <p><span className="text-silver">Reference:</span> {searchParams.ref}</p>}
      </div>

      <Link
        href="/events"
        className="mt-10 inline-block border border-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
      >
        Back to Events
      </Link>
    </div>
  );
}
