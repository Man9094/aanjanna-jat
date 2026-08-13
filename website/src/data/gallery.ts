export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "events" | "heritage" | "cultural" | "sports" | "community" | "historical";
  title: string;
  date?: string;
  width: number;
  height: number;
}

export interface GalleryAlbum {
  id: number;
  title: string;
  titleHi: string;
  cover: string;
  count: number;
  category: string;
  date: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/gallery/annual-conference-1.jpg",
    alt: "Annual Conference 2025 - Opening Ceremony",
    category: "events",
    title: "Annual Conference Opening Ceremony",
    date: "2025-10-15",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "/images/gallery/cultural-dance.jpg",
    alt: "Traditional Rajasthani folk dance performance",
    category: "cultural",
    title: "Rajasthani Folk Dance",
    date: "2025-10-15",
    width: 800,
    height: 533,
  },
  {
    id: 3,
    src: "/images/gallery/sports-kabaddi.jpg",
    alt: "Inter-district Kabaddi tournament",
    category: "sports",
    title: "Kabaddi Tournament",
    date: "2025-11-05",
    width: 800,
    height: 600,
  },
  {
    id: 4,
    src: "/images/gallery/blood-donation-camp.jpg",
    alt: "Community blood donation drive",
    category: "community",
    title: "Blood Donation Camp",
    date: "2025-08-15",
    width: 800,
    height: 533,
  },
  {
    id: 5,
    src: "/images/gallery/scholarship-ceremony.jpg",
    alt: "Scholarship distribution ceremony",
    category: "events",
    title: "Scholarship Distribution",
    date: "2025-03-15",
    width: 800,
    height: 600,
  },
  {
    id: 6,
    src: "/images/gallery/heritage-temple.jpg",
    alt: "Historic community temple",
    category: "heritage",
    title: "Community Heritage Temple",
    width: 800,
    height: 1067,
  },
  {
    id: 7,
    src: "/images/gallery/women-empowerment.jpg",
    alt: "Women empowerment workshop",
    category: "community",
    title: "Women Empowerment Workshop",
    date: "2025-09-10",
    width: 800,
    height: 533,
  },
  {
    id: 8,
    src: "/images/gallery/youth-tech-workshop.jpg",
    alt: "Youth technology workshop",
    category: "events",
    title: "Youth Tech Workshop",
    date: "2025-07-20",
    width: 800,
    height: 600,
  },
  {
    id: 9,
    src: "/images/gallery/historical-leaders.jpg",
    alt: "Historical community leaders photograph",
    category: "historical",
    title: "Community Founders",
    width: 800,
    height: 600,
  },
  {
    id: 10,
    src: "/images/gallery/holi-celebration.jpg",
    alt: "Holi festival celebration",
    category: "cultural",
    title: "Holi Celebration",
    date: "2025-03-25",
    width: 800,
    height: 533,
  },
  {
    id: 11,
    src: "/images/gallery/community-meeting.jpg",
    alt: "District level community meeting",
    category: "events",
    title: "District Community Meeting",
    date: "2025-06-15",
    width: 800,
    height: 600,
  },
  {
    id: 12,
    src: "/images/gallery/farming-workshop.jpg",
    alt: "Organic farming training workshop",
    category: "community",
    title: "Farming Workshop",
    date: "2025-04-10",
    width: 800,
    height: 533,
  },
];

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 1,
    title: "Annual Conference 2025",
    titleHi: "वार्षिक सम्मेलन 2025",
    cover: "/images/gallery/annual-conference-1.jpg",
    count: 45,
    category: "events",
    date: "2025-10-15",
  },
  {
    id: 2,
    title: "Cultural Festival",
    titleHi: "सांस्कृतिक उत्सव",
    cover: "/images/gallery/cultural-dance.jpg",
    count: 32,
    category: "cultural",
    date: "2025-10-20",
  },
  {
    id: 3,
    title: "Sports Tournament 2025",
    titleHi: "खेल प्रतियोगिता 2025",
    cover: "/images/gallery/sports-kabaddi.jpg",
    count: 28,
    category: "sports",
    date: "2025-11-05",
  },
  {
    id: 4,
    title: "Heritage Collection",
    titleHi: "विरासत संग्रह",
    cover: "/images/gallery/heritage-temple.jpg",
    count: 50,
    category: "heritage",
    date: "2025-01-01",
  },
  {
    id: 5,
    title: "Community Service Camps",
    titleHi: "सामुदायिक सेवा शिविर",
    cover: "/images/gallery/blood-donation-camp.jpg",
    count: 38,
    category: "community",
    date: "2025-08-15",
  },
  {
    id: 6,
    title: "Historical Archive",
    titleHi: "ऐतिहासिक संग्रह",
    cover: "/images/gallery/historical-leaders.jpg",
    count: 25,
    category: "historical",
    date: "2020-01-01",
  },
];
