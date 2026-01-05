import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Star,
  Sparkles,
  Coffee,
  Info
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function replaceLinks(html: string, lang: string): string {
  return html.replace(/\/de\//g, `/${lang}/`);
}

export default function ZubereitungInstant() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['zubereitungInstant'],
    lang: lang as any
  });

  if (isLoading || !translations.zubereitungInstant) {
    return <div className="min-h-screen bg-background" />;
  }

  const t = translations.zubereitungInstant;

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
              <div className="text-2xl font-bold text-primary">30 Sek</div>
              <div className="text-sm text-muted-foreground">{t.ui.prepTime}</div>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="pt-6 text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold text-amber-600">{t.ui.noFilter}</div>
              <div className="text-sm text-muted-foreground">{t.ui.justStir}</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="pt-6 text-center">
              <Coffee className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{t.ui.practical}</div>
              <div className="text-sm text-muted-foreground">{t.ui.idealForTravel}</div>
            </CardContent>
          </Card>
        </div>

        <GlossaryText lang={lang}>
          <p className="lead text-xl mb-6" dangerouslySetInnerHTML={{ __html: t.overview.intro }} />
        </GlossaryText>
      </section>

      <section id="was-ist" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t.whatIs.title}</h2>
          <p className="mb-4">{t.whatIs.text}</p>
        </GlossaryText>
        
        <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">{t.whatIs.alert.title}</AlertTitle>
          <AlertDescription className="text-blue-700">
            <span dangerouslySetInnerHTML={{ __html: t.whatIs.alert.text }} />
          </AlertDescription>
        </Alert>
      </section>

      <section id="arten" className="mt-12">
        <h2>{t.types.title}</h2>
        <div className="space-y-6 mt-6">
          {t.types.items.map((type: any, idx: number) => (
            <Card key={idx} className={`border-l-4 ${
              type.color === 'amber' ? 'border-l-amber-500' :
              type.color === 'purple' ? 'border-l-purple-500' :
              'border-l-blue-500'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{type.name}</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    type.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                    type.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {t.ui.potency}: {type.potency}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{type.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">{t.ui.advantages}</h4>
                    <ul className="space-y-1">
                      {type.pros.map((pro: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2">{t.ui.disadvantages}</h4>
                    <ul className="space-y-1">
                      {type.cons.map((con: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="anleitung" className="mt-12">
        <h2>{t.preparation.title}</h2>
        <p className="mb-6">{t.preparation.intro}</p>

        <div className="grid md:grid-cols-3 gap-4">
          {t.preparation.steps.map((step: any) => (
            <Card key={step.number} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mt-6 bg-amber-500/10 border-amber-500/30">
          <Lightbulb className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-700">{t.preparation.alert.title}</AlertTitle>
          <AlertDescription className="text-amber-700">{t.preparation.alert.text}</AlertDescription>
        </Alert>
      </section>

      <section id="dosierung" className="mt-12">
        <h2>{t.dosage.title}</h2>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold border-b">{t.ui.productType}</th>
                <th className="text-left p-4 font-semibold border-b">{t.ui.beginner}</th>
                <th className="text-left p-4 font-semibold border-b">{t.ui.regular}</th>
                <th className="text-left p-4 font-semibold border-b">{t.ui.experienced}</th>
              </tr>
            </thead>
            <tbody>
              {t.dosage.items.map((item: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="p-4 border-b font-medium">{item.type}</td>
                  <td className="p-4 border-b text-green-700">{item.beginner}</td>
                  <td className="p-4 border-b text-blue-700">{item.regular}</td>
                  <td className="p-4 border-b text-purple-700">{item.experienced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.dosage.note }} />
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
                <th className="text-left p-4 font-semibold border-b">{t.ui.instant}</th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.items.map((item: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="p-4 border-b font-medium">{item.aspect}</td>
                  <td className="p-4 border-b">{item.traditional}</td>
                  <td className="p-4 border-b">{item.blender}</td>
                  <td className="p-4 border-b">{item.instant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="tipps" className="mt-12">
        <h2>{t.tips.title}</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {t.tips.items.map((tip: any, index: number) => (
            <Card key={index} className="bg-gradient-to-br from-purple-500/5 to-purple-500/10">
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

        <Alert className="mt-6 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-700">{t.tips.alert.title}</AlertTitle>
          <AlertDescription className="text-amber-700">{t.tips.alert.text}</AlertDescription>
        </Alert>
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
          <Link href={replaceLinks(t.navigation.blender.href, lang)}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{t.navigation.blender.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.navigation.blender.subtitle}</p>
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
