"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        titleHi="संपर्क करें"
        subtitle="We'd love to hear from you. Reach out with questions, suggestions, or to learn more."
        breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-saffron/10 flex items-center justify-center">
                      <MapPin size={18} className="text-saffron" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Office Address</h4>
                      <p className="text-sm text-muted-foreground">Aanjana Bhawan, Gandhi Nagar,<br />Jaipur, Rajasthan - 302015</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-saffron/10 flex items-center justify-center">
                      <Mail size={18} className="text-saffron" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Email</h4>
                      <a href="mailto:info@aanjanajatmahasabha.org" className="text-sm text-muted-foreground hover:text-saffron transition-colors">info@aanjanajatmahasabha.org</a>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-saffron/10 flex items-center justify-center">
                      <Clock size={18} className="text-saffron" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Office Hours</h4>
                      <p className="text-sm text-muted-foreground">Mon - Sat: 10:00 AM - 6:00 PM<br />Sunday: Closed</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                <MessageSquare size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input type="text" required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                    <input type="tel" required placeholder="Enter your phone number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                  <select required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-saffron text-sm">
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Membership</option>
                    <option>Donation</option>
                    <option>Scholarship</option>
                    <option>Events</option>
                    <option>Complaint</option>
                    <option>Suggestion</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea required rows={5} placeholder="Write your message here..." className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-sm resize-none" />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-saffron to-maroon text-white font-medium hover:shadow-lg transition-all"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border h-80 bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-saffron/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Interactive Google Map</p>
              <p className="text-xs text-muted-foreground">Aanjana Bhawan, Gandhi Nagar, Jaipur</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
