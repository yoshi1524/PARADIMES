export type TicketTier = {
  name: string;
  price: number;
  description: string;
};

export type EventStatus = "upcoming" | "present" | "past";

export type PDEvent = {
  slug: string;
  title: string;
  status: EventStatus;
  date: string; // ISO
  dateLabel: string;
  venue: string;
  city: string;
  cover: string; // placeholder gradient key, no external image dependency
  summary: string;
  description: string;
  tickets?: TicketTier[];
  attendance?: number;
  helixpayEventId?: string; // set once the event is created in the HelixPay dashboard
  // Added so Marketing can post full event details, not just the basics —
  // these fields mirror what event ticketing platforms (Eventbrite,
  // Hi.Events) and standard event-planning checklists treat as essential:
  // the "who" (host/organizer, lineup, partners) alongside the "what/when/
  // where" already covered above.
  host?: string; // organizer/host of record, e.g. "Parallel Dimensions" or a co-host
  lineup?: string[]; // DJs / performers / hosts for the night
  eventPartners?: string[]; // venue/brand/sponsor partners for this specific event
  dressCode?: string;
  ageRequirement?: string; // e.g. "18+", "21+ (valid ID required)"
  createdBy?: string; // name of the staff member who posted it
  createdAt?: string; // ISO date the listing was created
};

export const events: PDEvent[] = [
  {
    slug: "love-sick-2026",
    title: "LOVE SICK",
    status: "past",
    date: "2026-02-14",
    dateLabel: "February 14, 2026",
    venue: "TBD Venue Partner",
    city: "Metro Manila",
    cover: "rift-1",
    summary:
      "A Valentine's-season bar party built around love, heartbreak, and everything between.",
    description:
      "LOVE SICK was Parallel Dimensions' Valentine's-season flagship party, run with our full guestlist and hosting network. The event closed with over 1,000 guests across early-bird, regular, bundle, and table tiers, coordinated end-to-end by our operations and hosting directors.",
    attendance: 1077,
    host: "Parallel Dimensions",
    ageRequirement: "18+",
    tickets: [
      { name: "Early Bird — Phase 1", price: 600, description: "First-release pricing, limited quantity." },
      { name: "Early Bird — Phase 2", price: 700, description: "Second-release pricing, limited quantity." },
      { name: "Regular", price: 800, description: "Standard door-list entry." },
      { name: "Bundle of 2", price: 1600, description: "Two entries, one checkout." },
      { name: "Bundle of 4", price: 3200, description: "Four entries, one checkout." },
      { name: "Couple Deal", price: 1400, description: "Entry for two, priced as a pair." },
      { name: "Walk-in", price: 1000, description: "At-the-door entry, subject to capacity." },
      { name: "Table (8 pax)", price: 7600, description: "Reserved table for eight, hosted service included." },
    ],
  },
  {
    slug: "summer-paradimes-2026",
    title: "Summer Paradimes",
    status: "upcoming",
    date: "2026-08-15",
    dateLabel: "August 15, 2026",
    venue: "TBD Venue Partner",
    city: "Metro Manila",
    cover: "rift-2",
    summary:
      "Our summer flagship — the next chapter in the Paradimes series, in partnership with new and returning venues.",
    description:
      "Summer Paradimes is Parallel Dimensions' summer flagship event, continuing the Paradimes series with new venue partners across Metro Manila. Full lineup, venue, and ticket tiers are being finalized with our operations team — check back for the on-sale date.",
    host: "Parallel Dimensions",
    tickets: [
      { name: "Early Bird — Phase 1", price: 650, description: "First-release pricing, limited quantity." },
      { name: "Early Bird — Phase 2", price: 750, description: "Second-release pricing, limited quantity." },
      { name: "Regular", price: 850, description: "Standard door-list entry." },
    ],
  },
  {
    slug: "manila-mi-vida",
    title: "Manila Mi Vida",
    status: "present",
    date: "2026-07-12",
    dateLabel: "July 12, 2026",
    venue: "TBD Venue Partner",
    city: "Metro Manila",
    cover: "rift-3",
    summary: "A Latin-influenced night run with our Manila Mi Vida host circle — tickets on sale now.",
    description:
      "Manila Mi Vida is currently on sale through our host and manager network. Replace this description and the ticket tiers below with the confirmed lineup once venue and pricing are locked.",
    host: "Parallel Dimensions",
    tickets: [
      { name: "Regular", price: 800, description: "Standard door-list entry." },
      { name: "Bundle of 2", price: 1600, description: "Two entries, one checkout." },
      { name: "Walk-in", price: 1000, description: "At-the-door entry, subject to capacity." },
    ],
  },
];

export const getEventBySlug = (slug: string) => events.find((e) => e.slug === slug);
export const eventsByStatus = (status: EventStatus) => events.filter((e) => e.status === status);

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  let slug = base || `event-${Date.now()}`;
  let i = 2;
  while (getEventBySlug(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

/**
 * Adds a new event listing — used by Marketing's "Post New Event" form.
 * Pushes directly into the same in-memory `events` array everything else
 * on the site reads from, so it shows up on the public site immediately.
 * Same caveat as the other in-memory stores in this project: this is a
 * module-level array, fine for a single dev-server process, but it will
 * NOT persist reliably across requests on a serverless deployment — swap
 * for a real database table before relying on this past a local demo.
 */
export function addEvent(
  input: Omit<PDEvent, "slug" | "createdAt"> & { slug?: string }
): PDEvent {
  const slug = input.slug ? slugify(input.slug) : slugify(input.title);
  const event: PDEvent = {
    ...input,
    slug,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  events.unshift(event);
  return event;
}
