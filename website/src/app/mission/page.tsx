import type { Metadata } from "next";
import MissionPageClient from "./MissionPageClient";

export const metadata: Metadata = {
  title: "Core Objectives & Bylaws | Anjana Jat Mahasabha",
  description:
    "Explore the 8 fundamental objectives and bylaws of Anjana Jat Mahasabha guiding youth education, farmer advocacy, and authentic historical preservation.",
};

export default function MissionPage() {
  return <MissionPageClient />;
}