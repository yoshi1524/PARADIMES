import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-32 text-center md:px-8">
      <p className="rift font-display text-7xl text-bone" data-text="404">404</p>
      <p className="mt-4 text-ash">This page slipped into another dimension.</p>
      <Link
        href="/"
        className="mt-8 inline-block border border-bone px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:bg-bone hover:text-void"
      >
        Back Home
      </Link>
    </div>
  );
}
