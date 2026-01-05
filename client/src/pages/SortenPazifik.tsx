import WikiPageLayout from "@/components/WikiPageLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, MapPin, Beaker, Clock } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/\/de\//g, `/${lang}/`);
}

interface VarietyInfoProps {
  name: string;
  badges: string[];
  origin: string;
  typeOrComposition: string;
  typeLabel: string;
  duration: string;
  description: string;
  effects: { text: string }[];
  recommendedFor: string;
  warning?: string;
  tip?: string;
  lang: string;
  ui: any;
}

function VarietyInfo({ name, badges, origin, typeOrComposition, typeLabel, duration, description, effects, recommendedFor, warning, tip, lang, ui }: VarietyInfoProps) {
  return (
    <section id={name.toLowerCase().replace(/[^a-z]/g, '-')} className="mt-8">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h3 className="m-0">{name}</h3>
        {badges.map((badge, i) => (
          <Badge key={i} variant={i === 0 ? "secondary" : "outline"} className={
            badge.includes("Potent") || badge.includes("potent") ? "border-red-500 text-red-600" :
            badge.includes("Heady") || badge.includes("heady") ? "border-yellow-500 text-yellow-600" :
            badge.includes("Einsteiger") || badge.includes("Beginner") || badge.includes("friendly") ? "border-green-500 text-green-600" :
            badge.includes("Königlich") || badge.includes("Royal") ? "border-purple-500 text-purple-600" :
            ""
          }>{badge}</Badge>
        ))}
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4" />
            {ui.origin}
          </div>
          <p className="m-0 font-medium">{origin}</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Beaker className="h-4 w-4" />
            {typeLabel}
          </div>
          <p className="m-0 font-medium">{typeOrComposition}</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            {ui.duration}
          </div>
          <p className="m-0 font-medium">{duration}</p>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: replaceLinks(description, lang) }} />

      <Card className="my-6">
        <CardHeader>
          <CardTitle className="text-base">{ui.effectProfile}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {effects.map((effect, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `✓ ${replaceLinks(effect.text, lang)}` }} />
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ 
            __html: `<strong>${ui.recommendedFor}</strong> ${replaceLinks(recommendedFor, lang)}` 
          }} />
        </CardContent>
      </Card>

      {warning && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="m-0 text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: replaceLinks(warning, lang) }} />
        </div>
      )}

      {tip && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
          <p className="m-0 text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: replaceLinks(tip, lang) }} />
        </div>
      )}
    </section>
  );
}

interface VarietyTableProps {
  varieties: { name: string; type: string; speciality: string }[];
  ui: any;
}

function VarietyTable({ varieties, ui }: VarietyTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">{ui.variety}</th>
            <th className="text-left">{ui.type}</th>
            <th className="text-left">{ui.speciality}</th>
          </tr>
        </thead>
        <tbody>
          {varieties.map((v, i) => (
            <tr key={i}>
              <td><strong>{v.name}</strong></td>
              <td>{v.type}</td>
              <td>{v.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SortenPazifik() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['sortenPazifik'],
    lang: lang as any
  });

  if (isLoading || !translations.sortenPazifik) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.sortenPazifik;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.sorten, href: `/${lang}/sorten` },
    { label: t.breadcrumbs.current },
  ];

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
      {/* FIJI */}
      <section id="fiji">
        <h2>{t.fiji.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: replaceLinks(t.fiji.intro, lang) }} />
        <VarietyTable varieties={t.fiji.varieties} ui={t.ui} />
      </section>

      {/* Loa Waka */}
      <VarietyInfo
        name={t.loaWaka.name}
        badges={t.loaWaka.badges}
        origin={t.loaWaka.origin}
        typeOrComposition={t.loaWaka.type}
        typeLabel={t.ui.type}
        duration={t.loaWaka.duration}
        description={t.loaWaka.description}
        effects={t.loaWaka.effects}
        recommendedFor={t.loaWaka.recommendedFor}
        warning={t.loaWaka.warning}
        lang={lang}
        ui={t.ui}
      />

      {/* TONGA */}
      <section id="tonga" className="mt-12">
        <h2>{t.tonga.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: replaceLinks(t.tonga.intro, lang) }} />
        <VarietyTable varieties={t.tonga.varieties} ui={t.ui} />
      </section>

      {/* Pouni Ono */}
      <VarietyInfo
        name={t.pouniOno.name}
        badges={t.pouniOno.badges}
        origin={t.pouniOno.origin}
        typeOrComposition={t.pouniOno.composition}
        typeLabel={t.ui.composition}
        duration={t.pouniOno.duration}
        description={t.pouniOno.description}
        effects={t.pouniOno.effects}
        recommendedFor={t.pouniOno.recommendedFor}
        tip={t.pouniOno.tip}
        lang={lang}
        ui={t.ui}
      />

      {/* HAWAII */}
      <section id="hawaii" className="mt-12">
        <h2>{t.hawaii.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: replaceLinks(t.hawaii.intro, lang) }} />
        <VarietyTable varieties={t.hawaii.varieties} ui={t.ui} />
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="m-0 text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: replaceLinks(t.hawaii.warning, lang) }} />
        </div>
      </section>

      {/* Moi */}
      <VarietyInfo
        name={t.moi.name}
        badges={t.moi.badges}
        origin={t.moi.origin}
        typeOrComposition={t.moi.type}
        typeLabel={t.ui.type}
        duration={t.moi.duration}
        description={t.moi.description}
        effects={t.moi.effects}
        recommendedFor={t.moi.recommendedFor}
        lang={lang}
        ui={t.ui}
      />

      {/* SAMOA */}
      <section id="samoa" className="mt-12">
        <h2>{t.samoa.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: replaceLinks(t.samoa.intro, lang) }} />
        <VarietyTable varieties={t.samoa.varieties} ui={t.ui} />
      </section>

      {/* Andere Regionen */}
      <section id="andere" className="mt-12">
        <h2>{t.andere.title}</h2>
        <p>{t.andere.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          {t.andere.regions.map((region: any, i: number) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">{region.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: replaceLinks(region.description, lang) }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Chapter Navigation */}
      <div className="mt-16 pt-8 border-t">
        <p className="text-sm text-muted-foreground mb-4">{t.navigation.nextChapter}</p>
        <Link href={replaceLinks(t.navigation.nextLink, lang)}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {t.navigation.nextTitle}
                </h3>
                <p className="text-sm text-muted-foreground m-0">
                  {t.navigation.nextDescription}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </WikiPageLayout>
  );
}
