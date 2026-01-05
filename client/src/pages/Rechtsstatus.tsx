import WikiPageLayout from "@/components/WikiPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Scale, BookOpen, Gavel, FileText } from "lucide-react";
import { LegalStatusMap } from "@/components/LegalStatusMap";
import { LegalFAQ } from "@/components/LegalFAQ";
import { LegalDownloadSection } from "@/components/LegalDownloadSection";
import GlossaryText from "@/components/GlossaryText";
import { useTranslations } from "@/hooks/useTranslations";
import { useLocation } from "wouter";
import { Language } from "@/lib/i18n";

export default function Rechtsstatus() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { t, isLoading } = useTranslations({
    namespaces: ['rechtsstatus'],
    lang
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const toc = [
    { id: "novel-food-status", title: t('toc.novel-food-status'), level: 1 },
    { id: "situation-deutschland", title: t('toc.situation-deutschland'), level: 1 },
    { id: "arzneimittel-vs-lebensmittel", title: t('toc.arzneimittel-vs-lebensmittel'), level: 2 },
    { id: "eu-rechtslage", title: t('toc.eu-rechtslage'), level: 1 },
    { id: "downloads", title: t('toc.downloads'), level: 1 },
    { id: "faq", title: t('toc.faq'), level: 1 },
    { id: "fazit", title: t('toc.fazit'), level: 1 },
  ];

  const historicalItems = t('cards.historicalEvidence.items') as any[];
  const legalItems = t('cards.legalConsequence.items') as any[];
  const phases = t('germany.phases') as any[];
  const tableRows = t('eu.table.rows') as any[];
  const sourceItems = t('sources.items') as string[];

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
    >
      <div className="prose prose-stone max-w-none dark:prose-invert">
        <GlossaryText lang={lang}>
          <p className="lead text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('intro.lead') }} />
        </GlossaryText>

        <Alert className="my-8 border-primary/50 bg-primary/5">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold">{t('intro.alertTitle')}</AlertTitle>
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('intro.alertText') }} />
        </Alert>

        <GlossaryText lang={lang}>
          <h2 id="novel-food-status">{t('novelFood.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('novelFood.p1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('novelFood.p2') }} />
        </GlossaryText>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                {t('cards.historicalEvidence.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {historicalItems?.map((item: any, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>{item.label}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-primary" />
                {t('cards.legalConsequence.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {legalItems?.map((item: any, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: `<strong>${item.label}</strong> ${item.text}` }} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <GlossaryText lang={lang}>
          <h2 id="situation-deutschland">{t('germany.title')}</h2>
          <p>{t('germany.intro')}</p>
        </GlossaryText>

        <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-8 my-8">
          {phases?.map((phase: any, idx: number) => (
            <div key={idx} className="relative">
              <span className={`absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 bg-background ${
                idx === 0 ? 'border-primary' : idx === 1 ? 'border-destructive' : 'border-green-500'
              }`}></span>
              <h3 className="text-lg font-bold mt-0">{phase.title}</h3>
              <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: phase.text }} />
            </div>
          ))}
        </div>

        <GlossaryText lang={lang}>
          <h3 id="arzneimittel-vs-lebensmittel">{t('germany.distinction.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('germany.distinction.p1') }} />
          <p>{t('germany.distinction.p2')}</p>
        </GlossaryText>

        <GlossaryText lang={lang}>
          <h2 id="eu-rechtslage">{t('eu.title')}</h2>
          <p>{t('eu.intro')}</p>
        </GlossaryText>
        
        <div className="not-prose">
          <LegalStatusMap lang={lang} />
        </div>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
              <tr>
                <th className="p-4">{t('eu.table.headers.country')}</th>
                <th className="p-4">{t('eu.table.headers.status')}</th>
                <th className="p-4">{t('eu.table.headers.details')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tableRows?.map((row: any, idx: number) => (
                <tr key={idx}>
                  <td className="p-4 font-medium">{row.country}</td>
                  <td className={`p-4 font-bold ${
                    row.status === 'Legal' ? 'text-green-600' : 'text-yellow-600'
                  }`}>{row.status}</td>
                  <td className="p-4">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="downloads">
          <LegalDownloadSection lang={lang} />
        </div>

        <div id="faq" className="not-prose">
          <LegalFAQ lang={lang} />
        </div>

        <GlossaryText lang={lang}>
          <h2 id="fazit">{t('conclusion.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('conclusion.text') }} />
        </GlossaryText>

        <Alert variant="default" className="my-8 border-accent/50 bg-accent/10">
          <Gavel className="h-5 w-5 text-accent-foreground" />
          <AlertTitle className="text-accent-foreground font-bold">{t('conclusion.disclaimerTitle')}</AlertTitle>
          <AlertDescription className="text-accent-foreground/90">
            {t('conclusion.disclaimerText')}
          </AlertDescription>
        </Alert>

        <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('sources.title')}
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {sourceItems?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </WikiPageLayout>
  );
}
