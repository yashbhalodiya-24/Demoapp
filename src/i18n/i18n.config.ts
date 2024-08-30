import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import  en  from "../../locales/en.json";
import rus from "../../locales/rus.json";

const resources = {
  en:{
    translation:en,
  },
  rus:{
    translation:rus,
  },
}

i18next.use(initReactI18next).init({
  debug: true,
  lng:'rus',
  compatibilityJSON:'v1',
  fallbackLng:'rus',
  interpolation:{
    escapeValue:false,
  },
  resources
});

export default i18next;