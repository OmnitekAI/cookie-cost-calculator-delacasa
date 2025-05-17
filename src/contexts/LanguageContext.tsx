
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/calculator';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  
  useEffect(() => {
    // Try to load preferred language from localStorage
    const savedLanguage = localStorage.getItem('delacasa_language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage as Language);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to localStorage
    localStorage.setItem('delacasa_language', lang);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
