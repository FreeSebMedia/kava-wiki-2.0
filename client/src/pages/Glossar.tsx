import WikiPageLayout from "@/components/WikiPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { type Language } from "@/lib/i18n";
import { 
  BookOpen, 
  Beaker, 
  Brain, 
  Leaf, 
  AlertTriangle,
  Scale,
  Clock,
  Droplets,
  Heart,
  Shield,
  Globe,
  Sparkles,
  Search,
  X,
  Pill,
  FlaskConical,
  Moon,
  Sun,
  Users,
  TreePine,
  Waves,
  Activity,
  Eye,
  Coffee,
  Utensils,
  Package,
  TestTube
} from "lucide-react";

type CategoryKey = "chemie" | "wirkung" | "kultur" | "sorten" | "zubereitung" | "sicherheit";

interface GlossaryTermData {
  term: string;
  germanTerm?: string;
  shortDefinition: string;
  fullExplanation: string;
  relatedTerms?: string[];
  relatedLinks?: { label: string; href: string }[];
}

interface GlossaryTerm extends GlossaryTermData {
  id: string;
  category: CategoryKey;
  icon: React.ReactNode;
}

const termIcons: Record<string, React.ReactNode> = {
  "kavalactone": <Beaker className="h-5 w-5" />,
  "chemotyp": <Scale className="h-5 w-5" />,
  "kavain": <Sparkles className="h-5 w-5" />,
  "dhk": <Heart className="h-5 w-5" />,
  "dhm": <Moon className="h-5 w-5" />,
  "yangonin": <FlaskConical className="h-5 w-5" />,
  "dmy": <Sun className="h-5 w-5" />,
  "methysticin": <Moon className="h-5 w-5" />,
  "piper-methysticum": <Leaf className="h-5 w-5" />,
  "piper-wichmannii": <TreePine className="h-5 w-5" />,
  "chalkon": <TestTube className="h-5 w-5" />,
  "extraktion": <Beaker className="h-5 w-5" />,
  "gaba": <Brain className="h-5 w-5" />,
  "reverse-tolerance": <Clock className="h-5 w-5" />,
  "anxiolyse": <Heart className="h-5 w-5" />,
  "krunk": <Waves className="h-5 w-5" />,
  "muskelentspannung": <Activity className="h-5 w-5" />,
  "euphorie": <Sparkles className="h-5 w-5" />,
  "sedierung": <Moon className="h-5 w-5" />,
  "neuroprotektiv": <Brain className="h-5 w-5" />,
  "analgesie": <Pill className="h-5 w-5" />,
  "kava-dermopathie": <Eye className="h-5 w-5" />,
  "noble-kava": <Leaf className="h-5 w-5" />,
  "tudei": <AlertTriangle className="h-5 w-5" />,
  "heady": <Sparkles className="h-5 w-5 text-yellow-500" />,
  "heavy": <Droplets className="h-5 w-5 text-purple-500" />,
  "balanced": <Scale className="h-5 w-5 text-blue-500" />,
  "kultivar": <Leaf className="h-5 w-5" />,
  "waka": <TreePine className="h-5 w-5" />,
  "lewena": <TreePine className="h-5 w-5" />,
  "green-kava": <Leaf className="h-5 w-5" />,
  "awa": <Globe className="h-5 w-5" />,
  "medium-grind": <Droplets className="h-5 w-5" />,
  "micronized": <Beaker className="h-5 w-5" />,
  "instant-kava": <Sparkles className="h-5 w-5" />,
  "knetmethode": <Droplets className="h-5 w-5" />,
  "second-wash": <Droplets className="h-5 w-5" />,
  "strainer-bag": <Package className="h-5 w-5" />,
  "shell": <Coffee className="h-5 w-5" />,
  "aluball": <Utensils className="h-5 w-5" />,
  "grog": <Globe className="h-5 w-5" />,
  "bilo": <Globe className="h-5 w-5" />,
  "nakamal": <Globe className="h-5 w-5" />,
  "tanoa": <Globe className="h-5 w-5" />,
  "bula": <Users className="h-5 w-5" />,
  "flavokavain-b": <AlertTriangle className="h-5 w-5" />,
  "cyp450": <Shield className="h-5 w-5" />,
  "lebersicherheit": <Shield className="h-5 w-5" />,
  "wechselwirkungen": <AlertTriangle className="h-5 w-5" />,
  "dosierung": <Scale className="h-5 w-5" />
};

