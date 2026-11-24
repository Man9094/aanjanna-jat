import HeroSection from "@/components/home/HeroSection";
import BrandIdentitySection from "@/components/home/BrandIdentitySection";
import MissionSection from "@/components/home/MissionSection";
import VillageDirectorySection from "@/components/home/VillageDirectorySection";
import LeaderSpotlight from "@/components/home/LeaderSpotlight";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ServicesPreview from "@/components/home/ServicesPreview";
import EventsPreview from "@/components/home/EventsPreview";
import NewsPreview from "@/components/home/NewsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";

export const metadata = {
  title: "Anjana Jat Mahasabha | Official Community Portal",
  description:
    "Official portal of Anjana Jat Mahasabha. Preserving historical heritage, upholding agricultural dignity, and building educational opportunities for youth across Rajasthan, Gujarat, and Madhya Pradesh.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandIdentitySection />
      <MissionSection />
      <VillageDirectorySection />
      <LeaderSpotlight />
      <TestimonialsCarousel />
      <ServicesPreview />
      <EventsPreview />
      <NewsPreview />
      <GalleryPreview />
    </>
  );
}
