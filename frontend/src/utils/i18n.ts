import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['path', 'cookie', 'localStorage', 'htmlTag', 'querystring'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Path where translation files are located
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
