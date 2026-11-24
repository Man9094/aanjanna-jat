"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageTranslator from "@/components/layout/LanguageTranslator";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const navLinks = [
    {
      label: t("navHome"),
      key: "home",
      href: "/",
    },
    {
      label: t("navAbout"),
      key: "about",
      href: "/about",
      children: [
        { label: t("navAboutUs"), href: "/about" },
        { label: t("navHistory"), href: "/history" },
        { label: t("navLeadership"), href: "/leadership" },
        { label: t("navCommunityMembers"), href: "/community-members" },
        { label: t("navVillages"), href: "/villages" },
      ],
    },
    {
      label: t("navServices"),
      key: "services",
      href: "/services",
      children: [
        { label: t("navCommunityServices"), href: "/services" },
        { label: t("navBloodDonation"), href: "/blood-donation" },
        { label: t("navScholarship"), href: "/scholarship" },
      ],
    },
    {
      label: t("navCommunity"),
      key: "community",
      href: "/events",
      children: [
        { label: t("navEvents"), href: "/events" },
        { label: t("navNews"), href: "/news" },
        { label: t("navGallery"), href: "/gallery" },
        { label: t("navMatrimonial"), href: "/matrimonial" },
        { label: t("navBusinessDirectory"), href: "/business-directory" },
        { label: t("navCareers"), href: "/careers" },
      ],
    },
    {
      label: t("navMembership"),
      key: "membership",
      href: "/membership",
    },
    {
      label: t("navDonation"),
      key: "donation",
      href: "/donation",
    },
    {
      label: t("navContact"),
      key: "contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      {/* Dignified Top Bar (Kesari Red) */}
      <div className="bg-[#B52A12] text-white text-xs py-2 px-3 sm:px-6 border-b border-[#D9A52B]/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0">
            <span className="font-semibold tracking-wide text-white/95 truncate text-[11px] sm:text-xs">
              {t("brandTitle")} | {t("tagline")}
            </span>
            <span className="hidden md:inline-block text-[#D9A52B] font-bold">•</span>
            <span className="hidden md:inline text-white/80">
              {t("helplineText")}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <LanguageTranslator />
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link
              href="/membership"
              className="hidden sm:flex items-center gap-1 text-white hover:text-[#D9A52B] transition-colors font-medium"
            >
              <CreditCard size={13} className="text-[#D9A52B]" />
              {t("navMembership")}
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link
              href="/donation"
              className="hover:text-[#D9A52B] transition-colors flex items-center gap-1 font-medium"
            >
              <Heart size={13} className="text-[#D9A52B]" />
              {t("navDonation")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-200 bg-[#FFF9EC] border-b border-[#D9A52B]/40 shadow-xs",
          isScrolled
            ? "border-[#D9A52B]/40 shadow-md py-1"
            : "border-[#29211D]/10 py-2.5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Authoritative Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group"
              aria-label="Home"
            >
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full p-0.5 bg-white border-2 border-[#D9A52B] shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Anjana Jat Mahasabha Seal"
                  width={56}
                  height={56}
                  priority
                  className="w-full h-full rounded-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold font-devanagari text-[#B52A12] leading-tight tracking-tight">
                  {t("brandTitle")}
                </h1>
                <p className="text-[10px] lg:text-[11px] font-semibold text-[#29211D] tracking-wider uppercase font-sans">
                  ANJANA JAT MAHASABHA
                </p>
                <p className="text-[9px] text-[#5C4E46]">
                  {t("tagline")}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => link.children && handleDropdownEnter(link.key)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                      "text-[#29211D] hover:text-[#B52A12] hover:bg-[#FAF2E0]"
                    )}
                  >
                    <span>{link.label}</span>
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200 text-[#5C4E46]",
                          activeDropdown === link.key && "rotate-180 text-[#B52A12]"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.key && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        transition={{ type: "spring", stiffness: 220, damping: 28 }}
                        className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-[#FFF9EC] border border-[#D9A52B]/40 shadow-xl overflow-hidden z-50"
                        onMouseEnter={() => handleDropdownEnter(link.key)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2 space-y-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3.5 py-2 rounded-lg hover:bg-[#FAF2E0] transition-colors text-xs sm:text-sm font-semibold text-[#29211D] hover:text-[#B52A12]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Action: Membership Badge CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/membership"
                className="hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full bg-[#B52A12] text-white text-xs lg:text-sm font-bold border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] hover:shadow-md transition-all font-sans cursor-pointer"
              >
                <CreditCard size={15} className="text-[#D9A52B]" />
                {t("navMembership")}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[#29211D] hover:bg-[#FAF2E0] transition-colors border border-[#29211D]/15 cursor-pointer"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-[#29211D]/10 bg-[#FFF9EC] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1.5 max-h-[75vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <div key={link.key}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === link.key ? null : link.key
                            )
                          }
                          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-bold text-[#29211D] hover:bg-[#FAF2E0] transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform",
                              activeDropdown === link.key && "rotate-180 text-[#B52A12]"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.key && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block px-3 py-2 rounded-lg text-xs font-medium text-[#5C4E46] hover:text-[#B52A12] hover:bg-[#FAF2E0] transition-colors"
                                  onClick={() => setIsMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-3.5 py-2.5 rounded-lg text-sm font-bold text-[#29211D] hover:bg-[#FAF2E0] hover:text-[#B52A12] transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-[#29211D]/10 space-y-2.5">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs font-bold text-[#5C4E46] uppercase tracking-wider">
                      {t({ hi: "भाषा बदलें", gu: "ભાષા બદલો", en: "Select Language" })}
                    </span>
                    <LanguageTranslator />
                  </div>
                  <Link
                    href="/membership"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#B52A12] text-white text-sm font-bold border border-[#D9A52B] shadow-sm"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <CreditCard size={16} className="text-[#D9A52B]" />
                    {t("navMembership")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
