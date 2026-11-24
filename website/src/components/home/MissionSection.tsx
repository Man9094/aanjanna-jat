"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Heart, BookOpen, Star, Sprout } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export interface ObjectiveItem {
  id: number;
  titleEn: string;
  titleHi: string;
  titleGu: string;
  descEn: string;
  descHi: string;
  descGu: string;
  icon: React.ElementType;
}

export const keyObjectives: ObjectiveItem[] = [
  {
    id: 1,
    titleEn: "Authentic History Preservation & Research",
    titleHi: "प्रामाणिक इतिहास का संरक्षण एवं शोध",
    titleGu: "પ્રામાણિક ઇતિહાસનું સંરક્ષણ અને સંશોધન",
    descEn: "Preserving, researching, and publishing the authentic historical lineage and heritage of the Anjana community.",
    descHi: "आँजणा समाज के प्रामाणिक इतिहास का संरक्षण, शोध एवं प्रचार-प्रसार करना।",
    descGu: "આંજણા સમાજના પ્રામાણિક ઇતિહાસનું સંરક્ષણ, સંશોધન અને પ્રચાર-પ્રસાર કરવો.",
    icon: Shield,
  },
  {
    id: 2,
    titleEn: "Central OBC Representation Efforts",
    titleHi: "सेंट्रल ओबीसी में सकारात्मक प्रयास",
    titleGu: "સેન્ટ્રલ ઓબીસીમાં સકારાત્મક પ્રયાસ",
    descEn: "Constructive and fact-based advocacy for appropriate Central OBC representation and community recognition.",
    descHi: "सेंट्रल ओबीसी में आँजणा समाज से संबंधित विषयों पर तथ्यात्मक एवं सकारात्मक प्रयास करना।",
    descGu: "સેન્ટ્રલ ઓબીસીમાં આંજણા સમાજ સંબંધિત વિષયો પર તથ્યપૂર્ણ અને સકારાત્મક પ્રયાસો કરવા.",
    icon: Award,
  },
  {
    id: 3,
    titleEn: "Community-First Welfare & Impartiality",
    titleHi: "निष्पक्ष एवं समाजहितकारी रुख़",
    titleGu: "નિષ્પક્ષ અને સમાજહિતકારી વલણ",
    descEn: "Maintaining an unbiased, evidence-based, and welfare-driven stance on all critical community matters.",
    descHi: "समाज के संवेदनशील एवं महत्वपूर्ण मुद्दों पर निष्पक्ष, तथ्याधारित एवं समाजहितकारी रुख़।",
    descGu: "સમાજના સંવેદનશીલ અને મહત્વપૂર્ણ મુદ્દાઓ પર નિષ્પક્ષ, તથ્યાધારિત અને લોકકલ્યાણકારી અભિગમ.",
    icon: Heart,
  },
  {
    id: 4,
    titleEn: "Strengthening Khet-Kheda Khap Heritage",
    titleHi: "खेत-खेड़ा खाप परंपराओं का सुदृढ़ीकरण",
    titleGu: "ખેત-ખેડા ખાપ પરંપરાઓનું સુદ્રઢીકરણ",
    descEn: "Fostering collaboration, traditional ethics, and localized leadership across all Khet-Kheda Khap regions.",
    descHi: "खेत-खेड़ा खाप की परंपराओं, संगठन एवं नेतृत्व को सुदृढ़ करने हेतु सहयोग।",
    descGu: "ખેત-ખેડા ખાપની પરંપરાઓ, સંગઠન અને નેતૃત્વને મજબૂત કરવા માટે સહયોગ.",
    icon: Users,
  },
  {
    id: 5,
    titleEn: "Promoting Legacies of Community Icons",
    titleHi: "महापुरुषों के जीवन-चरित्र का प्रचार",
    titleGu: "મહાપુરુષોના જીવન-ચરિત્રનો પ્રચાર",
    descEn: "Documenting and commemorating the lives, sacrifices, and leadership of historical heroes and spiritual icons.",
    descHi: "आँजणा समाज के महापुरुषों के जीवन-चरित्र, योगदान एवं इतिहास पर आधारित प्रामाणिक जानकारी सार्वजनिक करना।",
    descGu: "આંજણા સમાજના મહાપુરુષોના જીવન-ચરિત્ર, યોગદાન અને ઇતિહાસ આધારિત પ્રામાણિક માહિતી પ્રસ્તુત કરવી.",
    icon: Star,
  },
  {
    id: 6,
    titleEn: "Youth Sports & Skill-Based Education",
    titleHi: "खेल एवं स्किल-बेस्ड एज्युकेशन",
    titleGu: "રમતગમત અને કૌશલ્ય આધારિત શિક્ષણ",
    descEn: "Nurturing athletic talents and expanding employment-oriented vocational training for community youth.",
    descHi: "समाज के युवाओं में खेल प्रतिभा को प्रोत्साहन देना तथा रोजगारोन्मुखी एवं कौशल आधारित शिक्षा के अवसर बढ़ाना।",
    descGu: "સમાજના યુવાનોમાં રમતગમત પ્રતિભાને પ્રોત્સાહન આપવું તેમજ રોજગારોન્મુખી શિક્ષણની તકો વધારવી.",
    icon: BookOpen,
  },
  {
    id: 7,
    titleEn: "100% Addiction-Free Community Campaign",
    titleHi: "पूर्ण रासायनिक नशा-मुक्त समाज",
    titleGu: "સંપૂર્ણ રાસાયણિક વ્યસનમુક્ત સમાજ",
    descEn: "Driving widespread social awareness campaigns to keep youth and families completely free from chemical substance abuse.",
    descHi: "समाज को रासायनिक एवं मादक पदार्थों के सेवन से मुक्त करने के लिए जागरूकता, जनअभियान एवं सामाजिक प्रयास करना।",
    descGu: "સમાજને રાસાયણિક અને માદક દ્રવ્યોના સેવનથી મુક્ત કરવા માટે જાગૃતિ અને જનઅભિયાન ચલાવવું.",
    icon: Shield,
  },
  {
    id: 8,
    titleEn: "Farmer Advocacy & Agrarian Rights",
    titleHi: "किसानों की आवाज",
    titleGu: "ખેડૂતોનો બુલંદ અવાજ",
    descEn: "Standing firmly in solidarity with farmers, voicing their agricultural challenges, and advocating agrarian prosperity.",
    descHi: "किसानों की प्रासंगिक समस्याओं एवं मुद्दों पर समर्थन तथा आवाज उठाना।",
    descGu: "ખેડૂતોની સમસ્યાઓ અને પ્રશ્નો પર અડગ સમર્થન આપવું અને ખેડૂત કલ્યાણ માટે કાર્ય કરવું.",
    icon: Sprout,
  },
];

