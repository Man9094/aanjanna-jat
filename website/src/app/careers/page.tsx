"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, Upload, Building } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const features = [
  { icon: Search, title: "Job Search", description: "Browse community job listings and government job alerts" },
  { icon: Upload, title: "Resume Upload", description: "Upload your resume for employer visibility" },
  { icon: Building, title: "Employer Access", description: "Post jobs and find talent from the community" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Career Portal"
        titleHi="करियर पोर्टल"
        subtitle="Connecting community talent with the right opportunities."
        breadcrumbs={[{ label: "Career Portal", href: "/careers" }]}
      />

      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <Briefcase size={36} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Our career portal will connect community job seekers with employers. Register your interest to be the first to know.
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
