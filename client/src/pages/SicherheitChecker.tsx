import { useState, useMemo, useCallback } from "react";
import { Link, useParams } from "wouter";
import { 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X, 
  Plus,
  Shield,
  Pill,
  ArrowRight,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import drugsData from "@/data/drugs.json";
import { useTranslations } from "@/hooks/useTranslations";
import { Language, defaultLanguage } from "@/lib/i18n";

interface Drug {
  name: string;
  nameEn: string;
  aliases: string[];
}

interface Category {
  id: string;
  name: string;
  nameEn: string;
  riskLevel: string;
  mechanism: string;
  mechanismEn: string;
  cypEnzymes: string[];
  recommendation: string;
  recommendationEn: string;
  drugs: Drug[];
}

interface SelectedDrug {
  drug: Drug;
  category: Category;
}

interface RiskLevel {
  label: string;
  labelEn: string;
  color: string;
  textColor: string;
  description: string;
  descriptionEn: string;
}

export default function SicherheitChecker() {
  const { lang = "de" } = useParams<{ lang: string }>();
  const isGerman = lang === "de";
  const { translations, isLoading } = useTranslations({ 
    namespaces: ["sicherheitChecker"], 
    lang: (lang as Language) || defaultLanguage 
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState<SelectedDrug[]>([]);
  const [showResults, setShowResults] = useState(false);

  const categories = drugsData.categories as Category[];
  const riskLevels = drugsData.riskLevels as Record<string, RiskLevel>;

  const t = translations?.sicherheitChecker;

  const allDrugs = useMemo(() => {
    const drugs: { drug: Drug; category: Category; searchTerms: string[] }[] = [];
    categories.forEach(category => {
      category.drugs.forEach(drug => {
        drugs.push({
          drug,
          category,
          searchTerms: [
            drug.name.toLowerCase(),
            drug.nameEn.toLowerCase(),
            ...drug.aliases.map(a => a.toLowerCase())
          ]
        });
      });
    });
    return drugs;
  }, [categories]);

  const filteredDrugs = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return allDrugs
      .filter(d => 
        d.searchTerms.some(st => st.includes(term)) &&
        !selectedDrugs.some(s => s.drug.name === d.drug.name)
      )
      .slice(0, 8);
  }, [searchTerm, allDrugs, selectedDrugs]);

  const addDrug = useCallback((drug: Drug, category: Category) => {
    if (!selectedDrugs.some(s => s.drug.name === drug.name)) {
      setSelectedDrugs(prev => [...prev, { drug, category }]);
    }
    setSearchTerm("");
  }, [selectedDrugs]);

  const removeDrug = useCallback((drugName: string) => {
    setSelectedDrugs(prev => prev.filter(s => s.drug.name !== drugName));
  }, []);

  const checkInteractions = useCallback(() => {
    setShowResults(true);
  }, []);

  const resetChecker = useCallback(() => {
    setSelectedDrugs([]);
    setShowResults(false);
    setSearchTerm("");
  }, []);

  const overallRisk = useMemo(() => {
    if (selectedDrugs.length === 0) return null;
    const riskOrder = ["very_high", "high", "moderate", "low", "none"];
    let highestRisk = "none";
    selectedDrugs.forEach(s => {
      const currentIndex = riskOrder.indexOf(s.category.riskLevel);
      const highestIndex = riskOrder.indexOf(highestRisk);
      if (currentIndex < highestIndex) {
        highestRisk = s.category.riskLevel;
      }
    });
    return highestRisk;
  }, [selectedDrugs]);

  const getRiskBadge = (riskLevel: string) => {
    const risk = riskLevels[riskLevel];
    if (!risk) return null;
    return (
      <span className={`inline-block px-3 py-1 ${risk.color} ${risk.textColor} rounded-full text-sm font-bold whitespace-nowrap`}>
        {isGerman ? risk.label : risk.labelEn}
      </span>
    );
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "very_high":
      case "high":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case "moderate":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "low":
        return <Info className="w-5 h-5 text-primary" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!t?.ui || !t?.meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading content</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href={`/${lang}/sicherheit`} className="hover:text-primary transition-colors">
              {t.meta.breadcrumbs.sicherheit}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/sicherheit/wechselwirkungen`} className="hover:text-primary transition-colors">
              {t.meta.breadcrumbs.wechselwirkungen}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t.meta.breadcrumbs.current}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.meta.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t.meta.subtitle}
              </p>
            </div>
          </div>

          <Card className="mb-8 border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    {t.ui.disclaimerTitle}
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    {t.ui.disclaimerText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!showResults ? (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-primary" />
                    {t.ui.inputTitle}
                  </CardTitle>
                  <CardDescription>
                    {t.ui.inputDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t.ui.placeholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                    
                    {filteredDrugs.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                        {filteredDrugs.map((item, index) => (
                          <button
                            key={`${item.drug.name}-${index}`}
                            onClick={() => addDrug(item.drug, item.category)}
                            className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between border-b border-border last:border-b-0"
                          >
                            <div>
                              <span className="font-medium">{isGerman ? item.drug.name : item.drug.nameEn}</span>
                              <span className="text-muted-foreground text-sm ml-2">
                                ({isGerman ? item.category.name : item.category.nameEn})
                              </span>
                            </div>
                            <Plus className="w-4 h-4 text-primary" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedDrugs.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">{t.ui.selectedMeds}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrugs.map((item) => (
                          <div
                            key={item.drug.name}
                            className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg"
                          >
                            <Pill className="w-4 h-4 text-primary" />
                            <span className="font-medium">{isGerman ? item.drug.name : item.drug.nameEn}</span>
                            <button
                              onClick={() => removeDrug(item.drug.name)}
                              className="ml-1 p-0.5 hover:bg-background rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={checkInteractions}
                  disabled={selectedDrugs.length === 0}
                  className="px-8"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t.ui.checkButton}
                </Button>
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">{t.ui.commonCategories}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.slice(0, 9).map((category) => (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => {
                        if (category.drugs.length > 0) {
                          addDrug(category.drugs[0], category);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{isGerman ? category.name : category.nameEn}</span>
                          {getRiskBadge(category.riskLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.drugs.slice(0, 3).map(d => isGerman ? d.name : d.nameEn).join(", ")}
                          {category.drugs.length > 3 && "..."}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <Card className={`mb-6 ${
                overallRisk === "very_high" || overallRisk === "high" 
                  ? "border-destructive/50 bg-destructive/5" 
                  : overallRisk === "moderate"
                    ? "border-amber-500/50 bg-amber-500/5"
                    : "border-green-500/50 bg-green-500/5"
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {getRiskIcon(overallRisk || "none")}
                      {t.ui.overallAssessment}
                    </CardTitle>
                    {overallRisk && getRiskBadge(overallRisk)}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {overallRisk && t.riskLevels?.[overallRisk]?.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-bold">{t.ui.detailedAnalysis}</h2>
                {selectedDrugs.map((item) => (
                  <Card key={item.drug.name} className="overflow-hidden">
                    <CardHeader className={`${
                      item.category.riskLevel === "very_high" || item.category.riskLevel === "high"
                        ? "bg-destructive/10"
                        : item.category.riskLevel === "moderate"
                          ? "bg-amber-500/10"
                          : "bg-green-500/10"
                    }`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Pill className="w-5 h-5" />
                          {isGerman ? item.drug.name : item.drug.nameEn}
                        </CardTitle>
                        {getRiskBadge(item.category.riskLevel)}
                      </div>
                      <CardDescription>
                        {t.ui.category}: {isGerman ? item.category.name : item.category.nameEn}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">{t.ui.mechanism}</h4>
                        <p>{isGerman ? item.category.mechanism : item.category.mechanismEn}</p>
                      </div>
                      
                      {item.category.cypEnzymes.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">{t.ui.affectedEnzymes}</h4>
                          <div className="flex gap-2">
                            {item.category.cypEnzymes.map(enzyme => (
                              <span key={enzyme} className="px-2 py-1 bg-muted rounded text-sm font-mono">
                                {enzyme}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${
                        item.category.riskLevel === "very_high" || item.category.riskLevel === "high"
                          ? "bg-destructive/10 border border-destructive/20"
                          : item.category.riskLevel === "moderate"
                            ? "bg-amber-500/10 border border-amber-500/20"
                            : "bg-green-500/10 border border-green-500/20"
                      }`}>
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                          {getRiskIcon(item.category.riskLevel)}
                          {t.ui.recommendation}
                        </h4>
                        <p className="text-sm">{isGerman ? item.category.recommendation : item.category.recommendationEn}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetChecker}>
                  <X className="w-4 h-4 mr-2" />
                  {t.ui.newCheck}
                </Button>
                <Button asChild>
                  <Link href={`/${lang}/sicherheit/wechselwirkungen`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    {t.ui.moreAbout}
                  </Link>
                </Button>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="w-5 h-5 text-primary" />
                    {t.ui.moreInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href={`/${lang}/sicherheit/leber`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{t.ui.liverSafety}</span>
                    </Link>
                    <Link href={`/${lang}/sicherheit/kontraindikationen`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{t.ui.contraindications}</span>
                    </Link>
                    <Link href={`/${lang}/sicherheit`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{t.ui.safetyOverview}</span>
                    </Link>
                    <Link href={`/${lang}/studien`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{t.ui.studies}</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
  );
}
