import WikiPageLayout from "@/components/WikiPageLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import GlossaryText from "@/components/GlossaryText";
import { useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";

export default function Zubereitung() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['zubereitung'],
    lang: lang as any
  });

  if (isLoading || !translations.zubereitung) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.zubereitung;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.current },
  ];

  return (
    <WikiPageLayout
      title={t.meta.title}
      subtitle={t.meta.subtitle}
      category={t.meta.category}
      heroImage="/images/hero-roots.jpg"
      toc={t.toc.items}
      tocTitle={t.toc.title}
      breadcrumbs={breadcrumbs}
    >
      <GlossaryText lang={lang}>
        <section id="grundlagen">
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t.sections.grundlagen.intro }} />
          <p dangerouslySetInnerHTML={{ __html: t.sections.grundlagen.text }} />
        </section>
      </GlossaryText>

      <section id="traditionell" className="mt-12">
        <h2>{t.sections.traditionell.title}</h2>
        <GlossaryText lang={lang}>
          <p>{t.sections.traditionell.intro}</p>
        </GlossaryText>
        <h3>{t.sections.traditionell.materialsTitle}</h3>
        <ul>
          {t.sections.traditionell.materials.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3>{t.sections.traditionell.instructionsTitle}</h3>
        <ol>
          {t.sections.traditionell.instructions.map((item: string, index: number) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      </section>

      <section id="blender" className="mt-12">
        <h2>{t.sections.blender.title}</h2>
        <GlossaryText lang={lang}>
          <p>{t.sections.blender.intro}</p>
        </GlossaryText>
        <ol>
          {t.sections.blender.instructions.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>

      <section id="shaker" className="mt-12">
        <h2>{t.sections.shaker.title}</h2>
        <GlossaryText lang={lang}>
          <p>{t.sections.shaker.intro}</p>
          <p>{t.sections.shaker.text}</p>
        </GlossaryText>
        <ol>
          {t.sections.shaker.instructions.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          <em>{t.sections.shaker.note}</em>
        </p>
      </section>

      <section id="instant" className="mt-12">
        <h2>{t.sections.instant.title}</h2>
        <p>{t.sections.instant.intro}</p>
        <ul>
          {t.sections.instant.items.map((item: any, index: number) => (
            <li key={index}>
              <strong>{item.name}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section id="tipps" className="mt-12">
        <h2>{t.sections.tipps.title}</h2>
        <Alert className="my-6 bg-accent/20 border-accent">
          <Info className="h-4 w-4" />
          <AlertTitle>{t.sections.tipps.alert.title}</AlertTitle>
          <AlertDescription>
            <span dangerouslySetInnerHTML={{ __html: t.sections.tipps.alert.text }} />
          </AlertDescription>
        </Alert>
        <ul>
          {t.sections.tipps.tips.map((tip: any, index: number) => (
            <li key={index}>
              <strong>{tip.name}:</strong> {tip.text}
            </li>
          ))}
        </ul>
      </section>
    </WikiPageLayout>
  );
}
