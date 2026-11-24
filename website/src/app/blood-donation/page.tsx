"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Mail, MapPin, Droplets, UserPlus } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emergencyContacts = [
  { nameHi: "रक्तदान हेल्पलाइन", nameGu: "રક્તદાન હેલ્પલાઇન", nameEn: "Blood Bank Helpline", email: "bloodbank@aanjanajatmahasabha.org", available: "24/7" },
  { nameHi: "आपातकालीन समन्वयक", nameGu: "ઇમરજન્સી સંયોજક", nameEn: "Emergency Coordinator", email: "emergency@aanjanajatmahasabha.org", available: "24/7" },
  { nameHi: "जयपुर संभाग केंद्र", nameGu: "જયપુર કેન્દ્ર", nameEn: "Jaipur Chapter", email: "jaipur@aanjanajatmahasabha.org", available: "8 AM - 10 PM" },
  { nameHi: "अहमदाबाद संभाग केंद्र", nameGu: "અમદાવાદ કેન્દ્ર", nameEn: "Ahmedabad Chapter", email: "ahmedabad@aanjanajatmahasabha.org", available: "8 AM - 10 PM" },
];

export default function BloodDonationPage() {
  const { language } = useLanguage();
  const [selectedBg, setSelectedBg] = useState<string>("B+");

  return (
    <>
      <PageHero
        title={language === "hi" ? "रक्तदान सेवा नेटवर्क" : language === "gu" ? "રક્તદાન સેવા નેટવર્ક" : "Blood Donation Network"}
        titleHi="आँजणा जाट महासभा रक्तदान पहल"
        subtitle={
          language === "hi"
            ? "रक्तदान महादान — जीवन रक्षा के पावन संकल्प के साथ समाज के रक्तदाता नेटवर्क से जुड़ें।"
            : language === "gu"
            ? "રક્તદાન મહાદાન — જીવન રક્ષાના સંકલ્પ સાથે સમાજના રક્તદાતા નેટવર્ક સાથે જોડાવો."
            : "Be a hero — donate blood, save lives. Join our community donor network."
        }
        breadcrumbs={[{ label: language === "hi" ? "रक्तदान" : language === "gu" ? "રક્તદાન" : "Blood Donation", href: "/blood-donation" }]}
      />

      {/* Stats */}
      <section className="py-12 bg-[#B52A12] border-b-2 border-[#D9A52B]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            {
              label: language === "hi" ? "पंजीकृत रक्तदाता" : language === "gu" ? "નોંધાયેલ રક્તદાતાઓ" : "Total Donors",
              value: "3,500+"
            },
            {
              label: language === "hi" ? "सहयोग प्राप्त परिवार" : language === "gu" ? "સહાયિત પરિવારો" : "Lives Supported",
              value: "8,000+"
            },
            {
              label: language === "hi" ? "सक्रिय डोनर्स" : language === "gu" ? "સક્રિય દાતાઓ" : "Active Donors",
              value: "1,200+"
            },
            {
              label: language === "hi" ? "आच्छादित जिले" : language === "gu" ? "કવર કરેલા જિલ્લાઓ" : "Districts Covered",
              value: "45+"
            },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-extrabold text-[#D9A52B]">{stat.value}</p>
              <p className="text-white/85 text-xs sm:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search & Register */}
      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Search Blood */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white border border-[#D9A52B]/40 p-6 md:p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                <Search size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#29211D] font-display">
                  {language === "hi" ? "रक्तदाता खोजें" : language === "gu" ? "રક્તદાતા શોધો" : "Find Blood Donors"}
                </h3>
                <p className="text-xs text-[#5C4E46]">
                  {language === "hi" ? "निकटतम उपलब्ध रक्तदाता की खोज करें" : language === "gu" ? "નજીકના ઉપલબ્ધ રક્તદાતાની શોધ કરો" : "Search available donors in your region"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                  {language === "hi" ? "ब्लड ग्रुप चुनें" : language === "gu" ? "બ્લડ ગ્રુપ પસંદ કરો" : "Select Blood Group"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setSelectedBg(bg)}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selectedBg === bg
                          ? "bg-[#B52A12] text-white border border-[#D9A52B]"
                          : "bg-[#FAF2E0] text-[#29211D] border border-[#D9A52B]/30 hover:border-[#B52A12]"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#29211D] mb-1.5">
                  {language === "hi" ? "शहर अथवा जिला दर्ज करें" : language === "gu" ? "શહેર અથવા જિલ્લો દાખલ કરો" : "Location / City"}
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C4E46]" />
                  <input
                    type="text"
                    placeholder={language === "hi" ? "शहर या पिन कोड..." : language === "gu" ? "શહેર અથવા પિન કોડ..." : "Enter city or pin code"}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                  />
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-[#B52A12] text-white font-bold text-xs sm:text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all cursor-pointer">
                {language === "hi" ? "रक्तदाता खोजें" : language === "gu" ? "રક્તદાતા શોધો" : "Search Donors"}
              </button>
            </div>
          </motion.div>

          {/* Register as Donor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white border border-[#D9A52B]/40 p-6 md:p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                <UserPlus size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#29211D] font-display">
                  {language === "hi" ? "रक्तदाता के रूप में पंजीकरण" : language === "gu" ? "રક્તદાતા તરીકે નોંધણી" : "Register as Donor"}
                </h3>
                <p className="text-xs text-[#5C4E46]">
                  {language === "hi" ? "समाज के आपातकालीन सेवा नेटवर्क से जुड़ें" : language === "gu" ? "સમાજના રક્તદાતા નેટવર્ક સાથે જોડાવો" : "Join our community emergency donor registry"}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <input
                type="text"
                placeholder={language === "hi" ? "पूरा नाम" : language === "gu" ? "પૂરું નામ" : "Full Name"}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
              />
              <input
                type="tel"
                placeholder={language === "hi" ? "मोबाइल नंबर" : language === "gu" ? "મોબાઇલ નંબર" : "Phone Number"}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
              />
              <select className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm">
                <option value="">{language === "hi" ? "ब्लड ग्रुप चुनें" : language === "gu" ? "બ્લડ ગ્રુપ પસંદ કરો" : "Select Blood Group"}</option>
                {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              <input
                type="text"
                placeholder={language === "hi" ? "ग्राम / शहर / जिला" : language === "gu" ? "ગામ / શહેર / જિલ્લો" : "Village / City / District"}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
              />
              <button className="w-full py-3 rounded-full bg-[#B52A12] text-white font-bold text-xs sm:text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all cursor-pointer">
                {language === "hi" ? "रक्तदाता बनें" : language === "gu" ? "રક્તદાતા બનો" : "Register as Donor"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 md:py-24 bg-[#FAF2E0]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "आपातकालीन संपर्क सूत्र" : language === "gu" ? "આપાતકાલીન સંપર્ક" : "Emergency Helpline"}
            titleHi="24x7 सेवा उपलब्ध"
          />
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {emergencyContacts.map((contact, i) => {
              const name = language === "hi" ? contact.nameHi : language === "gu" ? contact.nameGu : contact.nameEn;
              return (
                <motion.a
                  key={i}
                  href={`mailto:${contact.email}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#D9A52B]/40 shadow-xs hover:border-[#B52A12] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#29211D] text-xs sm:text-sm">{name}</p>
                    <p className="text-[#B52A12] font-semibold text-xs">{contact.email}</p>
                    <p className="text-[11px] text-[#5C4E46] mt-0.5">{contact.available}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
