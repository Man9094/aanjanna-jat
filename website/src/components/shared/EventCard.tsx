"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const date = new Date(event.date);
  const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
  const day = date.getDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
    >
      {/* Image placeholder with date badge */}
      <div className="relative h-48 bg-gradient-to-br from-saffron/20 via-maroon/10 to-gold/20 overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30" />
        <div className="absolute top-4 left-4 bg-white dark:bg-card rounded-xl px-3 py-2 text-center shadow-md">
          <p className="text-xs font-bold text-saffron uppercase">{month}</p>
          <p className="text-2xl font-bold text-foreground leading-none">{day}</p>
        </div>
        {event.isUpcoming && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
              Upcoming
            </span>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron text-xs font-medium capitalize">
            {event.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-saffron transition-colors mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-saffron shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-saffron shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {event.registrationLink && event.isUpcoming && (
          <Link
            href={event.registrationLink}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron hover:text-saffron-dark transition-colors"
          >
            Register Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
