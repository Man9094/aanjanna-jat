"use client";

import { motion, type Variants } from "framer-motion";
import { Check, ArrowRight, Shield, Award, Users, Heart, BookOpen, Sparkles, Volume2, Sprout } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const keyObjectives = [
  {
    id: 1,
    titleHi: "प्रामाणिक इतिहास का संरक्षण एवं शोध",
    titleEn: "Authentic History Preservation & Research",
    descHi: "आंजना समाज के प्रामाणिक इतिहास का संरक्षण, शोध एवं प्रचार-प्रसार करना।",
    descEn: "Preservation, research, and propagation of authentic history of the Anjana community.",
    icon: Shield,
  },
  {
    id: 2,
    titleHi: "सेंट्रल ओबीसी में सकारात्मक प्रयास",
    titleEn: "Central OBC Representation Efforts",
    descHi: "सेंट्रल ओबीसी में आंजना समाज से संबंधित विषयों पर तथ्यात्मक एवं सकारात्मक प्रयास करना।",
    descEn: "Factual and positive efforts regarding Central OBC representation for the Anjana community.",
    icon: Award,
  },
  {
    id: 3,
    titleHi: "निष्पक्ष एवं समाजहितकारी रुख़",
    titleEn: "Unbiased & Community-First Stance",
    descHi: "समाज के संवेदनशील एवं महत्वपूर्ण मुद्दों पर निष्पक्ष, तथ्याधारित एवं समाजहितकारी रुख़।",
    descEn: "Unbiased, fact-based, and welfare-oriented stance on sensitive community issues.",
    icon: Heart,
  },
  {
    id: 4,
    titleHi: "खेत-खेड़ा खाप परंपराओं का सुदृढ़ीकरण",
    titleEn: "Strengthening Khet-Kheda Khap Traditions",
    descHi: "खेत-खेड़ा खाप की परंपराओं, संगठन एवं नेतृत्व को सुदृढ़ करने हेतु सहयोग।",
    descEn: "Strengthening the traditions, structure, and leadership of Khet-Kheda Khap.",
    icon: Users,
  },
  {
    id: 5,
    titleHi: "महापुरुषों के जीवन-चरित्र का प्रचार",
    titleEn: "Promoting Legacy of Great Icons",
    descHi: "आंजना समाज के महापुरुषों के जीवन-चरित्र, योगदान एवं इतिहास पर आधारित प्रामाणिक जानकारी सार्वजनिक करना।",
    descEn: "Publishing authentic information on the life, contribution, and history of community icons.",
    icon: Sparkles,
  },
  {
    id: 6,
    titleHi: "खेल एवं स्किल-बेस्ड एज्युकेशन",
    titleEn: "Sports & Skill-Based Education",
    descHi: "समाज के युवाओं में खेल प्रतिभा को प्रोत्साहन देना तथा रोजगारोन्मुखी एवं कौशल आधारित शिक्षा के अवसर बढ़ाना।",
    descEn: "Promoting athletic talent in youth and enhancing skill-based, employment-oriented education opportunities.",
    icon: BookOpen,
  },
  {
    id: 7,
    titleHi: "पूर्ण रासायनिक नशा-मुक्त समाज",
    titleEn: "100% Chemical Addiction-Free Society",
    descHi: "समाज को रासायनिक एवं मादक पदार्थों के सेवन से मुक्त करने के लिए जागरूकता, जनअभियान एवं सामाजिक प्रयास करना।",
    descEn: "Driving awareness, public campaigns, and social efforts for a 100% chemical drug-free society.",
    icon: Shield,
  },
  {
    id: 8,
    titleHi: "किसानों की आवाज",
    titleEn: "Voice of Farmers",
    descHi: "किसानों की प्रासंगिक समस्याओं एवं मुद्दों पर समर्थन तथा आवाज उठाना।",
    descEn: "Raising voice and strong advocacy for the rights and issues of our farmers.",
    icon: Sprout,
  },
];

export default function MissionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="text-sm md:text-base font-bold text-saffron uppercase tracking-wider">
                About Our Mission • हमारे प्रमुख उद्देश्य
              </span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins leading-tight">
                आंजना जाट महासभा के प्रमुख उद्देश्य
              </h2>
              <p className="text-saffron font-devanagari font-medium text-lg">
                Key Objectives of Anjana Jat Mahasabha
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-saffron to-maroon rounded-full" />
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The Anjana Jat Mahasabha is dedicated to authentic history preservation, farmer advocacy, youth skill development, and creating an addiction-free, empowered community.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {keyObjectives.slice(0, 4).map((obj) => (
                <motion.div
                  key={obj.id}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-saffron/30 transition-colors"
                >
                  <div className="mt-1 shrink-0 w-7 h-7 rounded-lg bg-saffron/10 flex items-center justify-center text-saffron font-bold text-xs">
                    {obj.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-devanagari">
                      {obj.titleHi}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {obj.descHi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4">
              <Link 
                href="/mission"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-saffron to-maroon text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-saffron/20 group"
              >
                Explore All 8 Objectives (सभी उद्देश्य देखें)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-saffron/20 shadow-xl">
              <Image
                src="/images/mission.jpg"
                alt="Anjana Jat Mission"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="px-3 py-1 bg-saffron text-xs font-bold rounded-full w-fit mb-2">
                  100% Dedicated to Society
                </span>
                <p className="font-devanagari text-lg font-bold">
                  "संस्कृति, शिक्षा, किसान एवं सामाजिक उत्थान"
                </p>
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-tr from-saffron/20 to-transparent rounded-[2rem] -z-10 blur-xl opacity-50" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
