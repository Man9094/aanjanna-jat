"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, GraduationCap, Stethoscope, Building, BookOpen, Shield, CreditCard, Smartphone, Building2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

const donationCategories = [
  {
    icon: GraduationCap,
    titleEn: "Education & Scholarships",
    titleHi: "शिक्षा एवं छात्रवृत्ति कोष",
    titleGu: "શિક્ષણ અને શિષ્યવૃત્તિ ભંડોળ",
    descEn: "Support scholarships and coaching for underprivileged students",
    descHi: "मेधावी एवं जरूरतमंद विद्यार्थियों की शिक्षा एवं प्रतियोगी परीक्षाओं हेतु सहायता।",
    descGu: "તેજસ્વી અને જરૂરિયાતમંદ વિદ્યાર્થીઓના શિક્ષણ માટે સહાય.",
    suggested: [500, 1000, 2500, 5000]
  },
  {
    icon: Stethoscope,
    titleEn: "Medical Aid & Healthcare",
    titleHi: "चिकित्सा एवं स्वास्थ्य सेवा",
    titleGu: "તબીબી સહાય અને આરોગ્ય",
    descEn: "Help with rural medical camps and patient emergency assistance",
    descHi: "ग्रामीण स्वास्थ्य शिविरों एवं गंभीर बीमारी पीड़ित परिवारों को सहायता।",
    descGu: "ગ્રામીણ આરોગ્ય શિબિરો અને દર્દીઓની સહાય.",
    suggested: [1000, 2500, 5000, 10000]
  },
  {
    icon: Building,
    titleEn: "Community Development",
    titleHi: "सामाजिक विकास एवं भवन निर्माण",
    titleGu: "સામાજિક વિકાસ અને ભવન નિર્માણ",
    descEn: "Community centers, student hostels, and rural infrastructure",
    descHi: "छात्रावासों, समाज भवनों एवं सामुदायिक परिसंपत्तियों का विकास।",
    descGu: "છાત્રાલયો અને સમાજ ભવનોનું નિર્માણ.",
    suggested: [2500, 5000, 10000, 25000]
  },
  {
    icon: BookOpen,
    titleEn: "Heritage & History Research",
    titleHi: "इतिहास संरक्षण एवं शोध",
    titleGu: "ઇતિહાસ સંરક્ષણ અને સંશોધન",
    descEn: "Preserving historical records, publications, and archives",
    descHi: "समाज के प्रामाणिक इतिहास के शोध, प्रकाशन एवं पुस्तकालय विस्तार।",
    descGu: "સમાજના પ્રામાણિક ઇતિહાસનું સંશોધન અને પ્રકાશન.",
    suggested: [1100, 2100, 5100, 11000]
  },
  {
    icon: Shield,
    titleEn: "Emergency & Disaster Relief",
    titleHi: "आपदा राहत एवं आपातकालीन सेवा",
    titleGu: "આપત્તિ રાહત અને ઇમરજન્સી સેવા",
    descEn: "Immediate relief during natural disasters and family distress",
    descHi: "आकस्मिक विपत्ति एवं संकट के समय जरूरतमंद परिवारों को तात्कालिक सहायता।",
    descGu: "કુદરતી આપત્તિઓ અને આકસ્મિક સંકટ સમયે પરિવારોને સહાય.",
    suggested: [500, 1000, 5000, 10000]
  },
];

