import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowRight, Beaker } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";

export default function InhaltsstoffeKavalactone() {
  const [location] = useLocation();
  const pathLang = location.split('/')[1];
  const lang = (pathLang in languages ? pathLang : 'de') as Language;
  
  const { t, isLoading } = useTranslations({ 
    namespaces: ['inhaltsstoffeKavalactone'], 
    lang 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const toc = [
    { id: "einfuehrung", title: t('toc.einfuehrung'), level: 1 },
    { id: "struktur", title: t('toc.struktur'), level: 1 },
    { id: "uebersicht", title: t('toc.uebersicht'), level: 1 },
    { id: "kavain", title: t('toc.kavain'), level: 2 },
    { id: "dihydrokavain", title: t('toc.dihydrokavain'), level: 2 },
    { id: "methysticin", title: t('toc.methysticin'), level: 2 },
    { id: "dihydromethysticin", title: t('toc.dihydromethysticin'), level: 2 },
    { id: "yangonin", title: t('toc.yangonin'), level: 2 },
    { id: "desmethoxyyangonin", title: t('toc.desmethoxyyangonin'), level: 2 },
    { id: "wirkmechanismen", title: t('toc.wirkmechanismen'), level: 1 },
    { id: "synergien", title: t('toc.synergien'), level: 1 },
  ];

  const strukturTableData = t('struktur.tableData') || [];
  const wirkmechanismenTableData = t('wirkmechanismen.tableData') || [];

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={t('toc.title') as string}
      lang={lang}
      breadcrumbs={[
        { label: t('breadcrumbs.home'), href: `/${lang}` },
        { label: t('breadcrumbs.inhaltsstoffe'), href: `/${lang}/inhaltsstoffe` },
        { label: t('breadcrumbs.current') },
      ]}
    >
      <section id="einfuehrung">
        <GlossaryText lang={lang}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('einfuehrung.paragraph1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('einfuehrung.paragraph2') }} />
        </GlossaryText>
      </section>

      <section id="struktur" className="mt-12">
        <GlossaryText lang={lang}>
          <h2>{t('struktur.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('struktur.intro') }} />
        </GlossaryText>
        <ul>
          {Array.isArray(t('struktur.items')) && (t('struktur.items') as any[]).map((item: any, index: number) => (
            <li key={index}><strong>{item.label}:</strong> {item.text}</li>
          ))}
        </ul>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">{t('struktur.tableHeaders.number')}</TableHead>
                <TableHead>{t('struktur.tableHeaders.kavalacton')}</TableHead>
                <TableHead>{t('struktur.tableHeaders.formula')}</TableHead>
                <TableHead>{t('struktur.tableHeaders.mass')}</TableHead>
                <TableHead>{t('struktur.tableHeaders.feature')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(strukturTableData) && strukturTableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-mono font-bold">{row.number}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="font-mono text-sm">{row.formula}</TableCell>
                  <TableCell>{row.mass}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.feature}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="uebersicht" className="mt-12">
        <h2>{t('uebersicht.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('uebersicht.intro') }} />
      </section>

      {/* Kavain */}
      <section id="kavain" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{t('kavain.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('kavain.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('kavain.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('kavain.description') }} />
        </GlossaryText>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('kavain.effectsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('kavain.effects')) && (t('kavain.effects') as string[]).map((effect, i) => (
                <li key={i}>• {effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('kavain.mechanismsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('kavain.mechanisms')) && (t('kavain.mechanisms') as string[]).map((mech, i) => (
                <li key={i}>• {mech}</li>
              ))}
            </ul>
          </div>
        </div>
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('kavain.clinicalNote') }} />
        </Alert>
      </section>

      {/* Dihydrokavain */}
      <section id="dihydrokavain" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{t('dihydrokavain.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('dihydrokavain.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('dihydrokavain.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('dihydrokavain.description') }} />
        </GlossaryText>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('dihydrokavain.effectsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('dihydrokavain.effects')) && (t('dihydrokavain.effects') as string[]).map((effect, i) => (
                <li key={i}>• {effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('dihydrokavain.mechanismsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('dihydrokavain.mechanisms')) && (t('dihydrokavain.mechanisms') as string[]).map((mech, i) => (
                <li key={i}>• {mech}</li>
              ))}
            </ul>
          </div>
        </div>
        <Alert className="bg-muted border-border">
          <Beaker className="h-4 w-4" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('dihydrokavain.typicalFor') }} />
        </Alert>
      </section>

      {/* Methysticin */}
      <section id="methysticin" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{t('methysticin.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('methysticin.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('methysticin.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('methysticin.description') }} />
        </GlossaryText>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('methysticin.effectsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('methysticin.effects')) && (t('methysticin.effects') as string[]).map((effect, i) => (
                <li key={i}>• {effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('methysticin.researchTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('methysticin.research')) && (t('methysticin.research') as string[]).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dihydromethysticin */}
      <section id="dihydromethysticin" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-destructive">{t('dihydromethysticin.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('dihydromethysticin.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('dihydromethysticin.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('dihydromethysticin.description') }} />
        </GlossaryText>
        <Alert className="bg-destructive/10 border-destructive/30 my-6">
          <Info className="h-4 w-4 text-destructive" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('dihydromethysticin.warning') }} />
        </Alert>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('dihydromethysticin.propertiesTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('dihydromethysticin.properties')) && (t('dihydromethysticin.properties') as string[]).map((prop, i) => (
                <li key={i}>• {prop}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('dihydromethysticin.occurrenceTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('dihydromethysticin.occurrence')) && (t('dihydromethysticin.occurrence') as string[]).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Yangonin */}
      <section id="yangonin" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{t('yangonin.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('yangonin.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('yangonin.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('yangonin.description') }} />
        </GlossaryText>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('yangonin.effectsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('yangonin.effects')) && (t('yangonin.effects') as string[]).map((effect, i) => (
                <li key={i}>• {effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('yangonin.mechanismsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('yangonin.mechanisms')) && (t('yangonin.mechanisms') as string[]).map((mech, i) => (
                <li key={i}>• {mech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Desmethoxyyangonin */}
      <section id="desmethoxyyangonin" className="mt-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{t('desmethoxyyangonin.number')}</span>
          </div>
          <div>
            <h2 className="mb-0">{t('desmethoxyyangonin.name')}</h2>
            <p className="text-muted-foreground mb-0">{t('desmethoxyyangonin.subtitle')}</p>
          </div>
        </div>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('desmethoxyyangonin.description') }} />
        </GlossaryText>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('desmethoxyyangonin.effectsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('desmethoxyyangonin.effects')) && (t('desmethoxyyangonin.effects') as string[]).map((effect, i) => (
                <li key={i}>• {effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">{t('desmethoxyyangonin.mechanismsTitle')}</h4>
            <ul className="space-y-1 text-sm">
              {Array.isArray(t('desmethoxyyangonin.mechanisms')) && (t('desmethoxyyangonin.mechanisms') as string[]).map((mech, i) => (
                <li key={i}>• {mech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Wirkmechanismen */}
      <section id="wirkmechanismen" className="mt-12">
        <h2>{t('wirkmechanismen.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('wirkmechanismen.intro') }} />
        
        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('wirkmechanismen.tableHeaders.mechanism')}</TableHead>
                <TableHead>{t('wirkmechanismen.tableHeaders.kavalactones')}</TableHead>
                <TableHead>{t('wirkmechanismen.tableHeaders.effect')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(wirkmechanismenTableData) && wirkmechanismenTableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.mechanism}</TableCell>
                  <TableCell className="font-mono text-sm">{row.kavalactones}</TableCell>
                  <TableCell>{row.effect}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Synergien */}
      <section id="synergien" className="mt-12">
        <h2>{t('synergien.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('synergien.paragraph1') }} />
        
        <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
          {t('synergien.quote')}
        </blockquote>
        
        <p dangerouslySetInnerHTML={{ __html: t('synergien.paragraph2') }} />
        
        <div className="bg-muted/50 p-6 rounded-xl border border-border my-6">
          <h3 className="mt-0 text-primary font-serif">{t('synergien.practicalTitle')}</h3>
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: t('synergien.practicalText') }} />
        </div>
      </section>

      {/* Navigation */}
      <section className="mt-16 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">{t('navigation.nextChapter')}</h3>
        <Link href={`/${lang}/inhaltsstoffe/chemotypen`}>
          <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">{t('navigation.chemotypenTitle')}</h4>
                <p className="text-sm text-muted-foreground">{t('navigation.chemotypenDescription')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>
    </WikiPageLayout>
  );
}
