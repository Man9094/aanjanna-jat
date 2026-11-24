"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { communityExecutiveMembers } from "@/data/leaders";
import { useLanguage } from "@/context/LanguageContext";

const stateTabs = [
  { key: "all", label: "All States", labelHi: "सभी राज्य", labelGu: "બધા રાજ્યો" },
  { key: "gujarat", label: "Gujarat", labelHi: "गुजरात कार्यकारिणी", labelGu: "ગુજરાત કારોબારી" },
  { key: "mp", label: "Madhya Pradesh", labelHi: "मध्यप्रदेश कार्यकारिणी", labelGu: "મધ્યપ્રદેશ કારોબારી" },
  { key: "rajasthan", label: "Rajasthan", labelHi: "राजस्थान कार्यकारिणी", labelGu: "રાજસ્થાન કારોબારી" },
];

export default function CommunityMembersPage() {
  const { language } = useLanguage();
  const [activeState, setActiveState] = useState<string>("all");

  const filteredMembers =
    activeState === "all"
      ? communityExecutiveMembers
      : communityExecutiveMembers.filter((m) => m.state === activeState);

  return (
    <>
      <PageHero
        title={language === "hi" ? "समाज कार्यकारिणी सदस्य" : language === "gu" ? "સમાજ કારોબારી સભ્યો" : "Community Executive Members"}
        titleHi="आँजणा जाट समाज कार्यकारिणी एवं पदाधिकारी"
        subtitle={
          language === "hi"
            ? "गुजरात, मध्य प्रदेश एवं राजस्थान के प्रांतीय प्रतिनिधि, पदाधिकारी एवं विभिन्न प्रकोष्ठों के संयोजक।"
            : language === "gu"
            ? "ગુજરાત, મધ્ય પ્રદેશ અને રાજસ્થાનના પ્રાંતીય પ્રતિનિધિઓ અને હોદ્દેદારો."
            : "State executive members, convenors, and cell leaders of Anjana Jat Mahasabha across Gujarat, Madhya Pradesh, and Rajasthan."
        }
        breadcrumbs={[{ label: language === "hi" ? "समाज प्रतिनिधि" : language === "gu" ? "કારોબારી સભ્યો" : "Community Members", href: "/community-members" }]}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title={language === "hi" ? "प्रदेश कार्यकारिणी सूची" : language === "gu" ? "પ્રદેશ કારોબારી યાદી" : "State Executive Bodies"}
            titleHi="गुजरात, मध्यप्रदेश एवं राजस्थान कार्यकारिणी"
            subtitle={
              language === "hi"
                ? "गुजरात, मध्यप्रदेश एवं राजस्थान के प्राधिकृत पदाधिकारियों की प्रामाणिक सूची।"
                : language === "gu"
                ? "ગુજરાત, મધ્યપ્રદેશ અને રાજસ્થાનના અધિકૃત હોદ્દેદારોની પ્રામાણિક યાદી."
                : "Explore designated office bearers across Gujarat, Madhya Pradesh, and Rajasthan."
            }
          />

          {/* State Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {stateTabs.map((tab) => {
              const label = language === "hi" ? tab.labelHi : language === "gu" ? tab.labelGu : tab.label;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveState(tab.key)}
                  aria-pressed={activeState === tab.key}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeState === tab.key
                      ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                      : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12] hover:text-[#B52A12]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {filteredMembers.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-[#D9A52B]/40 bg-white px-6 py-14 text-center">
              <Users size={28} className="mx-auto mb-4 text-[#B52A12]" />
              <p className="text-base font-bold text-[#29211D] font-devanagari">
                {language === "hi"
                  ? "कार्यकारिणी सदस्यों का विवरण शीघ्र उपलब्ध होगा"
                  : language === "gu"
                  ? "કારોબારી સભ્યોની વિગત ટૂંક સમયમાં ઉપલબ્ધ થશે"
                  : "Executive member records will be updated soon"}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#5C4E46]">
                {language === "hi"
                  ? "महासभा कार्यालय द्वारा सत्यापित पदाधिकारियों की सूची प्राप्त होते ही यहाँ प्रकाशित की जाएगी।"
                  : language === "gu"
                  ? "મહાસભા કાર્યાલય દ્વારા પ્રમાણિત યાદી પ્રાપ્ત થયેથી અહીં પ્રકાશિત કરવામાં આવશે."
                  : "Verified office bearer records will be published here once the Mahasabha office provides them."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl p-6 border border-[#D9A52B]/35 bg-white shadow-xs hover:border-[#B52A12] transition-all"
                >
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 border-[#D9A52B] bg-[#FAF2E0] text-[#B52A12] text-2xl font-bold font-devanagari">
                      {member.nameHi.charAt(0)}
                    </div>
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#FAF2E0] text-[#B52A12] text-xs font-bold uppercase mb-1">
                        {language === "gu" ? member.designationHi : language === "hi" ? member.designationHi : member.designation}
                      </span>
                      <h3 className="text-base font-bold text-[#29211D] font-devanagari leading-snug">
                        {language === "en" ? member.name : member.nameHi}
                      </h3>
                      <p className="text-xs text-[#5C4E46] mt-0.5">
                        {member.district}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