const termCategories: Record<string, CategoryKey> = {
  "kavalactone": "chemie",
  "chemotyp": "chemie",
  "kavain": "chemie",
  "dhk": "chemie",
  "dhm": "chemie",
  "yangonin": "chemie",
  "dmy": "chemie",
  "methysticin": "chemie",
  "piper-methysticum": "chemie",
  "piper-wichmannii": "chemie",
  "chalkon": "chemie",
  "extraktion": "chemie",
  "gaba": "wirkung",
  "reverse-tolerance": "wirkung",
  "anxiolyse": "wirkung",
  "krunk": "wirkung",
  "muskelentspannung": "wirkung",
  "euphorie": "wirkung",
  "sedierung": "wirkung",
  "neuroprotektiv": "wirkung",
  "analgesie": "wirkung",
  "kava-dermopathie": "wirkung",
  "noble-kava": "sorten",
  "tudei": "sorten",
  "heady": "sorten",
  "heavy": "sorten",
  "balanced": "sorten",
  "kultivar": "sorten",
  "waka": "sorten",
  "lewena": "sorten",
  "green-kava": "sorten",
  "awa": "sorten",
  "medium-grind": "zubereitung",
  "micronized": "zubereitung",
  "instant-kava": "zubereitung",
  "knetmethode": "zubereitung",
  "second-wash": "zubereitung",
  "strainer-bag": "zubereitung",
  "shell": "zubereitung",
  "aluball": "zubereitung",
  "grog": "kultur",
  "bilo": "kultur",
  "nakamal": "kultur",
  "tanoa": "kultur",
  "bula": "kultur",
  "flavokavain-b": "sicherheit",
  "cyp450": "sicherheit",
  "lebersicherheit": "sicherheit",
  "wechselwirkungen": "sicherheit",
  "dosierung": "sicherheit"
};

const categoryColors: Record<CategoryKey, string> = {
  chemie: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  wirkung: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  kultur: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  sorten: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  zubereitung: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  sicherheit: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
};

const chemotypeTable = [
  { num: "1", name: "Desmethoxyyangonin", abbr: "DMY", effect: "Stimmungsaufhellend" },
  { num: "2", name: "Dihydrokavain", abbr: "DHK", effect: "Muskelentspannend" },
  { num: "3", name: "Yangonin", abbr: "Y", effect: "CB1-Rezeptor-Bindung" },
  { num: "4", name: "Kavain", abbr: "K", effect: "Angstlösend, euphorisierend" },
  { num: "5", name: "Dihydromethysticin", abbr: "DHM", effect: "Stark sedierend" },
  { num: "6", name: "Methysticin", abbr: "M", effect: "Sedierend" }
];

