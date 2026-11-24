"use client";

import { motion } from "framer-motion";
import { GraduationCap, FileText, CheckCircle, Clock, Award, BookOpen } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const scholarships = [
  {
    titleHi: "मेधावी छात्रवृत्ति (कक्षा 10)",
    titleGu: "તેજસ્વી વિદ્યાર્થી શિષ્યવૃત્તિ (ધોરણ ૧૦)",
    titleEn: "Merit Scholarship (Class 10)",
    amount: "₹5,000",
    eligibilityHi: "10वीं बोर्ड परीक्षा में 80% या अधिक अंक",
    eligibilityGu: "૧૦મા ધોરણની બોર્ડ પરીક્ષામાં ૮૦%+ ગુણ",
    eligibilityEn: "80%+ marks in Class 10 Board Exam",
    deadline: "Sept 30, 2026"
  },
  {
    titleHi: "मेधावी छात्रवृत्ति (कक्षा 12)",
    titleGu: "તેજસ્વી વિદ્યાર્થી શિષ્યવૃત્તિ (ધોરણ ૧૨)",
    titleEn: "Merit Scholarship (Class 12)",
    amount: "₹10,000",
    eligibilityHi: "12वीं बोर्ड परीक्षा में 75% या अधिक अंक",
    eligibilityGu: "૧૨મા ધોરણની બોર્ડ પરીક્ષામાં ૭૫%+ ગુણ",
    eligibilityEn: "75%+ marks in Class 12 Board Exam",
    deadline: "Sept 30, 2026"
  },
  {
    titleHi: "उच्च शिक्षा स्नातक छात्रवृत्ति",
    titleGu: "ઉચ્ચ શિક્ષણ સ્નાતક શિષ્યવૃત્તિ",
    titleEn: "Graduate Degree Scholarship",
    amount: "₹15,000",
    eligibilityHi: "मान्यता प्राप्त विश्वविद्यालय में अध्ययनरत, विगत वर्ष में 70%+",
    eligibilityGu: "માન્ય યુનિવર્સિટીમાં અભ્યાસરત, અગાઉના વર્ષમાં ૭૦%+",
    eligibilityEn: "Enrolled in recognized university, 70%+ in previous year",
    deadline: "Oct 15, 2026"
  },
  {
    titleHi: "व्यावसायिक एवं तकनीकी पाठ्यक्रम छात्रवृत्ति",
    titleGu: "પ્રોફેશનલ કોર્સ શિષ્યવૃત્તિ",
    titleEn: "Professional Course Scholarship",
    amount: "₹25,000",
    eligibilityHi: "इंजीनियरिंग, मेडिकल, विधि (Law), CA के मेधावी छात्र",
    eligibilityGu: "ઇજનેરી, મેડિકલ, કાયદો (Law), સીએ ના વિદ્યાર્થીઓ",
    eligibilityEn: "Engineering, Medical, Law, CA students with 65%+",
    deadline: "Oct 15, 2026"
  },
  {
    titleHi: "शोध एवं पीएचडी छात्रवृत्ति",
    titleGu: "સંશોધન અને પીએચડી શિષ્યવૃત્તિ",
    titleEn: "Research & Ph.D. Scholarship",
    amount: "₹50,000",
    eligibilityHi: "समाज के शोधार्थी एवं डॉक्टोरल स्कॉलर्स",
    eligibilityGu: "સમાજના સંશોધકો અને પીએચડી સ્કોલર્સ",
    eligibilityEn: "Ph.D. scholars from the community",
    deadline: "Nov 1, 2026"
  },
  {
    titleHi: "कन्या शिक्षा प्रोत्साहन छात्रवृत्ति",
    titleGu: "કન્યા કેળવણી પ્રોત્સાહન શિષ્યવૃત્તિ",
    titleEn: "Girls Higher Education Scholarship",
    amount: "₹10,000",
    eligibilityHi: "उच्च शिक्षा एवं प्रतियोगी परीक्षा हेतु अध्ययनरत छात्राएं",
    eligibilityGu: "ઉચ્ચ શિક્ષણ મેળવતી સમાજની દીકરીઓ",
    eligibilityEn: "Girl students pursuing higher education",
    deadline: "Oct 31, 2026"
  },
];

