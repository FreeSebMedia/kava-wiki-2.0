import { useEffect, useState } from 'react';
import { Language, languages, defaultLanguage } from '@/lib/i18n';

const LANGUAGE_STORAGE_KEY = 'kava-wiki-language';

/**
 * Detects the user's preferred language from browser settings
 * and stores the preference in LocalStorage
 */
export function useLanguageDetection() {
  const [detectedLanguage, setDetectedLanguage] = useState<Language | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if user has a stored language preference
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (storedLang && storedLang in languages) {
      setDetectedLanguage(storedLang as Language);
      setIsFirstVisit(false);
      return;
    }

    // First visit - detect browser language
    setIsFirstVisit(true);
    const browserLang = detectBrowserLanguage();
    setDetectedLanguage(browserLang);
    
    // Store the detected language
    localStorage.setItem(LANGUAGE_STORAGE_KEY, browserLang);
  }, []);

  return { detectedLanguage, isFirstVisit };
}

/**
 * Detects the browser's preferred language and maps it to a supported language
 */
export function detectBrowserLanguage(): Language {
  // Get browser languages (ordered by preference)
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    // Extract the primary language code (e.g., 'de-DE' -> 'de')
    const primaryCode = browserLang.split('-')[0].toLowerCase();
    
    // Check if we support this language
    if (primaryCode in languages) {
      return primaryCode as Language;
    }
    
    // Special mappings for language variants
    const languageMap: Record<string, Language> = {
      'nb': 'no', // Norwegian Bokmål -> Norwegian
      'nn': 'no', // Norwegian Nynorsk -> Norwegian
      'pt-br': 'pt', // Brazilian Portuguese -> Portuguese
      'zh-tw': 'zh', // Traditional Chinese -> Chinese
      'zh-hk': 'zh', // Hong Kong Chinese -> Chinese
    };
    
    const fullCode = browserLang.toLowerCase();
    if (fullCode in languageMap) {
      return languageMap[fullCode];
    }
  }
  
  // Default to German if no supported language found
  return defaultLanguage;
}

/**
 * Saves the user's language preference to LocalStorage
 */
export function saveLanguagePreference(lang: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

/**
 * Gets the stored language preference from LocalStorage
 */
export function getStoredLanguage(): Language | null {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && stored in languages) {
    return stored as Language;
  }
  return null;
}

/**
 * Checks if this is the user's first visit (no stored preference)
 */
export function isFirstVisit(): boolean {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === null;
}