export default function Glossar() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { t, isLoading } = useTranslations({
    namespaces: ['glossar'],
    lang
  });

  const [searchQuery, setSearchQuery] = useState("");

  const glossaryTerms: GlossaryTerm[] = useMemo(() => {
    if (isLoading) return [];
    
    const termsData = t('terms') as Record<string, GlossaryTermData> | undefined;
    if (!termsData) return [];

    return Object.entries(termsData).map(([id, data]) => {
      const processedLinks = Array.isArray(data.relatedLinks) 
        ? data.relatedLinks.filter(link => link && typeof link === 'object' && link.href).map(link => ({
            ...link,
            href: link.href.replace('/de/', `/${lang}/`)
          }))
        : undefined;
      
      return {
        id,
        ...data,
        category: termCategories[id] || "chemie",
        icon: termIcons[id] || <Beaker className="h-5 w-5" />,
        relatedLinks: processedLinks
      };
    });
  }, [t, isLoading, lang]);

  const toc = useMemo(() => {
    const tocData = t('toc') as Record<string, string> | undefined;
    if (!tocData) return [];
    
    return [
      { id: "uebersicht", title: tocData.uebersicht || "Overview", level: 1 },
      { id: "suche", title: tocData.suche || "Search", level: 1 },
      { id: "chemie", title: tocData.chemie || "Chemistry", level: 1 },
      { id: "wirkung", title: tocData.wirkung || "Effects", level: 1 },
      { id: "sorten", title: tocData.sorten || "Varieties", level: 1 },
      { id: "zubereitung", title: tocData.zubereitung || "Preparation", level: 1 },
      { id: "kultur", title: tocData.kultur || "Culture", level: 1 },
      { id: "sicherheit", title: tocData.sicherheit || "Safety", level: 1 },
    ];
  }, [t]);

  const categories = t('categories') as Record<CategoryKey, string> | undefined;
  const categoryOrder: CategoryKey[] = ["chemie", "wirkung", "sorten", "zubereitung", "kultur", "sicherheit"];

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    
    const query = searchQuery.toLowerCase();
    return glossaryTerms.filter(term => 
      term.term.toLowerCase().includes(query) ||
      (term.germanTerm && term.germanTerm.toLowerCase().includes(query)) ||
      term.shortDefinition.toLowerCase().includes(query) ||
      term.fullExplanation.toLowerCase().includes(query) ||
      (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(query)))
    );
  }, [searchQuery, glossaryTerms]);

  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      if (!acc[term.category]) acc[term.category] = [];
      acc[term.category].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);
  }, [filteredTerms]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">$1</mark>');
  };

  if (isLoading) {
    return (
      <WikiPageLayout
        title="..."
        subtitle="..."
        category="..."
        heroImage="/images/hero-science.jpg"
        toc={[]}
        breadcrumbs={[{ label: "Home", href: `/${lang}` }, { label: "..." }]}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </WikiPageLayout>
    );
  }

  const search = t('search') as { placeholder: string; noResults: string; clearSearch: string } | undefined;

  return (
    <WikiPageLayout
      title={t('meta.title') as string || "Glossar"}
      subtitle={t('meta.subtitle') as string || ""}
      category={t('meta.category') as string || "Glossar"}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      breadcrumbs={[
        { label: "Home", href: `/${lang}` },
        { label: t('meta.category') as string || "Glossar" }
      ]}
    >
      <section id="uebersicht">
        <h2>{toc[0]?.title}</h2>
        <p>{t('intro') as string}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className={`p-3 rounded-lg text-center font-medium transition-all hover:scale-105 ${categoryColors[cat]}`}
            >
              {categories?.[cat] || cat}
              <span className="block text-xs opacity-70 mt-1">
                {glossaryTerms.filter(t => t.category === cat).length}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="suche" className="mt-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-5 w-5 text-primary" />
              <h2 className="m-0 text-lg">{toc[1]?.title}</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={search?.placeholder || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-4 p-3 bg-background rounded-lg border">
                <p className="text-sm">
                  <strong>{filteredTerms.length}</strong> {filteredTerms.length === 1 ? 'result' : 'results'}
                </p>
                {filteredTerms.length > 0 && filteredTerms.length <= 10 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filteredTerms.map(term => (
                      <a
                        key={term.id}
                        href={`#${term.id}`}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {term.term}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {searchQuery && filteredTerms.length === 0 && (
        <div className="mt-8 text-center py-12 bg-muted/30 rounded-lg">
          <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium">{search?.noResults || "No results found"}</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 text-primary hover:underline"
          >
            {search?.clearSearch || "Clear search"}
          </button>
        </div>
      )}

      {categoryOrder.map((category) => {
        const termsInCategory = groupedTerms[category];
        if (!termsInCategory || termsInCategory.length === 0) return null;
        
        return (
          <section key={category} id={category} className="mt-12">
            <h2 className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[category]}`}>
                {categories?.[category] || category}
              </span>
              {searchQuery && (
                <span className="text-sm text-muted-foreground font-normal">
                  ({termsInCategory.length})
                </span>
              )}
            </h2>

            <div className="space-y-6 mt-6">
              {termsInCategory.map((term) => (
                <Card key={term.id} id={term.id} className="scroll-mt-24">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-primary/10 text-primary">
                        {term.icon}
                      </span>
                      <div>
                        <span 
                          className="text-xl"
                          dangerouslySetInnerHTML={{ 
                            __html: searchQuery ? highlightMatch(term.term || '', searchQuery) : term.term || ''
                          }}
                        />
                        {term.germanTerm && (
                          <span 
                            className="text-muted-foreground text-base ml-2"
                            dangerouslySetInnerHTML={{ 
                              __html: `(${searchQuery ? highlightMatch(term.germanTerm, searchQuery) : term.germanTerm})` 
                            }}
                          />
                        )}
                      </div>
                    </CardTitle>
                    <p 
                      className="text-muted-foreground mt-1 ml-12"
                      dangerouslySetInnerHTML={{ 
                        __html: searchQuery ? highlightMatch(term.shortDefinition || '', searchQuery) : term.shortDefinition || ''
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-sm max-w-none text-foreground"
                      dangerouslySetInnerHTML={{ 
                        __html: (searchQuery 
                          ? highlightMatch(term.fullExplanation || '', searchQuery) 
                          : term.fullExplanation || ''
                        ).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">
                          {(t('ui.relatedTerms') as string) || "Related"}: 
                        </span>
                        {term.relatedTerms.map((related, i) => {
                          const relatedTerm = glossaryTerms.find(t => 
                            t.term.toLowerCase() === related.toLowerCase() ||
                            t.id === related.toLowerCase()
                          );
                          return (
                            <span key={related}>
                              {relatedTerm ? (
                                <a 
                                  href={`#${relatedTerm.id}`}
                                  className="text-sm text-primary hover:underline"
                                >
                                  {related}
                                </a>
                              ) : (
                                <span className="text-sm">{related}</span>
                              )}
                              {i < term.relatedTerms!.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {term.relatedLinks && term.relatedLinks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {term.relatedLinks.map((link) => (
                          <Link key={link.href} href={link.href}>
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                              <BookOpen className="h-3 w-3" />
                              {link.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-12">
        <h2>Chemotype Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Kavalactone</th>
                <th>Abbr</th>
                <th>Effect</th>
              </tr>
            </thead>
            <tbody>
              {chemotypeTable.map(row => (
                <tr key={row.num}>
                  <td className="font-mono font-bold">{row.num}</td>
                  <td>{row.name}</td>
                  <td>{row.abbr}</td>
                  <td>{row.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary">{glossaryTerms.length}</div>
                <div className="text-sm text-muted-foreground">Terms</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary">{categoryOrder.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {glossaryTerms.reduce((acc, t) => acc + (t.relatedTerms?.length || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Links</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </WikiPageLayout>
  );
}
