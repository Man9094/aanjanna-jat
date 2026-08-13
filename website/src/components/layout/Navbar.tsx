"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Heart,
  Users,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", description: "Our vision, mission & values" },
      { label: "Our History", href: "/history", description: "Heritage & milestones" },
      { label: "Leadership", href: "/leadership", description: "Committee & office bearers" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Community Services", href: "/services", description: "Education, healthcare & more" },
      { label: "Blood Donation", href: "/blood-donation", description: "Donor registry & search" },
      { label: "Scholarship Portal", href: "/scholarship", description: "Apply for scholarships" },
    ],
  },
  {
    label: "Community",
    href: "/events",
    children: [
      { label: "Events", href: "/events", description: "Upcoming & past events" },
      { label: "News & Updates", href: "/news", description: "Latest announcements" },
      { label: "Gallery", href: "/gallery", description: "Photos & videos" },
      { label: "Matrimonial", href: "/matrimonial", description: "Community matchmaking" },
      { label: "Business Directory", href: "/business-directory", description: "Local businesses" },
      { label: "Career Portal", href: "/careers", description: "Jobs & internships" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
  },
  {
    label: "Donation",
    href: "/donation",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-maroon text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-white/80">
              आंजना जाट महासभा में आपका स्वागत है
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/membership" className="hover:text-gold transition-colors">
              Register
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/donation" className="hover:text-gold transition-colors flex items-center gap-1">
              <Heart size={13} />
              Donate
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-strong shadow-lg"
            : "bg-background/95 backdrop-blur-sm"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Aanjana Jat Mahasabha Home">
              <Image
                src="/logo.png"
                alt="Aanjana Jat Mahasabha Logo"
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300 border border-saffron/20"
              />
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-foreground leading-tight">
                  Aanjana Jat Mahasabha
                </h1>
                <p className="text-[10px] lg:text-xs text-muted-foreground font-devanagari">
                  आंजना जाट महासभा
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "text-foreground/80 hover:text-saffron hover:bg-saffron/5"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-72 rounded-xl glass-strong shadow-xl overflow-hidden"
                        onMouseEnter={() => handleDropdownEnter(link.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-saffron/5 transition-colors group/item"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-sm font-medium text-foreground group-hover/item:text-saffron transition-colors">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-foreground/70 hover:text-saffron hover:bg-saffron/5 transition-colors"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                className="hidden sm:flex p-2 rounded-lg text-foreground/70 hover:text-saffron hover:bg-saffron/5 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/membership"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron to-saffron-light text-white text-sm font-medium hover:shadow-lg hover:shadow-saffron/25 transition-all duration-300 hover:scale-105"
              >
                <Users size={15} />
                Become a Member
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-saffron hover:bg-saffron/5 transition-colors"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-saffron hover:bg-saffron/5 transition-colors"
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform",
                              activeDropdown === link.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.label && (
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
                                  className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-saffron hover:bg-saffron/5 transition-colors"
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
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-saffron hover:bg-saffron/5 transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <Link
                    href="/membership"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-gradient-to-r from-saffron to-saffron-light text-white text-sm font-medium"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Users size={15} />
                    Become a Member
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
