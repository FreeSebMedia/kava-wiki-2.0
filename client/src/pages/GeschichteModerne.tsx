import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function GeschichteModerne() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['geschichte-moderne'], lang });
  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const toc = [
    { id: "kolonialzeit", title: t('toc.0.title'), level: 1 },
    { id: "erster-kontakt", title: t('toc.1.title'), level: 2 },
    { id: "unterdrueckung", title: t('toc.2.title'), level: 2 },
    { id: "wissenschaft", title: t('toc.3.title'), level: 1 },
    { id: "boom", title: t('toc.4.title'), level: 1 },
    { id: "verbot-2002", title: t('toc.5.title'), level: 1 },
    { id: "hintergrund", title: t('toc.6.title'), level: 2 },
    { id: "folgen", title: t('toc.7.title'), level: 2 },
    { id: "rehabilitation", title: t('toc.8.title'), level: 1 },
    { id: "gerichtsurteile", title: t('toc.9.title'), level: 2 },
    { id: "who-stellungnahme", title: t('toc.10.title'), level: 2 },
    { id: "heute", title: t('toc.11.title'), level: 1 },
    { id: "dritte-welle", title: t('toc.12.title'), level: 2 },
  ];

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={tCommon('toc.title')}
      breadcrumbs={[
        { label: t('breadcrumbs.0.label'), href: `/${lang}` },
        { label: t('breadcrumbs.1.label'), href: `/${lang}/geschichte` },
        { label: t('breadcrumbs.2.label') },
      ]}
      lang={lang as Language}
    >
      <div className="prose prose-stone max-w-none dark:prose-invert">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('content.lead') }} />
        </GlossaryText>

        <section id="kolonialzeit">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.kolonialzeit.title')}</h2>

            <h3 id="erster-kontakt">{t('content.kolonialzeit.erster_kontakt.title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.erster_kontakt.text') }} />
          </GlossaryText>

          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
            {t('content.kolonialzeit.erster_kontakt.quote')}
            <footer className="text-sm mt-2 font-bold not-italic">— {t('content.kolonialzeit.erster_kontakt.quote_author')}</footer>
          </blockquote>

          <p dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.erster_kontakt.follow_up') }} />

          <h3 id="unterdrueckung" className="mt-8">{t('content.kolonialzeit.unterdrueckung.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.unterdrueckung.text1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.unterdrueckung.text2') }} />

          <div className="bg-destructive/10 rounded-lg p-6 my-8 not-prose border border-destructive/20">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {t('content.kolonialzeit.unterdrueckung.irony_title')}
            </h4>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.unterdrueckung.irony_text') }} />
          </div>

          <p dangerouslySetInnerHTML={{ __html: t('content.kolonialzeit.unterdrueckung.conclusion') }} />
        </section>

        <section id="wissenschaft" className="mt-12">
          <h2>{t('content.wissenschaft.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('content.wissenschaft.text1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('content.wissenschaft.text2') }} />
        </section>

        <section id="boom" className="mt-12">
          <h2>{t('content.boom.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('content.boom.text1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('content.boom.text2') }} />

          <div className="bg-muted/30 rounded-lg p-6 my-8 not-prose">
            <h3 className="text-lg font-bold mb-4">{t('content.boom.market_title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{t('content.boom.market_stats.0.value')}</div>
                <div className="text-sm text-muted-foreground">{t('content.boom.market_stats.0.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{t('content.boom.market_stats.1.value')}</div>
                <div className="text-sm text-muted-foreground">{t('content.boom.market_stats.1.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{t('content.boom.market_stats.2.value')}</div>
                <div className="text-sm text-muted-foreground">{t('content.boom.market_stats.2.label')}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="verbot-2002" className="mt-12">
          <h2>{t('content.verbot_2002.title')}</h2>

          <Alert className="my-8 border-destructive/50 bg-destructive/5">
            <XCircle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-destructive font-bold">{t('content.verbot_2002.alert_title')}</AlertTitle>
            <AlertDescription dangerouslySetInnerHTML={{ __html: t('content.verbot_2002.alert_text') }} />
          </Alert>

          <h3 id="hintergrund">{t('content.verbot_2002.hintergrund.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.verbot_2002.hintergrund.text') }} />

          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="p-4">Problem</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-medium">{t(`content.verbot_2002.hintergrund.problems.${idx}.title`)}</td>
                    <td className="p-4">{t(`content.verbot_2002.hintergrund.problems.${idx}.detail`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 id="folgen" className="mt-8">{t('content.verbot_2002.folgen.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.verbot_2002.folgen.text') }} />
          <ul>
            {[0, 1, 2, 3].map((idx) => (
              <li key={idx}>
                <strong>{t(`content.verbot_2002.folgen.consequences.${idx}.title`)}:</strong> {t(`content.verbot_2002.folgen.consequences.${idx}.text`)}
              </li>
            ))}
          </ul>
        </section>

        <section id="rehabilitation" className="mt-12">
          <h2>{t('content.rehabilitation.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('content.rehabilitation.text') }} />

          <h3 id="gerichtsurteile">{t('content.rehabilitation.gerichtsurteile.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.rehabilitation.gerichtsurteile.text') }} />

          <div className="relative border-l-2 border-green-500/30 ml-4 pl-8 space-y-8 my-8 not-prose">
            {[0, 1].map((idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 border-green-500 bg-background"></span>
                <h4 className="text-lg font-bold mt-0">{t(`content.rehabilitation.gerichtsurteile.timeline.${idx}.year`)}: {t(`content.rehabilitation.gerichtsurteile.timeline.${idx}.title`)}</h4>
                <p className="text-sm text-muted-foreground mt-1">{t(`content.rehabilitation.gerichtsurteile.timeline.${idx}.text`)}</p>
              </div>
            ))}
          </div>

          <h3 id="who-stellungnahme" className="mt-8">{t('content.rehabilitation.who_stellungnahme.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.rehabilitation.who_stellungnahme.text') }} />

          <Alert className="my-8 border-green-500/50 bg-green-500/5">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-700 font-bold">{t('content.rehabilitation.consensus.title')}</AlertTitle>
            <AlertDescription dangerouslySetInnerHTML={{ __html: t('content.rehabilitation.consensus.text') }} />
          </Alert>
        </section>

        <section id="heute" className="mt-12">
          <h2>{t('content.heute.title')}</h2>

          <h3 id="dritte-welle">{t('content.heute.dritte_welle.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('content.heute.dritte_welle.text') }} />
          <ul>
            {[0, 1, 2, 3].map((idx) => (
              <li key={idx}>
                <strong>{t(`content.heute.dritte_welle.trends.${idx}.title`)}:</strong> {t(`content.heute.dritte_welle.trends.${idx}.text`)}
              </li>
            ))}
          </ul>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            {[0, 1].map((idx) => (
              <div key={idx} className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h4 className="font-bold mb-2">{t(`content.heute.today_boxes.${idx}.title`)}</h4>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t(`content.heute.today_boxes.${idx}.text`) }} />
              </div>
            ))}
          </div>

          <p dangerouslySetInnerHTML={{ __html: t('content.heute.conclusion') }} />
        </section>
      </div>

      {/* Navigation to related topic */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('navigation.next_label')}</p>
        <Link href={`/${lang}${t('navigation.next_href')}`}>
          <div className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{t('navigation.next_title')}</h4>
              <p className="text-sm text-muted-foreground">{t('navigation.next_description')}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </WikiPageLayout>
  );
}