export default function DonationPageClient() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");

  const currentCat = donationCategories[selectedCategory];
  const catTitle = language === "hi" ? currentCat.titleHi : language === "gu" ? currentCat.titleGu : currentCat.titleEn;
  const catDesc = language === "hi" ? currentCat.descHi : language === "gu" ? currentCat.descGu : currentCat.descEn;

  return (
    <>
      <PageHero
        title={language === "hi" ? "दान एवं सहयोग" : language === "gu" ? "દાન અને સહયોગ" : "Support & Donations"}
        titleHi="आँजणा जाट महासभा सामाजिक सहयोग"
        subtitle={
          language === "hi"
            ? "आपका सहयोग समाज के युवाओं, छात्रों, किसानों एवं जरूरतमंद परिवारों के उत्थान में सहायक है।"
            : language === "gu"
            ? "આપનો સહયોગ સમાજના યુવાનો, વિદ્યાર્થીઓ અને જરૂરિયાતમંદ પરિવારો માટે આશીર્વાદરૂપ છે."
            : "Your generous contribution helps build a stronger community. Every rupee makes a difference."
        }
        breadcrumbs={[{ label: language === "hi" ? "दान / सहयोग" : language === "gu" ? "દાન / સહયોગ" : "Donation", href: "/donation" }]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Categories */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-base font-bold text-[#29211D] mb-4 font-display">
                {language === "hi" ? "सहयोग का उद्देश्य चुनें" : language === "gu" ? "સહયોગનો હેતુ પસંદ કરો" : "Select Category"}
              </h3>
              {donationCategories.map((cat, i) => {
                const title = language === "hi" ? cat.titleHi : language === "gu" ? cat.titleGu : cat.titleEn;
                const desc = language === "hi" ? cat.descHi : language === "gu" ? cat.descGu : cat.descEn;
                const isSelected = selectedCategory === i;

                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedCategory(i); setSelectedAmount(null); }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-[#B52A12] shadow-sm"
                        : "bg-white/80 border border-[#D9A52B]/35 hover:border-[#B52A12]"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[#FAF2E0] text-[#B52A12]" : "bg-[#FAF2E0]/50 text-[#5C4E46]"}`}>
                      <cat.icon size={18} />
                    </div>
                    <div>
                      <p className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? "text-[#B52A12]" : "text-[#29211D]"}`}>
                        {title}
                      </p>
                      <p className="text-[11px] text-[#5C4E46] line-clamp-1 mt-0.5">{desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Amount & Payment */}
            <div className="lg:col-span-3">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white border border-[#D9A52B]/40 p-6 md:p-8 shadow-xs"
              >
                <h3 className="text-lg font-bold text-[#B52A12] mb-1 font-display">
                  {catTitle}
                </h3>
                <p className="text-xs text-[#5C4E46] mb-6">
                  {catDesc}
                </p>

                {/* Amount Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {currentCat.suggested.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedAmount === amount
                          ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                          : "bg-[#FAF2E0] text-[#29211D] border border-[#D9A52B]/40 hover:bg-[#F5E8CE]"
                      }`}
                    >
                      ₹{amount.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    placeholder={language === "hi" ? "अन्य राशि दर्ज करें (₹)" : language === "gu" ? "અન્ય રકમ દાખલ કરો (₹)" : "Enter custom amount (₹)"}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF2E0]/40 border border-[#29211D]/15 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs sm:text-sm"
                  />
                </div>

                {/* Payment Methods */}
                <h4 className="text-xs font-bold text-[#29211D] mb-3 uppercase tracking-wider">
                  {language === "hi" ? "भुगतान माध्यम" : language === "gu" ? "ચુકવણી પદ્ધતિ" : "Payment Options"}
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FAF2E0]/50 border border-[#D9A52B]/40 cursor-pointer">
                    <Smartphone size={20} className="text-[#B52A12]" />
                    <span className="text-xs font-bold text-[#29211D]">UPI / QR</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FAF2E0]/50 border border-[#D9A52B]/40 cursor-pointer">
                    <CreditCard size={20} className="text-[#B52A12]" />
                    <span className="text-xs font-bold text-[#29211D]">{language === "hi" ? "कार्ड" : "Card"}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FAF2E0]/50 border border-[#D9A52B]/40 cursor-pointer">
                    <Building2 size={20} className="text-[#B52A12]" />
                    <span className="text-xs font-bold text-[#29211D]">{language === "hi" ? "बैंक ट्रांसफर" : "Net Banking"}</span>
                  </div>
                </div>

                <button className="w-full py-3.5 rounded-full bg-[#B52A12] text-white font-bold text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all cursor-pointer">
                  {language === "hi" ? "सहयोग राशि जमा करें: " : language === "gu" ? "સહયોગ રકમ જમા કરો: " : "Contribute: "}
                  ₹{(selectedAmount || Number(customAmount) || 0).toLocaleString("en-IN")}
                </button>

                <p className="text-[11px] text-[#5C4E46] text-center mt-3">
                  {language === "hi"
                    ? "समस्त दान राशि आँजणा जाट महासभा के अधिकृत खाते में जमा होती है एवं इसकी आधिकारिक रसीद जारी की जाती है।"
                    : language === "gu"
                    ? "તમામ દાન રકમ આંજણા જાટ મહાસભાના અધિકૃત ખાતામાં જમા થાય છે અને તેની સત્તાવાર પહોંચ આપવામાં આવે છે."
                    : "All donations are credited directly to the authorized Anjana Jat Mahasabha accounts with verified receipts."}
                </p>
              </motion.div>

              {/* Bank Details */}
              <div className="mt-6 rounded-2xl bg-white border border-[#D9A52B]/40 p-6 shadow-xs">
                <h4 className="text-sm font-bold text-[#B52A12] mb-3 font-display">
                  {language === "hi" ? "आधिकारिक बैंक विवरण (RTGS / NEFT)" : language === "gu" ? "સત્તાવાર બેંક વિગતો (RTGS / NEFT)" : "Official Bank Transfer Details"}
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
                  <span className="text-[#5C4E46]">{language === "hi" ? "बैंक का नाम" : language === "gu" ? "બેંકનું નામ" : "Bank Name"}</span>
                  <span className="text-[#29211D] font-bold">State Bank of India</span>
                  <span className="text-[#5C4E46]">{language === "hi" ? "खाता धारक" : language === "gu" ? "ખાતા ધારક" : "Account Name"}</span>
                  <span className="text-[#29211D] font-bold">Anjana Jat Mahasabha</span>
                  <span className="text-[#5C4E46]">{language === "hi" ? "खाता संख्या" : language === "gu" ? "ખાતા નંબર" : "Account No."}</span>
                  <span className="text-[#29211D] font-bold">3829XXXXXXXX</span>
                  <span className="text-[#5C4E46]">{language === "hi" ? "आईएफएससी कोड" : language === "gu" ? "આઈએફએસસી કોડ" : "IFSC Code"}</span>
                  <span className="text-[#29211D] font-bold">SBIN0031122</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
