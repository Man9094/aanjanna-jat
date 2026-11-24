"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import type { NewsArticle } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  featured?: boolean;
}

export default function NewsCard({ article, index, featured = false }: NewsCardProps) {
  const { language, t } = useLanguage();
  const date = new Date(article.date);
  const locale = language === "hi" ? "hi-IN" : language === "gu" ? "gu-IN" : "en-IN";
  const formatted = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const title = language === "hi" ? (article.titleHi || article.title) : article.title;
  const excerpt = language === "hi" ? (article.excerptHi || article.excerpt) : article.excerpt;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="group rounded-2xl bg-white border-2 border-[#D9A52B]/50 overflow-hidden shadow-xs hover:border-[#B52A12] transition-all"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Visual banner */}
          <div className="h-64 md:h-full bg-[#FAF2E0] border-b md:border-b-0 md:border-r border-[#D9A52B]/40 relative overflow-hidden flex items-center justify-center p-8">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#B52A12] text-white text-xs font-bold border border-[#D9A52B]/40">
                {language === "hi" ? "प्रमुख समाचार" : language === "gu" ? "મુખ્ય સમાચાર" : "Featured Release"}
              </span>
              <p className="text-2xl font-black text-[#29211D] font-devanagari">
                {t("brandTitle")}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs text-[#5C4E46] mb-3">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar size={13} className="text-[#B52A12]" />
                {formatted}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <User size={13} className="text-[#B52A12]" />
                {article.author}
              </span>
            </div>
            <span className="inline-block w-fit px-2.5 py-0.5 rounded-md bg-[#FAF2E0] border border-[#D9A52B]/40 text-[#B52A12] text-xs font-bold capitalize mb-3">
              {article.category}
            </span>
            <h3 className="text-2xl font-bold text-[#29211D] group-hover:text-[#B52A12] transition-colors mb-3 font-display">
              {title}
            </h3>
            <p className="text-[#5C4E46] text-sm leading-relaxed mb-5">
              {excerpt}
            </p>
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#B52A12] hover:underline"
            >
              {language === "hi" ? "विस्तृत समाचार पढ़ें" : language === "gu" ? "સંપૂર્ણ સમાચાર વાંચો" : "Read Full Article"}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group rounded-2xl bg-white border border-[#D9A52B]/40 overflow-hidden hover:border-[#B52A12] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-[#5C4E46] mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-[#B52A12]" />
            {formatted}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#FAF2E0] border border-[#D9A52B]/30 text-[#B52A12] font-bold text-[11px] capitalize">
            {article.category}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#29211D] group-hover:text-[#B52A12] transition-colors mb-2 line-clamp-2 font-display">
          {title}
        </h3>
        <p className="text-xs text-[#5C4E46] line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </div>

      <div className="p-6 pt-0 border-t border-[#D9A52B]/20 flex items-center justify-between text-xs text-[#5C4E46]">
        <span>{article.author}</span>
        <Link
          href={`/news/${article.slug}`}
          className="text-[#B52A12] font-bold inline-flex items-center gap-1 hover:underline"
        >
          {language === "hi" ? "पढ़ें" : language === "gu" ? "વાંચો" : "Read"}
          <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
