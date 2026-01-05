import { Language } from "@/lib/i18n";

export interface GlossaryTermData {
  id: string;
  term: string;
  germanTerm?: string;
  category: "chemie" | "wirkung" | "kultur" | "sorten" | "zubereitung" | "sicherheit";
  shortDefinition: string;
  fullExplanation: string;
  relatedTerms?: string[];
}

// Multilingual labels for the tooltip
export const tooltipLabels: Record<Language, { moreInfo: string }> = {
  de: { moreInfo: "Mehr Infos" },
  en: { moreInfo: "More Info" },
  es: { moreInfo: "Más información" },
  fr: { moreInfo: "Plus d'infos" },
  nl: { moreInfo: "Meer info" },
  pl: { moreInfo: "Więcej informacji" },
  cs: { moreInfo: "Více informací" },
  pt: { moreInfo: "Mais informações" },
  ja: { moreInfo: "詳細" },
  zh: { moreInfo: "更多信息" },
  ru: { moreInfo: "Подробнее" },
  tr: { moreInfo: "Daha fazla bilgi" },
  ka: { moreInfo: "მეტი ინფორმაცია" },
  el: { moreInfo: "Περισσότερες πληροφορίες" },
  bg: { moreInfo: "Повече информация" },
  hu: { moreInfo: "További információ" },
  ro: { moreInfo: "Mai multe informații" },
  it: { moreInfo: "Maggiori informazioni" },
  no: { moreInfo: "Mer informasjon" },
  da: { moreInfo: "Mere information" },
  fi: { moreInfo: "Lisätietoja" },
  sv: { moreInfo: "Mer information" },
};

