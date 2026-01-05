import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { Language, defaultLanguage, languages } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isValidLanguage: (code: string) => boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [location] = useLocation();
  const [lang, setLangState] = useState<Language>(defaultLanguage);

  // Extract language from URL path
  useEffect(() => {
    const pathParts = location.split('/').filter(Boolean);
    const urlLang = pathParts[0];
    
    if (urlLang && isValidLanguage(urlLang)) {
      setLangState(urlLang as Language);
    }
  }, [location]);

  const isValidLanguage = (code: string): boolean => {
    return code in languages;
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    // Save preference to localStorage
    localStorage.setItem('kava-wiki-language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isValidLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
