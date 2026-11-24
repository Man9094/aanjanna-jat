"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";

export default function TestimonialsCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const { language, t } = useLanguage();

  const getTestimonialName = (item: Testimonial) => {
    if (language === "hi") return item.nameHi;
    if (language === "gu") return item.nameGu;
    return item.name;
  };

  const getTestimonialLocation = (item: Testimonial) => {
    if (language === "hi") return item.locationHi;
    if (language === "gu") return item.locationGu;
    return item.location;
  };

  const getTestimonialDesignation = (item: Testimonial) => {
    if (language === "hi") return item.designationHi;
    if (language === "gu") return item.designationGu;
    return item.designation;
  };

  const getTestimonialQuote = (item: Testimonial) => {
    if (language === "hi") return item.quoteHi;
    if (language === "gu") return item.quoteGu;
    return item.quote;
  };

  return (
    <section className="py-20 bg-[#FAF2E0] text-[#29211D] border-t border-[#D9A52B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs sm:text-sm font-bold text-[#B52A12] uppercase tracking-wider block mb-2 px-3.5 py-1 rounded-full bg-white border border-[#D9A52B]/40 inline-block">
            {language === "hi"
              ? "प्रबुद्ध विचार एवं जनअनुभव"
              : language === "gu"
              ? "પ્રબુદ્ધ વિચારો અને અનુભવ"
              : "Voices of Leadership & Elders"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#B52A12] tracking-tight font-display">
            {language === "hi"
              ? "समाज के प्रबुद्ध प्रतिनिधियों के विचार"
              : language === "gu"
              ? "સમાજના પ્રબુદ્ધ પ્રતિનિધિઓના વિચારો"
              : "Community Council Perspectives"}
          </h2>
          <div className="w-16 h-1 bg-[#D9A52B] rounded-full mt-3" />
        </div>

        {/* Newspaper-Grade Broadsheet Gazette Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Asymmetric Left Editorial Column (4 Cols) */}
          <div className="lg:col-span-4 bg-[#FFF9EC] p-6 sm:p-8 rounded-2xl border border-[#D9A52B]/40">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center text-[#B52A12] mb-4">
              <Quote size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#29211D] leading-snug mb-3 font-display">
              {language === "hi"
                ? "निष्ठा, स्वाभिमान और सेवा का साझा संकल्प"
                : language === "gu"
                ? "નિષ્ઠા, સ્વાભિમાન અને સેવાનો સંકલ્પ"
                : "A Shared Commitment to Dignity and Community Service"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
              {language === "hi"
                ? "राजस्थान, गुजरात और मध्य प्रदेश के गाँव-खेड़ों में सक्रिय समाज सुधारक और शिक्षाविद् महासभा के मार्गदर्शन में जमीनी स्तर पर सेवा कार्य कर रहे हैं।"
                : language === "gu"
                ? "રાજસ્થાન, ગુજરાત અને મધ્ય પ્રદેશના ગામોમાં સક્રિય સમાજસેવકો અને કેળવણીકારો મહાસભાના માર્ગદર્શન હેઠળ સેવા કાર્ય કરી રહ્યા છે."
                : "Active reformers, agrarian leaders, and education trustees across Rajasthan, Gujarat, and Madhya Pradesh collaborate under the Mahasabha framework."}
            </p>
            <div className="mt-6 pt-5 border-t border-[#D9A52B]/30 flex items-center justify-between text-xs text-[#5C4E46]">
              <span className="font-semibold text-[#B52A12]">
                {language === "hi" ? "सत्यापित वक्तव्य" : language === "gu" ? "પ્રમાણિત નિવેદન" : "Verified Record"}
              </span>
              <span>{language === "hi" ? "३ प्रमुख राज्य" : language === "gu" ? "૩ મુખ્ય રાજ્યો" : "3 Major States"}</span>
            </div>
          </div>

          {/* Right Column: Clean Horizontal List Rows with 0.5px Hairline Dividers (8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-[#D9A52B]/35">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  delay: index * 0.08,
                }}
                className="py-6 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B52A12]" />
                    <h4 className="text-base sm:text-lg font-bold text-[#29211D]">
                      {getTestimonialName(item)}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#B52A12]">
                    {getTestimonialLocation(item)}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#D9A52B] mb-2">
                  {getTestimonialDesignation(item)}
                </p>

                <blockquote className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed italic pl-4 border-l-2 border-[#D9A52B]">
                  &ldquo;{getTestimonialQuote(item)}&rdquo;
                </blockquote>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}