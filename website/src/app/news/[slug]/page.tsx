import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Tag } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { newsArticles } from "@/data/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.date);
  const formatted = !isNaN(date.getTime())
    ? date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : article.date;

  return (
    <>
      <PageHero
        title={article.titleHi || article.title}
        titleHi="आधिकारिक समाचार एवं सूचना"
        subtitle={article.title}
        breadcrumbs={[
          { label: "News & Updates", href: "/news" },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      />

      <article className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:text-maroon transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>सभी समाचार एवं सूचनाएं देखें (Back to all notices)</span>
          </Link>

          {/* Article Header Meta */}
          <div className="border-b border-border pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar size={14} className="text-saffron" />
                {formatted}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <User size={14} className="text-saffron" />
                {article.author}
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron font-bold text-xs capitalize">
                {article.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground font-devanagari leading-snug mb-3">
              {article.titleHi || article.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {article.title}
            </p>
          </div>

          {/* Main Visual */}
          {article.image && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border mb-8 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          {/* Excerpt / Lead */}
          <div className="p-6 rounded-2xl bg-muted/40 border-l-4 border-saffron mb-8 space-y-2">
            {article.excerptHi && (
              <p className="text-base md:text-lg font-semibold text-foreground font-devanagari leading-relaxed">
                {article.excerptHi}
              </p>
            )}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Full Body Content */}
          <div className="space-y-6 text-foreground leading-relaxed">
            {article.contentHi && (
              <div className="space-y-4 font-devanagari text-base md:text-lg border-b border-border/60 pb-6">
                <h3 className="text-xl font-bold text-saffron">विस्तृत विवरण:</h3>
                <p className="whitespace-pre-line leading-relaxed">
                  {article.contentHi}
                </p>
              </div>
            )}

            <div className="space-y-4 text-base text-muted-foreground">
              <h3 className="text-lg font-bold text-foreground">Official Release Notes:</h3>
              <p className="whitespace-pre-line leading-relaxed">
                {article.content}
              </p>
            </div>
          </div>

          {/* Verified Official Notice Note */}
          <div className="mt-12 p-5 rounded-xl bg-card border border-border text-xs text-muted-foreground flex items-center justify-between">
            <span>जारीकर्ता: {article.author} • आंजना जाट महासभा</span>
            <Link
              href="/contact"
              className="text-saffron font-bold hover:underline"
            >
              संपर्क करें
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
