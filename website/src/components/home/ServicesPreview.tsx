"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Stethoscope, HeartPulse, Briefcase, Heart, Scale, Users, Wheat, Shield, Rocket } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { services } from "@/data/services";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  heart: Heart,
  scale: Scale,
  users: Users,
  wheat: Wheat,
  shield: Shield,
  rocket: Rocket,
};

export default function ServicesPreview() {
  const { language, t } = useLanguage();
  const highlightedServices = services.slice(0, 6);

  return (
    <section className="py-20 bg-[#FFF9EC] text-[#29211D] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title={t("servicesHeading")}
          subtitle={t("servicesSub")}
        />

        {/* Newspaper Broadsheet Welfare Charter Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Charter Mission (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF2E0] p-6 sm:p-8 rounded-2xl border border-[#D9A52B]/40">
            <span className="text-xs font-bold text-[#B52A12] uppercase tracking-wider block mb-2 font-display">
              {language === "hi" ? "कल्याणकारी संकल्प" : language === "gu" ? "કલ્યાણકારી સંકલ્પ" : "Community Charter"}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#29211D] leading-tight mb-3 font-display">
              {language === "hi"
                ? "सर्वांगीण सामाजिक उत्थान एवं सहायता"
                : language === "gu"
                ? "સર્વાંગી સામાજિક ઉત્થાન અને સહાય"
                : "Holistic Social Welfare & Community Support"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed mb-6">
              {language === "hi"
                ? "महासभा शिक्षा, चिकित्सा सहायता, किसान अधिकारों और रोजगारोन्मुखी मार्गदर्शन के माध्यम से प्रत्येक गाँव और परिवार तक पहुँचने के लिए प्रतिबद्ध है।"
                : language === "gu"
                ? "મહાસભા શિક્ષણ, તબીબી સહાય, ખેડૂત અધિકારો અને રોજગાર માર્ગદર્શન દ્વારા દરેક ગામ અને પરિવાર સુધી પહોંચવા કટિબદ્ધ છે."
                : "Committed to delivering direct assistance in education, rural healthcare, farmer advocacy, and youth employment across all connected villages."}
            </p>
            <div className="pt-4 border-t border-[#D9A52B]/30 space-y-2 text-xs text-[#5C4E46]">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{language === "hi" ? "सक्रिय क्षेत्र" : language === "gu" ? "સક્રિય ક્ષેત્રો" : "Active Programs"}</span>
                <span className="font-bold text-[#B52A12]">{language === "hi" ? "१० प्रकल्प" : language === "gu" ? "૧૦ પ્રકલ્પ" : "10 Programs"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{language === "hi" ? "लाभान्वित क्षेत्र" : language === "gu" ? "લાભાર્થી ક્ષેત્રો" : "Coverage"}</span>
                <span className="font-bold text-[#B52A12]">{language === "hi" ? "राज., गुज. एवं म.प्र." : language === "gu" ? "રાજ., ગુજ. અને મ.પ્ર." : "RJ, GJ & MP"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial List Rows with Hairline Dividers (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A52B]/40 shadow-xs divide-y divide-[#D9A52B]/30">
            {highlightedServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Heart;
              return (
                <div key={service.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center text-[#B52A12] shrink-0 mt-0.5">
                    <IconComponent size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm sm:text-base font-bold text-[#29211D]">
                        <Link href={`/services#${service.slug}`} className="hover:text-[#B52A12] transition-colors">
                          {language === "hi"
                            ? service.titleHi
                            : language === "gu"
                            ? (service.titleGu || service.titleHi)
                            : service.title}
                        </Link>
                      </h4>
                      <span className="text-[11px] text-[#B52A12] font-semibold tracking-wide">
                        {language === "hi"
                          ? "कल्याण योजना"
                          : language === "gu"
                          ? "કલ્યાણ યોજના"
                          : "Welfare Program"}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C4E46] mt-1 leading-relaxed">
                      {language === "hi"
                        ? (service.descriptionHi || service.description)
                        : language === "gu"
                        ? (service.descriptionGu || service.description)
                        : service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FAF2E0] border border-[#D9A52B] text-[#B52A12] font-bold text-sm hover:bg-[#B52A12] hover:text-white transition-all shadow-xs group"
          >
            {t("btnAllServices")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
