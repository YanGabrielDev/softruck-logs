import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import ptTranslation from "./locales/pt/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: "pt",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
