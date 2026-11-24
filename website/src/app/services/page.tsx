"use client";

import { motion } from "framer-motion";
import {
  GraduationCap, Stethoscope, HeartPulse, Briefcase,
  Heart, Scale, Users, Wheat, Shield, Rocket, CheckCircle,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
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

export default function ServicesPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "सामुदायिक सेवाएं एवं जनकल्याण" : language === "gu" ? "સામાજિક સેવાઓ અને જનકલ્યાણ" : "Community Welfare Services"}
        titleHi="आँजणा जाट महासभा सेवा प्रकल्प"
        subtitle={
          language === "hi"
            ? "शिक्षा, चिकित्सा, रोजगार, किसान स्वाभिमान एवं सामाजिक समरसता हेतु समर्पित प्रमुख योजनाएं।"
            : language === "gu"
            ? "શિક્ષણ, આરોગ્ય, રોજગાર અને ખેડૂત સ્વાભિમાન માટે સમર્પિત કલ્યાણકારી યોજનાઓ."
            : "Comprehensive programs for education, healthcare, empowerment, and social welfare."
        }
        breadcrumbs={[
          { label: language === "hi" ? "सेवाएं" : language === "gu" ? "સેવાઓ" : "Services", href: "/services" }
        ]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "हमारे प्रमुख सेवा प्रकल्प" : language === "gu" ? "આપણા મુખ્ય સેવા પ્રકલ્પો" : "Our Welfare Programs"}
            titleHi="कल्याणकारी योजनाएं"
            subtitle={
              language === "hi"
                ? "प्रत्येक गाँव और परिवार तक सहायता, मार्गदर्शन एवं विकास पहुँचाने का हमारा संकल्प।"
                : language === "gu"
                ? "દરેક ગામ અને પરિવાર સુધી સહાય અને માર્ગદર્શન પહોંચાડવાનો આપણો સંકલ્પ."
                : "From education to agrarian advocacy, our initiatives touch every dimension of community progress."
            }
          />

          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Heart;
              const title = language === "hi" ? service.titleHi : language === "gu" ? service.titleGu : service.title;
              const desc = language === "hi" ? service.descriptionHi : language === "gu" ? service.descriptionGu : service.description;

              return (
                <motion.div
                  key={service.id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45 }}
                  className={`grid md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A52B]/35 shadow-xs ${
                    index % 2 !== 0 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#29211D] font-display">{title}</h3>
                        <p className="text-xs text-[#B52A12] font-semibold tracking-wide">
                          {language === "hi" ? "कल्याणकारी कार्यक्रम" : language === "gu" ? "કલ્યાણકારી કાર્યક્રમ" : "Community Welfare Initiative"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[#5C4E46] leading-relaxed mb-6 font-normal">
                      {desc}
                    </p>
                    <ul className="space-y-2">
                      {(language === "hi" && service.detailsHi
                        ? service.detailsHi
                        : language === "gu" && service.detailsGu
                        ? service.detailsGu
                        : service.details
                      ).map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C4E46]">
                          <CheckCircle size={15} className="text-[#B52A12] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/40 h-56 md:h-72 relative overflow-hidden flex items-center justify-center ${index % 2 !== 0 ? "md:order-1" : ""}`}>
                    <Icon size={72} className="text-[#B52A12]/20" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
