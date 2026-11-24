"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageHeroProps {
  title: string;
  titleHi?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({
  title,
  titleHi,
  subtitle,
  breadcrumbs = [],
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aanjanajatmahasabha.org",
      },
      ...breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: b.label,
        item: `https://aanjanajatmahasabha.org${b.href}`,
      })),
    ],
  } : null;

  return (
    <section className="relative overflow-hidden bg-[#B52A12] text-white py-16 md:py-24 border-b-2 border-[#D9A52B]">
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80 mb-5"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-[#D9A52B] transition-colors font-medium">
              <Home size={13} />
              {t("navHome")}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={13} className="text-[#D9A52B]" />
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-white font-semibold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#D9A52B] transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        {titleHi && language === "hi" && (
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="text-[#D9A52B] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 font-devanagari"
          >
            {titleHi}
          </motion.p>
        )}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 font-display tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.1 }}
            className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative divider */}
        <div className="mt-5 mx-auto w-20 h-1 rounded-full bg-[#D9A52B]" />
      </div>
    </section>
  );
}
