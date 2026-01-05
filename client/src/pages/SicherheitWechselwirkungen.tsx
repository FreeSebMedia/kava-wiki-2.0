import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, Pill, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";

export default function SicherheitWechselwirkungen() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['sicherheitWechselwirkungen'],
    lang
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const t = translations?.sicherheitWechselwirkungen;
  
  if (!t?.toc || !t?.meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading content</p>
      </div>
    );
  }

  const toc = [
    { id: "zusammenfassung", title: t.toc.zusammenfassung, level: 1 },
    { id: "cyp450", title: t.toc.cyp450, level: 1 },
    { id: "welche-enzyme", title: t.toc.welcheEnzyme, level: 2 },
    { id: "klinische-bedeutung", title: t.toc.klinischeBedeutung, level: 2 },
    { id: "hochrisiko", title: t.toc.hochrisiko, level: 1 },
    { id: "alkohol", title: t.toc.alkohol, level: 2 },
    { id: "benzodiazepine", title: t.toc.benzodiazepine, level: 2 },
    { id: "antipsychotika", title: t.toc.antipsychotika, level: 2 },
    { id: "antikoagulantien", title: t.toc.antikoagulantien, level: 2 },
    { id: "moderates-risiko", title: t.toc.moderatesRisiko, level: 1 },
    { id: "antidepressiva", title: t.toc.antidepressiva, level: 2 },
    { id: "antikonvulsiva", title: t.toc.antikonvulsiva, level: 2 },
    { id: "parkinson", title: t.toc.parkinson, level: 2 },
    { id: "hepatotoxisch", title: t.toc.hepatotoxisch, level: 2 },
    { id: "tabelle", title: t.toc.tabelle, level: 1 },
    { id: "empfehlungen", title: t.toc.empfehlungen, level: 1 },
    { id: "quellen", title: t.toc.quellen, level: 1 },
  ];

  const getRiskBadge = (risk: string) => {
    if (risk.includes("SEHR HOCH") || risk.includes("VERY HIGH") || risk.includes("MUY ALTO") || risk.includes("TRÈS ÉLEVÉ")) {
      return <span className="inline-block px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs font-bold whitespace-nowrap">{risk}</span>;
    } else if (risk.includes("HOCH") || risk.includes("HIGH") || risk.includes("ALTO") || risk.includes("ÉLEVÉ")) {
      return <span className="inline-block px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs font-bold whitespace-nowrap">{risk}</span>;
    } else if (risk.includes("MODERAT") || risk.includes("MODERATE") || risk.includes("MODERADO") || risk.includes("MODÉRÉ")) {
      return <span className="px-2 py-1 bg-amber-500 text-white rounded text-xs font-bold">{risk}</span>;
    } else if (risk.includes("GERING") || risk.includes("LOW") || risk.includes("BAJO") || risk.includes("FAIBLE")) {
      return <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">{risk}</span>;
    }
    return <span className="px-2 py-1 bg-amber-500 text-white rounded text-xs font-bold">{risk}</span>;
  };

  const getStrengthBadge = (strength: string) => {
    const isStrong = strength.toLowerCase().includes("stark") || strength.toLowerCase().includes("strong") || strength.toLowerCase().includes("fort");
    if (isStrong) {
      return <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-bold">{strength}</span>;
    }
    return <span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-bold">{strength}</span>;
  };

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
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-bold text-lg">{t.zusammenfassung.title}</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: t.zusammenfassung.intro }} />
            <ul className="space-y-2">
              {t.zusammenfassung.items.map((item: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-destructive-foreground">●</span>
                  <span><strong>{item.name}</strong> – {item.text}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      <section id="cyp450" className="mt-12">
        <GlossaryText lang={lang}>
          <h2 className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            {t.cyp450.title}
          </h2>
          <p>{t.cyp450.intro}</p>
        </GlossaryText>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="font-bold mb-3">{t.cyp450.importance.title}</h4>
          <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.cyp450.importance.text }} />
        </div>

        <h3 id="welche-enzyme">{t.enzyme.title}</h3>
        <p>{t.enzyme.intro}</p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                {t.enzyme.headers.map((h: string, idx: number) => (
                  <th key={idx} className="text-left p-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.enzyme.rows.map((row: any, idx: number) => (
                <tr key={idx} className="border-t border-border">
                  <td className="p-3 font-medium">{row.enzyme}</td>
                  <td className="p-3">{getStrengthBadge(row.strength)}</td>
                  <td className="p-3 text-muted-foreground">{row.substrates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 id="klinische-bedeutung">{t.klinischeBedeutung.title}</h3>
        <p>{t.klinischeBedeutung.text}</p>

        <Alert className="bg-blue-500/10 border-blue-500/20 my-6">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-600">{t.klinischeBedeutung.positive.title}</AlertTitle>
          <AlertDescription className="text-blue-600/80">
            {t.klinischeBedeutung.positive.text}
          </AlertDescription>
        </Alert>
      </section>

      <section id="hochrisiko" className="mt-12">
        <h2 className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          {t.hochrisiko.title}
        </h2>
        <p dangerouslySetInnerHTML={{ __html: t.hochrisiko.intro }} />

        <h3 id="alkohol" className="flex items-center gap-2 mt-8">
          <span className="text-destructive">⚠</span> {t.alkohol.title}
        </h3>
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">Risiko: {t.alkohol.risk}</h4>
          <p className="text-sm mb-4">{t.alkohol.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.alkohol.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">{point.number}</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 font-bold text-destructive">{t.alkohol.recommendation}</p>
        </div>

        <h3 id="benzodiazepine" className="flex items-center gap-2 mt-8">
          <span className="text-destructive">⚠</span> {t.benzodiazepine.title}
        </h3>
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">Risiko: {t.benzodiazepine.risk}</h4>
          <p className="text-sm mb-4">{t.benzodiazepine.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.benzodiazepine.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            <strong>{t.benzodiazepine.caseReportLabel}</strong> {t.benzodiazepine.caseReport}
          </p>
        </div>

        <h3 id="antipsychotika" className="flex items-center gap-2 mt-8">
          <span className="text-destructive">⚠</span> {t.antipsychotika.title}
        </h3>
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">Risiko: {t.antipsychotika.risk}</h4>
          <p className="text-sm mb-4">{t.antipsychotika.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.antipsychotika.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 id="antikoagulantien" className="flex items-center gap-2 mt-8">
          <span className="text-destructive">⚠</span> {t.antikoagulantien.title}
        </h3>
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-destructive mb-3">Risiko: {t.antikoagulantien.risk}</h4>
          <p className="text-sm mb-4">{t.antikoagulantien.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.antikoagulantien.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-destructive font-bold">•</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 font-bold text-destructive">{t.antikoagulantien.recommendation}</p>
        </div>
      </section>

      <section id="moderates-risiko" className="mt-12">
        <h2 className="flex items-center gap-2">
          <Info className="h-6 w-6 text-amber-500" />
          {t.moderatesRisiko.title}
        </h2>
        <p>{t.moderatesRisiko.intro}</p>

        <h3 id="antidepressiva" className="mt-8">{t.antidepressiva.title}</h3>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">Risiko: {t.antidepressiva.risk}</h4>
          <div className="space-y-4 text-sm">
            <div>
              <strong>{t.antidepressiva.ssri.title}</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                {t.antidepressiva.ssri.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>{t.antidepressiva.snri.title}</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                {t.antidepressiva.snri.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>{t.antidepressiva.mao.title}</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                {t.antidepressiva.mao.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h3 id="antikonvulsiva" className="mt-8">{t.antikonvulsiva.title}</h3>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">Risiko: {t.antikonvulsiva.risk}</h4>
          <p className="text-sm mb-3">{t.antikonvulsiva.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.antikonvulsiva.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-3 text-muted-foreground">{t.antikonvulsiva.note}</p>
        </div>

        <h3 id="parkinson" className="mt-8">{t.parkinson.title}</h3>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">Risiko: {t.parkinson.risk}</h4>
          <p className="text-sm mb-3">{t.parkinson.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.parkinson.points.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{point.label}:</strong> {point.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-3 font-bold text-amber-600">{t.parkinson.recommendation}</p>
        </div>

        <h3 id="hepatotoxisch" className="mt-8">{t.hepatotoxisch.title}</h3>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-4">
          <h4 className="font-bold text-amber-600 mb-3">Risiko: {t.hepatotoxisch.risk}</h4>
          <p className="text-sm mb-3">{t.hepatotoxisch.intro}</p>
          <ul className="space-y-2 text-sm">
            {t.hepatotoxisch.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>{item.name}:</strong> {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-3 text-muted-foreground">{t.hepatotoxisch.note}</p>
        </div>
      </section>

      <section id="tabelle" className="mt-12">
        <h2>{t.tabelle.title}</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                {t.tabelle.headers.map((h: string, idx: number) => (
                  <th key={idx} className="text-left p-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.tabelle.rows.map((row: any, idx: number) => {
                const isHighRisk = row.risk.includes("HOCH") || row.risk.includes("HIGH") || row.risk.includes("ALTO") || row.risk.includes("ÉLEVÉ");
                return (
                  <tr key={idx} className={`border-t border-border ${isHighRisk ? 'bg-destructive/5' : ''}`}>
                    <td className="p-3 font-medium">{row.class}</td>
                    <td className="p-3 text-muted-foreground">{row.examples}</td>
                    <td className="p-3">{getRiskBadge(row.risk)}</td>
                    <td className="p-3 text-muted-foreground">{row.mechanism}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="empfehlungen" className="mt-12">
        <h2 className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          {t.empfehlungen.title}
        </h2>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-6">
          <h4 className="font-bold text-primary mb-4">{t.empfehlungen.checklistTitle}</h4>
          <ul className="space-y-3">
            {t.empfehlungen.items.map((item: any, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold">{item.number}</span>
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
          <AlertTitle className="text-blue-600">{t.empfehlungen.professionalNote.title}</AlertTitle>
          <AlertDescription className="text-blue-600/80">
            {t.empfehlungen.professionalNote.text}
          </AlertDescription>
        </Alert>
      </section>

      <section id="quellen" className="mt-12">
        <h2>{t.quellen.title}</h2>
        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <ul className="space-y-2 text-sm">
            {t.quellen.items.map((item: any, idx: number) => (
              <li key={idx}>
                <strong>{item.author}</strong> {item.title}
                <span className="text-muted-foreground"> {item.source}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          {t.quellen.moreStudies}{" "}
          <Link href={`/${lang}/studien`} className="text-primary hover:underline">{t.quellen.studiesLink}</Link>.
        </p>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <h3 className="text-lg font-bold mb-4">{t.navigation.continueTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {t.navigation.items.map((item: any) => (
            <Link
              key={item.href}
              href={item.href.replace('/de/', `/${lang}/`)}
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
