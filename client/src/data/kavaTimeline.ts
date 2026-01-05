export interface TimelineEvent {
  id: string;
  year: string;
  yearNumeric: number; // For sorting, negative for BCE
  title: string;
  description: string;
  details?: string;
  location?: string;
  category: "origin" | "spread" | "colonial" | "science" | "modern" | "contemporary";
  significance: "major" | "medium" | "minor";
  links?: { label: string; url: string }[];
  icon?: string;
}

export interface TimelineEra {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  color: string;
  description: string;
}

export const timelineEras: TimelineEra[] = [
  {
    id: "prehistory",
    name: "Urgeschichte & Domestikation",
    startYear: -3000,
    endYear: -500,
    color: "#2d5016",
    description: "Die Anfänge der Kava-Kultur in Melanesien"
  },
  {
    id: "classical",
    name: "Klassische Pazifik-Ära",
    startYear: -500,
    endYear: 1600,
    color: "#4a7c23",
    description: "Verbreitung durch Austronesische Expansion"
  },
  {
    id: "colonial",
    name: "Kolonialzeit",
    startYear: 1600,
    endYear: 1945,
    color: "#8b6914",
    description: "Europäischer Kontakt und Missionierung"
  },
  {
    id: "modern",
    name: "Moderne Ära",
    startYear: 1945,
    endYear: 2000,
    color: "#1e6091",
    description: "Wissenschaftliche Erforschung und Dekolonisierung"
  },
  {
    id: "contemporary",
    name: "Gegenwart",
    startYear: 2000,
    endYear: 2025,
    color: "#6b21a8",
    description: "Globale Verbreitung und kulturelle Renaissance"
  }
];

