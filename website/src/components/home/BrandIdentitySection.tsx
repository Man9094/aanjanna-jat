"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ZoomIn, X, Download, Wheat, Shield, Users, Flame, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandIdentitySection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { language, t } = useLanguage();

  const brandPillars = [
    {
      id: "krishi",
      Icon: Wheat,
      titleKey: "pillar1Title" as const,
      subKey: "pillar1Sub" as const,
      descKey: "pillar1Desc" as const,
    },
    {
      id: "shaurya",
      Icon: Shield,
      titleKey: "pillar2Title" as const,
      subKey: "pillar2Sub" as const,
      descKey: "pillar2Desc" as const,
    },
    {
      id: "ekta",
      Icon: Users,
      titleKey: "pillar3Title" as const,
      subKey: "pillar3Sub" as const,
      descKey: "pillar3Desc" as const,
    },
    {
      id: "sanskriti",
      Icon: Flame,
      titleKey: "pillar4Title" as const,
      subKey: "pillar4Sub" as const,
      descKey: "pillar4Desc" as const,
    },
    {
      id: "vikas",
      Icon: Award,
      titleKey: "pillar5Title" as const,
      subKey: "pillar5Sub" as const,
      descKey: "pillar5Desc" as const,
    },
  ];

  return (
    <section
      id="brand-identity"
      className="py-16 md:py-20 bg-[#FFF9EC] text-[#29211D] border-t border-[#D9A52B]/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Dignified Broadsheet Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#B52A12] tracking-tight leading-tight mb-2.5 font-display">
            {t("brandHeading")}
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D9A52B] to-transparent mx-auto mb-3" />

          <p className="text-sm sm:text-base text-[#5C4E46] leading-relaxed">
            {t("brandTagline")}
          </p>
        </div>

        {/* Brand Kit Image Showcase with Full-Screen Lightbox Modal */}
        <div className="mb-14 max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-[#D9A52B]/40 shadow-xs overflow-hidden group">
            {/* Minimalist Top Bar */}
            <div className="bg-[#FAF2E0] px-4 py-2.5 border-b border-[#D9A52B]/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#29211D]">
                {t("brandImageLabel")}
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9A52B]/50 text-xs font-bold text-[#B52A12] hover:bg-[#B52A12] hover:text-white transition-all shadow-xs cursor-pointer"
                aria-label="Inspect Brand Kit in High Resolution"
              >
                <ZoomIn size={13} />
                {t("brandKitZoom")}
              </button>
            </div>

            {/* Clickable Image Container */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative cursor-pointer aspect-square sm:aspect-[4/3] md:aspect-[16/10] max-h-[620px] w-full bg-[#FFF9EC] flex items-center justify-center p-3 sm:p-5 overflow-hidden"
            >
              <Image
                src="/images/brand-identity-kit.jpg"
                alt="Anjana Jat Mahasabha Official Brand Identity Kit"
                width={1200}
                height={1200}
                priority
                className="object-contain w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>

        {/* 5 Core Pillars */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#B52A12] font-display">
              {t("brandPillarsHeading")}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] mt-1">
              {t("brandPillarsSubheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {brandPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  delay: idx * 0.06,
                }}
                className="bg-white rounded-xl border border-[#D9A52B]/35 p-5 shadow-xs hover:border-[#B52A12] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12] mb-3 shadow-2xs">
                    <pillar.Icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-[#B52A12] mb-1 font-display">
                    {t(pillar.titleKey)}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#D9A52B] mb-2">
                    {t(pillar.subKey)}
                  </p>
                  <p className="text-xs text-[#5C4E46] leading-relaxed">
                    {t(pillar.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dignified Motto Banner (No em dash) */}
        <div className="rounded-2xl bg-[#B52A12] text-white p-7 sm:p-10 text-center border-2 border-[#D9A52B] shadow-lg relative overflow-hidden max-w-4xl mx-auto">
          <div className="relative z-10 space-y-3">
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-wide text-white leading-tight font-display">
              &quot;{t("officialMotto")}&quot;
            </h3>

            {language !== "en" && (
              <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-white/80 pt-1 font-semibold">
                &quot;Together We Have Strength, Organization Brings Prosperity&quot;
              </p>
            )}

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="/membership"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D9A52B] text-[#29211D] font-bold text-xs sm:text-sm hover:bg-[#E5B84B] transition-transform hover:scale-105 shadow-sm"
              >
                {t("btnGetIdBadge")}
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#B52A12] font-bold text-xs sm:text-sm border border-[#D9A52B] hover:bg-[#FAF2E0] transition-colors"
              >
                {t("btnOurObjectives")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for High-Resolution Inspection (Solid Backdrop, No Frost) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#29211D]/95 flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#D9A52B]">
                  {t("brandImageLabel")}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="/images/brand-identity-kit.jpg"
                    download="Aanjanna_Jat_Mahasabha_Brand_Identity_Kit.jpg"
                    className="p-1.5 px-3 rounded-lg bg-white text-[#29211D] text-xs font-bold flex items-center gap-1.5 hover:bg-[#FAF2E0] transition-colors"
                    aria-label="Download Image"
                  >
                    <Download size={15} />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    aria-label="Close Preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="relative w-full h-[76vh] bg-[#FFF9EC] rounded-xl overflow-hidden p-2 flex items-center justify-center shadow-2xl border-2 border-[#D9A52B]">
                <Image
                  src="/images/brand-identity-kit.jpg"
                  alt="Anjana Jat Mahasabha Full Brand Kit"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
