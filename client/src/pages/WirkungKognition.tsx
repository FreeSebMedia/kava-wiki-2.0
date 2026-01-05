import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link, useLocation } from "wouter";
import { ArrowRight, Brain, TrendingUp, Lightbulb, Clock, RefreshCw } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function WirkungKognition() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['wirkungKognition'],
    lang
  });

  const data = translations.wirkungKognition || {};
  const toc = data.toc?.items || [];

  const breadcrumbs = [
    { label: data.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.breadcrumbs?.wirkung || "Wirkung", href: `/${lang}/wirkung` },
    { label: data.breadcrumbs?.current || "Kognitive Effekte" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Kognitive Effekte"}
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
        <p dangerouslySetInnerHTML={{ __html: data.einfuehrung?.paragraph2 || '' }} />
      </section>

      <section id="klarheit" className="mt-12">
        <h2>{data.klarheit?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.klarheit?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h4 className="mt-0 mb-0">{data.klarheit?.boxTitle}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm mb-0">
              {data.klarheit?.features?.left?.map((item: any, i: number) => (
                <li key={i}><strong>{item.label}</strong> {item.value}</li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm mb-0">
              {data.klarheit?.features?.right?.map((item: any, i: number) => (
                <li key={i}><strong>{item.label}</strong> {item.value}</li>
              ))}
            </ul>
          </div>
        </div>

        <p dangerouslySetInnerHTML={{ __html: data.klarheit?.description || '' }} />

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.klarheit?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.klarheit?.quote?.source}</footer>
        </blockquote>
      </section>

      <section id="fokus" className="mt-12">
        <h2>{data.fokus?.title}</h2>
        <p>{data.fokus?.intro}</p>

        <div className="space-y-4 my-6">
          {data.fokus?.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <h4 className="mt-0 text-primary">{item.title}</h4>
              <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 text-amber-800 dark:text-amber-200">{data.fokus?.dosageNote?.title}</h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.fokus?.dosageNote?.text || '' }} />
        </div>
      </section>

      <section id="reverse-tolerance" className="mt-12">
        <h2>{data.reverseTolerance?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.reverseTolerance?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-8 h-8 text-primary" />
            <h4 className="mt-0 mb-0">{data.reverseTolerance?.boxTitle}</h4>
          </div>
          <div className="space-y-4">
            {data.reverseTolerance?.steps?.map((step: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: step.text }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="mt-0 text-primary">{data.reverseTolerance?.explanations?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.reverseTolerance?.explanations?.items?.map((item: any, i: number) => (
                <li key={i}><strong>{item.label}</strong> {item.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5">
            <h4 className="mt-0 text-green-800 dark:text-green-200">{data.reverseTolerance?.practical?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.reverseTolerance?.practical?.items?.map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.reverseTolerance?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.reverseTolerance?.quote?.source}</footer>
        </blockquote>
      </section>

      <section id="mechanismen" className="mt-12">
        <h2>{data.mechanismen?.title}</h2>
        <p>{data.mechanismen?.intro}</p>

        <div className="overflow-x-auto my-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{data.mechanismen?.table?.headers?.system}</th>
                <th className="text-left">{data.mechanismen?.table?.headers?.effect}</th>
                <th className="text-left">{data.mechanismen?.table?.headers?.cognitive}</th>
              </tr>
            </thead>
            <tbody>
              {data.mechanismen?.table?.rows?.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.system}</strong></td>
                  <td>{row.effect}</td>
                  <td>{row.cognitive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p dangerouslySetInnerHTML={{ __html: data.mechanismen?.description || '' }} />
      </section>

      <section id="chemotypen" className="mt-12">
        <h2>{data.chemotypen?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.chemotypen?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-5 my-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">{data.chemotypen?.heady?.label}</span>
            <span className="text-lg font-semibold">{data.chemotypen?.heady?.idealFor}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {data.chemotypen?.heady?.varieties?.map((variety: any, i: number) => (
              <div key={i}>
                <h4 className="mt-0 mb-2">{variety.name}</h4>
                <p className="text-sm mb-1"><strong>Chemotyp:</strong> {variety.chemotype}</p>
                <p className="text-sm mb-0">{variety.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="anwendung" className="mt-12">
        <h2>{data.anwendung?.title}</h2>
        <p>{data.anwendung?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          {data.anwendung?.cards?.map((card: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                {card.icon === 'brain' ? <Brain className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-primary" />}
                <h4 className="mt-0 mb-0">{card.title}</h4>
              </div>
              <ul className="mb-0 space-y-2 text-sm">
                {card.items?.map((item: any, j: number) => (
                  <li key={j}><strong>{item.label}</strong> {item.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-700 dark:text-green-300" />
            <h4 className="mt-0 mb-0 text-green-800 dark:text-green-200">{data.anwendung?.longterm?.title}</h4>
          </div>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.anwendung?.longterm?.text || '' }} />
        </div>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">{data.navigation?.nextChapter}</p>
        <Link href={data.navigation?.next?.href?.replace('/de/', `/${lang}/`) || `/${lang}/wirkung`}>
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
