import WikiPageLayout from "@/components/WikiPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Beaker, FlaskConical } from "lucide-react";
import { Link, useLocation } from "wouter";
import GlossaryText from "@/components/GlossaryText";
import { useTranslations } from "@/hooks/useTranslations";
import type { Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";

export default function Inhaltsstoffe() {
  const [location] = useLocation();
  const pathLang = location.split('/')[1];
  const lang = (pathLang in languages ? pathLang : 'de') as Language;
  const { t, isLoading } = useTranslations({ 
    namespaces: ['inhaltsstoffe'], 
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
    { id: "uebersicht", title: t('toc.uebersicht'), level: 1 },
    { id: "kavalactone", title: t('toc.kavalactone'), level: 1 },
    { id: "chemotypen", title: t('toc.chemotypen'), level: 1 },
    { id: "synergien", title: t('toc.synergien'), level: 2 },
    { id: "weitere", title: t('toc.weitere'), level: 1 },
    { id: "unterseiten", title: t('toc.unterseiten'), level: 1 },
  ];

  const tableData = t('kavalactone.tableData') || [];

  return (
    <WikiPageLayout
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      category={t('page.category')}
      heroImage="/images/hero-science.jpg"
      toc={toc as any}
      tocTitle={t('toc.title')}
      lang={lang}
    >
      <GlossaryText lang={lang}>
        <section id="uebersicht">
          <p className="lead text-xl" dangerouslySetInnerHTML={{ __html: t('uebersicht.paragraph1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('uebersicht.paragraph2') }} />
        </section>
      </GlossaryText>

      <section id="kavalactone" className="mt-12">
        <h2>{t('kavalactone.title')}</h2>
        <GlossaryText lang={lang}>
          <p dangerouslySetInnerHTML={{ __html: t('kavalactone.intro') }} />
        </GlossaryText>

        <div className="my-8 border rounded-lg overflow-hidden not-prose bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">{t('kavalactone.tableHeaders.number')}</TableHead>
                <TableHead className="w-[180px]">{t('kavalactone.tableHeaders.name')}</TableHead>
                <TableHead className="w-[100px]">{t('kavalactone.tableHeaders.abbreviation')}</TableHead>
                <TableHead>{t('kavalactone.tableHeaders.effect')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(tableData) && tableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-mono font-bold">{row.number}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.abbreviation}</TableCell>
                  <TableCell>{row.effect}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="chemotypen" className="mt-12">
        <h2>{t('chemotypen.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('chemotypen.intro') }} />
        
        <div className="bg-muted/50 p-6 rounded-xl border border-border my-6">
          <h3 className="mt-0 text-primary font-serif">{t('chemotypen.exampleTitle')}</h3>
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: t('chemotypen.exampleText') }} />
        </div>

        <h3>{t('chemotypen.nobleTudeiTitle')}</h3>
        <p dangerouslySetInnerHTML={{ __html: t('chemotypen.nobleTudeiIntro') }} />
        <ul>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t('chemotypen.nobleDescription') }} /><br/>
            <em>{t('chemotypen.nobleCodes')}</em>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t('chemotypen.tudeiDescription') }} /><br/>
            <em>{t('chemotypen.tudeiCodes')}</em>
          </li>
        </ul>
      </section>

      <section id="synergien" className="mt-12">
        <h2>{t('synergien.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('synergien.paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('synergien.paragraph2') }} />
      </section>

      <section id="weitere" className="mt-12">
        <h2>{t('weitere.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('weitere.intro') }} />
        <ul>
          {Array.isArray(t('weitere.items')) && (t('weitere.items') as any[]).map((item: any, index: number) => (
            <li key={index}>
              <strong>{item.label}:</strong> <span dangerouslySetInnerHTML={{ __html: item.text }} />
            </li>
          ))}
        </ul>
      </section>

      <section id="unterseiten" className="mt-16">
        <h2>{t('unterseiten.title')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('unterseiten.intro') }} />
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link href={`/${lang}/inhaltsstoffe/kavalactone`}>
            <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Beaker className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-0">{t('unterseiten.kavalactoneTitle')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {t('unterseiten.kavalactoneDescription')}
              </p>
              <div className="flex items-center text-sm text-primary">
                <span>{t('unterseiten.learnMore')}</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href={`/${lang}/inhaltsstoffe/chemotypen`}>
            <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-0">{t('unterseiten.chemotypenTitle')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {t('unterseiten.chemotypenDescription')}
              </p>
              <div className="flex items-center text-sm text-primary">
                <span>{t('unterseiten.learnMore')}</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </WikiPageLayout>
  );
}
