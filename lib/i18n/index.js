"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Import translations
import en from './locales/en.json';
import hi from './locales/hi.json';
import od from './locales/od.json';

const translations = { en, hi, od };

const I18nContext = createContext();

export { I18nContext };

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};