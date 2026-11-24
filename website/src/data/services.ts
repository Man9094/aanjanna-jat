export interface Service {
  id: number;
  title: string;
  titleHi: string;
  titleGu: string;
  description: string;
  descriptionHi: string;
  descriptionGu: string;
  icon: string;
  details: string[];
  detailsHi: string[];
  detailsGu: string[];
  image: string;
  slug: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Education & Scholarships",
    titleHi: "शिक्षा एवं छात्रवृत्ति",
    titleGu: "શિક્ષણ અને શિષ્યવૃત્તિ",
    description:
      "Providing scholarships, study materials, coaching, and educational guidance to students from economically weaker sections of the community.",
    descriptionHi:
      "समाज के जरूरतमंद एवं मेधावी विद्यार्थियों के लिए छात्रवृत्ति, अध्ययन सामग्री, प्रतियोगी परीक्षा मार्गदर्शन एवं कोचिंग सहायता।",
    descriptionGu:
      "સમાજના જરૂરિયાતમંદ અને તેજસ્વી વિદ્યાર્થીઓ માટે શિષ્યવૃત્તિ, પુસ્તકો, સ્પર્ધાત્મક પરીક્ષા માર્ગદર્શન અને કોચિંગ સહાય.",
    icon: "graduation-cap",
    details: [
      "Merit-based scholarships for class 10, 12, and college students",
      "Free coaching for competitive exams (IAS, RAS, SSC, Banking)",
      "Book and study material distribution",
      "School fee assistance for underprivileged students",
      "Career counseling and guidance sessions",
      "Computer literacy programs",
    ],
    detailsHi: [
      "कक्षा 10, 12 एवं कॉलेज छात्रों हेतु मेधावी छात्रवृत्ति",
      "प्रतियोगी परीक्षाओं (IAS, RAS, SSC, Banking) हेतु निःशुल्क कोचिंग",
      "पुस्तकों एवं अध्ययन सामग्री का वितरण",
      "आर्थिक रूप से कमजोर विद्यार्थियों के लिए विद्यालय शुल्क सहायता",
      "कैरियर परामर्श एवं मार्गदर्शन सत्र",
      "कंप्यूटर एवं डिजिटल साक्षरता कार्यक्रम",
    ],
    detailsGu: [
      "ધોરણ ૧૦, ૧૨ અને કોલેજના વિદ્યાર્થીઓ માટે તેજસ્વી શિષ્યવૃત્તિ",
      "સ્પર્ધાત્મક પરીક્ષાઓ માટે નિઃશુલ્ક કોચિંગ માર્ગદર્શન",
      "પુસ્તકો અને શૈક્ષણિક સામગ્રી વિતરણ",
      "જરૂરિયાતમંદ વિદ્યાર્થીઓ માટે સ્કૂલ ફી સહાય",
      "કારકિર્દી કાઉન્સેલિંગ અને માર્ગદર્શન સત્રો",
      "કોમ્પ્યુટર અને ડિજિટલ સાક્ષરતા કાર્યક્રમ",
    ],
    image: "/images/services/education.jpg",
    slug: "education-scholarships",
  },
  {
    id: 2,
    title: "Medical Camps & Healthcare",
    titleHi: "चिकित्सा शिविर एवं स्वास्थ्य सेवा",
    titleGu: "તબીબી શિબિર અને આરોગ્ય સેવા",
    description:
      "Organizing free medical camps, health check-ups, and providing medical assistance to needy community members.",
    descriptionHi:
      "ग्रामीण क्षेत्रों में निःशुल्क स्वास्थ्य परीक्षण शिविर, नेत्र चिकित्सा, गंभीर बीमारियों में आर्थिक सहायता एवं एम्बुलेंस सुविधा।",
    descriptionGu:
      "ગ્રામીણ વિસ્તારોમાં નિઃશુલ્ક આરોગ્ય તપાસ શિબિરો, નેત્ર ચિકિત્સા, ગંભીર બિમારીઓમાં સહાય અને આપાતકાલીન એમ્બ્યુલન્સ સેવા.",
    icon: "stethoscope",
    details: [
      "Free health check-up camps in rural areas",
      "Eye care and cataract surgery camps",
      "Dental check-up camps",
      "Medical expense assistance for critical illnesses",
      "Ambulance service for emergencies",
      "Health awareness programs",
    ],
    detailsHi: [
      "ग्रामीण क्षेत्रों में निःशुल्क स्वास्थ्य परीक्षण शिविर",
      "नेत्र चिकित्सा एवं मोतियाबिंद ऑपरेशन शिविर",
      "दंत चिकित्सा एवं स्वास्थ्य परामर्श शिविर",
      "गंभीर बीमारियों के उपचार हेतु आर्थिक सहायता",
      "आपातकालीन एम्बुलेंस सुविधा नेटवर्क",
      "स्वास्थ्य एवं पोषण जागरूकता कार्यक्रम",
    ],
    detailsGu: [
      "ગ્રામીણ વિસ્તારોમાં નિઃશુલ્ક આરોગ્ય તપાસ શિબિરો",
      "નેત્ર ચિકિત્સા અને મોતિયા ઓપરેશન શિબિરો",
      "દંત ચિકિત્સા શિબિરો",
      "ગંભીર બિમારીઓના ઉપચાર માટે આર્થિક સહાય",
      "આપાતકાલીન એમ્બ્યુલન્સ સેવા",
      "આરોગ્ય અને પોષણ જાગૃતિ કાર્યક્રમ",
    ],
    image: "/images/services/medical.jpg",
    slug: "medical-camps-healthcare",
  },
  {
    id: 3,
    title: "Blood Donation Network",
    titleHi: "रक्तदान नेटवर्क",
    titleGu: "રક્તદાન નેટવર્ક",
    description:
      "Maintaining a community blood bank and organizing regular blood donation drives to save lives.",
    descriptionHi:
      "आपातकालीन रक्त आवश्यकता हेतु राज्यस्तरीय डोनर नेटवर्क एवं नियमित स्वैच्छिक रक्तदान शिविरों का आयोजन।",
    descriptionGu:
      "આપાતકાલીન જરૂરિયાત માટે રાજ્યસ્તરીય રક્તદાતા નેટવર્ક અને નિયમિત સ્વૈચ્છિક રક્તદાન શિબિરોનું આયોજન.",
    icon: "heart-pulse",
    details: [
      "Bi-annual blood donation drives",
      "Community blood donor registry",
      "Emergency blood availability network",
      "Blood group database for quick matching",
      "Collaboration with Red Cross and hospitals",
      "Blood donation awareness campaigns",
    ],
    detailsHi: [
      "वार्षिक एवं अर्द्धवार्षिक स्वैच्छिक रक्तदान शिविर",
      "अखिल भारतीय आँजणा रक्तदाता डायरेक्टरी",
      "24/7 आपातकालीन रक्त उपलब्धता नेटवर्क",
      "शीघ्र मिलान हेतु ब्लड ग्रुप डेटाबेस",
      "रेड क्रॉस एवं प्रमुख अस्पतालों के साथ समन्वय",
      "रक्तदान जन-जागरूकता अभियान",
    ],
    detailsGu: [
      "વાર્ષિક અને અર્ધવાર્ષિક રક્તદાન શિબિરો",
      "સમાજના રક્તદાતાઓની ડિરેક્ટરી",
      "૨૪/૭ આપાતકાલીન રક્ત ઉપલબ્ધતા નેટવર્ક",
      "બ્લડ ગ્રુપ ડેટાબેઝ દ્વારા ઝડપી સંકલન",
      "રેડ ક્રોસ અને હોસ્પિટલો સાથે સહયોગ",
      "રક્તદાન જાગૃતિ અભિયાન",
    ],
    image: "/images/services/blood-donation.jpg",
    slug: "blood-donation",
  },
  {
    id: 4,
    title: "Employment & Career Cell",
    titleHi: "रोजगार एवं करियर मार्गदर्शन",
    titleGu: "રોજગાર અને કારકિર્દી માર્ગદર્શન",
    description:
      "Connecting community youth with job opportunities, providing skill training, and supporting entrepreneurship.",
    descriptionHi:
      "युवाओं के लिए रोजगार अवसर, कौशल विकास कार्यशालाएं, प्रतियोगी परीक्षाओं की तैयारी एवं व्यापार प्रोत्साहन।",
    descriptionGu:
      "યુવાનો માટે રોજગારની તકો, કૌશલ્ય વિકાસ વર્કશોપ, સ્પર્ધાત્મક પરીક્ષાઓની તૈયારી અને વ્યાપાર પ્રોત્સાહન.",
    icon: "briefcase",
    details: [
      "Job placement assistance",
      "Skill development workshops",
      "Entrepreneurship support and mentoring",
      "Government job notification alerts",
      "Resume building and interview preparation",
      "Business networking events",
    ],
    detailsHi: [
      "रोजगार एवं प्लेसमेंट सहायता",
      "कौशल विकास एवं तकनीकी कार्यशालाएं",
      "उद्यमिता मार्गदर्शन एवं स्टार्टअप सहयोग",
      "सरकारी नौकरियों की भर्ती सूचना एवं अलर्ट",
      "बायोडाटा निर्माण एवं साक्षात्कार तैयारी",
      "व्यापारिक नेटवर्किंग सम्मेलन",
    ],
    detailsGu: [
      "રોજગાર અને પ્લેસમેન્ટ સહાય",
      "કૌશલ્ય વિકાસ વર્કશોપ",
      "ઉદ્યોગસાહસિકતા માર્ગદર્શન અને સહાય",
      "સરકારી ભરતીઓની સૂચના અને એલર્ટ",
      "બાયોડેટા નિર્માણ અને ઇન્ટરવ્યુ તૈયારી",
      "વેપાર નેટવર્કિંગ પરિષદો",
    ],
    image: "/images/services/employment.jpg",
    slug: "employment-assistance",
  },
  {
    id: 5,
    title: "Matrimonial Assistance",
    titleHi: "वैवाहिक मंच एवं परामर्श",
    titleGu: "વૈવાહિક મંચ અને પરામર્શ",
    description:
      "Organizing community matrimonial events, providing marriage assistance to families, and running a trusted matrimonial portal.",
    descriptionHi:
      "सत्यापित परिचय सम्मेलन, दहेज-मुक्त सामूहिक विवाह प्रोत्साहन एवं परिवारों के बीच विश्वासपूर्ण वैवाहिक समन्वय।",
    descriptionGu:
      "પ્રમાણિત પરિચય સંમેલન, દહેજ-મુક્ત સમૂહ લગ્ન પ્રોત્સાહન અને પરિવારો વચ્ચે વિશ્વસનીય વૈવાહિક સમન્વય.",
    icon: "heart",
    details: [
      "Community matrimonial portal",
      "Mass marriage ceremonies",
      "Financial assistance for marriages",
      "Pre-marriage counseling",
      "Verified profile matching",
      "Dowry-free marriage promotion",
    ],
    detailsHi: [
      "सत्यापित सामाजिक वैवाहिक पोर्टल",
      "सामूहिक विवाह सम्मेलनों का भव्य आयोजन",
      "निर्धन कन्याओं के विवाह हेतु आर्थिक सहयोग",
      "विवाह पूर्व पारिवारिक परामर्श",
      "सत्यापित गोत्र व कुल मिलान",
      "दहेज-मुक्त समाज निर्माण संकल्प",
    ],
    detailsGu: [
      "પ્રમાણિત સામાજિક વૈવાહિક પોર્ટલ",
      "સમૂહ લગ્ન સમારોહનું આયોજન",
      "લગ્ન માટે આર્થિક સહાય ભંડોળ",
      "લગ્ન પૂર્વે પારિવારિક કાઉન્સેલિંગ",
      "પ્રમાણિત ગોત્ર અને કુળ મિલન",
      "દહેજ-મુક્ત લગ્ન પ્રથાને પ્રોત્સાહન",
    ],
    image: "/images/services/marriage.jpg",
    slug: "marriage-assistance",
  },
  {
    id: 6,
    title: "Legal Aid & Dispute Resolution",
    titleHi: "कानूनी सहायता एवं मध्यस्थता",
    titleGu: "કાનૂની સહાય અને મધ્યસ્થતા",
    description:
      "Providing free legal consultation and assistance to community members for property disputes, family matters, and other legal issues.",
    descriptionHi:
      "वरिष्ठ अधिवक्ताओं द्वारा निःशुल्क विधिक परामर्श, पारिवारिक व भूमि विवादों में सामाजिक मध्यस्थता एवं न्याय सहायता।",
    descriptionGu:
      "વરિષ્ઠ વકીલો દ્વારા નિઃશુલ્ક કાનૂની માર્ગદર્શન, પારિવારિક અને જમીન વિવાદોમાં સામાજિક મધ્યસ્થતા અને ન્યાય સહાય.",
    icon: "scale",
    details: [
      "Free legal consultation clinics",
      "Property dispute resolution",
      "Family law assistance",
      "Consumer rights awareness",
      "Legal aid for underprivileged",
      "RTI filing assistance",
    ],
    detailsHi: [
      "निःशुल्क कानूनी परामर्श केंद्र",
      "पारिवारिक एवं भूमि विवादों का सामाजिक समाधान",
      "दीवानी व पारिवारिक मामलों में विधिक सहायता",
      "उपभोक्ता अधिकार एवं विधिक जागरूकता",
      "कमजोर वर्गों हेतु निःशुल्क पैरवी",
      "सूचना का अधिकार (RTI) आवेदन मार्गदर्शन",
    ],
    detailsGu: [
      "નિઃશુલ્ક કાનૂની સલાહ કેન્દ્રો",
      "જમીન અને મિલકત વિવાદોનું નિવારણ",
      "પારિવારિક કાયદાકીય સહાય",
      "ગ્રાહક અધિકારો અંગે જાગૃતિ",
      "જરૂરિયાતમંદો માટે કાનૂની સહાય",
      "આરટીઆઈ (RTI) અરજી માર્ગદર્શન",
    ],
    image: "/images/services/legal.jpg",
    slug: "legal-aid",
  },
  {
    id: 7,
    title: "Women Empowerment",
    titleHi: "महिला सशक्तिकरण",
    titleGu: "મહિલા સશક્તિકરણ",
    description:
      "Empowering women through education, skill development, self-help groups, and awareness programs.",
    descriptionHi:
      "शिक्षा, कौशल प्रशिक्षण, स्वयं सहायता समूहों एवं नेतृत्व विकास कार्यक्रमों द्वारा समाज की मातृशक्ति का सशक्तिकरण।",
    descriptionGu:
      "શિક્ષણ, કૌશલ્ય તાલીમ, સ્વસહાય જૂથો અને નેતૃત્વ વિકાસ દ્વારા સમાજની માતૃશક્તિનું સશક્તિકરણ.",
    icon: "users",
    details: [
      "Women self-help group formation",
      "Skill development (tailoring, handicrafts, cooking)",
      "Financial literacy workshops",
      "Health and hygiene awareness",
      "Women safety awareness campaigns",
      "Leadership development programs",
    ],
    detailsHi: [
      "महिला स्वयं सहायता समूहों का गठन",
      "कौशल प्रशिक्षण (सिलाई, हस्तशिल्प, प्रसंस्करण)",
      "वित्तीय एवं डिजिटल साक्षरता कार्यशालाएं",
      "स्वास्थ्य, स्वच्छता एवं पोषण जागरूकता",
      "सुरक्षा एवं कानूनी अधिकार कार्यशाला",
      "नेतृत्व एवं सामाजिक सहभागिता कार्यक्रम",
    ],
    detailsGu: [
      "મહિલા સ્વસહાય જૂથોની રચના",
      "કૌશલ્ય તાલીમ (સીવણ, હસ્તકલા, પ્રોસેસિંગ)",
      "નાણાકીય અને ડિજિટલ સાક્ષરતા કાર્યક્રમ",
      "આરોગ્ય અને સ્વચ્છતા જાગૃતિ",
      "મહિલા સુરક્ષા અને અધિકાર જાગૃતિ",
      "નેતૃત્વ વિકાસ કાર્યક્રમો",
    ],
    image: "/images/services/women-empowerment.jpg",
    slug: "women-empowerment",
  },
  {
    id: 8,
    title: "Farmer Advocacy & Support",
    titleHi: "किसान स्वाभिमान एवं सहायता",
    titleGu: "ખેડૂત સ્વાભિમાન અને સહાય",
    description:
      "Supporting community farmers with modern agricultural techniques, market access, and government scheme awareness.",
    descriptionHi:
      "उन्नत कृषि तकनीक, जैविक खेती, उचित मूल्य संरक्षण, फसल बीमा सहायता एवं अन्नदाता स्वाभिमान के लिए निरंतर कार्य।",
    descriptionGu:
      "આધુનિક કૃષિ પદ્ધતિ, જૈવિક ખેતી, યોગ્ય ભાવ સંરક્ષણ, પાક વીમા સહાય અને અન્નદાતા સ્વાભિમાન માટે નિરંતર કાર્ય.",
    icon: "wheat",
    details: [
      "Modern farming techniques training",
      "Organic farming awareness",
      "Government scheme enrollment assistance",
      "Crop insurance guidance",
      "Market linkage for better prices",
      "Farm equipment sharing cooperative",
    ],
    detailsHi: [
      "आधुनिक एवं प्राकृतिक कृषि तकनीकों का प्रशिक्षण",
      "जैविक खेती एवं मृदा स्वास्थ्य संवर्धन",
      "सरकारी कृषि योजनाओं में पंजीकरण सहायता",
      "प्रधानमंत्री फसल बीमा योजना मार्गदर्शन",
      "उपज के उचित मूल्य हेतु मंडी समन्वय",
      "सहकारी कृषि उपकरण साझा व्यवस्था",
    ],
    detailsGu: [
      "આધુનિક કૃષિ પદ્ધતિઓની તાલીમ",
      "જૈવિક ખેતી અને જમીન સંરક્ષણ",
      "સરકારી યોજનાઓમાં નોંધણી સહાય",
      "પાક વીમા યોજના માર્ગદર્શન",
      "પાકના યોગ્ય ભાવ માટે બજાર સંકલન",
      "સહકારી કૃષિ સાધનોની વહેંચણી",
    ],
    image: "/images/services/farmer.jpg",
    slug: "farmer-support",
  },
  {
    id: 9,
    title: "Disaster Relief & Emergency Support",
    titleHi: "आपदा राहत एवं आपातकालीन सेवा",
    titleGu: "આપત્તિ રાહત અને ઇમરજન્સી સેવા",
    description:
      "Providing immediate relief and rehabilitation support during natural disasters and emergencies.",
    descriptionHi:
      "प्राकृतिक आपदाओं एवं आकस्मिक संकट के समय प्रभावित परिवारों को त्वरित राशन, चिकित्सा एवं आर्थिक संबल।",
    descriptionGu:
      "કુદરતી આપત્તિઓ અને આકસ્મિક સંકટ સમયે અસરગ્રસ્ત પરિવારોને તાત્કાલિક રાશન, તબીબી અને આર્થિક સહાય.",
    icon: "shield",
    details: [
      "Emergency response teams",
      "Relief material distribution",
      "Temporary shelter arrangements",
      "Financial assistance for affected families",
      "Rehabilitation support",
      "Community emergency fund",
    ],
    detailsHi: [
      "आपातकालीन त्वरित राहत दल",
      "खाद्य सामग्री एवं राशन किट वितरण",
      "अस्थाई आवास एवं आश्रय व्यवस्था",
      "प्रभावित परिवारों को तत्पर आर्थिक सहयोग",
      "पुनर्वास एवं आजीविका बहाली सहायता",
      "महासभा आपदा राहत कोष",
    ],
    detailsGu: [
      "આપાતકાલીન રાહત ટુકડીઓ",
      "રાશન કિટ અને સહાય સામગ્રી વિતરણ",
      "અસ્થાયી આશ્રય વ્યવસ્થા",
      "અસરગ્રસ્ત પરિવારોને આર્થિક સહાય",
      "પુનર્વસન અને રોજગાર સહાય",
      "સમાજ આપત્તિ રાહત ભંડોળ",
    ],
    image: "/images/services/disaster-relief.jpg",
    slug: "disaster-relief",
  },
  {
    id: 10,
    title: "Youth Development & Sports",
    titleHi: "युवा विकास एवं खेल प्रतिभा",
    titleGu: "યુવા વિકાસ અને રમતગમત પ્રતિભા",
    description:
      "Nurturing young talent through leadership programs, sports events, cultural activities, and technology workshops.",
    descriptionHi:
      "खेल प्रतियोगिताओं, प्रतिभा सम्मान, तकनीकी कार्यशालाओं और नेतृत्व शिविरों द्वारा युवाओं को राष्ट्रीय स्तर पर आगे बढ़ाना।",
    descriptionGu:
      "રમતગમત સ્પર્ધાઓ, પ્રતિભા સન્માન, ટેકનોલોજી વર્કશોપ અને નેતૃત્વ શિબિરો દ્વારા યુવાનોને રાષ્ટ્રીય સ્તરે આગળ લાવવા.",
    icon: "rocket",
    details: [
      "Youth leadership training camps",
      "Sports tournaments and competitions",
      "Coding bootcamps and tech workshops",
      "Public speaking and debate competitions",
      "Cultural exchange programs",
      "Youth volunteer network",
    ],
    detailsHi: [
      "युवा नेतृत्व एवं व्यक्तित्व विकास शिविर",
      "अखिल भारतीय आँजणा खेल महोत्सव एवं प्रतियोगिताएं",
      "कौशल, कोडिंग एवं तकनीकी कार्यशालाएं",
      "भाषण, वाद-विवाद एवं बौद्धिक प्रतियोगिताएं",
      "सांस्कृतिक आदान-प्रदान कार्यक्रम",
      "महासभा युवा स्वयंसेवक नेटवर्क",
    ],
    detailsGu: [
      "યુવા નેતૃત્વ અને વ્યક્તિત્વ વિકાસ શિબિરો",
      "રમતગમત ટુર્નામેન્ટ અને સ્પર્ધાઓ",
      "કોડિંગ અને ટેકનોલોજી વર્કશોપ",
      "વક્તૃત્વ અને વાદ-વિવાદ સ્પર્ધાઓ",
      "સાંસ્કૃતિક આદાન-પ્રદાન કાર્યક્રમો",
      "યુવા સ્વયંસેવક નેટવર્ક",
    ],
    image: "/images/services/youth.jpg",
    slug: "youth-development",
  },
];
