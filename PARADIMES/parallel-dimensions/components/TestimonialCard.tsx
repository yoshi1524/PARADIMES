import type { Testimonial } from "@/lib/data/testimonials";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between border border-static/70 bg-iron/40 p-6">
      <div>
        <div className="mb-4 font-mono text-sm tracking-widest text-silver" aria-hidden="true">
          {"★".repeat(t.rating)}
          <span className="text-static">{"★".repeat(5 - t.rating)}</span>
        </div>
        <blockquote className="text-bone">&ldquo;{t.quote}&rdquo;</blockquote>
      </div>
      <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-ash">
        {t.name} — {t.affiliation}
      </figcaption>
    </figure>
  );
}
