import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact | Parallel Dimensions" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Let's talk"
        title="Contact"
        description="Venue partnerships, event inquiries, or ticketing support — tell us what you need."
      />
      <div className="max-w-xl">
        <ContactForm />
      </div>
    </div>
  );
}
