import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Building2, Users, Scale, Landmark, Sparkles, BookOpen, Handshake, Moon, Coffee, Heart, MapPin, Clock, DollarSign, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

const iconMap: Record<string, any> = {
  users: Users,
  scale: Scale,
  landmark: Landmark,
  sparkles: Sparkles,
  book: BookOpen,
  handshake: Handshake,
};

export default function KulturNakamal() {
  const { lang } = useLanguage();
  const { translations, isLoading } = useTranslations({ namespaces: ['kulturNakamal', 'common'], lang: lang as any });
  
  const t = translations.kulturNakamal || {};
  const tCommon = translations.common || {};

  const toc = [
    { id: "einfuehrung", title: t.toc?.einfuehrung, level: 1 },
    { id: "traditionell", title: t.toc?.traditionell, level: 1 },
    { id: "atmosphaere", title: t.toc?.atmosphaere, level: 1 },
    { id: "architektur", title: t.toc?.architektur, level: 1 },
    { id: "modern", title: t.toc?.modern, level: 1 },
    { id: "regionen", title: t.toc?.regionen, level: 1 },
    { id: "etikette", title: t.toc?.etikette, level: 1 },
    { id: "besuch", title: t.toc?.besuch, level: 1 },
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

      {/* Traditional Nakamal */}
      <section id="traditionell" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.traditional?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.traditional?.intro }} />

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t.traditional?.functionsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {t.traditional?.functions?.map((func: any, idx: number) => {
                const IconComponent = iconMap[func.icon] || Users;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">{func.title}</span>
                      <p className="text-sm text-muted-foreground">{func.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-500/5 rounded-xl p-6 my-6 border border-amber-500/20">
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.traditional?.genderNote }} />
          </div>
        </GlossaryText>
      </section>

      {/* Atmosphere & Rules */}
      <section id="atmosphaere" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Moon className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.atmosphere?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.atmosphere?.intro }} />

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t.atmosphere?.rulesTitle}</h3>
            <div className="space-y-4">
              {t.atmosphere?.rules?.map((rule: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">{idx + 1}</div>
                  <div>
                    <span className="font-medium">{rule.rule}</span>
                    <p className="text-sm text-muted-foreground">{rule.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-500/5 rounded-xl p-6 my-6 border border-purple-500/20">
            <h4 className="font-semibold mb-4 text-purple-700 dark:text-purple-400">{t.atmosphere?.sensoryBox?.title}</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-lg">👁️</span>
                <p className="text-muted-foreground">{t.atmosphere?.sensoryBox?.sight}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">👂</span>
                <p className="text-muted-foreground">{t.atmosphere?.sensoryBox?.sound}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">👃</span>
                <p className="text-muted-foreground">{t.atmosphere?.sensoryBox?.smell}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">👅</span>
                <p className="text-muted-foreground">{t.atmosphere?.sensoryBox?.taste}</p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <span className="text-lg">❤️</span>
                <p className="text-muted-foreground">{t.atmosphere?.sensoryBox?.feel}</p>
              </div>
            </div>
          </div>
        </GlossaryText>
      </section>

      {/* Architecture */}
      <section id="architektur" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Landmark className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.architecture?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6">{t.architecture?.intro}</p>

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t.architecture?.elementsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {t.architecture?.elements?.map((el: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-primary text-lg">●</span>
                  <div>
                    <span className="font-medium">{el.element}</span>
                    <p className="text-sm text-muted-foreground">{el.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-emerald-500/5 rounded-xl p-6 border border-emerald-500/20">
              <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">{t.architecture?.tannaStyle?.title}</h4>
              <p className="text-sm text-muted-foreground">{t.architecture?.tannaStyle?.desc}</p>
            </div>
            <div className="bg-blue-500/5 rounded-xl p-6 border border-blue-500/20">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">{t.architecture?.urbanStyle?.title}</h4>
              <p className="text-sm text-muted-foreground">{t.architecture?.urbanStyle?.desc}</p>
            </div>
          </div>
        </GlossaryText>
      </section>

      {/* Modern Kava Bars */}
      <section id="modern" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Coffee className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.modern?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.modern?.intro }} />

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t.modern?.typesTitle}</h3>
            <div className="space-y-4">
              {t.modern?.types?.map((type: any, idx: number) => (
                <div key={idx} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{type.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{type.locations}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <h3 className="font-semibold mb-4">{t.modern?.comparisonTitle}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Aspekt</th>
                  <th className="text-left py-3 px-4 font-semibold">Traditionell</th>
                  <th className="text-left py-3 px-4 font-semibold">Modern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {t.modern?.comparison?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium">{row.aspect}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.traditional}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.modern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlossaryText>
      </section>

      {/* Regional Differences */}
      <section id="regionen" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-rose-500/10">
            <MapPin className="h-6 w-6 text-rose-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.regions?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6">{t.regions?.intro}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {t.regions?.places?.map((place: any, idx: number) => (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{place.flag}</span>
                  <div>
                    <h3 className="font-semibold">{place.country}</h3>
                    <span className="text-sm text-primary">{place.name}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{place.description}</p>
                <div className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary inline-block">
                  {place.highlight}
                </div>
              </div>
            ))}
          </div>
        </GlossaryText>
      </section>

      {/* Etiquette */}
      <section id="etikette" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Heart className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.etiquette?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6">{t.etiquette?.intro}</p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-green-500/5 rounded-xl p-6 border border-green-500/20">
              <h4 className="font-semibold mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {t.etiquette?.dosTitle}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {t.etiquette?.dos?.map((item: string, idx: number) => (
                  <p key={idx}>✓ {item}</p>
                ))}
              </div>
            </div>
            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/20">
              <h4 className="font-semibold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                {t.etiquette?.dontsTitle}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {t.etiquette?.donts?.map((item: string, idx: number) => (
                  <p key={idx}>✗ {item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-500/5 rounded-xl p-6 my-6 border border-amber-500/20">
            <h4 className="font-semibold mb-3 text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {t.etiquette?.tipBox?.title}
            </h4>
            <p className="text-sm text-muted-foreground">{t.etiquette?.tipBox?.text}</p>
          </div>
        </GlossaryText>
      </section>

      {/* Visiting a Nakamal */}
      <section id="besuch" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Clock className="h-6 w-6 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t.visit?.title}</h2>
        </div>
        
        <GlossaryText lang={lang as Language}>
          <p className="mb-6">{t.visit?.intro}</p>

          <div className="bg-card rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4">{t.visit?.stepsTitle}</h3>
            <div className="space-y-4">
              {t.visit?.steps?.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">{idx + 1}</div>
                  <div>
                    <span className="font-medium">{step.step}</span>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 my-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              {t.visit?.costsTitle}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {t.visit?.costs?.map((cost: any, idx: number) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{cost.location}</span>
                    <p className="text-xs text-muted-foreground">{cost.note}</p>
                  </div>
                  <span className="text-primary font-semibold">{cost.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/5 rounded-xl p-6 my-6 border border-blue-500/20">
            <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">{t.visit?.findTitle}</h4>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.visit?.findText?.replace('/de/', `/${lang}/`) }} />
          </div>
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
