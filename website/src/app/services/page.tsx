"use client";

import { motion } from "framer-motion";
import {
  GraduationCap, Stethoscope, HeartPulse, Briefcase,
  Heart, Scale, Users, Wheat, Shield, Rocket, CheckCircle,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap, stethoscope: Stethoscope,
  "heart-pulse": HeartPulse, briefcase: Briefcase,
  heart: Heart, scale: Scale, users: Users,
  wheat: Wheat, shield: Shield, rocket: Rocket,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Community Services"
        titleHi="सामुदायिक सेवाएं"
        subtitle="Comprehensive programs for education, healthcare, empowerment, and social welfare."
        breadcrumbs={[{ label: "Community Services", href: "/services" }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="What We Do"
            titleHi="हम क्या करते हैं"
            subtitle="From education to disaster relief, our community services touch every aspect of life."
          />

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Heart;
              return (
                <motion.div
                  key={service.id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 !== 0 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron/15 to-maroon/15 flex items-center justify-center">
                        <Icon size={22} className="text-saffron" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        <p className="text-xs text-saffron font-devanagari">{service.titleHi}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`rounded-2xl bg-gradient-to-br from-saffron/10 via-maroon/5 to-gold/10 h-64 md:h-80 relative overflow-hidden ${index % 2 !== 0 ? "md:order-1" : ""}`}>
                    <div className="absolute inset-0 cultural-pattern opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={64} className="text-saffron/20" />
                    </div>
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
