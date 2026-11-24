"use client";

import { motion } from "framer-motion";
import { Crown, Calendar } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const timelineEvents = [
  {
    year: "प्राचीन काल",
    yearEn: "Ancient Era",
    titleHi: "आँजणा क्षत्रिय कुल की उत्पत्ति",
    titleGu: "આંજણા ક્ષત્રિય કુળની ઉત્પત્તિ",
    titleEn: "Origins of the Anjana Kshatriya Community",
    descriptionHi: "आँजणा समाज का इतिहास प्राचीन राजपूताना के सूर्यवंशी एवं चंद्रवंशी क्षत्रिय योद्धाओं से जुड़ा है। कृषि कर्म और शौर्य दोनों इस समाज के गौरवशाली आधार रहे हैं।",
    descriptionGu: "આંજણા સમાજનો ઇતિહાસ પ્રાચીન ક્ષત્રિય યોદ્ધાઓ સાથે જોડાયેલો છે. ખેતી અને શૌર્ય બંને આ સમાજના ગૌરવશાળી આધારસ્તંભ રહ્યા છે.",
    descriptionEn: "The Anjana community traces its lineage to the ancient warriors of Rajputana, combining agrarian dignity with historical valour."
  },
  {
    year: "मध्यकाल",
    yearEn: "Medieval Period",
    titleHi: "खेत-खेड़ा खाप व्यवस्था की स्थापना",
    titleGu: "ખેત-ખેડા ખાપ વ્યવસ્થાની સ્થાપના",
    titleEn: "Establishment of Khet-Kheda Khap System",
    descriptionHi: "मध्यकाल में राजस्थान एवं गुजरात के क्षेत्रों में स्वशासित ग्रामीण पंचायतों एवं खाप व्यवस्था का सुदृढ़ीकरण हुआ, जिसने सामाजिक मर्यादा और न्याय को सुरक्षित रखा।",
    descriptionGu: "મધ્યકાળમાં રાજસ્થાન અને ગુજરાતના વિસ્તારોમાં સ્વશાસિત ગ્રામ પંચાયતો અને ખાપ વ્યવસ્થા મજબૂત બની, જેણે સામાજિક ન્યાય સુરક્ષિત રાખ્યો.",
    descriptionEn: "Self-governing village councils and the Khet-Kheda Khap tradition fostered democratic governance and community unity."
  },
  {
    year: "1857",
    yearEn: "1857",
    titleHi: "स्वाधीनता संग्राम में योगदान",
    titleGu: "સ્વાતંત્ર્ય સંગ્રામમાં યોગદાન",
    titleEn: "Contribution to Freedom Movement",
    descriptionHi: "प्रथम स्वतंत्रता संग्राम और उसके बाद के राष्ट्रीय आंदोलनों में आँजणा समाज के वीरों ने मातृभूमि की रक्षा हेतु अग्रणी भूमिका निभाई।",
    descriptionGu: "પ્રથમ સ્વાતંત્ર્ય સંગ્રામ અને રાષ્ટ્રીય આંદોલનોમાં આંજણા સમાજના વીરોએ માતૃભૂમિના રક્ષણ માટે સક્રિય ભૂમિકા ભજવી.",
    descriptionEn: "Community ancestors actively participated in India's independence movement, demonstrating immense sacrifice and patriotism."
  },
  {
    year: "1948",
    yearEn: "1948",
    titleHi: "आँजणा जाट महासभा का औपचारिक गठन",
    titleGu: "આંજણા જાટ મહાસભાનું ઔપચારિક ગઠન",
    titleEn: "Formal Foundation of the Mahasabha",
    descriptionHi: "आजादी के पश्चात समाज के समस्त गोत्रों, क्षेत्रों और ग्रामों को एक संगठनात्मक छतरी के नीचे लाने हेतु महासभा की स्थापना की गई।",
    descriptionGu: "આઝાદી પછી સમાજના તમામ ગોત્રો, વિસ્તારો અને ગામોને એક સંગઠન હેઠળ લાવવા માટે મહાસભાની સ્થાપના કરવામાં આવી.",
    descriptionEn: "The Anjana Jat Mahasabha was formally established after independence to unite the community across states under a single banner."
  },
  {
    year: "वर्तमान",
    yearEn: "Present Day",
    titleHi: "आधुनिक शिक्षा, डिजिटलीकरण एवं सर्वांगीण विकास",
    titleGu: "આધુનિક શિક્ષણ, ડિજિટાઇઝેશન અને સર્વાંગી વિકાસ",
    titleEn: "Modern Education & Digital Community Portal",
    descriptionHi: "आज महासभा डिजिटल पहचान पत्र, प्रामाणिक गाँव निर्देशिका, मेधावी छात्रवृत्ति और युवाओं के प्रशासनिक मार्गदर्शन में अग्रणी है।",
    descriptionGu: "આજે મહાસભા ડિજિટલ ઓળખપત્ર, પ્રમાણિત ગામ ડિરેક્ટરી, શિષ્યવૃત્તિ અને યુવાનોના માર્ગદર્શનમાં અગ્રેસર છે.",
    descriptionEn: "Today the Mahasabha leads through digital membership badges, verified village registries, and student empowerment initiatives."
  },
];

