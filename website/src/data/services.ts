export interface Service {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  icon: string;
  details: string[];
  image: string;
  slug: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Education & Scholarships",
    titleHi: "शिक्षा एवं छात्रवृत्ति",
    description:
      "Providing scholarships, study materials, coaching, and educational guidance to students from economically weaker sections of the community.",
    icon: "graduation-cap",
    details: [
      "Merit-based scholarships for class 10, 12, and college students",
      "Free coaching for competitive exams (IAS, RAS, SSC, Banking)",
      "Book and study material distribution",
      "School fee assistance for underprivileged students",
      "Career counseling and guidance sessions",
      "Computer literacy programs",
    ],
    image: "/images/services/education.jpg",
    slug: "education-scholarships",
  },
  {
    id: 2,
    title: "Medical Camps & Healthcare",
    titleHi: "चिकित्सा शिविर एवं स्वास्थ्य सेवा",
    description:
      "Organizing free medical camps, health check-ups, and providing medical assistance to needy community members.",
    icon: "stethoscope",
    details: [
      "Free health check-up camps in rural areas",
      "Eye care and cataract surgery camps",
      "Dental check-up camps",
      "Medical expense assistance for critical illnesses",
      "Ambulance service for emergencies",
      "Health awareness programs",
    ],
    image: "/images/services/medical.jpg",
    slug: "medical-camps-healthcare",
  },
  {
    id: 3,
    title: "Blood Donation",
    titleHi: "रक्तदान",
    description:
      "Maintaining a community blood bank and organizing regular blood donation drives to save lives.",
    icon: "heart-pulse",
    details: [
      "Bi-annual blood donation drives",
      "Community blood donor registry",
      "Emergency blood availability network",
      "Blood group database for quick matching",
      "Collaboration with Red Cross and hospitals",
      "Blood donation awareness campaigns",
    ],
    image: "/images/services/blood-donation.jpg",
    slug: "blood-donation",
  },
  {
    id: 4,
    title: "Employment Assistance",
    titleHi: "रोजगार सहायता",
    description:
      "Connecting community youth with job opportunities, providing skill training, and supporting entrepreneurship.",
    icon: "briefcase",
    details: [
      "Job placement assistance",
      "Skill development workshops",
      "Entrepreneurship support and mentoring",
      "Government job notification alerts",
      "Resume building and interview preparation",
      "Business networking events",
    ],
    image: "/images/services/employment.jpg",
    slug: "employment-assistance",
  },
  {
    id: 5,
    title: "Marriage Assistance",
    titleHi: "विवाह सहायता",
    description:
      "Organizing community matrimonial events, providing marriage assistance to families, and running a trusted matrimonial portal.",
    icon: "heart",
    details: [
      "Community matrimonial portal",
      "Mass marriage ceremonies",
      "Financial assistance for marriages",
      "Pre-marriage counseling",
      "Verified profile matching",
      "Dowry-free marriage promotion",
    ],
    image: "/images/services/marriage.jpg",
    slug: "marriage-assistance",
  },
  {
    id: 6,
    title: "Legal Aid",
    titleHi: "कानूनी सहायता",
    description:
      "Providing free legal consultation and assistance to community members for property disputes, family matters, and other legal issues.",
    icon: "scale",
    details: [
      "Free legal consultation clinics",
      "Property dispute resolution",
      "Family law assistance",
      "Consumer rights awareness",
      "Legal aid for underprivileged",
      "RTI filing assistance",
    ],
    image: "/images/services/legal.jpg",
    slug: "legal-aid",
  },
  {
    id: 7,
    title: "Women Empowerment",
    titleHi: "महिला सशक्तिकरण",
    description:
      "Empowering women through education, skill development, self-help groups, and awareness programs.",
    icon: "users",
    details: [
      "Women self-help group formation",
      "Skill development (tailoring, handicrafts, cooking)",
      "Financial literacy workshops",
      "Health and hygiene awareness",
      "Women safety awareness campaigns",
      "Leadership development programs",
    ],
    image: "/images/services/women-empowerment.jpg",
    slug: "women-empowerment",
  },
  {
    id: 8,
    title: "Farmer Support",
    titleHi: "किसान सहायता",
    description:
      "Supporting community farmers with modern agricultural techniques, market access, and government scheme awareness.",
    icon: "wheat",
    details: [
      "Modern farming techniques training",
      "Organic farming awareness",
      "Government scheme enrollment assistance",
      "Crop insurance guidance",
      "Market linkage for better prices",
      "Farm equipment sharing cooperative",
    ],
    image: "/images/services/farmer.jpg",
    slug: "farmer-support",
  },
  {
    id: 9,
    title: "Disaster Relief",
    titleHi: "आपदा राहत",
    description:
      "Providing immediate relief and rehabilitation support during natural disasters and emergencies.",
    icon: "shield",
    details: [
      "Emergency response teams",
      "Relief material distribution",
      "Temporary shelter arrangements",
      "Financial assistance for affected families",
      "Rehabilitation support",
      "Community emergency fund",
    ],
    image: "/images/services/disaster-relief.jpg",
    slug: "disaster-relief",
  },
  {
    id: 10,
    title: "Youth Development",
    titleHi: "युवा विकास",
    description:
      "Nurturing young talent through leadership programs, sports events, cultural activities, and technology workshops.",
    icon: "rocket",
    details: [
      "Youth leadership training camps",
      "Sports tournaments and competitions",
      "Coding bootcamps and tech workshops",
      "Public speaking and debate competitions",
      "Cultural exchange programs",
      "Youth volunteer network",
    ],
    image: "/images/services/youth.jpg",
    slug: "youth-development",
  },
];
