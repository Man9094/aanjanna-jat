"use client";

import { motion } from "framer-motion";
import { Heart, Search, Shield, Bell } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    icon: Heart,
    titleHi: "केवल समाज के लिए",
    titleGu: "માત્ર સમાજ માટે",
    titleEn: "Community-Exclusive",
    descHi: "केवल सत्यापित आँजणा जाट समाज बंधुओं हेतु समर्पित मंच",
    descGu: "માત્ર પ્રમાણિત આંજણા જાટ પરિવારો માટે",
    descEn: "Exclusively for verified Anjana community families"
  },
  {
    icon: Search,
    titleHi: "सुगम वैवाहिक खोज",
    titleGu: "સરળ વૈવાહિક શોધ",
    titleEn: "Advanced Matchmaking",
    descHi: "गोत्र, शिक्षा, व्यवसाय एवं क्षेत्र अनुसार परिचयन",
    descGu: "ગોત્ર, શિક્ષણ, વ્યવસાય અને પ્રદેશ અનુસાર",
    descEn: "Search by Gotra, education, profession, and location"
  },
  {
    icon: Shield,
    titleHi: "मर्यादा एवं गोपनीयता",
    titleGu: "મર્યાદા અને ગોપનીયતા",
    titleEn: "Privacy & Traditional Trust",
    descHi: "सामाजिक मर्यादाओं एवं पूर्ण पारिवारिक गोपनीयता का पालन",
    descGu: "સામાજિક મર્યાદા અને સંપૂર્ણ કૌટુંબિક ગોપનીયતા",
    descEn: "Strict privacy standards respecting traditional values"
  },
];

export default function MatrimonialPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "वैवाहिक मंच एवं परामर्श" : language === "gu" ? "વૈવાહિક મંચ અને પરામર્શ" : "Community Matrimonial"}
        titleHi="आँजणा जाट महासभा पारिवारिक समन्वय"
        subtitle={
          language === "hi"
            ? "सत्यापित परिचयन, दहेज-मुक्त सामूहिक विवाह प्रोत्साहन एवं परिवारों के बीच विश्वासपूर्ण समन्वय।"
            : language === "gu"
            ? "પ્રમાણિત પરિચય અને દહેજ-મુક્ત સમૂહ લગ્ન પ્રોત્સાહન માટે સમર્પિત મંચ."
            : "Community-exclusive matrimonial service for trusted matchmaking and family counseling."
        }
        breadcrumbs={[
          { label: language === "hi" ? "वैवाहिक मंच" : language === "gu" ? "વૈવાહિક" : "Matrimonial", href: "/matrimonial" }
        ]}
      />

      <section className="py-20 md:py-28 bg-[#FFF9EC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
              <Heart size={30} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#B52A12] mb-3 font-display">
              {language === "hi"
                ? "डिजिटल वैवाहिक मंच — शीघ्र प्रारंभ"
                : language === "gu"
                ? "ડિજિટલ વૈવાહિક મંચ — ટૂંક સમયમાં"
                : "Digital Matrimonial Portal — Launching Soon"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4E46] mb-10 max-w-xl mx-auto leading-relaxed">
              {language === "hi"
                ? "महासभा का अधिकृत वैवाहिक पोर्टल वर्तमान में निर्माण प्रक्रिया में है। समाज बंधुओं की सुविधा हेतु पूर्ण गोपनीयता एवं प्रामाणिकता के साथ यह सेवा शीघ्र उपलब्ध होगी।"
                : language === "gu"
                ? "મહાસભાનું અધિકૃત વૈવાહિક પોર્ટલ ટૂંક સમયમાં ઉપલબ્ધ થશે. સંપૂર્ણ ગોપનીયતા અને પ્રમાણિકતા સાથે આ સેવા શરૂ કરવામાં આવશે."
                : "Our verified community matrimonial registry is under active development. Register your email to receive official launch notifications."}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
              {features.map((f, i) => {
                const title = language === "hi" ? f.titleHi : language === "gu" ? f.titleGu : f.titleEn;
                const desc = language === "hi" ? f.descHi : language === "gu" ? f.descGu : f.descEn;

                return (
                  <div key={i} className="rounded-2xl bg-white border border-[#D9A52B]/35 p-5 shadow-xs">
                    <f.icon size={22} className="text-[#B52A12] mx-auto mb-3" />
                    <h3 className="font-bold text-[#29211D] text-xs sm:text-sm mb-1 font-display">{title}</h3>
                    <p className="text-[11px] text-[#5C4E46] leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === "hi" ? "सूचना पाने हेतु ईमेल दर्ज करें..." : language === "gu" ? "માહિતી માટે ઇમેઇલ દાખલ કરો..." : "Enter your email for notification"}
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
