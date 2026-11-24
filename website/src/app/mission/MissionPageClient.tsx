"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { keyObjectives, type ObjectiveItem } from "@/components/home/MissionSection";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MissionPageClient() {
  const { language, t } = useLanguage();

  const getObjectiveTitle = (obj: ObjectiveItem) => {
    if (language === "hi") return obj.titleHi;
    if (language === "gu") return obj.titleGu;
    return obj.titleEn;
  };

  const getObjectiveDesc = (obj: ObjectiveItem) => {
    if (language === "hi") return obj.descHi;
    if (language === "gu") return obj.descGu;
    return obj.descEn;
  };

  return (
    <>
      <PageHero
        title={t("missionTitle")}
        subtitle={t("missionSubtitle")}
        breadcrumbs={[{ label: t("navAbout"), href: "/mission" }]}
      />

      {/* Main Objectives List Section */}
      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title={t("missionTitle")}
            subtitle={t("missionSubtitle")}
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {keyObjectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl bg-white border border-[#D9A52B]/40 p-6 hover:border-[#B52A12] hover:shadow-md transition-all flex items-start gap-5"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/60 text-[#B52A12] flex items-center justify-center font-bold text-lg shadow-xs">
                    <Icon className="w-5 h-5 text-[#B52A12]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#29211D]">
                      {getObjectiveTitle(obj)}
                    </h3>
                    <p className="text-sm text-[#5C4E46] leading-relaxed">
                      {getObjectiveDesc(obj)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizational Contact / Support Banner */}
      <section className="py-14 bg-[#B52A12] text-white border-t border-[#D9A52B]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-devanagari">
            {language === "hi"
              ? "इन उद्देश्यों को सफल बनाने हेतु महासभा से जुड़ें"
              : language === "gu"
              ? "આ ઉદ્દેશોને સાકાર કરવા માટે મહાસભા સાથે જોડાઓ"
              : "Join Hands with the Mahasabha to Fulfill These Objectives"}
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto text-sm md:text-base">
            {language === "hi"
              ? "शिक्षा, किसान अधिकार, ऐतिहासिक शोध और सामाजिक एकता के लिए हमारे साथ कदम बढ़ाएं।"
              : language === "gu"
              ? "શિક્ષણ, ખેડૂત અધિકાર, ઐતિહાસિક સંશોધન અને સામાજિક એકતા માટે અમારી સાથે આગળ વધો."
              : "Join hands with Anjana Jat Mahasabha to support education, agrarian welfare, authentic heritage preservation, and community harmony."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/95">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-[#D9A52B]" />
              <span>{t("officialEmail")}</span>
            </div>
            <a
              href="https://wa.me/918788594494"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#D9A52B] transition-colors"
            >
              <Phone size={18} className="text-[#D9A52B]" />
              <span>{t("officialPhone")}</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#D9A52B]" />
              <span>{t("officeAddress")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}