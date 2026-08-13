"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import type { NewsArticle } from "@/data/news";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  featured?: boolean;
}

export default function NewsCard({ article, index, featured = false }: NewsCardProps) {
  const date = new Date(article.date);
  const formatted = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="h-64 md:h-full bg-gradient-to-br from-saffron/20 via-maroon/10 to-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 cultural-pattern opacity-30" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-saffron text-white text-xs font-medium">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatted}
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {article.author}
              </span>
            </div>
            <span className="inline-block w-fit px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron text-xs font-medium capitalize mb-3">
              {article.category}
            </span>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-saffron transition-colors mb-3">
              {article.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              {article.excerpt}
            </p>
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-2 text-saffron font-medium hover:gap-3 transition-all"
            >
              Read Full Article
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-saffron/15 via-maroon/10 to-gold/15 relative overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-20" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatted}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-saffron/10 text-saffron font-medium capitalize">
            {article.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-foreground group-hover:text-saffron transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-saffron hover:gap-2.5 transition-all"
        >
          Read More
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
