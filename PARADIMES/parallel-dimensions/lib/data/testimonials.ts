export type Testimonial = {
  name: string;
  affiliation: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

// Sample content — replace with verified guest and partner feedback
// before launch. Structure mirrors what the feedback form collects.
export const testimonials: Testimonial[] = [
  {
    name: "Guest, LOVE SICK 2026",
    affiliation: "Attendee",
    quote:
      "Best-run door I've dealt with at a bar party this year — checked in with our table in under a minute and the hosts actually kept an eye on us all night.",
    rating: 5,
  },
  {
    name: "Venue Partner",
    affiliation: "Startup Bar, Metro Manila",
    quote:
      "Parallel Dimensions filled our floor on a weeknight. Their promoter network did more for our visibility in one event than three months of our own social posts.",
    rating: 5,
  },
  {
    name: "Guest, Manila Mi Vida",
    affiliation: "Attendee",
    quote:
      "Themed nights that actually commit to the theme. Music, drinks, and crowd all matched — will be back for the next one.",
    rating: 4,
  },
];

export type Partner = {
  name: string;
  type: "Venue" | "Brand" | "Media";
};

export const partners: Partner[] = [
  { name: "Manila Mi Vida", type: "Venue" },
  { name: "Paradimes Series Venues", type: "Venue" },
  { name: "HelixPay", type: "Brand" },
  { name: "GCash", type: "Brand" },
];
