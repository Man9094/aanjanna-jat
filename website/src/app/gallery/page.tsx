"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { galleryImages, galleryAlbums } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { key: "all", labelEn: "All Photos", labelHi: "सभी चित्र", labelGu: "તમામ તસવીરો" },
  { key: "events", labelEn: "Events", labelHi: "समारोह", labelGu: "સમારોહ" },
  { key: "heritage", labelEn: "Heritage", labelHi: "विरासत", labelGu: "વારસો" },
  { key: "cultural", labelEn: "Cultural", labelHi: "सांस्कृतिक", labelGu: "સાંસ્કૃતિક" },
  { key: "sports", labelEn: "Sports", labelHi: "खेलकूद", labelGu: "રમતગમત" },
  { key: "community", labelEn: "Community", labelHi: "समाज सेवा", labelGu: "સમાજ સેવા" },
  { key: "historical", labelEn: "Historical", labelHi: "ऐतिहासिक", labelGu: "ઐતિહાસિક" },
];

const gradients = [
  "from-[#FAF2E0] to-[#FFF9EC]",
  "from-[#FFF9EC] to-[#FAF2E0]",
  "from-[#FAF2E0] to-[#FAF2E0]",
  "from-[#FFF9EC] to-[#FFF9EC]",
];

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"photos" | "albums">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = galleryImages.filter(
    (img) => filter === "all" || img.category === filter
  );

  return (
    <>
      <PageHero
        title={language === "hi" ? "चित्र दीर्घा" : language === "gu" ? "ચિત્ર દીર્ઘા" : "Photo Gallery"}
        titleHi="आँजणा जाट महासभा ऐतिहासिक छायाचित्र"
        subtitle={
          language === "hi"
            ? "एकता, सामाजिक सम्मेलन, ऐतिहासिक धरोहर एवं जनसेवा के यादगार पल।"
            : language === "gu"
            ? "એકતા, સામાજિક સંમેલનો અને જનસેવાના ઐતિહાસિક ક્ષણો."
            : "Capturing moments of unity, celebration, heritage, and community service."
        }
        breadcrumbs={[
          { label: language === "hi" ? "गैलरी" : language === "gu" ? "ગેલેરી" : "Gallery", href: "/gallery" }
        ]}
      />

      <section className="py-16 md:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setView("photos")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                view === "photos"
                  ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                  : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12]"
              }`}
            >
              {language === "hi" ? "तस्वीरें" : language === "gu" ? "તસવીરો" : "Photos"}
            </button>
            <button
              onClick={() => setView("albums")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                view === "albums"
                  ? "bg-[#B52A12] text-white border border-[#D9A52B] shadow-sm"
                  : "bg-white border border-[#29211D]/15 text-[#29211D] hover:border-[#B52A12]"
              }`}
            >
              {language === "hi" ? "एल्बम" : language === "gu" ? "આલ્બમ" : "Albums"}
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const label = language === "hi" ? cat.labelHi : language === "gu" ? cat.labelGu : cat.labelEn;
              return (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    filter === cat.key
                      ? "bg-[#FAF2E0] text-[#B52A12] border border-[#D9A52B]"
                      : "bg-white border border-[#29211D]/10 text-[#5C4E46] hover:text-[#B52A12]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {(view === "photos" ? filtered.length === 0 : galleryAlbums.length === 0) && (
            <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-[#D9A52B]/40 bg-white px-6 py-14 text-center">
              <Images size={28} className="mx-auto mb-4 text-[#B52A12]" />
              <p className="text-sm font-bold text-[#29211D]">
                {t("galleryPlaceholder")}
              </p>
              <p className="text-xs text-[#5C4E46] mt-1">
                {language === "hi"
                  ? "सत्यापित छायाचित्र शीघ्र ही यहाँ प्रदर्शित किए जाएंगे।"
                  : language === "gu"
                  ? "પ્રમાણિત તસવીરો ટૂંક સમયમાં અહીં ઉપલબ્ધ થશે."
                  : "Verified event archives will be displayed here once curated."}
              </p>
            </div>
          )}

          {view === "photos" ? (
            /* Photo Grid */
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${gradients[index % gradients.length]} break-inside-avoid`}
                  style={{ aspectRatio: `${img.width}/${img.height}` }}
                  onClick={() => setLightbox(index)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <p className="text-white font-medium text-sm">{img.title}</p>
                      <p className="text-white/60 text-xs capitalize">{img.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Albums Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {galleryAlbums
                .filter((a) => filter === "all" || a.category === filter)
                .map((album, index) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${gradients[index % gradients.length]} aspect-[4/3]`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <h3 className="text-white font-semibold text-lg">{album.title}</h3>
                      <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
                        <Images size={14} />
                        <span>{album.count} Photos</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
