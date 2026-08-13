export interface Testimonial {
  id: number;
  name: string;
  nameHi: string;
  location: string;
  quote: string;
  quoteHi: string;
  image: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar Aanjana",
    nameHi: "राजेश कुमार आंजना",
    location: "Jaipur, Rajasthan",
    quote:
      "The scholarship from Aanjana Jat Mahasabha helped me complete my engineering degree. Today, I am working at a top IT company. I am forever grateful to the community.",
    quoteHi:
      "आंजना जाट महासभा की छात्रवृत्ति ने मुझे इंजीनियरिंग की डिग्री पूरी करने में मदद की। आज मैं एक शीर्ष आईटी कंपनी में काम कर रहा हूं।",
    image: "/images/testimonials/rajesh.jpg",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Sunita Devi Aanjana",
    nameHi: "सुनीता देवी आंजना",
    location: "Ahmedabad, Gujarat",
    quote:
      "The women empowerment program changed my life. I learned tailoring through the skill development center and now run my own boutique with 5 employees.",
    quoteHi:
      "महिला सशक्तिकरण कार्यक्रम ने मेरा जीवन बदल दिया। मैंने कौशल विकास केंद्र से सिलाई सीखी और अब 5 कर्मचारियों के साथ अपना बुटीक चला रही हूं।",
    image: "/images/testimonials/sunita.jpg",
    designation: "Entrepreneur",
  },
  {
    id: 3,
    name: "Dr. Mahendra Singh Aanjana",
    nameHi: "डॉ. महेंद्र सिंह आंजना",
    location: "Udaipur, Rajasthan",
    quote:
      "The medical camp organized by the Mahasabha detected my father's eye condition early. The free cataract surgery gave him his vision back. Such services are invaluable.",
    quoteHi:
      "महासभा द्वारा आयोजित चिकित्सा शिविर में मेरे पिताजी की आंखों की समस्या का पता चला। मुफ्त मोतियाबिंद ऑपरेशन ने उनकी दृष्टि वापस दी।",
    image: "/images/testimonials/mahendra.jpg",
    designation: "Doctor",
  },
  {
    id: 4,
    name: "Priya Aanjana",
    nameHi: "प्रिया आंजना",
    location: "Jodhpur, Rajasthan",
    quote:
      "Through the Mahasabha's career guidance program, I prepared for civil services. Their mentorship and support helped me crack the RAS exam in my first attempt.",
    quoteHi:
      "महासभा के करियर मार्गदर्शन कार्यक्रम के माध्यम से मैंने सिविल सेवा की तैयारी की। उनके मार्गदर्शन ने मुझे पहले प्रयास में RAS परीक्षा उत्तीर्ण करने में मदद की।",
    image: "/images/testimonials/priya.jpg",
    designation: "RAS Officer",
  },
  {
    id: 5,
    name: "Gopal Lal Aanjana",
    nameHi: "गोपाल लाल आंजना",
    location: "Bhilwara, Rajasthan",
    quote:
      "The farmer support program introduced me to organic farming. My income has doubled in two years and I now train other farmers in my village.",
    quoteHi:
      "किसान सहायता कार्यक्रम ने मुझे जैविक खेती से परिचित कराया। दो वर्षों में मेरी आय दोगुनी हो गई और अब मैं अपने गांव के अन्य किसानों को प्रशिक्षित करता हूं।",
    image: "/images/testimonials/gopal.jpg",
    designation: "Progressive Farmer",
  },
];
