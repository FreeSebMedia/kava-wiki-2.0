import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Globe, TrendingUp, Users, Leaf, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function KulturModerne() {
  const { lang } = useLanguage();
  const { translations, isLoading } = useTranslations({ namespaces: ['kulturModerne', 'common'], lang: lang as any });
  
  const t = translations.kulturModerne || {};
  const tCommon = translations.common || {};

  const toc = [
    { id: "einfuehrung", title: t.toc?.einfuehrung, level: 1 },
    { id: "renaissance", title: t.toc?.renaissance, level: 1 },
    { id: "pazifik", title: t.toc?.pazifik, level: 1 },
    { id: "westen", title: t.toc?.westen, level: 1 },
    { id: "wellness", title: t.toc?.wellness, level: 1 },
    { id: "export", title: t.toc?.export, level: 1 },
    { id: "herausforderungen", title: t.toc?.herausforderungen, level: 1 },
    { id: "zukunft", title: t.toc?.zukunft, level: 1 },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={t.meta?.title}
      subtitle={t.meta?.subtitle}
      category={t.meta?.category}
      heroImage="/images/hero-ceremony.jpg"
      toc={toc as any}
      tocTitle={tCommon?.toc?.title}
      breadcrumbs={[
        { label: t.breadcrumbs?.home, href: `/${lang}` },
        { label: t.breadcrumbs?.kultur, href: `/${lang}/kultur` },
        { label: t.breadcrumbs?.current },
      ]}
      lang={lang as Language}
    >
      {/* Introduction */}
      <section id="einfuehrung">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.intro?.lead }} />
          <p className="mb-4">{t.intro?.p1}</p>
        </GlossaryText>
      </section>

      {/* Cultural Renaissance */}
      <section id="renaissance" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.renaissance?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.renaissance?.intro }} />

          <div className="bg-amber-500/5 rounded-xl p-6 my-6 border border-amber-500/20">
            <h3 className="font-semibold mb-4 text-amber-700 dark:text-amber-400">{t.renaissance?.factorsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {t.renaissance?.factors?.map((factor: any, idx: number) => (
                <div key={idx}>
                  <span className="font-medium">{factor.title}</span>
                  <p className="text-sm text-muted-foreground">{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border-l-4 border-amber-500/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t.renaissance?.quote}"
          </blockquote>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.renaissance?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Pacific Today */}
      <section id="pazifik" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Globe className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.pacific?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {t.pacific?.countries?.map((country: any, idx: number) => (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{country.flag}</span>
                  <h3 className="font-semibold text-lg">{country.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: country.p1?.replace('/de/', `/${lang}/`) }} />
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: country.p2?.replace('/de/', `/${lang}/`) }} />
              </div>
            ))}
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.pacific?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Kava in the West */}
      <section id="westen" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.west?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.west?.intro }} />

          <div className="bg-blue-500/5 rounded-xl p-6 my-6 border border-blue-500/20">
            <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-400">{t.west?.usaTitle}</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {t.west?.usaStats?.map((stat: any, idx: number) => (
                <div key={idx} className="bg-background/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{t.west?.usaDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3">{t.west?.europe?.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{t.west?.europe?.p1}</p>
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.west?.europe?.p2?.replace('/de/', `/${lang}/`) }} />
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3">{t.west?.online?.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{t.west?.online?.p1}</p>
              <p className="text-sm text-muted-foreground">{t.west?.online?.p2}</p>
            </div>
          </div>
        </GlossaryText>
      </section>

      {/* Wellness Movement */}
      <section id="wellness" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Heart className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.wellness?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.wellness?.intro }} />

          <div className="bg-purple-500/5 rounded-xl p-6 my-6 border border-purple-500/20">
            <h3 className="font-semibold mb-4 text-purple-700 dark:text-purple-400">{t.wellness?.reasonsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {t.wellness?.reasons?.map((reason: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-purple-600 text-lg">●</span>
                  <div>
                    <span className="font-medium">{reason.title}</span>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: reason.desc?.replace('/de/', `/${lang}/`) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.wellness?.soberCurious }} />
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.wellness?.meditation }} />
        </GlossaryText>
      </section>

      {/* Global Export */}
      <section id="export" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.export?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.export?.intro }} />

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">{t.export?.tableHeaders?.country}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t.export?.tableHeaders?.volume}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t.export?.tableHeaders?.varieties}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t.export?.tableHeaders?.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {t.export?.tableRows?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium">{row.country}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.volume}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.varieties}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-500/5 rounded-xl p-6 my-6 border border-green-500/20">
            <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">{t.export?.fairTradeTitle}</h4>
            <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.export?.fairTradeIntro }} />
            <div className="space-y-2 text-sm text-muted-foreground">
              {t.export?.fairTradePoints?.map((point: any, idx: number) => (
                <p key={idx}>● <strong>{point.label}:</strong> {point.desc}</p>
              ))}
            </div>
          </div>
        </GlossaryText>
      </section>

      {/* Challenges */}
      <section id="herausforderungen" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.challenges?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.challenges?.intro }} />

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3 text-orange-600">{t.challenges?.producersTitle}</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                {t.challenges?.producersChallenges?.map((item: any, idx: number) => (
                  <p key={idx}>● <strong>{item.title}:</strong> {item.desc}</p>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3 text-orange-600">{t.challenges?.cultureTitle}</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                {t.challenges?.cultureChallenges?.map((item: any, idx: number) => (
                  <p key={idx}>● <strong>{item.title}:</strong> {item.desc}</p>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.challenges?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Future Outlook */}
      <section id="zukunft" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.future?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4">{t.future?.intro}</p>

          <div className="bg-primary/5 rounded-xl p-6 my-6 border border-primary/20">
            <h3 className="font-semibold mb-4">{t.future?.trendsTitle}</h3>
            <div className="space-y-4">
              {t.future?.trends?.map((trend: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">{idx + 1}</div>
                  <div>
                    <span className="font-medium">{trend.title}</span>
                    <p className="text-sm text-muted-foreground">{trend.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-6 italic text-muted-foreground">
            "{t.future?.quote}"
          </blockquote>

          <p className="mb-4">{t.future?.conclusion}</p>
        </GlossaryText>
      </section>

      {/* Navigation */}
      <section className="mt-16 pt-8 border-t border-border/50">
        <h3 className="font-semibold mb-6">{t.navigation?.title}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={t.navigation?.back?.href?.replace('/de/', `/${lang}/`)}>
            <div className="group bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex items-center gap-4">
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <div className="text-sm text-muted-foreground">{t.navigation?.back?.label}</div>
                <div className="font-medium group-hover:text-primary transition-colors">{t.navigation?.back?.title}</div>
              </div>
            </div>
          </Link>
          <Link href={t.navigation?.next?.href?.replace('/de/', `/${lang}/`)}>
            <div className="group bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{t.navigation?.next?.label}</div>
                <div className="font-medium group-hover:text-primary transition-colors">{t.navigation?.next?.title}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>
      </section>

      {/* Related Links */}
      <section className="mt-8">
        <h3 className="font-semibold mb-4">{t.related?.title}</h3>
        <div className="flex flex-wrap gap-2">
          {t.related?.links?.map((link: any, idx: number) => (
            <Link key={idx} href={link.href?.replace('/de/', `/${lang}/`)} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
