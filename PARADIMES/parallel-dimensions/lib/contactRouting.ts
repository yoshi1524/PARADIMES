/**
 * Where contact-form submissions get emailed, by the "reason" the person
 * picked. Each of these can be a different real person/department's Gmail
 * (or any address) once you set the env vars — no code changes needed to
 * repoint them.
 *
 * All fall back to CONTACT_EMAIL_GENERAL (or a placeholder) if unset, so
 * nothing breaks if you only configure one address to start.
 */

const fallback = process.env.CONTACT_EMAIL_GENERAL || "hello@paralleldimensions.ph";

export const departmentEmails: Record<string, string> = {
  "Venue / Business Partnership": process.env.CONTACT_EMAIL_PARTNERSHIPS || fallback,
  "Event Inquiry": process.env.CONTACT_EMAIL_EVENTS || fallback,
  "Ticketing / Payment Issue": process.env.CONTACT_EMAIL_SUPPORT || fallback,
  "Press / Media": process.env.CONTACT_EMAIL_MEDIA || fallback,
  "Other": fallback,
};

export function getDepartmentEmail(reason: string | undefined): string {
  return departmentEmails[reason ?? "Other"] ?? fallback;
}

// Where new client-portal inquiries (submitted from /portal) get emailed —
// this is your client-relations / admin inbox.
export const clientInquiryEmail = process.env.CONTACT_EMAIL_PARTNERSHIPS || fallback;

// Where new public testimonial/feedback submissions get emailed — your
// marketing inbox, since that's who reviews them at /admin/testimonials.
export const feedbackNotifyEmail = process.env.CONTACT_EMAIL_MARKETING || fallback;
