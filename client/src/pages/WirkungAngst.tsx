import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link, useLocation } from "wouter";
import { ArrowRight, Brain, Shield, Beaker, Leaf, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

export default function WirkungAngst() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['wirkungAngst'],
    lang
  });

  const data = translations.wirkungAngst || {};

  const toc = data.toc?.items || [];

  const breadcrumbs = [
    { label: data.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.breadcrumbs?.wirkung || "Wirkung", href: `/${lang}/wirkung` },
    { label: data.breadcrumbs?.current || "Angstlösung" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Angstlösung & Anxiolyse"}
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
          <p dangerouslySetInnerHTML={{ __html: data.einfuehrung?.paragraph2 || '' }} />
        </GlossaryText>
      </section>

      <section id="wirkmechanismus" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.wirkmechanismus?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.wirkmechanismus?.intro || '' }} />
        </GlossaryText>

        <div id="gaba-system" className="mt-8">
          <h3>{data.wirkmechanismus?.gaba?.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: data.wirkmechanismus?.gaba?.intro || '' }} />
          
          <div className="bg-card border border-border rounded-xl p-6 my-6">
            <h4 className="mt-0 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              {data.wirkmechanismus?.gaba?.boxTitle}
            </h4>
            <ol className="space-y-3 mb-0">
              {data.wirkmechanismus?.gaba?.steps?.map((step: string, i: number) => (
                <li key={i}><strong>{i + 1}.</strong> {step}</li>
              ))}
            </ol>
          </div>

          <p dangerouslySetInnerHTML={{ __html: data.wirkmechanismus?.gaba?.conclusion || '' }} />
        </div>

        <div id="weitere-mechanismen" className="mt-8">
          <h3>{data.wirkmechanismus?.weitere?.title}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.wirkmechanismus?.weitere?.items?.map((item: any, i: number) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <h4 className="mt-0 text-primary">{item.title}</h4>
                <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="studienlage" className="mt-12">
        <h2>{data.studienlage?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.studienlage?.intro || '' }} />

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 my-6">
          <h4 className="mt-0 flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Beaker className="w-5 h-5" />
            {data.studienlage?.boxTitle}
          </h4>
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

      <section id="vergleich" className="mt-12">
        <h2>{data.vergleich?.title}</h2>
        <p>{data.vergleich?.intro}</p>

        <div className="overflow-x-auto my-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{data.vergleich?.table?.headers?.property}</th>
                <th className="text-left">{data.vergleich?.table?.headers?.kava}</th>
                <th className="text-left">{data.vergleich?.table?.headers?.benzo}</th>
              </tr>
            </thead>
            <tbody>
              {data.vergleich?.table?.rows?.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.property}</strong></td>
                  <td>{row.kava}</td>
                  <td>{row.benzo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6 my-6">
          <h4 className="mt-0 flex items-center gap-2 text-green-800 dark:text-green-200">
            <CheckCircle2 className="w-5 h-5" />
            {data.vergleich?.advantages?.title}
          </h4>
          <ul className="mb-0 space-y-2">
            {data.vergleich?.advantages?.items?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="chemotypen" className="mt-12">
        <h2>{data.chemotypen?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.chemotypen?.intro || '' }} />

        <div className="space-y-4 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">{data.chemotypen?.headyLabel}</span>
              <span className="text-lg font-semibold">{data.chemotypen?.idealFor}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.chemotypen?.varieties?.map((variety: any, i: number) => (
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
        <p>{data.anwendung?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="mt-0 text-primary">{data.anwendung?.acute?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.anwendung?.acute?.items?.map((item: any, i: number) => (
                <li key={i}><strong>{item.label}</strong> {item.text}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="mt-0 text-primary">{data.anwendung?.daily?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.anwendung?.daily?.items?.map((item: any, i: number) => (
                <li key={i}><strong>{item.label}</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 flex items-center gap-2 text-green-800 dark:text-green-200">
            <Leaf className="w-5 h-5" />
            {data.anwendung?.reverseTolerance?.title}
          </h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.anwendung?.reverseTolerance?.text || '' }} />
        </div>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">{data.navigation?.nextChapter}</p>
        <Link href={data.navigation?.next?.href?.replace('/de/', `/${lang}/`) || `/${lang}/wirkung/schlaf`}>
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
