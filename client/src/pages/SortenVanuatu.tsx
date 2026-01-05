import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, MapPin, Beaker, Clock, Loader2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";

export default function SortenVanuatu() {
  const [location] = useLocation();
  const lang = (location.split("/")[1] || "de") as Language;

  const { translations, isLoading } = useTranslations({
    namespaces: ["sortenVanuatu"],
    lang,
  });

  const t = translations.sortenVanuatu;

  if (isLoading || !t?.toc || !t?.meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const replaceLinks = (html: string) => {
    return html.replace(/\/de\//g, `/${lang}/`);
  };

  const VarietyCard = ({ variety, showTip, showNote }: { variety: any; showTip?: boolean; showNote?: boolean }) => (
    <>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="m-0">{variety.name}</h2>
        <Badge variant="secondary">{variety.badge}</Badge>
        {showTip && <Badge variant="outline" className="border-yellow-500 text-yellow-600">{t.ui.popular}</Badge>}
        {showNote && <Badge variant="outline" className="border-purple-500 text-purple-600">{t.ui.legendary}</Badge>}
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4" />
            {t.ui.origin}
          </div>
          <p className="m-0 font-medium">{variety.origin}</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Beaker className="h-4 w-4" />
            {t.ui.chemotype}
          </div>
          <p className="m-0 font-medium">{variety.chemotype}</p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            {t.ui.duration}
          </div>
          <p className="m-0 font-medium">{variety.duration}</p>
        </div>
      </div>

      {variety.description1 && <p dangerouslySetInnerHTML={{ __html: variety.description1 }} />}
      {variety.description2 && <p dangerouslySetInnerHTML={{ __html: replaceLinks(variety.description2) }} />}
      {variety.description && <p dangerouslySetInnerHTML={{ __html: variety.description }} />}

      <Card className="my-6">
        <CardHeader>
          <CardTitle className="text-base">{t.ui.effectProfile}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {variety.effects.map((effect: string, i: number) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `✓ ${replaceLinks(effect)}` }} />
            ))}
          </ul>
          {variety.recommendedFor && (
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>{t.ui.recommendedFor}:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: replaceLinks(variety.recommendedFor) }} />
            </p>
          )}
        </CardContent>
      </Card>

      {variety.tip && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
          <p className="m-0 text-blue-800 dark:text-blue-200">
            <strong>{t.ui.tip}:</strong> {variety.tip}
          </p>
        </div>
      )}

      {variety.note && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="m-0 text-amber-800 dark:text-amber-200">
            <strong>{t.ui.note}:</strong> {variety.note}
          </p>
        </div>
      )}
    </>
  );

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-home.jpg"
      toc={t.toc.items as any}
      tocTitle={t.toc.title}
    >
      <section id="einfuehrung">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t.content.einfuehrung.lead }} />
        </GlossaryText>
        
        <GlossaryText lang={lang}>
          <p>{t.content.einfuehrung.text}</p>
        </GlossaryText>

        <div className="bg-muted p-4 rounded-lg my-6">
          <p className="m-0 text-sm" dangerouslySetInnerHTML={{ __html: t.content.einfuehrung.localNames }} />
        </div>
      </section>

      <section id="borogu" className="mt-12">
        <VarietyCard variety={t.content.borogu} />
      </section>

      <section id="melo-melo" className="mt-12">
        <VarietyCard variety={t.content.meloMelo} showTip />
      </section>

      <section id="kelai" className="mt-12">
        <VarietyCard variety={t.content.kelai} showNote />
      </section>

      <section id="palasa" className="mt-12">
        <VarietyCard variety={t.content.palasa} />
      </section>

      <section id="palarasul" className="mt-12">
        <VarietyCard variety={t.content.palarasul} />
      </section>

      <section id="bir-kar" className="mt-12">
        <VarietyCard variety={t.content.birKar} />
      </section>

      <section id="weitere" className="mt-12">
        <h2>{t.content.weitere.title}</h2>
        <p>{t.content.weitere.intro}</p>

        <div className="overflow-x-auto my-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{t.content.weitere.tableHeaders.variety}</th>
                <th className="text-left">{t.content.weitere.tableHeaders.origin}</th>
                <th className="text-left">{t.content.weitere.tableHeaders.type}</th>
                <th className="text-left">{t.content.weitere.tableHeaders.characteristic}</th>
              </tr>
            </thead>
            <tbody>
              {t.content.weitere.tableRows.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.variety}</strong></td>
                  <td>{row.origin}</td>
                  <td>{row.type}</td>
                  <td>{row.characteristic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <Link href={`/${lang}/sorten/profile`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.weitere.profilesLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      <div className="mt-16 pt-8 border-t">
        <p className="text-sm text-muted-foreground mb-4">{t.navigation.chapterLabel}</p>
        <Link href={t.navigation.next.href.replace("/de/", `/${lang}/`)}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {t.navigation.next.title}
                </h3>
                <p className="text-sm text-muted-foreground m-0">
                  {t.navigation.next.description}
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
