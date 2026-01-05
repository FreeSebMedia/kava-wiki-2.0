import { createContext, useContext, ReactNode, useMemo } from "react";
import { Language } from "@/lib/i18n";
import { glossaryTermsData, GlossaryTermData, findGlossaryTerm } from "@/data/glossaryTerms";

interface GlossaryContextValue {
  terms: GlossaryTermData[];
  findTerm: (searchTerm: string) => GlossaryTermData | undefined;
  lang: Language;
  isEnabled: boolean;
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null);

interface GlossaryProviderProps {
  children: ReactNode;
  lang: Language;
  enabled?: boolean;
}

export function GlossaryProvider({ children, lang, enabled = true }: GlossaryProviderProps) {
  const value = useMemo<GlossaryContextValue>(
    () => ({
      terms: glossaryTermsData,
      findTerm: findGlossaryTerm,
      lang,
      isEnabled: enabled,
    }),
    [lang, enabled]
  );

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error("useGlossary must be used within a GlossaryProvider");
  }
  return context;
}

export function useGlossaryTerm(searchTerm: string): GlossaryTermData | undefined {
  const { findTerm } = useGlossary();
  return findTerm(searchTerm);
}

export default GlossaryProvider;
