"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "संपर्क करें" : language === "gu" ? "સંપર્ક કરો" : "Contact Us"}
        titleHi="आँजणा जाट महासभा केंद्रीय कार्यालय"
        subtitle={
          language === "hi"
            ? "महासभा से संबंधित किसी भी पूछताछ, सुझाव अथवा सहयोग हेतु संपर्क करें।"
            : language === "gu"
            ? "મહાસભા સંબંધિત કોઈપણ પૂછપરછ, સૂચન અથવા સહયોગ માટે સંપર્ક કરો."
            : "We'd love to hear from you. Reach out with questions, suggestions, or to learn more."
        }
        breadcrumbs={[{ label: language === "hi" ? "संपर्क" : language === "gu" ? "સંપર્ક" : "Contact Us", href: "/contact" }]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#29211D] mb-6 font-display">
                  {language === "hi" ? "संपर्क सूत्र" : language === "gu" ? "સંપર્ક વિગત" : "Get in Touch"}
                </h3>
                <div className="space-y-5">
                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#29211D]">
                        {language === "hi" ? "कार्यालय पता" : language === "gu" ? "કાર્યાલય સરનામું" : "Office Address"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5C4E46] mt-0.5">{t("officeAddress")}</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#29211D]">
                        {language === "hi" ? "ईमेल" : language === "gu" ? "ઇમેઇલ" : "Email"}
                      </h4>
                      <a href={`mailto:${t("officialEmail")}`} className="text-xs sm:text-sm text-[#5C4E46] hover:text-[#B52A12] transition-colors font-medium">
                        {t("officialEmail")}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#29211D]">
                        {language === "hi" ? "हेल्पलाइन नंबर" : language === "gu" ? "હેલ્પલાઇન નંબર" : "Phone Helpline"}
                      </h4>
                      <a href="tel:+918788594494" className="text-xs sm:text-sm text-[#5C4E46] hover:text-[#B52A12] transition-colors font-medium">
                        {t("officialPhone")}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#29211D]">
                        {language === "hi" ? "कार्यालय समय" : language === "gu" ? "કાર્યાલય સમય" : "Office Hours"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5C4E46] mt-0.5">
                        {language === "hi"
                          ? "सोम - शनि: प्रातः 10:00 से सायं 06:00 तक | रविवार: अवकाश"
                          : language === "gu"
                          ? "સોમ - શનિ: સવારે ૧૦:૦૦ થી સાંજે ૦૬:૦૦ | રવિવાર: રજા"
                          : "Mon - Sat: 10:00 AM - 6:00 PM | Sunday: Closed"}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-2xl bg-white border border-[#D9A52B]/40 p-6 md:p-8 shadow-xs"
            >
              <h3 className="text-xl font-bold text-[#B52A12] mb-6 font-display">
                {language === "hi" ? "संदेश भेजें" : language === "gu" ? "સંદેશ મોકલો" : "Send us a Message"}
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                      {language === "hi" ? "पूरा नाम *" : language === "gu" ? "પૂરું નામ *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === "hi" ? "सदस्य का नाम" : language === "gu" ? "સભ્યનું નામ" : "Your full name"}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                      {language === "hi" ? "मोबाइल नंबर *" : language === "gu" ? "મોબાઇલ નંબર *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                    {language === "hi" ? "ईमेल पता" : language === "gu" ? "ઇમેઇલ એડ્રેસ" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                    {language === "hi" ? "विषय *" : language === "gu" ? "વિષય *" : "Subject *"}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                  >
                    <option value="">{language === "hi" ? "विषय चुनें" : language === "gu" ? "વિષય પસંદ કરો" : "Select a subject"}</option>
                    <option>{language === "hi" ? "सामान्य जानकारी" : language === "gu" ? "સામાન્ય પૂછપરછ" : "General Inquiry"}</option>
                    <option>{language === "hi" ? "सदस्यता पहचान पत्र" : language === "gu" ? "સભ્યપદ ઓળખપત્ર" : "Membership Badge"}</option>
                    <option>{language === "hi" ? "सहयोग / दान" : language === "gu" ? "દાન / સહયોગ" : "Donation"}</option>
                    <option>{language === "hi" ? "गाँव / गोत्र निर्देशिका" : language === "gu" ? "ગામ / ગોત્ર નિર્દેશિકા" : "Village & Gotra Directory"}</option>
                    <option>{language === "hi" ? "सुझाव अथवा विचार" : language === "gu" ? "સૂચન અથવા વિચાર" : "Suggestion"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                    {language === "hi" ? "संदेश *" : language === "gu" ? "સંદેશ *" : "Message *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={language === "hi" ? "अपना संदेश यहाँ लिखें..." : language === "gu" ? "તમારો સંદેશ અહીં લખો..." : "Write your message here..."}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#B52A12] text-white font-bold text-xs sm:text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all cursor-pointer"
                >
                  <Send size={15} />
                  {language === "hi" ? "संदेश भेजें" : language === "gu" ? "સંદેશ મોકલો" : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
