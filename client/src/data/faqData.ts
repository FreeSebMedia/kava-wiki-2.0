// FAQ Data Structure with Multilingual Support
// Optimized for Google SEO (structured data) and LLM comprehension

export interface FAQItem {
  id: string;
  category: string;
  question: {
    de: string;
    en: string;
  };
  answer: {
    de: string;
    en: string;
  };
  keywords: string[];
  relatedLinks?: {
    href: string;
    label: {
      de: string;
      en: string;
    };
  }[];
  searchVolume?: number; // From CSV for prioritization
}

export interface FAQCategory {
  id: string;
  name: {
    de: string;
    en: string;
  };
  icon: string;
  description: {
    de: string;
    en: string;
  };
}

export const faqCategories: FAQCategory[] = [
  {
    id: "grundlagen",
    name: { de: "Grundlagen", en: "Basics" },
    icon: "HelpCircle",
    description: {
      de: "Grundlegende Informationen über Kava, seine Herkunft und Botanik",
      en: "Basic information about Kava, its origin and botany"
    }
  },
  {
    id: "wirkung",
    name: { de: "Wirkung & Effekte", en: "Effects & Benefits" },
    icon: "Sparkles",
    description: {
      de: "Wie Kava wirkt, Wirkdauer und Erfahrungsberichte",
      en: "How Kava works, duration of effects and experiences"
    }
  },
  {
    id: "sicherheit",
    name: { de: "Sicherheit & Nebenwirkungen", en: "Safety & Side Effects" },
    icon: "Shield",
    description: {
      de: "Nebenwirkungen, Risiken und Wechselwirkungen",
      en: "Side effects, risks and interactions"
    }
  },
  {
    id: "dosierung",
    name: { de: "Dosierung & Einnahme", en: "Dosage & Intake" },
    icon: "Scale",
    description: {
      de: "Empfohlene Mengen und verschiedene Einnahmeformen",
      en: "Recommended amounts and different forms of intake"
    }
  },
  {
    id: "zubereitung",
    name: { de: "Zubereitung", en: "Preparation" },
    icon: "ChefHat",
    description: {
      de: "Traditionelle und moderne Zubereitungsmethoden",
      en: "Traditional and modern preparation methods"
    }
  },
  {
    id: "kauf",
    name: { de: "Kauf & Legalität", en: "Purchase & Legality" },
    icon: "ShoppingBag",
    description: {
      de: "Bezugsquellen und rechtliche Situation in Deutschland und der EU",
      en: "Where to buy and legal status in Germany and the EU"
    }
  },
  {
    id: "vergleiche",
    name: { de: "Vergleiche", en: "Comparisons" },
    icon: "GitCompare",
    description: {
      de: "Kava im Vergleich zu anderen Nahrungsergänzungsmitteln",
      en: "Kava compared to other supplements"
    }
  },
  {
    id: "kultur",
    name: { de: "Kultur & Tradition", en: "Culture & Tradition" },
    icon: "Globe",
    description: {
      de: "Zeremonien, Traditionen und kulturelle Bedeutung",
      en: "Ceremonies, traditions and cultural significance"
    }
  }
];

