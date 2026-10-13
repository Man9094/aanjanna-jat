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
  language: "gu",
  setLanguage: () => {},
  t: (key) => (typeof key === "string" ? key : key.gu || key.hi || key.en),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("gu");

  useEffect(() => {
    const saved = localStorage.getItem("app_language") as Language;
    if (saved && ["gu", "hi", "en"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: TranslationKey | { gu: string; hi: string; en: string }) => {
    if (typeof key === "object" && key !== null) {
      return key[language] || key.gu || key.hi || key.en || "";
    }
    const item = translations[key as TranslationKey];
    if (item) {
      return item[language] || item.gu || item.hi || item.en;
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
