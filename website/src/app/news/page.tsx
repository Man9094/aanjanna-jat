"use client";

import { useState } from "react";
import PageHero from "@/components/shared/PageHero";
import NewsCard from "@/components/shared/NewsCard";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { key: "all", labelEn: "All Dispatches", labelHi: "समस्त समाचार", labelGu: "તમામ સમાચાર" },
  { key: "announcement", labelEn: "Announcements", labelHi: "विज्ञप्तियां", labelGu: "જાહેરાતો" },
  { key: "achievement", labelEn: "Achievements", labelHi: "उपलब्धियां", labelGu: "સિદ્ધિઓ" },
  { key: "press", labelEn: "Press Releases", labelHi: "प्रेस विज्ञप्ति", labelGu: "પ્રેસ નોટ" },
  { key: "notice", labelEn: "Notices", labelHi: "सूचनाएं", labelGu: "સૂચનાઓ" },
];

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const featured = newsArticles.find((n) => n.featured);
  const filtered = newsArticles.filter(
    (n) => filter === "all" || n.category === filter
  );

  return (
    <>
      <PageHero
        title={language === "hi" ? "समाचार एवं प्रेस विज्ञप्तियां" : language === "gu" ? "સમાચાર અને પ્રેસ જાહેરાતો" : "News & Media Dispatches"}
        titleHi="आँजणा जाट महासभा आधिकारिक सूचनाएं"
        subtitle={
          language === "hi"
            ? "महासभा के आधिकारिक निर्णयों, गतिविधियों एवं सामाजिक उपलब्धियों की प्रामाणिक जानकारी।"
            : language === "gu"
            ? "મહાસભાના સત્તાવાર નિર્ણયો, પ્રવૃત્તિઓ અને સિદ્ધિઓની માહિતી."
            : "Stay informed with the latest community news, announcements, and press releases."
        }
        breadcrumbs={[
          { label: language === "hi" ? "समाचार" : language === "gu" ? "સમાચાર" : "News", href: "/news" }
        ]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
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

          {/* Featured */}
          {filter === "all" && featured && (
            <div className="mb-10">
              <NewsCard article={featured} index={0} featured />
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered
              .filter((n) => filter !== "all" || !n.featured)
              .map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
          </div>

          {filtered.length === 0 && (
            <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-[#D9A52B]/40 bg-white px-6 py-14 text-center">
              <p className="text-sm font-bold text-[#29211D]">
                {t("noNews")}
              </p>
              <p className="text-xs text-[#5C4E46] mt-1">
                {language === "hi"
                  ? "महासभा कार्यालय से प्रेस विज्ञप्ति जारी होने पर समाचार यहाँ प्रदर्शित किए जाएंगे।"
                  : language === "gu"
                  ? "મહાસભા કાર્યાલય દ્વારા પ્રેસ નોંધ બહાર પડતાં જ સમાચાર અહીં પ્રકાશિત કરવામાં આવશે."
                  : "Official bulletins will be showcased here once released by the secretariat."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
