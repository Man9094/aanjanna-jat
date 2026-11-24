"use client";

import { motion } from "framer-motion";
import { Store } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { hi: "कृषि एवं संबद्ध उद्यम", gu: "કૃષિ અને સંલગ્ન વ્યવસાય", en: "Agriculture & Farming" },
  { hi: "शिक्षा एवं कोचिंग संस्थान", gu: "શિક્ષણ અને કોચિંગ સંસ્થાઓ", en: "Education & Coaching" },
  { hi: "चिकित्सा एवं स्वास्थ्य सेवा", gu: "તબીબી અને આરોગ્ય સેવાઓ", en: "Healthcare & Medical" },
  { hi: "विधिक एवं कानूनी परामर्श", gu: "કાનૂની સલાહ અને સેવાઓ", en: "Legal Services" },
  { hi: "सूचना प्रौद्योगिकी (IT)", gu: "ઇન્ફોર્મેશન ટેકનોલોજી (IT)", en: "IT & Technology" },
  { hi: "विनिर्माण एवं उद्योग", gu: "ઉદ્યોગ અને ઉત્પાદન", en: "Manufacturing & Industries" },
  { hi: "खुदरा व्यापार एवं वाणिज्य", gu: "વેપાર અને વાણિજ્ય", en: "Retail & Commerce" },
  { hi: "निर्माण एवं रियल एस्टेट", gu: "બાંધકામ અને રિયલ એસ્ટેટ", en: "Construction & Real Estate" },
  { hi: "परिवहन एवं लॉजिस्टिक्स", gu: "ટ્રાન્સપોર્ટ અને લોજિસ્ટિક્સ", en: "Transport & Logistics" },
  { hi: "हस्तशिल्प एवं वस्त्रोद्योग", gu: "હસ્તકલા અને કાપડ ઉદ્યોગ", en: "Handicrafts & Textiles" },
  { hi: "वित्तीय सेवाएं एवं परामर्श", gu: "નાણાકીય સેવાઓ", en: "Financial Services" },
  { hi: "खाद्य एवं कृषि प्रसंस्करण", gu: "ફૂડ અને એગ્રો પ્રોસેસિંગ", en: "Food & Agro Processing" },
];

export default function BusinessDirectoryPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "समाज व्यापार एवं व्यवसाय निर्देशिका" : language === "gu" ? "સમાજ વેપાર અને વ્યવસાય નિર્દેશિકા" : "Business Directory"}
        titleHi="आँजणा जाट महासभा व्यावसायिक मंच"
        subtitle={
          language === "hi"
            ? "समाज के उद्यमियों, व्यापारियों एवं पेशेवरों को परस्पर जोड़ने एवं व्यापारिक सहयोग का मंच।"
            : language === "gu"
            ? "સમાજના ઉદ્યોગસાહસિકો અને વેપારીઓને જોડતું અધિકૃત મંચ."
            : "Support community businesses. Find and connect with Anjana Jat entrepreneurs across India."
        }
        breadcrumbs={[
          { label: language === "hi" ? "व्यापार निर्देशिका" : language === "gu" ? "વેપાર ડિરેક્ટરી" : "Business Directory", href: "/business-directory" }
        ]}
      />

      <section className="py-20 md:py-28 bg-[#FFF9EC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
              <Store size={30} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#B52A12] mb-3 font-display">
              {language === "hi"
                ? "व्यापार निर्देशिका — शीघ्र प्रारंभ"
                : language === "gu"
                ? "વેપાર ડિરેક્ટરી — ટૂંક સમયમાં"
                : "Business Directory — Launching Soon"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4E46] mb-10 max-w-xl mx-auto leading-relaxed">
              {language === "hi"
                ? "महासभा द्वारा समाज के उद्यमियों एवं पेशेवरों की प्रामाणिक सूची तैयार की जा रही है। शीघ्र ही सभी क्षेत्रों के व्यवसायों का विवरण यहाँ उपलब्ध होगा।"
                : language === "gu"
                ? "મહાસભા દ્વારા સમાજના વેપારીઓ અને પ્રોફેશનલ્સની અધિકૃત યાદી તૈયાર થઈ રહી છે. ટૂંક સમયમાં વિગતો ઉપલબ્ધ થશે."
                : "Our verified directory linking community entrepreneurs and service providers is under preparation. Register below for early notification."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {categories.map((cat, i) => {
                const label = language === "hi" ? cat.hi : language === "gu" ? cat.gu : cat.en;
                return (
                  <div key={i} className="px-3.5 py-2.5 rounded-xl bg-white border border-[#D9A52B]/35 text-xs font-semibold text-[#29211D] shadow-2xs">
                    {label}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === "hi" ? "सूचना पाने हेतु ईमेल दर्ज करें..." : language === "gu" ? "માહિતી માટે ઇમેઇલ દાખલ કરો..." : "Get notified when we launch"}
                className="w-full px-5 py-2.5 rounded-full bg-white border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
              />
              <button className="px-6 py-2.5 rounded-full bg-[#B52A12] text-white font-bold text-xs sm:text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all shrink-0 cursor-pointer">
                {language === "hi" ? "सूचित करें" : language === "gu" ? "જાણ કરો" : "Notify Me"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
