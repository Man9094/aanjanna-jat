"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LeaderSpotlight() {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#FAF2E0] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-bold text-[#B52A12] uppercase tracking-wider block mb-2 px-3.5 py-1 rounded-full bg-white border border-[#D9A52B]/40 inline-block">
              {t("leaderEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#B52A12] mb-3 font-display">
              {t("leaderTitle")}
            </h2>
            <div className="w-16 h-1 bg-[#D9A52B] mx-auto rounded-full mt-3" />
          </div>

          {/* Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white border-2 border-[#D9A52B]/50 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-[280px_1fr]"
          >
            {/* Left: Emblem */}
            <div className="relative h-64 md:h-auto w-full bg-[#FFF9EC] border-b md:border-b-0 md:border-r border-[#D9A52B]/40 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-[#B52A12] border-2 border-[#D9A52B] text-white flex items-center justify-center text-3xl font-bold font-devanagari shadow-md mb-3">
                आ
              </div>
              <h4 className="font-extrabold text-[#B52A12] text-sm">
                {t("brandTitle")}
              </h4>
              <p className="text-xs text-[#5C4E46] font-semibold mt-1">
                {language === "hi"
                  ? "केंद्रीय एवं राज्य कार्यकारिणी"
                  : language === "gu"
                  ? "કેન્દ્રીય અને રાજ્ય કારોબારી"
                  : "Central & State Executive Council"}
              </p>
            </div>

            {/* Right: Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 text-[#B52A12] text-xs font-bold uppercase tracking-wider">
                  {language === "hi"
                    ? "राजस्थान • गुजरात • म.प्र."
                    : language === "gu"
                    ? "રાજસ્થાન • ગુજરાત • મ.પ્ર."
                    : "Rajasthan • Gujarat • MP"}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#29211D] mt-3">
                  {t("leaderTitle")}
                </h3>
                <p className="text-[#5C4E46] text-sm leading-relaxed mt-2 font-sans">
                  {t("leaderDesc")}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/community-members"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B52A12] text-white font-bold text-sm border border-[#D9A52B] shadow-xs hover:bg-[#8F1F0B] hover:shadow-md transition-all group"
                >
                  {t("btnAllLeaders")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}