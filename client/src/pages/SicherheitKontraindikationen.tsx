import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Ban, AlertCircle, Baby, Heart, Brain, Activity, Clock, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";

export default function SicherheitKontraindikationen() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['sicherheitKontraindikationen'],
    lang
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const t = translations?.sicherheitKontraindikationen;
  
  if (!t?.toc || !t?.meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading content</p>
      </div>
    );
  }

  const toc = [
    { id: "zusammenfassung", title: t.toc.zusammenfassung, level: 1 },
    { id: "absolute", title: t.toc.absolute, level: 1 },
    { id: "leber", title: t.toc.leber, level: 2 },
    { id: "schwangerschaft", title: t.toc.schwangerschaft, level: 2 },
    { id: "kinder", title: t.toc.kinder, level: 2 },
    { id: "relative", title: t.toc.relative, level: 1 },
    { id: "parkinson", title: t.toc.parkinson, level: 2 },
    { id: "depression", title: t.toc.depression, level: 2 },
    { id: "operation", title: t.toc.operation, level: 2 },
    { id: "fahren", title: t.toc.fahren, level: 2 },
    { id: "vorsicht", title: t.toc.vorsicht, level: 1 },
    { id: "genetik", title: t.toc.genetik, level: 2 },
    { id: "alter", title: t.toc.alter, level: 2 },
    { id: "entscheidungshilfe", title: t.toc.entscheidungshilfe, level: 1 },
    { id: "quellen", title: t.toc.quellen, level: 1 },
  ];

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={t.toc.title}
      breadcrumbs={[
        { label: t.meta.breadcrumbs.home, href: `/${lang}` },
        { label: t.meta.breadcrumbs.sicherheit, href: `/${lang}/sicherheit` },
        { label: t.meta.breadcrumbs.current },
      ]}
    >
      <section id="zusammenfassung">
        <Alert className="bg-amber-500/10 border-amber-500/20 mb-8">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-600 font-bold text-lg">{t.zusammenfassung.title}</AlertTitle>
          <AlertDescription className="text-amber-600/80 mt-2">
            <p className="mb-3">{t.zusammenfassung.intro}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-amber-700">{t.zusammenfassung.absolut.title}</strong>
                <ul className="space-y-1 mt-1 text-sm">
                  {t.zusammenfassung.absolut.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong className="text-amber-700">{t.zusammenfassung.relativ.title}</strong>
                <ul className="space-y-1 mt-1 text-sm">
                  {t.zusammenfassung.relativ.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      <section id="absolute" className="mt-12">
        <GlossaryText lang={lang}>
          <h2 className="flex items-center gap-2">
            <Ban className="h-6 w-6 text-destructive" />
            {t.absolute.title}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: t.absolute.intro }} />
        </GlossaryText>

        <h3 id="leber" className="flex items-center gap-2 mt-8">
          <AlertCircle className="h-5 w-5 text-destructive" />
          {t.leber.title}
        </h3>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">{t.leber.label}</h4>
          <p className="text-sm mb-4">{t.leber.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.leber.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.leber.reasonLabel}</strong> {t.leber.reason}
          </p>
        </div>

        <h3 id="schwangerschaft" className="flex items-center gap-2 mt-8">
          <Baby className="h-5 w-5 text-destructive" />
          {t.schwangerschaft.title}
        </h3>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">{t.schwangerschaft.label}</h4>
          <p className="text-sm mb-4">{t.schwangerschaft.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.schwangerschaft.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.schwangerschaft.traditionLabel}</strong> {t.schwangerschaft.tradition}
          </p>
        </div>

        <h3 id="kinder" className="flex items-center gap-2 mt-8">
          <AlertCircle className="h-5 w-5 text-destructive" />
          {t.kinder.title}
        </h3>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">{t.kinder.label}</h4>
          <p className="text-sm mb-4">{t.kinder.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.kinder.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="relative" className="mt-12">
        <GlossaryText lang={lang}>
          <h2 className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            {t.relative.title}
          </h2>
          <p>{t.relative.intro}</p>
        </GlossaryText>

        <h3 id="parkinson" className="flex items-center gap-2 mt-8">
          <Brain className="h-5 w-5 text-amber-500" />
          {t.parkinson.title}
        </h3>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">{t.parkinson.label}</h4>
          <p className="text-sm mb-4">{t.parkinson.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.parkinson.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.parkinson.caseReportLabel}</strong> {t.parkinson.caseReport}
          </p>
        </div>

        <h3 id="depression" className="flex items-center gap-2 mt-8">
          <Brain className="h-5 w-5 text-amber-500" />
          {t.depression.title}
        </h3>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">{t.depression.label}</h4>
          <p className="text-sm mb-4">{t.depression.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.depression.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.depression.noteLabel}</strong> {t.depression.note}
          </p>
        </div>

        <h3 id="operation" className="flex items-center gap-2 mt-8">
          <Activity className="h-5 w-5 text-amber-500" />
          {t.operation.title}
        </h3>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">{t.operation.label}</h4>
          <p className="text-sm mb-4">{t.operation.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.operation.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 font-bold text-amber-600">{t.operation.recommendation}</p>
        </div>

        <h3 id="fahren" className="flex items-center gap-2 mt-8">
          <Clock className="h-5 w-5 text-amber-500" />
          {t.fahren.title}
        </h3>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">{t.fahren.label}</h4>
          <p className="text-sm mb-4">{t.fahren.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.fahren.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.fahren.noteLabel}</strong> {t.fahren.note}
          </p>
        </div>
      </section>

      <section id="vorsicht" className="mt-12">
        <h2 className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-blue-500" />
          {t.vorsicht.title}
        </h2>
        <p>{t.vorsicht.intro}</p>

        <h3 id="genetik" className="mt-8">{t.genetik.title}</h3>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-blue-600 mb-3">{t.genetik.label}</h4>
          <p className="text-sm mb-4">{t.genetik.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.genetik.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.genetik.recommendationLabel}</strong> {t.genetik.recommendation}
          </p>
        </div>

        <h3 id="alter" className="mt-8">{t.alter.title}</h3>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-blue-600 mb-3">{t.alter.label}</h4>
          <p className="text-sm mb-4">{t.alter.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.alter.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.alter.recommendationLabel}</strong> {t.alter.recommendation}
          </p>
        </div>
      </section>

      <section id="entscheidungshilfe" className="mt-12">
        <h2 className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          {t.entscheidungshilfe.title}
        </h2>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-4">{t.entscheidungshilfe.selfCheck.title}</h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-destructive/5 rounded-lg">
              <h5 className="font-bold text-destructive mb-2">❌ {t.entscheidungshilfe.selfCheck.nicht.title}</h5>
              <ul className="space-y-1 text-sm">
                {t.entscheidungshilfe.selfCheck.nicht.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-500/10 rounded-lg">
              <h5 className="font-bold text-amber-600 mb-2">⚠️ {t.entscheidungshilfe.selfCheck.arzt.title}</h5>
              <ul className="space-y-1 text-sm">
                {t.entscheidungshilfe.selfCheck.arzt.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg">
              <h5 className="font-bold text-primary mb-2">✓ {t.entscheidungshilfe.selfCheck.geeignet.title}</h5>
              <ul className="space-y-1 text-sm">
                {t.entscheidungshilfe.selfCheck.geeignet.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Alert className="bg-primary/10 border-primary/20 my-6">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">{t.entscheidungshilfe.generalAdvice.title}</AlertTitle>
          <AlertDescription className="text-primary/80">
            {t.entscheidungshilfe.generalAdvice.text}
          </AlertDescription>
        </Alert>
      </section>

      <section className="mt-12">
        <h2>{t.warnzeichen.title}</h2>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-6">
          <h4 className="font-bold text-destructive mb-4">{t.warnzeichen.intro}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              {t.warnzeichen.items.slice(0, 3).map((item: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>{item.name}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm">
              {t.warnzeichen.items.slice(3).map((item: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>{item.name}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">{t.warnzeichen.note}</p>
        </div>
      </section>

      <section id="quellen" className="mt-12">
        <h2>{t.quellen.title}</h2>
        <div className="bg-muted/50 rounded-xl p-6">
          <ul className="space-y-3 text-sm">
            {t.quellen.items.map((item: any, idx: number) => (
              <li key={idx}>
                <span className="font-medium">{item.author}</span>{" "}
                <em>{item.title}</em>{" "}
                <span className="text-muted-foreground">{item.source}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.quellen.moreStudies}{" "}
            <Link href={`/${lang}/studien`} className="text-primary hover:underline">
              {t.quellen.studiesLink}
            </Link>.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h3>{t.navigation.continueTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {t.navigation.items.map((item: any, idx: number) => (
            <Link
              key={idx}
              href={item.href.replace('/de/', `/${lang}/`)}
              className="block p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
            >
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
