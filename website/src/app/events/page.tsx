"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/shared/EventCard";
import { events } from "@/data/events";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { key: "all", labelEn: "All Events", labelHi: "सभी कार्यक्रम", labelGu: "બધા કાર્યક્રમો" },
  { key: "conference", labelEn: "Conferences", labelHi: "सम्मेलन", labelGu: "સંમેલન" },
  { key: "cultural", labelEn: "Cultural", labelHi: "सांस्कृतिक", labelGu: "સાંસ્કૃતિક" },
  { key: "sports", labelEn: "Sports", labelHi: "खेलकूद", labelGu: "રમતગમત" },
  { key: "seminar", labelEn: "Seminars", labelHi: "संगोष्ठी", labelGu: "સેમિનાર" },
  { key: "social", labelEn: "Social", labelHi: "सामाजिक", labelGu: "સામાજિક" },
  { key: "meeting", labelEn: "Meetings", labelHi: "बैठकें", labelGu: "બેઠકો" },
];

export default function EventsPage() {
  const { language, t } = useLanguage();
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
        title={language === "hi" ? "कार्यक्रम एवं सम्मेलन" : language === "gu" ? "કાર્યક્રમો અને સંમેલનો" : "Community Events"}
        titleHi="आँजणा जाट महासभा सामाजिक आयोजन"
        subtitle={
          language === "hi"
            ? "महासभा के सम्मेलनों, बैठकों, युवा खेलकूद एवं सांस्कृतिक आयोजनों की अधिकृत जानकारी।"
            : language === "gu"
            ? "મહાસભાના સંમેલનો, બેઠકો, રમતગમત અને સાંસ્કૃતિક ઉત્સવોની માહિતી."
            : "Join us at community events, conferences, cultural celebrations, and more."
        }
        breadcrumbs={[
          { label: language === "hi" ? "कार्यक्रम" : language === "gu" ? "કાર્યક્રમો" : "Events", href: "/events" }
        ]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setShowPast(false)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !showPast
                  ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                  : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12] hover:text-[#B52A12]"
              }`}
            >
              {language === "hi" ? "आगामी कार्यक्रम" : language === "gu" ? "આગામી કાર્યક્રમો" : "Upcoming Events"}
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                showPast
                  ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                  : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12] hover:text-[#B52A12]"
              }`}
            >
              {language === "hi" ? "संपन्न कार्यक्रम" : language === "gu" ? "સંપન્ન કાર્યક્રમો" : "Past Events"}
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const label = language === "hi" ? cat.labelHi : language === "gu" ? cat.labelGu : cat.labelEn;
              return (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    filter === cat.key
                      ? "bg-[#FAF2E0] text-[#B52A12] border border-[#D9A52B]"
                      : "bg-white border border-[#29211D]/10 text-[#5C4E46] hover:text-[#B52A12]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
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
            <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-[#D9A52B]/40 bg-white px-6 py-14 text-center">
              <p className="text-sm font-bold text-[#29211D]">
                {t("noEvents")}
              </p>
              <p className="text-xs text-[#5C4E46] mt-1">
                {language === "hi"
                  ? "महासभा कार्यालय द्वारा आगामी कार्यक्रमों का विवरण घोषित होते ही यहाँ प्रकाशित किया जाएगा।"
                  : language === "gu"
                  ? "મહાસભા કાર્યાલય દ્વારા આગામી કાર્યક્રમોની વિગત જાહેર થતાં અહીં પ્રકાશિત થશે."
                  : "Verified event notices will appear here once announced by the Mahasabha office."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
