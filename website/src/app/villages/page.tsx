"use client";

import PageHero from "@/components/shared/PageHero";
import VillageDirectorySection from "@/components/home/VillageDirectorySection";

export default function VillagesPage() {
  return (
    <>
      <PageHero
        title="Samaj Villages & Regions"
        titleHi="आंजना चौधरी जाट समाज गाँव एवं क्षेत्र निर्देशिका"
        subtitle="Explore Anjana Chaudhari Samaj populated villages, tehsils, and districts across Gujarat, MP, and Rajasthan."
        breadcrumbs={[{ label: "Villages Directory", href: "/villages" }]}
      />
      <VillageDirectorySection />
    </>
  );
}
