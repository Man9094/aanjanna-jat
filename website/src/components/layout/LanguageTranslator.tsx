"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages: { code: Language; name: string; englishName: string; flag: string }[] = [
  { code: "hi", name: "हिंदी", englishName: "Hindi", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati", flag: "🇮🇳" },
  { code: "en", name: "English", englishName: "English", flag: "🇬🇧" },
];

export default function LanguageTranslator({ className = "" }: { className?: string }) {
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
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-semibold text-white transition-all shadow-xs group cursor-pointer whitespace-nowrap shrink-0"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe size={13} className="text-[#D9A52B] group-hover:rotate-12 transition-transform shrink-0" />
        <span className="font-semibold text-xs tracking-wide">{selected.flag} {selected.name}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 text-[#D9A52B] shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#FFF9EC] border border-[#D9A52B]/40 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#5C4E46] tracking-wider border-b border-[#D9A52B]/30 mb-1">
            {language === "hi" ? "भाषा का चयन करें" : language === "gu" ? "ભાષા પસંદ કરો" : "Select Language"}
          </div>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                  isSelected
                    ? "bg-[#FAF2E0] text-[#B52A12] font-bold border border-[#D9A52B]/40"
                    : "text-[#29211D] hover:bg-[#FAF2E0]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base shrink-0 leading-none">{lang.flag}</span>
                  <div>
                    <p className={`text-xs leading-tight ${isSelected ? "font-bold text-[#B52A12]" : "font-semibold text-[#29211D]"}`}>
                      {lang.name}
                    </p>
                    <p className="text-[10px] text-[#5C4E46] mt-0.5 leading-tight">{lang.englishName}</p>
                  </div>
                </div>
                {isSelected && <Check size={14} className="text-[#B52A12] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
