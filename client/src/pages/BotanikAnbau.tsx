import WikiPageLayout from "@/components/WikiPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import GlossaryText from "@/components/GlossaryText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";

export default function BotanikAnbau() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['botanik-anbau'], lang });

  const toc = [
    { id: "vermehrung", title: t('toc.vermehrung'), level: 1 },
    { id: "stecklinge", title: t('toc.stecklinge'), level: 2 },
    { id: "klima", title: t('toc.klima'), level: 1 },
    { id: "boden", title: t('toc.boden'), level: 1 },
    { id: "pflege", title: t('toc.pflege'), level: 1 },
    { id: "ernte", title: t('toc.ernte'), level: 1 },
    { id: "qualitaet", title: t('toc.qualitaet'), level: 2 },
    { id: "anbauregionen", title: t('toc.anbauregionen'), level: 1 },
  ];

  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const advantageItems = t('vermehrung.advantages.items') as string[];
  const challengeItems = t('vermehrung.challenges.items') as string[];
  const stecklingeSteps = t('vermehrung.stecklinge.steps') as Array<{number: string; title: string; description: string}>;
  const klimaRows = t('klima.table.rows') as Array<{parameter: string; optimal: string; tolerance: string; note: string}>;
  const idealItems = t('boden.ideal.items') as Array<{label: string; value: string}>;
  const avoidItems = t('boden.avoid.items') as Array<{label: string; value: string}>;
  const pflegeRows = t('pflege.table.rows') as Array<{phase: string; period: string; tasks: string; notes: string}>;
  const ernteRows = t('ernte.qualitaet.table.rows') as Array<{age: string; content: string; quality: string; qualityColor: string; usage: string}>;
  const regionRows = t('anbauregionen.table.rows') as Array<{region: string; varieties: string; characteristics: string; production: string; highlight?: boolean}>;

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-home.jpg"
      toc={toc as any}
      tocTitle={tCommon('toc.title')}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.botanik'), href: `/${lang}/botanik` },
        { label: t('breadcrumbs.current') }
      ]}
    >
      <section id="intro">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('intro.paragraph1') }} />
        </GlossaryText>
      </section>

      <section id="vermehrung" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t('vermehrung.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('vermehrung.paragraph1') }} />
        </GlossaryText>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200 m-0">{t('vermehrung.advantages.title')}</h3>
            </div>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-2 mb-0">
              {Array.isArray(advantageItems) && advantageItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 m-0">{t('vermehrung.challenges.title')}</h3>
            </div>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2 mb-0">
              {Array.isArray(challengeItems) && challengeItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div id="stecklinge" className="bg-muted/30 p-6 rounded-xl border border-border my-8">
          <h3 className="mt-0 text-primary">{t('vermehrung.stecklinge.title')}</h3>
          <p>{t('vermehrung.stecklinge.paragraph1')}</p>
          
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {Array.isArray(stecklingeSteps) && stecklingeSteps.map((step, index) => (
              <div key={index} className="bg-background p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-2">{step.number}</div>
                <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-xs text-muted-foreground mb-0">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="klima" className="mt-12">
        <h2>{t('klima.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('klima.paragraph1') }} />

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t('klima.table.headers.parameter')}</TableHead>
                <TableHead>{t('klima.table.headers.optimal')}</TableHead>
                <TableHead>{t('klima.table.headers.tolerance')}</TableHead>
                <TableHead>{t('klima.table.headers.note')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(klimaRows) && klimaRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.parameter}</TableCell>
                  <TableCell className="text-primary font-medium">{row.optimal}</TableCell>
                  <TableCell>{row.tolerance}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Alert className="my-6">
          <Info className="h-4 w-4" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('klima.alert') }} />
        </Alert>
      </section>

      <section id="boden" className="mt-12">
        <h2>{t('boden.title')}</h2>
        <p>{t('boden.paragraph1')}</p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4 text-primary">{t('boden.ideal.title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-3 mb-0">
              {Array.isArray(idealItems) && idealItems.map((item, index) => (
                <li key={index}>
                  <strong className="text-foreground">{item.label}</strong> {item.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4 text-destructive">{t('boden.avoid.title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-3 mb-0">
              {Array.isArray(avoidItems) && avoidItems.map((item, index) => (
                <li key={index}>
                  <strong className="text-foreground">{item.label}</strong> {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p dangerouslySetInnerHTML={{ __html: t('boden.paragraph2') }} />
      </section>

      <section id="pflege" className="mt-12">
        <h2>{t('pflege.title')}</h2>
        <p>{t('pflege.paragraph1')}</p>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('pflege.table.headers.phase')}</TableHead>
                <TableHead>{t('pflege.table.headers.period')}</TableHead>
                <TableHead>{t('pflege.table.headers.tasks')}</TableHead>
                <TableHead>{t('pflege.table.headers.notes')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(pflegeRows) && pflegeRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.phase}</TableCell>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.tasks}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="ernte" className="mt-12">
        <h2>{t('ernte.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('ernte.paragraph1') }} />

        <div id="qualitaet" className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="mt-0 text-primary">{t('ernte.qualitaet.title')}</h3>
          
          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('ernte.qualitaet.table.headers.age')}</TableHead>
                  <TableHead>{t('ernte.qualitaet.table.headers.content')}</TableHead>
                  <TableHead>{t('ernte.qualitaet.table.headers.quality')}</TableHead>
                  <TableHead>{t('ernte.qualitaet.table.headers.usage')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(ernteRows) && ernteRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.age}</TableCell>
                    <TableCell>{row.content}</TableCell>
                    <TableCell className={`text-${row.qualityColor}-600`}>{row.quality}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{row.usage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-lg">
          "{t('ernte.quote.text')}"
          <footer className="text-sm text-muted-foreground mt-2 not-italic">— {t('ernte.quote.author')}</footer>
        </blockquote>
      </section>

      <section id="anbauregionen" className="mt-12">
        <h2>{t('anbauregionen.title')}</h2>
        <p>{t('anbauregionen.paragraph1')}</p>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('anbauregionen.table.headers.region')}</TableHead>
                <TableHead>{t('anbauregionen.table.headers.varieties')}</TableHead>
                <TableHead>{t('anbauregionen.table.headers.characteristics')}</TableHead>
                <TableHead>{t('anbauregionen.table.headers.production')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(regionRows) && regionRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.region}</TableCell>
                  <TableCell>{row.varieties}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.characteristics}</TableCell>
                  <TableCell className={row.highlight ? "text-primary font-medium" : ""}>{row.production}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p dangerouslySetInnerHTML={{ __html: t('anbauregionen.paragraph2') }} />
      </section>

      {/* Navigation to next section */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('navigation.nextCategory')}</p>
        <Link href={`/${lang}/geschichte`}>
          <div className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{t('navigation.nextTitle')}</h4>
              <p className="text-sm text-muted-foreground">{t('navigation.nextSubtitle')}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </WikiPageLayout>
  );
}
