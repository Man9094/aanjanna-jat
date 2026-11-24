"use client";

import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#FAF2E0] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t("galleryHeading")}
          subtitle={t("gallerySub")}
        />

        <div className="rounded-2xl border border-dashed border-[#D9A52B]/50 bg-white px-6 py-14 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center mx-auto mb-4 text-[#B52A12]">
            <Images size={24} />
          </div>
          <p className="text-sm text-[#5C4E46] leading-relaxed">
            {t("galleryPlaceholder")}
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-[#D9A52B] text-[#B52A12] font-bold text-sm hover:bg-[#B52A12] hover:text-white transition-all shadow-xs group"
          >
            {t("btnAllGallery")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}