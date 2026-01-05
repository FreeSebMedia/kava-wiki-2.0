import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

interface LegalFAQProps {
  lang?: string;
}

export function LegalFAQ({ lang = 'de' }: LegalFAQProps) {
  const { t, isLoading } = useTranslations({
    namespaces: ['rechtsstatus'],
    lang: lang as Language
  });

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted/50 rounded-lg" />;
  }

  const faqItems = t('faq.items') as any[];

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
        {t('faq.title')}
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems?.map((item: any, idx: number) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left font-medium text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
