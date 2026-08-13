"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Search, Shield, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const features = [
  { icon: Heart, title: "Community-Only", description: "Exclusively for verified Aanjana Jat community members" },
  { icon: Search, title: "Advanced Search", description: "Search by education, profession, location, and preferences" },
  { icon: Shield, title: "Privacy & Safety", description: "Strict privacy controls and verified profiles only" },
];

export default function MatrimonialPage() {
  return (
    <>
      <PageHero
        title="Matrimonial"
        titleHi="वैवाहिक"
        subtitle="Community-exclusive matrimonial service for trusted matchmaking."
        breadcrumbs={[{ label: "Matrimonial", href: "/matrimonial" }]}
      />

      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-red-500/10 flex items-center justify-center">
              <Heart size={36} className="text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Our community matrimonial portal is under development. Register your interest to be notified when it launches.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {features.map((f, i) => (
                <div key={i} className="rounded-2xl bg-card border border-border p-5 text-center">
                  <f.icon size={24} className="text-saffron mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input type="email" placeholder="Enter your email to get notified" className="w-full max-w-sm px-5 py-3 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm" />
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-saffron to-maroon text-white font-medium text-sm hover:shadow-lg transition-all">
                Notify Me
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
