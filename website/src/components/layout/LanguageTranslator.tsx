"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages: { code: Language; name: string; englishName: string; flag: string }[] = [
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati", flag: "🇮🇳" },
  { code: "hi", name: "हिंदी", englishName: "Hindi", flag: "🇮🇳" },
  { code: "en", name: "English", englishName: "English", flag: "🇬🇧" },
];

export default function LanguageTranslator() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const selected = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground hover:border-saffron hover:text-saffron transition-all shadow-sm group"
        aria-label="Select Language"
      >
        <Globe size={14} className="text-saffron group-hover:rotate-12 transition-transform" />
        <span className="font-devanagari">{selected.flag} {selected.name}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-border mb-1">
            ભાષા પસંદ કરો / भाषा चुनें
          </div>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  isSelected
                    ? "bg-saffron/10 text-saffron font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <div>
                    <p className="font-devanagari text-xs font-bold leading-none">{lang.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">{lang.englishName}</p>
                  </div>
                </div>
                {isSelected && <Check size={14} className="text-saffron" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
