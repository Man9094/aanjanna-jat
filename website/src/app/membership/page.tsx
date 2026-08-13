"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Crown, Star, Users, CreditCard, QrCode, Download, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const membershipCategories = [
  {
    title: "General Member",
    titleHi: "सामान्य सदस्य",
    price: "₹500",
    period: "Lifetime",
    icon: Users,
    features: ["Digital Membership Card", "Community Events Access", "Newsletter Subscription", "Basic Directory Listing", "Voting Rights"],
    popular: false,
  },
  {
    title: "Premium Member",
    titleHi: "प्रीमियम सदस्य",
    price: "₹2,000",
    period: "Lifetime",
    icon: Star,
    features: ["Everything in General", "Priority Event Registration", "Matrimonial Access", "Business Directory Listing", "Scholarship Eligibility", "Medical Camp Priority", "QR Verified ID Card"],
    popular: true,
  },
  {
    title: "Patron Member",
    titleHi: "संरक्षक सदस्य",
    price: "₹10,000",
    period: "Lifetime",
    icon: Crown,
    features: ["Everything in Premium", "Recognition on Website", "Annual Report Mention", "VIP Event Access", "Direct Committee Access", "Community Honor Certificate", "Family Coverage"],
    popular: false,
  },
];

const benefits = [
  "Digital Membership Card with QR Code",
  "Access to all community events and conferences",
  "Scholarship and educational assistance eligibility",
  "Community matrimonial portal access",
  "Business directory listing",
  "Medical camp and health check-up priority",
  "Legal aid and counseling services",
  "Community newsletter and updates",
  "Voting rights in elections",
  "Emergency assistance network",
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        title="Membership"
        titleHi="सदस्यता"
        subtitle="Join the Aanjana Jat Mahasabha family and be part of our community's journey."
        breadcrumbs={[{ label: "Membership", href: "/membership" }]}
      />

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Member Benefits"
            titleHi="सदस्यता लाभ"
            subtitle="Enjoy exclusive benefits and services as a member of our community organization."
          />

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-2.5 p-3 rounded-xl"
              >
                <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Membership Plans"
            titleHi="सदस्यता योजनाएं"
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {membershipCategories.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative rounded-2xl p-6 ${
                  plan.popular
                    ? "bg-gradient-to-br from-saffron to-maroon text-white shadow-xl scale-105"
                    : "bg-card border border-border hover-lift"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <plan.icon size={36} className={plan.popular ? "text-gold mx-auto mb-3" : "text-saffron mx-auto mb-3"} />
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className={`text-xs font-devanagari ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.titleHi}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={15} className={`shrink-0 mt-0.5 ${plan.popular ? "text-gold" : "text-green-500"}`} />
                      <span className={plan.popular ? "text-white/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-medium text-sm transition-all ${
                    plan.popular
                      ? "bg-white text-maroon hover:bg-cream"
                      : "bg-gradient-to-r from-saffron to-maroon text-white hover:shadow-lg"
                  }`}
                >
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital ID Preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Digital Membership Card"
                titleHi="डिजिटल सदस्यता कार्ड"
                centered={false}
              />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard size={20} className="text-saffron shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Premium Design</h4>
                    <p className="text-sm text-muted-foreground">Beautifully designed digital card with your photo, name, and membership details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <QrCode size={20} className="text-saffron shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">QR Verification</h4>
                    <p className="text-sm text-muted-foreground">Unique QR code for instant membership verification at events.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download size={20} className="text-saffron shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Download & Print</h4>
                    <p className="text-sm text-muted-foreground">Download your certificate and membership card anytime from your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-gradient-to-br from-maroon to-saffron-dark p-8 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 cultural-pattern opacity-10" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Member ID</p>
                    <p className="text-lg font-mono font-bold">AJM-2026-0001</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold font-devanagari">
                    अ
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold">Shri Member Name</p>
                  <p className="text-white/70 text-sm">Premium Member • Since 2026</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/50">Aanjana Jat Mahasabha</p>
                    <p className="text-xs text-white/50">आंजना जाट महासभा</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                    <QrCode size={32} className="text-white/70" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