export const timelineEvents: TimelineEvent[] = [
  // ============ URGESCHICHTE & DOMESTIKATION ============
  {
    id: "domestication",
    year: "ca. 3000 v. Chr.",
    yearNumeric: -3000,
    title: "Domestikation von Kava",
    description: "In den Regenwäldern Papua-Neuguineas und Vanuatus beginnt die Domestikation von Piper wichmannii zur kultivierten Kava-Pflanze (Piper methysticum).",
    details: "Durch selektive Züchtung und vegetative Vermehrung entstehen die ersten Noble Kava-Sorten mit höherem Kavalacton-Gehalt und geringerer Toxizität als die wilde Urform.",
    location: "Papua-Neuguinea / Vanuatu",
    category: "origin",
    significance: "major",
    links: [
      { label: "Die Pflanze", url: "/de/botanik/pflanze" },
      { label: "Ursprünge", url: "/de/geschichte/urspruenge" }
    ],
    icon: "🌱"
  },
  {
    id: "vanuatu-culture",
    year: "ca. 2500 v. Chr.",
    yearNumeric: -2500,
    title: "Erste Kava-Zeremonien in Vanuatu",
    description: "Auf den Inseln Vanuatus entwickeln sich die ersten rituellen Kava-Zeremonien. Das Nakamal wird zum zentralen Versammlungsort.",
    details: "Die Zubereitung durch Kauen der Wurzel durch junge Männer etabliert sich als Tradition. Kava wird zum Medium der Kommunikation mit Ahnen und Geistern.",
    location: "Vanuatu",
    category: "origin",
    significance: "major",
    links: [
      { label: "Zeremonien", url: "/de/kultur/zeremonien" },
      { label: "Nakamal", url: "/de/kultur/nakamal" }
    ],
    icon: "🏛️"
  },
  {
    id: "lapita-expansion",
    year: "ca. 1500–1000 v. Chr.",
    yearNumeric: -1250,
    title: "Lapita-Expansion",
    description: "Die Lapita-Kultur verbreitet Kava durch ihre maritime Expansion von Melanesien nach Westpolynesien.",
    details: "Archäologische Funde von Lapita-Keramik zeigen die Ausbreitungsrouten. Kava-Pflanzen werden als Stecklinge auf Auslegerkanus transportiert.",
    location: "Melanesien → Polynesien",
    category: "spread",
    significance: "major",
    icon: "⛵"
  },
  {
    id: "fiji-arrival",
    year: "ca. 1000 v. Chr.",
    yearNumeric: -1000,
    title: "Kava erreicht Fiji",
    description: "Kava wird in Fiji eingeführt und als 'Yaqona' bekannt. Einzigartige Zeremonien entwickeln sich um die Tanoa (Kava-Schale).",
    details: "Ursprünglich wurde Kava in Fiji durch Mahlen zubereitet, nicht durch Kauen. Die Verbindung zur Ahnenverehrung in den Būrau (Männerhäusern) wird etabliert.",
    location: "Fiji",
    category: "spread",
    significance: "major",
    links: [
      { label: "Fiji-Zeremonien", url: "/de/kultur/zeremonien" },
      { label: "Pazifik-Sorten", url: "/de/sorten/pazifik" }
    ],
    icon: "🇫🇯"
  },
  {
    id: "tonga-samoa",
    year: "ca. 500 v. Chr.",
    yearNumeric: -500,
    title: "Kava in Tonga und Samoa",
    description: "Die 'Ava-Zeremonie entwickelt sich in Tonga und Samoa zu einer hochformalisierten Tradition mit strenger Hierarchie.",
    details: "Die Tou'a (Kava-Mischerin) und der Matāpule (Zeremonienmeister) werden zu wichtigen rituellen Rollen. Die Trinkreihenfolge spiegelt die soziale Ordnung wider.",
    location: "Tonga / Samoa",
    category: "spread",
    significance: "major",
    links: [
      { label: "'Ava-Zeremonie", url: "/de/kultur/zeremonien" }
    ],
    icon: "🇹🇴"
  },

  // ============ KLASSISCHE PAZIFIK-ÄRA ============
  {
    id: "hawaii-arrival",
    year: "ca. 300–500 n. Chr.",
    yearNumeric: 400,
    title: "Kava erreicht Hawaii",
    description: "Polynesische Seefahrer bringen Kava nach Hawaii, wo es als 'Awa bekannt wird und mit der Göttin Hina verbunden wird.",
    details: "In Hawaii entwickelt sich eine einzigartige Kava-Kultur mit Verbindung zu Heilungsritualen der Kahuna (Priester). Die Sorte 'Awa Hiwa wird für zeremonielle Zwecke reserviert.",
    location: "Hawaii",
    category: "spread",
    significance: "medium",
    links: [
      { label: "Hawaii-Sorten", url: "/de/sorten/pazifik" }
    ],
    icon: "🌺"
  },
  {
    id: "pohnpei-sakau",
    year: "ca. 500 n. Chr.",
    yearNumeric: 500,
    title: "Sakau-Kultur in Pohnpei",
    description: "Auf Pohnpei in Mikronesien entwickelt sich die Sakau-Zeremonie als eigenständige Tradition.",
    details: "Die Zubereitung auf einem flachen Stein und das Pressen durch Hibiskusfasern werden charakteristisch für die mikronesische Kava-Kultur.",
    location: "Pohnpei (Mikronesien)",
    category: "spread",
    significance: "medium",
    icon: "🇫🇲"
  },
  {
    id: "fiji-tongan-influence",
    year: "ca. 1750",
    yearNumeric: 1750,
    title: "Tonganischer Einfluss auf Fiji",
    description: "Fiji übernimmt tonganische Kava-Zeremonien: Mastikation, Tanoa-Schalen und Bilo-Becher werden Standard.",
    details: "Die Sevusevu-Zeremonie als formelle Begrüßung etabliert sich. Christliche Missionare begünstigen die 'zivilisierteren' polynesischen Zeremonien.",
    location: "Fiji",
    category: "spread",
    significance: "medium",
    icon: "🔄"
  },

  // ============ KOLONIALZEIT ============
  {
    id: "european-contact",
    year: "1616",
    yearNumeric: 1616,
    title: "Erster europäischer Kontakt",
    description: "Niederländische Seefahrer unter Jacob Le Maire und Willem Schouten erreichen die Pazifikinseln und dokumentieren erstmals Kava.",
    details: "Die Europäer beschreiben das 'seltsame Getränk' der Einheimischen, verstehen aber seine kulturelle Bedeutung nicht.",
    location: "Pazifik",
    category: "colonial",
    significance: "medium",
    icon: "🚢"
  },
  {
    id: "cook-documentation",
    year: "1768–1779",
    yearNumeric: 1773,
    title: "Captain Cooks Dokumentation",
    description: "James Cook dokumentiert Kava-Zeremonien während seiner Pazifikreisen ausführlich und bringt Proben nach Europa.",
    details: "Cooks Berichte über die 'Ava-Zeremonie in Tonga und Hawaii wecken wissenschaftliches Interesse in Europa. Der Botaniker Johann Georg Forster beschreibt die Pflanze erstmals wissenschaftlich.",
    location: "Tonga / Hawaii / Tahiti",
    category: "colonial",
    significance: "major",
    links: [
      { label: "Geschichte", url: "/de/geschichte" }
    ],
    icon: "📜"
  },
  {
    id: "forster-classification",
    year: "1777",
    yearNumeric: 1777,
    title: "Wissenschaftliche Klassifikation",
    description: "Johann Georg Forster klassifiziert Kava als Piper methysticum ('berauschendes Pfeffergewächs').",
    details: "Der Name leitet sich vom griechischen 'methystikos' (berauschend) ab. Forster beschreibt die Pflanze in seinem Werk 'De Plantis Esculentis Insularum Oceani Australis'.",
    location: "Europa",
    category: "science",
    significance: "major",
    links: [
      { label: "Botanik", url: "/de/botanik" }
    ],
    icon: "🔬"
  },
  {
    id: "missionary-opposition",
    year: "1800–1900",
    yearNumeric: 1850,
    title: "Missionarische Opposition",
    description: "Christliche Missionare bekämpfen Kava als 'heidnisches' Getränk. In einigen Regionen werden Zeremonien verboten.",
    details: "Missionare kritisieren das Kauen als unhygienisch und die Zeremonien als 'faul, zersetzend, ja dämonisch'. Auf Ost-Futuna wird die Mastikation 1930 nach Missionarsmandat eingestellt.",
    location: "Pazifik",
    category: "colonial",
    significance: "major",
    links: [
      { label: "Koloniale Einflüsse", url: "/de/geschichte/moderne" }
    ],
    icon: "⛪"
  },
  {
    id: "kavalactone-discovery",
    year: "1860",
    yearNumeric: 1860,
    title: "Entdeckung der Kavalactone",
    description: "Deutsche Chemiker isolieren erstmals die aktiven Wirkstoffe aus Kava und nennen sie 'Kavain'.",
    details: "Die Entdeckung legt den Grundstein für die wissenschaftliche Erforschung der Kava-Wirkung und spätere pharmazeutische Anwendungen.",
    location: "Deutschland",
    category: "science",
    significance: "major",
    links: [
      { label: "Kavalactone", url: "/de/inhaltsstoffe/kavalactone" }
    ],
    icon: "⚗️"
  },
  {
    id: "german-colony",
    year: "1884–1914",
    yearNumeric: 1899,
    title: "Deutsche Kolonialherrschaft",
    description: "Deutschland kontrolliert Teile des Pazifiks (Deutsch-Neuguinea, Samoa). Kava wird wissenschaftlich erforscht.",
    details: "Deutsche Wissenschaftler dokumentieren Kava-Sorten und Zubereitungsmethoden. Die Kolonialverwaltung toleriert Kava-Konsum weitgehend.",
    location: "Deutsch-Neuguinea / Samoa",
    category: "colonial",
    significance: "medium",
    icon: "🇩🇪"
  },
  {
    id: "lewin-research",
    year: "1886",
    yearNumeric: 1886,
    title: "Louis Lewins Forschung",
    description: "Der deutsche Toxikologe Louis Lewin veröffentlicht umfassende Studien über Kava und klassifiziert es als 'Euphorica'.",
    details: "Lewin beschreibt Kava in seinem Werk 'Phantastica' als einzigartige Substanz, die weder stimuliert noch sediert, sondern einen Zustand friedlicher Klarheit erzeugt.",
    location: "Deutschland",
    category: "science",
    significance: "medium",
    icon: "📚"
  },

  // ============ MODERNE ÄRA ============
  {
    id: "independence-movements",
    year: "1962–1980",
    yearNumeric: 1970,
    title: "Unabhängigkeit & Kulturelle Renaissance",
    description: "Pazifikstaaten erlangen Unabhängigkeit. Kava kehrt als Symbol kultureller Identität in den öffentlichen Raum zurück.",
    details: "Samoa (1962), Fiji (1970), Tonga (1970), Vanuatu (1980) werden unabhängig. Kava-Zeremonien werden bei Staatsgründungen und offiziellen Anlässen zelebriert.",
    location: "Pazifik",
    category: "modern",
    significance: "major",
    links: [
      { label: "Moderne Geschichte", url: "/de/geschichte/moderne" }
    ],
    icon: "🏛️"
  },
  {
    id: "vanuatu-independence",
    year: "1980",
    yearNumeric: 1980,
    title: "Vanuatu wird unabhängig",
    description: "Vanuatu erlangt Unabhängigkeit von der französisch-britischen Kolonialherrschaft. Kava wird nationales Symbol.",
    details: "Die neue Nation macht Kava zum Teil ihrer Identität. Nakamals werden zu wichtigen sozialen Institutionen in Port Vila und anderen Städten.",
    location: "Vanuatu",
    category: "modern",
    significance: "major",
    icon: "🇻🇺"
  },
  {
    id: "clinical-research",
    year: "1990er",
    yearNumeric: 1995,
    title: "Klinische Studien zu Angst",
    description: "Erste kontrollierte klinische Studien zeigen die anxiolytische Wirkung von Kava-Extrakten.",
    details: "Meta-Analysen bestätigen die Wirksamkeit von Kava bei Angststörungen. Kava-Präparate werden in Europa und den USA als pflanzliche Arzneimittel populär.",
    location: "Europa / USA",
    category: "science",
    significance: "major",
    links: [
      { label: "Studien", url: "/de/studien" },
      { label: "Wirkung bei Angst", url: "/de/wirkung/angst" }
    ],
    icon: "📊"
  },
  {
    id: "first-kava-bars",
    year: "1990er",
    yearNumeric: 1998,
    title: "Erste Kava-Bars in den USA",
    description: "In Florida und Kalifornien eröffnen die ersten westlichen Kava-Bars als alkoholfreie Alternative.",
    details: "Die Kava-Bar-Bewegung beginnt in Städten mit pazifischer Diaspora. Fort Lauderdale wird zum Zentrum der amerikanischen Kava-Szene.",
    location: "USA (Florida)",
    category: "modern",
    significance: "medium",
    links: [
      { label: "Moderne Kava-Kultur", url: "/de/kultur/moderne" },
      { label: "Nakamal & Kava-Bars", url: "/de/kultur/nakamal" }
    ],
    icon: "🍹"
  },

  // ============ GEGENWART ============
  {
    id: "german-ban",
    year: "2002",
    yearNumeric: 2002,
    title: "Kava-Verbot in Deutschland",
    description: "Deutschland verbietet Kava-Präparate nach Berichten über Leberschäden. Andere EU-Länder folgen.",
    details: "Das BfArM widerruft die Zulassung aller Kava-haltigen Arzneimittel. Die Entscheidung basiert auf 30 Verdachtsfällen von Hepatotoxizität, wird aber später als überzogen kritisiert.",
    location: "Deutschland / EU",
    category: "contemporary",
    significance: "major",
    links: [
      { label: "Lebersicherheit", url: "/de/sicherheit/leber" },
      { label: "Rechtsstatus", url: "/de/rechtsstatus" }
    ],
    icon: "⚠️"
  },
  {
    id: "vanuatu-noble-policy",
    year: "2002",
    yearNumeric: 2002,
    title: "Vanuatus Noble-Only-Exportpolitik",
    description: "Vanuatu führt strenge Exportrichtlinien ein: Nur Noble Kava-Sorten dürfen exportiert werden.",
    details: "Die Politik soll Qualität sichern und den Ruf von Kava schützen. Tudei-Sorten mit höherem DHM/DHK-Gehalt werden vom Export ausgeschlossen.",
    location: "Vanuatu",
    category: "contemporary",
    significance: "major",
    links: [
      { label: "Noble vs. Tudei", url: "/de/sorten/noble-tudei" },
      { label: "Vanuatu-Sorten", url: "/de/sorten/vanuatu" }
    ],
    icon: "✅"
  },
  {
    id: "who-assessment",
    year: "2007",
    yearNumeric: 2007,
    title: "WHO-Risikobewertung",
    description: "Die WHO veröffentlicht eine umfassende Risikobewertung und stuft traditionell zubereitete Kava als sicher ein.",
    details: "Die Bewertung unterscheidet zwischen traditioneller Zubereitung (sicher) und Extrakten (potenziell problematisch). Die Verwendung von Nicht-Wurzel-Teilen wird als Risikofaktor identifiziert.",
    location: "International",
    category: "science",
    significance: "major",
    links: [
      { label: "Sicherheit", url: "/de/sicherheit" }
    ],
    icon: "🏥"
  },
  {
    id: "german-rehabilitation",
    year: "2014–2015",
    yearNumeric: 2014,
    title: "Rehabilitation in Deutschland",
    description: "Deutsche Gerichte heben das Kava-Verbot auf. Die ursprüngliche Entscheidung wird als wissenschaftlich unbegründet eingestuft.",
    details: "Das Bundesverwaltungsgericht urteilt, dass die Risikobewertung fehlerhaft war. Kava-Produkte können wieder legal verkauft werden.",
    location: "Deutschland",
    category: "contemporary",
    significance: "major",
    links: [
      { label: "Rechtsstatus", url: "/de/rechtsstatus" }
    ],
    icon: "⚖️"
  },
  {
    id: "codex-standard",
    year: "2020",
    yearNumeric: 2020,
    title: "Codex Alimentarius Standard",
    description: "Der Codex Alimentarius verabschiedet einen internationalen Standard für Kava als Getränk.",
    details: "Der Standard definiert Qualitätskriterien, Kavalacton-Grenzwerte und Kennzeichnungsanforderungen. Ein Meilenstein für den internationalen Handel.",
    location: "International",
    category: "contemporary",
    significance: "major",
    icon: "📋"
  },
  {
    id: "global-expansion",
    year: "2020er",
    yearNumeric: 2022,
    title: "Globale Expansion der Kava-Bars",
    description: "Über 200 Kava-Bars eröffnen in den USA. Die 'Sober Curious'-Bewegung treibt das Wachstum.",
    details: "Kava wird als alkoholfreie Alternative für soziale Entspannung populär. Städte wie Austin, Denver und New York entwickeln lebhafte Kava-Szenen.",
    location: "USA / Europa / Australien",
    category: "contemporary",
    significance: "medium",
    links: [
      { label: "Moderne Kava-Kultur", url: "/de/kultur/moderne" }
    ],
    icon: "🌍"
  },
  {
    id: "climate-challenges",
    year: "2020er",
    yearNumeric: 2023,
    title: "Klimawandel-Herausforderungen",
    description: "Pazifische Kava-Farmer kämpfen mit den Auswirkungen des Klimawandels auf ihre Ernten.",
    details: "Veränderte Niederschlagsmuster, Zyklone und steigende Temperaturen bedrohen traditionelle Anbaugebiete. Nachhaltige Anbaumethoden werden wichtiger.",
    location: "Pazifik",
    category: "contemporary",
    significance: "medium",
    links: [
      { label: "Anbau", url: "/de/botanik/anbau" }
    ],
    icon: "🌡️"
  },
  {
    id: "cultural-renaissance",
    year: "Heute",
    yearNumeric: 2025,
    title: "Kulturelle Renaissance",
    description: "Junge Pazifik-Generationen gründen 'Kava Collectives' und dokumentieren traditionelles Wissen digital.",
    details: "Podcasts, YouTube-Kanäle und Instagram-Accounts verbreiten Kava-Kultur weltweit. Die Verbindung von Tradition und Moderne schafft neue Formen der kulturellen Identität.",
    location: "Pazifik / Global",
    category: "contemporary",
    significance: "medium",
    links: [
      { label: "Kultur & Tradition", url: "/de/kultur" }
    ],
    icon: "🔄"
  }
];

// Category colors and labels
export const categoryInfo: Record<string, { color: string; label: string; icon: string }> = {
  origin: {
    color: "#2d5016",
    label: "Ursprung & Domestikation",
    icon: "🌱"
  },
  spread: {
    color: "#4a7c23",
    label: "Verbreitung im Pazifik",
    icon: "⛵"
  },
  colonial: {
    color: "#8b6914",
    label: "Kolonialzeit",
    icon: "🚢"
  },
  science: {
    color: "#1e6091",
    label: "Wissenschaft & Forschung",
    icon: "🔬"
  },
  modern: {
    color: "#0891b2",
    label: "Moderne Ära",
    icon: "🏛️"
  },
  contemporary: {
    color: "#6b21a8",
    label: "Gegenwart",
    icon: "🌍"
  }
};
