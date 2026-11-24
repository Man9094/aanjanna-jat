"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, Star, Shield, Users, BookOpen, Handshake } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const values = [
  {
    icon: Heart,
    titleEn: "Unity",
    titleHi: "एकता",
    titleGu: "એકતા",
    descEn: "Strengthening bonds among community members across all regions and Gotras.",
    descHi: "सभी क्षेत्रों एवं गोत्रों के समाज बंधुओं के बीच अटूट एकता व भाईचारे को सुदृढ़ करना।",
    descGu: "તમામ ક્ષેત્રો અને ગોત્રોના સમાજ બંધુઓ વચ્ચે અખંડ એકતા અને ભાઈચારો સુદ્રઢ કરવો.",
  },
  {
    icon: BookOpen,
    titleEn: "Education",
    titleHi: "शिक्षा",
    titleGu: "શિક્ષણ",
    descEn: "Promoting learning and knowledge as the foundation of progress.",
    descHi: "शिक्षा एवं ज्ञान को समाज की प्रगति और स्वाभिमान का मूल आधार बनाना।",
    descGu: "શિક્ષણ અને જ્ઞાનને સમાજની પ્રગતિ અને સ્વાભિમાનનો મુખ્ય આધાર બનાવવો.",
  },
  {
    icon: Handshake,
    titleEn: "Service",
    titleHi: "सेवा",
    titleGu: "સેવા",
    descEn: "Selfless service to the community and society at large.",
    descHi: "संसार एवं समाज के कल्याण हेतु निःस्वार्थ भाव से अनवरत सेवा।",
    descGu: "સમાજ અને સમાજના કલ્યાણ માટે નિઃસ્વાર્થ ભાવથી અવિરત સેવા.",
  },
  {
    icon: Shield,
    titleEn: "Heritage",
    titleHi: "विरासत",
    titleGu: "વારસો",
    descEn: "Preserving our rich cultural traditions and historical legacy.",
    descHi: "आँजणा समाज के गौरवशाली इतिहास और खेत-खेड़ा खाप की पावन मर्यादाओं का संरक्षण।",
    descGu: "આંજણા સમાજના ગૌરવશાળી ઇતિહાસ અને ખેત-ખેડા ખાપની મર્યાદાઓનું રક્ષણ.",
  },
  {
    icon: Star,
    titleEn: "Excellence",
    titleHi: "उत्कृष्टता",
    titleGu: "શ્રેષ્ઠતા",
    descEn: "Pursuing excellence in every community initiative we undertake.",
    descHi: "प्रत्येक सामाजिक, शैक्षणिक व प्रशासनिक प्रयास में उत्कृष्टता हासिल करना।",
    descGu: "દરેક સામાજિક, શૈક્ષણિક અને પ્રશાસનિક પ્રયાસમાં શ્રેષ્ઠતા પ્રાપ્ત કરવી.",
  },
  {
    icon: Users,
    titleEn: "Empowerment",
    titleHi: "सशक्तिकरण",
    titleGu: "સશક્તિકરણ",
    descEn: "Empowering every member with opportunities for growth.",
    descHi: "किसानों, युवाओं और महिलाओं को प्रगति के नए अवसर उपलब्ध कराना।",
    descGu: "ખેડૂતો, યુવાનો અને બહેનોને પ્રગતિની નવી તકો પૂરી પાડવી.",
  },
];

