import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import WikiPageLayout from "@/components/WikiPageLayout";
import { Helmet } from "react-helmet";
import { Search, BookOpen, Filter, Download, ExternalLink, Book, ChevronDown, ChevronUp, FileText } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import studiesData from "@/data/studies.json";
import { useTranslations } from "@/hooks/useTranslations";

type Study = {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: string;
  summary: string;
  significance: string;
  url: string;
  type: string;
  category: string;
  featured?: boolean;
};

const ExpandableSummary = ({ text, showLess, readMore, noSummary }: { text: string; showLess: string; readMore: string; noSummary: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text && text.length > 250;

  if (!text) return <span className="italic opacity-50">{noSummary}</span>;

  return (
    <div className="text-muted-foreground leading-relaxed text-sm">
      <div 
        className={`transition-all duration-300 ${!isExpanded && shouldTruncate ? "line-clamp-3" : ""}`}
        dangerouslySetInnerHTML={{ __html: text }} 
      />
      {shouldTruncate && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto mt-1 text-primary font-medium"
        >
          {isExpanded ? (
            <span className="flex items-center gap-1">{showLess} <ChevronUp className="w-3 h-3" /></span>
          ) : (
            <span className="flex items-center gap-1">{readMore} <ChevronDown className="w-3 h-3" /></span>
          )}
        </Button>
      )}
    </div>
  );
};

