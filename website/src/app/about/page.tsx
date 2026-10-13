import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Anjana Jat Mahasabha's history, vision, mission, objectives, and values. Discover our journey of community service and empowerment.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
