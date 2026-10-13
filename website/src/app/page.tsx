import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import VillageDirectorySection from "@/components/home/VillageDirectorySection";
import LeaderSpotlight from "@/components/home/LeaderSpotlight";
import ServicesPreview from "@/components/home/ServicesPreview";
import EventsPreview from "@/components/home/EventsPreview";
import NewsPreview from "@/components/home/NewsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <VillageDirectorySection />
      <LeaderSpotlight />
      <ServicesPreview />
      <EventsPreview />
      <NewsPreview />
      <GalleryPreview />
    </>
  );
}
