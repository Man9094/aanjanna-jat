export interface Event {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "conference" | "cultural" | "sports" | "seminar" | "meeting" | "social";
  image: string;
  isUpcoming: boolean;
  registrationLink?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Annual Mahasabha Conference 2026",
    titleHi: "वार्षिक महासभा सम्मेलन 2026",
    description:
      "The grand annual conference bringing together community members from across India. Join us for a day of celebration, discussion, and unity. Key topics include education reform, community development, and youth empowerment.",
    date: "2026-10-15",
    time: "9:00 AM - 6:00 PM",
    location: "Rajasthan International Center, Jaipur",
    category: "conference",
    image: "/images/events/annual-conference.jpg",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: 2,
    title: "Youth Leadership Summit",
    titleHi: "युवा नेतृत्व शिखर सम्मेलन",
    description:
      "Empowering the next generation of community leaders through workshops, mentoring sessions, and leadership training. Open to youth aged 18-35.",
    date: "2026-09-20",
    time: "10:00 AM - 5:00 PM",
    location: "Udaipur Convention Center, Udaipur",
    category: "seminar",
    image: "/images/events/youth-summit.jpg",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: 3,
    title: "Community Sports Tournament",
    titleHi: "सामुदायिक खेल प्रतियोगिता",
    description:
      "Annual inter-district sports competition featuring cricket, kabaddi, volleyball, and athletics. Promoting fitness and sportsmanship among community members.",
    date: "2026-11-05",
    time: "7:00 AM - 7:00 PM",
    location: "Community Sports Ground, Jodhpur",
    category: "sports",
    image: "/images/events/sports-tournament.jpg",
    isUpcoming: true,
  },
  {
    id: 4,
    title: "Diwali Cultural Festival",
    titleHi: "दिवाली सांस्कृतिक उत्सव",
    description:
      "Celebrate the festival of lights with traditional performances, folk music, dance, and community feast. A grand celebration of our rich cultural heritage.",
    date: "2026-10-20",
    time: "5:00 PM - 11:00 PM",
    location: "Community Hall, Ahmedabad",
    category: "cultural",
    image: "/images/events/diwali-festival.jpg",
    isUpcoming: true,
  },
  {
    id: 5,
    title: "Women Empowerment Workshop",
    titleHi: "महिला सशक्तिकरण कार्यशाला",
    description:
      "A workshop focused on financial literacy, health awareness, legal rights, and skill development for women. Special sessions on self-help group formation.",
    date: "2026-09-10",
    time: "10:00 AM - 4:00 PM",
    location: "Aanjana Bhawan, Jaipur",
    category: "seminar",
    image: "/images/events/women-workshop.jpg",
    isUpcoming: true,
  },
  {
    id: 6,
    title: "Blood Donation Camp",
    titleHi: "रक्तदान शिविर",
    description:
      "Community blood donation drive in collaboration with Red Cross. Join us to save lives. All donors receive health checkup and refreshments.",
    date: "2026-08-25",
    time: "8:00 AM - 2:00 PM",
    location: "SMS Hospital, Jaipur",
    category: "social",
    image: "/images/events/blood-donation.jpg",
    isUpcoming: true,
  },
  {
    id: 7,
    title: "Republic Day Celebration 2026",
    titleHi: "गणतंत्र दिवस समारोह 2026",
    description:
      "Community gathering to celebrate Republic Day with flag hoisting, patriotic performances, and felicitation of community achievers.",
    date: "2026-01-26",
    time: "8:00 AM - 12:00 PM",
    location: "Aanjana Bhawan, Jaipur",
    category: "cultural",
    image: "/images/events/republic-day.jpg",
    isUpcoming: false,
  },
  {
    id: 8,
    title: "Education Scholarship Distribution",
    titleHi: "शैक्षिक छात्रवृत्ति वितरण",
    description:
      "Annual scholarship distribution ceremony honoring meritorious students from the community. Over 500 scholarships awarded across multiple categories.",
    date: "2026-03-15",
    time: "11:00 AM - 3:00 PM",
    location: "Town Hall, Ajmer",
    category: "meeting",
    image: "/images/events/scholarship-event.jpg",
    isUpcoming: false,
  },
];
