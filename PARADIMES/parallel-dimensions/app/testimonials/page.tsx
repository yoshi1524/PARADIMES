import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { getPublishedTestimonials } from "@/lib/data/staff";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata = { title: "Testimonials | Parallel Dimensions" };

export default function TestimonialsPage() {
  const testimonials = getPublishedTestimonials();

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Guests &amp; partners"
        title="Testimonials"
        description="What attendees and venue partners say after the night ends."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>

      <div className="mt-20 max-w-xl">
        <SectionHeading eyebrow="Were you there?" title="Leave Feedback" />
        <FeedbackForm />
      </div>
    </div>
  );
}
