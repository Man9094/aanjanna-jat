"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const galleryPreviewItems = [
  { id: 1, span: "col-span-2 row-span-2", label: "Annual Conference" },
  { id: 2, span: "col-span-1 row-span-1", label: "Cultural Fest" },
  { id: 3, span: "col-span-1 row-span-1", label: "Sports Day" },
  { id: 4, span: "col-span-1 row-span-1", label: "Scholarship" },
  { id: 5, span: "col-span-1 row-span-1", label: "Heritage" },
  { id: 6, span: "col-span-2 row-span-1", label: "Community Service" },
];

const gradients = [
  "from-saffron/30 to-maroon/20",
  "from-gold/30 to-saffron/20",
  "from-maroon/30 to-gold/20",
  "from-saffron/20 to-gold/30",
  "from-maroon/20 to-saffron/30",
  "from-gold/20 to-maroon/30",
];

export default function GalleryPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Photo Gallery"
          titleHi="फोटो गैलरी"
          subtitle="Capturing moments of unity, celebration, and community service."
        />

        <div className="grid grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[160px]">
          {galleryPreviewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`${item.span} group relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${gradients[index]}`}
            >
              <div className="absolute inset-0 cultural-pattern opacity-20" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <Images size={24} className="text-white mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-saffron text-saffron font-medium hover:bg-saffron hover:text-white transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