export const faqItems: FAQItem[] = [
  // ==================== GRUNDLAGEN ====================
  {
    id: "was-ist-kava",
    category: "grundlagen",
    question: {
      de: "Was ist Kava (Kava-Kava)?",
      en: "What is Kava (Kava-Kava)?"
    },
    answer: {
      de: "Kava (Piper methysticum) ist eine Pflanzenart aus der Familie der Pfeffergewächse (Piperaceae), die seit über 3.000 Jahren im Pazifikraum kultiviert wird. Der Name bedeutet übersetzt \"berauschender Pfeffer\". Die Wurzeln der Pflanze enthalten Kavalactone – bioaktive Verbindungen mit entspannenden, angstlösenden und stimmungsaufhellenden Eigenschaften. Kava wird traditionell als Getränk zubereitet und spielt eine zentrale Rolle in den Kulturen von Vanuatu, Fiji, Tonga, Samoa und Hawaii.",
      en: "Kava (Piper methysticum) is a plant species from the pepper family (Piperaceae) that has been cultivated in the Pacific region for over 3,000 years. The name translates to \"intoxicating pepper\". The plant's roots contain kavalactones – bioactive compounds with relaxing, anxiolytic and mood-enhancing properties. Kava is traditionally prepared as a beverage and plays a central role in the cultures of Vanuatu, Fiji, Tonga, Samoa and Hawaii."
    },
    keywords: ["kava", "kava kava", "was ist kava", "piper methysticum", "kava definition"],
    relatedLinks: [
      { href: "/de/botanik", label: { de: "Botanik von Piper methysticum", en: "Botany of Piper methysticum" } },
      { href: "/de/geschichte", label: { de: "Geschichte von Kava", en: "History of Kava" } }
    ],
    searchVolume: 170
  },
  {
    id: "was-bedeutet-piper-methysticum",
    category: "grundlagen",
    question: {
      de: "Was bedeutet Piper methysticum?",
      en: "What does Piper methysticum mean?"
    },
    answer: {
      de: "Piper methysticum ist der wissenschaftliche (lateinische) Name für die Kava-Pflanze. \"Piper\" bedeutet Pfeffer und verweist auf die Pflanzenfamilie der Pfeffergewächse. \"Methysticum\" stammt vom griechischen Wort \"methystikos\" und bedeutet \"berauschend\" oder \"betrunken machend\". Der Name wurde 1777 von Johann Georg Forster vergeben, der die Pflanze während der zweiten Weltumsegelung von James Cook wissenschaftlich beschrieb.",
      en: "Piper methysticum is the scientific (Latin) name for the Kava plant. \"Piper\" means pepper and refers to the pepper plant family. \"Methysticum\" comes from the Greek word \"methystikos\" meaning \"intoxicating\" or \"making drunk\". The name was given in 1777 by Johann Georg Forster, who scientifically described the plant during James Cook's second voyage around the world."
    },
    keywords: ["piper methysticum", "piper methysticum bedeutung", "kava wissenschaftlicher name"],
    relatedLinks: [
      { href: "/de/botanik/pflanze", label: { de: "Die Kava-Pflanze", en: "The Kava Plant" } }
    ],
    searchVolume: 480
  },
  {
    id: "woher-kommt-kava",
    category: "grundlagen",
    question: {
      de: "Woher kommt Kava ursprünglich?",
      en: "Where does Kava originally come from?"
    },
    answer: {
      de: "Kava stammt ursprünglich aus dem westlichen Pazifik, wobei Vanuatu als Ursprungsregion gilt. Dort findet sich die größte genetische Vielfalt mit über 80 verschiedenen Sorten. Die Pflanze wurde vor etwa 3.000 Jahren aus der wilden Art Piper wichmannii domestiziert und durch polynesische Seefahrer als \"Canoe Plant\" über den gesamten Pazifik verbreitet – nach Fiji, Tonga, Samoa, Hawaii und Pohnpei.",
      en: "Kava originally comes from the western Pacific, with Vanuatu considered the region of origin. The greatest genetic diversity is found there, with over 80 different varieties. The plant was domesticated from the wild species Piper wichmannii about 3,000 years ago and spread throughout the Pacific by Polynesian seafarers as a \"Canoe Plant\" – to Fiji, Tonga, Samoa, Hawaii and Pohnpei."
    },
    keywords: ["kava herkunft", "kava ursprung", "kava vanuatu", "kava pazifik"],
    relatedLinks: [
      { href: "/de/kultur/weltkarte", label: { de: "Interaktive Kava-Weltkarte", en: "Interactive Kava World Map" } },
      { href: "/de/geschichte", label: { de: "Geschichte von Kava", en: "History of Kava" } }
    ],
    searchVolume: 20
  },
  {
    id: "kava-wurzel",
    category: "grundlagen",
    question: {
      de: "Was ist die Kava-Wurzel?",
      en: "What is the Kava root?"
    },
    answer: {
      de: "Die Kava-Wurzel ist der Teil der Pflanze, der für die Zubereitung des Getränks verwendet wird. Sie besteht aus zwei Hauptteilen: dem Stumpf (auch \"Corm\" oder \"Lewena\" genannt) – dem dicken, verholzten Wurzelstock – und den Seitenwurzeln (\"Waka\"), die den höchsten Kavalacton-Gehalt aufweisen. Eine reife Kava-Pflanze (3-5 Jahre alt) kann einen Wurzelstock von 5-25 kg entwickeln. Nur die unterirdischen Teile sollten verwendet werden, da Blätter und Stängel unerwünschte Verbindungen enthalten können.",
      en: "The Kava root is the part of the plant used to prepare the beverage. It consists of two main parts: the stump (also called \"Corm\" or \"Lewena\") – the thick, woody rootstock – and the lateral roots (\"Waka\"), which have the highest kavalactone content. A mature Kava plant (3-5 years old) can develop a rootstock of 5-25 kg. Only the underground parts should be used, as leaves and stems may contain undesirable compounds."
    },
    keywords: ["kava wurzel", "kava root", "waka", "lewena", "kava stumpf"],
    relatedLinks: [
      { href: "/de/botanik/morphologie", label: { de: "Morphologie der Kava-Pflanze", en: "Morphology of the Kava Plant" } }
    ],
    searchVolume: 170
  },
  
  // ==================== WIRKUNG ====================
  {
    id: "wie-wirkt-kava",
    category: "wirkung",
    question: {
      de: "Wie wirkt Kava?",
      en: "How does Kava work?"
    },
    answer: {
      de: "Kava wirkt hauptsächlich über seine Kavalactone, die mit dem GABA-System im Gehirn interagieren. Die Wirkung umfasst: Entspannung der Muskulatur, Reduktion von Angst und Stress, leichte Euphorie und gehobene Stimmung, verbesserte Geselligkeit bei klarem Kopf, sowie Förderung eines erholsamen Schlafs. Im Gegensatz zu Alkohol beeinträchtigt Kava nicht die geistige Klarheit. Die Wirkung setzt typischerweise 15-30 Minuten nach der Einnahme ein und hält 2-4 Stunden an.",
      en: "Kava works primarily through its kavalactones, which interact with the GABA system in the brain. Effects include: muscle relaxation, reduction of anxiety and stress, mild euphoria and elevated mood, improved sociability with a clear head, and promotion of restful sleep. Unlike alcohol, Kava does not impair mental clarity. Effects typically begin 15-30 minutes after consumption and last 2-4 hours."
    },
    keywords: ["kava wirkung", "wie wirkt kava", "kava effekte", "kavalactone wirkung"],
    relatedLinks: [
      { href: "/de/wirkung", label: { de: "Wirkung von Kava", en: "Effects of Kava" } },
      { href: "/de/inhaltsstoffe", label: { de: "Kavalactone", en: "Kavalactones" } }
    ],
    searchVolume: 590
  },
  {
    id: "kava-wirkdauer",
    category: "wirkung",
    question: {
      de: "Wie lange wirkt Kava?",
      en: "How long does Kava last?"
    },
    answer: {
      de: "Die Wirkdauer von Kava variiert je nach Dosis, Sorte und individueller Empfindlichkeit. Typischerweise setzt die Wirkung nach 15-30 Minuten ein und erreicht ihren Höhepunkt nach etwa 1-2 Stunden. Die Hauptwirkung hält 2-4 Stunden an, wobei ein angenehmes Nachgefühl der Entspannung noch länger anhalten kann. Bei höheren Dosen oder stärkeren Sorten kann die Wirkung bis zu 6 Stunden spürbar sein. Die schlaffördernde Wirkung kann die ganze Nacht anhalten.",
      en: "The duration of Kava's effects varies depending on dose, variety and individual sensitivity. Typically, effects begin after 15-30 minutes and peak after about 1-2 hours. The main effects last 2-4 hours, though a pleasant afterglow of relaxation may persist longer. With higher doses or stronger varieties, effects can be noticeable for up to 6 hours. The sleep-promoting effects can last throughout the night."
    },
    keywords: ["kava wirkdauer", "wie lange wirkt kava", "kava dauer"],
    searchVolume: 0
  },
  {
    id: "kava-gegen-angst",
    category: "wirkung",
    question: {
      de: "Hilft Kava gegen Angst?",
      en: "Does Kava help with anxiety?"
    },
    answer: {
      de: "Ja, Kava hat in zahlreichen klinischen Studien anxiolytische (angstlösende) Wirkungen gezeigt. Eine Cochrane-Metaanalyse von 2003 bestätigte die Wirksamkeit bei Angststörungen. Die Kavalactone wirken auf GABA-Rezeptoren ähnlich wie Benzodiazepine, jedoch ohne das Abhängigkeitspotenzial. Kava kann bei generalisierter Angststörung, sozialer Angst und stressbedingter Anspannung helfen. Wichtig: Bei diagnostizierten Angststörungen sollte die Anwendung mit einem Arzt besprochen werden.",
      en: "Yes, Kava has shown anxiolytic (anxiety-reducing) effects in numerous clinical studies. A 2003 Cochrane meta-analysis confirmed its efficacy for anxiety disorders. Kavalactones act on GABA receptors similarly to benzodiazepines, but without the addiction potential. Kava can help with generalized anxiety disorder, social anxiety and stress-related tension. Important: For diagnosed anxiety disorders, use should be discussed with a doctor."
    },
    keywords: ["kava angst", "kava gegen angst", "kava anxiolytisch", "kava angststörung"],
    relatedLinks: [
      { href: "/de/studien", label: { de: "Wissenschaftliche Studien", en: "Scientific Studies" } },
      { href: "/de/wirkung/angst", label: { de: "Kava bei Angst", en: "Kava for Anxiety" } }
    ],
    searchVolume: 10
  },
  {
    id: "kava-depression",
    category: "wirkung",
    question: {
      de: "Kann Kava bei Depressionen helfen?",
      en: "Can Kava help with depression?"
    },
    answer: {
      de: "Einige Studien deuten darauf hin, dass Kava stimmungsaufhellende Eigenschaften besitzt. Eine Studie der University of Melbourne (2013) zeigte positive Effekte bei leichten bis mittelschweren Depressionen. Die Wirkung wird auf die Modulation von Dopamin- und Serotonin-Rezeptoren zurückgeführt. Allerdings ist Kava kein Ersatz für eine professionelle Behandlung von Depressionen. Bei diagnostizierten depressiven Störungen sollte immer ein Arzt konsultiert werden, besonders wenn bereits Antidepressiva eingenommen werden.",
      en: "Some studies suggest that Kava has mood-enhancing properties. A University of Melbourne study (2013) showed positive effects for mild to moderate depression. The effect is attributed to modulation of dopamine and serotonin receptors. However, Kava is not a substitute for professional treatment of depression. For diagnosed depressive disorders, a doctor should always be consulted, especially if antidepressants are already being taken."
    },
    keywords: ["kava depression", "piper methysticum depression", "kava stimmung"],
    relatedLinks: [
      { href: "/de/studien", label: { de: "Wissenschaftliche Studien", en: "Scientific Studies" } }
    ],
    searchVolume: 70
  },
  {
    id: "kava-schlaf",
    category: "wirkung",
    question: {
      de: "Verbessert Kava den Schlaf?",
      en: "Does Kava improve sleep?"
    },
    answer: {
      de: "Ja, Kava kann die Schlafqualität verbessern. Die entspannende Wirkung der Kavalactone hilft beim Einschlafen und fördert einen tieferen, erholsameren Schlaf. Im Gegensatz zu vielen Schlafmitteln verursacht Kava keinen \"Hangover\" am nächsten Morgen. Studien zeigen, dass Kava besonders bei stressbedingten Schlafstörungen wirksam ist. Für die Schlafförderung wird empfohlen, Kava 1-2 Stunden vor dem Schlafengehen einzunehmen. Sorten mit höherem DHM- und DHK-Gehalt (wie Borogu) sind besonders schlaffördernd.",
      en: "Yes, Kava can improve sleep quality. The relaxing effect of kavalactones helps with falling asleep and promotes deeper, more restful sleep. Unlike many sleep aids, Kava does not cause a \"hangover\" the next morning. Studies show that Kava is particularly effective for stress-related sleep disorders. For sleep promotion, it is recommended to take Kava 1-2 hours before bedtime. Varieties with higher DHM and DHK content (like Borogu) are particularly sleep-promoting."
    },
    keywords: ["kava schlaf", "kava schlafen", "kava einschlafen", "kava schlafstörungen"],
    relatedLinks: [
      { href: "/de/wirkung/schlaf", label: { de: "Kava für besseren Schlaf", en: "Kava for Better Sleep" } }
    ],
    searchVolume: 40
  },
  
  // ==================== SICHERHEIT ====================
  {
    id: "kava-nebenwirkungen",
    category: "sicherheit",
    question: {
      de: "Welche Nebenwirkungen hat Kava?",
      en: "What are the side effects of Kava?"
    },
    answer: {
      de: "Bei sachgemäßer Anwendung von Noble Kava-Sorten sind Nebenwirkungen selten und mild. Mögliche Nebenwirkungen umfassen: vorübergehende Taubheit von Lippen und Zunge (normal), leichte Übelkeit bei Einnahme auf leeren Magen, Schläfrigkeit (besonders bei höheren Dosen), und bei chronischem Überkonsum eine reversible Hautschuppung (\"Kava-Dermopathie\"). Wichtig ist die Verwendung von reinem Wurzelpulver aus Noble-Sorten und die Vermeidung von Alkohol während der Einnahme.",
      en: "With proper use of Noble Kava varieties, side effects are rare and mild. Possible side effects include: temporary numbness of lips and tongue (normal), mild nausea when taken on an empty stomach, drowsiness (especially at higher doses), and with chronic overconsumption a reversible skin scaling (\"Kava dermopathy\"). Important is the use of pure root powder from Noble varieties and avoiding alcohol during consumption."
    },
    keywords: ["kava nebenwirkungen", "kava kava nebenwirkungen", "kava risiken"],
    relatedLinks: [
      { href: "/de/sicherheit", label: { de: "Sicherheit von Kava", en: "Safety of Kava" } },
      { href: "/de/sicherheit/nebenwirkungen", label: { de: "Nebenwirkungen im Detail", en: "Side Effects in Detail" } }
    ],
    searchVolume: 140
  },
  {
    id: "kava-leber",
    category: "sicherheit",
    question: {
      de: "Ist Kava schädlich für die Leber?",
      en: "Is Kava harmful to the liver?"
    },
    answer: {
      de: "Die Frage der Lebertoxizität ist komplex. Das deutsche Kava-Verbot von 2002 basierte auf Berichten über Leberschäden, die jedoch größtenteils auf minderwertige Produkte (Verwendung von Blättern/Stängeln statt Wurzeln), Tudei-Sorten (nicht für den täglichen Konsum geeignet), Alkoholextrakte und Wechselwirkungen mit Medikamenten zurückgeführt werden konnten. Studien zeigen, dass traditionell zubereitetes Noble Kava bei gesunden Erwachsenen sicher ist. Dennoch sollten Personen mit Lebererkrankungen Kava meiden und regelmäßige Konsumenten ihre Leberwerte kontrollieren lassen.",
      en: "The question of liver toxicity is complex. The German Kava ban of 2002 was based on reports of liver damage, which were largely attributed to inferior products (use of leaves/stems instead of roots), Tudei varieties (not suitable for daily consumption), alcohol extracts and interactions with medications. Studies show that traditionally prepared Noble Kava is safe for healthy adults. Nevertheless, people with liver disease should avoid Kava and regular consumers should have their liver values checked."
    },
    keywords: ["kava leber", "kava leberschäden", "kava hepatotoxisch", "kava gefährlich"],
    relatedLinks: [
      { href: "/de/sicherheit/leber", label: { de: "Kava und die Leber", en: "Kava and the Liver" } },
      { href: "/de/sorten/noble-vs-tudei", label: { de: "Noble vs. Tudei Kava", en: "Noble vs. Tudei Kava" } }
    ],
    searchVolume: 30
  },
  {
    id: "kava-droge",
    category: "sicherheit",
    question: {
      de: "Ist Kava eine Droge?",
      en: "Is Kava a drug?"
    },
    answer: {
      de: "Kava ist keine Droge im Sinne des Betäubungsmittelgesetzes. Es ist ein traditionelles Getränk mit psychoaktiver Wirkung, ähnlich wie Kaffee oder Tee. Kava macht nicht abhängig, verursacht keine Toleranzentwicklung und hat kein Missbrauchspotenzial. Die WHO hat Kava als \"nicht süchtig machend\" eingestuft. In den meisten Ländern ist Kava legal erhältlich. Die Wirkung ist mild entspannend, nicht berauschend im Sinne von Alkohol oder illegalen Substanzen.",
      en: "Kava is not a drug in the sense of controlled substances law. It is a traditional beverage with psychoactive effects, similar to coffee or tea. Kava is not addictive, does not cause tolerance development and has no abuse potential. The WHO has classified Kava as \"not addictive\". In most countries, Kava is legally available. The effect is mildly relaxing, not intoxicating in the sense of alcohol or illegal substances."
    },
    keywords: ["kava droge", "ist kava eine droge", "kava sucht", "kava abhängigkeit"],
    searchVolume: 0
  },
  {
    id: "kava-alkohol",
    category: "sicherheit",
    question: {
      de: "Kann man Kava mit Alkohol kombinieren?",
      en: "Can you combine Kava with alcohol?"
    },
    answer: {
      de: "Nein, Kava sollte nicht mit Alkohol kombiniert werden. Beide Substanzen wirken auf das GABA-System und können sich gegenseitig verstärken, was zu übermäßiger Sedierung führen kann. Zudem werden beide über die Leber metabolisiert, was die Belastung erhöht. In der traditionellen pazifischen Kultur wird Kava als Alternative zu Alkohol konsumiert, nicht zusammen damit. Warten Sie mindestens 24 Stunden zwischen Alkohol- und Kava-Konsum.",
      en: "No, Kava should not be combined with alcohol. Both substances act on the GABA system and can potentiate each other, which can lead to excessive sedation. Additionally, both are metabolized by the liver, increasing the burden. In traditional Pacific culture, Kava is consumed as an alternative to alcohol, not together with it. Wait at least 24 hours between alcohol and Kava consumption."
    },
    keywords: ["kava alkohol", "kava und alkohol", "kava mit alkohol"],
    relatedLinks: [
      { href: "/de/sicherheit/wechselwirkungen", label: { de: "Wechselwirkungen", en: "Interactions" } }
    ],
    searchVolume: 0
  },
  
  // ==================== DOSIERUNG ====================
  {
    id: "kava-dosierung",
    category: "dosierung",
    question: {
      de: "Wie dosiert man Kava richtig?",
      en: "How do you dose Kava correctly?"
    },
    answer: {
      de: "Die empfohlene Dosierung für Kava-Pulver liegt bei 2-4 Esslöffeln (ca. 15-30g) pro Sitzung, aufgeteilt in 2-3 Schalen. Für Anfänger wird empfohlen, mit einer niedrigeren Dosis (1-2 EL) zu beginnen. Die Kavalacton-Dosis sollte 250mg pro Einzeldosis nicht überschreiten. Wichtig: Kava entfaltet seine volle Wirkung oft erst nach regelmäßiger Einnahme über mehrere Tage (\"Reverse Tolerance\"). Nicht mehr als 300mg Kavalactone pro Tag über längere Zeiträume.",
      en: "The recommended dosage for Kava powder is 2-4 tablespoons (approx. 15-30g) per session, divided into 2-3 shells. For beginners, it is recommended to start with a lower dose (1-2 tbsp). The kavalactone dose should not exceed 250mg per single dose. Important: Kava often only develops its full effect after regular intake over several days (\"Reverse Tolerance\"). No more than 300mg kavalactones per day over longer periods."
    },
    keywords: ["kava dosierung", "kava kava dosierung", "kava dosis", "kava menge"],
    relatedLinks: [
      { href: "/de/zubereitung", label: { de: "Zubereitung von Kava", en: "Preparation of Kava" } }
    ],
    searchVolume: 70
  },
  {
    id: "kava-einnahme",
    category: "dosierung",
    question: {
      de: "Wie nimmt man Kava am besten ein?",
      en: "What is the best way to take Kava?"
    },
    answer: {
      de: "Die traditionelle Methode ist die Zubereitung als Getränk: Kava-Pulver wird in Wasser geknetet und durch ein Sieb gefiltert. Das Getränk wird in Schalen (\"Shells\") getrunken, typischerweise 2-3 Schalen pro Sitzung mit 10-15 Minuten Abstand. Alternativ gibt es Instant-Kava (einfach in Wasser auflösen), Kapseln oder Tinkturen. Die beste Wirkung erzielt man auf leicht nüchternen Magen, etwa 2-3 Stunden nach der letzten Mahlzeit. Nach dem Trinken kann ein kleiner Snack die Wirkung verstärken.",
      en: "The traditional method is preparation as a beverage: Kava powder is kneaded in water and filtered through a strainer. The drink is consumed in shells, typically 2-3 shells per session with 10-15 minutes between each. Alternatively, there is instant Kava (simply dissolve in water), capsules or tinctures. The best effect is achieved on a slightly empty stomach, about 2-3 hours after the last meal. A small snack after drinking can enhance the effect."
    },
    keywords: ["kava einnahme", "kava einnehmen", "kava wie einnehmen", "kava trinken"],
    relatedLinks: [
      { href: "/de/zubereitung/traditionell", label: { de: "Traditionelle Zubereitung", en: "Traditional Preparation" } }
    ],
    searchVolume: 0
  },
  {
    id: "kava-taeglich",
    category: "dosierung",
    question: {
      de: "Kann man Kava täglich trinken?",
      en: "Can you drink Kava daily?"
    },
    answer: {
      de: "Ja, in den pazifischen Kulturen wird Kava traditionell täglich konsumiert. Für den westlichen Gebrauch wird empfohlen, regelmäßige Pausen einzulegen (z.B. 1-2 Tage pro Woche ohne Kava). Bei täglichem Konsum sollte die Dosis moderat bleiben und ausschließlich Noble Kava-Sorten verwendet werden. Regelmäßige Konsumenten sollten ihre Leberwerte jährlich kontrollieren lassen. Wichtig: Ausreichend Wasser trinken und auf eine gesunde Ernährung achten.",
      en: "Yes, in Pacific cultures Kava is traditionally consumed daily. For Western use, it is recommended to take regular breaks (e.g., 1-2 days per week without Kava). With daily consumption, the dose should remain moderate and only Noble Kava varieties should be used. Regular consumers should have their liver values checked annually. Important: Drink enough water and maintain a healthy diet."
    },
    keywords: ["kava täglich", "kava jeden tag", "kava regelmäßig"],
    searchVolume: 0
  },
  
  // ==================== ZUBEREITUNG ====================
  {
    id: "kava-zubereitung",
    category: "zubereitung",
    question: {
      de: "Wie bereitet man Kava traditionell zu?",
      en: "How do you prepare Kava traditionally?"
    },
    answer: {
      de: "Traditionelle Zubereitung: 1) 2-4 EL Kava-Pulver in einen Stoffbeutel oder Nussmilchbeutel geben. 2) In eine Schüssel mit ca. 500ml warmem (nicht heißem!) Wasser legen. 3) 5-10 Minuten kneten und auswringen, bis das Wasser milchig-braun wird. 4) Den Beutel ausdrücken und entfernen. 5) In Schalen servieren und zügig trinken. Der Geschmack ist erdig und leicht bitter – das ist normal. Ein Stück Obst als \"Chaser\" hilft gegen den Geschmack.",
      en: "Traditional preparation: 1) Put 2-4 tbsp Kava powder in a cloth bag or nut milk bag. 2) Place in a bowl with approx. 500ml warm (not hot!) water. 3) Knead and squeeze for 5-10 minutes until the water becomes milky-brown. 4) Squeeze out and remove the bag. 5) Serve in shells and drink promptly. The taste is earthy and slightly bitter – this is normal. A piece of fruit as a \"chaser\" helps with the taste."
    },
    keywords: ["kava zubereitung", "kava kava zubereitung", "kava machen", "kava anleitung"],
    relatedLinks: [
      { href: "/de/zubereitung/traditionell", label: { de: "Traditionelle Zubereitung", en: "Traditional Preparation" } },
      { href: "/de/zubereitung/instant", label: { de: "Instant Kava", en: "Instant Kava" } }
    ],
    searchVolume: 20
  },
  {
    id: "kava-geschmack",
    category: "zubereitung",
    question: {
      de: "Wie schmeckt Kava?",
      en: "What does Kava taste like?"
    },
    answer: {
      de: "Kava hat einen charakteristischen, erdigen Geschmack, der oft als \"acquired taste\" beschrieben wird. Der Geschmack ist leicht bitter, pfeffrig und erdig mit einer gewissen Schärfe. Nach dem Trinken tritt eine vorübergehende Taubheit der Lippen und Zunge ein – ein Zeichen für aktive Kavalactone. Tipps zur Verbesserung: Kava kalt trinken, mit Kokosmilch mischen, oder ein Stück Ananas/Mango als \"Chaser\" essen. Mit der Zeit gewöhnt man sich an den Geschmack.",
      en: "Kava has a characteristic, earthy taste often described as an \"acquired taste\". The flavor is slightly bitter, peppery and earthy with a certain sharpness. After drinking, a temporary numbness of the lips and tongue occurs – a sign of active kavalactones. Tips for improvement: Drink Kava cold, mix with coconut milk, or eat a piece of pineapple/mango as a \"chaser\". Over time, you get used to the taste."
    },
    keywords: ["kava geschmack", "kava kava geschmack", "wie schmeckt kava"],
    searchVolume: 0
  },
  {
    id: "kava-tee",
    category: "zubereitung",
    question: {
      de: "Kann man Kava als Tee zubereiten?",
      en: "Can you prepare Kava as tea?"
    },
    answer: {
      de: "Kava sollte nicht wie normaler Tee mit kochendem Wasser zubereitet werden, da hohe Temperaturen die Kavalactone zerstören können. Verwenden Sie warmes Wasser (ca. 40°C). \"Kava-Tee\"-Produkte im Handel enthalten oft nur geringe Mengen Kava und sind weniger wirksam als traditionell zubereitetes Kava-Pulver. Für die beste Wirkung empfehlen wir die traditionelle Knetmethode mit Medium Grind Kava-Pulver oder hochwertiges Instant-Kava.",
      en: "Kava should not be prepared like regular tea with boiling water, as high temperatures can destroy the kavalactones. Use warm water (approx. 40°C). \"Kava tea\" products on the market often contain only small amounts of Kava and are less effective than traditionally prepared Kava powder. For the best effect, we recommend the traditional kneading method with medium grind Kava powder or high-quality instant Kava."
    },
    keywords: ["kava tee", "kava kava tee", "kava als tee"],
    relatedLinks: [
      { href: "/de/zubereitung", label: { de: "Zubereitungsmethoden", en: "Preparation Methods" } }
    ],
    searchVolume: 110
  },
  
  // ==================== KAUF & LEGALITÄT ====================
  {
    id: "kava-legal-deutschland",
    category: "kauf",
    question: {
      de: "Ist Kava in Deutschland legal?",
      en: "Is Kava legal in Germany?"
    },
    answer: {
      de: "Die rechtliche Situation von Kava in Deutschland ist komplex. 2002 wurde Kava als Arzneimittel verboten, nachdem Berichte über Leberschäden aufkamen. Dieses Verbot wurde 2014 vom Bundesverwaltungsgericht aufgehoben, da die wissenschaftliche Grundlage unzureichend war. Aktuell ist der Import und Besitz von Kava für den persönlichen Gebrauch legal. Der Verkauf als Nahrungsergänzungsmittel oder Arzneimittel ist jedoch weiterhin eingeschränkt. Kava kann aus dem EU-Ausland (z.B. Niederlande, UK) oder direkt aus dem Pazifik bestellt werden.",
      en: "The legal situation of Kava in Germany is complex. In 2002, Kava was banned as a medicine after reports of liver damage. This ban was overturned in 2014 by the Federal Administrative Court because the scientific basis was insufficient. Currently, importing and possessing Kava for personal use is legal. However, selling it as a dietary supplement or medicine remains restricted. Kava can be ordered from other EU countries (e.g., Netherlands, UK) or directly from the Pacific."
    },
    keywords: ["kava legal deutschland", "kava kava legal", "kava deutschland", "kava verboten"],
    relatedLinks: [
      { href: "/de/rechtsstatus", label: { de: "Rechtsstatus von Kava", en: "Legal Status of Kava" } }
    ],
    searchVolume: 40
  },
  {
    id: "kava-kaufen",
    category: "kauf",
    question: {
      de: "Wo kann man Kava kaufen?",
      en: "Where can you buy Kava?"
    },
    answer: {
      de: "Kava kann über verschiedene Wege bezogen werden: 1) Online-Shops aus dem Pazifik (Vanuatu, Fiji) – höchste Qualität, aber längere Lieferzeit. 2) Europäische Händler (UK, Niederlande) – schnellere Lieferung, gute Auswahl. 3) Spezialisierte Kava-Bars – für den Vor-Ort-Konsum. In deutschen Drogerien (DM, Rossmann) oder Apotheken ist Kava derzeit nicht erhältlich. Achten Sie beim Kauf auf: Noble Kava-Sorten, reine Wurzel (keine Blätter/Stängel), Laboranalysen und Herkunftsangaben.",
      en: "Kava can be obtained through various channels: 1) Online shops from the Pacific (Vanuatu, Fiji) – highest quality, but longer delivery time. 2) European retailers (UK, Netherlands) – faster delivery, good selection. 3) Specialized Kava bars – for on-site consumption. In German drugstores (DM, Rossmann) or pharmacies, Kava is currently not available. When buying, look for: Noble Kava varieties, pure root (no leaves/stems), lab analyses and origin information."
    },
    keywords: ["kava kaufen", "kava kava kaufen", "wo kava kaufen", "kava bestellen"],
    relatedLinks: [
      { href: "/de/kultur/kava-bars", label: { de: "Kava-Bar Finder", en: "Kava Bar Finder" } }
    ],
    searchVolume: 880
  },
  {
    id: "kava-dm-apotheke",
    category: "kauf",
    question: {
      de: "Gibt es Kava bei DM oder in der Apotheke?",
      en: "Is Kava available at DM or pharmacies?"
    },
    answer: {
      de: "Nein, Kava ist derzeit weder bei DM, Rossmann noch in deutschen Apotheken erhältlich. Dies liegt an der regulatorischen Situation in Deutschland, die den Verkauf von Kava als Nahrungsergänzungsmittel oder Arzneimittel einschränkt. Homöopathische Präparate mit Piper methysticum (stark verdünnt) waren früher in Apotheken erhältlich, sind aber ebenfalls selten geworden. Für echtes Kava-Pulver müssen Sie auf spezialisierte Online-Händler zurückgreifen.",
      en: "No, Kava is currently not available at DM, Rossmann or German pharmacies. This is due to the regulatory situation in Germany, which restricts the sale of Kava as a dietary supplement or medicine. Homeopathic preparations with Piper methysticum (highly diluted) were previously available in pharmacies but have also become rare. For real Kava powder, you need to use specialized online retailers."
    },
    keywords: ["kava dm", "kava kava kaufen dm", "kava apotheke", "kava kava apotheke"],
    searchVolume: 210
  },
  {
    id: "kava-wieder-erhaeltlich",
    category: "kauf",
    question: {
      de: "Ist Kava wieder erhältlich?",
      en: "Is Kava available again?"
    },
    answer: {
      de: "Ja, Kava ist wieder erhältlich, wenn auch nicht im deutschen Einzelhandel. Nach der Aufhebung des Verbots 2014 kann Kava legal für den persönlichen Gebrauch importiert werden. Die beste Bezugsquelle sind spezialisierte Online-Händler aus dem Pazifik (Vanuatu, Fiji, Tonga) oder europäische Anbieter (UK, Niederlande). Die Qualität und Verfügbarkeit hat sich in den letzten Jahren deutlich verbessert, und es gibt eine wachsende Community von Kava-Enthusiasten in Deutschland.",
      en: "Yes, Kava is available again, although not in German retail stores. After the ban was lifted in 2014, Kava can be legally imported for personal use. The best sources are specialized online retailers from the Pacific (Vanuatu, Fiji, Tonga) or European suppliers (UK, Netherlands). Quality and availability have improved significantly in recent years, and there is a growing community of Kava enthusiasts in Germany."
    },
    keywords: ["kava wieder erhältlich", "kava kava wieder erhältlich", "kava verfügbar"],
    searchVolume: 90
  },
  
  // ==================== VERGLEICHE ====================
  {
    id: "kava-vs-ashwagandha",
    category: "vergleiche",
    question: {
      de: "Was ist der Unterschied zwischen Kava und Ashwagandha?",
      en: "What is the difference between Kava and Ashwagandha?"
    },
    answer: {
      de: "Kava und Ashwagandha sind beide adaptogene Pflanzen, unterscheiden sich aber deutlich: Kava wirkt schnell (15-30 Min.) und akut entspannend, ideal für situative Angst oder Stress. Ashwagandha wirkt langfristig über Wochen und reguliert den Cortisolspiegel. Kava wird als Getränk zubereitet, Ashwagandha meist als Kapsel eingenommen. Kava hat eine spürbare psychoaktive Wirkung, Ashwagandha ist subtiler. Beide können kombiniert werden, wobei Kava für akute Situationen und Ashwagandha für langfristige Stressresistenz geeignet ist.",
      en: "Kava and Ashwagandha are both adaptogenic plants but differ significantly: Kava works quickly (15-30 min.) and is acutely relaxing, ideal for situational anxiety or stress. Ashwagandha works long-term over weeks and regulates cortisol levels. Kava is prepared as a beverage, Ashwagandha is usually taken as a capsule. Kava has a noticeable psychoactive effect, Ashwagandha is more subtle. Both can be combined, with Kava suitable for acute situations and Ashwagandha for long-term stress resistance."
    },
    keywords: ["kava ashwagandha", "kava vs ashwagandha", "kava oder ashwagandha"],
    searchVolume: 10
  },
  {
    id: "kava-vs-baldrian",
    category: "vergleiche",
    question: {
      de: "Was ist der Unterschied zwischen Kava und Baldrian?",
      en: "What is the difference between Kava and Valerian?"
    },
    answer: {
      de: "Kava und Baldrian (Valerian) sind beide entspannend, haben aber unterschiedliche Profile: Kava wirkt stärker angstlösend und fördert Geselligkeit bei klarem Kopf. Baldrian ist primär schlaffördernd und kann Schläfrigkeit verursachen. Kava hat einen schnelleren Wirkungseintritt (15-30 Min.), Baldrian braucht oft mehrere Wochen regelmäßiger Einnahme. Der Geschmack von Kava ist erdig, Baldrian riecht und schmeckt unangenehm. Kava ist besser für soziale Situationen, Baldrian besser als reines Schlafmittel.",
      en: "Kava and Valerian are both relaxing but have different profiles: Kava is more anxiolytic and promotes sociability with a clear head. Valerian is primarily sleep-promoting and can cause drowsiness. Kava has a faster onset of action (15-30 min.), Valerian often needs several weeks of regular intake. Kava's taste is earthy, Valerian smells and tastes unpleasant. Kava is better for social situations, Valerian better as a pure sleep aid."
    },
    keywords: ["kava baldrian", "kava vs valerian", "kava oder baldrian"],
    searchVolume: 10
  },
  {
    id: "kava-vs-kratom",
    category: "vergleiche",
    question: {
      de: "Was ist der Unterschied zwischen Kava und Kratom?",
      en: "What is the difference between Kava and Kratom?"
    },
    answer: {
      de: "Kava und Kratom sind grundverschieden und sollten nicht verwechselt werden: Kava enthält Kavalactone und wirkt entspannend ohne Abhängigkeitspotenzial. Kratom enthält Alkaloide (Mitragynin), die an Opioid-Rezeptoren wirken und ein Suchtpotenzial haben. Kava ist in den meisten Ländern legal, Kratom ist in vielen Ländern (inkl. Deutschland) verboten oder reguliert. Kava hat eine lange Tradition sicherer Verwendung, Kratom ist mit Gesundheitsrisiken verbunden. Wir raten von Kratom ab.",
      en: "Kava and Kratom are fundamentally different and should not be confused: Kava contains kavalactones and is relaxing without addiction potential. Kratom contains alkaloids (mitragynine) that act on opioid receptors and have addiction potential. Kava is legal in most countries, Kratom is banned or regulated in many countries (including Germany). Kava has a long tradition of safe use, Kratom is associated with health risks. We advise against Kratom."
    },
    keywords: ["kava kratom", "kava vs kratom", "kava oder kratom", "unterschied kava kratom"],
    searchVolume: 0
  },
  {
    id: "kava-alternative",
    category: "vergleiche",
    question: {
      de: "Was sind Alternativen zu Kava?",
      en: "What are alternatives to Kava?"
    },
    answer: {
      de: "Natürliche Alternativen zu Kava für Entspannung und Angstlinderung umfassen: Ashwagandha (adaptogen, langfristig), Baldrian (schlaffördernd), Passionsblume (mild angstlösend), L-Theanin (aus Tee, fördert Entspannung), Magnesium (Muskelentspannung), CBD (Cannabidiol, legal in Deutschland). Keine dieser Alternativen bietet jedoch das einzigartige Profil von Kava mit seiner Kombination aus Entspannung, Geselligkeit und geistiger Klarheit. Für die beste Alternative zu Alkohol in sozialen Situationen gibt es keinen echten Ersatz für Kava.",
      en: "Natural alternatives to Kava for relaxation and anxiety relief include: Ashwagandha (adaptogenic, long-term), Valerian (sleep-promoting), Passionflower (mildly anxiolytic), L-Theanine (from tea, promotes relaxation), Magnesium (muscle relaxation), CBD (Cannabidiol, legal in Germany). However, none of these alternatives offer Kava's unique profile combining relaxation, sociability and mental clarity. For the best alternative to alcohol in social situations, there is no real substitute for Kava."
    },
    keywords: ["kava alternative", "kava kava alternative", "kava ersatz"],
    searchVolume: 30
  },
  
  // ==================== KULTUR ====================
  {
    id: "kava-zeremonie",
    category: "kultur",
    question: {
      de: "Was ist eine Kava-Zeremonie?",
      en: "What is a Kava ceremony?"
    },
    answer: {
      de: "Eine Kava-Zeremonie ist ein traditionelles Ritual im Pazifikraum, bei dem Kava gemeinschaftlich zubereitet und getrunken wird. Die Zeremonie folgt strengen Protokollen: Wer bereitet das Kava zu? Wer erhält die erste Schale? In welcher Reihenfolge wird getrunken? In Fiji heißt die Zeremonie \"Sevusevu\" und ist Teil offizieller Staatsakte. In Tonga und Samoa gibt es hochformalisierte 'Ava-Zeremonien mit festgelegten Rollen. Die Zeremonie symbolisiert Respekt, Gastfreundschaft und soziale Bindung.",
      en: "A Kava ceremony is a traditional ritual in the Pacific region where Kava is prepared and drunk communally. The ceremony follows strict protocols: Who prepares the Kava? Who receives the first shell? In what order is it drunk? In Fiji, the ceremony is called \"Sevusevu\" and is part of official state functions. In Tonga and Samoa, there are highly formalized 'Ava ceremonies with designated roles. The ceremony symbolizes respect, hospitality and social bonding."
    },
    keywords: ["kava zeremonie", "kava ritual", "sevusevu", "kava tradition"],
    relatedLinks: [
      { href: "/de/kultur/zeremonien", label: { de: "Zeremonien & Rituale", en: "Ceremonies & Rituals" } }
    ],
    searchVolume: 0
  },
  {
    id: "nakamal",
    category: "kultur",
    question: {
      de: "Was ist ein Nakamal?",
      en: "What is a Nakamal?"
    },
    answer: {
      de: "Ein Nakamal ist ein traditioneller Kava-Trinkplatz in Vanuatu. Ursprünglich war es ein Männerhaus, in dem sich die Dorfgemeinschaft zum abendlichen Kava-Trinken versammelte. Heute bezeichnet \"Nakamal\" auch moderne Kava-Bars in Port Vila und anderen Städten. Die Atmosphäre ist ruhig und respektvoll – man sitzt zusammen, trinkt mehrere Schalen und führt leise Gespräche. Nakamals sind soziale Ausgleichsorte, an denen Menschen aller Schichten zusammenkommen.",
      en: "A Nakamal is a traditional Kava drinking place in Vanuatu. Originally it was a men's house where the village community gathered for evening Kava drinking. Today, \"Nakamal\" also refers to modern Kava bars in Port Vila and other cities. The atmosphere is quiet and respectful – people sit together, drink several shells and have quiet conversations. Nakamals are social equalizing places where people of all classes come together."
    },
    keywords: ["nakamal", "kava bar vanuatu", "kava trinkplatz"],
    relatedLinks: [
      { href: "/de/kultur/nakamal", label: { de: "Nakamal & Kava-Bars", en: "Nakamal & Kava Bars" } }
    ],
    searchVolume: 0
  },
  {
    id: "kava-namen",
    category: "kultur",
    question: {
      de: "Welche Namen hat Kava in verschiedenen Kulturen?",
      en: "What names does Kava have in different cultures?"
    },
    answer: {
      de: "Kava hat in verschiedenen pazifischen Kulturen unterschiedliche Namen: Vanuatu: Kava oder Malok. Fiji: Yaqona (ausgesprochen \"Yang-gona\"). Tonga: Kava oder 'Ava. Samoa: 'Ava. Hawaii: 'Awa. Pohnpei: Sakau. Papua-Neuguinea: Kava. Der wissenschaftliche Name Piper methysticum bedeutet \"berauschender Pfeffer\". In Deutschland sind die Bezeichnungen Kava, Kava-Kava und Rauschpfeffer gebräuchlich.",
      en: "Kava has different names in various Pacific cultures: Vanuatu: Kava or Malok. Fiji: Yaqona (pronounced \"Yang-gona\"). Tonga: Kava or 'Ava. Samoa: 'Ava. Hawaii: 'Awa. Pohnpei: Sakau. Papua New Guinea: Kava. The scientific name Piper methysticum means \"intoxicating pepper\". In Germany, the terms Kava, Kava-Kava and Rauschpfeffer are common."
    },
    keywords: ["kava namen", "yaqona", "ava", "awa", "sakau"],
    relatedLinks: [
      { href: "/de/glossar", label: { de: "Glossar", en: "Glossary" } }
    ],
    searchVolume: 0
  },
  
  // ==================== PRODUKTE ====================
  {
    id: "kava-pulver-vs-kapseln",
    category: "dosierung",
    question: {
      de: "Was ist besser: Kava-Pulver oder Kapseln?",
      en: "Which is better: Kava powder or capsules?"
    },
    answer: {
      de: "Kava-Pulver bietet die authentischste Erfahrung und beste Wirkung, erfordert aber Zubereitung. Kapseln sind praktisch für unterwegs, enthalten aber oft weniger Kavalactone und wirken schwächer. Instant-Kava ist ein guter Kompromiss – einfach in Wasser auflösen, gute Wirkung. Für Anfänger empfehlen wir Instant-Kava oder Medium Grind Pulver. Für die stärkste Wirkung: traditionell zubereitetes Pulver. Kapseln eignen sich für gelegentliche, niedrig dosierte Anwendung.",
      en: "Kava powder offers the most authentic experience and best effect but requires preparation. Capsules are practical for on-the-go but often contain fewer kavalactones and work less effectively. Instant Kava is a good compromise – simply dissolve in water, good effect. For beginners, we recommend instant Kava or medium grind powder. For the strongest effect: traditionally prepared powder. Capsules are suitable for occasional, low-dose use."
    },
    keywords: ["kava pulver", "kava kapseln", "kava tabletten", "kava extrakt"],
    searchVolume: 90
  },
  {
    id: "noble-kava",
    category: "grundlagen",
    question: {
      de: "Was ist Noble Kava?",
      en: "What is Noble Kava?"
    },
    answer: {
      de: "Noble Kava bezeichnet Kava-Sorten, die traditionell für den täglichen Konsum kultiviert wurden und ein günstiges Kavalacton-Profil aufweisen. Sie zeichnen sich durch angenehme Wirkung, gute Verträglichkeit und minimale Nebenwirkungen aus. Im Gegensatz dazu stehen \"Tudei\" (Two-Day) Sorten, die stärkere, länger anhaltende und oft unangenehme Effekte haben. Noble Sorten wie Borogu, Melomelo, Palarasul oder Pouni Ono sind für den regelmäßigen Gebrauch geeignet. Beim Kauf sollte immer auf die Bezeichnung \"Noble\" geachtet werden.",
      en: "Noble Kava refers to Kava varieties that have been traditionally cultivated for daily consumption and have a favorable kavalactone profile. They are characterized by pleasant effects, good tolerability and minimal side effects. In contrast are \"Tudei\" (Two-Day) varieties, which have stronger, longer-lasting and often unpleasant effects. Noble varieties like Borogu, Melomelo, Palarasul or Pouni Ono are suitable for regular use. When buying, always look for the \"Noble\" designation."
    },
    keywords: ["noble kava", "kava sorten", "tudei kava", "kava qualität"],
    relatedLinks: [
      { href: "/de/sorten", label: { de: "Kava-Sorten", en: "Kava Varieties" } },
      { href: "/de/sorten/noble-vs-tudei", label: { de: "Noble vs. Tudei", en: "Noble vs. Tudei" } }
    ],
    searchVolume: 20
  }
];

// Helper function to get FAQs by category
export function getFAQsByCategory(categoryId: string): FAQItem[] {
  return faqItems.filter(item => item.category === categoryId);
}

// Helper function to search FAQs
export function searchFAQs(query: string, lang: 'de' | 'en' = 'de'): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return faqItems.filter(item => {
    const questionMatch = item.question[lang].toLowerCase().includes(lowerQuery);
    const answerMatch = item.answer[lang].toLowerCase().includes(lowerQuery);
    const keywordMatch = item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    return questionMatch || answerMatch || keywordMatch;
  });
}

// Helper function to get FAQ by ID
export function getFAQById(id: string): FAQItem | undefined {
  return faqItems.find(item => item.id === id);
}

// Generate JSON-LD structured data for SEO
export function generateFAQSchema(items: FAQItem[], lang: 'de' | 'en' = 'de'): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer[lang]
      }
    }))
  };
}
