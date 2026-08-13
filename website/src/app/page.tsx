import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesPreview from "@/components/home/ServicesPreview";
import EventsPreview from "@/components/home/EventsPreview";
import NewsPreview from "@/components/home/NewsPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <ServicesPreview />
      <EventsPreview />
      <TestimonialsCarousel />
      <NewsPreview />
      <GalleryPreview />
    </>
  );
}
