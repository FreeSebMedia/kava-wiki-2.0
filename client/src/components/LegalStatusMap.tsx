import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/useTranslations";
import { Language } from "@/lib/i18n";

type LegalStatus = 'legal' | 'grey' | 'restricted';

interface CountryPosition {
  id: string;
  status: LegalStatus;
  x: number;
  y: number;
}

const europePositions: CountryPosition[] = [
  { id: 'IS', status: 'grey', x: 1, y: 0 },
  { id: 'NO', status: 'restricted', x: 3, y: 0 },
  { id: 'SE', status: 'restricted', x: 4, y: 0 },
  { id: 'FI', status: 'restricted', x: 5, y: 0 },
  { id: 'IE', status: 'restricted', x: 0, y: 1 },
  { id: 'UK', status: 'restricted', x: 1, y: 1 },
  { id: 'DK', status: 'restricted', x: 3, y: 1 },
  { id: 'EE', status: 'grey', x: 5, y: 1 },
  { id: 'NL', status: 'grey', x: 2, y: 2 },
  { id: 'DE', status: 'legal', x: 3, y: 2 },
  { id: 'PL', status: 'legal', x: 4, y: 2 },
  { id: 'LT', status: 'grey', x: 5, y: 2 },
  { id: 'LV', status: 'grey', x: 6, y: 2 },
  { id: 'BE', status: 'grey', x: 2, y: 3 },
  { id: 'LU', status: 'grey', x: 2.5, y: 3.2 },
  { id: 'CZ', status: 'legal', x: 4, y: 3 },
  { id: 'SK', status: 'grey', x: 5, y: 3 },
  { id: 'FR', status: 'restricted', x: 2, y: 4 },
  { id: 'CH', status: 'restricted', x: 3, y: 4 },
  { id: 'AT', status: 'grey', x: 4, y: 4 },
  { id: 'HU', status: 'legal', x: 5, y: 4 },
  { id: 'PT', status: 'grey', x: 0, y: 5 },
  { id: 'ES', status: 'legal', x: 1, y: 5 },
  { id: 'IT', status: 'grey', x: 3, y: 5 },
  { id: 'SI', status: 'grey', x: 4, y: 5 },
  { id: 'HR', status: 'grey', x: 5, y: 5 },
  { id: 'GR', status: 'grey', x: 5, y: 6 },
  { id: 'BG', status: 'legal', x: 6, y: 5 },
  { id: 'RO', status: 'grey', x: 6, y: 4 },
];

const statusColors = {
  legal: 'bg-green-500 hover:bg-green-600',
  grey: 'bg-yellow-400 hover:bg-yellow-500',
  restricted: 'bg-red-400 hover:bg-red-500',
};

interface LegalStatusMapProps {
  lang?: string;
}

export function LegalStatusMap({ lang = 'de' }: LegalStatusMapProps) {
  const { t, isLoading } = useTranslations({
    namespaces: ['rechtsstatus'],
    lang: lang as Language
  });

  if (isLoading) {
    return <div className="animate-pulse h-96 bg-muted/50 rounded-lg" />;
  }

  const statusLabels = t('map.statusLabels') as Record<string, string>;
  const countries = t('map.countries') as Record<string, { name: string; details: string }>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-xl shadow-sm border border-border/50 my-8">
      <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
        {t('map.title')}
      </h3>
      
      <div className="w-full bg-muted/30 rounded-lg p-8 flex items-center justify-center overflow-visible">
        <div>
          <div className="grid gap-2" style={{ 
            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
            width: '100%',
            maxWidth: '600px'
          }}>
            {Array.from({ length: 7 }).map((_, row) => (
              <React.Fragment key={row}>
                {Array.from({ length: 8 }).map((_, col) => {
                  const countryPos = europePositions.find(c => Math.round(c.y) === row && Math.round(c.x) === col);
                  
                  if (!countryPos) return <div key={`${row}-${col}`} className="w-full aspect-square" />;

                  const countryData = countries?.[countryPos.id];

                  return (
                    <TooltipProvider key={countryPos.id}>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <div 
                            className={cn(
                              "w-full aspect-square rounded-md flex items-center justify-center cursor-help transition-all duration-200 hover:scale-110 shadow-sm",
                              statusColors[countryPos.status]
                            )}
                          >
                            <span className="text-xs font-bold text-white drop-shadow-md">
                              {countryPos.id}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-white text-black border-slate-200 shadow-xl">
                          <p className="font-bold">{countryData?.name || countryPos.id}</p>
                          <p className="text-sm text-slate-600">{countryData?.details || ''}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {(Object.keys(statusColors) as LegalStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div className={cn("w-4 h-4 rounded-full", statusColors[status].split(' ')[0])} />
            <span className="text-sm font-medium text-muted-foreground">
              {statusLabels?.[status] || status}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-4 italic">
        {t('map.disclaimer')}
      </p>
    </div>
  );
}
