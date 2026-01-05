import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, Leaf, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";

export default function SortenNobleTudei() {
  const [location] = useLocation();
  const lang = (location.split("/")[1] || "de") as Language;

  const { translations, isLoading } = useTranslations({
    namespaces: ["sortenNobleTudei"],
    lang,
  });

  const t = translations.sortenNobleTudei;

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
      <section id="einfuehrung">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t.content.einfuehrung.lead }} />
        </GlossaryText>
        <p>{t.content.einfuehrung.text}</p>
      </section>

      <section id="geschichte" className="mt-12">
        <h2>{t.content.geschichte.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.content.geschichte.p1 }} />
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.geschichte.p2) }} />

        <blockquote className="border-l-4 border-primary pl-4 my-6 italic">
          {t.content.geschichte.quote}
          <footer className="text-sm text-muted-foreground mt-2">{t.content.geschichte.quoteAuthor}</footer>
        </blockquote>
      </section>

      <section id="chemische-unterschiede" className="mt-12">
        <h2>{t.content.chemischeUnterschiede.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.chemischeUnterschiede.intro) }} />

        <div className="overflow-x-auto my-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{t.content.chemischeUnterschiede.tableHeaders.merkmal}</th>
                <th className="text-left">{t.content.chemischeUnterschiede.tableHeaders.noble}</th>
                <th className="text-left">{t.content.chemischeUnterschiede.tableHeaders.tudei}</th>
              </tr>
            </thead>
            <tbody>
              {t.content.chemischeUnterschiede.tableRows.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.merkmal}</strong></td>
                  <td className="text-green-600">{row.noble}</td>
                  <td className="text-red-600">{row.tudei}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {t.content.chemischeUnterschiede.nobleCard.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {t.content.chemischeUnterschiede.nobleCard.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground text-sm">
                {t.content.chemischeUnterschiede.nobleCard.note}
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                {t.content.chemischeUnterschiede.tudeiCard.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {t.content.chemischeUnterschiede.tudeiCard.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground text-sm">
                {t.content.chemischeUnterschiede.tudeiCard.note}
              </p>
            </CardContent>
          </Card>
        </div>

        <p>
          <Link href={`/${lang}/inhaltsstoffe/rechner`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.chemischeUnterschiede.calculatorLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      <section id="wirkungsunterschiede" className="mt-12">
        <h2>{t.content.wirkungsunterschiede.title}</h2>
        <p>{t.content.wirkungsunterschiede.intro}</p>

        <div className="overflow-x-auto my-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{t.content.wirkungsunterschiede.tableHeaders.aspekt}</th>
                <th className="text-left">{t.content.wirkungsunterschiede.tableHeaders.noble}</th>
                <th className="text-left">{t.content.wirkungsunterschiede.tableHeaders.tudei}</th>
              </tr>
            </thead>
            <tbody>
              {t.content.wirkungsunterschiede.tableRows.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.aspekt}</strong></td>
                  <td>{row.noble}</td>
                  <td>{row.tudei}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                {t.content.wirkungsunterschiede.nobleExperience.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{t.content.wirkungsunterschiede.nobleExperience.text}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t.content.wirkungsunterschiede.tudeiExperience.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{t.content.wirkungsunterschiede.tudeiExperience.text}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="erkennung" className="mt-12">
        <h2>{t.content.erkennung.title}</h2>
        <p>{t.content.erkennung.intro}</p>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4">{t.content.erkennung.warningTitle}</h3>
          <ul className="space-y-2 text-amber-800 dark:text-amber-200">
            {t.content.erkennung.warnings.map((warning: string, i: number) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `⚠️ ${warning}` }} />
            ))}
          </ul>
        </div>

        <h3>{t.content.erkennung.acetoneTestTitle}</h3>
        <p dangerouslySetInnerHTML={{ __html: t.content.erkennung.acetoneTestText }} />

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
          <p className="m-0 text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: t.content.erkennung.recommendation }} />
        </div>
      </section>

      <section id="sicherheit" className="mt-12">
        <h2>{t.content.sicherheit.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: replaceLinks(t.content.sicherheit.intro) }} />

        <ul className="space-y-2 my-6">
          {t.content.sicherheit.causes.map((cause: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: `• ${cause}` }} />
          ))}
        </ul>

        <p dangerouslySetInnerHTML={{ __html: t.content.sicherheit.conclusion }} />

        <p>
          <Link href={`/${lang}/sicherheit`} className="text-primary hover:underline inline-flex items-center gap-1">
            {t.content.sicherheit.moreLink} <ArrowRight className="h-4 w-4" />
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
