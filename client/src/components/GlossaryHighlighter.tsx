import { ReactNode, useMemo, Fragment } from "react";
import { GlossaryTooltip } from "./GlossaryTooltip";
import { glossaryTermsData, findGlossaryTerm, GlossaryTermData } from "@/data/glossaryTerms";
import { Language } from "@/lib/i18n";

interface GlossaryHighlighterProps {
  children: string;
  lang: Language;
  /** Disable highlighting for specific terms */
  excludeTerms?: string[];
  /** Only highlight first occurrence of each term */
  firstOccurrenceOnly?: boolean;
}

/**
 * Component that automatically highlights glossary terms in text
 * and wraps them with interactive tooltips.
 */
export function GlossaryHighlighter({
  children,
  lang,
  excludeTerms = [],
  firstOccurrenceOnly = true,
}: GlossaryHighlighterProps) {
  const highlightedContent = useMemo(() => {
    if (!children || typeof children !== "string") {
      return children;
    }

    // Build a map of all searchable terms to their data
    const termMap = new Map<string, GlossaryTermData>();
    glossaryTermsData.forEach((term) => {
      if (!excludeTerms.includes(term.term.toLowerCase())) {
        termMap.set(term.term.toLowerCase(), term);
        if (term.germanTerm && !excludeTerms.includes(term.germanTerm.toLowerCase())) {
          termMap.set(term.germanTerm.toLowerCase(), term);
        }
      }
    });

    // Sort terms by length (longest first) to match longer terms before shorter ones
    const sortedTerms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);

    if (sortedTerms.length === 0) {
      return children;
    }

    // Create regex pattern that matches whole words only
    // Escape special regex characters in terms
    const escapedTerms = sortedTerms.map((term) =>
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const pattern = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");

    // Track which terms have been highlighted (for firstOccurrenceOnly)
    const highlightedTermIds = new Set<string>();

    // Split text by matches and create React elements
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(children)) !== null) {
      const matchedText = match[0];
      const matchedTerm = termMap.get(matchedText.toLowerCase());

      if (!matchedTerm) continue;

      // Check if we should skip this occurrence
      if (firstOccurrenceOnly && highlightedTermIds.has(matchedTerm.id)) {
        continue;
      }

      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(children.slice(lastIndex, match.index));
      }

      // Add the highlighted term with tooltip
      parts.push(
        <GlossaryTooltip key={`${matchedTerm.id}-${match.index}`} term={matchedTerm} lang={lang}>
          {matchedText}
        </GlossaryTooltip>
      );

      highlightedTermIds.add(matchedTerm.id);
      lastIndex = match.index + matchedText.length;
    }

    // Add remaining text after last match
    if (lastIndex < children.length) {
      parts.push(children.slice(lastIndex));
    }

    // If no matches found, return original text
    if (parts.length === 0) {
      return children;
    }

    return <>{parts}</>;
  }, [children, lang, excludeTerms, firstOccurrenceOnly]);

  return <>{highlightedContent}</>;
}

/**
 * Hook to get a function that highlights glossary terms in text
 */
export function useGlossaryHighlighter(lang: Language, excludeTerms: string[] = []) {
  return useMemo(() => {
    return (text: string, firstOccurrenceOnly = true) => (
      <GlossaryHighlighter
        lang={lang}
        excludeTerms={excludeTerms}
        firstOccurrenceOnly={firstOccurrenceOnly}
      >
        {text}
      </GlossaryHighlighter>
    );
  }, [lang, excludeTerms]);
}

/**
 * Context provider for glossary highlighting across the app
 */
export { GlossaryHighlighter as default };
