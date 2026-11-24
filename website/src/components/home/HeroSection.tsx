"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CreditCard, Compass, BookOpen } from "lucide-react";
import { anjanaChaudharyGotras } from "@/data/gotras";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 220,
        damping: 28,
      },
    },
  };

  // Divide the 233 Anjana Chaudhary Samaj Gotras across 6 vertical ambient columns
  const colCount = 6;
  const colSize = Math.ceil(anjanaChaudharyGotras.length / colCount);
  const columns = Array.from({ length: colCount }, (_, colIndex) => {
    const slice = anjanaChaudharyGotras.slice(colIndex * colSize, (colIndex + 1) * colSize);
    // Pad to ensure all columns have equal length
    const padded =
      slice.length < colSize
        ? [...slice, ...anjanaChaudharyGotras.slice(0, colSize - slice.length)]
        : slice;
    // 2 identical halves for seamless translateY(0%) to translateY(-50%) infinite continuous loop
    const base = padded;
    return [...base, ...base];
  });

  // Independent movement speeds for each column (seconds)
  const columnSpeeds = [34, 46, 28, 42, 32, 50];

  // Responsive column visibility and opacities (outer ~22%, mid ~19%, central ~16%)
  // Provides authentic heritage printed-ink visibility while protecting central typography.
  const columnConfigs = [
    {
      classes: "block opacity-[0.22]",
    },
    {
      classes: "block opacity-[0.18] lg:opacity-[0.19]",
    },
    {
      classes: "block opacity-[0.22] sm:opacity-[0.18] lg:opacity-[0.16]",
    },
    {
      classes: "hidden sm:block sm:opacity-[0.16]",
    },
    {
      classes: "hidden lg:block lg:opacity-[0.19]",
    },
    {
      classes: "hidden lg:block lg:opacity-[0.22]",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF9EC] text-[#29211D] pt-12 pb-16 border-b border-[#D9A52B]/30 min-h-[580px] flex items-center justify-center">
      {/* ===================================================================
          LAYER A: AMBIENT GOTRA BACKGROUND (BEHIND CONTENT - z-0)
          Seamless vertical Gotra marquee with independent column speeds,
          alternating up/down directions, deep muted Kesari-Maroon ink tone (#70291D),
          and calibrated 16-22% visibility with subtle tactile ink depth.
          =================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
        aria-hidden="true"
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 h-[250%] w-full max-w-7xl mx-auto px-4">
          {columns.map((colGotras, colIdx) => {
            const isUp = colIdx % 2 === 0;
            const speed = columnSpeeds[colIdx] || 40;
            const config = columnConfigs[colIdx] || { classes: "block opacity-[0.18]" };
            return (
              <div
                key={`gotra-col-${colIdx}`}
                className={`relative overflow-hidden h-full will-change-transform ${config.classes}`}
              >
                <div
                  className="flex flex-col gap-6"
                  style={{
                    animation: shouldReduceMotion
                      ? "none"
                      : `${isUp ? "marqueeUp" : "marqueeDown"} ${speed}s linear infinite`,
                  }}
                >
                  {colGotras.map((gotra, idx) => (
                    <div
                      key={`ambient-${colIdx}-${gotra.id}-${idx}`}
                      className="py-2.5 text-center"
                    >
                      <p className="font-devanagari font-bold text-lg sm:text-xl lg:text-2xl text-[#70291D] tracking-wide leading-tight [text-shadow:_0_0.5px_1px_rgba(112,41,29,0.18)]">
                        {language === "gu" ? gotra.gu : gotra.hi}
                      </p>
                      <p className="font-sans font-semibold text-[10px] sm:text-[11px] lg:text-xs text-[#8A3A2C] tracking-widest uppercase mt-0.5 [text-shadow:_0_0.5px_0.5px_rgba(112,41,29,0.12)]">
                        {gotra.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top and Bottom soft fade masks for seamless canvas integration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FFF9EC] via-[#FFF9EC]/80 to-transparent z-1" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FFF9EC] via-[#FFF9EC]/80 to-transparent z-1" />

      {/* ===================================================================
          LAYER B: HERO EDITORIAL CONTENT (IN FRONT - relative z-10)
          Clean, dignified editorial presentation without AI card traps.
          =================================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Soft radial backdrop wash behind text block for effortless contrast */}
        <div className="pointer-events-none absolute -inset-x-8 -inset-y-12 bg-[radial-gradient(ellipse_at_center,_rgba(255,249,236,0.92)_0%,_rgba(255,249,236,0.75)_45%,_rgba(255,249,236,0.3)_70%,_transparent_90%)] -z-1" />

        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
        >
          {/* 1. Circular Seal Emblem with Fine Gold Hairline Border */}
          <motion.div
            variants={itemVariants}
            className="mb-5 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border border-[#D9A52B] shadow-sm overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="Anjana Jat Mahasabha Seal"
              fill
              priority
              sizes="96px"
              className="object-contain p-1 rounded-full"
            />
          </motion.div>

          {/* 2. Large Authoritative Heading */}
          <motion.div variants={itemVariants} className="space-y-1.5 mb-3 w-full">
            <h1 className="text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#29211D] tracking-tight leading-tight sm:leading-none font-display">
              {t("heroHeadingEn")}
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-devanagari text-[#B52A12] tracking-tight">
              {t("heroHeadingHi")}
            </p>
          </motion.div>

          {/* 3. Clean Tagline */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#E66A16] tracking-wider uppercase">
              {t("tagline")}
            </p>
          </motion.div>

          {/* 4. Core Mission Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-[#5C4E46] leading-relaxed max-w-2xl mb-8 font-normal"
          >
            {t("heroMissionDescription")}
          </motion.p>

          {/* 5. Action Buttons (Clean and dignified, no neon glows) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
          >
            <Link href="/membership">
              <button className="flex items-center gap-2 bg-[#B52A12] text-white px-6 sm:px-7 py-3 rounded-full font-bold border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] hover:shadow-md transition-all text-xs sm:text-sm font-sans cursor-pointer">
                <CreditCard className="w-4 h-4 text-[#D9A52B]" />
                {t("btnGetIdBadge")}
              </button>
            </Link>

            <Link href="/villages">
              <button className="flex items-center gap-2 bg-[#FAF2E0] text-[#29211D] px-5 sm:px-6 py-3 rounded-full font-bold border border-[#D9A52B]/60 shadow-2xs hover:bg-[#F5E8CE] transition-all text-xs sm:text-sm font-sans cursor-pointer">
                <Compass className="w-4 h-4 text-[#B52A12]" />
                {t("btnVillageDirectory")}
              </button>
            </Link>

            <Link href="/mission">
              <button className="flex items-center gap-2 bg-transparent text-[#29211D] px-5 sm:px-6 py-3 rounded-full font-bold border border-[#29211D]/20 hover:border-[#B52A12] hover:text-[#B52A12] transition-colors text-xs sm:text-sm font-sans cursor-pointer">
                <BookOpen className="w-4 h-4 text-[#D9A52B]" />
                {t("btnOurObjectives")}
              </button>
            </Link>
          </motion.div>

          {/* 6. Minimalist Stat Line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#5C4E46] pt-2"
          >
            <span>{t("statStates")}</span>
            <span className="text-[#D9A52B] font-bold">•</span>
            <span>{t("statGotras")}</span>
            <span className="text-[#D9A52B] font-bold">•</span>
            <span>{t("statVillages")}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
