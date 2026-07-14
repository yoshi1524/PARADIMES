// Mock data for the internal staff dashboards. Marketing/newsletter figures
// are illustrative placeholders — swap for real analytics once the
// marketing team has a source of truth (Meta/TikTok ad accounts, a CRM,
// etc). Promoter figures below are NOT invented — they're pulled directly
// from the LOVE SICK 2026 guestlist/commission workbook you uploaded
// (AUTOCOUNTER sheet), so Promotions Department staff see real numbers.

import { testimonials, type Testimonial } from "@/lib/data/testimonials";

export type Campaign = {
  name: string;
  channel: string;
  status: "Active" | "Scheduled" | "Ended";
  leads: number;
  conversionRate: number; // percent
  spend: number; // PHP
};

export const campaigns: Campaign[] = [
  { name: "LOVE SICK — IG Reels Push", channel: "Instagram", status: "Ended", leads: 412, conversionRate: 18.4, spend: 12000 },
  { name: "Summer Paradimes Teaser", channel: "TikTok", status: "Active", leads: 268, conversionRate: 11.2, spend: 9000 },
  { name: "Manila Mi Vida Early Bird", channel: "Instagram", status: "Active", leads: 154, conversionRate: 22.7, spend: 6000 },
  { name: "Venue Partner Outreach — BGC", channel: "Direct / Email", status: "Scheduled", leads: 40, conversionRate: 0, spend: 0 },
];

export const marketingMetrics = {
  totalLeads: campaigns.reduce((sum, c) => sum + c.leads, 0),
  activeCampaigns: campaigns.filter((c) => c.status === "Active").length,
  avgConversionRate:
    Math.round(
      (campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length) * 10
    ) / 10,
  totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
};

export const targetAudienceSegments = [
  { label: "Students (18–22)", share: 46 },
  { label: "Young Professionals (23–29)", share: 39 },
  { label: "Venue / Business Partners", share: 9 },
  { label: "Other", share: 6 },
];

export type Promoter = {
  manager: string;
  host: string;
  totalPax: number;
  totalSales: number; // PHP
  commission: number; // PHP
  status: "Eligible" | "No Commission";
};

// Sourced from Copy_of_LOVE_SICK__GUESTLIST__2026__SAMPLE_COMPUTATION_.xlsx
// (AUTOCOUNTER sheet) — a representative sample, not the full 50+ row list.
export const promoters: Promoter[] = [
  { manager: "Carl Projas", host: "Megan Sanchez", totalPax: 26, totalSales: 3035, commission: 3035, status: "Eligible" },
  { manager: "Justin Flores", host: "Prince Lobo", totalPax: 39, totalSales: 5740, commission: 5740, status: "Eligible" },
  { manager: "Kathleen Alcantara", host: "Jienah Nicole Bio", totalPax: 11, totalSales: 1260, commission: 1260, status: "Eligible" },
  { manager: "Nate Villegas", host: "Jacob Sudla", totalPax: 0, totalSales: 1320, commission: 1320, status: "Eligible" },
  { manager: "Canon Rubio", host: "Keille Chester Marquez", totalPax: 0, totalSales: 1365, commission: 2165, status: "Eligible" },
  { manager: "Jemish Retamal", host: "Marco Ozaeta", totalPax: 49, totalSales: 6290, commission: 6290, status: "Eligible" },
  { manager: "Sophia Agravante", host: "Alain Carl Salvador", totalPax: 0, totalSales: 5470, commission: 5470, status: "Eligible" },
  { manager: "Nate Villegas", host: "Jason Salmagrinde", totalPax: 188, totalSales: 20630, commission: 20630, status: "Eligible" },
  { manager: "Sophia Agravante", host: "Oona Ong", totalPax: 0, totalSales: 0, commission: 0, status: "No Commission" },
];

export const promotionsSummary = {
  totalGuests: 1077,
  totalTicketCommission: 17730,
  totalTableCommission: 1900,
  totalCommission: 20630,
};

export type Subscriber = { email: string; subscribedAt: string };

export const subscribers: Subscriber[] = [
  { email: "sanchezmeganxiv@gmail.com", subscribedAt: "2026-02-01" },
  { email: "senosakimberly5@gmail.com", subscribedAt: "2026-02-03" },
  { email: "jacobsudla7@gmail.com", subscribedAt: "2026-02-10" },
  { email: "ryzabelabeatrice@gmail.com", subscribedAt: "2026-02-14" },
];

