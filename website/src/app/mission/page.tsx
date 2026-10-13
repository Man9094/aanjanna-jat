"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { keyObjectives } from "@/components/home/MissionSection";
import { CheckCircle2, Target, HeartHandshake, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export default function MissionPage() {
  return (
    <>
      <PageHero
        title="Explore Our Mission & Objectives"
        titleHi="आंजना जाट महासभा के प्रमुख उद्देश्य"
        subtitle="Our core roadmap, values, and commitments dedicated to the empowerment and unity of the Anjana Jat community."
        breadcrumbs={[{ label: "Explore Mission", href: "/mission" }]}
      />

      {/* Main Objectives List Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Key Objectives / प्रमुख उद्देश्य"
            titleHi="आंजना जाट महासभा के 8 प्रमुख उद्देश्य"
            subtitle="Explore the fundamental goals driving all community welfare, historical research, and youth empowerment initiatives."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {keyObjectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-saffron/40 hover:shadow-lg transition-all flex items-start gap-5"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-saffron to-maroon text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {obj.id}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron uppercase">
                        Objective {obj.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-devanagari">
                      {obj.titleHi}
                    </h3>
                    <p className="text-sm font-semibold text-saffron">
                      {obj.titleEn}
                    </p>
                    <p className="text-sm text-foreground font-devanagari leading-relaxed">
                      {obj.descHi}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      {obj.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizational Contact / Support Banner */}
      <section className="py-14 bg-gradient-to-r from-maroon via-saffron-dark to-maroon text-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-devanagari">
            इन उद्देश्यों को सफल बनाने हेतु महासभा से जुड़ें
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            Join hands with Anjana Jat Mahasabha to support education, farmer rights, historical research, and social harmony.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gold" />
              <span>anjanakhapofficial@gmail.com</span>
            </div>
            <a href="https://wa.me/918788594494" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone size={18} className="text-gold" />
              <span>+91 8788594494 (WhatsApp)</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gold" />
              <span>Coming Soon / शीघ्र ही उपलब्ध</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
