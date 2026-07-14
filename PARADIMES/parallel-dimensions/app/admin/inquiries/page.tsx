import { getInquiries } from "@/lib/data/staff";
import InquiryCard from "@/components/dashboard/InquiryCard";

export const metadata = { title: "Inquiries | Parallel Dimensions" };

export default function InquiriesAdminPage() {
  const inquiries = getInquiries();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">Client Relations</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">Client Inquiries</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Business/venue partnership inquiries submitted through the Client portal. This is an
        in-memory demo store (see <code className="text-silver">lib/data/staff.ts</code>) — it
        resets on server restart until it&apos;s backed by a real database.
      </p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <p className="border border-static/70 bg-iron/40 p-6 text-sm text-ash">No inquiries yet.</p>
        ) : (
          inquiries.map((i) => <InquiryCard key={i.id} inquiry={i} />)
        )}
      </div>
    </div>
  );
}
