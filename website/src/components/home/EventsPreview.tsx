"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/shared/EventCard";
import { events } from "@/data/events";

export default function EventsPreview() {
  const upcomingEvents = events.filter((e) => e.isUpcoming).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Upcoming Events"
          titleHi="आगामी कार्यक्रम"
          subtitle="Join us at our upcoming community events, conferences, and cultural celebrations."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
              No events have been published yet.
            </p>
          )}
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-saffron text-saffron font-medium hover:bg-saffron hover:text-white transition-all duration-300"
          >
            View All Events
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
