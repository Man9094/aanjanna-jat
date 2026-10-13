"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsCard from "@/components/shared/NewsCard";
import { newsArticles } from "@/data/news";

export default function NewsPreview() {
  const featured = newsArticles.find((n) => n.featured);
  const others = newsArticles.filter((n) => !n.featured).slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="News & Updates"
          titleHi="समाचार एवं अपडेट"
          subtitle="Stay informed with the latest news, announcements, and community updates."
        />

        <div className="space-y-8">
          {newsArticles.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
              No news or announcements have been published yet.
            </p>
          )}
          {featured && <NewsCard article={featured} index={0} featured />}

          <div className="grid md:grid-cols-3 gap-6">
            {others.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-saffron text-saffron font-medium hover:bg-saffron hover:text-white transition-all duration-300"
          >
            View All News
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
