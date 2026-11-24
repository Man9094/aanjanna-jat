"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  titleHi?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  titleHi,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={cn("mb-12", centered && "text-center", className)}
    >
      {titleHi && language === "hi" && (
        <p
          className={cn(
            "text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 font-devanagari",
            light ? "text-[#D9A52B]" : "text-[#B52A12]"
          )}
        >
          {titleHi}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-tight mb-3 font-display",
          light ? "text-white" : "text-[#B52A12]"
        )}
      >
        {title}
      </h2>
      <div className={cn("section-divider", !centered && "mx-0")} />
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base max-w-2xl font-normal leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/80" : "text-[#5C4E46]"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
