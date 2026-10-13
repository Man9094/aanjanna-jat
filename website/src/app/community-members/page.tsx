"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { communityExecutiveMembers } from "@/data/leaders";

const stateTabs = [
  { key: "all", label: "All States", labelHi: "सभी राज्य", labelGu: "બધા રાજ્યો" },
  { key: "gujarat", label: "Gujarat", labelHi: "गुजरात कार्यकारिणी", labelGu: "ગુજરાત કારોબારી" },
  { key: "mp", label: "Madhya Pradesh", labelHi: "मध्यप्रदेश कार्यकारिणी", labelGu: "મધ્યપ્રદેશ કારોબારી" },
  { key: "rajasthan", label: "Rajasthan", labelHi: "राजस्थान कार्यकारिणी", labelGu: "રાજસ્થાન કારોબારી" },
];

export default function CommunityMembersPage() {
  const [activeState, setActiveState] = useState<string>("all");

  const filteredMembers =
    activeState === "all"
      ? communityExecutiveMembers
      : communityExecutiveMembers.filter((m) => m.state === activeState);

  return (
    <>
      <PageHero
        title="Community Executive Members"
        titleHi="आंजना जाट समाज कार्यकारिणी एवं पदाधिकारी"
        subtitle="State executive members, convenors, and cell leaders of Anjana Jat Mahasabha across Gujarat, Madhya Pradesh, and Rajasthan."
        breadcrumbs={[{ label: "Community Members", href: "/community-members" }]}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="State Executive Bodies / प्रदेश कार्यकारिणी"
            titleHi="गुजरात, मध्यप्रदेश एवं राजस्थान कार्यकारिणी सूची"
            subtitle="Explore designated office bearers across Gujarat, Madhya Pradesh, and Rajasthan."
          />

          {/* State Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {stateTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveState(tab.key)}
                aria-pressed={activeState === tab.key}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeState === tab.key
                    ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-lg shadow-saffron/20"
                    : "bg-card border border-border text-muted-foreground hover:text-saffron hover:border-saffron/40"
                }`}
              >
                {tab.label}{" "}
                <span className="text-xs font-devanagari opacity-90">({tab.labelGu})</span>
              </button>
            ))}
          </div>

          {filteredMembers.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
              <Users size={28} className="mx-auto mb-4 text-saffron" />
              <p className="text-sm font-bold text-foreground font-devanagari">
                कार्यकारिणी सदस्यों की सूची उपलब्ध नहीं है
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                No verified office bearer records available yet. Names will be
                published here once the Mahasabha office supplies them.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl p-6 border border-border bg-card hover:border-saffron/40 hover:shadow-xl transition-all"
                >
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 border-gold/40 bg-gradient-to-br from-saffron to-maroon text-white text-2xl font-bold font-devanagari">
                      {member.nameHi.charAt(0)}
                    </div>
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-maroon/10 text-maroon text-xs font-extrabold uppercase mb-1">
                        {member.designationHi}
                      </span>
                      <h3 className="text-base font-bold text-foreground font-devanagari leading-snug">
                        {member.nameHi}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {member.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
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