export default function Studien() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['studien', 'studienContent'],
    lang: lang as any
  });
  
  const t = translations.studien || {};
  const meta = t.meta || {};
  const hero = t.hero || {};
  const featured = t.featured || {};
  const database = t.database || {};
  const noResults = t.noResults || {};
  const footer = t.footer || {};
  
  const studiesContent = translations.studienContent?.studies || {};
  
  const getStudySummary = (id: string, fallback: string) => {
    return studiesContent[id]?.summary || fallback;
  };
  
  const getStudySignificance = (id: string, fallback: string) => {
    return studiesContent[id]?.significance || fallback;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(studiesData.map(s => s.category).filter(Boolean));
    return Array.from(cats).sort();
  }, []);

  const years = useMemo(() => {
    const yrs = new Set(studiesData.map(s => s.year).filter(Boolean));
    return Array.from(yrs).sort().reverse();
  }, []);

  const filteredStudies = useMemo(() => {
    return studiesData.filter(study => {
      const matchesSearch = (
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = categoryFilter === "all" || study.category === categoryFilter;
      const matchesYear = yearFilter === "all" || study.year === yearFilter;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchTerm, categoryFilter, yearFilter]);

  const featuredBooks = studiesData.filter((s: Study) => s.featured);
  const scientificStudies = filteredStudies.filter(s => !s.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{meta.title || 'Wissenschaftliche Studien & Forschung | Kava Wiki'}</title>
        <meta name="description" content={meta.description || ''} />
      </Helmet>

      <section className="relative py-16 md:py-24 bg-muted/30 border-b border-border/50">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>{hero.badge || 'Wissensdatenbank'}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground">
                {hero.title || 'Wissenschaftliche'} <br/>
                <span className="text-primary">{hero.titleHighlight || 'Forschung'}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
                {hero.description || ''}
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                <CardContent className="p-6 grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">{studiesData.length}+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{hero.statsQuellen || 'Quellen'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">{years.length}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{hero.statsJahre || 'Jahre Forschung'}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl py-12 space-y-16">
        
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Book className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-3xl font-bold">{featured.title || 'Standardwerke & Empfehlungen'}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/3 bg-muted flex items-center justify-center p-6 min-h-[200px]">
                    <BookOpen className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <Badge className="mb-3 bg-primary text-primary-foreground hover:bg-primary/90">{featured.badge || 'Empfehlung'}</Badge>
                      <h3 className="font-serif text-xl font-bold mb-2 leading-tight">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{book.authors} • {book.year}</p>
                      <p className="text-sm leading-relaxed mb-4">{getStudySummary(book.id, book.summary)}</p>
                    </div>
                    {getStudySignificance(book.id, book.significance) && (
                      <div className="text-xs font-medium text-primary/80 bg-primary/5 p-3 rounded border border-primary/10">
                        <span className="font-bold block mb-1">{featured.significance || 'Bedeutung:'}</span>
                        {getStudySignificance(book.id, book.significance)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="database">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-border pb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-2">{database.title || 'Studien-Datenbank'}</h2>
              <p className="text-muted-foreground">{database.description || ''}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder={database.searchPlaceholder || 'Suchen...'} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={database.categoryPlaceholder || 'Kategorie'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{database.allCategories || 'Alle Kategorien'}</SelectItem>
                  {categories.map((cat: string) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder={database.yearPlaceholder || 'Jahr'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{database.allYears || 'Alle Jahre'}</SelectItem>
                  {years.map((year: string) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {scientificStudies.length > 0 ? (
              scientificStudies.map((study: Study) => (
                <Card key={study.id} className="hover:shadow-md transition-shadow border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="font-normal bg-muted/50">{study.category || database.general || 'Allgemein'}</Badge>
                          <span>•</span>
                          <span>{study.year}</span>
                          <span>•</span>
                          <span className="uppercase tracking-wide">{study.publication || database.publication || 'Publikation'}</span>
                        </div>
                        
                        <h3 className="font-serif text-xl font-bold mb-2 leading-tight text-foreground group-hover:text-primary transition-colors">
                          {study.url ? (
                            <a 
                              href={study.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:text-primary hover:underline decoration-2 underline-offset-2 flex items-start gap-2"
                            >
                              {study.title}
                              <ExternalLink className="w-4 h-4 mt-1 shrink-0 opacity-50" />
                            </a>
                          ) : (
                            study.title
                          )}
                        </h3>
                        
                        <div className="text-sm font-medium text-muted-foreground mb-4">
                          {study.authors}
                        </div>

                        <ExpandableSummary 
                          text={getStudySummary(study.id, study.summary)} 
                          showLess={database.showLess || 'Weniger anzeigen'}
                          readMore={database.readMore || 'Mehr lesen'}
                          noSummary={database.noSummary || 'Keine Zusammenfassung verfügbar'}
                        />
                      </div>

                      <div className="w-full md:w-64 shrink-0 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                        {getStudySignificance(study.id, study.significance) && (
                          <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">{database.significance || 'Bedeutung'}</span>
                            <p className="text-xs text-foreground/80 leading-relaxed">{getStudySignificance(study.id, study.significance)}</p>
                          </div>
                        )}
                        
                        <div className="mt-auto">
                          {study.url && study.url.includes('/documents/') ? (
                            <Button className="w-full gap-2" variant="outline" asChild>
                              <a href={study.url} download target="_blank" rel="noopener noreferrer">
                                <FileText className="w-4 h-4" />
                                {database.pdfDownload || 'PDF Herunterladen'}
                              </a>
                            </Button>
                          ) : study.url ? (
                            <Button className="w-full gap-2" variant="outline" asChild>
                              <a href={study.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                {database.toSource || 'Zur Quelle'}
                              </a>
                            </Button>
                          ) : (
                            <Button className="w-full gap-2" variant="ghost" disabled>
                              <Download className="w-4 h-4 opacity-50" />
                              {database.notAvailable || 'Nicht verfügbar'}
                            </Button>
                          )}
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">{noResults.title || 'Keine Studien gefunden'}</p>
                <p className="text-muted-foreground">{noResults.description || 'Versuchen Sie, Ihre Suche oder Filter anzupassen.'}</p>
                <Button 
                  variant="link" 
                  onClick={() => {setSearchTerm(""); setCategoryFilter("all"); setYearFilter("all");}}
                  className="mt-2"
                >
                  {noResults.resetFilters || 'Filter zurücksetzen'}
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {footer.showing || 'Zeige'} {scientificStudies.length} {footer.of || 'von'} {studiesData.length - featuredBooks.length} {footer.entries || 'Einträgen'}
          </div>
        </section>
      </div>
    </div>
  );
}
