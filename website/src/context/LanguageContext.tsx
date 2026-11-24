"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey } from "@/data/translations";

export type Language = "gu" | "hi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | { gu: string; hi: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  setLanguage: () => {},
  t: (key) => (typeof key === "string" ? key : key.hi || key.gu || key.en),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("hi");

  useEffect(() => {
    try {
      let saved: Language | null = null;
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get("lang");
        if (urlLang && ["gu", "hi", "en"].includes(urlLang)) {
          saved = urlLang as Language;
        }
      }
      if (!saved) {
        saved = (localStorage.getItem("app_language") || localStorage.getItem("ajm_language")) as Language;
      }
      if (!saved && typeof document !== "undefined") {
        const match = document.cookie.match(/(?:^|;\s*)app_language=([^;]+)/);
        if (match && ["gu", "hi", "en"].includes(match[1])) {
          saved = match[1] as Language;
        }
      }
      if (saved && ["gu", "hi", "en"].includes(saved)) {
        setLanguageState(saved);
        if (typeof document !== "undefined") {
          document.documentElement.lang = saved;
          document.cookie = `app_language=${saved}; path=/; max-age=31536000; SameSite=Lax`;
          localStorage.setItem("app_language", saved);
          localStorage.setItem("ajm_language", saved);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("app_language", lang);
      localStorage.setItem("ajm_language", lang);
      document.cookie = `app_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage unavailable
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const t = (key: TranslationKey | { gu: string; hi: string; en: string }) => {
    if (typeof key === "object" && key !== null) {
      return key[language] || key.hi || key.gu || key.en || "";
    }
    const item = translations[key as TranslationKey];
    if (item) {
      return item[language] || item.hi || item.gu || item.en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
