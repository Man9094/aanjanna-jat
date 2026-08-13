"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, Calendar, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon via-saffron-dark to-maroon" />
      <div className="absolute inset-0 cultural-pattern opacity-20" />

      {/* Animated orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-saffron/15 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-40 left-1/3 w-48 h-48 rounded-full bg-white/5 blur-2xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Decorative geometric patterns */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold/20 rotate-45" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="inline-flex lg:flex mb-8"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-gold via-saffron to-gold shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="Aanjana Jat Mahasabha Official Emblem"
                  width={96}
                  height={96}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover bg-white shadow-inner"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gold font-medium text-sm md:text-base tracking-widest uppercase mb-4"
            >
              आंजना जाट महासभा
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                Aanjana Jat
              </span>{" "}
              Mahasabha
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg md:text-xl text-white/70 max-w-xl mb-10 mx-auto lg:mx-0"
            >
              Preserving Heritage • Empowering Society • Building the Future
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/membership"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-maroon font-semibold text-base hover:bg-cream transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Users size={18} />
                Become a Member
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/donation"
                className="group flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gold/60 text-gold font-semibold text-base hover:bg-gold/10 transition-all duration-300 hover:border-gold"
              >
                <Heart size={18} />
                Donate Now
              </Link>
              <Link
                href="/events"
                className="group flex items-center gap-2 px-6 py-4 rounded-full text-white/80 font-medium text-base hover:text-white transition-colors"
              >
                <Calendar size={18} />
                Upcoming Events
              </Link>
            </motion.div>
          </div>

          {/* Right: Decorative Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main glass card showcasing emblem */}
              <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-8 shadow-2xl text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative inline-block mb-6"
                >
                  <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse" />
                  <Image
                    src="/logo.png"
                    alt="Aanjana Jat Mahasabha Emblem"
                    width={240}
                    height={240}
                    className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-gold/50 shadow-2xl bg-white p-1"
                  />
                </motion.div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-2xl bg-white/5">
                    <p className="text-white font-bold text-lg">50,000+</p>
                    <p className="text-white/60 text-xs">Members</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5">
                    <p className="text-white font-bold text-lg">2,500+</p>
                    <p className="text-white/60 text-xs">Scholarships</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5">
                    <p className="text-white font-bold text-lg">180+</p>
                    <p className="text-white/60 text-xs">Events</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gold text-white text-sm font-semibold shadow-lg">
                ✨ Official Emblem
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
