import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";

export default function InhaltsstoffeChemotypen() {
  const [location] = useLocation();
  const pathLang = location.split('/')[1];
  const lang = (pathLang in languages ? pathLang : 'de') as Language;
  
  const { t, isLoading } = useTranslations({ 
    namespaces: ['inhaltsstoffeChemotypen'], 
    lang 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const toc = [
    { id: "einfuehrung", title: t('toc.einfuehrung'), level: 1 },
    { id: "nummerierung", title: t('toc.nummerierung'), level: 1 },
    { id: "lesen", title: t('toc.lesen'), level: 1 },
    { id: "beispiele", title: t('toc.beispiele'), level: 2 },
    { id: "noble-tudei", title: t('toc.nobleTudei'), level: 1 },
    { id: "erkennung", title: t('toc.erkennung'), level: 2 },
    { id: "wirkungsprofile", title: t('toc.wirkungsprofile'), level: 1 },
    { id: "heady", title: t('toc.heady'), level: 2 },
    { id: "heavy", title: t('toc.heavy'), level: 2 },
    { id: "balanced", title: t('toc.balanced'), level: 2 },
    { id: "qualitaet", title: t('toc.qualitaet'), level: 1 },
  ];

  const nummerierungTableData = t('nummerierung.tableData') || [];
  const nobleTudeiTableData = t('nobleTudei.tableData') || [];
  const beispieleExamples = t('beispiele.examples') || [];
  const lesenPositions = t('lesen.positions') || [];
  const erkennungWarnings = t('erkennung.warnings') || [];
  const erkennungSafeIndicators = t('erkennung.safeIndicators') || [];

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={t('toc.title') as string}
      lang={lang}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.inhaltsstoffe'), href: `/${lang}/inhaltsstoffe` },
        { label: t('breadcrumbs.current') },
      ]}
    >
      <section id="einfuehrung">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('einfuehrung.paragraph1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('einfuehrung.paragraph2') }} />
        </GlossaryText>
      </section>

      <section id="nummerierung" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t('nummerierung.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('nummerierung.intro') }} />
        </GlossaryText>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">{t('nummerierung.tableHeaders.digit')}</TableHead>
                <TableHead>{t('nummerierung.tableHeaders.kavalacton')}</TableHead>
                <TableHead>{t('nummerierung.tableHeaders.abbreviation')}</TableHead>
                <TableHead>{t('nummerierung.tableHeaders.effect')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(nummerierungTableData) && nummerierungTableData.map((row: any, index: number) => {
                const bgClass = row.digit === "4" ? "bg-green-500/20" : row.digit === "5" ? "bg-amber-500/20" : "bg-primary/20";
                const textClass = row.digit === "4" ? "text-green-600 dark:text-green-400" : row.digit === "5" ? "text-amber-600 dark:text-amber-400" : "text-primary";
                return (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${bgClass} font-mono font-bold ${textClass}`}>
                        {row.digit}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.abbreviation}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{row.effect}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('nummerierung.mnemonic') }} />
        </Alert>
      </section>

      <section id="lesen" className="mt-12">
        <h2>{t('lesen.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('lesen.intro') }} />
        
        <div className="grid grid-cols-6 gap-2 my-8">
          {Array.isArray(lesenPositions) && lesenPositions.map((pos: any, index: number) => (
            <div key={index} className="bg-muted rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">{pos.rank}</div>
              <div className="text-2xl font-mono font-bold text-primary">{pos.example?.split(' = ')[0]}</div>
              <div className="text-xs text-muted-foreground mt-1">{pos.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="beispiele" className="mt-12">
        <h2>{t('beispiele.title')}</h2>
        
        <div className="space-y-4 my-6">
          {Array.isArray(beispieleExamples) && beispieleExamples.map((ex: any, index: number) => {
            const borderClass = ex.type === "noble" ? "border-green-500/30" : ex.type === "tudei" ? "border-amber-500/30" : "border-red-500/30";
            const bgClass = ex.type === "noble" ? "bg-green-500/10" : ex.type === "tudei" ? "bg-amber-500/10" : "bg-red-500/10";
            const textClass = ex.type === "noble" ? "text-green-600 dark:text-green-400" : ex.type === "tudei" ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";
            
            return (
              <div key={index} className={`border-2 ${borderClass} rounded-xl p-6 ${bgClass}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`font-mono text-2xl font-bold ${textClass} tracking-wider`}>
                      {ex.code}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{ex.label}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: ex.description }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="noble-tudei" className="mt-12">
        <h2>{t('nobleTudei.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('nobleTudei.intro') }} />
        
        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('nobleTudei.tableHeaders.criterion')}</TableHead>
                <TableHead className="bg-green-500/10">{t('nobleTudei.tableHeaders.noble')}</TableHead>
                <TableHead className="bg-amber-500/10">{t('nobleTudei.tableHeaders.tudei')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(nobleTudeiTableData) && nobleTudeiTableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.criterion}</TableCell>
                  <TableCell className="bg-green-500/5">{row.noble}</TableCell>
                  <TableCell className="bg-amber-500/5">{row.tudei}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="erkennung" className="mt-12">
        <h2>{t('erkennung.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('erkennung.intro') }} />
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
            <h4 className="font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
              <XCircle className="h-5 w-5" />
              {t('erkennung.warningTitle')}
            </h4>
            <ul className="space-y-2">
              {Array.isArray(erkennungWarnings) && erkennungWarnings.map((warning: string, i: number) => (
                <li key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: warning }} />
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <h4 className="font-semibold flex items-center gap-2 text-green-600 dark:text-green-400 mb-4">
              <CheckCircle className="h-5 w-5" />
              {t('erkennung.safeTitle')}
            </h4>
            <ul className="space-y-2">
              {Array.isArray(erkennungSafeIndicators) && erkennungSafeIndicators.map((indicator: string, i: number) => (
                <li key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: indicator }} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="wirkungsprofile" className="mt-12">
        <h2>{t('wirkungsprofile.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('wirkungsprofile.intro') }} />
      </section>

      {/* Heady */}
      <section id="heady" className="mt-8">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{t('heady.icon')}</span>
            <div>
              <h3 className="text-xl font-bold mb-0">{t('heady.title')}</h3>
              <span className="text-sm font-mono text-muted-foreground">{t('heady.chemotypes')}</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('heady.description') }} />
          <h4 className="font-semibold mb-2">{t('heady.idealTitle')}</h4>
          <ul className="space-y-1 text-sm mb-4">
            {Array.isArray(t('heady.idealFor')) && (t('heady.idealFor') as string[]).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('heady.examples') }} />
        </div>
      </section>

      {/* Heavy */}
      <section id="heavy" className="mt-6">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{t('heavy.icon')}</span>
            <div>
              <h3 className="text-xl font-bold mb-0">{t('heavy.title')}</h3>
              <span className="text-sm font-mono text-muted-foreground">{t('heavy.chemotypes')}</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('heavy.description') }} />
          <h4 className="font-semibold mb-2">{t('heavy.idealTitle')}</h4>
          <ul className="space-y-1 text-sm mb-4">
            {Array.isArray(t('heavy.idealFor')) && (t('heavy.idealFor') as string[]).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('heavy.examples') }} />
        </div>
      </section>

      {/* Balanced */}
      <section id="balanced" className="mt-6">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{t('balanced.icon')}</span>
            <div>
              <h3 className="text-xl font-bold mb-0">{t('balanced.title')}</h3>
              <span className="text-sm font-mono text-muted-foreground">{t('balanced.chemotypes')}</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('balanced.description') }} />
          <h4 className="font-semibold mb-2">{t('balanced.idealTitle')}</h4>
          <ul className="space-y-1 text-sm mb-4">
            {Array.isArray(t('balanced.idealFor')) && (t('balanced.idealFor') as string[]).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('balanced.examples') }} />
        </div>
      </section>

      <section id="qualitaet" className="mt-12">
        <h2>{t('qualitaet.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('qualitaet.intro') }} />
        
        <Alert className="bg-primary/5 border-primary/20 my-6">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>{t('qualitaet.lawTitle')}</strong>
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('qualitaet.lawText') }} />
            <p className="text-sm text-muted-foreground mt-2">{t('qualitaet.lawNote')}</p>
          </AlertDescription>
        </Alert>
        
        <div className="bg-muted/50 p-6 rounded-xl border border-border">
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: t('qualitaet.consumerTip') }} />
        </div>
      </section>

      {/* Navigation */}
      <section className="mt-16 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">{t('navigation.nextCategory')}</h3>
        <Link href={`/${lang}/sorten`}>
          <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">{t('navigation.sortenTitle')}</h4>
                <p className="text-sm text-muted-foreground">{t('navigation.sortenDescription')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>
    </WikiPageLayout>
  );
}
