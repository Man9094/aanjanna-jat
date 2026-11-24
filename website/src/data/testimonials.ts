export interface Testimonial {
  id: number;
  name: string;
  nameHi: string;
  nameGu: string;
  location: string;
  locationHi: string;
  locationGu: string;
  designation: string;
  designationHi: string;
  designationGu: string;
  quote: string;
  quoteHi: string;
  quoteGu: string;
  topic: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chaudhary Mohanlal Patel",
    nameHi: "चौधरी मोहनलाल पटेल",
    nameGu: "ચૌધરી મોહનલાલ પટેલ",
    location: "Mehsana, Gujarat",
    locationHi: "मेहसाणा, गुजरात",
    locationGu: "મહેસાણા, ગુજરાત",
    designation: "Former Education Trustee",
    designationHi: "पूर्व शिक्षा न्यासी",
    designationGu: "પૂર્વ શિક્ષણ ટ્રસ્ટી",
    quote:
      "The Mahasabha's structured scholarship fund and digital village census have brought unprecedented transparency. Deserving sons and daughters from rural agricultural families now receive merit assistance directly, ensuring higher education without economic interruption.",
    quoteHi:
      "महासभा के व्यवस्थित छात्रवृत्ति कोष और ग्राम जनगणना से अभूतपूर्व पारदर्शिता आई है। ग्रामीण किसान परिवारों के होनहार बेटे-बेटियों को बिना किसी रुकावट के उच्च शिक्षा हेतु सीधी आर्थिक सहायता मिल रही है।",
    quoteGu:
      "મહાસભાના સુવ્યવસ્થિત શિષ્યવૃત્તિ ફંડ અને ગામ ડિરેક્ટરીથી અભૂતપૂર્વ પારદર્શિતા આવી છે. ગ્રામીણ ખેડૂત પરિવારોના તેજસ્વી દીકરા-દીકરીઓને ઉચ્ચ શિક્ષણ માટે સમયસર સહાય મળી રહી છે.",
    topic: "Education & Digital Records",
  },
  {
    id: 2,
    name: "Ram Singh Anjana",
    nameHi: "राम सिंह आँजणा",
    nameGu: "રામ સિંહ આંજણા",
    location: "Ujjain, Madhya Pradesh",
    locationHi: "उज्जैन, मध्य प्रदेश",
    locationGu: "ઉજ્જૈન, મધ્ય પ્રદેશ",
    designation: "Agriculture Council Member",
    designationHi: "कृषि परिषद सदस्य",
    designationGu: "કૃષિ પરિષદ સભ્ય",
    quote:
      "Our ancestral roots remain anchored to the plow and soil. Through the Mahasabha, farmers across Madhya Pradesh, Rajasthan, and Gujarat share collective representation, modern crop guidance, and mutual solidarity during seasonal adversity.",
    quoteHi:
      "हमारी ऐतिहासिक पहचान हल और माटी से जुड़ी है। महासभा के माध्यम से मध्य प्रदेश, राजस्थान और गुजरात के किसान भाइयों को संगठित प्रतिनिधित्व, फसल मार्गदर्शन और संकट के समय परस्पर सहयोग प्राप्त हो रहा है।",
    quoteGu:
      "આપણો ઐતિહાસિક વારસો ખેતી અને જમીન સાથે જોડાયેલો છે. મહાસભા થકી મધ્ય પ્રદેશ, રાજસ્થાન અને ગુજરાતના ખેડૂતોને સંગઠિત અવાજ અને પાક સંરક્ષણનું સાચું માર્ગદર્શન મળે છે.",
    topic: "Agrarian Solidarity",
  },
  {
    id: 3,
    name: "Smt. Kamla Devi Chaudhary",
    nameHi: "श्रीमती कमला देवी चौधरी",
    nameGu: "શ્રીમતી કમલા દેવી ચૌધરી",
    location: "Jodhpur, Rajasthan",
    locationHi: "जोधपुर, राजस्थान",
    locationGu: "જોધપુર, રાજસ્થાન",
    designation: "Social Reformer & Women Wing Convener",
    designationHi: "समाज सुधारक एवं महिला प्रकोष्ठ संयोजिका",
    designationGu: "સમાજ સુધારક અને મહિલા પાંખ સંયોજિકા",
    quote:
      "The decisive social campaign against substance abuse has protected hundreds of young families. When our mothers and sisters are empowered and our daughters excel in universities and civil services, the dignity of the entire community rises.",
    quoteHi:
      "नशामुक्ति के विरुद्ध महासभा के दृढ़ अभियान ने सैकड़ों परिवारों को टूटने से बचाया है। जब हमारी बेटियां विश्वविद्यालयों और प्रशासनिक सेवाओं में आगे बढ़ती हैं, तब पूरे आँजणा समाज का मान बढ़ता है।",
    quoteGu:
      "વ્યસનમુક્તિ વિરુદ્ધ મહાસભાના મક્કમ અભિયાને અસંખ્ય પરિવારોને નવજીવન આપ્યું છે. આપણી દીકરીઓ શિક્ષણ અને પ્રશાસનિક સેવાઓમાં આગળ વધે છે ત્યારે સમગ્ર સમાજનું ગૌરવ વધે છે.",
    topic: "Social Reform & Girls' Education",
  },
];