const steps = [
  {
    icon: FileText,
    titleHi: "ऑनलाइन आवेदन",
    titleGu: "ઓનલાઇન અરજી",
    titleEn: "Apply Online",
    descHi: "अपना विवरण दर्ज करें और आवेदन प्रपत्र भरें",
    descGu: "વિગતો દાખલ કરો અને અરજી ફોર્મ ભરો",
    descEn: "Fill in the verified application form"
  },
  {
    icon: BookOpen,
    titleHi: "दस्तावेज सत्यापन",
    titleGu: "દસ્તાવેજ ચકાસણી",
    titleEn: "Document Upload",
    descHi: "अंकतालिका, प्रमाण पत्र एवं पहचान पत्र अपलोड करें",
    descGu: "માર્કશીટ અને ઓળખપત્ર અપલોડ કરો",
    descEn: "Upload marksheets and identity proofs"
  },
  {
    icon: Clock,
    titleHi: "समिति समीक्षा",
    titleGu: "સમિતિ સમીક્ષા",
    titleEn: "Committee Review",
    descHi: "शिक्षा समिति द्वारा 30 दिनों में पात्रता परीक्षण",
    descGu: "શિક્ષણ સમિતિ દ્વારા ૩૦ દિવસમાં ચકાસણી",
    descEn: "Education committee reviews eligibility"
  },
  {
    icon: Award,
    titleHi: "राशि वितरण",
    titleGu: "રકમ વિતરણ",
    titleEn: "Disbursement",
    descHi: "चयनित विद्यार्थियों के बैंक खाते में सीधी सहायता",
    descGu: "પસંદ થયેલ વિદ્યાર્થીઓના ખાતામાં સીધી સહાય",
    descEn: "Direct bank transfer to selected students"
  },
];

export default function ScholarshipPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "छात्रवृत्ति एवं शिक्षा प्रोत्साहन" : language === "gu" ? "શિષ્યવૃત્તિ અને શિક્ષણ પ્રોત્સાહન" : "Scholarship Portal"}
        titleHi="आँजणा जाट महासभा शिक्षा प्रकोष्ठ"
        subtitle={
          language === "hi"
            ? "शिक्षा में निवेश, समाज के स्वर्णिम भविष्य की नींव। मेधावी एवं जरूरतमंद विद्यार्थियों हेतु छात्रवृत्तियां।"
            : language === "gu"
            ? "શિક્ષણમાં રોકાણ, સમાજના ઉજ્જવળ ભવિષ્યની આધારશિલા. તેજસ્વી વિદ્યાર્થીઓ માટે શિષ્યવૃત્તિ."
            : "Investing in education, investing in the future. Apply for community scholarships."
        }
        breadcrumbs={[
          { label: language === "hi" ? "छात्रवृत्ति" : language === "gu" ? "શિષ્યવૃત્તિ" : "Scholarship", href: "/scholarship" }
        ]}
      />

      {/* How it works */}
      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "आवेदन प्रक्रिया के ४ चरण" : language === "gu" ? "અરજી પ્રક્રિયાના ૪ તબક્કા" : "How It Works"}
            titleHi="सरल एवं पारदर्शी प्रक्रिया"
          />
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {steps.map((step, i) => {
              const title = language === "hi" ? step.titleHi : language === "gu" ? step.titleGu : step.titleEn;
              const desc = language === "hi" ? step.descHi : language === "gu" ? step.descGu : step.descEn;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="text-center relative p-5 bg-white rounded-2xl border border-[#D9A52B]/35 shadow-xs"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center relative text-[#B52A12]">
                    <step.icon size={22} />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#B52A12] text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#29211D] text-xs sm:text-sm mb-1 font-display">{title}</h3>
                  <p className="text-[11px] text-[#5C4E46] leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scholarships List */}
      <section className="py-16 md:py-24 bg-[#FAF2E0]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "उपलब्ध छात्रवृत्ति योजनाएं" : language === "gu" ? "ઉપલબ્ધ શિષ્યવૃત્તિ યોજનાઓ" : "Available Scholarships"}
            titleHi="शैक्षणिक सत्र 2026-27"
            subtitle={
              language === "hi"
                ? "कक्षा 10, 12, स्नातक, व्यावसायिक एवं शोध छात्रों हेतु महासभा द्वारा संचालित योजनाएं।"
                : language === "gu"
                ? "ધોરણ ૧૦, ૧૨, સ્નાતક અને ઉચ્ચ અભ્યાસ માટે મહાસભા દ્વારા સંચાલિત યોજનાઓ."
                : "Current scholarship programs open for community student applications."
            }
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {scholarships.map((sch, i) => {
              const title = language === "hi" ? sch.titleHi : language === "gu" ? sch.titleGu : sch.titleEn;
              const eligibility = language === "hi" ? sch.eligibilityHi : language === "gu" ? sch.eligibilityGu : sch.eligibilityEn;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="rounded-2xl bg-white border border-[#D9A52B]/35 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#29211D] leading-snug">{title}</h3>
                        <p className="text-base font-extrabold text-[#B52A12]">{sch.amount}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-[#B52A12] shrink-0 mt-0.5" />
                        <span className="text-[#5C4E46]">{eligibility}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#D9A52B] shrink-0" />
                        <span className="text-[#5C4E46]">
                          {language === "hi" ? "अंतिम तिथि: " : language === "gu" ? "છેલ્લી તારીખ: " : "Deadline: "}
                          {sch.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-2.5 rounded-full bg-[#B52A12] text-white text-xs font-bold border border-[#D9A52B] shadow-2xs hover:bg-[#8F1F0B] transition-all cursor-pointer">
                    {language === "hi" ? "आवेदन करें" : language === "gu" ? "અરજી કરો" : "Apply Now"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
