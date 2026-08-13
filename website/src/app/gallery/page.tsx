"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { galleryImages, galleryAlbums } from "@/data/gallery";

const categories = [
  { key: "all", label: "All" },
  { key: "events", label: "Events" },
  { key: "heritage", label: "Heritage" },
  { key: "cultural", label: "Cultural" },
  { key: "sports", label: "Sports" },
  { key: "community", label: "Community" },
  { key: "historical", label: "Historical" },
];

const gradients = [
  "from-saffron/30 to-maroon/20",
  "from-gold/30 to-saffron/20",
  "from-maroon/30 to-gold/20",
  "from-saffron/20 to-gold/30",
  "from-maroon/20 to-saffron/30",
  "from-gold/20 to-maroon/30",
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"photos" | "albums">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = galleryImages.filter(
    (img) => filter === "all" || img.category === filter
  );

  return (
    <>
      <PageHero
        title="Photo Gallery"
        titleHi="फोटो गैलरी"
        subtitle="Capturing moments of unity, celebration, heritage, and community service."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setView("photos")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${view === "photos" ? "bg-gradient-to-r from-saffron to-maroon text-white" : "bg-card border border-border text-muted-foreground"}`}
            >
              Photos
            </button>
            <button
              onClick={() => setView("albums")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${view === "albums" ? "bg-gradient-to-r from-saffron to-maroon text-white" : "bg-card border border-border text-muted-foreground"}`}
            >
              Albums
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === cat.key
                    ? "bg-saffron/10 text-saffron border border-saffron/30"
                    : "bg-muted text-muted-foreground hover:text-saffron"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

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
                  <div className="absolute inset-0 cultural-pattern opacity-20" />
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
                    <div className="absolute inset-0 cultural-pattern opacity-20" />
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            <div className="max-w-4xl w-full text-center">
              <div className={`rounded-2xl bg-gradient-to-br ${gradients[lightbox % gradients.length]} aspect-video mx-auto mb-4`}>
                <div className="w-full h-full cultural-pattern opacity-20 rounded-2xl" />
              </div>
              <p className="text-white font-medium text-lg">{filtered[lightbox]?.title}</p>
              <p className="text-white/50 text-sm capitalize">{filtered[lightbox]?.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
