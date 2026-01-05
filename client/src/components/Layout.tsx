import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { languages, Language, defaultLanguage } from "@/lib/i18n";
import { saveLanguagePreference } from "@/hooks/useLanguageDetection";
import { useTranslations } from "@/hooks/useTranslations";

interface NavSubItem {
  name: string;
  path: string;
  description?: string;
  highlight?: boolean;
}

interface NavItem {
  name: string;
  path: string;
  subItems?: NavSubItem[];
  bold?: boolean;
}

const navStructure = [
  { 
    key: "botanik",
    path: "/botanik",
    itemKeys: ["uebersicht", "pflanze", "morphologie", "anbau"],
    itemPaths: ["/botanik", "/botanik/pflanze", "/botanik/morphologie", "/botanik/anbau"]
  },
  { 
    key: "geschichte",
    path: "/geschichte",
    itemKeys: ["uebersicht", "urspruenge", "verbreitung", "moderne", "zeitleiste"],
    itemPaths: ["/geschichte", "/geschichte/urspruenge", "/geschichte/verbreitung", "/geschichte/moderne", "/geschichte/zeitleiste"]
  },
  { 
    key: "inhaltsstoffe",
    path: "/inhaltsstoffe",
    itemKeys: ["uebersicht", "kavalactone", "chemotypen", "rechner"],
    itemPaths: ["/inhaltsstoffe", "/inhaltsstoffe/kavalactone", "/inhaltsstoffe/chemotypen", "/inhaltsstoffe/rechner"]
  },
  { 
    key: "wirkung",
    path: "/wirkung",
    bold: true,
    itemKeys: ["uebersicht", "angst", "schlaf", "muskel", "stimmung", "kognition"],
    itemPaths: ["/wirkung", "/wirkung/angst", "/wirkung/schlaf", "/wirkung/muskel", "/wirkung/stimmung", "/wirkung/kognition"]
  },
  { 
    key: "sicherheit",
    path: "/sicherheit",
    itemKeys: ["uebersicht", "leber", "wechselwirkungen", "kontraindikationen", "checker"],
    itemPaths: ["/sicherheit", "/sicherheit/leber", "/sicherheit/wechselwirkungen", "/sicherheit/kontraindikationen", "/sicherheit/checker"]
  },
  { 
    key: "sorten",
    path: "/sorten",
    bold: true,
    itemKeys: ["uebersicht", "noble-tudei", "vanuatu", "pazifik", "profile", "vergleich"],
    itemPaths: ["/sorten", "/sorten/noble-tudei", "/sorten/vanuatu", "/sorten/pazifik", "/sorten/profile", "/sorten/vergleich"],
    highlights: ["profile", "vergleich"]
  },
  { 
    key: "zubereitung",
    path: "/zubereitung",
    bold: true,
    itemKeys: ["uebersicht", "traditionell", "blender", "instant", "rechner"],
    itemPaths: ["/zubereitung", "/zubereitung/traditionell", "/zubereitung/blender", "/zubereitung/instant", "/zubereitung/rechner"],
    highlights: ["rechner"]
  },
  { 
    key: "kultur",
    path: "/kultur",
    itemKeys: ["uebersicht", "zeremonien", "nakamal", "moderne", "weltkarte", "kava-bars"],
    itemPaths: ["/kultur", "/kultur/zeremonien", "/kultur/nakamal", "/kultur/moderne", "/kultur/weltkarte", "/kultur/kava-bars"],
    highlights: ["weltkarte", "kava-bars"]
  },
  { 
    key: "mehr",
    path: "/mehr",
    itemKeys: ["faq", "studien", "rechtsstatus", "glossar"],
    itemPaths: ["/faq", "/studien", "/rechtsstatus", "/glossar"],
    highlights: ["faq"]
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [location] = useLocation();
  
  const currentLang = (location.split('/')[1] as Language) || defaultLanguage;
  
  const { t, isLoading } = useTranslations({
    namespaces: ['navigation'],
    lang: currentLang
  });

  const linkTo = (path: string) => `/${currentLang}${path}`;

  const isActiveRoute = (path: string) => {
    const fullPath = linkTo(path);
    return location === fullPath || location.startsWith(fullPath + '/');
  };

  const getNavItems = (): NavItem[] => {
    if (isLoading) return [];
    
    return navStructure.map(section => {
      const navSection = t(`nav.${section.key}`) as { name: string; items: Record<string, { name: string; description: string }> } | undefined;
      if (!navSection || typeof navSection !== 'object') return null;

      const subItems: NavSubItem[] = section.itemKeys.map((itemKey, index) => {
        const item = navSection.items?.[itemKey];
        return {
          name: item?.name || itemKey,
          path: section.itemPaths[index],
          description: item?.description,
          highlight: section.highlights?.includes(itemKey)
        };
      });

      return {
        name: navSection.name || section.key,
        path: section.path,
        subItems,
        bold: section.bold
      };
    }).filter(Boolean) as NavItem[];
  };

  const navItems = getNavItems();

  const footer = t('footer') as {
    description: string;
    sections: {
      wissen: { title: string; links: Record<string, string> };
      praxis: { title: string; links: Record<string, string> };
      partner: { title: string; recommendedReading: string; bookTitle: string };
    };
    copyright: string;
    legal: { impressum: string; datenschutz: string };
  } | undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/${currentLang}`} className="flex items-center space-x-2 font-serif font-bold text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
            <img src="/logo-kava-wiki.png" alt="Kava Wiki Logo" className="w-8 h-8 object-contain" />
            <span>Kava Wiki</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0 text-sm font-medium">
            {navItems.map((item) => (
              item.subItems && item.subItems.length >= 1 ? (
                <DropdownMenu key={item.path}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`flex items-center gap-0.5 px-2 py-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${isActiveRoute(item.path) ? "text-primary bg-primary/5" : "text-muted-foreground"} ${item.bold ? "font-bold" : ""}`}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[220px]">
                    {item.subItems.map((subItem, index) => (
                      <div key={subItem.path}>
                        {index === 1 && item.name !== (t('nav.mehr.name') as string) && <DropdownMenuSeparator />}
                        <DropdownMenuItem asChild className={subItem.highlight ? "border-2 border-primary/60 rounded-md bg-primary/5" : ""}>
                          <Link 
                            href={linkTo(subItem.path)}
                            className="flex flex-col items-start gap-0.5 cursor-pointer"
                          >
                            <span className={`font-medium ${subItem.highlight ? "text-primary" : ""}`}>{subItem.name}</span>
                            {subItem.description && (
                              <span className="text-xs text-muted-foreground">{subItem.description}</span>
                            )}
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={item.path} 
                  href={linkTo(item.path)}
                  className={`flex items-center gap-0.5 px-2 py-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${isActiveRoute(item.path) ? "text-primary bg-primary/5" : "text-muted-foreground"}`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 gap-1.5">
                  <Globe className="h-4 w-4" />
                  <span className="text-base" aria-hidden="true">{languages[currentLang]?.flag || '🌐'}</span>
                  <span className="sr-only">{t('header.languageSwitcher') as string || 'Switch language'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-0 overflow-hidden w-[200px]">
                <div className="max-h-[300px] overflow-y-auto p-1">
                  {Object.entries(languages).map(([code, lang]) => (
                    <DropdownMenuItem key={code} onClick={() => {
                      saveLanguagePreference(code as Language);
                      const pathParts = location.split('/').filter(Boolean);
                      const currentPathLang = pathParts[0];
                      const hasLangPrefix = currentPathLang in languages;
                      const pathWithoutLang = hasLangPrefix ? '/' + pathParts.slice(1).join('/') : location;
                      const newPath = `/${code}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
                      window.location.href = newPath || `/${code}`;
                    }}>
                      <span className="mr-2">{lang.flag}</span>
                      {lang.nativeName}
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="py-1 flex justify-center bg-accent/10 border-t border-border/50">
                  <ChevronDown className="h-4 w-4 text-primary animate-pulse" />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="lg:hidden"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="container py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.subItems && item.subItems.length > 1 ? (
                    <div>
                      <button
                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.path ? null : item.path)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedMobileItem === item.path ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMobileItem === item.path && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                          {item.subItems.map((subItem) => (
                            <Link 
                              key={subItem.path} 
                              href={linkTo(subItem.path)}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={linkTo(item.path)}
                      className="block px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Kava Wiki</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {footer?.description || ''}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">{footer?.sections?.wissen?.title || 'Wissen'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href={linkTo("/botanik")}>{footer?.sections?.wissen?.links?.botanik || 'Botanik'}</Link></li>
                <li><Link href={linkTo("/geschichte")}>{footer?.sections?.wissen?.links?.geschichte || 'Geschichte'}</Link></li>
                <li><Link href={linkTo("/studien")}>{footer?.sections?.wissen?.links?.wissenschaft || 'Wissenschaft'}</Link></li>
                <li><Link href={linkTo("/sicherheit")}>{footer?.sections?.wissen?.links?.sicherheit || 'Sicherheit'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">{footer?.sections?.praxis?.title || 'Praxis'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href={linkTo("/zubereitung")}>{footer?.sections?.praxis?.links?.zubereitung || 'Zubereitung'}</Link></li>
                <li><Link href={linkTo("/sorten")}>{footer?.sections?.praxis?.links?.sorten || 'Sorten & Chemotypen'}</Link></li>
                <li><Link href={linkTo("/rechtsstatus")}>{footer?.sections?.praxis?.links?.rechtsstatus || 'Rechtsstatus'}</Link></li>
                <li><Link href={linkTo("/faq")}>{footer?.sections?.praxis?.links?.faq || 'Häufige Fragen'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">{footer?.sections?.partner?.title || 'Partner & Buch'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://kava-mode.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Kava-mode.com ↗
                  </a>
                </li>
                <li>
                  <span className="block text-xs text-muted-foreground/70 mb-1">{footer?.sections?.partner?.recommendedReading || 'Empfohlene Lektüre:'}</span>
                  {footer?.sections?.partner?.bookTitle || '"Kava – Wurzel der Ruhe"'}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Kava Wiki. {footer?.copyright || 'Alle Rechte vorbehalten.'}</p>
            <div className="flex gap-4">
              <Link href={linkTo("/impressum")}>{footer?.legal?.impressum || 'Impressum'}</Link>
              <Link href={linkTo("/datenschutz")}>{footer?.legal?.datenschutz || 'Datenschutz'}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
