import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link, useLocation } from "wouter";
import { ArrowRight, Moon, Sun, Clock, Sparkles, AlertTriangle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function WirkungSchlaf() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['wirkungSchlaf'],
    lang
  });

  const data = translations.wirkungSchlaf || {};
  const toc = data.toc?.items || [];

  const breadcrumbs = [
    { label: data.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.breadcrumbs?.wirkung || "Wirkung", href: `/${lang}/wirkung` },
    { label: data.breadcrumbs?.current || "Schlaf & Entspannung" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Schlaf & Entspannung"}
      subtitle={data.page?.subtitle || ""}
      category={data.page?.category || "Wirkung"}
      heroImage="/images/hero-ceremony.jpg"
      toc={toc as any}
      tocTitle={data.toc?.title}
      breadcrumbs={breadcrumbs}
    >
      <section id="einfuehrung">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: data.einfuehrung?.paragraph1 || '' }} />
        </GlossaryText>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: data.einfuehrung?.paragraph2 || '' }} />
        </GlossaryText>
      </section>

      <section id="schlafarchitektur" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.schlafarchitektur?.title}</h2>
          <p>{data.schlafarchitektur?.intro}</p>
        </GlossaryText>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-8 h-8 text-indigo-500" />
              <h3 className="mt-0 mb-0">{data.schlafarchitektur?.tiefschlaf?.title}</h3>
            </div>
            <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.schlafarchitektur?.tiefschlaf?.text || '' }} />
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <h3 className="mt-0 mb-0">{data.schlafarchitektur?.rem?.title}</h3>
            </div>
            <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.schlafarchitektur?.rem?.text || '' }} />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6 my-6">
          <h4 className="mt-0 text-green-800 dark:text-green-200">{data.schlafarchitektur?.comparison?.title}</h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.schlafarchitektur?.comparison?.text || '' }} />
        </div>
      </section>

      <section id="mechanismen" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.mechanismen?.title}</h2>
          <p>{data.mechanismen?.intro}</p>
        </GlossaryText>

        <div className="space-y-4 my-6">
          {data.mechanismen?.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <h4 className="mt-0 text-primary">{item.title}</h4>
              <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      <section id="studienlage" className="mt-12">
        <h2>{data.studienlage?.title}</h2>
        <p>{data.studienlage?.intro}</p>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 my-6">
          <h4 className="mt-0 text-amber-800 dark:text-amber-200">{data.studienlage?.boxTitle}</h4>
          <ul className="space-y-3 mb-0">
            {data.studienlage?.studies?.map((study: any, i: number) => (
              <li key={i}>
                <strong>{study.name}</strong> {study.text}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.studienlage?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.studienlage?.quote?.source}</footer>
        </blockquote>
      </section>

      <section id="chemotypen" className="mt-12">
        <h2>{data.chemotypen?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.chemotypen?.intro || '' }} />

        <div className="space-y-4 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-stone-600 text-white px-3 py-1 rounded-full text-sm font-bold">{data.chemotypen?.heavy?.label}</span>
              <span className="text-lg font-semibold">{data.chemotypen?.heavy?.idealFor}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.chemotypen?.heavy?.varieties?.map((variety: any, i: number) => (
                <div key={i}>
                  <h4 className="mt-0 mb-2">{variety.name}</h4>
                  <p className="text-sm mb-1"><strong>Chemotyp:</strong> {variety.chemotype}</p>
                  <p className="text-sm mb-0">{variety.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">{data.chemotypen?.balanced?.label}</span>
              <span className="text-lg font-semibold">{data.chemotypen?.balanced?.idealFor}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.chemotypen?.balanced?.varieties?.map((variety: any, i: number) => (
                <div key={i}>
                  <h4 className="mt-0 mb-2">{variety.name}</h4>
                  <p className="text-sm mb-1"><strong>Chemotyp:</strong> {variety.chemotype}</p>
                  <p className="text-sm mb-0">{variety.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5" />
            {data.chemotypen?.warning?.title}
          </h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.chemotypen?.warning?.text || '' }} />
        </div>
      </section>

      <section id="anwendung" className="mt-12">
        <h2>{data.anwendung?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.anwendung?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="mt-0 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {data.anwendung?.protocol?.title}
          </h4>
          <div className="space-y-4">
            {data.anwendung?.protocol?.steps?.map((step: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p className="mb-0 text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="afterglow" className="mt-12">
        <h2>{data.afterglow?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.afterglow?.intro || '' }} />

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-8 h-8 text-yellow-500" />
            <h4 className="mt-0 mb-0 text-green-800 dark:text-green-200">{data.afterglow?.boxTitle}</h4>
          </div>
          <ul className="mb-0 space-y-2">
            {data.afterglow?.benefits?.map((benefit: any, i: number) => (
              <li key={i}><strong>{benefit.label}</strong> {benefit.text}</li>
            ))}
          </ul>
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.afterglow?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.afterglow?.quote?.source}</footer>
        </blockquote>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">{data.navigation?.nextChapter}</p>
        <Link href={data.navigation?.next?.href?.replace('/de/', `/${lang}/`) || `/${lang}/wirkung/muskel`}>
          <div className="group bg-card hover:bg-accent/50 border border-border rounded-xl p-6 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors mt-0 mb-2">
                  {data.navigation?.next?.title}
                </h4>
                <p className="text-muted-foreground m-0">
                  {data.navigation?.next?.description}
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </Link>
      </section>
    </WikiPageLayout>
  );
}
