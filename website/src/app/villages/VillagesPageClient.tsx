"use client";

import PageHero from "@/components/shared/PageHero";
import VillageDirectorySection from "@/components/home/VillageDirectorySection";
import { useLanguage } from "@/context/LanguageContext";

export default function VillagesPageClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t("villageDirHeading")}
        subtitle={t("villageDirSub")}
        breadcrumbs={[{ label: t("navVillages"), href: "/villages" }]}
      />
      <VillageDirectorySection />
    </>
  );
}

