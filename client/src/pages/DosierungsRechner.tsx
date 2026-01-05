import { useState, useMemo } from "react";
import WikiPageLayout from "@/components/WikiPageLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { 
  Calculator,
  Scale,
  User,
  Beaker,
  AlertTriangle,
  Info,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Droplets,
  Clock
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import strainsData from "@/data/strains.json";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/\/de\//g, `/${lang}/`);
}

export default function DosierungsRechner() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['dosierungsRechner'],
    lang: lang as any
  });

  const [selectedStrain, setSelectedStrain] = useState<string>("");
  const [experience, setExperience] = useState<"beginner" | "regular" | "experienced">("regular");
  const [method, setMethod] = useState<"traditional" | "blender" | "instant">("traditional");
  const [bodyWeight, setBodyWeight] = useState<number>(70);
  const [showResults, setShowResults] = useState(false);

  const strains = strainsData.strains;

  const selectedStrainData = useMemo(() => {
    return strains.find(s => s.id === selectedStrain);
  }, [selectedStrain, strains]);

  const calculateDosage = useMemo(() => {
    if (!selectedStrainData) return null;

    const baseDosage = {
      beginner: { min: 15, max: 20 },
      regular: { min: 25, max: 35 },
      experienced: { min: 35, max: 50 }
    };

    const potencyModifier = selectedStrainData.strength / 3;
    const weightModifier = bodyWeight / 70;
    const methodModifier = {
      traditional: 1,
      blender: 0.9,
      instant: 0.4
    };

    const base = baseDosage[experience];
    const modifier = potencyModifier * weightModifier * methodModifier[method];

    let minDose = Math.round(base.min / modifier);
    let maxDose = Math.round(base.max / modifier);

    if (method === "instant") {
      minDose = Math.max(2, minDose);
      maxDose = Math.max(4, maxDose);
    } else {
      minDose = Math.max(10, minDose);
      maxDose = Math.max(15, maxDose);
    }

    const waterMin = method === "instant" ? 200 : Math.round(minDose * 15);
    const waterMax = method === "instant" ? 300 : Math.round(maxDose * 15);

    const klMin = Math.round(minDose * 0.03 * 1000);
    const klMax = Math.round(maxDose * 0.06 * 1000);

    return {
      powder: { min: minDose, max: maxDose },
      water: { min: waterMin, max: waterMax },
      kavalactones: { min: klMin, max: klMax },
      prepTime: method === "traditional" ? "20-25" : method === "blender" ? "8-10" : "1"
    };
  }, [selectedStrainData, experience, bodyWeight, method]);

  const handleCalculate = () => {
    if (selectedStrain) {
      setShowResults(true);
    }
  };

  if (isLoading || !translations.dosierungsRechner) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.dosierungsRechner;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.zubereitung, href: `/${lang}/zubereitung` },
    { label: t.breadcrumbs.current },
  ];

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-roots.jpg"
      toc={t.toc.items}
      tocTitle={t.toc.title}
      breadcrumbs={breadcrumbs}
    >
      <section id="rechner">
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              {t.meta.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Beaker className="h-4 w-4 inline mr-2" />
                {t.ui.selectStrain}
              </label>
              <select
                value={selectedStrain}
                onChange={(e) => {
                  setSelectedStrain(e.target.value);
                  setShowResults(false);
                }}
                className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">{t.ui.selectStrainPlaceholder}</option>
                {strains.map((strain) => (
                  <option key={strain.id} value={strain.id}>
                    {strain.name} ({strain.category}) - {t.ui.potency}: {"★".repeat(strain.strength)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <User className="h-4 w-4 inline mr-2" />
                {t.ui.experienceLevel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["beginner", "regular", "experienced"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setExperience(level);
                      setShowResults(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      experience === level
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{t.ui.experienceLevels[level].label}</div>
                    <div className="text-xs text-muted-foreground">{t.ui.experienceLevels[level].desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Beaker className="h-4 w-4 inline mr-2" />
                {t.ui.prepMethod}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["traditional", "blender", "instant"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMethod(m);
                      setShowResults(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      method === m
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{t.ui.methods[m].label}</div>
                    <div className="text-xs text-muted-foreground">{t.ui.methods[m].desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Scale className="h-4 w-4 inline mr-2" />
                {t.ui.bodyWeight}: {bodyWeight} {t.ui.kg}
              </label>
              <input
                type="range"
                min="40"
                max="150"
                value={bodyWeight}
                onChange={(e) => {
                  setBodyWeight(parseInt(e.target.value));
                  setShowResults(false);
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>40 {t.ui.kg}</span>
                <span>150 {t.ui.kg}</span>
              </div>
            </div>

            <Button 
              onClick={handleCalculate}
              disabled={!selectedStrain}
              className="w-full"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              {t.ui.calculate}
            </Button>
          </CardContent>
        </Card>
      </section>

      {showResults && calculateDosage && selectedStrainData && (
        <section id="ergebnis" className="mt-8">
          <h2>{t.results.title}</h2>
          
          <Card className="mt-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary">{selectedStrainData.name}</h3>
                <p className="text-muted-foreground">{selectedStrainData.origin}</p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < selectedStrainData.strength ? "text-amber-500" : "text-muted"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Scale className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">
                      {calculateDosage.powder.min}-{calculateDosage.powder.max}g
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method === "instant" ? t.ui.instantPowder : t.ui.mediumGrind}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">
                      {calculateDosage.water.min}-{calculateDosage.water.max}ml
                    </div>
                    <div className="text-sm text-muted-foreground">{t.ui.water}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Beaker className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">
                      {calculateDosage.kavalactones.min}-{calculateDosage.kavalactones.max}mg
                    </div>
                    <div className="text-sm text-muted-foreground">{t.ui.kavalactones}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                    <div className="text-2xl font-bold">
                      {calculateDosage.prepTime} {t.ui.min}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.ui.prepTime}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 text-center">
                <Link href={`/${lang}/zubereitung/${method === "traditional" ? "traditionell" : method}`}>
                  <Button variant="outline">
                    {t.ui.toPrepGuide}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  {t.results.bestTime.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedStrainData.category === "Heady" 
                    ? t.results.bestTime.heady
                    : selectedStrainData.category === "Heavy"
                    ? t.results.bestTime.heavy
                    : t.results.bestTime.balanced}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  {t.results.tip.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.strainNotes?.[selectedStrainData.id] || t.results.tip.default}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section id="hinweise" className="mt-12">
        <h2>{t.notes.title}</h2>
        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-700">{t.notes.safety.title}</AlertTitle>
          <AlertDescription className="text-amber-700">
            <ul className="mt-2 space-y-1">
              {t.notes.safety.items.map((item: string, idx: number) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        <Alert className="mt-4 bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">{t.notes.about.title}</AlertTitle>
          <AlertDescription className="text-blue-700">
            <span dangerouslySetInnerHTML={{ __html: t.notes.about.text }} />
          </AlertDescription>
        </Alert>
      </section>

      <section id="faktoren" className="mt-12">
        <h2>{t.factors.title}</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {t.factors.items.map((factor: any, idx: number) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{factor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{factor.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">{t.navigation.title}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={replaceLinks(t.navigation.traditional.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.traditional.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.traditional.time}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
          <Link href={replaceLinks(t.navigation.blender.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.blender.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.blender.time}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
          <Link href={replaceLinks(t.navigation.instant.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.instant.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.instant.time}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </WikiPageLayout>
  );
}
