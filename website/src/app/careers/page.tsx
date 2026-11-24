"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, Upload, Building } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    icon: Search,
    titleHi: "रोजगार अवसर खोज",
    titleGu: "રોજગાર શોધ",
    titleEn: "Job Opportunities",
    descHi: "सरकारी एवं निजी क्षेत्र के प्रमाणित रोजगार अवसरों की सूचना",
    descGu: "સરકારી અને ખાનગી ક્ષેત્રની રોજગાર તકોની માહિતી",
    descEn: "Browse verified job alerts and private sector opportunities"
  },
  {
    icon: Upload,
    titleHi: "बायोडाटा एवं कौशल प्रोफाइल",
    titleGu: "બાયોડેટા અને પ્રોફાઇલ",
    titleEn: "Talent Registry",
    descHi: "युवाओं द्वारा अपने शैक्षणिक व व्यावसायिक विवरण का पंजीकरण",
    descGu: "યુવાનો દ્વારા શૈક્ષણિક વિગતોની નોંધણી",
    descEn: "Register your professional profile for verified employers"
  },
  {
    icon: Building,
    titleHi: "नियोक्ता एवं व्यापारिक मंच",
    titleGu: "રોજગારદાતા મંચ",
    titleEn: "Employer Network",
    descHi: "समाज के व्यावसायिक प्रतिष्ठानों द्वारा योग्य युवाओं का चयन",
    descGu: "સમાજના વ્યવસાયિકો દ્વારા પ્રતિભાઓની પસંદગી",
    descEn: "Connect community business leaders with rising talent"
  },
];

export default function CareersPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "कैरियर एवं रोजगार मार्गदर्शन" : language === "gu" ? "કારકિર્દી અને રોજગાર માર્ગદર્શન" : "Careers & Employment Cell"}
        titleHi="आँजणा जाट महासभा युवा प्रकोष्ठ"
        subtitle={
          language === "hi"
            ? "समाज के युवाओं को रोजगार अवसरों, प्रतियोगी परीक्षाओं एवं कौशल विकास से जोड़ने का मंच।"
            : language === "gu"
            ? "સમાજના યુવાનોને રોજગારની તકો અને કૌશલ્ય વિકાસ સાથે જોડતું પ્લેટફોર્મ."
            : "Connecting community talent with the right career opportunities and skill guidance."
        }
        breadcrumbs={[
          { label: language === "hi" ? "रोजगार / कैरियर" : language === "gu" ? "કારકિર્દી" : "Careers", href: "/careers" }
        ]}
      />

      <section className="py-20 md:py-28 bg-[#FFF9EC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
              <Briefcase size={30} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#B52A12] mb-3 font-display">
              {language === "hi"
                ? "कैरियर पोर्टल — शीघ्र प्रारंभ"
                : language === "gu"
                ? "કારકિર્દી પોર્ટલ — ટૂંક સમયમાં"
                : "Career Portal — Launching Soon"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4E46] mb-10 max-w-xl mx-auto leading-relaxed">
              {language === "hi"
                ? "महासभा का अधिकृत रोजगार मार्गदर्शन पोर्टल तैयार किया जा रहा है। प्रशासनिक सेवाओं, निजी क्षेत्र और कौशल आधारित अवसरों की जानकारी शीघ्र यहाँ उपलब्ध होगी।"
                : language === "gu"
                ? "મહાસભાનું અધિકૃત રોજગાર માર્ગદર્શન પોર્ટલ ટૂંક સમયમાં ઉપલબ્ધ થશે. સ્પર્ધાત્મક પરીક્ષાઓ અને ખાનગી ક્ષેત્રની તકોની માહિતી અહીં મળશે."
                : "Our career portal will connect community job seekers with employers and competitive exam mentors. Register below to be notified."}
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
                placeholder={language === "hi" ? "सूचना पाने हेतु ईमेल दर्ज करें..." : language === "gu" ? "માહિતી માટે ઇમેઇલ દાખલ કરો..." : "Enter your email to get notified"}
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
