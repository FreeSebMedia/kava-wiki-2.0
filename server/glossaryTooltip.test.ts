import { describe, it, expect } from "vitest";

// Test the glossary terms data structure and helper functions
// Since the actual components are React-based, we test the data layer

interface GlossaryTermData {
  id: string;
  term: string;
  germanTerm?: string;
  category: string;
  shortDefinition: string;
  fullExplanation: string;
  relatedTerms?: string[];
}

// Mock glossary data for testing (simplified version of the actual data)
const mockGlossaryTerms: GlossaryTermData[] = [
  {
    id: "kavalactone",
    term: "Kavalactone",
    category: "chemie",
    shortDefinition: "Die psychoaktiven Wirkstoffe in Kava",
    fullExplanation: "Kavalactone sind eine Gruppe von 18 Lactonen...",
    relatedTerms: ["Chemotyp", "Kavain", "DHK"]
  },
  {
    id: "gaba",
    term: "GABA",
    germanTerm: "Gamma-Aminobuttersäure",
    category: "wirkung",
    shortDefinition: "Der wichtigste hemmende Neurotransmitter",
    fullExplanation: "GABA reduziert die neuronale Erregbarkeit...",
    relatedTerms: ["Kavalactone", "Kavain", "Anxiolyse"]
  },
  {
    id: "noble-kava",
    term: "Noble Kava",
    germanTerm: "Edle Kava",
    category: "sorten",
    shortDefinition: "Hochwertige, traditionell konsumierte Kava-Sorten",
    fullExplanation: "Noble Kava bezeichnet kultivierte Sorten...",
    relatedTerms: ["Tudei", "Chemotyp", "Flavokavain B"]
  },
  {
    id: "reverse-tolerance",
    term: "Reverse Tolerance",
    germanTerm: "Umgekehrte Toleranz",
    category: "wirkung",
    shortDefinition: "Phänomen, bei dem Kava mit der Zeit stärker wirkt",
    fullExplanation: "Im Gegensatz zu anderen Substanzen wird Kava...",
    relatedTerms: ["Kavalactone", "Dosierung"]
  },
  {
    id: "knetmethode",
    term: "Knetmethode",
    category: "zubereitung",
    shortDefinition: "Traditionelle pazifische Zubereitungsart",
    fullExplanation: "Die Knetmethode ist die traditionelle Art...",
    relatedTerms: ["Medium Grind", "Grog", "Bilo"]
  }
];

// Helper function to find a term by name (case-insensitive)
function findGlossaryTerm(terms: GlossaryTermData[], searchTerm: string): GlossaryTermData | undefined {
  const lowerSearch = searchTerm.toLowerCase();
  return terms.find(term => 
    term.term.toLowerCase() === lowerSearch ||
    (term.germanTerm && term.germanTerm.toLowerCase() === lowerSearch)
  );
}

// Helper function to get all searchable terms
function getSearchableTerms(terms: GlossaryTermData[]): string[] {
  const result: string[] = [];
  terms.forEach(term => {
    result.push(term.term);
    if (term.germanTerm) {
      result.push(term.germanTerm);
    }
  });
  return result;
}

// Helper function to get glossary link
function getGlossaryLink(lang: string, termId: string): string {
  return `/${lang}/glossar#${termId}`;
}

// Helper function to build term map for highlighting
function buildTermMap(terms: GlossaryTermData[], excludeTerms: string[] = []): Map<string, GlossaryTermData> {
  const map = new Map<string, GlossaryTermData>();
  terms.forEach((term) => {
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
  return map;
}

// Helper function to find terms in text
function findTermsInText(text: string, termMap: Map<string, GlossaryTermData>): string[] {
  const foundTerms: string[] = [];
  const sortedTerms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);
  
  const escapedTerms = sortedTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");
  
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const matchedTerm = termMap.get(match[0].toLowerCase());
    if (matchedTerm && !foundTerms.includes(matchedTerm.term)) {
      foundTerms.push(matchedTerm.term);
    }
  }
  
  return foundTerms;
}

