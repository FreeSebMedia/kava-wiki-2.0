import { useState, useEffect, useCallback } from 'react';
import { Language, defaultLanguage } from '@/lib/i18n';

// Cache for loaded translations
const translationCache: Record<string, Record<string, any>> = {};

// Dynamic import function for translation files
async function loadTranslation(lang: Language, namespace: string): Promise<Record<string, any>> {
  const cacheKey = `${lang}/${namespace}`;
  
  // Return cached translation if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // Dynamic import of JSON file
    const module = await import(`../locales/${lang}/${namespace}.json`);
    translationCache[cacheKey] = module.default || module;
    return translationCache[cacheKey];
  } catch (error) {
    // Fallback to default language if translation not found
    if (lang !== defaultLanguage) {
      console.warn(`Translation not found for ${lang}/${namespace}, falling back to ${defaultLanguage}`);
      return loadTranslation(defaultLanguage, namespace);
    }
    console.error(`Failed to load translation: ${cacheKey}`, error);
    return {};
  }
}

interface UseTranslationsOptions {
  namespaces: string[];
  lang: Language;
}

interface UseTranslationsResult {
  t: (key: string, params?: Record<string, string | number>) => any;
  translations: Record<string, any>;
  isLoading: boolean;
  lang: Language;
}

/**
 * Hook for loading and using translations
 * 
 * @example
 * const { t, isLoading } = useTranslations({ 
 *   namespaces: ['common', 'botanik'], 
 *   lang: 'de' 
 * });
 * 
 * // Simple usage
 * t('page.title') // "Botanik von Piper methysticum"
 * 
 * // With parameters
 * t('greeting', { name: 'Max' }) // "Hallo, Max!"
 */
export function useTranslations({ namespaces, lang }: UseTranslationsOptions): UseTranslationsResult {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAllTranslations() {
      setIsLoading(true);
      
      const loadedTranslations: Record<string, any> = {};
      
      await Promise.all(
        namespaces.map(async (namespace) => {
          const translation = await loadTranslation(lang, namespace);
          loadedTranslations[namespace] = translation;
        })
      );

      if (isMounted) {
        setTranslations(loadedTranslations);
        setIsLoading(false);
      }
    }

    loadAllTranslations();

    return () => {
      isMounted = false;
    };
  }, [lang, namespaces.join(',')]);

  /**
   * Get translation by key path
   * Supports nested keys like "page.title" and parameter interpolation
   * Returns arrays as-is for iteration, strings with optional parameter substitution
   */
  const t = useCallback((key: string, params?: Record<string, string | number>): any => {
    // Split key into namespace and path (e.g., "botanik:page.title" or just "page.title")
    let namespace = namespaces[0]; // Default to first namespace
    let path = key;

    if (key.includes(':')) {
      [namespace, path] = key.split(':');
    }

    // Navigate to the value using dot notation
    const keys = path.split('.');
    let value: any = translations[namespace];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found, return the key itself as fallback
        return key;
      }
    }

    // If value is an array or object, return it as-is for iteration
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      return value;
    }

    // If value is not a string, return key
    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters like {{name}} with actual values
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
        return params[paramKey]?.toString() ?? `{{${paramKey}}}`;
      });
    }

    return value;
  }, [translations, namespaces]);

  return { t, translations, isLoading, lang };
}

/**
 * Preload translations for faster initial render
 */
export async function preloadTranslations(lang: Language, namespaces: string[]): Promise<void> {
  await Promise.all(namespaces.map(ns => loadTranslation(lang, ns)));
}

/**
 * Get raw translation object (useful for arrays and complex structures)
 */
export function useRawTranslation(lang: Language, namespace: string) {
  const [translation, setTranslation] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    loadTranslation(lang, namespace).then((data) => {
      if (isMounted) {
        setTranslation(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [lang, namespace]);

  return { translation, isLoading };
}

export default useTranslations;
