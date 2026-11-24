"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { events } from "@/data/events";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsPreview() {
  const { language, t } = useLanguage();
  const upcomingEvents = events.filter((e) => e.isUpcoming).slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF2E0] text-[#29211D] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t("eventsHeading")}
          subtitle={t("eventsSub")}
        />

        {upcomingEvents.length === 0 ? (
          <p className="max-w-xl mx-auto rounded-2xl border border-dashed border-[#D9A52B]/50 bg-white px-6 py-12 text-center text-sm text-[#5C4E46]">
            {t("noEvents")}
          </p>
        ) : (
          /* Newspaper-grade Gazette Event Schedule (Horizontal Rows with 0.5px Hairline Dividers) */
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#D9A52B]/40 shadow-xs overflow-hidden">
            <div className="bg-[#FFF9EC] px-6 py-3.5 border-b border-[#D9A52B]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B52A12] uppercase tracking-wider font-display">
                <CalendarDays size={16} />
                <span>
                  {language === "hi"
                    ? "आधिकारिक कार्यक्रम एवं अधिवेशन सूची"
                    : language === "gu"
                    ? "સત્તાવાર કાર્યક્રમો અને સંમેલનો"
                    : "Official Assembly & Convention Calendar"}
                </span>
              </div>
              <span className="text-xs text-[#5C4E46] font-semibold">
                {upcomingEvents.length} {language === "hi" ? "आगामी" : language === "gu" ? "આગામી" : "Upcoming"}
              </span>
            </div>

            <div className="divide-y divide-[#D9A52B]/30">
              {upcomingEvents.map((event) => {
                const date = new Date(event.date);
                const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
                const day = date.getDate();

                return (
                  <article
                    key={event.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FFF9EC]/50 transition-colors"
                  >
                    {/* Date Block + Info */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      {/* Crisp Date Seal */}
                      <div className="w-14 h-14 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex flex-col items-center justify-center shrink-0 text-center shadow-2xs">
                        <span className="text-[10px] font-extrabold text-[#D9A52B] uppercase tracking-wider leading-none">
                          {month}
                        </span>
                        <span className="text-xl font-black text-[#B52A12] leading-none mt-1">
                          {day}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF2E0] border border-[#D9A52B]/30 text-[#B52A12] text-[10px] font-bold uppercase tracking-wider">
                            {event.category}
                          </span>
                          {event.isUpcoming && (
                            <span className="text-[10px] text-[#5C4E46] font-semibold">
                              {language === "hi" ? "नियोजित" : language === "gu" ? "નિયોજિત" : "Scheduled"}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#29211D] leading-snug">
                          {event.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C4E46] mt-1.5">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-[#B52A12]" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-[#B52A12]" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 self-end sm:self-center">
                      <Link
                        href={event.registrationLink || "/events"}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/50 hover:bg-[#B52A12] hover:text-white text-xs font-bold text-[#B52A12] transition-colors"
                      >
                        <span>{language === "hi" ? "विवरण देखें" : language === "gu" ? "વિગતો જુઓ" : "View Details"}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-[#D9A52B] text-[#B52A12] font-bold text-sm hover:bg-[#B52A12] hover:text-white transition-all shadow-xs group"
          >
            {t("btnAllEvents")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
