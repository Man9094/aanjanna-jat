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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/services#${slug}`}
        className={cn(
          "group block rounded-2xl bg-card border border-border p-6 hover-lift",
          compact ? "p-5" : "p-6"
        )}
      >
        <div
          className={cn(
            "rounded-xl bg-gradient-to-br from-saffron/10 to-maroon/10 flex items-center justify-center mb-4 group-hover:from-saffron/20 group-hover:to-maroon/20 transition-colors",
            compact ? "w-12 h-12" : "w-14 h-14"
          )}
        >
          <IconComponent
            className={cn(
              "text-saffron group-hover:scale-110 transition-transform",
              compact ? "w-5 h-5" : "w-6 h-6"
            )}
          />
        </div>
        <h3
          className={cn(
            "font-semibold text-foreground group-hover:text-saffron transition-colors mb-2",
            compact ? "text-sm" : "text-base"
          )}
        >
          {title}
        </h3>
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
