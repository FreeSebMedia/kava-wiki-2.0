import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Timer,
  Lightbulb,
  ArrowRight,
  Star,
  Volume2,
  Droplet
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/\/de\//g, `/${lang}/`);
}

const stepIcons = [Scale, Droplet, Volume2, Droplet, CheckCircle2];

export default function ZubereitungBlender() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['zubereitungBlender'],
    lang: lang as any
  });

  if (isLoading || !translations.zubereitungBlender) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.zubereitungBlender;

  const breadcrumbs = [
    { label: t.breadcrumbs.home, href: `/${lang}` },
    { label: t.breadcrumbs.zubereitung, href: `/${lang}/zubereitung` },
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
      <section id="uebersicht">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">8-10 Min</div>
              <div className="text-sm text-muted-foreground">{t.ui.totalTime}</div>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold text-amber-600">{t.ui.fast}</div>
              <div className="text-sm text-muted-foreground">{t.ui.lowEffort}</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{t.ui.highPotency}</div>
              <div className="text-sm text-muted-foreground">{t.ui.effectiveExtraction}</div>
            </CardContent>
          </Card>
        </div>

        <GlossaryText lang={lang}>
          <p className="lead text-xl mb-6" dangerouslySetInnerHTML={{ __html: t.overview.intro }} />
        </GlossaryText>

        <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">{t.overview.alert.title}</AlertTitle>
          <AlertDescription className="text-blue-700">{t.overview.alert.text}</AlertDescription>
        </Alert>
      </section>

      <section id="material" className="mt-12">
        <h2>{t.materials.title}</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                {t.ui.essential}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.materials.essential.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold">●</span>
                    <div>
                      <strong>{item.name}</strong> {item.type && `(${item.type})`}
                      <p className="text-sm text-muted-foreground">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                {t.ui.importantForBestResults}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.materials.recommended.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">●</span>
                    <div>
                      <strong>{item.name}</strong>
                      <p className="text-sm text-muted-foreground">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-6 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-700">{t.materials.alert.title}</AlertTitle>
          <AlertDescription className="text-amber-700">{t.materials.alert.text}</AlertDescription>
        </Alert>
      </section>

      <section id="anleitung" className="mt-12">
        <h2>{t.steps.title}</h2>
        <div className="space-y-8 mt-8">
          {t.steps.items.map((step: any, index: number) => {
            const StepIcon = stepIcons[index] || CheckCircle2;
            return (
              <div key={step.id} id={step.id} className="relative">
                <Card className="overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                        </div>
                        <div>
                          <div className="text-xl">{step.title}</div>
                          <div className="text-sm font-normal text-muted-foreground flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            {step.duration}
                          </div>
                        </div>
                      </CardTitle>
                      <StepIcon className="h-8 w-8 text-blue-500/50" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-4">{step.description}</p>
                    <ul className="space-y-2 mb-4">
                      {step.details.map((detail: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-blue-500/5 rounded-lg p-4 flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-600">{t.ui.tip}:</strong> {step.tip}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      <section id="vergleich" className="mt-12">
        <h2>{t.comparison.title}</h2>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold border-b">{t.ui.aspect}</th>
                <th className="text-left p-4 font-semibold border-b">{t.ui.traditional}</th>
                <th className="text-left p-4 font-semibold border-b">{t.ui.blender}</th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.items.map((item: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="p-4 border-b font-medium">{item.aspect}</td>
                  <td className={`p-4 border-b ${item.winner === 'traditional' ? 'text-green-700 font-medium' : ''}`}>
                    {item.traditional}
                    {item.winner === 'traditional' && <span className="ml-2">✓</span>}
                  </td>
                  <td className={`p-4 border-b ${item.winner === 'blender' ? 'text-green-700 font-medium' : ''}`}>
                    {item.blender}
                    {item.winner === 'blender' && <span className="ml-2">✓</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.comparison.conclusion }} />
      </section>

      <section id="tipps" className="mt-12">
        <h2>{t.expertTips.title}</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {t.expertTips.items.map((tip: any, index: number) => (
            <Card key={index} className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  {tip.name}
                </h3>
                <p className="text-sm">{tip.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">{t.ui.otherMethods}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={replaceLinks(t.navigation.traditional.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.traditional.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.traditional.subtitle}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
          <Link href={replaceLinks(t.navigation.instant.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.instant.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.instant.subtitle}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="mt-4">
          <Link href={replaceLinks(t.navigation.calculator.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow bg-primary/5 border-primary/20">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-primary">{t.navigation.calculator.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.calculator.subtitle}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </WikiPageLayout>
  );
}
