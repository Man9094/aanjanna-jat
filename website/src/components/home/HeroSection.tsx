"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Users } from "lucide-react";
import { aanjanaGotras } from "@/data/gotras";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  // Splitting gotras into multiple subsets for background vertical scrolling columns
  const col1 = [...aanjanaGotras.slice(0, 10), ...aanjanaGotras.slice(0, 10)];
  const col2 = [...aanjanaGotras.slice(10, 20), ...aanjanaGotras.slice(10, 20)];
  const col3 = [...aanjanaGotras.slice(20, 30), ...aanjanaGotras.slice(20, 30)];
  const col4 = [...aanjanaGotras.slice(5, 15), ...aanjanaGotras.slice(5, 15)];
  const col5 = [...aanjanaGotras.slice(15, 25), ...aanjanaGotras.slice(15, 25)];
  const col6 = [
    ...aanjanaGotras.slice(24),
    ...aanjanaGotras.slice(0, 10),
    ...aanjanaGotras.slice(24),
    ...aanjanaGotras.slice(0, 10),
  ];
  const horizontalGotras = [...aanjanaGotras, ...aanjanaGotras];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden pt-24 pb-10 bg-gradient-to-br from-[#2B0808] via-[#591212] to-[#7E3100]">
      {/* Gotra / surname background — the community's surnames as the hero backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none flex justify-between gap-4 px-2 md:px-8">
        <div className="flex-1 min-w-[120px] flex flex-col gap-4 animate-marquee-up">
          {col1.map((g, i) => (
            <div
              key={`c1-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-gold/20 backdrop-blur-sm text-center"
            >
              <p className="text-gold font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-white/60 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-[120px] flex flex-col gap-4 animate-marquee-down">
          {col2.map((g, i) => (
            <div
              key={`c2-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-saffron/20 backdrop-blur-sm text-center"
            >
              <p className="text-white font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-gold/70 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-[120px] flex flex-col gap-4 animate-marquee-up">
          {col3.map((g, i) => (
            <div
              key={`c3-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-gold/20 backdrop-blur-sm text-center"
            >
              <p className="text-gold font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-white/60 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex flex-1 min-w-[120px] flex-col gap-4 animate-marquee-down">
          {col4.map((g, i) => (
            <div
              key={`c4-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-saffron/20 backdrop-blur-sm text-center"
            >
              <p className="text-white font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-gold/70 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-1 min-w-[120px] flex-col gap-4 animate-marquee-up">
          {col5.map((g, i) => (
            <div
              key={`c5-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-gold/20 backdrop-blur-sm text-center"
            >
              <p className="text-gold font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-white/60 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex flex-1 min-w-[120px] flex-col gap-4 animate-marquee-down">
          {col6.map((g, i) => (
            <div
              key={`c6-${i}`}
              className="p-3 rounded-2xl bg-white/10 border border-saffron/20 backdrop-blur-sm text-center"
            >
              <p className="text-white font-bold text-sm font-devanagari">
                {g.hi} • {g.gu}
              </p>
              <p className="text-gold/70 text-xs font-medium">{g.en}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-saffron/20 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none cultural-pattern" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto my-auto py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-4 relative w-20 h-20 rounded-full border-2 border-gold p-1 bg-black/50 backdrop-blur-lg shadow-2xl overflow-hidden"
        >
          <Image
            src="/logo.png"
            alt="Anjana Jat Logo"
            fill
            priority
            sizes="80px"
            className="object-cover rounded-full"
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-poppins leading-tight mb-5 tracking-tight drop-shadow-lg"
        >
          Uniting the <span className="gradient-text">Anjana Jat</span> Community
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white/90 text-base md:text-lg lg:text-xl font-light mb-8 max-w-2xl leading-relaxed drop-shadow"
        >
          Preserving Heritage • Empowering Society • Building the Future
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-4"
        >
          <Link href="/mission">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-saffron to-maroon text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:brightness-110 shadow-xl shadow-saffron/40 text-sm"
            >
              Explore Our Mission
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/membership">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-semibold border border-gold/40 transition-all hover:bg-white/20 text-sm shadow-lg"
            >
              Become a Member (Free)
              <Users className="w-4 h-4 text-gold" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gotra surname strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-black/70 border border-gold/40 backdrop-blur-2xl py-3 px-4 shadow-2xl relative overflow-hidden flex items-center gap-4">
          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-saffron to-maroon text-white text-xs font-bold font-devanagari uppercase tracking-wide shadow-md z-10">
            <span>आंजना गोत्र सूची</span>
          </div>
          <div className="overflow-hidden w-full flex items-center pointer-events-auto">
            <div className="flex gap-3 whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused]">
              {horizontalGotras.map((gotra, idx) => (
                <span
                  key={`horiz-gotra-${idx}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-gold/30 border border-white/15 text-xs text-white transition-colors cursor-pointer"
                >
                  <span className="font-bold text-gold font-devanagari">{gotra.hi}</span>
                  <span className="text-white/60 text-[10px]">({gotra.gu})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-1 text-white/50 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}