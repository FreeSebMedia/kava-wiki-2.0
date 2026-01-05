import WikiPageLayout from "@/components/WikiPageLayout";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { ArrowRight, Brain, Moon, Dumbbell, Smile, Lightbulb } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";

export default function Wirkung() {
  const [location] = useLocation();
  const pathLang = location.split('/')[1];
  const lang = (pathLang in languages ? pathLang : 'de') as Language;

  const { translations, isLoading } = useTranslations({ 
    namespaces: ['wirkung'], 
    lang 
  });

  const data = translations.wirkung || {};

  const toc = [
    { id: "neurobiologie", title: data.toc?.neurobiologie || "Neurobiologische Mechanismen", level: 1 },
    { id: "psyche", title: data.toc?.psyche || "Psychische Wirkung", level: 1 },
    { id: "koerper", title: data.toc?.koerper || "Körperliche Wirkung", level: 1 },
    { id: "wirkungstypen", title: data.toc?.wirkungstypen || "Heady, Heavy & Balanced", level: 1 },
    { id: "dauer", title: data.toc?.dauer || "Dauer & Verlauf", level: 1 },
    { id: "unterseiten", title: data.toc?.unterseiten || "Detaillierte Informationen", level: 1 },
  ];

  const subpageIcons = {
    angst: { icon: Brain, color: "text-blue-500" },
    schlaf: { icon: Moon, color: "text-indigo-500" },
    muskel: { icon: Dumbbell, color: "text-green-500" },
    stimmung: { icon: Smile, color: "text-yellow-500" },
    kognition: { icon: Lightbulb, color: "text-purple-500" },
  };

  const subpages = Object.entries(data.subpages || {})
    .filter(([key]) => key !== 'title' && key !== 'intro')
    .map(([key, value]: [string, any]) => ({
      key,
      title: value?.title || key,
      description: value?.description || '',
      href: `/${lang}/wirkung/${key}`,
      ...(subpageIcons[key as keyof typeof subpageIcons] || { icon: Brain, color: "text-gray-500" }),
    }));

  const breadcrumbs = [
    { label: "Home", href: `/${lang}` },
    { label: data.page?.category || "Wirkung" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Wirkung & Effekte"}
      subtitle={data.page?.subtitle || ""}
      category={data.page?.category || "Wirkung"}
      heroImage="/images/hero-ceremony.jpg"
      toc={toc as any}
      tocTitle={data.toc?.title}
      breadcrumbs={breadcrumbs}
    >
      <GlossaryText lang={lang}>
        <section id="intro">
          <p className="lead text-xl">
            {data.intro?.paragraph1}
          </p>
          <p>
            {data.intro?.paragraph2}
          </p>
        </section>
      </GlossaryText>

      <section id="neurobiologie" className="mt-12">
        <h2>{data.neurobiologie?.title}</h2>
        <GlossaryText lang={lang}>
          <p>
            {data.neurobiologie?.intro}
          </p>
        </GlossaryText>
        <ul className="space-y-4">
          {data.neurobiologie?.mechanisms?.map((mech: any, i: number) => (
            <li key={i}>
              <strong>{mech.title}:</strong><br/>
              {mech.description}
            </li>
          ))}
        </ul>
      </section>

      <section id="psyche" className="mt-12">
        <h2>{data.psyche?.title}</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="mt-0 text-primary">{data.psyche?.positiv?.title}</h3>
            <ul className="mb-0 space-y-2">
              {data.psyche?.positiv?.items?.map((item: string, i: number) => (
                <li key={i}>✅ {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="mt-0 text-muted-foreground">{data.psyche?.neutral?.title}</h3>
            <ul className="mb-0 space-y-2">
              {data.psyche?.neutral?.items?.map((item: string, i: number) => (
                <li key={i}>{i < 2 ? '😐' : '⚠️'} {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="koerper" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.koerper?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.koerper?.paragraph1 || '' }} />
          <p>
            {data.koerper?.paragraph2}
          </p>
        </GlossaryText>
      </section>

      <section id="wirkungstypen" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.wirkungstypen?.title}</h2>
          <p>
            {data.wirkungstypen?.intro}
          </p>
        </GlossaryText>

        <div className="space-y-6 mt-6">
          {data.wirkungstypen?.types?.map((type: any, i: number) => {
            const badgeColors = [
              "bg-yellow-500 hover:bg-yellow-600",
              "bg-stone-600 hover:bg-stone-700",
              "bg-primary hover:bg-primary/90"
            ];
            return (
              <div key={i} className="flex flex-col md:flex-row gap-4 items-start">
                <Badge className={`${badgeColors[i] || badgeColors[0]} text-white px-3 py-1 text-lg`}>
                  {type.name}
                </Badge>
                <div>
                  <strong className="block text-lg mb-1">{type.label}</strong>
                  <p className="m-0 text-sm">
                    {type.description}<br/>
                    <em>{type.examples}</em>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="dauer" className="mt-12">
        <h2>{data.dauer?.title}</h2>
        <ul>
          {data.dauer?.items?.map((item: any, i: number) => (
            <li key={i}><strong>{item.label}:</strong> {item.value}</li>
          ))}
        </ul>
      </section>

      <section id="unterseiten" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.subpages?.title}</h2>
          <p>
            {data.subpages?.intro}
          </p>
        </GlossaryText>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {subpages.map((page) => (
            <Link key={page.href} href={page.href}>
              <div className="group bg-card hover:bg-accent/50 border border-border rounded-xl p-5 transition-all cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <page.icon className={`w-6 h-6 ${page.color} shrink-0 mt-1`} />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors mt-0 mb-2">
                      {page.title}
                    </h4>
                    <p className="text-sm text-muted-foreground m-0">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </WikiPageLayout>
  );
}
