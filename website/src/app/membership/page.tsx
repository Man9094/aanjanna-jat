import type { Metadata } from "next";
import MembershipPageClient from "./MembershipPageClient";

export const metadata: Metadata = {
  title: "Membership Identity Card | Anjana Jat Mahasabha",
  description:
    "Apply for your official vertical digital lanyard membership badge of Anjana Jat Mahasabha. Generate high-resolution 300 DPI print-ready identity credentials.",
};

export default function MembershipPage() {
  return <MembershipPageClient />;
}
