import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, ShieldCheck } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

import pdfDe from "@/assets/documents/kava_legal_opinion_public_de.pdf";
import pdfEn from "@/assets/documents/kava_legal_opinion_public_en.pdf";

interface LegalDownloadSectionProps {
  lang?: string;
}

export function LegalDownloadSection({ lang = 'de' }: LegalDownloadSectionProps) {
  const { t, isLoading } = useTranslations({
    namespaces: ['rechtsstatus'],
    lang: lang as Language
  });

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-muted/50 rounded-lg" />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-12 not-prose">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-serif">
            <ShieldCheck className="h-6 w-6 text-primary" />
            {t('download.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {t('download.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto gap-2" size="lg">
              <a href={pdfDe} download="kava_legal_opinion_public_de.pdf">
                <FileDown className="h-5 w-5" />
                {t('download.buttonDe')}
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto gap-2" size="lg">
              <a href={pdfEn} download="kava_legal_opinion_public_en.pdf">
                <FileDown className="h-5 w-5" />
                {t('download.buttonEn')}
              </a>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/50 text-sm text-muted-foreground">
            <p className="font-bold mb-2 text-foreground">{t('download.copyright.title')}</p>
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('download.copyright.text') }} />
            <div className="p-3 bg-card border rounded border-l-4 border-l-primary">
              <a 
                href="https://www.kava-mode.com" 
                target="_blank" 
                rel="noopener" 
                className="font-bold text-primary hover:underline block mb-1"
              >
                www.kava-mode.com
              </a>
              <span className="text-foreground">{t('download.copyright.cta')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
