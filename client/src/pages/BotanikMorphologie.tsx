import { useMemo } from "react";
import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

const NAMESPACES = ['botanik-morphologie', 'common'];

export default function BotanikMorphologie() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ 
    namespaces: NAMESPACES, 
    lang 
  });

  const toc = useMemo(() => [
    { id: "ueberblick", title: t('botanik-morphologie:toc.ueberblick'), level: 1 },
    { id: "wurzelsystem", title: t('botanik-morphologie:toc.wurzelsystem'), level: 1 },
    { id: "stumpf", title: t('botanik-morphologie:toc.stumpf'), level: 2 },
    { id: "seitenwurzeln", title: t('botanik-morphologie:toc.seitenwurzeln'), level: 2 },
    { id: "kavalacton-verteilung", title: t('botanik-morphologie:toc.kavalactonVerteilung'), level: 2 },
    { id: "staengel", title: t('botanik-morphologie:toc.staengel'), level: 1 },
    { id: "blaetter", title: t('botanik-morphologie:toc.blaetter'), level: 1 },
    { id: "blueten", title: t('botanik-morphologie:toc.blueten'), level: 1 },
  ], [t]);

  if (isLoading) {
    return (
      <WikiPageLayout
        title="..."
        subtitle="..."
        category="..."
        lang={lang}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </WikiPageLayout>
    );
  }

  return (
    <WikiPageLayout
      title={t('botanik-morphologie:page.title')}
      subtitle={t('botanik-morphologie:page.subtitle')}
      category={t('botanik-morphologie:page.category')}
      heroImage="/images/hero-home.jpg"
      toc={toc as any}
      tocTitle={t('common:toc.title')}
      breadcrumbs={[
        { label: t('botanik-morphologie:breadcrumbs.home'), href: `/${lang}` },
        { label: t('botanik-morphologie:breadcrumbs.botanik'), href: `/${lang}/botanik` },
        { label: t('botanik-morphologie:breadcrumbs.morphologie') }
      ]}
      lang={lang}
    >
      <section id="intro">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:intro.paragraph1') }} />
        </GlossaryText>
      </section>

      <section id="ueberblick" className="mt-12">
        <GlossaryText lang={lang as Language}>
          <h2>{t('botanik-morphologie:overview.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:overview.paragraph1') }} />
        </GlossaryText>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t('botanik-morphologie:overview.table.headers.plantPart')}</TableHead>
                <TableHead>{t('botanik-morphologie:overview.table.headers.characteristic')}</TableHead>
                <TableHead>{t('botanik-morphologie:overview.table.headers.kavalactoneContent')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{t('botanik-morphologie:overview.table.rows.rootstock.name')}</TableCell>
                <TableCell>{t('botanik-morphologie:overview.table.rows.rootstock.characteristic')}</TableCell>
                <TableCell className="text-primary font-medium">{t('botanik-morphologie:overview.table.rows.rootstock.content')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t('botanik-morphologie:overview.table.rows.lateralRoots.name')}</TableCell>
                <TableCell>{t('botanik-morphologie:overview.table.rows.lateralRoots.characteristic')}</TableCell>
                <TableCell className="text-primary font-medium">{t('botanik-morphologie:overview.table.rows.lateralRoots.content')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t('botanik-morphologie:overview.table.rows.stem.name')}</TableCell>
                <TableCell>{t('botanik-morphologie:overview.table.rows.stem.characteristic')}</TableCell>
                <TableCell className="text-muted-foreground">{t('botanik-morphologie:overview.table.rows.stem.content')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t('botanik-morphologie:overview.table.rows.leaves.name')}</TableCell>
                <TableCell>{t('botanik-morphologie:overview.table.rows.leaves.characteristic')}</TableCell>
                <TableCell className="text-muted-foreground">{t('botanik-morphologie:overview.table.rows.leaves.content')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t('botanik-morphologie:overview.table.rows.flowers.name')}</TableCell>
                <TableCell>{t('botanik-morphologie:overview.table.rows.flowers.characteristic')}</TableCell>
                <TableCell className="text-muted-foreground">{t('botanik-morphologie:overview.table.rows.flowers.content')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="wurzelsystem" className="mt-12">
        <h2>{t('botanik-morphologie:rootSystem.title')}</h2>
        <p>{t('botanik-morphologie:rootSystem.paragraph1')}</p>

        <Alert className="my-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>{t('botanik-morphologie:rootSystem.qualityAlert.title')}</strong> {t('botanik-morphologie:rootSystem.qualityAlert.text')}
          </AlertDescription>
        </Alert>

        <div id="stumpf" className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="mt-0 text-primary text-xl">{t('botanik-morphologie:rootSystem.stump.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:rootSystem.stump.paragraph1') }} />
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:rootSystem.stump.properties.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:rootSystem.stump.properties.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:rootSystem.stump.kavalactoneProfile.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:rootSystem.stump.kavalactoneProfile.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div id="seitenwurzeln" className="bg-accent/10 p-6 rounded-xl border border-accent/30 my-8">
          <h3 className="mt-0 text-accent-foreground text-xl">{t('botanik-morphologie:rootSystem.lateralRoots.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:rootSystem.lateralRoots.paragraph1') }} />
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:rootSystem.lateralRoots.properties.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:rootSystem.lateralRoots.properties.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:rootSystem.lateralRoots.kavalactoneProfile.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:rootSystem.lateralRoots.kavalactoneProfile.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div id="kavalacton-verteilung" className="mt-8">
          <h3>{t('botanik-morphologie:rootSystem.distribution.title')}</h3>
          <p>{t('botanik-morphologie:rootSystem.distribution.paragraph1')}</p>

          <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('botanik-morphologie:rootSystem.distribution.table.headers.plantPart')}</TableHead>
                  <TableHead>{t('botanik-morphologie:rootSystem.distribution.table.headers.kavalactoneContent')}</TableHead>
                  <TableHead>{t('botanik-morphologie:rootSystem.distribution.table.headers.usage')}</TableHead>
                  <TableHead>{t('botanik-morphologie:rootSystem.distribution.table.headers.qualityLevel')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.lateralRoots.name')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.lateralRoots.content')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.lateralRoots.usage')}</TableCell>
                  <TableCell className="text-green-600 font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.lateralRoots.quality')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.stump.name')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.stump.content')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.stump.usage')}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.stump.quality')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.basalStem.name')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.basalStem.content')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.basalStem.usage')}</TableCell>
                  <TableCell className="text-yellow-600 font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.basalStem.quality')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.upperStem.name')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.upperStem.content')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.upperStem.usage')}</TableCell>
                  <TableCell className="text-orange-600 font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.upperStem.quality')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.leaves.name')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.leaves.content')}</TableCell>
                  <TableCell>{t('botanik-morphologie:rootSystem.distribution.table.rows.leaves.usage')}</TableCell>
                  <TableCell className="text-red-600 font-medium">{t('botanik-morphologie:rootSystem.distribution.table.rows.leaves.quality')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Alert variant="destructive" className="my-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('botanik-morphologie:rootSystem.distribution.warningAlert.title')}</strong> {t('botanik-morphologie:rootSystem.distribution.warningAlert.text')}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section id="staengel" className="mt-12">
        <h2>{t('botanik-morphologie:stems.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:stems.paragraph1') }} />

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-morphologie:stems.structure.title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              {(t('botanik-morphologie:stems.structure.items') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-morphologie:stems.varietyFeatures.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('botanik-morphologie:stems.varietyFeatures.paragraph1')}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              {(t('botanik-morphologie:stems.varietyFeatures.items') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="blaetter" className="mt-12">
        <h2>{t('botanik-morphologie:leaves.title')}</h2>
        <p>{t('botanik-morphologie:leaves.paragraph1')}</p>

        <div className="bg-muted/30 p-6 rounded-xl border border-border my-8">
          <h3 className="mt-0 text-primary">{t('botanik-morphologie:leaves.characteristics.title')}</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div>
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:leaves.characteristics.formSize.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:leaves.characteristics.formSize.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:leaves.characteristics.surface.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:leaves.characteristics.surface.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">{t('botanik-morphologie:leaves.characteristics.color.title')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-0">
                {(t('botanik-morphologie:leaves.characteristics.color.items') as unknown as string[])?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="blueten" className="mt-12">
        <h2>{t('botanik-morphologie:flowers.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:flowers.paragraph1') }} />

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-morphologie:flowers.flowerStructure.title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              {(t('botanik-morphologie:flowers.flowerStructure.items') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-morphologie:flowers.sterility.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:flowers.sterility.paragraph1') }} />
            <ul className="text-sm text-muted-foreground space-y-2 mb-0">
              {(t('botanik-morphologie:flowers.sterility.items') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p dangerouslySetInnerHTML={{ __html: t('botanik-morphologie:flowers.paragraph2') }} />
      </section>

      {/* Navigation to next chapter */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('botanik-morphologie:navigation.continueText')}</p>
        <Link href={`/${lang}/botanik/anbau`}>
          <div className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{t('botanik-morphologie:navigation.nextChapter.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('botanik-morphologie:navigation.nextChapter.description')}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </WikiPageLayout>
  );
}