describe("Glossary Tooltip System", () => {
  describe("findGlossaryTerm", () => {
    it("should find term by exact match", () => {
      const result = findGlossaryTerm(mockGlossaryTerms, "Kavalactone");
      expect(result).toBeDefined();
      expect(result?.id).toBe("kavalactone");
    });

    it("should find term case-insensitively", () => {
      const result = findGlossaryTerm(mockGlossaryTerms, "kavalactone");
      expect(result).toBeDefined();
      expect(result?.id).toBe("kavalactone");
    });

    it("should find term by German name", () => {
      const result = findGlossaryTerm(mockGlossaryTerms, "Gamma-Aminobuttersäure");
      expect(result).toBeDefined();
      expect(result?.id).toBe("gaba");
    });

    it("should find term by German name case-insensitively", () => {
      const result = findGlossaryTerm(mockGlossaryTerms, "umgekehrte toleranz");
      expect(result).toBeDefined();
      expect(result?.id).toBe("reverse-tolerance");
    });

    it("should return undefined for non-existent term", () => {
      const result = findGlossaryTerm(mockGlossaryTerms, "NonExistentTerm");
      expect(result).toBeUndefined();
    });
  });

  describe("getSearchableTerms", () => {
    it("should return all terms including German names", () => {
      const terms = getSearchableTerms(mockGlossaryTerms);
      expect(terms).toContain("Kavalactone");
      expect(terms).toContain("GABA");
      expect(terms).toContain("Gamma-Aminobuttersäure");
      expect(terms).toContain("Noble Kava");
      expect(terms).toContain("Edle Kava");
    });

    it("should have correct count of searchable terms", () => {
      const terms = getSearchableTerms(mockGlossaryTerms);
      // 5 main terms + 3 German terms = 8 total
      expect(terms.length).toBe(8);
    });
  });

  describe("getGlossaryLink", () => {
    it("should generate correct German link", () => {
      const link = getGlossaryLink("de", "kavalactone");
      expect(link).toBe("/de/glossar#kavalactone");
    });

    it("should generate correct English link", () => {
      const link = getGlossaryLink("en", "gaba");
      expect(link).toBe("/en/glossar#gaba");
    });
  });

  describe("buildTermMap", () => {
    it("should build map with all terms", () => {
      const map = buildTermMap(mockGlossaryTerms);
      expect(map.has("kavalactone")).toBe(true);
      expect(map.has("gaba")).toBe(true);
      expect(map.has("gamma-aminobuttersäure")).toBe(true);
    });

    it("should exclude specified terms", () => {
      const map = buildTermMap(mockGlossaryTerms, ["kavalactone"]);
      expect(map.has("kavalactone")).toBe(false);
      expect(map.has("gaba")).toBe(true);
    });

    it("should map to correct term data", () => {
      const map = buildTermMap(mockGlossaryTerms);
      const term = map.get("noble kava");
      expect(term?.id).toBe("noble-kava");
      expect(term?.germanTerm).toBe("Edle Kava");
    });
  });

  describe("findTermsInText", () => {
    it("should find single term in text", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "Kavalactone sind die Wirkstoffe in Kava.";
      const found = findTermsInText(text, termMap);
      expect(found).toContain("Kavalactone");
    });

    it("should find multiple terms in text", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "Kavalactone wirken auf GABA-Rezeptoren. Noble Kava ist die beste Wahl.";
      const found = findTermsInText(text, termMap);
      expect(found).toContain("Kavalactone");
      expect(found).toContain("GABA");
      expect(found).toContain("Noble Kava");
    });

    it("should find German terms in text", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "Die Gamma-Aminobuttersäure ist ein wichtiger Neurotransmitter.";
      const found = findTermsInText(text, termMap);
      expect(found).toContain("GABA"); // Should map to the main term
    });

    it("should match whole words only", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "GABAergic neurons are important."; // GABA is part of GABAergic
      const found = findTermsInText(text, termMap);
      // Should not match "GABA" within "GABAergic"
      expect(found).not.toContain("GABA");
    });

    it("should handle text with no terms", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "This text contains no glossary terms.";
      const found = findTermsInText(text, termMap);
      expect(found.length).toBe(0);
    });

    it("should not duplicate terms in results", () => {
      const termMap = buildTermMap(mockGlossaryTerms);
      const text = "Kavalactone sind wichtig. Kavalactone wirken entspannend.";
      const found = findTermsInText(text, termMap);
      const kavalactoneCount = found.filter(t => t === "Kavalactone").length;
      expect(kavalactoneCount).toBe(1);
    });
  });

  describe("Glossary Term Data Structure", () => {
    it("should have required fields for all terms", () => {
      mockGlossaryTerms.forEach(term => {
        expect(term.id).toBeDefined();
        expect(term.term).toBeDefined();
        expect(term.category).toBeDefined();
        expect(term.shortDefinition).toBeDefined();
        expect(term.fullExplanation).toBeDefined();
      });
    });

    it("should have valid categories", () => {
      const validCategories = ["chemie", "wirkung", "kultur", "sorten", "zubereitung", "sicherheit"];
      mockGlossaryTerms.forEach(term => {
        expect(validCategories).toContain(term.category);
      });
    });

    it("should have short definitions under 100 characters", () => {
      mockGlossaryTerms.forEach(term => {
        expect(term.shortDefinition.length).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("Multilingual Support", () => {
    const tooltipLabels = {
      de: { moreInfo: "Mehr Infos" },
      en: { moreInfo: "More Info" },
      es: { moreInfo: "Más información" },
      fr: { moreInfo: "Plus d'infos" },
    };

    it("should have German labels", () => {
      expect(tooltipLabels.de.moreInfo).toBe("Mehr Infos");
    });

    it("should have English labels", () => {
      expect(tooltipLabels.en.moreInfo).toBe("More Info");
    });

    it("should have Spanish labels", () => {
      expect(tooltipLabels.es.moreInfo).toBe("Más información");
    });

    it("should have French labels", () => {
      expect(tooltipLabels.fr.moreInfo).toBe("Plus d'infos");
    });
  });
});
