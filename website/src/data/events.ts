export interface Event {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "conference" | "cultural" | "sports" | "seminar" | "meeting" | "social";
  image: string;
  isUpcoming: boolean;
  registrationLink?: string;
}

// No event records have been supplied or verified by the Mahasabha office yet.
// The events feature (page, filters, cards) stays in place and will list real
// records as soon as owner-provided data is added here.
export const events: Event[] = [];
