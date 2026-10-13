"use client";

import { motion } from "framer-motion";
import { Crown, Calendar } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const timelineEvents = [
  { year: "Ancient Era", title: "Origins of the Anjana Jat Community", description: "The Anjana Jat community traces its roots to the ancient Kshatriya warriors of Rajputana. Known for valor, farming, and community living, the Anjana Jats played a significant role in the social fabric of Western India." },
  { year: "Medieval Period", title: "Establishment of Village Republics", description: "During the medieval era, Anjana Jat communities established self-governing village republics (panchayats) across Rajasthan and Gujarat, known for democratic governance and social justice." },
  { year: "18th Century", title: "Agricultural Revolution", description: "The community played a pivotal role in transforming arid lands into fertile farmlands through innovative irrigation techniques and community-led farming cooperatives." },
  { year: "1857", title: "Freedom Movement Participation", description: "Members of the Anjana Jat community actively participated in the Indian independence movement, contributing warriors and resources to the cause of freedom." },
  { year: "1920s", title: "Social Reform Movement", description: "Community leaders initiated social reform movements promoting education, widow remarriage, and elimination of social evils during the early 20th century." },
  { year: "1948", title: "Formation of Mahasabha", description: "The Anjana Jat Mahasabha was formally established after independence to unite the community and work towards collective welfare and development." },
  { year: "1960s", title: "Education Expansion", description: "The community established its first schools and colleges, prioritizing education as the key to empowerment and progress." },
  { year: "1980s", title: "National Expansion", description: "The Mahasabha expanded beyond Rajasthan and Gujarat to establish chapters across 12 Indian states with a unified organizational structure." },
  { year: "2000s", title: "Digital Era", description: "Embracing technology for community management, the Mahasabha launched digital platforms for membership, communication, and service delivery." },
  { year: "Present", title: "Modern Community Organization", description: "Today, with 50,000+ members and a comprehensive service portfolio, the Anjana Jat Mahasabha stands as a model community organization, blending tradition with modernity." },
];

const historicalLeaders = [
  { name: "Shri Nathu Ram Ji Anjana", era: "1948-1960", role: "Founding President", contribution: "Established the organizational foundation and united scattered community groups under one banner." },
  { name: "Shri Ganga Ram Ji Anjana", era: "1960-1975", role: "President", contribution: "Spearheaded the education movement and established the first community schools." },
  { name: "Shri Suraj Mal Ji Anjana", era: "1975-1990", role: "President", contribution: "Expanded the organization nationally and launched the scholarship program." },
  { name: "Shri Bhawani Singh Ji Anjana", era: "1990-2005", role: "President", contribution: "Modernized the organization and established the women and youth wings." },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        title="Our History"
        titleHi="हमारा इतिहास"
        subtitle="A journey through centuries of valor, heritage, and community building."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our History", href: "/history" }]}
      />

      {/* History Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-maroon mb-6">
              A Legacy of Valor & Unity
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground leading-relaxed text-lg">
              The Anjana Jat community has a rich and storied history spanning centuries.
              From ancient Kshatriya warriors to modern-day professionals, our community
              has always been at the forefront of social progress, agricultural innovation,
              and cultural preservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title="Historical Timeline"
            titleHi="ऐतिहासिक समयरेखा"
          />

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron via-maroon to-gold" />

            <div className="space-y-10">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className={`relative flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-saffron to-maroon border-3 border-background transform -translate-x-2 mt-1 z-10 shadow-md" />
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron text-sm font-bold mb-2">
                      <Calendar size={13} />
                      {event.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Leaders */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Historical Leaders"
            titleHi="ऐतिहासिक नेता"
            subtitle="The visionary leaders who shaped our community."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {historicalLeaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover-lift"
              >
                <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center">
                  <Crown size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{leader.name}</h3>
                  <p className="text-sm text-saffron font-medium">{leader.role} • {leader.era}</p>
                  <p className="text-sm text-muted-foreground mt-2">{leader.contribution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
