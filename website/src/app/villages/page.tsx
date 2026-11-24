import type { Metadata } from "next";
import VillagesPageClient from "./VillagesPageClient";

export const metadata: Metadata = {
  title: "Village & Gotra Directory | Anjana Jat Mahasabha",
  description:
    "Comprehensive directory of Anjana Chaudhari Jat Samaj populated villages, tehsils, and historic Gotras across Gujarat, Rajasthan, and Madhya Pradesh.",
};

export default function VillagesPage() {
  return <VillagesPageClient />;
}
