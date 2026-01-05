import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight, Users, Sparkles, Globe, Building2, Landmark, Heart, Map, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function Kultur() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ namespaces: ['kultur'], lang });
  const { t: tCommon } = useTranslations({ namespaces: ['common'], lang });

  const toc = [
    { id: "einfuehrung", title: t('toc.einfuehrung'), level: 1 },
    { id: "bedeutung", title: t('toc.bedeutung'), level: 1 },
    { id: "zeremonien", title: t('toc.zeremonien'), level: 1 },
    { id: "nakamal", title: t('toc.nakamal'), level: 1 },
    { id: "politik", title: t('toc.politik'), level: 1 },
    { id: "kolonial", title: t('toc.kolonial'), level: 1 },
    { id: "moderne", title: t('toc.moderne'), level: 1 },
    { id: "kapitel", title: t('toc.kapitel'), level: 1 },
  ];

  const subpages = [
    {
      title: t('subpages.zeremonien.title'),
      path: `/${lang}/kultur/zeremonien`,
      description: t('subpages.zeremonien.description'),
      icon: Sparkles,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: t('subpages.nakamal.title'),
      path: `/${lang}/kultur/nakamal`,
      description: t('subpages.nakamal.description'),
      icon: Building2,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: t('subpages.moderne.title'),
      path: `/${lang}/kultur/moderne`,
      description: t('subpages.moderne.description'),
      icon: Globe,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: t('subpages.weltkarte.title'),
      path: `/${lang}/kultur/weltkarte`,
      description: t('subpages.weltkarte.description'),
      icon: Map,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: t('subpages.kavaBars.title'),
      path: `/${lang}/kultur/kava-bars`,
      description: t('subpages.kavaBars.description'),
      icon: Search,
      color: "bg-rose-500/10 text-rose-600",
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
      heroImage="/images/hero-ceremony.jpg"
      toc={toc as any}
      tocTitle={tCommon('toc.title')}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.kultur') }
      ]}
      lang={lang as Language}
    >
      {/* Introduction */}
      <section id="einfuehrung">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t('intro.paragraph1') }} />
          <p className="mb-4">{t('intro.paragraph2')}</p>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('intro.paragraph3') }} />
        </GlossaryText>
      </section>

      {/* Social & Spiritual Significance */}
      <section id="bedeutung" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('bedeutung.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('bedeutung.paragraph1') }} />
          
          <div className="bg-muted/30 rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t('bedeutung.usesTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.konflikt.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.konflikt.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.gastfreundschaft.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.gastfreundschaft.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.uebergaenge.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.uebergaenge.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.ahnen.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.ahnen.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.politik.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.politik.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">●</span>
                <div>
                  <span className="font-medium">{t('bedeutung.uses.spirituell.title')}</span>
                  <p className="text-sm text-muted-foreground">{t('bedeutung.uses.spirituell.description')}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('bedeutung.paragraph2') }} />

          <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t('bedeutung.quote')}"
          </blockquote>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('bedeutung.paragraph3') }} />
        </GlossaryText>
      </section>

      {/* Ceremonies Overview */}
      <section id="zeremonien" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('zeremonien.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('zeremonien.intro') }} />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Fiji */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇫🇯</span>
                <h3 className="font-semibold text-lg">{t('zeremonien.fiji.title')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t('zeremonien.fiji.paragraph1') }} />
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('zeremonien.fiji.paragraph2') }} />
            </div>

            {/* Tonga */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇹🇴</span>
                <h3 className="font-semibold text-lg">{t('zeremonien.tonga.title')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t('zeremonien.tonga.paragraph1')}</p>
              <p className="text-sm text-muted-foreground">{t('zeremonien.tonga.paragraph2')}</p>
            </div>

            {/* Samoa */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇼🇸</span>
                <h3 className="font-semibold text-lg">{t('zeremonien.samoa.title')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t('zeremonien.samoa.paragraph1') }} />
              <p className="text-sm text-muted-foreground">{t('zeremonien.samoa.paragraph2')}</p>
            </div>

            {/* Vanuatu */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇻🇺</span>
                <h3 className="font-semibold text-lg">{t('zeremonien.vanuatu.title')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t('zeremonien.vanuatu.paragraph1')}</p>
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('zeremonien.vanuatu.paragraph2') }} />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <Link href={`/${lang}/kultur/zeremonien`} className="text-primary hover:underline inline-flex items-center gap-1">
              {t('zeremonien.moreLink')} <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </GlossaryText>
      </section>

      {/* Nakamal */}
      <section id="nakamal" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('nakamal.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('nakamal.paragraph1') }} />
          
          <div className="bg-emerald-500/5 rounded-xl p-6 my-6 border border-emerald-500/20">
            <h3 className="font-semibold mb-4 text-emerald-700 dark:text-emerald-400">{t('nakamal.atmosphereTitle')}</h3>
            <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('nakamal.atmosphereParagraph1') }} />
            <p className="text-muted-foreground">{t('nakamal.atmosphereParagraph2')}</p>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('nakamal.paragraph2') }} />

          <p className="text-sm text-muted-foreground">
            <Link href={`/${lang}/kultur/nakamal`} className="text-primary hover:underline inline-flex items-center gap-1">
              {t('nakamal.moreLink')} <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </GlossaryText>
      </section>

      {/* Politics & Diplomacy */}
      <section id="politik" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Landmark className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('politik.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('politik.paragraph1') }} />

          <div className="bg-blue-500/5 rounded-xl p-6 my-6 border border-blue-500/20">
            <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-400">{t('politik.symbolTitle')}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <span className="font-medium">{t('politik.symbols.sprache.title')}</span>
                <p className="text-sm text-muted-foreground">{t('politik.symbols.sprache.description')}</p>
              </div>
              <div>
                <span className="font-medium">{t('politik.symbols.respekt.title')}</span>
                <p className="text-sm text-muted-foreground">{t('politik.symbols.respekt.description')}</p>
              </div>
              <div>
                <span className="font-medium">{t('politik.symbols.augenhoehe.title')}</span>
                <p className="text-sm text-muted-foreground">{t('politik.symbols.augenhoehe.description')}</p>
              </div>
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('politik.paragraph2') }} />

          <p className="mb-4">{t('politik.paragraph3')}</p>

          <blockquote className="border-l-4 border-blue-500/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t('politik.quote')}"
          </blockquote>
        </GlossaryText>
      </section>

      {/* Colonial Influences */}
      <section id="kolonial" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('kolonial.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4">{t('kolonial.paragraph1')}</p>

          <div className="bg-orange-500/5 rounded-xl p-6 my-6 border border-orange-500/20">
            <h3 className="font-semibold mb-4 text-orange-700 dark:text-orange-400">{t('kolonial.timelineTitle')}</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.vor1600.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.vor1600.description')}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.1600_1800.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.1600_1800.description')}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.1800_1900.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.1800_1900.description')}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.1900_1945.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.1900_1945.description')}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.1945_1980.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.1945_1980.description')}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-medium text-sm">{t('kolonial.timeline.1980_heute.period')}</div>
                <div className="text-sm text-muted-foreground">{t('kolonial.timeline.1980_heute.description')}</div>
              </div>
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('kolonial.paragraph2') }} />

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('kolonial.paragraph3') }} />

          <blockquote className="border-l-4 border-orange-500/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t('kolonial.quote')}"
          </blockquote>
        </GlossaryText>
      </section>

      {/* Modern Kava Culture */}
      <section id="moderne" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Globe className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t('moderne.title')}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('moderne.paragraph1') }} />

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-3">{t('moderne.pazifik.title')}</h3>
              <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t('moderne.pazifik.paragraph1') }} />
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('moderne.pazifik.paragraph2') }} />
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-3">{t('moderne.westen.title')}</h3>
              <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t('moderne.westen.paragraph1') }} />
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('moderne.westen.paragraph2') }} />
            </div>
          </div>

          <p className="mb-4">
            {t('moderne.paragraph2').split('Noble Kava')[0]}
            <Link href={`/${lang}/sorten/noble-tudei`} className="text-primary hover:underline">Noble Kava</Link>
            {t('moderne.paragraph2').split('Noble Kava')[1]}
          </p>

          <blockquote className="border-l-4 border-purple-500/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t('moderne.quote')}"
          </blockquote>

          <p className="text-sm text-muted-foreground">
            <Link href={`/${lang}/kultur/moderne`} className="text-primary hover:underline inline-flex items-center gap-1">
              {t('moderne.moreLink')} <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </GlossaryText>
      </section>

      {/* Chapter Navigation */}
      <section id="kapitel" className="mt-16">
        <h2 className="text-2xl font-serif font-bold mb-6">{t('kapitel.title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {subpages.map((page) => (
            <Link key={page.path} href={page.path}>
              <div className="group bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                <div className={`p-2 rounded-lg ${page.color} w-fit mb-4`}>
                  <page.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{page.title}</h3>
                <p className="text-sm text-muted-foreground">{page.description}</p>
                <div className="mt-4 text-primary text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('kapitel.readMore')} <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related Links */}
      <section className="mt-16 pt-8 border-t border-border/50">
        <h3 className="font-semibold mb-4">{t('related.title')}</h3>
        <div className="flex flex-wrap gap-2">
          <Link href={`/${lang}/geschichte`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            {t('related.geschichte')}
          </Link>
          <Link href={`/${lang}/zubereitung/traditionell`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            {t('related.zubereitung')}
          </Link>
          <Link href={`/${lang}/sorten/vanuatu`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            {t('related.sorten')}
          </Link>
          <Link href={`/${lang}/wirkung/stimmung`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            {t('related.wirkung')}
          </Link>
          <Link href={`/${lang}/glossar#nakamal`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            {t('related.glossar')}
          </Link>
        </div>
      </section>
    </WikiPageLayout>
  );
}
