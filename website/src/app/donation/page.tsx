"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, GraduationCap, Stethoscope, Building, BookOpen, Shield, CheckCircle, CreditCard, Smartphone, Building2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const donationCategories = [
  { icon: GraduationCap, title: "Education Fund", description: "Support scholarships and educational programs", suggested: [500, 1000, 2500, 5000] },
  { icon: Stethoscope, title: "Medical Aid", description: "Help with medical camps and patient assistance", suggested: [1000, 2500, 5000, 10000] },
  { icon: Building, title: "Community Development", description: "Infrastructure and community center projects", suggested: [2500, 5000, 10000, 25000] },
  { icon: BookOpen, title: "Temple Projects", description: "Temple renovation and religious activities", suggested: [1100, 2100, 5100, 11000] },
  { icon: Heart, title: "Scholarship Fund", description: "Direct scholarship support for students", suggested: [1000, 2500, 5000, 10000] },
  { icon: Shield, title: "Emergency Relief", description: "Disaster relief and emergency assistance", suggested: [500, 1000, 5000, 10000] },
];

export default function DonationPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <>
      <PageHero
        title="Donate"
        titleHi="दान करें"
        subtitle="Your generous contribution helps build a stronger community. Every rupee makes a difference."
        breadcrumbs={[{ label: "Donation", href: "/donation" }]}
      />

      {/* Donation Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Categories */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-lg font-bold text-foreground mb-4">Select Category</h3>
              {donationCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedCategory(i); setSelectedAmount(null); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    selectedCategory === i
                      ? "bg-gradient-to-r from-saffron/10 to-maroon/10 border-2 border-saffron/40"
                      : "bg-card border border-border hover:border-saffron/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedCategory === i ? "bg-saffron/20" : "bg-muted"}`}>
                    <cat.icon size={18} className={selectedCategory === i ? "text-saffron" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${selectedCategory === i ? "text-saffron" : "text-foreground"}`}>
                      {cat.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Amount & Payment */}
            <div className="lg:col-span-3">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-card border border-border p-6 md:p-8"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {donationCategories[selectedCategory].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {donationCategories[selectedCategory].description}
                </p>

                {/* Amount Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {donationCategories[selectedCategory].suggested.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-3 rounded-xl font-medium text-sm transition-all ${
                        selectedAmount === amount
                          ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-saffron/10"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    placeholder="Enter custom amount (₹)"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm"
                  />
                </div>

                {/* Payment Methods */}
                <h4 className="text-sm font-semibold text-foreground mb-3">Payment Methods</h4>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border hover:border-saffron/30 cursor-pointer transition-colors">
                    <Smartphone size={22} className="text-saffron" />
                    <span className="text-xs font-medium text-foreground">UPI</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border hover:border-saffron/30 cursor-pointer transition-colors">
                    <CreditCard size={22} className="text-saffron" />
                    <span className="text-xs font-medium text-foreground">Card</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border hover:border-saffron/30 cursor-pointer transition-colors">
                    <Building2 size={22} className="text-saffron" />
                    <span className="text-xs font-medium text-foreground">Bank</span>
                  </div>
                </div>

                <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-saffron to-maroon text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  Donate ₹{(selectedAmount || Number(customAmount) || 0).toLocaleString()}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Donations are eligible for tax benefits under Section 80G. A receipt will be emailed to you.
                </p>
              </motion.div>

              {/* Bank Details */}
              <div className="mt-6 rounded-2xl bg-card border border-border p-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Bank Transfer Details</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Bank Name</span>
                  <span className="text-foreground font-medium">State Bank of India</span>
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="text-foreground font-medium">Anjana Jat Mahasabha</span>
                  <span className="text-muted-foreground">Account No.</span>
                  <span className="text-foreground font-medium">XXXX XXXX XXXX 1234</span>
                  <span className="text-muted-foreground">IFSC Code</span>
                  <span className="text-foreground font-medium">SBIN00XXXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
