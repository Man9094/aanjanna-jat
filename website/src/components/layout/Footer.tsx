"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Send,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const TwitterX = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const Youtube = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: TwitterX, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [showBackTop, setShowBackTop] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const quickLinks = [
    { label: t("navAboutUs"), href: "/about" },
    { label: t("navHistory"), href: "/history" },
    { label: t("navLeadership"), href: "/leadership" },
    { label: t("navServices"), href: "/services" },
    { label: t("navGallery"), href: "/gallery" },
  ];

  const communityLinks = [
    { label: t("navEvents"), href: "/events" },
    { label: t("navNews"), href: "/news" },
    { label: t("navMembership"), href: "/membership" },
    { label: t("navDonation"), href: "/donation" },
    { label: t("navScholarship"), href: "/scholarship" },
    { label: t("navBloodDonation"), href: "/blood-donation" },
  ];

  const moreLinks = [
    { label: t("navMatrimonial"), href: "/matrimonial" },
    { label: t("navBusinessDirectory"), href: "/business-directory" },
    { label: t("navCareers"), href: "/careers" },
    { label: t("navVillages"), href: "/villages" },
    { label: t("navContact"), href: "/contact" },
  ];

  return (
    <>
      {/* Editorial Motto & Newsletter Section (Kesari Red) */}
      <section className="bg-[#B52A12] text-white py-12 px-6 border-t-2 border-[#D9A52B]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <p className="text-[#D9A52B] font-bold text-xs uppercase tracking-wider mb-1">
              {t("brandTitle")}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-devanagari">
              {t("officialMotto")}
            </h3>
            <p className="text-white/85 text-xs sm:text-sm max-w-xl">
              {language === "hi"
                ? "समाज की नवीनतम गतिविधियों, अधिवेशनों, निर्णयों एवं जनकल्याणकारी योजनाओं की सीधी जानकारी प्राप्त करें।"
                : language === "gu"
                ? "સમાજની નવીનતમ ગતિવિધિઓ, અધિવેશન, નિર્ણયો અને જનકલ્યાણકારી યોજનાઓની માહિતી મેળવો."
                : "Receive direct updates on community conventions, administrative decisions, and welfare initiatives."}
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full max-w-md items-center shadow-md rounded-full bg-white/10 p-1 border border-[#D9A52B]/40"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                language === "hi"
                  ? "ईमेल पता दर्ज करें..."
                  : language === "gu"
                  ? "ઇમેઇલ એડ્રેસ દાખલ કરો..."
                  : "Enter your email address..."
              }
              required
              className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder:text-white/60 focus:outline-none text-xs sm:text-sm"
              aria-label="Email address for updates"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#D9A52B] text-[#29211D] font-bold hover:bg-[#E5B84B] transition-colors flex items-center gap-1.5 text-xs sm:text-sm shrink-0"
            >
              <Send size={14} />
              {subscribed
                ? language === "hi"
                  ? "धन्यवाद!"
                  : language === "gu"
                  ? "આભાર!"
                  : "Thank you!"
                : language === "hi"
                ? "जुड़ें"
                : language === "gu"
                ? "જોડાવો"
                : "Join"}
            </button>
          </form>
        </div>
      </section>

      {/* Main Dignified Broadsheet Footer */}
      <footer className="bg-[#FAF2E0] text-[#29211D] border-t border-[#D9A52B]/30" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Brand Authority */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="w-12 h-12 rounded-full p-0.5 bg-white border-2 border-[#D9A52B] shadow-xs shrink-0">
                  <Image
                    src="/logo.png"
                    alt={t("brandTitle")}
                    width={48}
                    height={48}
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-devanagari text-[#B52A12] leading-tight">
                    {t("brandTitle")}
                  </h2>
                  <p className="text-[11px] font-semibold text-[#29211D] tracking-wider uppercase font-sans">
                    ANJANA JAT MAHASABHA
                  </p>
                  <p className="text-[10px] text-[#5C4E46]">
                    {t("tagline")}
                  </p>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed max-w-sm">
                {language === "hi"
                  ? "आँजणा समाज के गौरवशाली इतिहास, सांस्कृतिक धरोहर, कृषि स्वाभिमान एवं युवाओं के सर्वांगीण विकास हेतु समर्पित आधिकारिक अखिल भारतीय संगठन।"
                  : language === "gu"
                  ? "આંજણા સમાજના ગૌરવશાળી ઇતિહાસ, સાંસ્કૃતિક વારસો, કૃષિ સ્વાભિમાન અને યુવાનોના વિકાસ માટે સમર્પિત સર્વોચ્ચ સંગઠન."
                  : "The official apex all-India organization dedicated to authentic heritage preservation, agrarian dignity, and holistic youth empowerment."}
              </p>

              {/* Office & Contact Info */}
              <div className="space-y-2 pt-2 text-xs text-[#5C4E46]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#B52A12] shrink-0 mt-0.5" />
                  <span>{t("officeAddress")}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#B52A12] shrink-0" />
                  <span>{t("officialEmail")}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#B52A12] shrink-0" />
                  <span>{t("helplineText")}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2.5 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-[#29211D]/15 flex items-center justify-center text-[#5C4E46] hover:text-[#B52A12] hover:border-[#B52A12] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xs font-bold text-[#B52A12] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#D9A52B]/40 inline-block font-sans">
                {language === "hi" ? "महत्वपूर्ण पृष्ठ" : language === "gu" ? "મહત્વપૂર્ણ પૃષ્ઠો" : "Quick Links"}
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#5C4E46] hover:text-[#B52A12] transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Community & Services */}
            <div>
              <h3 className="text-xs font-bold text-[#B52A12] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#D9A52B]/40 inline-block font-sans">
                {language === "hi" ? "समाज मंच एवं सेवाएं" : language === "gu" ? "સમાજ મંચ અને સેવાઓ" : "Community & Services"}
              </h3>
              <ul className="space-y-2">
                {communityLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#5C4E46] hover:text-[#B52A12] transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: More Resources & Verification */}
            <div>
              <h3 className="text-xs font-bold text-[#B52A12] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#D9A52B]/40 inline-block font-sans">
                {language === "hi" ? "सहयोग एवं संपर्क" : language === "gu" ? "સહયોગ અને સંપર્ક" : "Connect & Support"}
              </h3>
              <ul className="space-y-2">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#5C4E46] hover:text-[#B52A12] transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 rounded-lg bg-white border border-[#D9A52B]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B52A12]">
                  <ShieldCheck size={14} className="text-[#D9A52B]" />
                  {language === "hi"
                    ? "सत्यापित आधिकारिक पोर्टल"
                    : language === "gu"
                    ? "પ્રમાણિત સત્તાવાર પોર્ટલ"
                    : "Verified Official Portal"}
                </div>
                <p className="text-[10px] text-[#5C4E46] mt-1 leading-snug">
                  {language === "hi"
                    ? "महासभा के सभी निर्णय, सदस्यता एवं दान पूर्णतः प्रामाणिक व सुरक्षित हैं।"
                    : language === "gu"
                    ? "મહાસભાના તમામ નિર્ણયો, સભ્યપદ અને દાન સંપૂર્ણપણે પ્રામાણિક અને સુરક્ષિત છે."
                    : "All Mahasabha decisions, memberships, and donations are authenticated and secure."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dignified Broadsheet Strip */}
        <div className="border-t border-[#29211D]/10 bg-[#FFF9EC]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C4E46]">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {t("brandTitle")} •{" "}
              {language === "hi"
                ? "सर्वाधिकार सुरक्षित"
                : language === "gu"
                ? "સર્વાધિકાર સુરક્ષિત"
                : "All Rights Reserved"}
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/about" className="hover:text-[#B52A12] transition-colors">
                {language === "hi" ? "विधान एवं नियमावली" : language === "gu" ? "બંધારણ અને નિયમો" : "Constitution & Bylaws"}
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[#B52A12] transition-colors">
                {t("navContact")}
              </Link>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#5C4E46]">
                {t("tagline")}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-[#B52A12] text-white flex items-center justify-center shadow-lg hover:bg-[#8F1F0B] hover:scale-105 transition-all border border-[#D9A52B]"
          aria-label="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Floating Quick Action: Membership ID Badge */}
      <Link
        href="/membership"
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-[#B52A12] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#8F1F0B] hover:scale-105 transition-all border border-[#D9A52B]"
      >
        <CreditCard size={14} className="text-[#D9A52B]" />
        {t("navMembership")}
      </Link>
    </>
  );
}