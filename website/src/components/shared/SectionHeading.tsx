"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12",
        centered && "text-center",
        className
      )}
    >
      {titleHi && (
        <p
          className={cn(
            "text-sm font-devanagari mb-2",
            light ? "text-white/60" : "text-saffron/70"
          )}
        >
          {titleHi}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          light ? "text-white" : "gradient-text-maroon"
        )}
      >
        {title}
      </h2>
      <div className={cn("section-divider", !centered && "mx-0")} />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
