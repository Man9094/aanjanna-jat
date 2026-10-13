"use client";

import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export default function GalleryPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Photo Gallery"
          titleHi="फोटो गैलरी"
          subtitle="Capturing moments of unity, celebration, and community service."
        />

        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <Images size={28} className="mx-auto mb-4 text-saffron" />
          <p className="text-sm text-muted-foreground">
            No photographs have been published yet. Verified photographs from the
            Mahasabha office will appear here.
          </p>
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
