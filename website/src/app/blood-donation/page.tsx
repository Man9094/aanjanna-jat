"use client";

import { motion } from "framer-motion";
import { Heart, Search, Mail, MapPin, Droplets, UserPlus } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emergencyContacts = [
  { name: "Blood Bank Helpline", email: "bloodbank@aanjanajatmahasabha.org", available: "24/7" },
  { name: "Emergency Coordinator", email: "emergency@aanjanajatmahasabha.org", available: "24/7" },
  { name: "Jaipur Chapter", email: "jaipur@aanjanajatmahasabha.org", available: "8 AM - 10 PM" },
  { name: "Ahmedabad Chapter", email: "ahmedabad@aanjanajatmahasabha.org", available: "8 AM - 10 PM" },
];

export default function BloodDonationPage() {
  return (
    <>
      <PageHero
        title="Blood Donation"
        titleHi="रक्तदान"
        subtitle="Be a hero — donate blood, save lives. Join our community donor network."
        breadcrumbs={[{ label: "Blood Donation", href: "/blood-donation" }]}
      />

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { label: "Total Donors", value: "3,500+" },
            { label: "Lives Saved", value: "8,000+" },
            { label: "Active Donors", value: "1,200+" },
            { label: "Cities Covered", value: "45+" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search & Register */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Search Blood */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-card border border-border p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Search size={22} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Find Blood</h3>
                <p className="text-sm text-muted-foreground">Search for available donors near you</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((bg) => (
                    <button key={bg} className="py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors">
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Enter city or pin code" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 text-sm" />
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                Search Donors
              </button>
            </div>
          </motion.div>

          {/* Register as Donor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-card border border-border p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UserPlus size={22} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Register as Donor</h3>
                <p className="text-sm text-muted-foreground">Join our community blood donor network</p>
              </div>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 text-sm" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 text-sm" />
              <select className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-green-500 text-sm">
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              <input type="text" placeholder="City / Location" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 text-sm" />
              <button className="w-full py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                Register Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Emergency Contacts" titleHi="आपातकालीन संपर्क" />
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, i) => (
              <motion.a
                key={i}
                href={`mailto:${contact.email}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-red-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Mail size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{contact.name}</p>
                  <p className="text-saffron font-medium text-sm">{contact.email}</p>
                  <p className="text-xs text-muted-foreground">{contact.available}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
