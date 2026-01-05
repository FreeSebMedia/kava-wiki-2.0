import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { 
  ArrowLeftRight, 
  MapPin, 
  Beaker, 
  Clock, 
  Star, 
  Zap, 
  Moon, 
  Sun, 
  Coffee,
  Scale,
  Target,
  AlertCircle,
  ChevronDown,
  Check,
  X,
  Info,
  ExternalLink
} from "lucide-react";
import strainsData from "@/data/strains.json";
import { useTranslations } from "@/hooks/useTranslations";

interface Strain {
  id: string;
  name: string;
  origin: string;
  originCountry: string;
  chemotype: string;
  category: string;
  categoryLabel: string;
  strength: number;
  duration: string;
  description: string;
  effects: {
    euphoria: number;
    relaxation: number;
    sedation: number;
    clarity: number;
    sociability: number;
    anxiolysis: number;
  };
  effectsDescription: string;
  dosage: {
    beginner: string;
    regular: string;
    experienced: string;
  };
  applications: string[];
  usageTimes: string[];
  bestFor: string;
  availability: string;
  price: string;
  kavalactones: {
    kavain: string;
    dhk: string;
    methysticin: string;
    dhm: string;
    yangonin: string;
    desmethoxyyangonin: string;
  };
  notes: string;
}

const strains: Strain[] = strainsData.strains as Strain[];