const timelineEvents = [
  {
    year: "1948",
    titleEn: "Foundation",
    titleHi: "स्थापना",
    titleGu: "સ્થાપના",
    descEn: "Anjana Jat Mahasabha was formally established with the goal of community unity and social reform.",
    descHi: "आँजणा जाट समाज के संगठन, एकता एवं सामाजिक सुधार हेतु महासभा की स्थापना।",
    descGu: "આંજણા જાટ સમાજના સંગઠન, એકતા અને સામાજિક સુધાર માટે મહાસભાની સ્થાપના.",
  },
  {
    year: "1965",
    titleEn: "Historic Convention",
    titleHi: "ऐतिहासिक महासम्मेलन",
    titleGu: "ઐતિહાસિક મહાસંમેલન",
    descEn: "First major community convention held with leaders and representatives from across states.",
    descHi: "राजस्थान एवं गुजरात के प्रतिनिधियों की उपस्थिति में ऐतिहासिक अधिवेशन।",
    descGu: "રાજસ્થાન અને ગુજરાતના પ્રતિનિધિઓની હાજરીમાં ઐતિહાસિક અધિવેશન.",
  },
  {
    year: "1980",
    titleEn: "Scholarship & Education Fund",
    titleHi: "शिक्षा एवं छात्रवृत्ति कोष",
    titleGu: "શિક્ષણ અને શિષ્યવૃત્તિ ફંડ",
    descEn: "Launch of educational programs and student support initiatives.",
    descHi: "प्रतिभावान छात्र-छात्राओं हेतु छात्रवृत्ति एवं शिक्षा सहयोग का शुभारंभ।",
    descGu: "તેજસ્વી વિદ્યાર્થીઓ માટે શિષ્યવૃત્તિ અને શૈક્ષણિક સહાયની શરૂઆત.",
  },
  {
    year: "2005",
    titleEn: "Youth & Agrarian Network",
    titleHi: "युवा एवं कृषक सशक्तिकरण",
    titleGu: "યુવા અને કૃષિ સશક્તિકરણ",
    descEn: "Formation of specialized committees for agrarian progress and youth guidance.",
    descHi: "कृषक कल्याण एवं युवा प्रतिभाओं को प्रशासनिक सेवाओं में मार्गदर्शन।",
    descGu: "ખેડૂત કલ્યાણ અને યુવા પ્રતિભાઓને સ્પર્ધાત્મક પરીક્ષાઓમાં માર્ગદર્શન.",
  },
  {
    year: "2024",
    titleEn: "Digital Identity & Global Connect",
    titleHi: "डिजिटल परिचय एवं अखिल भारतीय विस्तार",
    titleGu: "ડિજિટલ ઓળખ અને રાષ્ટ્રીય વિસ્તાર",
    descEn: "Apex digital directory, verified membership ID system, and inter-state integration.",
    descHi: "सत्यापित डिजिटल सदस्यता पहचान पत्र एवं 1000+ गाँवों की एकीकृत निर्देशिका।",
    descGu: "પ્રમાણિત ડિજિટલ સભ્યપદ ઓળખપત્ર અને 1000+ ગામોની એકીકૃત નિર્દેશિકા.",
  },
];

