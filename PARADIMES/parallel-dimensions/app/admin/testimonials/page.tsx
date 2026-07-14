import { testimonials } from "@/lib/data/testimonials";
import { getPendingFeedback } from "@/lib/data/staff";
import TestimonialsBoard from "@/components/dashboard/TestimonialsBoard";

export const metadata = { title: "Testimonials | Parallel Dimensions" };

export default function TestimonialsAdminPage() {
  const submissions = getPendingFeedback();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Marketing / Promotions</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Testimonials Moderation</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Filter, approve, or disapprove testimonial submissions from the public feedback form.
        Approving one publishes it immediately to <code className="text-silver">/testimonials</code>{" "}
        and the homepage — disapproving records a reason and keeps it off the public site.
      </p>

      <div className="mt-8">
        <TestimonialsBoard submissions={submissions} />
      </div>

      <div className="mt-12 border-t border-static/70 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-silver">
          Seed Testimonials (always live, edited in code)
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-static/70 bg-void p-5">
              <p className="font-mono text-xs uppercase text-silver">{"★".repeat(t.rating)}</p>
              <p className="mt-2 text-sm text-bone">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs text-ash">{t.name} — {t.affiliation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
