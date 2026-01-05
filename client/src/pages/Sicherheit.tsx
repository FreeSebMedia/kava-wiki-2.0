import WikiPageLayout from "@/components/WikiPageLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Shield, Pill, Ban, Activity, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import GlossaryText from "@/components/GlossaryText";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  pill: Pill,
  ban: Ban,
};

export default function Sicherheit() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;

  const { translations, isLoading } = useTranslations({
    namespaces: ['sicherheit'],
    lang
  });

  const data = translations.sicherheit || {};
  const toc = data.toc?.items || [];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <WikiPageLayout
      title={data.page?.title || "Sicherheit & Gesundheit"}
      subtitle={data.page?.subtitle || ""}
      category={data.page?.category || "Sicherheit"}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={data.toc?.title}
    >
      <section id="konsens">
        <Alert className="bg-primary/10 border-primary/20 mb-8">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold text-lg">{data.konsens?.title}</AlertTitle>
          <AlertDescription className="text-primary/80 mt-2">
            <p className="mb-3" dangerouslySetInnerHTML={{ __html: data.konsens?.intro || '' }} />
            <ul className="space-y-2">
              {data.konsens?.points?.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">●</span>
                  <span dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      <section id="kapitel" className="mt-12">
        <h2 className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          {data.kapitel?.title}
        </h2>

        <GlossaryText lang={lang}>
          <p>{data.kapitel?.intro}</p>
        </GlossaryText>

        <div className="grid gap-6 my-8">
          {data.kapitel?.subpages?.map((page: any) => {
            const IconComponent = iconMap[page.icon] || Activity;
            const href = page.href?.replace('/de/', `/${lang}/`) || '#';
            return (
              <Link
                key={page.href}
                href={href}
                className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors mt-0 mb-2">
                        {page.title}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{page.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {page.highlights?.map((highlight: string) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="dosierung" className="mt-12">
        <h2>{data.dosierung?.title}</h2>
        <GlossaryText lang={lang}>
          <p>{data.dosierung?.intro}</p>
        </GlossaryText>
        
        <div className="bg-card border border-border rounded-xl p-6 my-6">
          <h3 className="mt-0 mb-4">{data.dosierung?.boxTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-bold text-primary mb-2">{data.dosierung?.medical?.title}</h4>
              <p className="text-2xl font-bold">{data.dosierung?.medical?.value}</p>
              <p className="text-sm text-muted-foreground">{data.dosierung?.medical?.unit}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-bold mb-2">{data.dosierung?.traditional?.title}</h4>
              <p className="text-2xl font-bold">{data.dosierung?.traditional?.value}</p>
              <p className="text-sm text-muted-foreground">{data.dosierung?.traditional?.unit}</p>
            </div>
          </div>
        </div>

        <h3>{data.dosierung?.tableTitle}</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-bold">{data.dosierung?.table?.headers?.level}</th>
                <th className="text-left p-3 font-bold">{data.dosierung?.table?.headers?.amount}</th>
                <th className="text-left p-3 font-bold">{data.dosierung?.table?.headers?.water}</th>
              </tr>
            </thead>
            <tbody>
              {data.dosierung?.table?.rows?.map((row: any, i: number) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium">{row.level}</td>
                  <td className="p-3">{row.amount}</td>
                  <td className="p-3">{row.water}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="nebenwirkungen" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{data.nebenwirkungen?.title}</h2>
          <p>{data.nebenwirkungen?.intro}</p>
        </GlossaryText>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold mb-3">{data.nebenwirkungen?.frequent?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.nebenwirkungen?.frequent?.items?.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>{item.label}</strong> {item.value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold mb-3">{data.nebenwirkungen?.chronic?.title}</h4>
            <ul className="space-y-2 text-sm">
              {data.nebenwirkungen?.chronic?.items?.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>{item.label}</strong> {item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="checkliste" className="mt-12">
        <h2 className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          {data.checkliste?.title}
        </h2>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-6">
          <h4 className="font-bold text-primary mb-4">{data.checkliste?.boxTitle}</h4>
          <ul className="space-y-3">
            {data.checkliste?.items?.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
            {data.checkliste?.linkItems?.map((item: any, i: number) => (
              <li key={`link-${i}`} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  <Link href={item.href?.replace('/de/', `/${lang}/`) || '#'} className="text-primary hover:underline">
                    {item.linkText}
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Alert variant="destructive" className="my-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{data.checkliste?.warning?.title}</AlertTitle>
          <AlertDescription>{data.checkliste?.warning?.text}</AlertDescription>
        </Alert>
      </section>

      <section className="mt-16 pt-8 border-t border-border">
        <h3 className="text-lg font-bold mb-4">{data.quickLinks?.title}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data.quickLinks?.links?.map((link: any) => {
            const IconComponent = iconMap[link.icon] || Activity;
            const href = link.href?.replace('/de/', `/${lang}/`) || '#';
            return (
              <Link
                key={link.href}
                href={href}
                className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <IconComponent className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-bold group-hover:text-primary transition-colors">{link.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </WikiPageLayout>
  );
}
