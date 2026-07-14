export type TeamMember = {
  name: string;
  role: string;
  isLeadership?: boolean;
};

export const ceo: TeamMember = {
  name: "Michael C. Bazar",
  role: "Chief Executive Officer / Chief Marketing Officer",
  isLeadership: true,
};

export const team: TeamMember[] = [
  ceo,
  { name: "Marcus Asinas", role: "Chief Communications Officer / Officer in Charge", isLeadership: true },
  { name: "Lara Chua", role: "Creative & Marketing Director" },
  { name: "Milo Perez", role: "Operations Director" },
  { name: "Juliana Hernandez", role: "Finance Director" },
  { name: "Ryca Ysip", role: "Hosting Director" },
  { name: "Renz Luna", role: "Asst. Hosting Director / HR Director" },
  { name: "Brooklyn Avila", role: "HR Director" },
];

export const services = [
  {
    title: "Social Media Marketing",
    description:
      "Campaign planning, content, and audience growth built around each event's own identity.",
  },
  {
    title: "Network of Promoters",
    description:
      "A trained roster of hosts and managers who drive attendance across Metro Manila's student and young-professional scene.",
  },
  {
    title: "Additional Revenue for Bars & Venues",
    description:
      "New-venue and startup-bar partners get exposure and footfall without building a promotions team from scratch.",
  },
  {
    title: "Themed Events",
    description:
      "Concept-first parties designed to be memorable, shareable, and worth coming back for.",
  },
  {
    title: "Event Operations & Flow",
    description:
      "Door, table, guestlist, and dispute handling run end-to-end so the night moves without friction.",
  },
];

export const companyBlurb =
  "Parallel Dimensions is an evolving brand that curates bar parties and events, and is the leading marketing and promotions group in Metro Manila for students and young professionals. We help startup and new bars promote their ventures by leveraging our network and organizing events that grow their exposure to the market. Our core philosophy is to build a positive community that fosters new friendships and enduring connections through well-crafted parties and events.";
