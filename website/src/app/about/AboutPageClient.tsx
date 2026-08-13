"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, Star, Shield, Users, BookOpen, Handshake } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const values = [
  { icon: Heart, title: "Unity", titleHi: "एकता", description: "Strengthening bonds among community members across all regions." },
  { icon: BookOpen, title: "Education", titleHi: "शिक्षा", description: "Promoting learning and knowledge as the foundation of progress." },
  { icon: Handshake, title: "Service", titleHi: "सेवा", description: "Selfless service to the community and society at large." },
  { icon: Shield, title: "Heritage", titleHi: "विरासत", description: "Preserving our rich cultural traditions and historical legacy." },
  { icon: Star, title: "Excellence", titleHi: "उत्कृष्टता", description: "Pursuing excellence in every community initiative we undertake." },
  { icon: Users, title: "Empowerment", titleHi: "सशक्तिकरण", description: "Empowering every member with opportunities for growth." },
];

const objectives = [
  "Unite all Aanjana Jat community members under one umbrella organization",
  "Promote education and provide scholarships to deserving students",
  "Organize medical camps and healthcare initiatives in rural areas",
  "Support farmers with modern agricultural techniques and market access",
  "Empower women through skill development and self-help groups",
  "Develop youth leadership through training programs and sports",
  "Preserve and promote our cultural heritage and traditions",
  "Provide legal aid and social welfare services to community members",
  "Create employment opportunities through skill development and business networks",
  "Maintain a comprehensive community census and member database",
];

const timelineEvents = [
  { year: "1948", title: "Foundation", description: "Aanjana Jat Mahasabha was formally established with the goal of community unity and social reform." },
  { year: "1965", title: "First Convention", description: "The first major community convention held in Jaipur with over 5,000 attendees." },
  { year: "1980", title: "Scholarship Program", description: "Launch of the community scholarship program, initially supporting 50 students annually." },
  { year: "1995", title: "Women Wing", description: "Formation of the Women Wing to champion women's empowerment and education." },
  { year: "2005", title: "Youth Wing", description: "Establishment of the Youth Wing to engage and develop young community leaders." },
  { year: "2015", title: "Digital Initiative", description: "Launch of the community website and digital membership system." },
  { year: "2020", title: "COVID Relief", description: "Organized massive community relief during the pandemic, reaching 25,000+ families." },
  { year: "2024", title: "50K Members", description: "Community membership crosses 50,000 active members across 12 states." },
];

export default function AboutPageClient() {
  return (
    <>
      <PageHero
        title="About Us"
        titleHi="हमारे बारे में"
        subtitle="Dedicated to the unity, development, and empowerment of the Aanjana Jat community since 1948."
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />

      {/* About Introduction */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-maroon mb-6">
                Who We Are
              </h2>
              <div className="section-divider !mx-0 mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Aanjana Jat Mahasabha</strong> is a
                  premier community organization that has been serving the Aanjana Jat community
                  for over seven decades. Founded in 1948, we are dedicated to uniting community
                  members across India and working towards their collective welfare and development.
                </p>
                <p>
                  Our organization operates across 12 states with a network of over 50,000 active
                  members, 350+ connected villages, and numerous district-level committees.
                  Through our diverse programs in education, healthcare, women empowerment,
                  youth development, and social welfare, we strive to uplift every member of our community.
                </p>
                <p>
                  We believe in the power of unity and collective action. Our community&apos;s rich
                  heritage, cultural values, and traditions form the foundation upon which we build
                  a progressive and inclusive future for generations to come.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-gradient-to-br from-saffron/15 via-maroon/10 to-gold/15 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 cultural-pattern opacity-20" />
              <div className="relative space-y-8">
                {/* Vision */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-saffron/20 flex items-center justify-center">
                    <Eye size={22} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Our Vision</h3>
                    <p className="text-sm text-muted-foreground">
                      To be the most impactful and united community organization in India,
                      setting benchmarks in education, social welfare, and cultural preservation.
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-maroon/20 flex items-center justify-center">
                    <Target size={22} className="text-maroon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Our Mission</h3>
                    <p className="text-sm text-muted-foreground">
                      To empower every member of the Aanjana Jat community through accessible
                      education, healthcare, economic opportunities, and the preservation of
                      our cultural heritage while fostering unity and mutual support.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Our Core Values"
            titleHi="हमारे मूल्य"
            subtitle="The principles that guide our every action and decision."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-card border border-border p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-saffron/10 to-maroon/10 flex items-center justify-center group-hover:from-saffron/20 group-hover:to-maroon/20 transition-colors">
                  <value.icon size={24} className="text-saffron" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {value.title}
                </h3>
                <p className="text-xs text-saffron font-devanagari mb-2">
                  {value.titleHi}
                </p>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title="Our Objectives"
            titleHi="हमारे उद्देश्य"
            subtitle="Our roadmap for community development and empowerment."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {objectives.map((obj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-saffron/30 transition-colors"
              >
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground">{obj}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title="Our Journey"
            titleHi="हमारी यात्रा"
            subtitle="Key milestones in our history of community service."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron via-maroon to-gold" />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-saffron border-2 border-background transform -translate-x-1.5 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron text-sm font-bold mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
