"use client";

import { motion } from "framer-motion";
import { Store, Search, MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const categories = [
  "Agriculture & Farming", "Education & Coaching", "Healthcare & Medical",
  "Legal Services", "IT & Technology", "Manufacturing & Industries",
  "Retail & Shops", "Construction & Real Estate", "Transport & Logistics",
  "Food & Restaurants", "Handicrafts & Textiles", "Financial Services",
];

export default function BusinessDirectoryPage() {
  return (
    <>
      <PageHero
        title="Business Directory"
        titleHi="व्यापार निर्देशिका"
        subtitle="Support community businesses. Find and connect with Anjana Jat entrepreneurs."
        breadcrumbs={[{ label: "Business Directory", href: "/business-directory" }]}
      />

      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
              <Store size={36} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Our community business directory will connect you with trusted businesses run by community members.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {categories.map((cat, i) => (
                <div key={i} className="px-4 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground">
                  {cat}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input type="email" placeholder="Get notified when we launch" className="w-full max-w-sm px-5 py-3 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm" />
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
