import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Info, BookOpen, FileText, Scale } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function SicherheitLeber() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;

  const { translations, isLoading } = useTranslations({
    namespaces: ['sicherheitLeber'],
    lang
  });

  const data = translations.sicherheitLeber || {};

  const toc = [
    { id: "zusammenfassung", title: data.toc?.zusammenfassung || "Zusammenfassung", level: 1 },
    { id: "verbot-2002", title: data.toc?.verbot2002 || "Das Verbot von 2002", level: 1 },
    { id: "was-wirklich-geschah", title: data.toc?.wasWirklichGeschah || "Was wirklich geschah", level: 2 },
    { id: "rehabilitation", title: data.toc?.rehabilitation || "Rehabilitation & Gerichtsurteile", level: 2 },
    { id: "wissenschaft", title: data.toc?.wissenschaft || "Die wissenschaftliche Evidenz", level: 1 },
    { id: "who-bewertung", title: data.toc?.whoBewertung || "WHO-Bewertung 2007", level: 2 },
    { id: "ema-bewertung", title: data.toc?.emaBewertung || "EMA-Bewertung 2017", level: 2 },
    { id: "klinische-studien", title: data.toc?.klinischeStudien || "Klinische Studien", level: 2 },
    { id: "risikofaktoren", title: data.toc?.risikofaktoren || "Identifizierte Risikofaktoren", level: 1 },
    { id: "extrakte", title: data.toc?.extrakte || "Extrakt-Typen", level: 2 },
    { id: "pflanzenteile", title: data.toc?.pflanzenteile || "Pflanzenteile", level: 2 },
    { id: "genetik", title: data.toc?.genetik || "Genetische Faktoren", level: 2 },
    { id: "komedikation", title: data.toc?.komedikation || "Komedikation & Alkohol", level: 2 },
    { id: "mechanismen", title: data.toc?.mechanismen || "Mögliche Mechanismen", level: 1 },
    { id: "empfehlungen", title: data.toc?.empfehlungen || "Praktische Empfehlungen", level: 1 },
    { id: "quellen", title: data.toc?.quellen || "Quellen", level: 1 },
  ];

  const breadcrumbs = [
    { label: data.meta?.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.meta?.breadcrumbs?.sicherheit || "Sicherheit", href: `/${lang}/sicherheit` },
    { label: data.meta?.breadcrumbs?.current || "Lebersicherheit" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.meta?.title || "Lebersicherheit & Hepatotoxizität"}
      subtitle={data.meta?.subtitle || ""}
      category={data.meta?.category || "Sicherheit"}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={data.toc?.title}
      breadcrumbs={breadcrumbs}
    >
      <section id="zusammenfassung">
        <Alert className="bg-primary/10 border-primary/20 mb-8">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold text-lg">{data.zusammenfassung?.title}</AlertTitle>
          <AlertDescription className="text-primary/80 mt-2">
            <p className="mb-2">{data.zusammenfassung?.intro}</p>
            <ul className="space-y-2 text-sm">
              {data.zusammenfassung?.points?.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      <section id="verbot-2002" className="mt-12">
        <GlossaryText lang={lang}>
          <h2 className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            {data.verbot2002?.title}
          </h2>
          <p>{data.verbot2002?.intro}</p>
        </GlossaryText>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold text-lg mb-3">{data.verbot2002?.chronologie?.title}</h4>
          <p className="text-sm text-muted-foreground mb-4">
            {data.verbot2002?.chronologie?.note}{" "}
            <Link href={`/${lang}/rechtsstatus`} className="text-primary hover:underline">
              {data.verbot2002?.chronologie?.linkText}
            </Link>.
          </p>
          <div className="space-y-3 text-sm">
            {data.verbot2002?.chronologie?.events?.map((event: any, i: number) => (
              <div key={i} className="flex gap-4">
                <span className="font-mono text-primary font-bold w-20">{event.date}</span>
                <span>{event.text}</span>
              </div>
            ))}
          </div>
        </div>

        <GlossaryText lang={lang}>
          <h3 id="was-wirklich-geschah">{data.wasWirklichGeschah?.title}</h3>
          <p>{data.wasWirklichGeschah?.intro}</p>
        </GlossaryText>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <h4 className="font-bold text-destructive mb-3">{data.wasWirklichGeschah?.probleme?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.wasWirklichGeschah?.probleme?.items?.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h4 className="font-bold text-primary mb-3">{data.wasWirklichGeschah?.erkenntnisse?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.wasWirklichGeschah?.erkenntnisse?.items?.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GlossaryText lang={lang}>
          <h3 id="rehabilitation">{data.rehabilitation?.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: data.rehabilitation?.intro || '' }} />
        </GlossaryText>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
          {data.rehabilitation?.quote}
          <footer className="text-sm mt-2 not-italic">{data.rehabilitation?.quoteSource}</footer>
        </blockquote>
      </section>

      <section id="wissenschaft" className="mt-12">
        <h2 className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          {data.wissenschaft?.title}
        </h2>
        <p>{data.wissenschaft?.intro}</p>

        <h3 id="who-bewertung">{data.whoBewertung?.title}</h3>
        <p>{data.whoBewertung?.intro}</p>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-4">{data.whoBewertung?.analysisTitle}</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {data.whoBewertung?.cases?.map((caseItem: any, i: number) => (
              <div key={i} className={`text-center p-4 rounded-lg ${
                caseItem.color === 'primary' ? 'bg-primary/5' :
                caseItem.color === 'amber' ? 'bg-amber-500/10' : 'bg-muted'
              }`}>
                <div className={`text-3xl font-bold ${
                  caseItem.color === 'primary' ? 'text-primary' :
                  caseItem.color === 'amber' ? 'text-amber-600' : 'text-muted-foreground'
                }`}>{caseItem.count}</div>
                <div className="text-sm text-muted-foreground">{caseItem.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">{data.whoBewertung?.note}</p>
        </div>

        <h3 id="ema-bewertung">{data.emaBewertung?.title}</h3>
        <p>{data.emaBewertung?.intro}</p>

        <ul className="space-y-2 my-4">
          {data.emaBewertung?.findings?.map((finding: any, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>{finding.label}:</strong> {finding.text}</span>
            </li>
          ))}
        </ul>

        <h3 id="klinische-studien">{data.klinischeStudien?.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: data.klinischeStudien?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-3">{data.klinischeStudien?.tableTitle}</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {data.klinischeStudien?.headers?.map((header: string, i: number) => (
                  <th key={i} className="text-left py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.klinischeStudien?.studies?.map((study: any, i: number) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-2">{study.study}</td>
                  <td>{study.participants}</td>
                  <td>{study.duration}</td>
                  <td className="text-primary">{study.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">{data.klinischeStudien?.footnote}</p>
        </div>
      </section>

      <section id="risikofaktoren" className="mt-12">
        <h2 className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          {data.risikofaktoren?.title}
        </h2>
        <p>{data.risikofaktoren?.intro}</p>

        <h3 id="extrakte">{data.extrakte?.title}</h3>
        <p>{data.extrakte?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h4 className="font-bold text-primary mb-3">{data.extrakte?.waessrig?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.extrakte?.waessrig?.items?.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
            <h4 className="font-bold text-amber-600 mb-3">{data.extrakte?.organisch?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.extrakte?.organisch?.items?.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 id="pflanzenteile">{data.pflanzenteile?.title}</h3>
        <p>{data.pflanzenteile?.intro}</p>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-4">{data.pflanzenteile?.tableTitle}</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {data.pflanzenteile?.headers?.map((header: string, i: number) => (
                  <th key={i} className="text-left py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.pflanzenteile?.rows?.map((row: any, i: number) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-2 font-medium">{row.part}</td>
                  <td>{row.content}</td>
                  <td className={
                    row.color === 'primary' ? 'text-primary' :
                    row.color === 'amber' ? 'text-amber-600' : 'text-destructive'
                  }>{row.safety}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-muted-foreground mt-4">{data.pflanzenteile?.note}</p>
        </div>

        <h3 id="genetik">{data.genetik?.title}</h3>
        <p>{data.genetik?.intro}</p>

        <ul className="space-y-2 my-4">
          {data.genetik?.factors?.map((factor: any, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span><strong>{factor.label}:</strong> {factor.text}</span>
            </li>
          ))}
        </ul>

        <h3 id="komedikation">{data.komedikation?.title}</h3>
        
        <Alert variant="destructive" className="my-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{data.komedikation?.warning?.title}</AlertTitle>
          <AlertDescription>{data.komedikation?.warning?.text}</AlertDescription>
        </Alert>

        <p>{data.komedikation?.intro}</p>

        <ul className="space-y-1 my-4">
          {data.komedikation?.items?.map((item: string, i: number) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </section>

      <section id="mechanismen" className="mt-12">
        <h2>{data.mechanismen?.title}</h2>
        <p>{data.mechanismen?.intro}</p>

        <div className="space-y-4 my-6">
          {data.mechanismen?.hypotheses?.map((hypo: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <h4 className="font-bold mb-2">{hypo.title}</h4>
              <p className="text-sm text-muted-foreground">{hypo.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="empfehlungen" className="mt-12">
        <h2 className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          {data.empfehlungen?.title}
        </h2>
        <p>{data.empfehlungen?.intro}</p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-6">
          <h4 className="font-bold text-primary mb-4">{data.empfehlungen?.checklistTitle}</h4>
          <ul className="space-y-3">
            {data.empfehlungen?.items?.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>{item.label}</strong>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/20 my-6">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-600">{data.empfehlungen?.selfObservation?.title}</AlertTitle>
          <AlertDescription className="text-blue-600/80">{data.empfehlungen?.selfObservation?.text}</AlertDescription>
        </Alert>
      </section>

      <section id="quellen" className="mt-12">
        <h2 className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          {data.quellen?.title}
        </h2>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-4">{data.quellen?.officialReports?.title}</h4>
          <ul className="space-y-2 text-sm">
            {data.quellen?.officialReports?.items?.map((item: any, i: number) => (
              <li key={i}>
                <strong>{item.author}</strong> {item.title}
                <span className="text-muted-foreground"> {item.source}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-4">{data.quellen?.reviews?.title}</h4>
          <ul className="space-y-2 text-sm">
            {data.quellen?.reviews?.items?.map((item: any, i: number) => (
              <li key={i}>
                <strong>{item.author}</strong> {item.title}
                <span className="text-muted-foreground"> {item.source}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          {data.quellen?.moreStudies}{" "}
          <Link href={`/${lang}/studien`} className="text-primary hover:underline">{data.quellen?.studiesLink}</Link>.
        </p>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <h3 className="text-lg font-bold mb-4">{data.navigation?.continueTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data.navigation?.items?.map((item: any) => (
            <Link
              key={item.href}
              href={item.href?.replace('/de/', `/${lang}/`) || '#'}
              className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <h4 className="font-bold group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
