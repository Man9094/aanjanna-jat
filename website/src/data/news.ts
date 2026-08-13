export interface NewsArticle {
  id: number;
  title: string;
  titleHi: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "announcement" | "press" | "notice" | "achievement" | "general";
  image: string;
  slug: string;
  featured: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Aanjana Jat Mahasabha Launches Digital Membership Portal",
    titleHi: "आंजना जाट महासभा ने डिजिटल सदस्यता पोर्टल लॉन्च किया",
    excerpt:
      "In a move towards digital transformation, the Mahasabha has launched an online membership registration system with digital ID cards and QR verification.",
    content:
      "The Aanjana Jat Mahasabha has taken a significant step towards modernization by launching its new Digital Membership Portal. The portal allows community members to register online, receive digital membership cards with QR codes, and access various community services digitally...",
    date: "2026-08-10",
    author: "Media Cell",
    category: "announcement",
    image: "/images/news/digital-portal.jpg",
    slug: "digital-membership-portal-launch",
    featured: true,
  },
  {
    id: 2,
    title: "500 Students Receive Scholarships in Annual Ceremony",
    titleHi: "वार्षिक समारोह में 500 छात्रों को छात्रवृत्ति प्रदान की गई",
    excerpt:
      "The annual scholarship distribution ceremony saw record 500 scholarships being awarded to meritorious students from across 8 states.",
    content:
      "In a grand ceremony held at the Town Hall, Jaipur, the Aanjana Jat Mahasabha awarded scholarships to 500 deserving students. The scholarships, ranging from ₹5,000 to ₹50,000, were given to students excelling in academics, sports, and social service...",
    date: "2026-07-28",
    author: "Education Committee",
    category: "achievement",
    image: "/images/news/scholarship-ceremony.jpg",
    slug: "500-students-scholarship-ceremony",
    featured: true,
  },
  {
    id: 3,
    title: "Community Blood Donation Drive Collects 800 Units",
    titleHi: "सामुदायिक रक्तदान अभियान में 800 यूनिट रक्त एकत्र",
    excerpt:
      "The bi-annual blood donation camp organized in collaboration with Red Cross collected a record 800 units of blood from community volunteers.",
    content:
      "The Aanjana Jat Mahasabha's bi-annual blood donation drive was a resounding success, with 800 community members donating blood at 12 centers across Rajasthan and Gujarat...",
    date: "2026-07-15",
    author: "Health Committee",
    category: "achievement",
    image: "/images/news/blood-drive.jpg",
    slug: "blood-donation-drive-800-units",
    featured: false,
  },
  {
    id: 4,
    title: "Annual Conference 2026 Announced for October",
    titleHi: "वार्षिक सम्मेलन 2026 अक्टूबर में घोषित",
    excerpt:
      "The National Executive Committee has announced that the Annual Mahasabha Conference 2026 will be held in Jaipur on October 15th.",
    content:
      "The Annual Mahasabha Conference 2026 has been officially scheduled for October 15, 2026 at the Rajasthan International Center, Jaipur. The conference will feature keynote addresses, community development workshops, and elections for committee positions...",
    date: "2026-07-05",
    author: "General Secretary",
    category: "announcement",
    image: "/images/news/conference-announcement.jpg",
    slug: "annual-conference-2026-announced",
    featured: false,
  },
  {
    id: 5,
    title: "New Community Center Inaugurated in Udaipur",
    titleHi: "उदयपुर में नया सामुदायिक केंद्र का उद्घाटन",
    excerpt:
      "A state-of-the-art community center has been inaugurated in Udaipur, featuring a library, computer lab, and meeting halls.",
    content:
      "The Aanjana Jat Mahasabha inaugurated its newest community center in Udaipur, Rajasthan. The center, built at a cost of ₹2.5 crore, features a modern library, computer training lab, multipurpose hall, and community kitchen...",
    date: "2026-06-20",
    author: "Media Cell",
    category: "press",
    image: "/images/news/community-center.jpg",
    slug: "new-community-center-udaipur",
    featured: false,
  },
  {
    id: 6,
    title: "Community Census 2026 Data Collection Begins",
    titleHi: "सामुदायिक जनगणना 2026 डेटा संग्रह शुरू",
    excerpt:
      "The Mahasabha has begun its community census initiative to create a comprehensive database of all community members across India.",
    content:
      "The Aanjana Jat Mahasabha has initiated its ambitious Community Census 2026 project. Trained volunteers will visit households across all states to collect demographic, educational, and economic data of community members...",
    date: "2026-06-01",
    author: "Census Committee",
    category: "notice",
    image: "/images/news/census.jpg",
    slug: "community-census-2026-begins",
    featured: false,
  },
];
