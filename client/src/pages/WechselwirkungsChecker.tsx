import { useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
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
  BookOpen,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Layout is already provided by App.tsx
import drugsData from "@/data/drugs.json";

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

export default function WechselwirkungsChecker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState<SelectedDrug[]>([]);
  const [showResults, setShowResults] = useState(false);

  const categories = drugsData.categories as Category[];
  const riskLevels = drugsData.riskLevels as Record<string, RiskLevel>;

  // Build searchable drug list
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

  // Filter drugs based on search term
  const filteredDrugs = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return allDrugs
      .filter(d => 
        d.searchTerms.some(t => t.includes(term)) &&
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

  // Calculate overall risk
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
        {risk.label}
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

  return (
    <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/de/sicherheit" className="hover:text-primary transition-colors">Sicherheit</Link>
            <span>/</span>
            <Link href="/de/sicherheit/wechselwirkungen" className="hover:text-primary transition-colors">Wechselwirkungen</Link>
            <span>/</span>
            <span className="text-foreground">Interaktions-Checker</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Wechselwirkungs-Checker
              </h1>
              <p className="text-muted-foreground mt-1">
                Prüfen Sie potenzielle Interaktionen zwischen Ihren Medikamenten und Kava
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <Card className="mb-8 border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    Wichtiger Hinweis
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    Dieser Checker dient nur zur Information und ersetzt keine ärztliche Beratung. 
                    Bei Unsicherheiten oder wenn Sie verschreibungspflichtige Medikamente einnehmen, 
                    konsultieren Sie immer einen Arzt oder Apotheker.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!showResults ? (
            <>
              {/* Search Section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-primary" />
                    Medikamente eingeben
                  </CardTitle>
                  <CardDescription>
                    Geben Sie die Namen Ihrer Medikamente ein (Wirkstoff oder Handelsname)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="z.B. Diazepam, Ibuprofen, Sertralin..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                    
                    {/* Search Results Dropdown */}
                    {filteredDrugs.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                        {filteredDrugs.map((item, index) => (
                          <button
                            key={`${item.drug.name}-${index}`}
                            onClick={() => addDrug(item.drug, item.category)}
                            className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between border-b border-border last:border-b-0"
                          >
                            <div>
                              <span className="font-medium">{item.drug.name}</span>
                              <span className="text-muted-foreground text-sm ml-2">
                                ({item.category.name})
                              </span>
                            </div>
                            <Plus className="w-4 h-4 text-primary" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Drugs */}
                  {selectedDrugs.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Ausgewählte Medikamente:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrugs.map((item) => (
                          <div
                            key={item.drug.name}
                            className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg"
                          >
                            <Pill className="w-4 h-4 text-primary" />
                            <span className="font-medium">{item.drug.name}</span>
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

              {/* Check Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={checkInteractions}
                  disabled={selectedDrugs.length === 0}
                  className="px-8"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Wechselwirkungen prüfen
                </Button>
              </div>

              {/* Common Categories */}
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Häufige Medikamentengruppen</h2>
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
                          <span className="font-medium">{category.name}</span>
                          {getRiskBadge(category.riskLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.drugs.slice(0, 3).map(d => d.name).join(", ")}
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
              {/* Results Section */}
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
                      Gesamtbewertung
                    </CardTitle>
                    {overallRisk && getRiskBadge(overallRisk)}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {overallRisk && riskLevels[overallRisk]?.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Individual Results */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-bold">Detaillierte Analyse</h2>
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
                          {item.drug.name}
                        </CardTitle>
                        {getRiskBadge(item.category.riskLevel)}
                      </div>
                      <CardDescription>
                        Kategorie: {item.category.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Mechanismus</h4>
                        <p>{item.category.mechanism}</p>
                      </div>
                      
                      {item.category.cypEnzymes.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">Betroffene CYP-Enzyme</h4>
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
                          Empfehlung
                        </h4>
                        <p className="text-sm">{item.category.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetChecker}>
                  <X className="w-4 h-4 mr-2" />
                  Neue Prüfung
                </Button>
                <Button asChild>
                  <Link href="/de/sicherheit/wechselwirkungen">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Mehr über Wechselwirkungen
                  </Link>
                </Button>
              </div>

              {/* Additional Resources */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="w-5 h-5 text-primary" />
                    Weitere Informationen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/de/sicherheit/leber" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Lebersicherheit & Hepatotoxizität</span>
                    </Link>
                    <Link href="/de/sicherheit/kontraindikationen" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Kontraindikationen</span>
                    </Link>
                    <Link href="/de/sicherheit" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Sicherheit & Gesundheit Übersicht</span>
                    </Link>
                    <Link href="/de/studien" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>Wissenschaftliche Studien</span>
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
