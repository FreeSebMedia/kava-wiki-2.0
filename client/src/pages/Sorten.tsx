import WikiPageLayout from "@/components/WikiPageLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, Leaf, AlertTriangle, Globe, FlaskConical, Loader2 } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  Globe,
  Leaf,
  FlaskConical,
};

export default function Sorten() {
  const [location] = useLocation();
  const lang = (location.split("/")[1] || "de") as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ["sorten"],
    lang,
  });

  const t = translations.sorten;

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

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-home.jpg"
      toc={t.toc.items as any}
      tocTitle={t.toc.title}
    >
      <GlossaryText lang={lang}>
        <section id="einfuehrung">
          <p 
            className="lead text-xl"
            dangerouslySetInnerHTML={{ __html: t.content.einfuehrung.lead }}
          />
          <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.einfuehrung.text) }} />
        </section>
      </GlossaryText>

      <section id="noble-vs-tudei" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t.content.nobleTudei.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.nobleTudei.intro) }} />
        </GlossaryText>
        
        <div className="grid md:grid-cols-2 gap-8 my-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                {t.content.nobleTudei.noble.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.content.nobleTudei.noble.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: `✅ ${item}` }} />
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>{lang === "de" ? "Beispiele" : "Examples"}:</strong> {t.content.nobleTudei.noble.examples}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t.content.nobleTudei.tudei.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.content.nobleTudei.tudei.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: `❌ ${item}` }} />
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>{lang === "de" ? "Beispiele" : "Examples"}:</strong> {t.content.nobleTudei.tudei.examples}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="m-0 text-amber-800 dark:text-amber-200">
            <strong>{lang === "de" ? "Wichtig" : "Important"}:</strong> {t.content.nobleTudei.warning}
          </p>
        </div>

        <p>
          <Link href={`/${lang}/sorten/noble-tudei`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.nobleTudei.linkText} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      <section id="wirktypen" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t.content.wirktypen.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.wirktypen.intro) }} />
        </GlossaryText>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline" className="border-yellow-500 text-yellow-600">{t.content.wirktypen.heady.title}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.content.wirktypen.heady.description}</p>
              <p className="text-sm text-muted-foreground">
                <strong>{lang === "de" ? "Chemotyp" : "Chemotype"}:</strong> {t.content.wirktypen.heady.chemotype}<br />
                <strong>{lang === "de" ? "Sorten" : "Varieties"}:</strong> {t.content.wirktypen.heady.varieties}
              </p>
              <p className="text-sm mt-4">
                <Link href={`/${lang}/wirkung/stimmung`} className="text-primary hover:underline">→ {t.content.wirktypen.heady.linkText}</Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">{t.content.wirktypen.balanced.title}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.content.wirktypen.balanced.description}</p>
              <p className="text-sm text-muted-foreground">
                <strong>{lang === "de" ? "Chemotyp" : "Chemotype"}:</strong> {t.content.wirktypen.balanced.chemotype}<br />
                <strong>{lang === "de" ? "Sorten" : "Varieties"}:</strong> {t.content.wirktypen.balanced.varieties}
              </p>
              <p className="text-sm mt-4">
                <Link href={`/${lang}/wirkung/angst`} className="text-primary hover:underline">→ {t.content.wirktypen.balanced.linkText}</Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">{t.content.wirktypen.heavy.title}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.content.wirktypen.heavy.description}</p>
              <p className="text-sm text-muted-foreground">
                <strong>{lang === "de" ? "Chemotyp" : "Chemotype"}:</strong> {t.content.wirktypen.heavy.chemotype}<br />
                <strong>{lang === "de" ? "Sorten" : "Varieties"}:</strong> {t.content.wirktypen.heavy.varieties}
              </p>
              <p className="text-sm mt-4">
                <Link href={`/${lang}/wirkung/schlaf`} className="text-primary hover:underline">→ {t.content.wirktypen.heavy.linkText}</Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <p>
          <Link href={`/${lang}/inhaltsstoffe/rechner`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.wirktypen.calculatorLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      <section id="regionen" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t.content.regionen.title}</h2>
          <p>{t.content.regionen.intro}</p>
        </GlossaryText>

        <div className="overflow-x-auto my-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{t.content.regionen.tableHeaders.region}</th>
                <th className="text-left">{t.content.regionen.tableHeaders.count}</th>
                <th className="text-left">{t.content.regionen.tableHeaders.localName}</th>
                <th className="text-left">{t.content.regionen.tableHeaders.varieties}</th>
                <th className="text-left">{t.content.regionen.tableHeaders.characteristics}</th>
              </tr>
            </thead>
            <tbody>
              {t.content.regionen.tableRows.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.region}</strong></td>
                  <td>{row.count}</td>
                  <td>{row.localName}</td>
                  <td>{row.varieties}</td>
                  <td>{row.characteristics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <Link href={`/${lang}/sorten/vanuatu`} className="text-primary hover:underline inline-flex items-center gap-1 mr-6">
            {t.content.regionen.vanuatuLink} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/${lang}/sorten/pazifik`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.regionen.pazifikLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      <section id="auswahl" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t.content.auswahl.title}</h2>
          <p>{t.content.auswahl.intro}</p>
        </GlossaryText>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {t.content.auswahl.recommendations.map((rec: any, i: number) => (
            <div key={i} className="bg-muted p-4 rounded-lg">
              <strong className="block mb-2 text-primary">{rec.purpose}</strong>
              <p className="text-sm m-0 mb-2" dangerouslySetInnerHTML={{ __html: rec.description }} />
              <ul className="text-sm space-y-1">
                {rec.varieties.map((v: string, j: number) => (
                  <li key={j}>• {v}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
          <p className="m-0 text-blue-800 dark:text-blue-200">
            <strong>{t.content.auswahl.tipLabel}</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: t.content.auswahl.tip }} />
          </p>
        </div>
      </section>

      <section id="unterseiten" className="mt-12">
        <h2>{t.content.unterseiten.title}</h2>
        <p>{t.content.unterseiten.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {t.subpages.map((page: any) => {
            const Icon = iconMap[page.icon] || Leaf;
            const href = page.href.replace("/de/", `/${lang}/`);
            return (
              <Link key={href} href={href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {page.title}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-muted-foreground m-0">{page.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </WikiPageLayout>
  );
}
