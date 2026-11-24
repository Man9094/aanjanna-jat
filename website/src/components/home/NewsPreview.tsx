"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPreview() {
  const { language, t } = useLanguage();
  const featured = newsArticles.find((n) => n.featured) || newsArticles[0];
  const dispatches = newsArticles.filter((n) => n.id !== featured?.id).slice(0, 4);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === "hi" ? "hi-IN" : language === "gu" ? "gu-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-[#FFF9EC] text-[#29211D] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t("newsHeading")}
          subtitle={t("newsSub")}
        />

        {newsArticles.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#D9A52B]/40 bg-white px-6 py-12 text-center text-sm text-[#5C4E46]">
            {t("noNews")}
          </p>
        ) : (
          /* Newspaper Broadsheet Editorial Split (7 Cols Lead Dispatch + 5 Cols Bulletin Rows) */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Lead Broadsheet Article (7 Cols) */}
            {featured && (
              <article className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#D9A52B]/40 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9A52B]/30 text-xs text-[#5C4E46]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 text-[#B52A12] font-bold uppercase tracking-wider text-[10px]">
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-[#B52A12]" />
                      {formatDate(featured.date)}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#29211D] leading-tight mb-3 font-display">
                    <Link href={`/news/${featured.slug}`} className="hover:text-[#B52A12] transition-colors">
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#B52A12] font-devanagari font-bold mb-3">
                    {featured.titleHi}
                  </p>

                  <p className="text-sm text-[#5C4E46] leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9A52B]/20 flex items-center justify-between">
                  <span className="text-xs text-[#5C4E46] flex items-center gap-1.5">
                    <User size={13} className="text-[#B52A12]" />
                    {featured.author}
                  </span>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B52A12] hover:underline"
                  >
                    {language === "hi" ? "विस्तृत समाचार पढ़ें" : language === "gu" ? "સંપૂર્ણ સમાચાર વાંચો" : "Read Full Dispatch"}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            )}

            {/* Right: Gazette Bulletin List Rows with 0.5px Hairline Dividers (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A52B]/40 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#D9A52B]/30">
                <Newspaper size={16} className="text-[#B52A12]" />
                <h4 className="text-sm font-bold text-[#B52A12] uppercase tracking-wider font-display">
                  {language === "hi" ? "नवीनतम सूचनाएं एवं विज्ञप्तियां" : language === "gu" ? "તાજેતરના સમાચારો" : "Gazette Bulletins"}
                </h4>
              </div>

              <div className="divide-y divide-[#D9A52B]/30">
                {dispatches.map((article) => (
                  <article key={article.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between text-[11px] text-[#5C4E46] mb-1">
                      <span className="font-semibold text-[#B52A12] uppercase tracking-wider text-[10px]">
                        {article.category}
                      </span>
                      <span>{formatDate(article.date)}</span>
                    </div>

                    <h5 className="text-sm font-bold text-[#29211D] leading-snug hover:text-[#B52A12] transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h5>

                    <p className="text-xs text-[#5C4E46] line-clamp-2 mt-1 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FAF2E0] border border-[#D9A52B] text-[#B52A12] font-bold text-sm hover:bg-[#B52A12] hover:text-white transition-all shadow-xs group"
          >
            {t("btnAllNews")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
