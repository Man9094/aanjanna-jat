"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/shared/EventCard";
import { events } from "@/data/events";

const categories = [
  { key: "all", label: "All Events" },
  { key: "conference", label: "Conferences" },
  { key: "cultural", label: "Cultural" },
  { key: "sports", label: "Sports" },
  { key: "seminar", label: "Seminars" },
  { key: "social", label: "Social" },
  { key: "meeting", label: "Meetings" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [showPast, setShowPast] = useState(false);

  const upcoming = events.filter((e) => e.isUpcoming);
  const past = events.filter((e) => !e.isUpcoming);

  const filtered = (showPast ? past : upcoming).filter(
    (e) => filter === "all" || e.category === filter
  );

  return (
    <>
      <PageHero
        title="Events"
        titleHi="कार्यक्रम"
        subtitle="Join us at community events, conferences, cultural celebrations, and more."
        breadcrumbs={[{ label: "Events", href: "/events" }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setShowPast(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${!showPast ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-md" : "bg-card border border-border text-muted-foreground hover:text-saffron"}`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${showPast ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-md" : "bg-card border border-border text-muted-foreground hover:text-saffron"}`}
            >
              Past Events
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === cat.key
                    ? "bg-saffron/10 text-saffron border border-saffron/30"
                    : "bg-muted text-muted-foreground hover:text-saffron"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <motion.div
            key={`${showPast}-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No events found in this category. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
