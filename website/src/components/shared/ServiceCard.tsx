"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  Briefcase,
  Heart,
  Scale,
  Users,
  Wheat,
  Shield,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  heart: Heart,
  scale: Scale,
  users: Users,
  wheat: Wheat,
  shield: Shield,
  rocket: Rocket,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  index: number;
  compact?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon,
  slug,
  index,
  compact = false,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Heart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link
        href={`/services#${slug}`}
        className={cn(
          "group block rounded-2xl bg-white border border-[#D9A52B]/40 hover:border-[#B52A12] shadow-xs hover:shadow-md transition-all p-5 h-full flex flex-col justify-between",
          compact ? "p-4 sm:p-5" : "p-6"
        )}
      >
        <div>
          <div
            className={cn(
              "rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center mb-3 group-hover:bg-[#B52A12] transition-colors",
              compact ? "w-11 h-11" : "w-13 h-13"
            )}
          >
            <IconComponent
              className={cn(
                "text-[#B52A12] group-hover:text-white transition-colors",
                compact ? "w-5 h-5" : "w-6 h-6"
              )}
            />
          </div>
          <h3
            className={cn(
              "font-bold text-[#29211D] group-hover:text-[#B52A12] transition-colors mb-1.5 leading-snug",
              compact ? "text-xs sm:text-sm" : "text-base"
            )}
          >
            {title}
          </h3>
          {!compact && (
            <p className="text-xs text-[#5C4E46] line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}