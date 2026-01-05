import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { detectBrowserLanguage, getStoredLanguage, saveLanguagePreference, isFirstVisit } from '@/hooks/useLanguageDetection';
import { Language, languages } from '@/lib/i18n';

/**
 * Component that handles automatic language detection and redirection
 * Only redirects on first visit when user lands on root path
 */
export default function LanguageRedirect() {
  const [location, setLocation] = useLocation();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only run once
    if (hasChecked) return;
    setHasChecked(true);

    // Only redirect if on root path
    if (location !== '/') return;

    // Check for stored preference first
    const storedLang = getStoredLanguage();
    if (storedLang) {
      setLocation(`/${storedLang}`);
      return;
    }

    // First visit - detect browser language and redirect
    const detectedLang = detectBrowserLanguage();
    saveLanguagePreference(detectedLang);
    setLocation(`/${detectedLang}`);
  }, [location, setLocation, hasChecked]);

  return null;
}

/**
 * Hook to get the current language from URL and save preference when changed
 */
export function useCurrentLanguage(): Language {
  const [location] = useLocation();
  
  // Extract language from URL
  const pathLang = location.split('/')[1];
  const currentLang = (pathLang && pathLang in languages) ? pathLang as Language : 'de';
  
  // Save preference whenever language changes via URL
  useEffect(() => {
    if (currentLang && currentLang in languages) {
      saveLanguagePreference(currentLang);
    }
  }, [currentLang]);
  
  return currentLang;
}
