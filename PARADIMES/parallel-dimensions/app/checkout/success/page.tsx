import Link from "next/link";

export const metadata = { title: "Payment Successful | Parallel Dimensions" };

export default function CheckoutSuccessPage({ searchParams }: { searchParams?: { ref?: string } }) {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center md:px-8">
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Confirmed</p>
      <h1 className="mt-3 font-display text-4xl uppercase text-bone">You&apos;re In.</h1>
      <p className="mt-6 text-sm text-ash">
        Your ticket is confirmed. A receipt and entry details are on their way to your email.
        {searchParams?.ref && <> Reference: <span className="text-silver">{searchParams.ref}</span></>}
      </p>
      <Link
        href="/events"
        className="mt-10 inline-block border border-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
      >
        Browse More Events
      </Link>
    </div>
  );
}
