"use client";

import { motion } from "framer-motion";
import { GraduationCap, FileText, CheckCircle, Clock, Award, BookOpen } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const scholarships = [
  { title: "Merit Scholarship (Class 10)", amount: "₹5,000", eligibility: "80%+ marks in Class 10 Board Exam", deadline: "Sept 30, 2026" },
  { title: "Merit Scholarship (Class 12)", amount: "₹10,000", eligibility: "75%+ marks in Class 12 Board Exam", deadline: "Sept 30, 2026" },
  { title: "Graduate Scholarship", amount: "₹15,000", eligibility: "Enrolled in recognized university, 70%+ in previous year", deadline: "Oct 15, 2026" },
  { title: "Professional Course Scholarship", amount: "₹25,000", eligibility: "Engineering, Medical, Law, CA students with 65%+", deadline: "Oct 15, 2026" },
  { title: "Research Scholarship", amount: "₹50,000", eligibility: "Ph.D. scholars from the community", deadline: "Nov 1, 2026" },
  { title: "Girls Education Scholarship", amount: "₹10,000", eligibility: "Girl students pursuing higher education", deadline: "Oct 31, 2026" },
];

const steps = [
  { icon: FileText, title: "Register Online", description: "Create your account and fill in the application form" },
  { icon: BookOpen, title: "Upload Documents", description: "Upload marksheets, certificates, and ID proof" },
  { icon: Clock, title: "Application Review", description: "Committee reviews your application within 30 days" },
  { icon: Award, title: "Selection & Disbursement", description: "Selected students receive funds directly in their accounts" },
];

export default function ScholarshipPage() {
  return (
    <>
      <PageHero
        title="Scholarship Portal"
        titleHi="छात्रवृत्ति पोर्टल"
        subtitle="Investing in education, investing in the future. Apply for community scholarships."
        breadcrumbs={[{ label: "Scholarship Portal", href: "/scholarship" }]}
      />

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading title="How It Works" titleHi="प्रक्रिया" />
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-saffron/15 to-maroon/15 flex items-center justify-center relative">
                  <step.icon size={24} className="text-saffron" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-saffron text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[calc(100%-30px)] h-0.5 bg-gradient-to-r from-saffron/20 to-saffron/5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships List */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Available Scholarships" titleHi="उपलब्ध छात्रवृत्तियां" subtitle="Current scholarship programs open for applications." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((sch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center">
                    <GraduationCap size={18} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{sch.title}</h3>
                    <p className="text-lg font-bold text-saffron">{sch.amount}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{sch.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-saffron shrink-0" />
                    <span className="text-muted-foreground">Deadline: {sch.deadline}</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-full bg-gradient-to-r from-saffron to-maroon text-white text-sm font-medium hover:shadow-lg transition-all">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