export default function MissionSection() {
  const shouldReduceMotion = useReducedMotion();
  const { language, t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 28,
      },
    },
  };

  const getObjectiveTitle = (obj: ObjectiveItem) => {
    if (language === "hi") return obj.titleHi;
    if (language === "gu") return obj.titleGu;
    return obj.titleEn;
  };

  const getObjectiveDesc = (obj: ObjectiveItem) => {
    if (language === "hi") return obj.descHi;
    if (language === "gu") return obj.descGu;
    return obj.descEn;
  };

  return (
    <section className="py-20 bg-[#FAF2E0] text-[#29211D] border-t border-[#D9A52B]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="text-xs sm:text-sm font-bold text-[#B52A12] uppercase tracking-wider px-3.5 py-1 rounded-full bg-white border border-[#D9A52B]/40 inline-block">
                {t("missionEyebrow")}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#B52A12] leading-tight font-devanagari">
                {t("missionTitle")}
              </h2>
              <div className="w-20 h-1 bg-[#D9A52B] rounded-full" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-[#5C4E46] text-sm sm:text-base leading-relaxed">
              {t("missionSubtitle")}
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
              {keyObjectives.slice(0, 4).map((obj) => {
                const IconComponent = obj.icon;
                return (
                  <motion.div
                    key={obj.id}
                    variants={itemVariants}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#D9A52B]/35 shadow-xs hover:border-[#B52A12] transition-colors"
                  >
                    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center text-[#B52A12]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#29211D] leading-snug">
                        {getObjectiveTitle(obj)}
                      </h4>
                      <p className="text-[11px] text-[#5C4E46] mt-1 leading-snug line-clamp-2">
                        {getObjectiveDesc(obj)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="pt-3 flex flex-wrap gap-4">
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#B52A12] text-white rounded-full font-bold text-sm border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] hover:shadow-md transition-all group"
              >
                {t("btnAllObjectives")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-[#D9A52B] shadow-lg bg-white">
              <Image
                src="/images/mission.jpg"
                alt="Anjana Jat Mahasabha Mission & Vision"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#29211D]/90 via-[#29211D]/35 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="px-3 py-1 bg-[#B52A12] text-white text-xs font-bold rounded-full w-fit mb-2 border border-[#D9A52B]/40">
                  {t("missionBannerTag")}
                </span>
                <p className="text-base sm:text-lg font-bold leading-snug">
                  &quot;{t("missionBannerQuote")}&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}