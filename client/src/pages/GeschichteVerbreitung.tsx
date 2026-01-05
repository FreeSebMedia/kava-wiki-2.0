import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function GeschichteVerbreitung() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['geschichte-verbreitung'], lang });
  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const toc = [
    { id: "lapita", title: t('toc.lapita'), level: 1 },
    { id: "canoe-plants", title: t('toc.canoePlants'), level: 1 },
    { id: "melanesien", title: t('toc.melanesien'), level: 1 },
    { id: "polynesien", title: t('toc.polynesien'), level: 1 },
    { id: "fiji", title: t('toc.fiji'), level: 2 },
    { id: "tonga-samoa", title: t('toc.tongaSamoa'), level: 2 },
    { id: "hawaii", title: t('toc.hawaii'), level: 2 },
    { id: "mikronesien", title: t('toc.mikronesien'), level: 1 },
    { id: "kulturelle-anpassung", title: t('toc.kulturelleAnpassung'), level: 1 },
  ];

  const timelineEvents = t('content.lapita.timeline.events') as unknown as Array<{date: string, description: string}>;
  const canoePlantsTable = t('content.canoePlants.table') as unknown as {headers: string[], rows: string[][]};
  const kulturTable = t('content.kulturelleAnpassung.table') as unknown as {headers: string[], rows: string[][]};

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-roots.jpg"
      toc={toc as any}
      tocTitle={tCommon('toc.title')}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.geschichte'), href: `/${lang}/geschichte` },
        { label: t('breadcrumbs.verbreitung') },
      ]}
      lang={lang as Language}
    >
      <div className="prose prose-stone max-w-none dark:prose-invert">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('content.lead') }} />
        </GlossaryText>

        <section id="lapita">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.lapita.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('content.lapita.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.lapita.p2') }} />
          </GlossaryText>

          <div className="bg-muted/30 rounded-lg p-6 my-8 not-prose">
            <h3 className="text-lg font-bold mb-4">{t('content.lapita.timeline.title')}</h3>
            <div className="relative border-l-2 border-primary/30 ml-4 pl-6 space-y-6">
              {timelineEvents && Array.isArray(timelineEvents) && timelineEvents.map((event, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary"></span>
                  <div className="text-sm font-bold">{event.date}</div>
                  <div className="text-sm text-muted-foreground">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="canoe-plants" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.canoePlants.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('content.canoePlants.p1') }} />
          </GlossaryText>

          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  {canoePlantsTable && canoePlantsTable.headers && canoePlantsTable.headers.map((header, index) => (
                    <th key={index} className="p-4">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {canoePlantsTable && canoePlantsTable.rows && canoePlantsTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={row[0] === 'Kava' ? 'bg-primary/5' : ''}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? (row[0] === 'Kava' ? 'font-bold text-primary' : 'font-medium') : ''} ${row[0] === 'Kava' && cellIndex === 2 ? 'font-medium' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <GlossaryText lang={lang as Language}>
            <p dangerouslySetInnerHTML={{ __html: t('content.canoePlants.p2') }} />
          </GlossaryText>
        </section>

        <section id="melanesien" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.melanesien.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('content.melanesien.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.melanesien.p2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.melanesien.p3') }} />
          </GlossaryText>
        </section>

        <section id="polynesien" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.polynesien.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.intro') }} />

            <h3 id="fiji">{t('content.polynesien.fiji.title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.fiji.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.fiji.p2') }} />
          </GlossaryText>

          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
            "{t('content.polynesien.fiji.quote')}"
          </blockquote>

          <GlossaryText lang={lang as Language}>
            <h3 id="tonga-samoa" className="mt-8">{t('content.polynesien.tongaSamoa.title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.tongaSamoa.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.tongaSamoa.p2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.tongaSamoa.p3') }} />

            <h3 id="hawaii" className="mt-8">{t('content.polynesien.hawaii.title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.hawaii.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.polynesien.hawaii.p2') }} />
          </GlossaryText>
        </section>

        <section id="mikronesien" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.mikronesien.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('content.mikronesien.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('content.mikronesien.p2') }} />
          </GlossaryText>
        </section>

        <section id="kulturelle-anpassung" className="mt-12">
          <h2>{t('content.kulturelleAnpassung.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('content.kulturelleAnpassung.intro') }} />

          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  {kulturTable && kulturTable.headers && kulturTable.headers.map((header, index) => (
                    <th key={index} className="p-4">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {kulturTable && kulturTable.rows && kulturTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? 'font-medium' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p dangerouslySetInnerHTML={{ __html: t('content.kulturelleAnpassung.conclusion') }} />
        </section>

      </div>
      {/* Navigation to next chapter */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('navigation.nextChapter')}</p>
        <Link href={`/${lang}/geschichte/moderne`}>
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
