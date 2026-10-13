"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Users } from "lucide-react";

export default function LeaderSpotlight() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-saffron uppercase tracking-wider block mb-2 font-devanagari">
              Community Executive Members • समाज कार्यकारिणी
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-devanagari">
              प्रदेश कार्यकारिणी एवं पदाधिकारी
            </h2>
            <p className="text-sm text-muted-foreground font-devanagari">
              गुजरात, मध्यप्रदेश एवं राजस्थान राज्य के प्रमुख पदाधिकारी एवं कार्यकारिणी सदस्य
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-saffron to-maroon mx-auto rounded-full mt-4" />
          </div>

          {/* Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-card border border-border overflow-hidden shadow-lg hover-lift grid grid-cols-1 md:grid-cols-[280px_1fr]"
          >
            {/* Left: Image */}
            <div className="relative h-72 md:h-auto w-full bg-gradient-to-br from-saffron/20 to-maroon/20 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-saffron text-white flex items-center justify-center text-3xl font-bold font-devanagari shadow-xl mb-3">
                आ
              </div>
              <h4 className="font-bold text-foreground font-devanagari">आंजना जाट महासभा</h4>
              <p className="text-xs text-saffron font-bold mt-1">प्रदेश कार्यकारिणी संगठन</p>
            </div>

            {/* Right: Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">
                  Gujarat • MP • Rajasthan
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-2 font-devanagari">
                  राज्यस्तरीय संगठन एवं नेतृत्व
                </h3>
                <p className="text-muted-foreground text-sm font-devanagari leading-relaxed mt-2">
                  गुजरात, मध्यप्रदेश एवं राजस्थान राज्यों की कार्यकारिणी संस्थागत विकास और समाज सेवा हेतु प्रतिबद्ध है। पदाधिकारियों की सूची महासभा कार्यालय द्वारा सत्यापित विवरण उपलब्ध कराए जाने पर प्रकाशित की जाएगी।
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/community-members"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-saffron to-maroon text-white font-bold text-sm hover:shadow-lg transition-all group"
                >
                  सभी कार्यकारिणी सदस्य देखें (View All Members)
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
