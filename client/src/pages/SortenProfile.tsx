import WikiPageLayout from "@/components/WikiPageLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link, useLocation } from "wouter";
import { ArrowRight, MapPin, Beaker, Clock, Star, Zap, Moon, Sun, Coffee, Filter, X, Sparkles, Heart, BedDouble } from "lucide-react";
import { useState, useMemo } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import FavoritesPanel from "@/components/FavoritesPanel";
import { useTranslations } from "@/hooks/useTranslations";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/\/de\//g, `/${lang}/`);
}

interface Variety {
  id: string;
  name: string;
  origin: string;
  chemotype: string;
  duration: string;
  strength: number;
  description: string;
  recommended: string[];
  badge?: string;
  category: "heady" | "balanced" | "heavy";
  effects: {
    euphoria: number;
    relaxation: number;
    sleepy: number;
  };
}

export default function SortenProfile() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['sortenProfile'],
    lang: lang as any
  });

  const [filterActive, setFilterActive] = useState(false);
  const [minEuphoria, setMinEuphoria] = useState(1);
  const [minRelaxation, setMinRelaxation] = useState(1);
  const [minSleepy, setMinSleepy] = useState(1);

  if (isLoading || !translations.sortenProfile) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.sortenProfile;
  const allVarieties: Variety[] = t.varieties;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.sorten, href: `/${lang}/sorten` },
    { label: t.breadcrumbs.current },
  ];

  const filteredVarieties = filterActive 
    ? allVarieties.filter(
        (v) =>
          v.effects.euphoria >= minEuphoria &&
          v.effects.relaxation >= minRelaxation &&
          v.effects.sleepy >= minSleepy
      )
    : allVarieties;

  const headyVarieties = filteredVarieties.filter((s) => s.category === "heady");
  const balancedVarieties = filteredVarieties.filter((s) => s.category === "balanced");
  const heavyVarieties = filteredVarieties.filter((s) => s.category === "heavy");

  const resetFilters = () => {
    setMinEuphoria(1);
    setMinRelaxation(1);
    setMinSleepy(1);
    setFilterActive(false);
  };

  const renderStrength = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= level ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderEffectBars = (effects: Variety["effects"]) => {
    return (
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1 text-xs">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full" 
              style={{ width: `${effects.euphoria * 20}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Heart className="h-3 w-3 text-blue-500" />
          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${effects.relaxation * 20}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <BedDouble className="h-3 w-3 text-purple-500" />
          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${effects.sleepy * 20}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderVarietyCard = (variety: Variety, categoryColor: string, defaultBadge: string) => (
    <Card key={variety.id} id={variety.id} className="scroll-mt-24">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="m-0 text-lg">{variety.name.replace(" (Balanced)", "")}</h3>
              <Badge variant="outline" className={categoryColor}>{variety.badge || defaultBadge}</Badge>
              <FavoriteButton strainId={variety.id} strainName={variety.name.replace(" (Balanced)", "")} variant="small" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{variety.description}</p>
            {renderEffectBars(variety.effects)}
            <div className="flex flex-wrap gap-2 mt-3">
              {variety.recommended.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1">{t.ui.origin}</div>
              <div className="font-medium">{variety.origin}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">{t.ui.chemotype}</div>
              <div className="font-medium font-mono">{variety.chemotype}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">{t.ui.duration}</div>
              <div className="font-medium">{variety.duration}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">{t.ui.strength}</div>
              {renderStrength(variety.strength)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getTypeBadge = (type: string) => {
    if (type === "Heady" || type.includes("Heady")) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600 text-xs">{type}</Badge>;
    } else if (type === "Heavy") {
      return <Badge variant="outline" className="border-purple-500 text-purple-600 text-xs">{type}</Badge>;
    } else {
      return <Badge variant="secondary" className="text-xs">{type}</Badge>;
    }
  };

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-home.jpg"
      toc={t.toc.items}
      tocTitle={t.toc.title}
      breadcrumbs={breadcrumbs}
    >
      <section id="uebersicht">
        <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: replaceLinks(t.overview.intro, lang) }} />
        
        <div className="grid md:grid-cols-3 gap-4 my-8">
          {t.overview.categories.map((cat: any) => (
            <Card key={cat.name} className={`border-l-4 border-l-${cat.color}-500`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {cat.color === "yellow" && <Sun className="h-5 w-5 text-yellow-500" />}
                  {cat.color === "blue" && <Coffee className="h-5 w-5 text-blue-500" />}
                  {cat.color === "purple" && <Moon className="h-5 w-5 text-purple-500" />}
                  <strong>{cat.name}</strong>
                </div>
                <p className="text-sm m-0">{cat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="favoriten" className="mt-8">
        <FavoritesPanel compact />
      </section>

      <section id="filter" className="mt-12">
        <Card className="bg-muted/30 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="m-0 text-lg">{t.filter.title}</h2>
              </div>
              {filterActive && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                  <X className="h-4 w-4 mr-1" />
                  {t.ui.resetFilters}
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">{t.filter.description}</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{t.filter.euphoria}</span>
                  <Badge variant="outline" className="ml-auto">{minEuphoria}+</Badge>
                </div>
                <Slider
                  value={[minEuphoria]}
                  onValueChange={(value) => {
                    setMinEuphoria(value[0]);
                    setFilterActive(true);
                  }}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t.ui.low}</span>
                  <span>{t.ui.high}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{t.filter.relaxation}</span>
                  <Badge variant="outline" className="ml-auto">{minRelaxation}+</Badge>
                </div>
                <Slider
                  value={[minRelaxation]}
                  onValueChange={(value) => {
                    setMinRelaxation(value[0]);
                    setFilterActive(true);
                  }}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t.ui.low}</span>
                  <span>{t.ui.high}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BedDouble className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{t.filter.sleepy}</span>
                  <Badge variant="outline" className="ml-auto">{minSleepy}+</Badge>
                </div>
                <Slider
                  value={[minSleepy]}
                  onValueChange={(value) => {
                    setMinSleepy(value[0]);
                    setFilterActive(true);
                  }}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t.ui.low}</span>
                  <span>{t.ui.high}</span>
                </div>
              </div>
            </div>

            {filterActive && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>{filteredVarieties.length}</strong> {t.ui.matchingCriteria.replace("{total}", allVarieties.length.toString())}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section id="heady" className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <Sun className="h-6 w-6 text-yellow-500" />
          <h2 className="m-0">{t.sections.heady.title}</h2>
          {filterActive && <Badge variant="secondary">{headyVarieties.length} {t.ui.hits}</Badge>}
        </div>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.sections.heady.description, lang) }} />

        {headyVarieties.length > 0 ? (
          <div className="space-y-4 mt-6">
            {headyVarieties.map((variety) => renderVarietyCard(variety, "border-yellow-500 text-yellow-600", "Heady"))}
          </div>
        ) : (
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6 text-center text-muted-foreground">
              {t.ui.noMatching.replace("{category}", "Heady")}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="balanced" className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <Coffee className="h-6 w-6 text-blue-500" />
          <h2 className="m-0">{t.sections.balanced.title}</h2>
          {filterActive && <Badge variant="secondary">{balancedVarieties.length} {t.ui.hits}</Badge>}
        </div>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.sections.balanced.description, lang) }} />

        {balancedVarieties.length > 0 ? (
          <div className="space-y-4 mt-6">
            {balancedVarieties.map((variety) => renderVarietyCard(variety, "border-blue-500 text-blue-600", "Balanced"))}
          </div>
        ) : (
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6 text-center text-muted-foreground">
              {t.ui.noMatching.replace("{category}", "Balanced")}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="heavy" className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="h-6 w-6 text-purple-500" />
          <h2 className="m-0">{t.sections.heavy.title}</h2>
          {filterActive && <Badge variant="secondary">{heavyVarieties.length} {t.ui.hits}</Badge>}
        </div>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.sections.heavy.description, lang) }} />

        {heavyVarieties.length > 0 ? (
          <div className="space-y-4 mt-6">
            {heavyVarieties.map((variety) => renderVarietyCard(variety, "border-purple-500 text-purple-600", "Heavy"))}
          </div>
        ) : (
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6 text-center text-muted-foreground">
              {t.ui.noMatching.replace("{category}", "Heavy")}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="vergleich" className="mt-12">
        <h2>{t.comparison.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.comparison.description, lang) }} />

        <div className="overflow-x-auto my-8">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">{t.ui.variety}</th>
                <th className="text-left">{t.ui.region}</th>
                <th className="text-left">{t.ui.type}</th>
                <th className="text-left">{t.ui.chemotype}</th>
                <th className="text-left">{t.ui.bestUse}</th>
              </tr>
            </thead>
            <tbody>
              {t.comparisonTable.map((row: any) => (
                <tr key={row.name}>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.region}</td>
                  <td>{getTypeBadge(row.type)}</td>
                  <td className="font-mono">{row.chemotype}</td>
                  <td>{row.bestUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <Link href={replaceLinks(t.comparison.link, lang)}>
            <Button variant="outline" className="gap-2">
              {t.ui.toComparison}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </WikiPageLayout>
  );
}
