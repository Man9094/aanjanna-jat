import type { Metadata } from "next";
import DonationPageClient from "./DonationPageClient";

export const metadata: Metadata = {
  title: "Support & Community Welfare Fund | Anjana Jat Mahasabha",
  description:
    "Contribute directly to the student education fund, medical assistance, and farmer welfare programs of Anjana Jat Mahasabha.",
};

export default function DonationPage() {
  return <DonationPageClient />;
}
