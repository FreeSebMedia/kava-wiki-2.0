import { Link, useLocation } from "wouter";
import { ArrowRight, BookOpen, ShieldCheck, Leaf, Beaker, History, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { useTranslations } from "@/hooks/useTranslations";
import { type Language } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  beaker: Beaker,
  history: History,
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/botanik": Leaf,
  "/geschichte": History,
  "/inhaltsstoffe": Beaker,
  "/studien": BookOpen,
  "/wirkung": ArrowRight,
  "/sicherheit": ShieldCheck,
  "/sorten": Map,
  "/zubereitung": Beaker,
};

export default function Home() {
  const [location] = useLocation();
  const lang = (location.split('/')[1] || 'de') as Language;
  const linkTo = (path: string) => `/${lang}${path}`;

  const { t, isLoading } = useTranslations({
    namespaces: ['home'],
    lang
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="h-[90vh] flex items-center justify-center">
          <div className="animate-pulse text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  const stats = t('stats') as { label: string; value: string; suffix: string }[];
  const features = t('features') as { icon: string; title: string; text: string }[];
  const categoriesData = t('categories') as { title: string; subtitle: string; items: { title: string; desc: string; link: string }[] };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={t('meta.title') as string} 
        description={t('meta.description') as string}
        canonical={`/${lang}`}
      />
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-home.jpg" 
            alt="Kava Plant in Vanuatu Jungle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
        </div>

        <div className="container relative z-10 text-center text-white max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 tracking-wider uppercase">
            {t('hero.badge')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-lg text-white">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-2xl text-white mb-10 max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={linkTo("/studien")}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none text-lg px-8 h-14 rounded-full shadow-xl transition-transform hover:scale-105">
                {t('hero.cta.studies')}
              </Button>
            </Link>
            <Link href={linkTo("/botanik")}>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 h-14 rounded-full transition-transform hover:scale-105">
                {t('hero.cta.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-b border-border/50 -mt-20 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.isArray(stats) && stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs text-muted-foreground/70">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-12 pb-8 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                {t('intro.title')} <br/>
                <span className="text-primary italic">{t('intro.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('intro.text')}
              </p>
              
              <div className="space-y-2">
                {Array.isArray(features) && features.map((item, i) => {
                  const IconComponent = iconMap[item.icon] || ShieldCheck;
                  return (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground inline-block mr-2">{item.title}</h3>
                        <span className="text-muted-foreground">{item.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-50" />
              <img 
                src="/images/hero-science.jpg" 
                alt="Kava Science" 
                className="relative rounded-[2rem] shadow-2xl border border-white/20 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs hidden md:block">
                <p className="font-serif italic text-lg text-primary mb-2">"{t('intro.quote')}"</p>
                <p className="text-xs text-muted-foreground">{t('intro.quoteSource')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-12 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-serif text-4xl font-bold mb-4">{categoriesData?.title || 'Wissensdatenbank'}</h2>
            <p className="text-muted-foreground text-lg">
              {categoriesData?.subtitle || ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData?.items && Array.isArray(categoriesData.items) && categoriesData.items.map((cat, i) => {
              const IconComponent = categoryIcons[cat.link] || Leaf;
              return (
                <Link key={i} href={linkTo(cat.link)}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group border-border/50 bg-card/50">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">{cat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{cat.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#3E2723] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-roots.jpg')] bg-cover bg-center mix-blend-overlay" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <span className="text-white/90 text-sm font-bold tracking-widest uppercase mb-2 block">{t('partner.label')}</span>
              <h3 className="font-serif text-3xl font-bold mb-4 text-white">{t('partner.title')}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('partner.text')}
              </p>
              <Button variant="outline" className="border-white/50 text-white hover:bg-white hover:text-black transition-colors">
                {t('partner.cta')}
              </Button>
            </div>

            <div className="flex flex-col items-center text-center md:text-left md:items-start">
              <span className="text-white/90 text-sm font-bold tracking-widest uppercase mb-2 block">{t('book.label')}</span>
              <h3 className="font-serif text-3xl font-bold mb-4 text-white">{t('book.title')}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('book.text')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 bg-white/10 rounded shadow-lg flex items-center justify-center border border-white/20">
                  <BookOpen className="w-8 h-8 text-white/50" />
                </div>
                <Button className="bg-white text-black hover:bg-white/90">
                  {t('book.cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
