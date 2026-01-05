import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Sparkles, Users, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/href="\/de\//g, `href="/${lang}/`);
}

export default function KulturZeremonien() {
  const { lang } = useLanguage();
  const { translations, isLoading } = useTranslations({ namespaces: ['kulturZeremonien', 'common'], lang: lang as any });
  
  const t = translations.kulturZeremonien || {};
  const tCommon = translations.common || {};

  const toc = [
    { id: "einfuehrung", title: t.toc?.einfuehrung, level: 1 },
    { id: "fiji", title: t.toc?.fiji, level: 1 },
    { id: "tonga", title: t.toc?.tonga, level: 1 },
    { id: "samoa", title: t.toc?.samoa, level: 1 },
    { id: "vanuatu", title: t.toc?.vanuatu, level: 1 },
    { id: "hawaii", title: t.toc?.hawaii, level: 1 },
    { id: "spirituell", title: t.toc?.spirituell, level: 1 },
    { id: "protokoll", title: t.toc?.protokoll, level: 1 },
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
          <p className="mb-4">{t.intro?.p2}</p>
        </GlossaryText>
      </section>

      {/* Fiji */}
      <section id="fiji" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🇫🇯</span>
          <h2 className="text-2xl font-serif font-bold">{t.fiji?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.fiji?.intro }} />

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {t.fiji?.ablaufTitle}
            </h3>
            <div className="space-y-4">
              {t.fiji?.steps?.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">{idx + 1}</div>
                  <div>
                    <span className="font-medium">{step.title}</span>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 my-6 border border-border/50">
            <h4 className="font-semibold mb-3">{t.fiji?.historyTitle}</h4>
            <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.fiji?.historyP1 }} />
            <p className="text-sm text-muted-foreground">{t.fiji?.historyP2}</p>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.fiji?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Tonga */}
      <section id="tonga" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🇹🇴</span>
          <h2 className="text-2xl font-serif font-bold">{t.tonga?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.tonga?.intro }} />

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t.tonga?.rolesTitle}
              </h4>
              <div className="space-y-3 text-sm">
                {t.tonga?.roles?.map((role: any, idx: number) => (
                  <div key={idx}>
                    <span className="font-medium">{role.name}</span>
                    <p className="text-muted-foreground">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t.tonga?.occasionsTitle}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {t.tonga?.occasions?.map((occasion: string, idx: number) => (
                  <p key={idx}>● {occasion}</p>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.tonga?.kodifiziert }} />

          <div className="bg-amber-500/5 rounded-xl p-6 my-6 border border-amber-500/20">
            <h4 className="font-semibold mb-3 text-amber-700 dark:text-amber-400">{t.tonga?.tanoaTitle}</h4>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.tonga?.tanoaDesc }} />
          </div>
        </GlossaryText>
      </section>

      {/* Samoa */}
      <section id="samoa" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🇼🇸</span>
          <h2 className="text-2xl font-serif font-bold">{t.samoa?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.samoa?.intro }} />

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h4 className="font-semibold mb-4">{t.samoa?.prepTitle}</h4>
            <p className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.samoa?.prepP1 }} />
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.samoa?.prepP2 }} />
          </div>

          <div className="bg-red-500/5 rounded-xl p-6 my-6 border border-red-500/20">
            <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">{t.samoa?.orderTitle}</h4>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.samoa?.orderDesc }} />
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.samoa?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Vanuatu */}
      <section id="vanuatu" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🇻🇺</span>
          <h2 className="text-2xl font-serif font-bold">{t.vanuatu?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.vanuatu?.intro }} />

          <div className="bg-emerald-500/5 rounded-xl p-6 my-6 border border-emerald-500/20">
            <h4 className="font-semibold mb-4 text-emerald-700 dark:text-emerald-400">{t.vanuatu?.tannaTitle}</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p dangerouslySetInnerHTML={{ __html: t.vanuatu?.tannaP1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.vanuatu?.tannaP2 }} />
              <p dangerouslySetInnerHTML={{ __html: t.vanuatu?.tannaP3 }} />
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h4 className="font-semibold mb-3">{t.vanuatu?.tamafaTitle}</h4>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.vanuatu?.tamafaDesc }} />
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.vanuatu?.conclusion }} />
        </GlossaryText>
      </section>

      {/* Hawaii */}
      <section id="hawaii" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🌺</span>
          <h2 className="text-2xl font-serif font-bold">{t.hawaii?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.hawaii?.intro }} />

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3">{t.hawaii?.featuresTitle}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {t.hawaii?.features?.map((feature: string, idx: number) => (
                  <p key={idx}>● {feature}</p>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-3">{t.hawaii?.renaissanceTitle}</h4>
              <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.hawaii?.renaissanceDesc }} />
            </div>
          </div>

          <p className="mb-4">{t.hawaii?.conclusion}</p>
        </GlossaryText>
      </section>

      {/* Spiritual Dimension */}
      <section id="spirituell" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.spiritual?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.spiritual?.intro }} />

          <div className="bg-purple-500/5 rounded-xl p-6 my-6 border border-purple-500/20">
            <h4 className="font-semibold mb-4 text-purple-700 dark:text-purple-400">{t.spiritual?.functionsTitle}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {t.spiritual?.functions?.map((func: any, idx: number) => (
                <div key={idx}>
                  <span className="font-medium">{func.name}</span>
                  <p className="text-sm text-muted-foreground">{func.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.spiritual?.p1 }} />
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.spiritual?.p2 }} />
        </GlossaryText>
      </section>

      {/* Ceremonial Protocol */}
      <section id="protokoll" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.protocol?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.protocol?.intro }} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">{t.protocol?.tableHeaders?.element}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t.protocol?.tableHeaders?.meaning}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t.protocol?.tableHeaders?.variants}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {t.protocol?.tableRows?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium">{row.element}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.meaning}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.variants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 my-6 border border-border/50">
            <h4 className="font-semibold mb-3">{t.protocol?.tipsTitle}</h4>
            <p className="text-sm text-muted-foreground mb-3">{t.protocol?.tipsIntro}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {t.protocol?.tips?.map((tip: string, idx: number) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: `● ${tip}` }} />
              ))}
            </div>
          </div>
        </GlossaryText>
      </section>

      {/* Chapter Navigation */}
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
