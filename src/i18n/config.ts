import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonEn from './locales/common/en.json'
import commonAr from './locales/common/ar.json'

import homeEn from '@/pages/Home/locales/en.json'
import searchEn from '@/pages/SearchResults/locales/en.json'
import hotelEn from '@/pages/Hotel/locales/en.json'
import checkoutEn from '@/pages/Checkout/locales/en.json'
import confirmationEn from '@/pages/Checkout/Confirmation/locales/en.json'
import adminEn from '@/pages/Admin/locales/en.json'
import adminCitiesEn from '@/pages/Admin/Cities/locales/en.json'
import adminHotelsEn from '@/pages/Admin/Hotels/locales/en.json'
import adminRoomsEn from '@/pages/Admin/Rooms/locales/en.json'
import adminDashboardEn from '@/pages/Admin/Dashboard/locales/en.json'
import loginEn from '@/pages/Login/locales/en.json'
import errorEn from '@/pages/Error/locales/en.json'
import notFoundEn from '@/pages/NotFound/locales/en.json'
import forbiddenEn from '@/pages/Forbidden/locales/en.json'

import homeAr from '@/pages/Home/locales/ar.json'
import searchAr from '@/pages/SearchResults/locales/ar.json'
import hotelAr from '@/pages/Hotel/locales/ar.json'
import checkoutAr from '@/pages/Checkout/locales/ar.json'
import confirmationAr from '@/pages/Checkout/Confirmation/locales/ar.json'
import adminAr from '@/pages/Admin/locales/ar.json'
import adminCitiesAr from '@/pages/Admin/Cities/locales/ar.json'
import adminHotelsAr from '@/pages/Admin/Hotels/locales/ar.json'
import adminRoomsAr from '@/pages/Admin/Rooms/locales/ar.json'
import adminDashboardAr from '@/pages/Admin/Dashboard/locales/ar.json'
import loginAr from '@/pages/Login/locales/ar.json'
import errorAr from '@/pages/Error/locales/ar.json'
import notFoundAr from '@/pages/NotFound/locales/ar.json'
import forbiddenAr from '@/pages/Forbidden/locales/ar.json'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...commonEn,
          ...homeEn,
          ...searchEn,
          ...hotelEn,
          ...checkoutEn,
          ...confirmationEn,
          ...adminEn,
          ...adminCitiesEn,
          ...adminHotelsEn,
          ...adminRoomsEn,
          ...adminDashboardEn,
          ...loginEn,
          ...errorEn,
          ...notFoundEn,
          ...forbiddenEn,
        },
      },
      ar: {
        translation: {
          ...commonAr,
          ...homeAr,
          ...searchAr,
          ...hotelAr,
          ...checkoutAr,
          ...confirmationAr,
          ...adminAr,
          ...adminCitiesAr,
          ...adminHotelsAr,
          ...adminRoomsAr,
          ...adminDashboardAr,
          ...loginAr,
          ...errorAr,
          ...notFoundAr,
          ...forbiddenAr,
        },
      },
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'voya-language',
    },
  })

export default i18n
