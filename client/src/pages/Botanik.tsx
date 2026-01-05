import { Link } from "wouter";
import { useMemo } from "react";
import WikiPageLayout from "@/components/WikiPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowRight, Leaf, Microscope, Sprout } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

// Memoize namespaces to prevent re-renders
const NAMESPACES = ['botanik', 'common'];

export default function Botanik() {
  const { lang } = useLanguage();
  const { t, isLoading, translations } = useTranslations({ 
    namespaces: NAMESPACES, 
    lang 
  });

  // Build TOC from translations
  const toc = useMemo(() => [
    { id: "einfuehrung", title: t('botanik:toc.einfuehrung'), level: 1 },
    { id: "klassifikation", title: t('botanik:toc.klassifikation'), level: 1 },
    { id: "ueberblick", title: t('botanik:toc.ueberblick'), level: 1 },
    { id: "verbreitung", title: t('botanik:toc.verbreitung'), level: 1 },
    { id: "vertiefung", title: t('botanik:toc.vertiefung'), level: 1 },
  ], [t]);

  // Build subpages data with translations
  const subpages = useMemo(() => {
    const botanik = translations.botanik?.subpages || {};
    return [
      {
        title: botanik.pflanze?.title || t('botanik:subpages.pflanze.title'),
        description: botanik.pflanze?.description || t('botanik:subpages.pflanze.description'),
        icon: Leaf,
        href: `/${lang}/botanik/pflanze`,
        topics: botanik.pflanze?.topics || []
      },
      {
        title: botanik.morphologie?.title || t('botanik:subpages.morphologie.title'),
        description: botanik.morphologie?.description || t('botanik:subpages.morphologie.description'),
        icon: Microscope,
        href: `/${lang}/botanik/morphologie`,
        topics: botanik.morphologie?.topics || []
      },
      {
        title: botanik.anbau?.title || t('botanik:subpages.anbau.title'),
        description: botanik.anbau?.description || t('botanik:subpages.anbau.description'),
        icon: Sprout,
        href: `/${lang}/botanik/anbau`,
        topics: botanik.anbau?.topics || []
      }
    ];
  }, [translations, t, lang]);

  // Classification data from translations
  const classificationData = useMemo(() => {
    const c = translations.botanik?.classification || {};
    return [
      { rank: c.ranks?.reich || t('botanik:classification.ranks.reich'), value: c.values?.reich || t('botanik:classification.values.reich') },
      { rank: c.ranks?.abteilung || t('botanik:classification.ranks.abteilung'), value: c.values?.abteilung || t('botanik:classification.values.abteilung') },
      { rank: c.ranks?.ordnung || t('botanik:classification.ranks.ordnung'), value: c.values?.ordnung || t('botanik:classification.values.ordnung') },
      { rank: c.ranks?.familie || t('botanik:classification.ranks.familie'), value: c.values?.familie || t('botanik:classification.values.familie') },
      { rank: c.ranks?.gattung || t('botanik:classification.ranks.gattung'), value: <><em>Piper</em> ({lang === 'de' ? 'Pfeffer' : 'Pepper'})</> },
      { rank: c.ranks?.art || t('botanik:classification.ranks.art'), value: <em>Piper methysticum</em> }
    ];
  }, [translations, t, lang]);

  // Distribution regions from translations
  const regions = useMemo(() => {
    const r = translations.botanik?.distribution?.regions || {};
    return [
      { key: 'vanuatu', text: r.vanuatu || t('botanik:distribution.regions.vanuatu') },
      { key: 'fiji', text: r.fiji || t('botanik:distribution.regions.fiji') },
      { key: 'tonga', text: r.tonga || t('botanik:distribution.regions.tonga') },
      { key: 'samoa', text: r.samoa || t('botanik:distribution.regions.samoa') },
      { key: 'hawaii', text: r.hawaii || t('botanik:distribution.regions.hawaii') },
      { key: 'pohnpei', text: r.pohnpei || t('botanik:distribution.regions.pohnpei') },
    ];
  }, [translations, t]);

  // Show loading state while translations are being fetched
  if (isLoading) {
    return (
      <WikiPageLayout
        title="..."
        subtitle="..."
        category="..."
        lang={lang}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </WikiPageLayout>
    );
  }

  return (
    <WikiPageLayout
      title={t('botanik:page.title')}
      subtitle={t('botanik:page.subtitle')}
      category={t('botanik:page.category')}
      heroImage="/images/hero-home.jpg"
      toc={toc as any}
      tocTitle={t('common:toc.title')}
      lang={lang}
    >
      <GlossaryText lang={lang as Language}>
        <section id="einfuehrung">
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('botanik:intro.paragraph1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('botanik:intro.paragraph2') }} />
        </section>
      </GlossaryText>

      <section id="klassifikation" className="mt-12">
        <h2>{t('botanik:classification.title')}</h2>
        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t('botanik:classification.headers.rank')}</TableHead>
                <TableHead>{t('botanik:classification.headers.name')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classificationData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.rank}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <GlossaryText lang={lang as Language}>
          <p dangerouslySetInnerHTML={{ __html: t('botanik:classification.note') }} />
        </GlossaryText>
      </section>

      <section id="ueberblick" className="mt-12">
        <h2>{t('botanik:morphology.title')}</h2>
        <GlossaryText lang={lang as Language}>
          <p>{t('botanik:morphology.intro')}</p>
        </GlossaryText>
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-3">
              {translations.botanik?.morphology?.aboveGround?.title || t('botanik:morphology.aboveGround.title')}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.aboveGround.leaves') }} />
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.aboveGround.stems') }} />
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.aboveGround.flowers') }} />
            </ul>
          </div>
          <div className="bg-accent/10 p-6 rounded-xl border border-accent/30">
            <h3 className="text-lg font-bold mb-3">
              {translations.botanik?.morphology?.belowGround?.title || t('botanik:morphology.belowGround.title')}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.belowGround.stump') }} />
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.belowGround.roots') }} />
              <li dangerouslySetInnerHTML={{ __html: t('botanik:morphology.belowGround.weight') }} />
            </ul>
          </div>
        </div>
      </section>

      <section id="verbreitung" className="mt-12">
        <h2>{t('botanik:distribution.title')}</h2>
        <GlossaryText lang={lang as Language}>
          <p>{t('botanik:distribution.intro')}</p>
          <p>{t('botanik:distribution.regionsIntro')}</p>
          <ul>
            {regions.map((region) => (
              <li key={region.key} dangerouslySetInnerHTML={{ __html: region.text }} />
            ))}
          </ul>
        </GlossaryText>
      </section>

      <section id="vertiefung" className="mt-16">
        <h2>{t('botanik:subpages.title')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('botanik:subpages.intro')}
        </p>
        
        <div className="flex flex-col gap-4 max-w-3xl">
          {subpages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group border-border/50 bg-card/50">
                <div className="flex items-start gap-6 p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <page.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors flex items-center gap-2 mb-2">
                      {page.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{page.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {page.topics.map((topic: string, i: number) => (
                        <span key={i} className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
