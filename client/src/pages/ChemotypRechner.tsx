import { useState, useMemo } from "react";
import WikiPageLayout from "@/components/WikiPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";
import { 
  Calculator, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Brain,
  Zap,
  Moon,
  Heart,
  Shield,
  Sparkles
} from "lucide-react";

const kavalactoneIcons = {
  1: { color: "bg-yellow-500", icon: Sparkles },
  2: { color: "bg-purple-500", icon: Heart },
  3: { color: "bg-green-500", icon: Zap },
  4: { color: "bg-blue-500", icon: Brain },
  5: { color: "bg-red-500", icon: AlertTriangle },
  6: { color: "bg-indigo-500", icon: Moon },
};

type ChemotypeCategory = "heady" | "heavy" | "balanced" | "heady_balanced" | "tudei" | "unknown";

const knownVarieties: Record<string, { name: string; category: ChemotypeCategory }> = {
  "421365": { name: "Kelai", category: "heady" },
  "243516": { name: "Borogu", category: "heady_balanced" },
  "243156": { name: "Melo Melo", category: "balanced" },
  "423561": { name: "Bir Kar", category: "balanced" },
  "243651": { name: "Vula Waka", category: "balanced" },
  "423651": { name: "Palasa", category: "heavy" },
  "426531": { name: "Palarasul", category: "heavy" },
  "426315": { name: "Loa Waka", category: "heavy" },
  "426351": { name: "Hiwa", category: "heavy" },
  "246315": { name: "Moi", category: "heady" },
  "421356": { name: "Silese", category: "heady" },
  "526431": { name: "Isa", category: "tudei" },
};

interface AnalysisResult {
  isValid: boolean;
  isTudei: boolean;
  category: ChemotypeCategory;
  sortedLactones: number[];
  varietyName: string | null;
}

function analyzeChemotype(code: string): AnalysisResult {
  const digits = code.split("").map(Number);
  
  const isValid = digits.length === 6 && 
    digits.every(d => d >= 1 && d <= 6) &&
    new Set(digits).size === 6;

  if (!isValid) {
    return {
      isValid: false,
      isTudei: false,
      category: "unknown",
      sortedLactones: [],
      varietyName: null,
    };
  }

  const isTudei = digits[0] === 5 || digits[1] === 5;
  const knownVariety = knownVarieties[code];
  const varietyName = knownVariety?.name || null;
  
  let category: ChemotypeCategory = "unknown";

  if (knownVariety) {
    category = knownVariety.category;
  } else if (isTudei) {
    category = "tudei";
  } else if (digits[0] === 4 && digits[1] === 2) {
    category = "heady_balanced";
  } else if (digits[0] === 4) {
    category = "heady";
  } else if (digits[0] === 2 && digits[1] === 4) {
    category = "heady_balanced";
  } else if (digits[0] === 2) {
    category = "heavy";
  } else {
    category = "balanced";
  }

  return {
    isValid,
    isTudei,
    category,
    sortedLactones: digits,
    varietyName,
  };
}

