export interface Leader {
  id: number;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  bio: string;
  image: string;
  phone?: string;
  email?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  category: "national" | "youth" | "women" | "district";
}

export const leaders: Leader[] = [
  {
    id: 1,
    name: "Shri Rameshwar Lal Aanjana",
    nameHi: "श्री रामेश्वर लाल आंजना",
    designation: "National President",
    designationHi: "राष्ट्रीय अध्यक्ष",
    bio: "A visionary leader with over 30 years of community service. Shri Rameshwar Lal Aanjana has been instrumental in uniting the Aanjana Jat community across India, championing education, social welfare, and cultural preservation.",
    image: "/images/leaders/president.jpg",
    email: "president@aanjanajatmahasabha.org",
    social: {
      facebook: "#",
      twitter: "#",
    },
    category: "national",
  },
  {
    id: 2,
    name: "Shri Bhagwan Singh Aanjana",
    nameHi: "श्री भगवान सिंह आंजना",
    designation: "Vice President",
    designationHi: "उपाध्यक्ष",
    bio: "Dedicated to community development and youth empowerment. Shri Bhagwan Singh has organized over 100 community events and spearheaded multiple scholarship programs for underprivileged students.",
    image: "/images/leaders/vice-president.jpg",
    social: {
      facebook: "#",
    },
    category: "national",
  },
  {
    id: 3,
    name: "Shri Mohan Lal Aanjana",
    nameHi: "श्री मोहन लाल आंजना",
    designation: "General Secretary",
    designationHi: "महामंत्री",
    bio: "An accomplished administrator who has been pivotal in organizing the Mahasabha's activities across 12 states. Known for his meticulous planning and execution of large-scale community events.",
    image: "/images/leaders/secretary.jpg",
    email: "secretary@aanjanajatmahasabha.org",
    social: {
      facebook: "#",
      linkedin: "#",
    },
    category: "national",
  },
  {
    id: 4,
    name: "Shri Kailash Chand Aanjana",
    nameHi: "श्री कैलाश चंद आंजना",
    designation: "Treasurer",
    designationHi: "कोषाध्यक्ष",
    bio: "A trusted financial steward of the community. With a background in commerce, Shri Kailash Chand ensures transparent and accountable management of all community funds and donations.",
    image: "/images/leaders/treasurer.jpg",
    social: {
      facebook: "#",
    },
    category: "national",
  },
  {
    id: 5,
    name: "Shri Vikram Singh Aanjana",
    nameHi: "श्री विक्रम सिंह आंजना",
    designation: "Youth Wing President",
    designationHi: "युवा प्रकोष्ठ अध्यक्ष",
    bio: "A dynamic young leader passionate about technology, education, and employment opportunities for community youth. Under his leadership, the youth wing has launched coding bootcamps, career counseling sessions, and sports tournaments.",
    image: "/images/leaders/youth-president.jpg",
    social: {
      instagram: "#",
      linkedin: "#",
    },
    category: "youth",
  },
  {
    id: 6,
    name: "Smt. Savitri Devi Aanjana",
    nameHi: "श्रीमती सावित्री देवी आंजना",
    designation: "Women Wing President",
    designationHi: "महिला प्रकोष्ठ अध्यक्ष",
    bio: "A champion of women's empowerment and education in the community. Smt. Savitri Devi has established skill development centers and self-help groups across rural areas, benefiting thousands of women.",
    image: "/images/leaders/women-president.jpg",
    social: {
      facebook: "#",
    },
    category: "women",
  },
  {
    id: 7,
    name: "Shri Daulat Ram Aanjana",
    nameHi: "श्री दौलत राम आंजना",
    designation: "Rajasthan State President",
    designationHi: "राजस्थान राज्य अध्यक्ष",
    bio: "Leading the community in Rajasthan with dedication and commitment. Has organized annual community gatherings attended by over 10,000 members.",
    image: "/images/leaders/rajasthan-president.jpg",
    social: {
      facebook: "#",
    },
    category: "district",
  },
  {
    id: 8,
    name: "Shri Prem Chand Aanjana",
    nameHi: "श्री प्रेम चंद आंजना",
    designation: "Gujarat State President",
    designationHi: "गुजरात राज्य अध्यक्ष",
    bio: "Spearheading community development initiatives across Gujarat. Has established 15 community libraries and 8 computer training centers.",
    image: "/images/leaders/gujarat-president.jpg",
    social: {
      facebook: "#",
    },
    category: "district",
  },
];