export default function AboutPageClient() {
  const { language, t } = useLanguage();

  return (
    <>
      <PageHero
        title={t("navAboutUs")}
        subtitle={
          language === "hi"
            ? "1948 से आँजणा जाट समाज की एकता, सांस्कृतिक विरासत और सर्वांगीण विकास हेतु समर्पित।"
            : language === "gu"
            ? "1948 થી આંજણા જાટ સમાજની એકતા, સાંસ્કૃતિક વારસો અને સર્વાંગી વિકાસ માટે સમર્પિત."
            : "Dedicated to the unity, heritage, and holistic empowerment of the Anjana Jat community."
        }
        breadcrumbs={[{ label: t("navAboutUs"), href: "/about" }]}
      />

      {/* About Introduction */}
      <section className="py-16 md:py-24 bg-[#FFF9EC] text-[#29211D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#B52A12] mb-4 font-devanagari">
                {language === "hi" ? "हमारा परिचय एवं स्वरूप" : language === "gu" ? "અમારો પરિચય" : "Who We Are"}
              </h2>
              <div className="w-16 h-1 bg-[#D9A52B] mb-6 rounded-full" />
              <div className="space-y-4 text-[#5C4E46] leading-relaxed text-sm sm:text-base">
                <p>
                  <strong className="text-[#29211D]">{t("brandTitle")}</strong>{" "}
                  {language === "hi"
                    ? "समस्त आँजणा चौधरी जाट समाज का शीर्ष प्रतिनिधि संगठन है। यह संगठन राजस्थान, गुजरात एवं मध्य प्रदेश के लाखों समाज बंधुओं को एक सूत्र में पिरोते हुए समाज के स्वाभिमान, शिक्षा और उत्थान हेतु कार्यरत है।"
                    : language === "gu"
                    ? "સમગ્ર આંજણા ચૌધરી જાટ સમાજનું સર્વોચ્ચ પ્રતિનિધિ સંગઠન છે. આ સંગઠન રાજસ્થાન, ગુજરાત અને મધ્યપ્રદેશના લાખો સમાજ બંધુઓને એકતાંતણે બાંધતા સમાજના સ્વાભિમાન, શિક્ષણ અને પ્રગતિ માટે કાર્યરત છે."
                    : "is the apex representative organization of the Anjana Chaudhari Jat community, uniting members across Rajasthan, Gujarat, and Madhya Pradesh in mutual respect, educational progress, and community empowerment."}
                </p>
                <p>
                  {language === "hi"
                    ? "हमारा ध्येय समाज के प्रामाणिक इतिहास का संरक्षण करना, कृषि और किसानों के अधिकारों की रक्षा करना, तथा युवा पीढ़ी को उच्च शिक्षा व रोजगार के श्रेष्ठ अवसर उपलब्ध कराना है।"
                    : language === "gu"
                    ? "અમારું લક્ષ્ય સમાજના પ્રામાણિક ઇતિહાસનું રક્ષણ કરવું, ખેતી અને ખેડૂતોના અધિકારોનું જતન કરવું અને નવી પેઢીને શ્રેષ્ઠ શિક્ષણ અને કારકિર્દીની તકો આપવી છે."
                    : "Our objective is to protect authentic lineage history, champion agricultural pride and farmer welfare, and open exceptional educational and vocational paths for the next generation."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border-2 border-[#D9A52B]/50 p-8 md:p-10 relative overflow-hidden shadow-sm"
            >
              <div className="relative space-y-6">
                {/* Vision */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                    <Eye size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#29211D] mb-1 font-devanagari">
                      {language === "hi" ? "हमारा दृष्टिकोण" : language === "gu" ? "અમારો દ્રષ્ટિકોણ" : "Our Vision"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
                      {language === "hi"
                        ? "एक सुदृढ़, संगठित, शिक्षित एवं व्यसनरहित आँजणा समाज का निर्माण करना जो अपनी ऐतिहासिक परंपराओं पर गर्व करते हुए राष्ट्र निर्माण में अग्रणी रहे।"
                        : language === "gu"
                        ? "એક મજબૂત, સંગઠિત, શિક્ષિત અને વ્યસનમુક્ત આંજણા સમાજનું નિર્માણ કરવું જે પોતાના ઐતિહાસિક વારસા પર ગૌરવ સાથે રાષ્ટ્ર નિર્માણમાં અગ્રેસર રહે."
                        : "To build a united, educated, addiction-free, and progressive community that honors historic heritage and plays a leading role in nation-building."}
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#B52A12]">
                    <Target size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#29211D] mb-1 font-devanagari">
                      {language === "hi" ? "हमारा ध्येय" : language === "gu" ? "અમારો સંકલ્પ" : "Our Mission"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
                      {language === "hi"
                        ? "सुलभ शिक्षा, स्वास्थ्य सहायता, आर्थिक सहयोग एवं सामाजिक समरसता के माध्यम से प्रत्येक समाज बंधु को सशक्त बनाना।"
                        : language === "gu"
                        ? "સુલભ શિક્ષણ, આરોગ્ય સહાય, આર્થિક સહયોગ અને સામાજિક સમરસતા દ્વારા દરેક સમાજ બંધુને સશક્ત બનાવવો."
                        : "To empower every community member through accessible education, healthcare support, economic networks, and cultural solidarity."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-[#FAF2E0] border-t border-[#D9A52B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={language === "hi" ? "हमारे आधारभूत मूल्य" : language === "gu" ? "અમારા પાયાના મૂલ્યો" : "Our Core Values"}
            subtitle={
              language === "hi"
                ? "वे सिद्धांत जो महासभा के प्रत्येक निर्णय और सेवा कार्य का मार्गदर्शन करते हैं।"
                : language === "gu"
                ? "તે સિદ્ધાંતો જે મહાસભાના દરેક નિર્ણય અને સેવા કાર્યનું માર્ગદર્શન કરે છે."
                : "The guiding principles behind every community initiative and decision."
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-2xl bg-white border border-[#D9A52B]/40 p-6 text-center hover:border-[#B52A12] shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center text-[#B52A12] group-hover:bg-[#B52A12] group-hover:text-white transition-colors">
                  <value.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-[#29211D] mb-1 font-devanagari">
                  {language === "hi" ? value.titleHi : language === "gu" ? value.titleGu : value.titleEn}
                </h3>
                <p className="text-xs text-[#5C4E46] leading-relaxed mt-2">
                  {language === "hi" ? value.descHi : language === "gu" ? value.descGu : value.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#FFF9EC] border-t border-[#D9A52B]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title={language === "hi" ? "गौरवशाली यात्रा के मुख्य पड़ाव" : language === "gu" ? "ગૌરવશાળી યાત્રાના મુખ્ય તબક્કા" : "Historic Milestones"}
            subtitle={
              language === "hi"
                ? "समाज सेवा, संगठन एवं उत्थान के ऐतिहासिक मील के पत्थर।"
                : language === "gu"
                ? "સમાજ સેવા અને સંગઠનના ઐતિહાસિક તબક્કાઓ."
                : "Key milestones in our history of community unity and progress."
            }
          />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#D9A52B]/40 shadow-xs"
              >
                <div className="w-16 h-12 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/60 text-[#B52A12] font-black text-sm flex items-center justify-center shrink-0">
                  {event.year}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#29211D] font-devanagari">
                    {language === "hi" ? event.titleHi : language === "gu" ? event.titleGu : event.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C4E46] mt-1 leading-relaxed">
                    {language === "hi" ? event.descHi : language === "gu" ? event.descGu : event.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}