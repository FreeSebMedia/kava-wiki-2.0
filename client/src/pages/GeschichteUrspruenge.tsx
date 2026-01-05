import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function GeschichteUrspruenge() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['geschichte-urspruenge'], lang });
  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  const toc = [
    { id: "vanuatu", title: t('toc.vanuatu'), level: 1 },
    { id: "domestikation", title: t('toc.domestikation'), level: 1 },
    { id: "selektion", title: t('toc.selektion'), level: 2 },
    { id: "mythen", title: t('toc.mythen'), level: 1 },
    { id: "ratte-legende", title: t('toc.rattelegende'), level: 2 },
    { id: "maerowari", title: t('toc.maerowari'), level: 2 },
    { id: "bedeutung", title: t('toc.bedeutung'), level: 1 },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

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
        { label: t('breadcrumbs.urspruenge') },
      ]}
      lang={lang as Language}
    >
      <div className="prose prose-stone max-w-none dark:prose-invert">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl text-muted-foreground">
            {t('content.lead')}
          </p>
        </GlossaryText>

        <section id="vanuatu">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.vanuatu.title')}</h2>
            <p>{t('content.vanuatu.p1')}</p>
          </GlossaryText>
          
          <div className="bg-muted/30 rounded-lg p-6 my-8 not-prose">
            <h3 className="text-lg font-bold mb-4">{t('content.vanuatu.stats.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">80+</div>
                <div className="text-sm text-muted-foreground">{t('content.vanuatu.stats.islands')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">80+</div>
                <div className="text-sm text-muted-foreground">{t('content.vanuatu.stats.varieties')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">3.000+</div>
                <div className="text-sm text-muted-foreground">{t('content.vanuatu.stats.years')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">{t('content.vanuatu.stats.languages')}</div>
              </div>
            </div>
          </div>

          <GlossaryText lang={lang as Language}>
            <p>{t('content.vanuatu.p2')}</p>
          </GlossaryText>
        </section>

        <section id="domestikation" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.domestikation.title')}</h2>
            <p>{t('content.domestikation.p1')}</p>
          </GlossaryText>

          <GlossaryText lang={lang as Language}>
            <h3 id="selektion">{t('content.domestikation.selektion.title')}</h3>
            <p>{t('content.domestikation.selektion.intro')}</p>
          </GlossaryText>

          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="p-4">{t('content.domestikation.selektion.tableHeaders.criterion')}</th>
                  <th className="p-4">{t('content.domestikation.selektion.tableHeaders.result')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(t('content.domestikation.selektion.criteria') as unknown as Array<{criterion: string, result: string}>)?.map((item, index) => (
                  <tr key={index}>
                    <td className="p-4 font-medium">{item.criterion}</td>
                    <td className="p-4">{item.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <GlossaryText lang={lang as Language}>
            <p>{t('content.domestikation.p2')}</p>
          </GlossaryText>

          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
            "{t('content.domestikation.quote')}"
            <footer className="text-sm mt-2 font-bold not-italic">— {t('content.domestikation.quoteAuthor')}</footer>
          </blockquote>
        </section>

        <section id="mythen" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.mythen.title')}</h2>
            <p>{t('content.mythen.intro')}</p>

            <h3 id="ratte-legende">{t('content.mythen.rattelegende.title')}</h3>
            <p>{t('content.mythen.rattelegende.p1')}</p>
            <p>{t('content.mythen.rattelegende.p2')}</p>

            <h3 id="maerowari" className="mt-8">{t('content.mythen.maerowari.title')}</h3>
            <p>{t('content.mythen.maerowari.p1')}</p>
            <p>{t('content.mythen.maerowari.p2')}</p>
          </GlossaryText>
        </section>

        <section id="bedeutung" className="mt-12">
          <GlossaryText lang={lang as Language}>
            <h2>{t('content.bedeutung.title')}</h2>
            <p>{t('content.bedeutung.intro')}</p>
          </GlossaryText>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-muted/30 rounded-lg p-6">
              <h4 className="font-bold mb-2">{t('content.bedeutung.cards.geschenk.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('content.bedeutung.cards.geschenk.text')}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h4 className="font-bold mb-2">{t('content.bedeutung.cards.verantwortung.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('content.bedeutung.cards.verantwortung.text')}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h4 className="font-bold mb-2">{t('content.bedeutung.cards.identitaet.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('content.bedeutung.cards.identitaet.text')}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h4 className="font-bold mb-2">{t('content.bedeutung.cards.wissen.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('content.bedeutung.cards.wissen.text')}</p>
            </div>
          </div>
        </section>

      </div>
      {/* Navigation to next chapter */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('navigation.nextChapter')}</p>
        <Link href={`/${lang}/geschichte/verbreitung`}>
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