export default function ChemotypRechner() {
  const [location] = useLocation();
  const pathLang = location.split('/')[1];
  const lang = (pathLang in languages ? pathLang : 'de') as Language;
  
  const { t, translations, isLoading } = useTranslations({ 
    namespaces: ['chemotypRechner'], 
    lang 
  });
  
  const data = translations.chemotypRechner || {};

  const [chemotype, setChemotype] = useState("");
  const [showResult, setShowResult] = useState(false);

  const analysis = useMemo(() => {
    if (chemotype.length === 6) {
      return analyzeChemotype(chemotype);
    }
    return null;
  }, [chemotype]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^1-6]/g, "").slice(0, 6);
    setChemotype(value);
    setShowResult(false);
  };

  const handleAnalyze = () => {
    if (chemotype.length === 6) {
      setShowResult(true);
    }
  };

  const handleExample = (code: string) => {
    setChemotype(code);
    setShowResult(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const toc = [
    { id: "rechner", title: t('toc.rechner'), level: 1 },
    { id: "anleitung", title: t('toc.anleitung'), level: 1 },
    { id: "beispiele", title: t('toc.beispiele'), level: 1 },
    { id: "legende", title: t('toc.legende'), level: 1 },
  ];

  const kavalactones = (data.kavalactones || {}) as Record<string, { name: string; short: string; effect: string; description: string }>;
  const categories = (data.categories || {}) as Record<string, { label: string; description: string }>;
  const warnings = (data.warnings || {}) as Record<string, string>;
  const strengths = (data.strengths || {}) as Record<string, string>;
  const effects = (data.effects || {}) as Record<string, string[]>;
  const recommendedUse = (data.recommendedUse || {}) as Record<string, string[]>;
  const anleitungRules = (data.anleitung?.rules || []) as Array<{ label: string; text: string }>;
  const beispieleExamples = (data.beispiele?.examples || []) as Array<{ code: string; name: string; description: string }>;

  const getAnalysisData = (result: AnalysisResult) => {
    const cat = result.category;
    const categoryData = categories[cat] || { label: "", description: "" };
    
    let warningsList: string[] = [];
    let strengthsList: string[] = [];
    let effectsList: string[] = [];
    let useList: string[] = [];

    if (cat === "tudei") {
      warningsList = [warnings.tudeiGeneral, warnings.tudeiSideEffects, warnings.tudeiNotRecommended];
      if (result.sortedLactones[0] === 5) warningsList.push(warnings.dhmPosition1);
      if (result.sortedLactones[1] === 5 && result.sortedLactones[0] !== 5) warningsList.push(warnings.dhmPosition2);
    } else if (cat === "heady") {
      strengthsList = [strengths.headyClear, strengths.headyMood, strengths.headyBeginner];
      effectsList = effects.headyEffects || [];
      useList = recommendedUse.headyUse || [];
    } else if (cat === "heady_balanced") {
      strengthsList = [strengths.headyBalancedBest, strengths.headyBalancedMental, strengths.headyBalancedBody];
      effectsList = effects.headyBalancedEffects || [];
      useList = recommendedUse.headyBalancedUse || [];
    } else if (cat === "heavy") {
      strengthsList = [strengths.heavyMuscle, strengths.heavyPain, strengths.heavyRelax];
      effectsList = effects.heavyEffects || [];
      useList = recommendedUse.heavyUse || [];
    } else if (cat === "balanced") {
      strengthsList = [strengths.balancedBoth, strengths.balancedVersatile, strengths.balancedDaily];
      effectsList = effects.balancedEffects || [];
      useList = recommendedUse.balancedUse || [];
    }

    if (result.sortedLactones[0] === 6 || result.sortedLactones[1] === 6) {
      strengthsList.push(strengths.methysticinNeuro);
    }
    if (result.sortedLactones[0] === 3 || result.sortedLactones[1] === 3) {
      strengthsList.push(strengths.yangoninStim);
    }
    if (result.sortedLactones[0] === 1 || result.sortedLactones[1] === 1) {
      strengthsList.push(strengths.dmyDopamine);
    }

    return { categoryData, warningsList, strengthsList, effectsList, useList };
  };

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={t('toc.title') as string}
      lang={lang}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.inhaltsstoffe'), href: `/${lang}/inhaltsstoffe` },
        { label: t('breadcrumbs.current') },
      ]}
    >
      <section id="rechner">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-0 mt-0">{t('rechner.title')}</h2>
              <p className="text-sm text-muted-foreground mb-0">{t('rechner.subtitle')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="text"
              value={chemotype}
              onChange={handleInputChange}
              placeholder={t('rechner.placeholder')}
              className="text-2xl font-mono text-center tracking-[0.5em] h-14 flex-1"
              maxLength={6}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={chemotype.length !== 6}
              className="h-14 px-8"
            >
              {t('rechner.analyzeButton')}
            </Button>
          </div>

          {chemotype.length > 0 && (
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex justify-center gap-2">
                {chemotype.split("").map((digit, index) => {
                  const num = parseInt(digit);
                  const iconData = kavalactoneIcons[num as keyof typeof kavalactoneIcons];
                  const lactoneData = kavalactones?.[String(num)];
                  return (
                    <div 
                      key={index}
                      className={`w-12 h-12 rounded-lg ${iconData?.color || "bg-muted"} text-white flex items-center justify-center font-mono font-bold text-lg shadow-sm`}
                      title={lactoneData?.name}
                    >
                      {digit}
                    </div>
                  );
                })}
                {Array.from({ length: 6 - chemotype.length }).map((_, index) => (
                  <div 
                    key={`empty-${index}`}
                    className="w-12 h-12 rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center font-mono text-muted-foreground"
                  >
                    ?
                  </div>
                ))}
              </div>
              {analysis?.varietyName && (
                <div className="text-center mt-2">
                  <span className="text-lg font-semibold text-primary">{analysis.varietyName}</span>
                  <span className="text-sm text-muted-foreground ml-2">({t('rechner.knownVariety')})</span>
                </div>
              )}
            </div>
          )}

          {showResult && analysis && (
            <div className="mt-8 space-y-6">
              {(() => {
                const { categoryData, warningsList, strengthsList, effectsList, useList } = getAnalysisData(analysis);
                return (
                  <>
                    <div className={`p-6 rounded-xl border-2 ${
                      analysis.category === "tudei" 
                        ? "bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800" 
                        : analysis.category === "heady"
                        ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800"
                        : analysis.category === "heady_balanced"
                        ? "bg-teal-50 dark:bg-teal-950/20 border-teal-300 dark:border-teal-800"
                        : analysis.category === "heavy"
                        ? "bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800"
                        : "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800"
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {analysis.category === "tudei" ? (
                          <XCircle className="h-8 w-8 text-red-600" />
                        ) : (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        )}
                        <Badge variant={analysis.category === "tudei" ? "destructive" : "default"} className="text-sm">
                          {categoryData.label}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{categoryData.description}</p>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-xl">
                      <h3 className="font-semibold mb-4">{t('result.kavalactoneOrder')}</h3>
                      <div className="space-y-3">
                        {analysis.sortedLactones.map((num, index) => {
                          const iconData = kavalactoneIcons[num as keyof typeof kavalactoneIcons];
                          const lactoneData = kavalactones?.[String(num)];
                          const Icon = iconData.icon;
                          return (
                            <div key={index} className="flex items-center gap-4 bg-background p-3 rounded-lg">
                              <span className="text-sm text-muted-foreground w-8">#{index + 1}</span>
                              <div className={`w-8 h-8 rounded-full ${iconData.color} text-white flex items-center justify-center font-mono font-bold text-sm`}>
                                {num}
                              </div>
                              <Icon className="h-5 w-5 text-muted-foreground" />
                              <div className="flex-1">
                                <span className="font-medium">{lactoneData?.name}</span>
                                <span className="text-muted-foreground text-sm ml-2">({lactoneData?.short})</span>
                              </div>
                              <span className="text-sm text-muted-foreground hidden sm:block">{lactoneData?.effect}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {warningsList.length > 0 && (
                      <Alert variant="destructive" className="border-red-300 dark:border-red-800">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <ul className="list-disc list-inside space-y-1 mt-2">
                            {warningsList.filter(Boolean).map((warning, index) => (
                              <li key={index}>{warning}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    {strengthsList.length > 0 && (
                      <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                        <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          {t('result.strengthsTitle')}
                        </h3>
                        <ul className="space-y-2">
                          {strengthsList.filter(Boolean).map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(effectsList.length > 0 || useList.length > 0) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {effectsList.length > 0 && (
                          <div className="bg-muted/30 p-5 rounded-xl">
                            <h4 className="font-semibold mb-3">{t('result.dominantEffects')}</h4>
                            <div className="flex flex-wrap gap-2">
                              {effectsList.map((effect, index) => (
                                <Badge key={index} variant="secondary">{effect}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {useList.length > 0 && (
                          <div className="bg-muted/30 p-5 rounded-xl">
                            <h4 className="font-semibold mb-3">{t('result.recommendedUseTitle')}</h4>
                            <div className="flex flex-wrap gap-2">
                              {useList.map((use, index) => (
                                <Badge key={index} variant="outline">{use}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      <section id="anleitung" className="mt-12">
        <h2>{t('anleitung.title')}</h2>
        <p>{t('anleitung.paragraph1')}</p>
        
        <div className="bg-muted/30 p-6 rounded-xl my-6">
          <h3 className="mt-0">{t('anleitung.rulesTitle')}</h3>
          <ul className="space-y-2">
            {Array.isArray(anleitungRules) && anleitungRules.map((rule, index) => (
              <li key={index}><strong>{rule.label}:</strong> {rule.text}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="beispiele" className="mt-12">
        <h2>{t('beispiele.title')}</h2>
        <p>{t('beispiele.intro')}</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {Array.isArray(beispieleExamples) && beispieleExamples.map((example, index) => {
            const colorClass = example.code.startsWith("5") || example.code[1] === "5" 
              ? "text-red-600" 
              : example.code.startsWith("4") 
              ? "text-blue-600" 
              : example.code.startsWith("2") 
              ? "text-purple-600" 
              : "text-green-600";
            return (
              <button 
                key={index}
                onClick={() => handleExample(example.code)}
                className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-left"
              >
                <div className={`font-mono text-2xl font-bold ${colorClass} mb-2`}>{example.code}</div>
                <div className="text-sm font-medium">{example.name}</div>
                <div className="text-xs text-muted-foreground">{example.description}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="legende" className="mt-12">
        <h2>{t('legende.title')}</h2>
        <p>{t('legende.intro')}</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {kavalactones && Object.entries(kavalactones).map(([num, lactone]) => {
            const iconData = kavalactoneIcons[parseInt(num) as keyof typeof kavalactoneIcons];
            const Icon = iconData?.icon || Info;
            return (
              <div key={num} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${iconData?.color || "bg-muted"} text-white flex items-center justify-center font-mono font-bold`}>
                    {num}
                  </div>
                  <div>
                    <div className="font-semibold">{lactone.short}</div>
                    <div className="text-xs text-muted-foreground">{lactone.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{lactone.effect}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 mb-0">{lactone.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Alert className="mt-8">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>{t('hint.title')}</strong> {t('hint.text')} <Link href={`/${lang}/inhaltsstoffe/chemotypen`} className="text-primary hover:underline">{t('hint.linkText')}</Link>.
        </AlertDescription>
      </Alert>
    </WikiPageLayout>
  );
}
