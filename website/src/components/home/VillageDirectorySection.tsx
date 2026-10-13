"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Building2, Compass, Layers, CheckCircle2, ChevronRight, X, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { aanjanaVillagesData, type VillageData } from "@/data/villages";

export default function VillageDirectorySection() {
  const [selectedState, setSelectedState] = useState<"all" | "gujarat" | "mp" | "rajasthan">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalData, setActiveModalData] = useState<VillageData | null>(null);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return aanjanaVillagesData.filter((item) => {
      // State match
      const stateMatch = selectedState === "all" || item.stateKey === selectedState;

      // Query match
      if (!searchQuery.trim()) return stateMatch;
      const q = searchQuery.toLowerCase().trim();

      const inState = item.stateNameEn.toLowerCase().includes(q) || item.stateNameHi.includes(q) || item.stateNameGu.includes(q);
      const inDistrict = item.districtEn.toLowerCase().includes(q) || item.districtHi.includes(q) || item.districtGu.includes(q);
      const inTaluka = item.talukaEn.toLowerCase().includes(q) || item.talukaHi.includes(q) || item.talukaGu.includes(q);
      const inVillages =
        item.villagesEn.some((v) => v.toLowerCase().includes(q)) ||
        item.villagesHi.some((v) => v.includes(q)) ||
        item.villagesGu.some((v) => v.includes(q));

      return stateMatch && (inState || inDistrict || inTaluka || inVillages);
    });
  }, [selectedState, searchQuery]);

  // Totals are derived from the verified records above — never hard-coded.
  const directoryTotals = useMemo(() => {
    const states = new Set(aanjanaVillagesData.map((item) => item.stateKey));
    const districts = new Set(
      aanjanaVillagesData.map((item) => `${item.stateKey}-${item.districtEn}`)
    );
    const talukas = new Set(
      aanjanaVillagesData.map(
        (item) => `${item.stateKey}-${item.districtEn}-${item.talukaEn}`
      )
    );
    const villages = new Set(aanjanaVillagesData.flatMap((item) => item.villagesEn));
    return {
      states: states.size,
      districts: districts.size,
      talukas: talukas.size,
      villages: villages.size,
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden" id="villages">
      {/* Background Subtle Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-saffron/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-maroon/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Community Villages & Regions Directory"
          titleHi="आंजना चौधरी जाट समाज गाँव एवं क्षेत्र निर्देशिका"
          subtitle="Discover our prominent villages, talukas, and districts across Gujarat, Madhya Pradesh, and Rajasthan."
        />

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "States / राज्य", value: `${directoryTotals.states} States`, sub: "GJ, MP, RJ", icon: Compass, color: "text-saffron" },
            { label: "Districts / जिले", value: `${directoryTotals.districts} Districts`, sub: "प्रमुख जिले", icon: MapPin, color: "text-maroon font-semibold" },
            { label: "Talukas / तालुका", value: `${directoryTotals.talukas} Tehsils`, sub: "तालुका एवं तहसीलें", icon: Building2, color: "text-gold" },
            { label: "Villages / गाँव", value: `${directoryTotals.villages} Villages`, sub: "समाज बाहुल्य गाँव", icon: Layers, color: "text-green-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow flex items-center gap-3.5"
            >
              <div className={`w-11 h-11 shrink-0 rounded-xl bg-saffron/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl bg-card border border-border shadow-sm">
          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { key: "all", labelHi: "सभी राज्य", labelGu: "તમામ રાજ્યો", labelEn: "All States" },
              { key: "gujarat", labelHi: "गुजरात", labelGu: "ગુજરાત", labelEn: "Gujarat" },
              { key: "mp", labelHi: "मध्यप्रदेश", labelGu: "મધ્યપ્રદેશ", labelEn: "Madhya Pradesh" },
              { key: "rajasthan", labelHi: "राजस्थान", labelGu: "રાજસ્થાન", labelEn: "Rajasthan" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedState(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedState === tab.key
                    ? "bg-gradient-to-r from-saffron to-maroon text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{tab.labelHi}</span>
                <span className="text-[10px] opacity-80">({tab.labelGu})</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Village, Taluka, District..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border space-y-3">
            <MapPin size={40} className="mx-auto text-muted-foreground/50" />
            <h3 className="text-lg font-bold text-foreground font-devanagari">
              {aanjanaVillagesData.length === 0
                ? "निर्देशिका सूचना सत्यापित होने पर उपलब्ध होगी"
                : "कोई गाँव या क्षेत्र नहीं मिला"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {aanjanaVillagesData.length === 0
                ? "Directory information will be available once verified village records are added. No records have been invented to fill this list."
                : "कृपया खोज शब्द बदलकर दोबारा प्रयास करें (Try searching another village or district)."}
            </p>
            <button
              onClick={() => {
                setSelectedState("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-semibold text-saffron hover:underline"
            >
              Reset Filters / फ़िल्टर रीसेट करें
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-xl transition-all p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-[11px] font-bold uppercase tracking-wider font-devanagari">
                      {item.stateNameHi} • {item.stateNameGu}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} className="text-saffron" />
                      {item.districtEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-devanagari group-hover:text-saffron transition-colors">
                    {item.districtHi} / {item.districtGu}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium mb-4">
                    तालुका / Tehsil: <span className="text-foreground font-semibold font-devanagari">{item.talukaHi} ({item.talukaGu})</span>
                  </p>

                  {item.famousHub && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-semibold font-devanagari">
                      <Sparkles size={13} />
                      {item.famousHub}
                    </div>
                  )}

                  {/* Village Badges */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-foreground flex items-center justify-between">
                      <span>प्रमुख गाँव (Villages List):</span>
                      <span className="text-[11px] text-saffron font-bold">{item.villagesHi.length} Villages</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.villagesHi.map((vHi, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2.5 py-1 rounded-lg bg-muted hover:bg-saffron/15 hover:text-saffron border border-border text-[11px] font-devanagari text-foreground transition-colors"
                        >
                          {vHi} <span className="text-[10px] text-muted-foreground">({item.villagesGu[vIdx]})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <button
                  onClick={() => setActiveModalData(item)}
                  className="w-full py-2.5 rounded-xl bg-muted group-hover:bg-saffron group-hover:text-white border border-border group-hover:border-saffron text-xs font-semibold text-foreground transition-all flex items-center justify-center gap-2"
                >
                  <span>विस्तृत विवरण देखें (View All Details)</span>
                  <ChevronRight size={15} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Dialog */}
      <AnimatePresence>
        {activeModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalData(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold font-devanagari">
                  {activeModalData.stateNameHi} • {activeModalData.stateNameGu} ({activeModalData.stateNameEn})
                </span>

                <div>
                  <h3 className="text-2xl font-bold text-foreground font-devanagari">
                    {activeModalData.districtHi} ({activeModalData.districtGu})
                  </h3>
                  <p className="text-sm text-saffron font-semibold font-devanagari mt-1">
                    तालुका / Tehsil: {activeModalData.talukaHi} • {activeModalData.talukaGu} ({activeModalData.talukaEn})
                  </p>
                </div>

                {activeModalData.famousHub && (
                  <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs font-bold font-devanagari flex items-center gap-2">
                    <Sparkles size={16} />
                    {activeModalData.famousHub}
                  </div>
                )}

                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-bold text-foreground font-devanagari mb-3">
                    आंजना चौधरी समाज गाँव सूची ({activeModalData.villagesHi.length} गाँव):
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeModalData.villagesHi.map((vHi, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-muted border border-border text-xs flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-saffron shrink-0" />
                        <div>
                          <p className="font-bold text-foreground font-devanagari">{vHi}</p>
                          <p className="text-[10px] text-muted-foreground">{activeModalData.villagesGu[idx]} • {activeModalData.villagesEn[idx]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveModalData(null)}
                    className="px-6 py-2.5 rounded-xl bg-saffron text-white text-xs font-semibold hover:bg-saffron-dark transition-colors"
                  >
                    बंद करें (Close)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
