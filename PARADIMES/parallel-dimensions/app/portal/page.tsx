import { getSession } from "@/lib/session";
import { getInquiriesByEmail } from "@/lib/data/staff";
import InquiryCard from "@/components/dashboard/InquiryCard";
import NewInquiryForm from "@/components/dashboard/NewInquiryForm";

export const metadata = { title: "My Inquiries | Parallel Dimensions" };

export default function PortalPage() {
  const session = getSession();
  const inquiries = session ? getInquiriesByEmail(session.email) : [];

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Client Portal</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">My Inquiries</h1>
      <p className="mt-2 max-w-xl text-sm text-ash">
        Submit a business or venue partnership inquiry and track its status here — matches your
        capstone&apos;s Client role: submit inquiries, monitor project progress, provide feedback.
      </p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <p className="border border-static/70 bg-iron/40 p-6 text-sm text-ash">
            No inquiries submitted yet.
          </p>
        ) : (
          inquiries.map((i) => <InquiryCard key={i.id} inquiry={i} />)
        )}
      </div>

      <div className="mt-8">
        <NewInquiryForm />
      </div>
    </div>
  );
}
