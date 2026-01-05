import { ReactNode, useMemo, Children, isValidElement, cloneElement, ReactElement } from "react";
import { GlossaryTooltip } from "./GlossaryTooltip";
import { glossaryTermsData, GlossaryTermData } from "@/data/glossaryTerms";
import { Language } from "@/lib/i18n";

interface GlossaryTextProps {
  children: ReactNode;
  lang: Language;
  /** Disable highlighting for specific terms */
  excludeTerms?: string[];
  /** Only highlight first occurrence of each term */
  firstOccurrenceOnly?: boolean;
}

/**
 * Recursively processes React children to find and highlight glossary terms
 */
function processChildren(
  children: ReactNode,
  lang: Language,
  termMap: Map<string, GlossaryTermData>,
  sortedTerms: string[],
  highlightedTermIds: Set<string>,
  firstOccurrenceOnly: boolean
): ReactNode {
  return Children.map(children, (child) => {
    // Handle string children (text nodes)
    if (typeof child === "string") {
      return highlightText(child, lang, termMap, sortedTerms, highlightedTermIds, firstOccurrenceOnly);
    }

    // Handle React elements
    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      
      // Skip certain elements that shouldn't have tooltips inside
      const skipTags = ["a", "button", "input", "select", "textarea", "code", "pre"];
      if (typeof element.type === "string" && skipTags.includes(element.type)) {
        return child;
      }

      // Skip if it's already a GlossaryTooltip
      if (element.type === GlossaryTooltip) {
        return child;
      }

      // Recursively process children
      const elementProps = element.props as { children?: ReactNode };
      const processedChildren = processChildren(
        elementProps.children,
        lang,
        termMap,
        sortedTerms,
        highlightedTermIds,
        firstOccurrenceOnly
      );

      return cloneElement(element, undefined, processedChildren);
    }

    return child;
  });
}

/**
 * Highlights glossary terms in a text string
 */
function highlightText(
  text: string,
  lang: Language,
  termMap: Map<string, GlossaryTermData>,
  sortedTerms: string[],
  highlightedTermIds: Set<string>,
  firstOccurrenceOnly: boolean
): ReactNode {
  if (!text || sortedTerms.length === 0) {
    return text;
  }

  // Create regex pattern that matches whole words only
  const escapedTerms = sortedTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchedText = match[0];
    const matchedTerm = termMap.get(matchedText.toLowerCase());

    if (!matchedTerm) continue;

    // Check if we should skip this occurrence
    if (firstOccurrenceOnly && highlightedTermIds.has(matchedTerm.id)) {
      continue;
    }

    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
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
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no matches found, return original text
  if (parts.length === 0) {
    return text;
  }

  return <>{parts}</>;
}

/**
 * Component that automatically highlights glossary terms in any React content
 * and wraps them with interactive tooltips.
 * 
 * Usage:
 * ```tsx
 * <GlossaryText lang="de">
 *   <p>Kavalactone sind die Wirkstoffe in Kava.</p>
 * </GlossaryText>
 * ```
 */
export function GlossaryText({
  children,
  lang,
  excludeTerms = [],
  firstOccurrenceOnly = true,
}: GlossaryTextProps) {
  const { termMap, sortedTerms } = useMemo(() => {
    // Build a map of all searchable terms to their data
    const map = new Map<string, GlossaryTermData>();
    glossaryTermsData.forEach((term) => {
      const termLower = term.term.toLowerCase();
      if (!excludeTerms.includes(termLower)) {
        map.set(termLower, term);
        if (term.germanTerm) {
          const germanLower = term.germanTerm.toLowerCase();
          if (!excludeTerms.includes(germanLower)) {
            map.set(germanLower, term);
          }
        }
      }
    });

    // Sort terms by length (longest first) to match longer terms before shorter ones
    const sorted = Array.from(map.keys()).sort((a, b) => b.length - a.length);

    return { termMap: map, sortedTerms: sorted };
  }, [excludeTerms]);

  const highlightedTermIds = useMemo(() => new Set<string>(), [children]);

  const processedContent = useMemo(() => {
    highlightedTermIds.clear();
    return processChildren(
      children,
      lang,
      termMap,
      sortedTerms,
      highlightedTermIds,
      firstOccurrenceOnly
    );
  }, [children, lang, termMap, sortedTerms, highlightedTermIds, firstOccurrenceOnly]);

  return <>{processedContent}</>;
}

export default GlossaryText;