export default function HistoryPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        title={language === "hi" ? "हमारा गौरवशाली इतिहास" : language === "gu" ? "આપણો ગૌરવશાળી ઇતિહાસ" : "Our Glorious History"}
        titleHi="आँजणा जाट समाज ऐतिहासिक विरासत"
        subtitle={
          language === "hi"
            ? "शौर्य, कृषि स्वाभिमान, खेत-खेड़ा खाप मर्यादा एवं सामाजिक समरसता की सदियों पुरानी गौरवगाथा।"
            : language === "gu"
            ? "શૌર્ય, કૃષિ સ્વાભિમાન અને સામાજિક સમરસતાની સદીઓ જૂની ગૌરવગાથા."
            : "A journey through centuries of valor, agrarian dignity, and community heritage."
        }
        breadcrumbs={[
          { label: language === "hi" ? "परिचय" : language === "gu" ? "પરિચય" : "About", href: "/about" },
          { label: language === "hi" ? "इतिहास" : language === "gu" ? "ઇતિહાસ" : "History", href: "/history" }
        ]}
      />

      {/* History Intro */}
      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#B52A12] mb-4 font-display">
              {language === "hi"
                ? "त्याग, शौर्य और स्वाभिमान का अमर इतिहास"
                : language === "gu"
                ? "ત્યાગ, શૌર્ય અને સ્વાભિમાનનો અમર ઇતિહાસ"
                : "A Heritage of Courage, Cultivation & Solidarity"}
            </h2>
            <div className="w-20 h-0.5 bg-[#D9A52B] mx-auto mb-6" />
            <p className="text-sm sm:text-base text-[#5C4E46] leading-relaxed">
              {language === "hi"
                ? "आँजणा जाट समाज का इतिहास सदियों पुराना और गौरव से परिपूर्ण है। प्राचीन क्षत्रिय परंपराओं से लेकर आधुनिक प्रगतिशील समाज तक, हमारे पूर्वजों ने हमेशा मातृभूमि की रक्षा, कृषि स्वाभिमान और सामाजिक न्याय को सर्वोपरि रखा है।"
                : language === "gu"
                ? "આંજણા જાટ સમાજનો ઇતિહાસ સદીઓ જૂનો અને ગૌરવપૂર્ણ છે. પ્રાચીન ક્ષત્રિય પરંપરાઓથી લઈને આધુનિક પ્રગતિશીલ સમાજ સુધી, આપણા પૂર્વજોએ હંમેશા માતૃભૂમિની રક્ષા, કૃષિ સ્વાભિમાન અને સામાજિક ન્યાયને સર્વોપરી રાખ્યો છે."
                : "The Anjana Jat community has a rich and storied history spanning centuries. From ancient warriors to modern agrarian innovators, our community has consistently stood at the forefront of social progress and cultural preservation."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#FAF2E0]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "ऐतिहासिक यात्रा के प्रमुख पड़ाव" : language === "gu" ? "ઐતિહાસિક યાત્રાના મુખ્ય તબક્કા" : "Historical Milestones"}
            titleHi="कालक्रम एवं ऐतिहासिक संदर्भ"
          />

          <div className="relative mt-12">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D9A52B]/50" />

            <div className="space-y-10">
              {timelineEvents.map((event, index) => {
                const yearLabel = language === "en" ? event.yearEn : event.year;
                const titleLabel = language === "hi" ? event.titleHi : language === "gu" ? event.titleGu : event.titleEn;
                const descLabel = language === "hi" ? event.descriptionHi : language === "gu" ? event.descriptionGu : event.descriptionEn;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={`relative flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#B52A12] border-2 border-[#D9A52B] transform -translate-x-2 mt-1 z-10 shadow-xs" />
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] bg-white p-5 rounded-2xl border border-[#D9A52B]/35 shadow-xs ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2E0] text-[#B52A12] text-xs font-bold mb-2">
                        <Calendar size={13} className="text-[#D9A52B]" />
                        {yearLabel}
                      </span>
                      <h3 className="text-base font-bold text-[#29211D] font-display">{titleLabel}</h3>
                      <p className="text-xs text-[#5C4E46] mt-1.5 leading-relaxed">{descLabel}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
