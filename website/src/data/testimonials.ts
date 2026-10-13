export interface Testimonial {
  id: number;
  name: string;
  nameHi: string;
  location: string;
  quote: string;
  quoteHi: string;
  image: string;
  designation?: string;
}

// No member quotations have been supplied or verified. Quotations are never
// attributed to real people unless the member themselves provided them, so
// this list stays empty until owner-approved statements are added here.
export const testimonials: Testimonial[] = [];
