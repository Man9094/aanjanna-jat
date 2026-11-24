import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Heritage & Organization History | Anjana Jat Mahasabha",
  description:
    "Learn about Anjana Jat Mahasabha's authentic history, cultural heritage, organizational constitution, and milestones of community service across India.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
