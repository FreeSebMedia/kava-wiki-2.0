import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link, useLocation } from "wouter";
import { ArrowRight, Dumbbell, Zap, Activity, Heart } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-6 h-6 text-yellow-500" />,
  activity: <Activity className="w-6 h-6 text-blue-500" />,
  heart: <Heart className="w-6 h-6 text-red-500" />,
};

export default function WirkungMuskel() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['wirkungMuskel'],
    lang
  });

  const data = translations.wirkungMuskel || {};
  const toc = data.toc?.items || [];

  const breadcrumbs = [
    { label: data.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.breadcrumbs?.wirkung || "Wirkung", href: `/${lang}/wirkung` },
    { label: data.breadcrumbs?.current || "Muskelentspannung" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Muskelentspannung"}
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
        <p>{data.einfuehrung?.paragraph2}</p>
      </section>

      <section id="mechanismen" className="mt-12">
        <h2>{data.mechanismen?.title}</h2>
        <p>{data.mechanismen?.intro}</p>

        <div className="space-y-4 my-6">
          {data.mechanismen?.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                {iconMap[item.icon] || <Zap className="w-6 h-6 text-yellow-500" />}
                <h4 className="mt-0 mb-0">{item.title}</h4>
              </div>
              <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.mechanismen?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.mechanismen?.quote?.source}</footer>
        </blockquote>
      </section>

      <section id="kavalactone" className="mt-12">
        <h2>{data.kavalactone?.title}</h2>
        <p>{data.kavalactone?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">{data.kavalactone?.dhk?.position}</span>
              <div>
                <h3 className="mt-0 mb-0">{data.kavalactone?.dhk?.title}</h3>
                <span className="text-sm text-muted-foreground">{data.kavalactone?.dhk?.positionLabel}</span>
              </div>
            </div>
            <p className="text-sm mb-3" dangerouslySetInnerHTML={{ __html: data.kavalactone?.dhk?.description || '' }} />
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs mb-0"><strong>{data.kavalactone?.dhk?.profileLabel}</strong> {data.kavalactone?.dhk?.profile}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">{data.kavalactone?.dhm?.position}</span>
              <div>
                <h3 className="mt-0 mb-0">{data.kavalactone?.dhm?.title}</h3>
                <span className="text-sm text-muted-foreground">{data.kavalactone?.dhm?.positionLabel}</span>
              </div>
            </div>
            <p className="text-sm mb-3" dangerouslySetInnerHTML={{ __html: data.kavalactone?.dhm?.description || '' }} />
            <div className="bg-amber-100 dark:bg-amber-950/50 rounded-lg p-3">
              <p className="text-xs mb-0"><strong>{data.kavalactone?.dhm?.warningLabel}</strong> {data.kavalactone?.dhm?.warning}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto my-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">{data.kavalactone?.table?.headers?.kavalacton}</th>
                <th className="text-left">{data.kavalactone?.table?.headers?.relaxation}</th>
                <th className="text-left">{data.kavalactone?.table?.headers?.sedation}</th>
                <th className="text-left">{data.kavalactone?.table?.headers?.duration}</th>
              </tr>
            </thead>
            <tbody>
              {data.kavalactone?.table?.rows?.map((row: any, i: number) => (
                <tr key={i}>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.relaxation}</td>
                  <td>{row.sedation}</td>
                  <td>{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="anwendungen" className="mt-12">
        <h2>{data.anwendungen?.title}</h2>
        <p>{data.anwendungen?.intro}</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          {data.anwendungen?.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <h4 className="mt-0 text-primary">{item.title}</h4>
              <p className="mb-0 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
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
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 text-amber-800 dark:text-amber-200">{data.chemotypen?.tip?.title}</h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.chemotypen?.tip?.text?.replace('/de/', `/${lang}/`) || '' }} />
        </div>
      </section>

      <section id="praxis" className="mt-12">
        <h2>{data.praxis?.title}</h2>
        <p>{data.praxis?.intro}</p>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="mt-0 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            {data.praxis?.boxTitle}
          </h4>
          <ul className="space-y-3 mb-0">
            {data.praxis?.tips?.map((tip: any, i: number) => (
              <li key={i}>
                <strong>{tip.label}</strong> {tip.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 text-green-800 dark:text-green-200">{data.praxis?.feeling?.title}</h4>
          <p className="mb-0 text-sm">{data.praxis?.feeling?.text}</p>
        </div>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">{data.navigation?.nextChapter}</p>
        <Link href={data.navigation?.next?.href?.replace('/de/', `/${lang}/`) || `/${lang}/wirkung/stimmung`}>
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
