import { createContext, useContext } from 'react';

export type Language = 
  | 'de' | 'en' | 'es' | 'fr' | 'nl' | 'pl' | 'cs' 
  | 'pt' | 'ja' | 'zh' | 'ru' | 'tr' | 'ka' | 'el' 
  | 'bg' | 'hu' | 'ro' | 'it' | 'no' | 'da' | 'fi' | 'sv';

export const languages: Record<Language, { name: string; flag: string; nativeName: string }> = {
  de: { name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  es: { name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  fr: { name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  nl: { name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  pl: { name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  cs: { name: 'Czech', flag: '🇨🇿', nativeName: 'Čeština' },
  pt: { name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  ja: { name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  zh: { name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  ru: { name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  tr: { name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  ka: { name: 'Georgian', flag: '🇬🇪', nativeName: 'ქართული' },
  el: { name: 'Greek', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  bg: { name: 'Bulgarian', flag: '🇧🇬', nativeName: 'Български' },
  hu: { name: 'Hungarian', flag: '🇭🇺', nativeName: 'Magyar' },
  ro: { name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
  it: { name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  no: { name: 'Norwegian', flag: '🇳🇴', nativeName: 'Norsk' },
  da: { name: 'Danish', flag: '🇩🇰', nativeName: 'Dansk' },
  fi: { name: 'Finnish', flag: '🇫🇮', nativeName: 'Suomi' },
  sv: { name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
};

// Default content is currently only in German
export const defaultLanguage: Language = 'de';

// Simple translation hook placeholder
// In a real app, this would load JSON files
export function useTranslation(lang: Language) {
  return {
    t: (key: string) => key, // Placeholder
    lang
  };
}
