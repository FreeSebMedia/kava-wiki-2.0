import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { 
  ChevronRight, 
  Search, 
  HelpCircle, 
  Sparkles, 
  Shield, 
  Scale, 
  ChefHat, 
  ShoppingBag, 
  GitCompare, 
  Globe,
  ChevronDown,
  ExternalLink,
  X,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/useTranslations";

const categoryIcons: Record<string, React.ReactNode> = {
  HelpCircle: <HelpCircle className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  ChefHat: <ChefHat className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  GitCompare: <GitCompare className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />
};

const categoryIconMap: Record<string, string> = {
  grundlagen: "HelpCircle",
  wirkung: "Sparkles",
  sicherheit: "Shield",
  dosierung: "Scale",
  zubereitung: "ChefHat",
  kauf: "ShoppingBag",
  vergleiche: "GitCompare",
  kultur: "Globe"
};

interface FAQItemData {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedLinks?: { href: string; label: string }[];
}

function FAQItemCard({ 
  item, 
  isExpanded, 
  onToggle,
  lang,
  relatedArticlesLabel
}: { 
  item: FAQItemData; 
  isExpanded: boolean; 
  onToggle: () => void;
  lang: string;
  relatedArticlesLabel: string;
}) {
  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#2d5a27]/10 overflow-hidden transition-all duration-300 hover:shadow-md"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-[#2d5a27]/5 transition-colors"
        aria-expanded={isExpanded}
      >
        <h3 
          className="font-semibold text-[#2d5a27] text-lg leading-tight pr-4"
          itemProp="name"
        >
          {item.question}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-[#2d5a27]/60 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div className="px-6 pb-6 pt-2">
          <p 
            className="text-[#5c4a3d]/80 leading-relaxed whitespace-pre-line"
            itemProp="text"
          >
            {item.answer}
          </p>
          
          {item.relatedLinks && item.relatedLinks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#2d5a27]/10">
              <p className="text-sm font-medium text-[#2d5a27]/70 mb-2">
                {relatedArticlesLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.relatedLinks.map((link, idx) => (
                  <Link key={idx} href={link.href.replace('/de/', `/${lang}/`)}>
                    <span className="inline-flex items-center gap-1 text-sm text-[#2d5a27] hover:text-[#4a7c43] transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryButton({ 
  categoryId,
  name,
  description,
  isActive, 
  onClick, 
  count
}: { 
  categoryId: string;
  name: string;
  description: string;
  isActive: boolean; 
  onClick: () => void;
  count: number;
}) {
  const icon = categoryIconMap[categoryId] || "HelpCircle";
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-[#2d5a27] text-white shadow-md' 
          : 'bg-white/80 text-[#2d5a27] hover:bg-[#2d5a27]/10 border border-[#2d5a27]/20'
      }`}
      title={description}
    >
      {categoryIcons[icon]}
      <span>{name}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
        isActive ? 'bg-white/20' : 'bg-[#2d5a27]/10'
      }`}>
        {count}
      </span>
    </button>
  );
}

export default function FAQ() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['faq'],
    lang: lang as any
  });
  
  const t = translations.faq || {};
  const meta = t.meta || {};
  const ui = t.ui || {};
  const categories = t.categories || {};
  const items = t.items || {};
  const itemCategories = t.itemCategories || {};
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const faqItems: FAQItemData[] = useMemo(() => {
    return Object.entries(items).map(([id, item]: [string, any]) => ({
      id,
      category: itemCategories[id] || 'grundlagen',
      question: item.question || '',
      answer: item.answer || '',
      relatedLinks: item.relatedLinks
    }));
  }, [items, itemCategories]);

  const categoryList = useMemo(() => {
    return Object.entries(categories).map(([id, cat]: [string, any]) => ({
      id,
      name: cat.name || id,
      description: cat.description || ''
    }));
  }, [categories]);

  const filteredFAQs = useMemo(() => {
    let results = faqItems;
    
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      results = faqItems.filter(item => 
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (activeCategory) {
      results = results.filter(item => item.category === activeCategory);
    }
    
    return results;
  }, [searchQuery, activeCategory, faqItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryList.forEach(cat => {
      counts[cat.id] = faqItems.filter(item => item.category === cat.id).length;
    });
    return counts;
  }, [categoryList, faqItems]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedItems(new Set(filteredFAQs.map(item => item.id)));
    }
  }, [searchQuery, filteredFAQs]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setExpandedItems(new Set());
  };

  useEffect(() => {
    if (faqItems.length === 0) return;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
    script.id = 'faq-schema';
    
    const existing = document.getElementById('faq-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const schemaScript = document.getElementById('faq-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [faqItems]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-[#ebe5db] flex items-center justify-center">
        <div className="animate-pulse text-[#2d5a27]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-[#ebe5db]">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-leaves.svg')] opacity-5" />
        <div className="container relative">
          <nav className="flex items-center gap-2 text-sm text-[#5c4a3d]/70 mb-8">
            <Link href={`/${lang}`}>
              <span className="hover:text-[#2d5a27] transition-colors">Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2d5a27] font-medium">FAQ</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d5a27]/10 rounded-full text-[#2d5a27] text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              {meta.badge || 'FAQ'}
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2d5a27] mb-6">
              {meta.title || 'FAQ'}
            </h1>
            
            <p className="text-lg md:text-xl text-[#5c4a3d]/80 leading-relaxed">
              {meta.description || ''}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sticky top-16 z-30 bg-[#f5f1eb]/95 backdrop-blur-md border-b border-[#2d5a27]/10">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a27]/50" />
              <Input
                type="text"
                placeholder={ui.searchPlaceholder || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-3 bg-white/80 border-[#2d5a27]/20 focus:border-[#2d5a27] focus:ring-[#2d5a27]/20 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5c4a3d]/50 hover:text-[#2d5a27]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {ui.categories || 'Categories'}
            </Button>

            <div className="hidden lg:flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !activeCategory 
                    ? 'bg-[#2d5a27] text-white shadow-md' 
                    : 'bg-white/80 text-[#2d5a27] hover:bg-[#2d5a27]/10 border border-[#2d5a27]/20'
                }`}
              >
                {ui.all || 'All'} ({faqItems.length})
              </button>
              {categoryList.map(category => (
                <CategoryButton
                  key={category.id}
                  categoryId={category.id}
                  name={category.name}
                  description={category.description}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  count={categoryCounts[category.id] || 0}
                />
              ))}
            </div>
          </div>

          {showMobileFilters && (
            <div className="lg:hidden mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveCategory(null); setShowMobileFilters(false); }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !activeCategory 
                    ? 'bg-[#2d5a27] text-white shadow-md' 
                    : 'bg-white/80 text-[#2d5a27] hover:bg-[#2d5a27]/10 border border-[#2d5a27]/20'
                }`}
              >
                {ui.all || 'All'} ({faqItems.length})
              </button>
              {categoryList.map(category => (
                <CategoryButton
                  key={category.id}
                  categoryId={category.id}
                  name={category.name}
                  description={category.description}
                  isActive={activeCategory === category.id}
                  onClick={() => { 
                    setActiveCategory(activeCategory === category.id ? null : category.id);
                    setShowMobileFilters(false);
                  }}
                  count={categoryCounts[category.id] || 0}
                />
              ))}
            </div>
          )}

          {(searchQuery || activeCategory) && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-[#5c4a3d]/70">
                {filteredFAQs.length} {ui.results || 'results'}
              </span>
              <button
                onClick={clearFilters}
                className="text-[#2d5a27] hover:text-[#4a7c43] underline"
              >
                {ui.clearFilters || 'Clear filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {filteredFAQs.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQPage">
              {!searchQuery && !activeCategory ? (
                categoryList.map(category => {
                  const categoryFAQs = faqItems.filter(item => item.category === category.id);
                  if (categoryFAQs.length === 0) return null;
                  
                  const icon = categoryIconMap[category.id] || "HelpCircle";
                  
                  return (
                    <div key={category.id} className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#2d5a27]/10 rounded-lg text-[#2d5a27]">
                          {categoryIcons[icon]}
                        </div>
                        <div>
                          <h2 className="font-serif text-2xl text-[#2d5a27]">
                            {category.name}
                          </h2>
                          <p className="text-sm text-[#5c4a3d]/70">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {categoryFAQs.map(item => (
                          <FAQItemCard
                            key={item.id}
                            item={item}
                            isExpanded={expandedItems.has(item.id)}
                            onToggle={() => toggleItem(item.id)}
                            lang={lang}
                            relatedArticlesLabel={ui.relatedArticles || 'Related articles:'}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="space-y-3">
                  {filteredFAQs.map(item => (
                    <FAQItemCard
                      key={item.id}
                      item={item}
                      isExpanded={expandedItems.has(item.id)}
                      onToggle={() => toggleItem(item.id)}
                      lang={lang}
                      relatedArticlesLabel={ui.relatedArticles || 'Related articles:'}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-16 h-16 bg-[#2d5a27]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-[#2d5a27]/50" />
              </div>
              <h3 className="font-serif text-2xl text-[#2d5a27] mb-3">
                {ui.noResults || 'No results found'}
              </h3>
              <p className="text-[#5c4a3d]/70 mb-6">
                {ui.noResultsHint || 'Try different search terms or select a different category.'}
              </p>
              <Button onClick={clearFilters} variant="outline">
                {ui.showAll || 'Show all questions'}
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#2d5a27]/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-[#2d5a27] mb-4">
              {ui.questionNotAnswered || 'Question not answered?'}
            </h2>
            <p className="text-[#5c4a3d]/80 mb-8">
              {ui.contactHint || 'Contact us and we\'ll be happy to help.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/impressum`}>
                <Button className="bg-[#2d5a27] hover:bg-[#4a7c43] text-white">
                  {ui.getInTouch || 'Get in touch'}
                </Button>
              </Link>
              <Link href={`/${lang}/glossar`}>
                <Button variant="outline" className="border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10">
                  {ui.viewGlossary || 'View glossary'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
