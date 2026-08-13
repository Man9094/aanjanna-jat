"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import LeaderCard from "@/components/shared/LeaderCard";
import { leaders } from "@/data/leaders";

const tabs = [
  { key: "national", label: "National Committee", labelHi: "राष्ट्रीय समिति" },
  { key: "youth", label: "Youth Wing", labelHi: "युवा प्रकोष्ठ" },
  { key: "women", label: "Women Wing", labelHi: "महिला प्रकोष्ठ" },
  { key: "district", label: "State Representatives", labelHi: "राज्य प्रतिनिधि" },
];

export default function LeadershipPage() {
  const [activeTab, setActiveTab] = useState("national");
  const president = leaders.find((l) => l.designation === "National President");
  const filtered = leaders.filter((l) => l.category === activeTab);

  return (
    <>
      <PageHero
        title="Our Leadership"
        titleHi="हमारा नेतृत्व"
        subtitle="Meet the dedicated leaders guiding our community towards a brighter future."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Leadership", href: "/leadership" }]}
      />

      {/* President Spotlight */}
      {president && (
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <LeaderCard leader={president} index={0} spotlight />
          </div>
        </section>
      )}

      {/* Committee Tabs */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Committee Members"
            titleHi="समिति सदस्य"
          />

          {/* Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-saffron hover:border-saffron/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.map((leader, index) => (
              <LeaderCard key={leader.id} leader={leader} index={index} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Committee members will be updated soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
