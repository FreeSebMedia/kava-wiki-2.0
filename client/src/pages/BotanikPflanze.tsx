import WikiPageLayout from "@/components/WikiPageLayout";
import GlossaryText from "@/components/GlossaryText";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BotanikPflanze() {
  const { lang } = useLanguage();
  const { t, isLoading } = useTranslations({ lang, namespaces: ['botanik-pflanze', 'common'] });

  const toc = [
    { id: "taxonomie", title: t('botanik-pflanze:toc.taxonomie'), level: 1 },
    { id: "name", title: t('botanik-pflanze:toc.name'), level: 1 },
    { id: "wichmannii", title: t('botanik-pflanze:toc.wichmannii'), level: 1 },
    { id: "unterschiede", title: t('botanik-pflanze:toc.unterschiede'), level: 2 },
    { id: "domestikation", title: t('botanik-pflanze:toc.domestikation'), level: 1 },
    { id: "kulturgut", title: t('botanik-pflanze:toc.kulturgut'), level: 1 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const taxonomyRows = ['reich', 'unterreich', 'abteilung', 'klasse', 'ordnung', 'familie', 'gattung', 'art'];
  const localNameRows = ['vanuatu', 'fiji', 'tonga', 'samoa', 'hawaii', 'pohnpei'];
  const differenceRows = ['fortpflanzung', 'chromosomen', 'kavalacton', 'chemotyp', 'verbreitung', 'nutzung'];

  return (
    <WikiPageLayout
      title={t('botanik-pflanze:page.title')}
      subtitle={t('botanik-pflanze:page.subtitle')}
      category={t('botanik-pflanze:page.category')}
      heroImage="/images/hero-home.jpg"
      toc={toc as any}
      tocTitle={t('common:toc.title')}
      lang={lang}
      breadcrumbs={[
        { label: t('botanik-pflanze:breadcrumbs.home'), href: `/${lang}` },
        { label: t('botanik-pflanze:breadcrumbs.botanik'), href: `/${lang}/botanik` },
        { label: t('botanik-pflanze:breadcrumbs.pflanze') }
      ]}
    >
      <section id="intro">
        <GlossaryText lang={lang as Language}>
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:intro.paragraph1') }} />
        </GlossaryText>
      </section>

      <section id="taxonomie" className="mt-12">
        <GlossaryText lang={lang as Language}>
          <h2>{t('botanik-pflanze:taxonomie.title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:taxonomie.intro') }} />
        </GlossaryText>
        
        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t('botanik-pflanze:taxonomie.table.headers.rank')}</TableHead>
                <TableHead>{t('botanik-pflanze:taxonomie.table.headers.classification')}</TableHead>
                <TableHead>{t('botanik-pflanze:taxonomie.table.headers.note')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxonomyRows.map((row) => (
                <TableRow key={row}>
                  <TableCell className="font-medium">{t(`botanik-pflanze:taxonomie.table.rows.${row}.rank`)}</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: t(`botanik-pflanze:taxonomie.table.rows.${row}.classification`) }} />
                  <TableCell className="text-muted-foreground text-sm">{t(`botanik-pflanze:taxonomie.table.rows.${row}.note`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:taxonomie.forster') }} />
      </section>

      <section id="name" className="mt-12">
        <h2>{t('botanik-pflanze:name.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:name.intro') }} />
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-2">{t('botanik-pflanze:name.piper.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:name.piper.description') }} />
          </div>
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-2">{t('botanik-pflanze:name.methysticum.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:name.methysticum.description') }} />
          </div>
        </div>

        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:name.localNames.intro') }} />

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('botanik-pflanze:name.localNames.headers.region')}</TableHead>
                <TableHead>{t('botanik-pflanze:name.localNames.headers.name')}</TableHead>
                <TableHead>{t('botanik-pflanze:name.localNames.headers.meaning')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localNameRows.map((row) => (
                <TableRow key={row}>
                  <TableCell className="font-medium">{t(`botanik-pflanze:name.localNames.rows.${row}.region`)}</TableCell>
                  <TableCell>{t(`botanik-pflanze:name.localNames.rows.${row}.name`)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{t(`botanik-pflanze:name.localNames.rows.${row}.meaning`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="wichmannii" className="mt-12">
        <h2>{t('botanik-pflanze:wichmannii.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:wichmannii.intro') }} />

        <Alert className="my-6">
          <Info className="h-4 w-4" />
          <AlertDescription dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:wichmannii.alert') }} />
        </Alert>

        <div id="unterschiede" className="bg-muted/30 p-6 rounded-xl border border-border my-8">
          <h3 className="mt-0 text-primary" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:wichmannii.differences.title') }} />
          
          <div className="my-6 border rounded-lg overflow-hidden not-prose bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('botanik-pflanze:wichmannii.differences.headers.feature')}</TableHead>
                  <TableHead dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:wichmannii.differences.headers.methysticum') }} />
                  <TableHead dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:wichmannii.differences.headers.wichmannii') }} />
                </TableRow>
              </TableHeader>
              <TableBody>
                {differenceRows.map((row) => (
                  <TableRow key={row}>
                    <TableCell className="font-medium">{t(`botanik-pflanze:wichmannii.differences.rows.${row}.feature`)}</TableCell>
                    <TableCell>{t(`botanik-pflanze:wichmannii.differences.rows.${row}.methysticum`)}</TableCell>
                    <TableCell>{t(`botanik-pflanze:wichmannii.differences.rows.${row}.wichmannii`)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section id="domestikation" className="mt-12">
        <h2>{t('botanik-pflanze:domestikation.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:domestikation.intro') }} />

        <p>{t('botanik-pflanze:domestikation.changes')}</p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-pflanze:domestikation.cards.polyploidie.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:domestikation.cards.polyploidie.description') }} />
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-pflanze:domestikation.cards.fertilitaet.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:domestikation.cards.fertilitaet.description') }} />
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-pflanze:domestikation.cards.wirkprofil.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:domestikation.cards.wirkprofil.description') }} />
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">{t('botanik-pflanze:domestikation.cards.sortenvielfalt.title')}</h3>
            <p className="text-sm text-muted-foreground mb-0" dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:domestikation.cards.sortenvielfalt.description') }} />
          </div>
        </div>
      </section>

      <section id="kulturgut" className="mt-12">
        <h2>{t('botanik-pflanze:kulturgut.title')}</h2>
        <p>{t('botanik-pflanze:kulturgut.paragraph1')}</p>

        <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-lg">
          "{t('botanik-pflanze:kulturgut.quote.text')}"
          <footer className="text-sm text-muted-foreground mt-2 not-italic">— {t('botanik-pflanze:kulturgut.quote.author')}</footer>
        </blockquote>

        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:kulturgut.paragraph2') }} />

        <p dangerouslySetInnerHTML={{ __html: t('botanik-pflanze:kulturgut.paragraph3') }} />
      </section>

      {/* Navigation to next chapter */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">{t('botanik-pflanze:navigation.nextChapter')}</p>
        <Link href={`/${lang}/botanik/morphologie`}>
          <div className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{t('botanik-pflanze:navigation.morphologie.title')}</h4>
              <p className="text-sm text-muted-foreground">{t('botanik-pflanze:navigation.morphologie.description')}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </WikiPageLayout>
  );
}