// --- Client inquiries (in-memory demo store) --------------------------
// NOTE: this is a module-level array, which only works because Next's dev
// server keeps one Node process alive. It will NOT persist reliably across
// requests on a serverless deployment (Vercel functions don't share memory
// between invocations). Before launch, replace this with a real database
// table and swap the functions below for real queries.

export type InquiryComment = { author: string; text: string; at: string };

export type Inquiry = {
  id: string;
  clientName: string;
  clientEmail: string;
  eventType: string;
  venue: string;
  date: string;
  requirements: string;
  status: "New" | "In Discussion" | "Confirmed" | "Declined";
  comments: InquiryComment[];
  createdAt: string;
};

const inquiries: Inquiry[] = [
  {
    id: "inq-seed-1",
    clientName: "Northside Bar & Grill",
    clientEmail: "client@paralleldimensions.ph",
    eventType: "Themed Events",
    venue: "Northside Bar & Grill, QC",
    date: "2026-09-05",
    requirements: "Looking for a full promotions package for our reopening — social push + on-ground hosting.",
    status: "In Discussion",
    comments: [
      { author: "Events Admin", text: "Sent over our standard venue partnership deck — awaiting their availability.", at: "2026-06-20" },
    ],
    createdAt: "2026-06-18",
  },
];

export function getInquiries(): Inquiry[] {
  return inquiries;
}

export function getInquiriesByEmail(email: string): Inquiry[] {
  return inquiries.filter((i) => i.clientEmail.toLowerCase() === email.toLowerCase());
}

export function addInquiry(input: Omit<Inquiry, "id" | "status" | "comments" | "createdAt">): Inquiry {
  const inquiry: Inquiry = {
    ...input,
    id: `inq-${Date.now()}`,
    status: "New",
    comments: [],
    createdAt: new Date().toISOString().slice(0, 10),
  };
  inquiries.unshift(inquiry);
  return inquiry;
}

export function addInquiryComment(id: string, comment: InquiryComment) {
  const inquiry = inquiries.find((i) => i.id === id);
  if (inquiry) inquiry.comments.push(comment);
  return inquiry;
}

// --- Pending feedback submissions (in-memory demo store) ---------------
// Same caveat as inquiries above: module-level array, dev-server only,
// replace with a real DB table before launch.

export type PendingFeedback = {
  id: string;
  name: string;
  affiliation?: string;
  quote: string;
  rating: number;
  submittedAt: string;
  status: "Pending" | "Published" | "Rejected";
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
};

const pendingFeedback: PendingFeedback[] = [];

export function getPendingFeedback(): PendingFeedback[] {
  return pendingFeedback;
}

export function addPendingFeedback(input: Omit<PendingFeedback, "id" | "submittedAt" | "status">) {
  const entry: PendingFeedback = {
    ...input,
    id: `fb-${Date.now()}`,
    submittedAt: new Date().toISOString().slice(0, 10),
    status: "Pending",
  };
  pendingFeedback.unshift(entry);
  return entry;
}

/**
 * Approve/reject follows the standard review-moderation pattern (Klaviyo,
 * NetSuite, and most CMS moderation queues all do this the same way):
 * status + an optional reason recorded on rejection, plus who/when acted
 * on it, so there's an audit trail if a decision gets questioned later.
 */
export function updateFeedbackStatus(
  id: string,
  status: "Published" | "Rejected",
  reviewedBy: string,
  rejectionReason?: string
): PendingFeedback | undefined {
  const entry = pendingFeedback.find((f) => f.id === id);
  if (!entry) return undefined;
  entry.status = status;
  entry.reviewedBy = reviewedBy;
  entry.reviewedAt = new Date().toISOString().slice(0, 10);
  if (status === "Rejected") entry.rejectionReason = rejectionReason;
  return entry;
}

// Public site shows the static seed testimonials plus anything approved
// through the moderation queue above — so approving one here actually
// makes it appear on /testimonials and the homepage.
export function getPublishedTestimonials(): Testimonial[] {
  const promoted: Testimonial[] = pendingFeedback
    .filter((f) => f.status === "Published")
    .map((f) => ({
      name: f.name,
      affiliation: f.affiliation || "Guest",
      quote: f.quote,
      rating: f.rating as Testimonial["rating"],
    }));
  return [...testimonials, ...promoted];
}
