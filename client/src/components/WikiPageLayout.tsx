import { ReactNode, useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, Menu, X, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useTranslations } from "@/hooks/useTranslations";
import { type Language } from "@/lib/i18n";


interface TableOfContentsItem {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface WikiPageLayoutProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  toc?: TableOfContentsItem[];
  tocTitle?: string;
  children: ReactNode;
  category: string;
  lang?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function WikiPageLayout({
  title,
  subtitle,
  heroImage,
  toc,
  tocTitle,
  children,
  category,
  lang = "de",
  breadcrumbs
}: WikiPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { t } = useTranslations({
    namespaces: ['navigation'],
    lang: lang as Language
  });

  const translatedTocTitle = tocTitle || (t('toc.title') as string) || "Inhalt";
  const recommendation = t('recommendation') as { label: string; title: string; text: string; cta: string } | undefined;
  const breadcrumbsHome = (t('breadcrumbs.home') as string) || "Home";

  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top visibility
      setShowScrollTop(window.scrollY > 400);

      if (!toc) return;
      
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);
  
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsMobileNavOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const RecommendationCard = () => (
    <div className="bg-[#1a1a1a] text-white rounded-xl p-6 shadow-xl overflow-hidden relative group border border-gray-800">
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-700 group-hover:bg-yellow-500/20"></div>
      <div className="relative z-10">
        <div className="text-xs font-bold tracking-[0.2em] text-yellow-500 mb-2 uppercase">{recommendation?.label || 'Empfehlung'}</div>
        <h3 className="text-xl font-serif font-bold mb-2 text-white leading-tight">{recommendation?.title || 'Premium Noble Kava'}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {recommendation?.text || 'Entdecken Sie zertifizierte Qualität und Reinheit bei unserem offiziellen Partner.'}
        </p>
        <a 
          href="https://www.kava-mode.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-0.5 shadow-lg hover:shadow-yellow-500/20 w-full text-center"
        >
          {recommendation?.cta || 'Zu Kava-mode.com'}
        </a>
      </div>
    </div>
  );

  const TOCContent = () => (
    <div className="space-y-6">
      {toc && toc.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 font-serif border-b border-border pb-2">{translatedTocTitle}</h3>
          <nav className="space-y-3">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={cn(
                  "block text-sm transition-all duration-200 hover:translate-x-1",
                  item.level === 1 
                    ? "font-medium text-foreground hover:text-primary" 
                    : "pl-4 text-muted-foreground hover:text-foreground border-l border-border ml-1",
                  activeSection === item.id && "text-primary font-bold translate-x-1"
                )}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}
      <RecommendationCard />
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative">
      <SEO 
        title={title} 
        description={subtitle || `Alles über ${title} im Kava Wiki.`}
        type="article"
        image={heroImage}
      />
      
      {/* Mobile Sticky Side Nav Trigger */}
      <div className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 lg:hidden transition-transform duration-300 ${showScrollTop ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="default" 
              size="icon" 
              className="h-12 w-8 rounded-r-xl rounded-l-none shadow-lg bg-primary text-primary-foreground border-y border-r border-primary-foreground/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="mt-6">
              <TOCContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Scroll to Top Button */}
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Breadcrumb / Header Area */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="flex items-center text-sm text-muted-foreground mb-6 flex-wrap">
            {breadcrumbs ? (
              breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="font-medium text-primary">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                  )}
                </span>
              ))
            ) : (
              <>
                <Link href={`/${lang}`} className="hover:text-primary transition-colors">{breadcrumbsHome}</Link>
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                <span className="font-medium text-primary">{category}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">{subtitle}</p>}
        </div>
      </div>

      <div className="container py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Mobile TOC & Recommendation (Visible only on mobile, at top) */}
          <div className="lg:hidden space-y-8 mb-8">
            <TOCContent />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 wiki-content">
            {children}
          </div>

          {/* Desktop Sidebar / TOC (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="space-y-8 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pb-8 scrollbar-hide">
              <TOCContent />
              
              {/* Book Recommendation (Desktop only) */}
              <div className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-5">
                  <div className="w-24 h-36 bg-gray-100 rounded shadow-inner flex-shrink-0 overflow-hidden relative">
                     {/* Placeholder for book cover */}
                     <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-center p-2">
                       <span className="text-xs font-serif text-primary font-bold">Kava<br/>Wurzel der Ruhe</span>
                     </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Offizielle Lektüre</span>
                    <h4 className="text-lg font-bold font-serif mb-2 mt-0 leading-tight text-foreground">Kava – Wurzel der Ruhe</h4>
                    <p className="text-xs text-muted-foreground mb-0 leading-relaxed">Der umfassende Leitfaden zu Wirkung, Geschichte & Kultur.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
