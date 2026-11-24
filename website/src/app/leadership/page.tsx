"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import LeaderCard from "@/components/shared/LeaderCard";
import { leaders } from "@/data/leaders";
import { useLanguage } from "@/context/LanguageContext";

const tabs = [
  { key: "national", label: "National Committee", labelHi: "राष्ट्रीय समिति", labelGu: "રાષ્ટ્રીય સમિતિ" },
  { key: "youth", label: "Youth Wing", labelHi: "युवा प्रकोष्ठ", labelGu: "યુવા પાંખ" },
  { key: "women", label: "Women Wing", labelHi: "महिला प्रकोष्ठ", labelGu: "મહિલા પાંખ" },
  { key: "district", label: "State Representatives", labelHi: "राज्य प्रतिनिधि", labelGu: "રાજ્ય પ્રતિનિધિ" },
];

export default function LeadershipPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("national");
  const president = leaders.find((l) => l.designation === "National President");
  const filtered = leaders.filter((l) => l.category === activeTab);

  return (
    <>
      <PageHero
        title={language === "hi" ? "हमारा नेतृत्व" : language === "gu" ? "આપણું નેતૃત્વ" : "Our Leadership"}
        titleHi="आँजणा जाट महासभा नेतृत्व मंडल"
        subtitle={
          language === "hi"
            ? "समाज को प्रगति, एकता एवं सांस्कृतिक स्वाभिमान के मार्ग पर अग्रसर करने वाले मार्गदर्शक।"
            : language === "gu"
            ? "સમાજને પ્રગતિ, એકતા અને સાંસ્કૃતિક સ્વાભિમાન તરફ દોરી જતાં માર્ગદર્શકો."
            : "Meet the dedicated leaders guiding our community towards a brighter future."
        }
        breadcrumbs={[
          { label: language === "hi" ? "परिचय" : language === "gu" ? "પરિચય" : "About", href: "/about" },
          { label: language === "hi" ? "नेतृत्व" : language === "gu" ? "નેતૃત્વ" : "Leadership", href: "/leadership" }
        ]}
      />

      {/* President Spotlight */}
      {president && (
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <LeaderCard leader={president} index={0} spotlight />
          </div>
        </section>
      )}

      {/* Committee Tabs */}
      <section className="py-16 md:py-24 bg-[#FAF2E0]/40">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "समिति सदस्य" : language === "gu" ? "સમિતિ સભ્યો" : "Committee Members"}
            titleHi="केंद्रीय एवं प्रांतीय समितियां"
          />

          {/* Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {tabs.map((tab) => {
              const label = language === "hi" ? tab.labelHi : language === "gu" ? tab.labelGu : tab.label;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                      : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12] hover:text-[#B52A12]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Members Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.map((leader, index) => (
              <LeaderCard key={leader.id} leader={leader} index={index} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="max-w-xl mx-auto text-center py-12 px-6 rounded-2xl bg-white border border-dashed border-[#D9A52B]/40">
              <p className="text-sm font-bold text-[#29211D]">
                {language === "hi"
                  ? "पदाधिकारियों की सूची शीघ्र ही प्रकाशित की जाएगी।"
                  : language === "gu"
                  ? "હોદ્દેદારોની યાદી ટૂંક સમયમાં પ્રકાશિત કરવામાં આવશે."
                  : "Committee members will be updated soon."}
              </p>
              <p className="text-xs text-[#5C4E46] mt-1">
                {language === "hi"
                  ? "महासभा कार्यालय से प्रमाणित विवरण प्राप्त होने पर सूची यहाँ प्रदर्शित होगी।"
                  : language === "gu"
                  ? "મહાસભા કાર્યાલય દ્વારા પ્રમાણિત વિગતો પ્રાપ્ત થયેથી યાદી અહીં ઉપલબ્ધ થશે."
                  : "Verified details will appear here once supplied by the central office."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