export default function SortenVergleich() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['sortenVergleich'],
    lang: lang as any
  });

  const [strain1Id, setStrain1Id] = useState<string>("");
  const [strain2Id, setStrain2Id] = useState<string>("");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  const strain1 = useMemo(() => strains.find(s => s.id === strain1Id), [strain1Id]);
  const strain2 = useMemo(() => strains.find(s => s.id === strain2Id), [strain2Id]);

  if (isLoading || !translations.sortenVergleich) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.sortenVergleich;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.sorten, href: `/${lang}/sorten` },
    { label: t.breadcrumbs.current },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "heady":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "balanced":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "heavy":
        return "bg-purple-100 text-purple-800 border-purple-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const renderStars = (level: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= level ? "fill-primary text-primary" : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderEffectBar = (value: number, color: string = "bg-primary") => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${color} rounded-full transition-all duration-300`}
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium w-4 text-right">{value}</span>
      </div>
    );
  };

  const getEffectComparison = (effect1: number, effect2: number) => {
    if (effect1 > effect2) return { winner: 1, diff: effect1 - effect2 };
    if (effect2 > effect1) return { winner: 2, diff: effect2 - effect1 };
    return { winner: 0, diff: 0 };
  };

  const StrainSelector = ({ 
    value, 
    onChange, 
    isOpen, 
    setIsOpen, 
    otherValue,
    label 
  }: { 
    value: string; 
    onChange: (id: string) => void; 
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    otherValue: string;
    label: string;
  }) => {
    const selectedStrain = strains.find(s => s.id === value);
    
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-left"
        >
          {selectedStrain ? (
            <div className="flex items-center gap-3">
              <Badge className={`${getCategoryColor(selectedStrain.category)} border`}>
                {t.categories[selectedStrain.category as keyof typeof t.categories] || selectedStrain.categoryLabel}
              </Badge>
              <span className="font-medium">{selectedStrain.name}</span>
              <span className="text-sm text-muted-foreground">({selectedStrain.originCountry})</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{t.ui.selectVariety}</span>
          )}
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">{t.categories.heady}</div>
              {strains.filter(s => s.category === "heady").map(strain => (
                <button
                  key={strain.id}
                  onClick={() => { onChange(strain.id); setIsOpen(false); }}
                  disabled={strain.id === otherValue}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    strain.id === otherValue 
                      ? "opacity-50 cursor-not-allowed" 
                      : strain.id === value 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                  }`}
                >
                  <Badge className={`${getCategoryColor(strain.category)} border text-xs`}>
                    {t.categories.heady}
                  </Badge>
                  <span className="font-medium">{strain.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{strain.originCountry}</span>
                  {strain.id === value && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
              
              <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mt-2 uppercase tracking-wider">{t.categories.balanced}</div>
              {strains.filter(s => s.category === "balanced").map(strain => (
                <button
                  key={strain.id}
                  onClick={() => { onChange(strain.id); setIsOpen(false); }}
                  disabled={strain.id === otherValue}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    strain.id === otherValue 
                      ? "opacity-50 cursor-not-allowed" 
                      : strain.id === value 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                  }`}
                >
                  <Badge className={`${getCategoryColor(strain.category)} border text-xs`}>
                    {t.categories.balanced}
                  </Badge>
                  <span className="font-medium">{strain.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{strain.originCountry}</span>
                  {strain.id === value && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
              
              <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mt-2 uppercase tracking-wider">{t.categories.heavy}</div>
              {strains.filter(s => s.category === "heavy").map(strain => (
                <button
                  key={strain.id}
                  onClick={() => { onChange(strain.id); setIsOpen(false); }}
                  disabled={strain.id === otherValue}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    strain.id === otherValue 
                      ? "opacity-50 cursor-not-allowed" 
                      : strain.id === value 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                  }`}
                >
                  <Badge className={`${getCategoryColor(strain.category)} border text-xs`}>
                    {t.categories.heavy}
                  </Badge>
                  <span className="font-medium">{strain.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{strain.originCountry}</span>
                  {strain.id === value && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ComparisonRow = ({ 
    label, 
    value1, 
    value2, 
    icon: Icon,
    highlight = false 
  }: { 
    label: string; 
    value1: React.ReactNode; 
    value2: React.ReactNode; 
    icon?: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
  }) => (
    <div className={`grid grid-cols-[1fr_auto_1fr] gap-4 py-3 ${highlight ? "bg-muted/30 -mx-4 px-4 rounded-lg" : ""}`}>
      <div className="text-right">{value1}</div>
      <div className="flex items-center justify-center gap-2 text-muted-foreground min-w-[120px]">
        {Icon && <Icon className="w-4 h-4" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-left">{value2}</div>
    </div>
  );

  const EffectComparisonRow = ({ 
    label, 
    effect1, 
    effect2 
  }: { 
    label: string; 
    effect1: number; 
    effect2: number; 
  }) => {
    const comparison = getEffectComparison(effect1, effect2);
    
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 py-2 items-center">
        <div className="flex items-center gap-2 justify-end">
          <div className="w-24">
            {renderEffectBar(effect1, comparison.winner === 1 ? "bg-primary" : "bg-muted-foreground/50")}
          </div>
          {comparison.winner === 1 && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              +{comparison.diff}
            </Badge>
          )}
        </div>
        <div className="text-center text-sm font-medium text-muted-foreground min-w-[100px]">
          {label}
        </div>
        <div className="flex items-center gap-2">
          {comparison.winner === 2 && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              +{comparison.diff}
            </Badge>
          )}
          <div className="w-24">
            {renderEffectBar(effect2, comparison.winner === 2 ? "bg-primary" : "bg-muted-foreground/50")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-muted-foreground">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary/10">
            <ArrowLeftRight className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t.meta.title}</h1>
            <p className="text-lg text-muted-foreground">{t.meta.subtitle}</p>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <StrainSelector
                value={strain1Id}
                onChange={setStrain1Id}
                isOpen={dropdown1Open}
                setIsOpen={(open) => { setDropdown1Open(open); if (open) setDropdown2Open(false); }}
                otherValue={strain2Id}
                label={t.ui.firstVariety}
              />
              <StrainSelector
                value={strain2Id}
                onChange={setStrain2Id}
                isOpen={dropdown2Open}
                setIsOpen={(open) => { setDropdown2Open(open); if (open) setDropdown1Open(false); }}
                otherValue={strain1Id}
                label={t.ui.secondVariety}
              />
            </div>
          </CardContent>
        </Card>

        {strain1 && strain2 ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={`border-2 ${getCategoryColor(strain1.category).split(" ")[2]}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {t.categories[strain1.category as keyof typeof t.categories]}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">{t.ui.potency}:</span>
                      {renderStars(strain1.strength)}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{strain1.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{strain1.origin}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{strain1.description}</p>
                  <Link href={`/${lang}/sorten/profile#${strain1.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.ui.toProfile}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className={`border-2 ${getCategoryColor(strain2.category).split(" ")[2]}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {t.categories[strain2.category as keyof typeof t.categories]}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">{t.ui.potency}:</span>
                      {renderStars(strain2.strength)}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{strain2.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{strain2.origin}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{strain2.description}</p>
                  <Link href={`/${lang}/sorten/profile#${strain2.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.ui.toProfile}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  {t.sections.effectProfile.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span dangerouslySetInnerHTML={{ __html: t.ui.badgeInfo }} />
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[100px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <EffectComparisonRow label={t.effects.euphoria} effect1={strain1.effects.euphoria} effect2={strain2.effects.euphoria} />
                  <EffectComparisonRow label={t.effects.relaxation} effect1={strain1.effects.relaxation} effect2={strain2.effects.relaxation} />
                  <EffectComparisonRow label={t.effects.sedation} effect1={strain1.effects.sedation} effect2={strain2.effects.sedation} />
                  <EffectComparisonRow label={t.effects.clarity} effect1={strain1.effects.clarity} effect2={strain2.effects.clarity} />
                  <EffectComparisonRow label={t.effects.sociability} effect1={strain1.effects.sociability} effect2={strain2.effects.sociability} />
                  <EffectComparisonRow label={t.effects.anxiolysis} effect1={strain1.effects.anxiolysis} effect2={strain2.effects.anxiolysis} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {t.sections.basicInfo.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[120px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  <ComparisonRow
                    label={t.info.chemotype}
                    icon={Beaker}
                    value1={<code className="bg-muted px-2 py-1 rounded text-sm">{strain1.chemotype}</code>}
                    value2={<code className="bg-muted px-2 py-1 rounded text-sm">{strain2.chemotype}</code>}
                  />
                  <ComparisonRow
                    label={t.info.duration}
                    icon={Clock}
                    value1={<span className="font-medium">{strain1.duration}</span>}
                    value2={<span className="font-medium">{strain2.duration}</span>}
                  />
                  <ComparisonRow
                    label={t.info.availability}
                    value1={<Badge variant="outline">{strain1.availability}</Badge>}
                    value2={<Badge variant="outline">{strain2.availability}</Badge>}
                  />
                  <ComparisonRow
                    label={t.info.price}
                    value1={<span className="font-medium">{strain1.price}</span>}
                    value2={<span className="font-medium">{strain2.price}</span>}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  {t.sections.dosage.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[100px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  <ComparisonRow
                    label={t.dosageLabels.beginner}
                    value1={<span className="font-medium text-emerald-600">{strain1.dosage.beginner}</span>}
                    value2={<span className="font-medium text-emerald-600">{strain2.dosage.beginner}</span>}
                    highlight
                  />
                  <ComparisonRow
                    label={t.dosageLabels.regular}
                    value1={<span className="font-medium text-amber-600">{strain1.dosage.regular}</span>}
                    value2={<span className="font-medium text-amber-600">{strain2.dosage.regular}</span>}
                  />
                  <ComparisonRow
                    label={t.dosageLabels.experienced}
                    value1={<span className="font-medium text-red-600">{strain1.dosage.experienced}</span>}
                    value2={<span className="font-medium text-red-600">{strain2.dosage.experienced}</span>}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {t.sections.applications.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[100px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {strain1.applications.map((app) => (
                      <Badge key={app} variant="secondary">{app}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strain2.applications.map((app) => (
                      <Badge key={app} variant="secondary">{app}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {t.sections.usageTimes.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[100px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {strain1.usageTimes.map((time) => (
                      <Badge key={time} variant="outline" className="gap-1">
                        {time.toLowerCase().includes("morgen") && <Sun className="w-3 h-3" />}
                        {time.toLowerCase().includes("mittag") && <Coffee className="w-3 h-3" />}
                        {time.toLowerCase().includes("abend") && <Moon className="w-3 h-3" />}
                        {time}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strain2.usageTimes.map((time) => (
                      <Badge key={time} variant="outline" className="gap-1">
                        {time.toLowerCase().includes("morgen") && <Sun className="w-3 h-3" />}
                        {time.toLowerCase().includes("mittag") && <Coffee className="w-3 h-3" />}
                        {time.toLowerCase().includes("abend") && <Moon className="w-3 h-3" />}
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  {t.sections.kavalactones.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-4 mb-4 border-b border-border">
                  <div className="text-right">
                    <Badge className={`${getCategoryColor(strain1.category)} border`}>
                      {strain1.name}
                    </Badge>
                  </div>
                  <div className="min-w-[140px]"></div>
                  <div className="text-left">
                    <Badge className={`${getCategoryColor(strain2.category)} border`}>
                      {strain2.name}
                    </Badge>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  <ComparisonRow
                    label={t.kavalactoneLabels.kavain}
                    value1={<span className="font-medium">{strain1.kavalactones.kavain}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.kavain}</span>}
                  />
                  <ComparisonRow
                    label={t.kavalactoneLabels.dhk}
                    value1={<span className="font-medium">{strain1.kavalactones.dhk}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.dhk}</span>}
                  />
                  <ComparisonRow
                    label={t.kavalactoneLabels.methysticin}
                    value1={<span className="font-medium">{strain1.kavalactones.methysticin}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.methysticin}</span>}
                  />
                  <ComparisonRow
                    label={t.kavalactoneLabels.dhm}
                    value1={<span className="font-medium">{strain1.kavalactones.dhm}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.dhm}</span>}
                  />
                  <ComparisonRow
                    label={t.kavalactoneLabels.yangonin}
                    value1={<span className="font-medium">{strain1.kavalactones.yangonin}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.yangonin}</span>}
                  />
                  <ComparisonRow
                    label={t.kavalactoneLabels.desmethoxyyangonin}
                    value1={<span className="font-medium">{strain1.kavalactones.desmethoxyyangonin}</span>}
                    value2={<span className="font-medium">{strain2.kavalactones.desmethoxyyangonin}</span>}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  {t.sections.notes.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">{strain1.name}</h4>
                    <p className="text-sm text-muted-foreground">{strain1.notes}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">{strain2.name}</h4>
                    <p className="text-sm text-muted-foreground">{strain2.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <ArrowLeftRight className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-2">{t.empty.title}</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">{t.empty.description}</p>
              
              <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="font-medium mb-3 flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  {t.empty.tips.title}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  {t.empty.tips.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <span className="text-sm text-muted-foreground">{t.empty.quickSelections}:</span>
                {t.empty.suggestions.map((suggestion: any) => (
                  <Button
                    key={suggestion.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStrain1Id(suggestion.strain1);
                      setStrain2Id(suggestion.strain2);
                    }}
                  >
                    {suggestion.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
