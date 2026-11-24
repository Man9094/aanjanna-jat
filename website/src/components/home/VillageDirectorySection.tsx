"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Building2, Compass, Layers, CheckCircle2, ChevronRight, X, Award } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { aanjanaVillagesData, type VillageData } from "@/data/villages";
import { useLanguage } from "@/context/LanguageContext";

export default function VillageDirectorySection() {
  const { language, t } = useLanguage();
  const [selectedState, setSelectedState] = useState<"all" | "gujarat" | "mp" | "rajasthan">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalData, setActiveModalData] = useState<VillageData | null>(null);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return aanjanaVillagesData.filter((item) => {
      const stateMatch = selectedState === "all" || item.stateKey === selectedState;
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

  // Totals derived dynamically
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

  const getStateName = (item: VillageData) => {
    if (language === "hi") return item.stateNameHi;
    if (language === "gu") return item.stateNameGu;
    return item.stateNameEn;
  };

  const getDistrictName = (item: VillageData) => {
    if (language === "hi") return item.districtHi;
    if (language === "gu") return item.districtGu;
    return item.districtEn;
  };

  const getTalukaName = (item: VillageData) => {
    if (language === "hi") return item.talukaHi;
    if (language === "gu") return item.talukaGu;
    return item.talukaEn;
  };

  const getVillageName = (item: VillageData, index: number) => {
    if (language === "hi") return item.villagesHi[index] || item.villagesEn[index];
    if (language === "gu") return item.villagesGu[index] || item.villagesEn[index];
    return item.villagesEn[index];
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFF9EC] text-[#29211D] relative overflow-hidden" id="villages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          title={t("villageDirHeading")}
          subtitle={t("villageDirSub")}
        />

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: t("statStatesLabel"), value: `${directoryTotals.states}`, icon: Compass },
            { label: t("statDistrictsLabel"), value: `${directoryTotals.districts}`, icon: MapPin },
            { label: t("statTalukasLabel"), value: `${directoryTotals.talukas}`, icon: Building2 },
            { label: t("statVillagesLabel"), value: `${directoryTotals.villages}+`, icon: Layers },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-white border border-[#D9A52B]/40 shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center text-[#B52A12]">
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#B52A12]">{stat.value}</p>
                <p className="text-xs font-semibold text-[#5C4E46]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-2.5 rounded-2xl bg-[#FAF2E0] border border-[#D9A52B]/40">
          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { key: "all", label: t("filterAllStates") },
              { key: "gujarat", label: t("stateGujarat") },
              { key: "mp", label: t("stateMP") },
              { key: "rajasthan", label: t("stateRajasthan") },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedState(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedState === tab.key
                    ? "bg-[#B52A12] text-white shadow-sm border border-[#D9A52B]"
                    : "bg-white text-[#29211D] border border-[#D9A52B]/30 hover:bg-[#FFF9EC]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-[#5C4E46]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-[#D9A52B]/50 text-[#29211D] placeholder:text-[#5C4E46]/60 focus:outline-none focus:border-[#B52A12] text-xs font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-[#5C4E46] hover:text-[#29211D]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D9A52B]/40 space-y-3">
            <MapPin size={40} className="mx-auto text-[#B52A12]/40" />
            <h3 className="text-lg font-bold text-[#29211D] font-devanagari">
              {t("noVillagesFound")}
            </h3>
            <button
              onClick={() => {
                setSelectedState("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-bold text-[#B52A12] hover:underline"
            >
              {t("resetFilters")}
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
                className="rounded-2xl bg-white border border-[#D9A52B]/40 hover:border-[#B52A12] hover:shadow-md transition-all p-6 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 text-[#B52A12] text-[11px] font-bold">
                      {getStateName(item)}
                    </span>
                    <span className="text-[11px] font-medium text-[#5C4E46] flex items-center gap-1">
                      <MapPin size={12} className="text-[#B52A12]" />
                      {item.districtEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#29211D] group-hover:text-[#B52A12] transition-colors">
                    {getDistrictName(item)}
                  </h3>
                  <p className="text-xs text-[#5C4E46] font-medium mb-4">
                    {t("tehsilLabel")}: <span className="text-[#29211D] font-bold">{getTalukaName(item)}</span>
                  </p>

                  {item.famousHub && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/50 text-[#B52A12] text-xs font-semibold">
                      <Award size={13} />
                      {item.famousHub}
                    </div>
                  )}

                  {/* Village Badges */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-[#29211D] flex items-center justify-between">
                      <span>{t("villageListTitle")}:</span>
                      <span className="text-[11px] text-[#B52A12] font-bold">{item.villagesEn.length}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.villagesEn.slice(0, 6).map((_, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/30 text-[11px] text-[#29211D]"
                        >
                          {getVillageName(item, vIdx)}
                        </span>
                      ))}
                      {item.villagesEn.length > 6 && (
                        <span className="px-2 py-1 rounded-lg bg-white border border-[#D9A52B]/40 text-[10px] text-[#5C4E46] font-bold">
                          +{item.villagesEn.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setActiveModalData(item)}
                  className="w-full py-2.5 rounded-xl bg-[#FAF2E0] group-hover:bg-[#B52A12] group-hover:text-white border border-[#D9A52B]/40 group-hover:border-[#B52A12] text-xs font-bold text-[#29211D] transition-all flex items-center justify-center gap-2"
                >
                  <span>{t("viewVillageDetails")}</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29211D]/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-[#D9A52B] rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalData(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 flex items-center justify-center text-[#29211D] hover:bg-[#B52A12] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/40 text-[#B52A12] text-xs font-bold">
                  {getStateName(activeModalData)}
                </span>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#29211D]">
                    {getDistrictName(activeModalData)}
                  </h3>
                  <p className="text-sm text-[#B52A12] font-bold mt-1">
                    {t("tehsilLabel")}: {getTalukaName(activeModalData)}
                  </p>
                </div>

                {activeModalData.famousHub && (
                  <div className="p-3 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/50 text-[#B52A12] text-xs font-bold flex items-center gap-2">
                    <Award size={16} />
                    {activeModalData.famousHub}
                  </div>
                )}

                <div className="border-t border-[#D9A52B]/30 pt-4">
                  <h4 className="text-sm font-bold text-[#29211D] mb-3">
                    {t("villageListTitle")} ({activeModalData.villagesEn.length}):
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeModalData.villagesEn.map((_, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/30 text-xs flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#B52A12] shrink-0" />
                        <p className="font-bold text-[#29211D]">{getVillageName(activeModalData, idx)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveModalData(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#B52A12] text-white text-xs font-bold hover:bg-[#8F1F0B] border border-[#D9A52B] transition-colors"
                  >
                    {t("closeBtn")}
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