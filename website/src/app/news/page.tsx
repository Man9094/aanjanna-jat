"use client";

import { useState } from "react";
import PageHero from "@/components/shared/PageHero";
import NewsCard from "@/components/shared/NewsCard";
import { newsArticles } from "@/data/news";

const categories = [
  { key: "all", label: "All" },
  { key: "announcement", label: "Announcements" },
  { key: "achievement", label: "Achievements" },
  { key: "press", label: "Press Releases" },
  { key: "notice", label: "Notices" },
];

export default function NewsPage() {
  const [filter, setFilter] = useState("all");
  const featured = newsArticles.find((n) => n.featured);
  const filtered = newsArticles.filter(
    (n) => filter === "all" || n.category === filter
  );

  return (
    <>
      <PageHero
        title="News & Updates"
        titleHi="समाचार एवं अपडेट"
        subtitle="Stay informed with the latest community news, announcements, and press releases."
        breadcrumbs={[{ label: "News & Updates", href: "/news" }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === cat.key
                    ? "bg-saffron/10 text-saffron border border-saffron/30"
                    : "bg-muted text-muted-foreground hover:text-saffron"
                }`}
              >
                {cat.label}
              </button>
            ))}
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
            <p className="text-center text-muted-foreground py-16">
              No news articles in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