// Category labels for multilingual support
export const categoryLabels: Record<Language, Record<string, string>> = {
  de: {
    chemie: "Chemie & Inhaltsstoffe",
    wirkung: "Wirkung & Effekte",
    kultur: "Kultur & Tradition",
    sorten: "Sorten & Varietäten",
    zubereitung: "Zubereitung",
    sicherheit: "Sicherheit"
  },
  en: {
    chemie: "Chemistry & Compounds",
    wirkung: "Effects & Benefits",
    kultur: "Culture & Tradition",
    sorten: "Strains & Varieties",
    zubereitung: "Preparation",
    sicherheit: "Safety"
  },
  es: {
    chemie: "Química y Compuestos",
    wirkung: "Efectos y Beneficios",
    kultur: "Cultura y Tradición",
    sorten: "Variedades",
    zubereitung: "Preparación",
    sicherheit: "Seguridad"
  },
  fr: {
    chemie: "Chimie et Composés",
    wirkung: "Effets et Bienfaits",
    kultur: "Culture et Tradition",
    sorten: "Variétés",
    zubereitung: "Préparation",
    sicherheit: "Sécurité"
  },
  nl: {
    chemie: "Chemie & Stoffen",
    wirkung: "Effecten & Voordelen",
    kultur: "Cultuur & Traditie",
    sorten: "Soorten & Variëteiten",
    zubereitung: "Bereiding",
    sicherheit: "Veiligheid"
  },
  pl: {
    chemie: "Chemia i Składniki",
    wirkung: "Efekty i Korzyści",
    kultur: "Kultura i Tradycja",
    sorten: "Odmiany",
    zubereitung: "Przygotowanie",
    sicherheit: "Bezpieczeństwo"
  },
  cs: {
    chemie: "Chemie a Složky",
    wirkung: "Účinky a Přínosy",
    kultur: "Kultura a Tradice",
    sorten: "Odrůdy",
    zubereitung: "Příprava",
    sicherheit: "Bezpečnost"
  },
  pt: {
    chemie: "Química e Compostos",
    wirkung: "Efeitos e Benefícios",
    kultur: "Cultura e Tradição",
    sorten: "Variedades",
    zubereitung: "Preparação",
    sicherheit: "Segurança"
  },
  ja: {
    chemie: "化学と成分",
    wirkung: "効果と効能",
    kultur: "文化と伝統",
    sorten: "品種",
    zubereitung: "調製",
    sicherheit: "安全性"
  },
  zh: {
    chemie: "化学与成分",
    wirkung: "效果与益处",
    kultur: "文化与传统",
    sorten: "品种",
    zubereitung: "制备",
    sicherheit: "安全性"
  },
  ru: {
    chemie: "Химия и Соединения",
    wirkung: "Эффекты и Преимущества",
    kultur: "Культура и Традиции",
    sorten: "Сорта и Разновидности",
    zubereitung: "Приготовление",
    sicherheit: "Безопасность"
  },
  tr: {
    chemie: "Kimya ve Bileşenler",
    wirkung: "Etkiler ve Faydalar",
    kultur: "Kültür ve Gelenek",
    sorten: "Çeşitler",
    zubereitung: "Hazırlık",
    sicherheit: "Güvenlik"
  },
  ka: {
    chemie: "ქიმია და ნაერთები",
    wirkung: "ეფექტები და სარგებელი",
    kultur: "კულტურა და ტრადიცია",
    sorten: "ჯიშები",
    zubereitung: "მომზადება",
    sicherheit: "უსაფრთხოება"
  },
  el: {
    chemie: "Χημεία & Ενώσεις",
    wirkung: "Επιδράσεις & Οφέλη",
    kultur: "Πολιτισμός & Παράδοση",
    sorten: "Ποικιλίες",
    zubereitung: "Παρασκευή",
    sicherheit: "Ασφάλεια"
  },
  bg: {
    chemie: "Химия и Съединения",
    wirkung: "Ефекти и Ползи",
    kultur: "Култура и Традиция",
    sorten: "Сортове",
    zubereitung: "Приготвяне",
    sicherheit: "Безопасност"
  },
  hu: {
    chemie: "Kémia és Vegyületek",
    wirkung: "Hatások és Előnyök",
    kultur: "Kultúra és Hagyomány",
    sorten: "Fajták",
    zubereitung: "Elkészítés",
    sicherheit: "Biztonság"
  },
  ro: {
    chemie: "Chimie și Compuși",
    wirkung: "Efecte și Beneficii",
    kultur: "Cultură și Tradiție",
    sorten: "Soiuri",
    zubereitung: "Preparare",
    sicherheit: "Siguranță"
  },
  it: {
    chemie: "Chimica e Composti",
    wirkung: "Effetti e Benefici",
    kultur: "Cultura e Tradizione",
    sorten: "Varietà",
    zubereitung: "Preparazione",
    sicherheit: "Sicurezza"
  },
  no: {
    chemie: "Kjemi og Forbindelser",
    wirkung: "Effekter og Fordeler",
    kultur: "Kultur og Tradisjon",
    sorten: "Sorter",
    zubereitung: "Tilberedning",
    sicherheit: "Sikkerhet"
  },
  da: {
    chemie: "Kemi og Forbindelser",
    wirkung: "Effekter og Fordele",
    kultur: "Kultur og Tradition",
    sorten: "Sorter",
    zubereitung: "Tilberedning",
    sicherheit: "Sikkerhed"
  },
  fi: {
    chemie: "Kemia ja Yhdisteet",
    wirkung: "Vaikutukset ja Hyödyt",
    kultur: "Kulttuuri ja Perinne",
    sorten: "Lajikkeet",
    zubereitung: "Valmistus",
    sicherheit: "Turvallisuus"
  },
  sv: {
    chemie: "Kemi och Föreningar",
    wirkung: "Effekter och Fördelar",
    kultur: "Kultur och Tradition",
    sorten: "Sorter",
    zubereitung: "Beredning",
    sicherheit: "Säkerhet"
  },
};

