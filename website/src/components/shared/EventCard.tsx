"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
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
      className="group rounded-2xl bg-white border border-[#D9A52B]/40 overflow-hidden hover:border-[#B52A12] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top visual strip with date */}
        <div className="relative h-44 bg-[#FAF2E0] border-b border-[#D9A52B]/30 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-white border border-[#D9A52B]/40 rounded-xl px-3.5 py-1.5 text-center shadow-xs">
              <p className="text-[10px] font-extrabold text-[#B52A12] uppercase tracking-wider">{month}</p>
              <p className="text-2xl font-black text-[#29211D] leading-none mt-0.5">{day}</p>
            </div>
            {event.isUpcoming && (
              <span className="px-3 py-1 rounded-full bg-[#B52A12] text-white text-[11px] font-bold border border-[#D9A52B]/40">
                Upcoming
              </span>
            )}
          </div>
          <span className="self-start px-2.5 py-0.5 rounded-md bg-white border border-[#D9A52B]/30 text-[#B52A12] text-xs font-bold capitalize">
            {event.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold text-[#29211D] group-hover:text-[#B52A12] transition-colors mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs text-[#5C4E46] line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-[#5C4E46]">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#B52A12] shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#B52A12] shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {event.registrationLink && event.isUpcoming && (
        <div className="p-5 pt-0">
          <Link
            href={event.registrationLink}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B52A12] hover:underline"
          >
            Register Now
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}