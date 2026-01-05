export interface KavaRegion {
  id: string;
  name: string;
  localName?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  flag: string;
  category: "origin" | "major" | "secondary" | "diaspora";
  description: string;
  traditions: {
    ceremonyName: string;
    ceremonyDescription: string;
    keyRituals: string[];
  };
  varieties: string[];
  culturalSignificance: string;
  modernStatus: string;
  links: {
    label: string;
    url: string;
  }[];
}

export const kavaRegions: KavaRegion[] = [
  // ============ URSPRUNGSREGION ============
  {
    id: "vanuatu",
    name: "Vanuatu",
    localName: "Ripablik blong Vanuatu",
    country: "Vanuatu",
    coordinates: { lat: -15.3767, lng: 166.9592 },
    flag: "🇻🇺",
    category: "origin",
    description: "Das Mutterland des Kava – hier wurde Piper methysticum vor über 3.000 Jahren aus der wilden Piper wichmannii domestiziert. Vanuatu hat die größte genetische Vielfalt an Kava-Sorten weltweit.",
    traditions: {
      ceremonyName: "Nakamal-Ritual",
      ceremonyDescription: "Das tägliche Kava-Trinken bei Sonnenuntergang im Nakamal, dem traditionellen Versammlungsort. Ursprünglich wurde die Wurzel von jungen Männern gekaut.",
      keyRituals: [
        "Tamafa – rituelles Ausspucken als Ahnengebet",
        "Harem singsing blong kava – dem 'Lied der Kava' lauschen",
        "Stille Reflexion nach dem Trinken",
        "Männer-Tabu in traditionellen Nakamals"
      ]
    },
    varieties: ["Borogu", "Melo Melo", "Kelai", "Palarasul", "Melomelo", "Bir Kar"],
    culturalSignificance: "Kava ist nationales Symbol und Teil der Staatsidentität. Das Nakamal ist Gerichtshof, Rathaus und spiritueller Ort zugleich.",
    modernStatus: "Größter Kava-Exporteur weltweit. Strenge Noble-Only-Exportpolitik seit 2002. Port Vila hat Dutzende urbane Nakamals.",
    links: [
      { label: "Nakamal & Kava-Bars", url: "/de/kultur/nakamal" },
      { label: "Sorten aus Vanuatu", url: "/de/sorten/vanuatu" }
    ]
  },
  {
    id: "tanna",
    name: "Tanna",
    localName: "Tanna Island",
    country: "Vanuatu",
    coordinates: { lat: -19.5167, lng: 169.3500 },
    flag: "🇻🇺",
    category: "origin",
    description: "Die Insel Tanna gilt als einer der ursprünglichsten Orte der Kava-Kultur. Hier werden noch heute archaische Zubereitungsmethoden praktiziert.",
    traditions: {
      ceremonyName: "Tanna-Ritual",
      ceremonyDescription: "Das strengste traditionelle Kava-Ritual. Frauen dürfen das Nakamal nicht betreten. Die Wurzel wird geschabt und mit Kokosnussfasern gefiltert.",
      keyRituals: [
        "Kauen der Wurzel durch beschnittene junge Männer",
        "Erste Filtration = 'der Körper' (stärkste Wirkung)",
        "Zweite Filtration = Nipar/Makas (schwächer)",
        "Absolute Stille während des Trinkens"
      ]
    },
    varieties: ["Kelai", "Bir Kar", "Tanna-Varietäten"],
    culturalSignificance: "Tanna bewahrt die ältesten Kava-Traditionen. Der Vulkan Yasur wird als heilig verehrt, und Kava ist Teil der spirituellen Verbindung zur Erde.",
    modernStatus: "Tourismus bringt Besucher zu traditionellen Zeremonien. Die Insel kämpft um den Erhalt authentischer Praktiken.",
    links: [
      { label: "Zeremonien & Rituale", url: "/de/kultur/zeremonien" }
    ]
  },

  // ============ POLYNESIEN ============
  {
    id: "fiji",
    name: "Fiji",
    localName: "Viti",
    country: "Fiji",
    coordinates: { lat: -17.7134, lng: 178.0650 },
    flag: "🇫🇯",
    category: "major",
    description: "In Fiji ist Kava (Yaqona) fester Bestandteil der Staatskultur. Die formelle Sevusevu-Zeremonie ist bei offiziellen Anlässen obligatorisch.",
    traditions: {
      ceremonyName: "Yaqona-Zeremonie (Sevusevu)",
      ceremonyDescription: "Hochformalisierte Begrüßungszeremonie. Gäste überreichen Kava-Wurzeln, die gemeinsam in der Tanoa zubereitet werden.",
      keyRituals: [
        "Präsentation der Waka (Wurzeln) an den Chief",
        "Cobo – einmaliges Klatschen vor dem Trinken",
        "Bilo in einem Zug leeren",
        "'Maca!' rufen und dreimal klatschen"
      ]
    },
    varieties: ["Waka", "Lawena", "Fiji Loa", "Vanuatu (importiert)"],
    culturalSignificance: "Yaqona ist das 'Wasser des Friedens'. Kein offizieller Empfang ohne Kava. Der Trinkspruch 'Bula!' ist weltbekannt.",
    modernStatus: "Zweitgrößter Kava-Exporteur. Lebendige lokale Kava-Industrie. Yaqona-Sessions sind auch im modernen Fiji allgegenwärtig.",
    links: [
      { label: "Zeremonien & Rituale", url: "/de/kultur/zeremonien" },
      { label: "Pazifik-Sorten", url: "/de/sorten/pazifik" }
    ]
  },
  {
    id: "tonga",
    name: "Tonga",
    localName: "Puleʻanga Fakatuʻi ʻo Tonga",
    country: "Tonga",
    coordinates: { lat: -21.1789, lng: -175.1982 },
    flag: "🇹🇴",
    category: "major",
    description: "In Tonga ist die 'Ava-Zeremonie hoch formalisiert und eng mit der Monarchie verbunden. Die strenge Etikette spiegelt die soziale Hierarchie wider.",
    traditions: {
      ceremonyName: "'Ava-Zeremonie",
      ceremonyDescription: "Die formalisierteste Kava-Zeremonie Polynesiens mit fester Sitzordnung, festgelegten Rollen und strenger Etikette.",
      keyRituals: [
        "Tou'a – junge Frau von hohem Rang mischt die Kava",
        "Matāpule – Zeremonienmeister verkündet die Reihenfolge",
        "Strenge hierarchische Trinkreihenfolge",
        "Offizielle Anlässe: Krönungen, Staatsempfänge"
      ]
    },
    varieties: ["Pouni Ono", "Leka", "Tonga-Varietäten"],
    culturalSignificance: "Kava ist Zugang zur spirituellen Ordnung. Die Tanoa wird über Generationen weitergegeben und gilt als heiliges Objekt.",
    modernStatus: "Premium-Qualität für Export. Diaspora-Gemeinschaften in Neuseeland und Australien pflegen die Tradition aktiv.",
    links: [
      { label: "Zeremonien & Rituale", url: "/de/kultur/zeremonien" },
      { label: "Pazifik-Sorten", url: "/de/sorten/pazifik" }
    ]
  },
  {
    id: "samoa",
    name: "Samoa",
    localName: "Sāmoa",
    country: "Samoa",
    coordinates: { lat: -13.7590, lng: -172.1046 },
    flag: "🇼🇸",
    category: "major",
    description: "Die samoanische 'Ava-Zeremonie ist bekannt für ihre strenge Einhaltung der sozialen Hierarchie. Die Trinkreihenfolge spiegelt exakt den Rang jedes Anwesenden wider.",
    traditions: {
      ceremonyName: "'Ava-Zeremonie",
      ceremonyDescription: "Zeremonie mit strengster Hierarchie. Ein Fehler in der Trinkreihenfolge gilt als schwere Beleidigung.",
      keyRituals: [
        "Taupou – junge Frau von hohem Rang bereitet Kava zu",
        "Rituelle Reinigung durch Händewaschen",
        "Filterung durch Fau-Baum-Rinde (Hibiscus tiliaceus)",
        "Laute Verkündung der Hierarchie vor jeder Schale"
      ]
    },
    varieties: ["'Ava Lea", "'Ava Sa'a", "Samoa-Varietäten"],
    culturalSignificance: "Kava macht soziale Ordnung sichtbar. Die Zeremonie wird bei politischen Versammlungen und der Einführung neuer Chiefs durchgeführt.",
    modernStatus: "Fokus auf Qualität statt Quantität. Traditionelle Zeremonien sind bei wichtigen Gemeinschaftsentscheidungen obligatorisch.",
    links: [
      { label: "Zeremonien & Rituale", url: "/de/kultur/zeremonien" }
    ]
  },
  {
    id: "hawaii",
    name: "Hawaii",
    localName: "Hawaiʻi",
    country: "USA",
    coordinates: { lat: 19.8968, lng: -155.5828 },
    flag: "🌺",
    category: "secondary",
    description: "In Hawaii ist Kava als 'Awa bekannt und war traditionell eng mit der Ahnenverehrung und religiösen Praktiken der Kahuna (Priester) verbunden.",
    traditions: {
      ceremonyName: "'Awa-Zeremonie",
      ceremonyDescription: "Enge Verbindung zur Göttin Hina und dem Gott Kanaloa. Verwendung bei Heilungsritualen durch Kahuna.",
      keyRituals: [
        "Verwendung von Riedgrasfasern als Sieb",
        "Verbindung zu Hina und Kanaloa",
        "Heilungsrituale durch Kahuna",
        "'Awa Hiwa für zeremonielle Zwecke"
      ]
    },
    varieties: ["'Awa Hiwa", "Mo'i", "Nene", "Papa Ele'ele", "Mahakea"],
    culturalSignificance: "Nach einem Rückgang während der Kolonialzeit erlebt 'Awa eine kulturelle Wiederbelebung. Hawaiianische Kulturgruppen pflegen die Tradition.",
    modernStatus: "University of Hawaii erforscht aktiv hawaiianische 'Awa-Kultivare. Lokaler Anbau wird wieder verstärkt.",
    links: [
      { label: "Zeremonien & Rituale", url: "/de/kultur/zeremonien" },
      { label: "Pazifik-Sorten", url: "/de/sorten/pazifik" }
    ]
  },

  // ============ MIKRONESIEN ============
  {
    id: "pohnpei",
    name: "Pohnpei",
    localName: "Pohnpei",
    country: "Föderierte Staaten von Mikronesien",
    coordinates: { lat: 6.8541, lng: 158.2624 },
    flag: "🇫🇲",
    category: "secondary",
    description: "Pohnpei ist das Zentrum der Kava-Kultur in Mikronesien. Hier wird Kava 'Sakau' genannt und ist tief in der lokalen Tradition verwurzelt.",
    traditions: {
      ceremonyName: "Sakau-Zeremonie",
      ceremonyDescription: "Die Sakau-Zeremonie ist weniger formalisiert als in Polynesien, aber nicht weniger bedeutsam für die Gemeinschaft.",
      keyRituals: [
        "Zubereitung auf einem flachen Stein",
        "Pressen durch Hibiskusfasern",
        "Gemeinschaftliches Trinken am Abend",
        "Verbindung zu traditionellen Häuptlingen"
      ]
    },
    varieties: ["Sakau-Varietäten", "Pohnpei-Kultivare"],
    culturalSignificance: "Sakau ist zentraler Bestandteil der pohnpeianischen Identität und wird bei allen wichtigen sozialen Anlässen getrunken.",
    modernStatus: "Lokale Produktion für den Eigenverbrauch. Touristen können an Sakau-Sessions teilnehmen.",
    links: [
      { label: "Kultur & Tradition", url: "/de/kultur" }
    ]
  },

  // ============ PAPUA-NEUGUINEA ============
  {
    id: "png",
    name: "Papua-Neuguinea",
    localName: "Papua Niugini",
    country: "Papua-Neuguinea",
    coordinates: { lat: -5.6816, lng: 144.2489 },
    flag: "🇵🇬",
    category: "origin",
    description: "Papua-Neuguinea ist die Heimat von Piper wichmannii, dem wilden Vorfahren der Kava-Pflanze. Hier begann die Geschichte der Kava-Domestikation.",
    traditions: {
      ceremonyName: "Traditionelle Nutzung",
      ceremonyDescription: "Die Nutzung von Piper wichmannii unterscheidet sich von der kultivierten Kava. Die Pflanze wird medizinisch und rituell verwendet.",
      keyRituals: [
        "Medizinische Anwendungen",
        "Rituelle Verwendung in bestimmten Regionen",
        "Weniger formalisiert als in Polynesien"
      ]
    },
    varieties: ["Piper wichmannii (wild)", "Lokale Kultivare"],
    culturalSignificance: "Ursprungsort der Kava-Domestikation. Piper wichmannii ist der genetische Vorfahre aller kultivierten Kava-Sorten.",
    modernStatus: "Begrenzte kommerzielle Produktion. Wissenschaftliches Interesse an der genetischen Vielfalt.",
    links: [
      { label: "Die Pflanze", url: "/de/botanik/pflanze" },
      { label: "Geschichte", url: "/de/geschichte/urspruenge" }
    ]
  },

  // ============ DIASPORA & WESTLICHE WELT ============
  {
    id: "usa-florida",
    name: "Florida, USA",
    localName: "Kava Bar Capital",
    country: "USA",
    coordinates: { lat: 26.1224, lng: -80.1373 },
    flag: "🇺🇸",
    category: "diaspora",
    description: "Florida gilt als das Epizentrum der westlichen Kava-Bar-Bewegung. Fort Lauderdale, St. Petersburg und Orlando haben lebendige Kava-Szenen.",
    traditions: {
      ceremonyName: "Kava-Bar-Kultur",
      ceremonyDescription: "Westliche Kava-Bars positionieren sich als alkoholfreie Alternative zum Nachtleben – ein 'Safe Space' für soziale Interaktion.",
      keyRituals: [
        "'Bula!' als Trinkspruch übernommen",
        "Verschiedene Kava-Sorten zur Auswahl",
        "Entspannte Atmosphäre mit Spielen",
        "Community-Events und Open Mics"
      ]
    },
    varieties: ["Importierte Sorten aus Vanuatu, Fiji, Tonga"],
    culturalSignificance: "Kava als Teil der 'Sober Curious'-Bewegung. Alternative zu Alkohol ohne Kontrollverlust.",
    modernStatus: "200+ Kava-Bars in den USA. Wachsende Community und Online-Präsenz.",
    links: [
      { label: "Moderne Kava-Kultur", url: "/de/kultur/moderne" },
      { label: "Nakamal & Kava-Bars", url: "/de/kultur/nakamal" }
    ]
  },
  {
    id: "australia",
    name: "Australien",
    localName: "Australia",
    country: "Australien",
    coordinates: { lat: -25.2744, lng: 133.7751 },
    flag: "🇦🇺",
    category: "diaspora",
    description: "Australien hat eine große pazifische Diaspora-Gemeinschaft, die Kava-Traditionen pflegt. Die Regulierung war lange restriktiv, wird aber gelockert.",
    traditions: {
      ceremonyName: "Diaspora-Traditionen",
      ceremonyDescription: "Tongaische, fijianische und samoanische Gemeinschaften pflegen ihre Kava-Traditionen in Australien.",
      keyRituals: [
        "Gemeinschaftliche Kava-Sessions",
        "Traditionelle Zeremonien bei Festen",
        "Verbindung zur Heimat durch Kava"
      ]
    },
    varieties: ["Importierte Sorten aus dem Pazifik"],
    culturalSignificance: "Kava als Verbindung zur pazifischen Heimat. Wichtig für den Zusammenhalt der Diaspora-Gemeinschaften.",
    modernStatus: "Regulierung wird gelockert. Wachsendes Interesse auch außerhalb der Diaspora.",
    links: [
      { label: "Rechtsstatus", url: "/de/rechtsstatus" }
    ]
  },
  {
    id: "newzealand",
    name: "Neuseeland",
    localName: "Aotearoa",
    country: "Neuseeland",
    coordinates: { lat: -40.9006, lng: 174.8860 },
    flag: "🇳🇿",
    category: "diaspora",
    description: "Neuseeland hat die größte pazifische Diaspora-Bevölkerung außerhalb des Pazifiks. Auckland ist ein Zentrum der pazifischen Kava-Kultur.",
    traditions: {
      ceremonyName: "Diaspora-Traditionen",
      ceremonyDescription: "Besonders tongaische und samoanische Gemeinschaften pflegen aktiv ihre Kava-Traditionen.",
      keyRituals: [
        "Traditionelle Zeremonien bei Gemeinschaftsanlässen",
        "Kava bei Hochzeiten und Beerdigungen",
        "Kulturelle Veranstaltungen mit Kava"
      ]
    },
    varieties: ["Importierte Sorten aus Tonga, Samoa, Fiji"],
    culturalSignificance: "Kava ist ein wichtiges Element der pazifischen Identität in Neuseeland.",
    modernStatus: "Legaler Import für persönlichen Gebrauch. Aktive Diaspora-Gemeinschaften.",
    links: [
      { label: "Rechtsstatus", url: "/de/rechtsstatus" }
    ]
  },
  {
    id: "germany",
    name: "Deutschland",
    localName: "Deutschland",
    country: "Deutschland",
    coordinates: { lat: 51.1657, lng: 10.4515 },
    flag: "🇩🇪",
    category: "diaspora",
    description: "Deutschland war 2002 das erste Land, das Kava verbot. Nach der Rehabilitation 2015 kehrt Kava langsam in den deutschen Markt zurück.",
    traditions: {
      ceremonyName: "Moderne Nutzung",
      ceremonyDescription: "In Deutschland wird Kava hauptsächlich als Nahrungsergänzungsmittel oder in Online-Communities konsumiert.",
      keyRituals: [
        "Online-Communities und Foren",
        "Import aus dem Pazifik",
        "Wissenschaftliches Interesse"
      ]
    },
    varieties: ["Importierte Noble Kava aus Vanuatu, Fiji"],
    culturalSignificance: "Deutschland spielte eine zentrale Rolle in der Kava-Kontroverse 2002. Die Rehabilitation war ein wichtiger Meilenstein.",
    modernStatus: "Kava ist wieder legal. Wachsende Online-Community. Kava-mode.com als deutscher Anbieter.",
    links: [
      { label: "Rechtsstatus", url: "/de/rechtsstatus" },
      { label: "Das Verbot 2002", url: "/de/geschichte/moderne" }
    ]
  }
];

// Category colors and labels
export const categoryInfo: Record<string, { color: string; label: string; description: string }> = {
  origin: {
    color: "#2d5016",
    label: "Ursprungsregion",
    description: "Wo Kava domestiziert wurde"
  },
  major: {
    color: "#4a7c23",
    label: "Hauptanbaugebiet",
    description: "Wichtige Kava-Kulturen"
  },
  secondary: {
    color: "#6b9b3a",
    label: "Sekundäre Region",
    description: "Traditionelle Nutzung"
  },
  diaspora: {
    color: "#8fbc5a",
    label: "Diaspora & Westen",
    description: "Moderne Verbreitung"
  }
};
