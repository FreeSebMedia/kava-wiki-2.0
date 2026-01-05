import WikiPageLayout from "@/components/WikiPageLayout";
import { Link } from "wouter";
import { ArrowRight, Leaf, Globe, Clock, Calendar } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function Geschichte() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['geschichte'], lang });
  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  const toc = [
    { id: "ursprung", title: t('toc.ursprung'), level: 1 },
    { id: "expansion", title: t('toc.expansion'), level: 1 },
    { id: "kontakt", title: t('toc.kontakt'), level: 1 },
    { id: "kolonialzeit", title: t('toc.kolonialzeit'), level: 1 },
    { id: "moderne", title: t('toc.moderne'), level: 1 },
    { id: "unterseiten", title: t('toc.unterseiten'), level: 1 },
  ];

  const subpages = [
    {
      title: t('subpages.urspruenge.title'),
      description: t('subpages.urspruenge.description'),
      href: `/${lang}/geschichte/urspruenge`,
      icon: Leaf,
    },
    {
      title: t('subpages.verbreitung.title'),
      description: t('subpages.verbreitung.description'),
      href: `/${lang}/geschichte/verbreitung`,
      icon: Globe,
    },
    {
      title: t('subpages.moderne.title'),
      description: t('subpages.moderne.description'),
      href: `/${lang}/geschichte/moderne`,
      icon: Clock,
    },
    {
      title: t('subpages.zeitleiste.title'),
      description: t('subpages.zeitleiste.description'),
      href: `/${lang}/geschichte/zeitleiste`,
      icon: Calendar,
    },
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
        { label: t('breadcrumbs.geschichte') }
      ]}
      lang={lang as Language}
    >
      <GlossaryText lang={lang as Language}>
        <section id="ursprung">
          <p className="lead text-xl">
            {t('content.ursprung.lead')}
          </p>
          
          <h3>{t('content.ursprung.mythTitle')}</h3>
          <p>
            {t('content.ursprung.mythP1')}
          </p>
          <p>
            {t('content.ursprung.mythP2')}
          </p>
        </section>
      </GlossaryText>

      <GlossaryText lang={lang as Language}>
        <section id="expansion" className="mt-12">
          <h2>{t('content.expansion.title')}</h2>
          <p>
            {t('content.expansion.intro')}
          </p>
          <ul>
            <li><strong>Vanuatu:</strong> {t('content.expansion.vanuatu')}</li>
            <li><strong>Fiji:</strong> {t('content.expansion.fiji')}</li>
            <li><strong>Tonga & Samoa:</strong> {t('content.expansion.tongaSamoa')}</li>
            <li><strong>Hawaii:</strong> {t('content.expansion.hawaii')}</li>
          </ul>
        </section>
      </GlossaryText>

      <GlossaryText lang={lang as Language}>
        <section id="kontakt" className="mt-12">
          <h2>{t('content.kontakt.title')}</h2>
          <p>
            {t('content.kontakt.intro')}
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
            "{t('content.kontakt.quote')}"
            <footer className="text-sm mt-2 font-bold">— {t('content.kontakt.quoteAuthor')}</footer>
          </blockquote>
        </section>
      </GlossaryText>

      <GlossaryText lang={lang as Language}>
        <section id="kolonialzeit" className="mt-12">
          <h2>{t('content.kolonialzeit.title')}</h2>
          <p>
            {t('content.kolonialzeit.p1')}
          </p>
          <p>
            {t('content.kolonialzeit.p2')}
          </p>
        </section>
      </GlossaryText>

      <GlossaryText lang={lang as Language}>
        <section id="moderne" className="mt-12">
          <h2>{t('content.moderne.title')}</h2>
          <p>
            {t('content.moderne.p1')}
          </p>
          <p>
            {t('content.moderne.p2')}
          </p>
          <ul>
            <li><strong>Kava-Bars:</strong> {t('content.moderne.kavaBars')}</li>
            <li><strong>{lang === 'de' ? 'Wissenschaftliche Rehabilitierung' : 'Scientific Rehabilitation'}:</strong> {t('content.moderne.wissenschaft')}</li>
            <li><strong>{lang === 'de' ? 'Qualitätsbewusstsein' : 'Quality Awareness'}:</strong> {t('content.moderne.qualitaet')}</li>
          </ul>
        </section>
      </GlossaryText>

      {/* Subpages Section */}
      <section id="unterseiten" className="mt-16">
        <h2>{t('content.unterseiten.title')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('content.unterseiten.intro')}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 not-prose">
          {subpages.map((page) => (
            <Link key={page.href} href={page.href}>
              <div className="group h-full border rounded-xl p-6 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <page.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {page.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t('content.unterseiten.readMore')}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
