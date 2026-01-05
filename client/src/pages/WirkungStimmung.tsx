import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Link, useLocation } from "wouter";
import { ArrowRight, Smile, Users, Sparkles, MessageCircle, Music, Heart } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-6 h-6 text-yellow-500" />,
  heart: <Heart className="w-6 h-6 text-red-500" />,
  smile: <Smile className="w-6 h-6 text-green-500" />,
  message: <MessageCircle className="w-6 h-6 text-blue-500" />,
};

export default function WirkungStimmung() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['wirkungStimmung'],
    lang
  });

  const data = translations.wirkungStimmung || {};
  const toc = data.toc?.items || [];

  const breadcrumbs = [
    { label: data.breadcrumbs?.home || "Home", href: `/${lang}` },
    { label: data.breadcrumbs?.wirkung || "Wirkung", href: `/${lang}/wirkung` },
    { label: data.breadcrumbs?.current || "Stimmung & Soziales" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Stimmung & Soziales"}
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

      <section id="mechanismen" className="mt-12">
        <h2>{data.mechanismen?.title}</h2>
        <p>{data.mechanismen?.intro}</p>

        <div className="space-y-4 my-6">
          {data.mechanismen?.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                {iconMap[item.icon] || <Sparkles className="w-6 h-6 text-yellow-500" />}
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

      <section id="euphorie" className="mt-12">
        <h2>{data.euphorie?.title}</h2>
        <p>{data.euphorie?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h4 className="mt-0 text-green-800 dark:text-green-200">{data.euphorie?.kava?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.euphorie?.kava?.items?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h4 className="mt-0 text-red-800 dark:text-red-200">{data.euphorie?.alcohol?.title}</h4>
            <ul className="mb-0 space-y-2 text-sm">
              {data.euphorie?.alcohol?.items?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p>{data.euphorie?.description}</p>
      </section>

      <section id="sozial" className="mt-12">
        <h2>{data.sozial?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.sozial?.intro || '' }} />

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h4 className="mt-0 mb-0">{data.sozial?.effects?.title}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">{data.sozial?.effects?.communication?.title}</h5>
              <ul className="text-sm space-y-1 mb-0">
                {data.sozial?.effects?.communication?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">{data.sozial?.effects?.connection?.title}</h5>
              <ul className="text-sm space-y-1 mb-0">
                {data.sozial?.effects?.connection?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-amber-700 dark:text-amber-300" />
            <h4 className="mt-0 mb-0 text-amber-800 dark:text-amber-200">{data.sozial?.kavaBar?.title}</h4>
          </div>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.sozial?.kavaBar?.text || '' }} />
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.sozial?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.sozial?.quote?.source}</footer>
        </blockquote>
      </section>

      <section id="chemotypen" className="mt-12">
        <h2>{data.chemotypen?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.chemotypen?.intro || '' }} />

        <div className="space-y-4 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
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
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6">
          <h4 className="mt-0 text-green-800 dark:text-green-200">{data.chemotypen?.tip?.title}</h4>
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: data.chemotypen?.tip?.text || '' }} />
        </div>
      </section>

      <section id="anwendung" className="mt-12">
        <h2>{data.anwendung?.title}</h2>
        <p>{data.anwendung?.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          {data.anwendung?.cards?.map((card: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <h4 className="mt-0 text-primary">{card.title}</h4>
              <ul className="mb-0 space-y-2 text-sm">
                {card.items?.map((item: any, j: number) => (
                  <li key={j}><strong>{item.label}</strong> {item.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h4 className="mt-0">{data.anwendung?.setting?.title}</h4>
          <p className="text-sm mb-4">{data.anwendung?.setting?.intro}</p>
          <ul className="space-y-2 text-sm mb-0">
            {data.anwendung?.setting?.items?.map((item: any, i: number) => (
              <li key={i}><strong>{item.label}</strong> {item.value}</li>
            ))}
          </ul>
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{data.anwendung?.quote?.text}"
          <footer className="text-sm mt-2 not-italic">{data.anwendung?.quote?.source}</footer>
        </blockquote>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">{data.navigation?.nextChapter}</p>
        <Link href={data.navigation?.next?.href?.replace('/de/', `/${lang}/`) || `/${lang}/wirkung/kognition`}>
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