// Glossary terms data - currently German, can be extended for other languages
export const glossaryTermsData: GlossaryTermData[] = [
  // ============ CHEMIE & INHALTSSTOFFE (12 Begriffe) ============
  {
    id: "kavalactone",
    term: "Kavalactone",
    category: "chemie",
    shortDefinition: "Die psychoaktiven Wirkstoffe in Kava",
    fullExplanation: "Kavalactone sind eine Gruppe von 18 Lactonen, die für die psychoaktiven Wirkungen von Kava verantwortlich sind.",
    relatedTerms: ["Chemotyp", "Kavain", "DHK"]
  },
  {
    id: "chemotyp",
    term: "Chemotyp",
    category: "chemie",
    shortDefinition: "Das chemische Profil einer Kava-Sorte",
    fullExplanation: "Der Chemotyp ist ein 6-stelliger Code, der die Reihenfolge der sechs Haupt-Kavalactone nach Konzentration angibt.",
    relatedTerms: ["Kavalactone", "Noble Kava", "Heady", "Heavy"]
  },
  {
    id: "kavain",
    term: "Kavain",
    category: "chemie",
    shortDefinition: "Das wichtigste Kavalacton für die angstlösende Wirkung",
    fullExplanation: "Kavain ist das am besten erforschte Kavalacton und gilt als Hauptverantwortlicher für die anxiolytische Wirkung.",
    relatedTerms: ["Kavalactone", "GABA", "Heady"]
  },
  {
    id: "dhk",
    term: "DHK",
    germanTerm: "Dihydrokavain",
    category: "chemie",
    shortDefinition: "Das Kavalacton für Muskelentspannung",
    fullExplanation: "Dihydrokavain ist das stärkste muskelentspannende Kavalacton mit lokalanästhetischen Eigenschaften.",
    relatedTerms: ["Kavalactone", "Heavy", "Muskelentspannung"]
  },
  {
    id: "dhm",
    term: "DHM",
    germanTerm: "Dihydromethysticin",
    category: "chemie",
    shortDefinition: "Stark sedierendes Kavalacton, dominant in Tudei",
    fullExplanation: "Dihydromethysticin ist ein stark sedierendes Kavalacton, typisch für Tudei-Kava.",
    relatedTerms: ["Kavalactone", "Tudei", "Heavy"]
  },
  {
    id: "yangonin",
    term: "Yangonin",
    category: "chemie",
    shortDefinition: "Kavalacton mit CB1-Rezeptor-Affinität",
    fullExplanation: "Yangonin zeigt eine Affinität zu CB1-Cannabinoid-Rezeptoren und trägt zu stimmungsaufhellenden Effekten bei.",
    relatedTerms: ["Kavalactone", "Chemotyp"]
  },
  {
    id: "dmy",
    term: "DMY",
    germanTerm: "Desmethoxyyangonin",
    category: "chemie",
    shortDefinition: "Stimmungsaufhellendes Kavalacton",
    fullExplanation: "Desmethoxyyangonin hat MAO-B-hemmende Eigenschaften und trägt zu euphorisierenden Effekten bei.",
    relatedTerms: ["Kavalactone", "Heady", "Kavain"]
  },
  {
    id: "methysticin",
    term: "Methysticin",
    category: "chemie",
    shortDefinition: "Sedierendes Kavalacton mit langer Wirkdauer",
    fullExplanation: "Methysticin trägt zur körperlichen Entspannung und Schlafförderung bei.",
    relatedTerms: ["Kavalactone", "Heavy", "DHM"]
  },
  {
    id: "piper-methysticum",
    term: "Piper methysticum",
    category: "chemie",
    shortDefinition: "Der wissenschaftliche Name für Kava",
    fullExplanation: "Piper methysticum bedeutet 'berauschender Pfeffer' und gehört zur Familie der Pfeffergewächse.",
    relatedTerms: ["Piper wichmannii", "Botanik"]
  },
  {
    id: "piper-wichmannii",
    term: "Piper wichmannii",
    category: "chemie",
    shortDefinition: "Wilder Vorfahre der Kava-Pflanze",
    fullExplanation: "Piper wichmannii ist der wilde Vorfahre von Piper methysticum aus Papua-Neuguinea.",
    relatedTerms: ["Piper methysticum", "Tudei"]
  },
  {
    id: "chalkon",
    term: "Chalkone",
    category: "chemie",
    shortDefinition: "Flavonoid-Verbindungen in Kava",
    fullExplanation: "Chalkone sind Flavonoid-Verbindungen, darunter Flavokavain A, B und C.",
    relatedTerms: ["Flavokavain B", "Tudei", "Noble Kava"]
  },
  {
    id: "extraktion",
    term: "Extraktion",
    category: "chemie",
    shortDefinition: "Prozess der Kavalacton-Gewinnung",
    fullExplanation: "Extraktion bezeichnet den Prozess, bei dem Kavalactone aus dem Pflanzenmaterial gelöst werden.",
    relatedTerms: ["Kavalactone", "Knetmethode"]
  },

  // ============ WIRKUNG & EFFEKTE (10 Begriffe) ============
  {
    id: "gaba",
    term: "GABA",
    germanTerm: "Gamma-Aminobuttersäure",
    category: "wirkung",
    shortDefinition: "Der wichtigste hemmende Neurotransmitter",
    fullExplanation: "GABA reduziert die neuronale Erregbarkeit und wirkt beruhigend, angstlösend und schlaffördernd.",
    relatedTerms: ["Kavalactone", "Kavain", "Anxiolyse"]
  },
  {
    id: "reverse-tolerance",
    term: "Reverse Tolerance",
    germanTerm: "Umgekehrte Toleranz",
    category: "wirkung",
    shortDefinition: "Phänomen, bei dem Kava mit der Zeit stärker wirkt",
    fullExplanation: "Im Gegensatz zu anderen Substanzen wird Kava mit regelmäßigem Konsum wirksamer.",
    relatedTerms: ["Kavalactone", "Dosierung"]
  },
  {
    id: "anxiolyse",
    term: "Anxiolyse",
    germanTerm: "Angstlösung",
    category: "wirkung",
    shortDefinition: "Die angstlösende Wirkung von Kava",
    fullExplanation: "Kava hat Level-1-Evidenz für anxiolytische Wirkung ohne Abhängigkeitspotenzial.",
    relatedTerms: ["GABA", "Kavain", "Kavalactone"]
  },
  {
    id: "krunk",
    term: "Krunk",
    category: "wirkung",
    shortDefinition: "Zustand tiefer Kava-Entspannung",
    fullExplanation: "Umgangssprachlicher Begriff für tiefe Entspannung und Wohlbefinden nach Kava-Konsum.",
    relatedTerms: ["Shell", "Grog"]
  },
  {
    id: "muskelentspannung",
    term: "Muskelentspannung",
    category: "wirkung",
    shortDefinition: "Körperliche Entspannungswirkung von Kava",
    fullExplanation: "Die muskelentspannende Wirkung wird hauptsächlich durch DHK vermittelt.",
    relatedTerms: ["DHK", "Heavy", "Kavalactone"]
  },
  {
    id: "euphorie",
    term: "Euphorie",
    category: "wirkung",
    shortDefinition: "Gehobene Stimmung durch Kava",
    fullExplanation: "Kava kann eine milde bis moderate Euphorie erzeugen, besonders bei Heady-Sorten.",
    relatedTerms: ["Heady", "Kavain", "DMY"]
  },
  {
    id: "sedierung",
    term: "Sedierung",
    category: "wirkung",
    shortDefinition: "Beruhigende, schlaffördernde Wirkung",
    fullExplanation: "Die sedierende Wirkung ist bei Heavy-Sorten ausgeprägt und wird durch DHM vermittelt.",
    relatedTerms: ["Heavy", "DHM", "Schlaf"]
  },
  {
    id: "neuroprotektiv",
    term: "Neuroprotektiv",
    category: "wirkung",
    shortDefinition: "Schutzwirkung auf Nervenzellen",
    fullExplanation: "Kavain und andere Kavalactone können Nervenzellen vor oxidativem Stress schützen.",
    relatedTerms: ["Kavain", "Kavalactone"]
  },
  {
    id: "analgesie",
    term: "Analgesie",
    germanTerm: "Schmerzlinderung",
    category: "wirkung",
    shortDefinition: "Schmerzlindernde Wirkung von Kava",
    fullExplanation: "Kava hat milde analgetische Eigenschaften, hauptsächlich durch DHK vermittelt.",
    relatedTerms: ["DHK", "Muskelentspannung"]
  },
  {
    id: "kava-dermopathie",
    term: "Kava-Dermopathie",
    germanTerm: "Kava-Hautausschlag",
    category: "wirkung",
    shortDefinition: "Hautveränderung bei exzessivem Konsum",
    fullExplanation: "Reversible Hautveränderung bei sehr hohem, langfristigem Kava-Konsum.",
    relatedTerms: ["Sicherheit", "Dosierung"]
  },

  // ============ SORTEN & VARIETÄTEN (10 Begriffe) ============
  {
    id: "noble-kava",
    term: "Noble Kava",
    germanTerm: "Edle Kava",
    category: "sorten",
    shortDefinition: "Hochwertige, traditionell konsumierte Kava-Sorten",
    fullExplanation: "Noble Kava bezeichnet kultivierte Sorten mit ausgewogenem Kavalacton-Profil.",
    relatedTerms: ["Tudei", "Chemotyp", "Flavokavain B"]
  },
  {
    id: "tudei",
    term: "Tudei",
    germanTerm: "Zwei-Tage-Kava",
    category: "sorten",
    shortDefinition: "Nicht-noble Kava mit starken Nebenwirkungen",
    fullExplanation: "Tudei-Kava hat hohe DHM-Konzentrationen und kann Übelkeit und Kater verursachen.",
    relatedTerms: ["Noble Kava", "DHM", "Flavokavain B"]
  },
  {
    id: "heady",
    term: "Heady",
    category: "sorten",
    shortDefinition: "Kopflastige, euphorisierende Kava-Sorten",
    fullExplanation: "Heady-Sorten haben hohen Kavain-Gehalt und wirken mental stimulierend.",
    relatedTerms: ["Kavain", "Noble Kava", "Chemotyp"]
  },
  {
    id: "heavy",
    term: "Heavy",
    category: "sorten",
    shortDefinition: "Körperbetonte, sedierende Kava-Sorten",
    fullExplanation: "Heavy-Sorten haben hohen DHK/DHM-Gehalt und wirken körperlich entspannend.",
    relatedTerms: ["DHK", "DHM", "Sedierung"]
  },
  {
    id: "balanced",
    term: "Balanced",
    category: "sorten",
    shortDefinition: "Ausgewogene Kava-Sorten",
    fullExplanation: "Balanced-Sorten kombinieren Heady- und Heavy-Eigenschaften gleichmäßig.",
    relatedTerms: ["Heady", "Heavy", "Chemotyp"]
  },
  {
    id: "kultivar",
    term: "Kultivar",
    category: "sorten",
    shortDefinition: "Kultivierte Kava-Varietät",
    fullExplanation: "Ein Kultivar ist eine durch Selektion gezüchtete Kava-Sorte mit bestimmten Eigenschaften.",
    relatedTerms: ["Noble Kava", "Chemotyp"]
  },
  {
    id: "waka",
    term: "Waka",
    category: "sorten",
    shortDefinition: "Kava aus dem Hauptwurzelstock",
    fullExplanation: "Waka bezeichnet Kava aus dem Hauptwurzelstock mit höchster Kavalacton-Konzentration.",
    relatedTerms: ["Lewena", "Kavalactone"]
  },
  {
    id: "lewena",
    term: "Lewena",
    category: "sorten",
    shortDefinition: "Kava aus den Seitenwurzeln",
    fullExplanation: "Lewena bezeichnet Kava aus den Seitenwurzeln, milder als Waka.",
    relatedTerms: ["Waka", "Kavalactone"]
  },
  {
    id: "green-kava",
    term: "Green Kava",
    germanTerm: "Frische Kava",
    category: "sorten",
    shortDefinition: "Frisch geerntete, nicht getrocknete Kava",
    fullExplanation: "Green Kava ist frisch geerntete Kava mit höherem Wassergehalt und milderem Geschmack.",
    relatedTerms: ["Waka", "Zubereitung"]
  },
  {
    id: "awa",
    term: "'Awa",
    category: "sorten",
    shortDefinition: "Hawaiianischer Name für Kava",
    fullExplanation: "'Awa ist der hawaiianische Name für Kava und bezeichnet auch hawaiianische Sorten.",
    relatedTerms: ["Noble Kava", "Kultivar"]
  },

  // ============ ZUBEREITUNG (8 Begriffe) ============
  {
    id: "medium-grind",
    term: "Medium Grind",
    category: "zubereitung",
    shortDefinition: "Standardmahlgrad für traditionelle Zubereitung",
    fullExplanation: "Medium Grind ist der optimale Mahlgrad für die traditionelle Knetmethode.",
    relatedTerms: ["Knetmethode", "Extraktion"]
  },
  {
    id: "micronized",
    term: "Micronized",
    germanTerm: "Mikronisiert",
    category: "zubereitung",
    shortDefinition: "Fein gemahlene Kava zum direkten Trinken",
    fullExplanation: "Micronized Kava ist so fein gemahlen, dass sie direkt in Wasser aufgelöst werden kann.",
    relatedTerms: ["Instant Kava", "Medium Grind"]
  },
  {
    id: "instant-kava",
    term: "Instant Kava",
    category: "zubereitung",
    shortDefinition: "Sofort lösliches Kava-Pulver",
    fullExplanation: "Instant Kava ist vorextrahiertes Kava-Pulver für schnelle Zubereitung.",
    relatedTerms: ["Micronized", "Extraktion"]
  },
  {
    id: "knetmethode",
    term: "Knetmethode",
    category: "zubereitung",
    shortDefinition: "Traditionelle pazifische Zubereitungsart",
    fullExplanation: "Die Knetmethode ist die traditionelle Art, Kava mit Wasser und einem Seihtuch zuzubereiten.",
    relatedTerms: ["Medium Grind", "Grog", "Bilo"]
  },
  {
    id: "second-wash",
    term: "Second Wash",
    germanTerm: "Zweiter Aufguss",
    category: "zubereitung",
    shortDefinition: "Wiederverwendung des Kava-Pulvers",
    fullExplanation: "Der Second Wash extrahiert verbleibende Kavalactone aus bereits verwendetem Pulver.",
    relatedTerms: ["Knetmethode", "Extraktion"]
  },
  {
    id: "strainer-bag",
    term: "Strainer Bag",
    germanTerm: "Seihtuch",
    category: "zubereitung",
    shortDefinition: "Stoffbeutel zum Filtern von Kava",
    fullExplanation: "Ein Strainer Bag ist ein feinmaschiger Stoffbeutel zum Kneten und Filtern von Kava.",
    relatedTerms: ["Knetmethode", "Medium Grind"]
  },
  {
    id: "shell",
    term: "Shell",
    category: "zubereitung",
    shortDefinition: "Eine Portion Kava",
    fullExplanation: "Shell bezeichnet eine Einzelportion Kava, traditionell aus einer Kokosnussschale getrunken.",
    relatedTerms: ["Bilo", "Grog", "Krunk"]
  },
  {
    id: "aluball",
    term: "AluBall",
    category: "zubereitung",
    shortDefinition: "Modernes Kava-Zubereitungsgerät",
    fullExplanation: "Der AluBall ist ein Shaker-System für schnelle und einfache Kava-Zubereitung.",
    relatedTerms: ["Knetmethode", "Instant Kava"]
  },

  // ============ KULTUR & TRADITION (5 Begriffe) ============
  {
    id: "grog",
    term: "Grog",
    category: "kultur",
    shortDefinition: "Traditionelles Kava-Getränk",
    fullExplanation: "Grog ist der umgangssprachliche Name für das zubereitete Kava-Getränk in Fiji.",
    relatedTerms: ["Bilo", "Nakamal", "Shell"]
  },
  {
    id: "bilo",
    term: "Bilo",
    category: "kultur",
    shortDefinition: "Traditionelle Kava-Trinkschale",
    fullExplanation: "Ein Bilo ist eine halbe Kokosnussschale, aus der traditionell Kava getrunken wird.",
    relatedTerms: ["Grog", "Shell", "Tanoa"]
  },
  {
    id: "nakamal",
    term: "Nakamal",
    category: "kultur",
    shortDefinition: "Traditionelle Kava-Bar in Vanuatu",
    fullExplanation: "Ein Nakamal ist eine traditionelle Kava-Bar in Vanuatu, oft unter freiem Himmel.",
    relatedTerms: ["Grog", "Bilo", "Bula"]
  },
  {
    id: "tanoa",
    term: "Tanoa",
    category: "kultur",
    shortDefinition: "Traditionelle Kava-Schüssel",
    fullExplanation: "Eine Tanoa ist eine große, geschnitzte Holzschüssel für die Kava-Zubereitung.",
    relatedTerms: ["Bilo", "Grog", "Knetmethode"]
  },
  {
    id: "bula",
    term: "Bula",
    category: "kultur",
    shortDefinition: "Traditioneller Kava-Trinkspruch",
    fullExplanation: "Bula ist der traditionelle Gruß und Trinkspruch beim Kava-Trinken in Fiji.",
    relatedTerms: ["Grog", "Bilo", "Nakamal"]
  },

  // Additional Culture Terms
  {
    id: "yaqona",
    term: "Yaqona",
    category: "kultur",
    shortDefinition: "Fijianischer Name für Kava",
    fullExplanation: "Yaqona (ausgesprochen 'Yang-gona') ist der fijianische Name für Kava und die traditionelle Kava-Zeremonie.",
    relatedTerms: ["Sevusevu", "Tanoa", "Bilo"]
  },
  {
    id: "sevusevu",
    term: "Sevusevu",
    category: "kultur",
    shortDefinition: "Fijianische Willkommenszeremonie mit Kava",
    fullExplanation: "Die Sevusevu-Zeremonie ist ein offizieller Akt der Begrüßung in Fiji, bei dem Gäste Kava-Wurzeln als Geschenk überreichen.",
    relatedTerms: ["Yaqona", "Tanoa", "Bilo"]
  },
  {
    id: "ava",
    term: "'Ava",
    category: "kultur",
    shortDefinition: "Polynesischer Name für Kava",
    fullExplanation: "'Ava ist der polynesische Name für Kava, verwendet in Tonga, Samoa und Hawaii (dort als 'Awa).",
    relatedTerms: ["Yaqona", "Kava"]
  },
  {
    id: "taupou",
    term: "Taupou",
    category: "kultur",
    shortDefinition: "Samoanische Kava-Zubereiterin",
    fullExplanation: "Die Taupou ist eine junge Frau von hohem Rang, die traditionell die Kava bei samoanischen Zeremonien zubereitet.",
    relatedTerms: ["'Ava", "Zeremonie"]
  },
  {
    id: "toua",
    term: "Tou'a",
    category: "kultur",
    shortDefinition: "Tongaische Kava-Mischerin",
    fullExplanation: "Die Tou'a ist die Person, die bei tongaischen Zeremonien die Kava mischt – traditionell eine junge Frau von hohem Rang.",
    relatedTerms: ["'Ava", "Matāpule"]
  },
  {
    id: "matapule",
    term: "Matāpule",
    category: "kultur",
    shortDefinition: "Tongaischer Zeremonienmeister",
    fullExplanation: "Der Matāpule ist der Sprecher und Zeremonienmeister bei tongaischen Kava-Zeremonien, der die Reihenfolge ansagt.",
    relatedTerms: ["Tou'a", "'Ava"]
  },
  {
    id: "maca",
    term: "Maca",
    category: "kultur",
    shortDefinition: "Fijianischer Ausruf nach dem Trinken",
    fullExplanation: "'Maca!' (Es ist leer) wird in Fiji gerufen, nachdem man seine Kava-Schale geleert hat, gefolgt von dreimaligem Klatschen.",
    relatedTerms: ["Bula", "Bilo", "Cobo"]
  },
  {
    id: "cobo",
    term: "Cobo",
    category: "kultur",
    shortDefinition: "Fijianisches Klatschen bei Kava-Zeremonien",
    fullExplanation: "Cobo ist das rituelle Klatschen mit hohlen Händen bei fijianischen Kava-Zeremonien – einmal vor dem Trinken, dreimal danach.",
    relatedTerms: ["Maca", "Sevusevu", "Yaqona"]
  },
  {
    id: "tamafa",
    term: "Tamafa",
    category: "kultur",
    shortDefinition: "Ahnengebet auf Tanna",
    fullExplanation: "Tamafa ist ein rituelles Ausspucken/Ausspeien als Gebet an die Ahnen auf der Insel Tanna in Vanuatu.",
    relatedTerms: ["Nakamal", "Kava-Augen"]
  },
  {
    id: "kava-augen",
    term: "Kava-Augen",
    category: "kultur",
    shortDefinition: "Lichtempfindlichkeit nach Kava-Konsum",
    fullExplanation: "Kava-Augen bezeichnet die erhöhte Lichtempfindlichkeit und Pupillenerweiterung nach dem Trinken von Kava.",
    relatedTerms: ["Nakamal", "Wirkung"]
  },

  // ============ SICHERHEIT (5 Begriffe) ============
  {
    id: "flavokavain-b",
    term: "Flavokavain B",
    germanTerm: "FKB",
    category: "sicherheit",
    shortDefinition: "Potenziell lebertoxische Verbindung in Tudei-Kava",
    fullExplanation: "Flavokavain B ist ein Chalkon, das mit Lebertoxizität in Verbindung gebracht wird.",
    relatedTerms: ["Tudei", "Noble Kava", "Lebersicherheit"]
  },
  {
    id: "cyp450",
    term: "CYP450",
    category: "sicherheit",
    shortDefinition: "Leberenzyme für Medikamentenabbau",
    fullExplanation: "CYP450-Enzyme bauen Medikamente ab. Kava kann diese Enzyme hemmen.",
    relatedTerms: ["Wechselwirkungen", "Lebersicherheit"]
  },
  {
    id: "lebersicherheit",
    term: "Lebersicherheit",
    category: "sicherheit",
    shortDefinition: "Sicherheit von Kava für die Leber",
    fullExplanation: "Noble Kava aus der Wurzel gilt bei moderatem Konsum als lebersicher.",
    relatedTerms: ["Flavokavain B", "Noble Kava", "Tudei"]
  },
  {
    id: "wechselwirkungen",
    term: "Wechselwirkungen",
    category: "sicherheit",
    shortDefinition: "Interaktionen mit Medikamenten",
    fullExplanation: "Kava kann mit bestimmten Medikamenten interagieren, besonders ZNS-dämpfenden.",
    relatedTerms: ["CYP450", "Sicherheit"]
  },
  {
    id: "dosierung",
    term: "Dosierung",
    category: "sicherheit",
    shortDefinition: "Empfohlene Kava-Menge",
    fullExplanation: "Die optimale Dosierung hängt von Erfahrung, Sorte und Zubereitungsmethode ab.",
    relatedTerms: ["Reverse Tolerance", "Shell"]
  }
];

// Helper function to get all searchable terms (for highlighting)
export function getSearchableTerms(): string[] {
  const terms: string[] = [];
  glossaryTermsData.forEach(term => {
    terms.push(term.term);
    if (term.germanTerm) {
      terms.push(term.germanTerm);
    }
  });
  return terms;
}

// Helper function to find a term by its name (case-insensitive)
export function findGlossaryTerm(searchTerm: string): GlossaryTermData | undefined {
  const lowerSearch = searchTerm.toLowerCase();
  return glossaryTermsData.find(term => 
    term.term.toLowerCase() === lowerSearch ||
    (term.germanTerm && term.germanTerm.toLowerCase() === lowerSearch)
  );
}

// Get glossary link for a language
export function getGlossaryLink(lang: string, termId: string): string {
  return `/${lang}/glossar#${termId}`;
}
