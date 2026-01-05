import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { timelineEvents, timelineEras, categoryInfo, TimelineEvent } from "@/data/kavaTimeline";
import { ChevronRight, ChevronDown, ChevronUp, Calendar, MapPin, ExternalLink, Filter, X } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

// Define translated event type
interface TranslatedEvent extends Omit<TimelineEvent, 'year' | 'title' | 'description' | 'details' | 'location' | 'links'> {
  year: string;
  title: string;
  description: string;
  details?: string;
  location?: string;
  links?: { label: string; url: string }[];
}

export default function GeschichteZeitleiste() {
  const params = useParams<{ lang?: string }>();
  const { lang: contextLang } = useLanguage();
  const lang = params.lang || contextLang;
  const { t, isLoading } = useTranslations({ namespaces: ['geschichte-zeitleiste'], lang: lang as any });
  
  const [selectedEvent, setSelectedEvent] = useState<TranslatedEvent | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Translate timeline events
  const translatedEvents = useMemo((): TranslatedEvent[] => {
    return timelineEvents.map(event => ({
      ...event,
      year: t(`events.${event.id}.year`) !== `events.${event.id}.year` ? t(`events.${event.id}.year`) : event.year,
      title: t(`events.${event.id}.title`) !== `events.${event.id}.title` ? t(`events.${event.id}.title`) : event.title,
      description: t(`events.${event.id}.description`) !== `events.${event.id}.description` ? t(`events.${event.id}.description`) : event.description,
      details: event.details ? (t(`events.${event.id}.details`) !== `events.${event.id}.details` ? t(`events.${event.id}.details`) : event.details) : undefined,
      location: event.location ? (t(`events.${event.id}.location`) !== `events.${event.id}.location` ? t(`events.${event.id}.location`) : event.location) : undefined,
      links: event.links?.map((link, i) => ({
        label: t(`events.${event.id}.links.${i}.label`) !== `events.${event.id}.links.${i}.label` ? t(`events.${event.id}.links.${i}.label`) : link.label,
        url: `/${lang}${link.url}`
      }))
    }));
  }, [t, lang]);

  // Translate eras
  const translatedEras = useMemo(() => {
    return timelineEras.map(era => ({
      ...era,
      name: t(`eras.${era.id}.name`) !== `eras.${era.id}.name` ? t(`eras.${era.id}.name`) : era.name,
      description: t(`eras.${era.id}.description`) !== `eras.${era.id}.description` ? t(`eras.${era.id}.description`) : era.description
    }));
  }, [t]);

  // Translate categories
  const translatedCategories = useMemo(() => {
    const result: Record<string, { color: string; label: string; icon: string }> = {};
    Object.entries(categoryInfo).forEach(([key, info]) => {
      result[key] = {
        ...info,
        label: t(`categories.${key}.label`) !== `categories.${key}.label` ? t(`categories.${key}.label`) : info.label
      };
    });
    return result;
  }, [t]);

  // Filter events
  const filteredEvents = translatedEvents.filter(event => {
    if (activeCategory && event.category !== activeCategory) return false;
    if (activeEra) {
      const era = timelineEras.find(e => e.id === activeEra);
      if (era && (event.yearNumeric < era.startYear || event.yearNumeric > era.endYear)) return false;
    }
    return true;
  });

  // Get era for an event
  const getEraForEvent = (event: TranslatedEvent) => {
    return translatedEras.find(era => {
      const originalEra = timelineEras.find(e => e.id === era.id);
      return originalEra && event.yearNumeric >= originalEra.startYear && event.yearNumeric <= originalEra.endYear;
    });
  };

  // Scroll to event
  const scrollToEvent = (eventId: string) => {
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('ui.loading') !== 'ui.loading' ? t('ui.loading') : 'Lädt...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="container py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">{t('breadcrumbs.home') !== 'breadcrumbs.home' ? t('breadcrumbs.home') : 'Home'}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${lang}/geschichte`} className="hover:text-primary transition-colors">{t('breadcrumbs.geschichte') !== 'breadcrumbs.geschichte' ? t('breadcrumbs.geschichte') : 'Geschichte'}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{t('breadcrumbs.zeitleiste') !== 'breadcrumbs.zeitleiste' ? t('breadcrumbs.zeitleiste') : 'Zeitleiste'}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('page.title') !== 'page.title' ? t('page.title') : 'Die Geschichte der Kava'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('page.subtitle') !== 'page.subtitle' ? t('page.subtitle') : 'Eine Reise durch 5.000 Jahre Kava-Geschichte – von der Domestikation in Melanesien bis zur globalen Verbreitung in der modernen Welt.'}
          </p>
        </div>
      </div>

      {/* Era Navigation */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg"
            >
              <Filter className="w-4 h-4" />
              {t('ui.filter') !== 'ui.filter' ? t('ui.filter') : 'Filter'}
              {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Era Buttons */}
            <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2 w-full md:w-auto`}>
              <button
                onClick={() => { setActiveEra(null); setActiveCategory(null); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  !activeEra && !activeCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary"
                }`}
              >
                {t('ui.allEpochs') !== 'ui.allEpochs' ? t('ui.allEpochs') : 'Alle Epochen'}
              </button>
              {translatedEras.map((era) => {
                const originalEra = timelineEras.find(e => e.id === era.id);
                return (
                  <button
                    key={era.id}
                    onClick={() => { setActiveEra(activeEra === era.id ? null : era.id); setActiveCategory(null); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      activeEra === era.id
                        ? "text-white"
                        : "bg-card border border-border hover:border-primary"
                    }`}
                    style={activeEra === era.id ? { backgroundColor: originalEra?.color } : {}}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: originalEra?.color }}
                    />
                    <span className="hidden sm:inline">{era.name}</span>
                    <span className="sm:hidden">{era.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2 mt-3`}>
            {Object.entries(translatedCategories).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeCategory === key
                    ? "text-white"
                    : "bg-muted/50 hover:bg-muted"
                }`}
                style={activeCategory === key ? { backgroundColor: info.color } : {}}
              >
                <span>{info.icon}</span>
                {info.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10" />

            {/* Events */}
            <div className="space-y-6">
              {filteredEvents.map((event, index) => {
                const era = getEraForEvent(event);
                const isSelected = selectedEvent?.id === event.id;
                
                return (
                  <div
                    key={event.id}
                    id={`event-${event.id}`}
                    className={`relative pl-12 md:pl-20 transition-all duration-300 ${
                      isSelected ? "scale-[1.02]" : ""
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-2 md:left-6 w-5 h-5 rounded-full border-4 border-background transition-all duration-300 ${
                        isSelected ? "scale-125" : ""
                      }`}
                      style={{ 
                        backgroundColor: translatedCategories[event.category]?.color || "#666",
                        boxShadow: isSelected ? `0 0 20px ${translatedCategories[event.category]?.color}40` : "none"
                      }}
                    />

                    {/* Event Card */}
                    <button
                      onClick={() => setSelectedEvent(isSelected ? null : event)}
                      className={`w-full text-left bg-card border rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg ${
                        isSelected 
                          ? "border-primary shadow-lg" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {/* Era Badge */}
                      {era && (
                        <div 
                          className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2"
                          style={{ backgroundColor: timelineEras.find(e => e.id === era.id)?.color }}
                        >
                          {era.name}
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{event.year}</span>
                            {event.location && (
                              <>
                                <span className="text-border">•</span>
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                            <span className="text-2xl">{event.icon}</span>
                            {event.title}
                          </h3>
                        </div>
                        <div
                          className={`p-1 rounded-full transition-transform duration-300 ${
                            isSelected ? "rotate-180" : ""
                          }`}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mt-2">
                        {event.description}
                      </p>

                      {/* Expanded Content */}
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                          {event.details && (
                            <p className="text-foreground mb-4">
                              {event.details}
                            </p>
                          )}

                          {/* Category Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <span 
                              className="px-2 py-1 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: translatedCategories[event.category]?.color }}
                            >
                              {translatedCategories[event.category]?.icon} {translatedCategories[event.category]?.label}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              event.significance === "major" 
                                ? "bg-amber-500/20 text-amber-700" 
                                : event.significance === "medium"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-gray-500/20 text-gray-700"
                            }`}>
                              {event.significance === "major" 
                                ? (lang === 'en' ? "Milestone" : "Meilenstein") 
                                : event.significance === "medium" 
                                ? (lang === 'en' ? "Important" : "Wichtig") 
                                : (lang === 'en' ? "Event" : "Ereignis")}
                            </span>
                          </div>

                          {/* Links */}
                          {event.links && event.links.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {event.links.map((link, i) => (
                                <Link
                                  key={i}
                                  href={link.url}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {link.label}
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t('sidebar.noEventsFound') !== 'sidebar.noEventsFound' ? t('sidebar.noEventsFound') : 'Keine Ereignisse für diese Filter gefunden.'}
                </p>
                <button
                  onClick={() => { setActiveEra(null); setActiveCategory(null); }}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  {t('sidebar.resetFilters') !== 'sidebar.resetFilters' ? t('sidebar.resetFilters') : 'Filter zurücksetzen'}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t('sidebar.overview') !== 'sidebar.overview' ? t('sidebar.overview') : 'Übersicht'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">{timelineEvents.length}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('sidebar.events') !== 'sidebar.events' ? t('sidebar.events') : 'Ereignisse'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">{timelineEras.length}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('sidebar.epochs') !== 'sidebar.epochs' ? t('sidebar.epochs') : 'Epochen'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">5000+</div>
                    <div className="text-xs text-muted-foreground">
                      {t('sidebar.yearsOfHistory') !== 'sidebar.yearsOfHistory' ? t('sidebar.yearsOfHistory') : 'Jahre Geschichte'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-primary">{timelineEvents.filter(e => e.significance === "major").length}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('sidebar.milestones') !== 'sidebar.milestones' ? t('sidebar.milestones') : 'Meilensteine'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Era Overview */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t('sidebar.epochs') !== 'sidebar.epochs' ? t('sidebar.epochs') : 'Epochen'}
                </h3>
                <div className="space-y-3">
                  {translatedEras.map((era) => {
                    const originalEra = timelineEras.find(e => e.id === era.id);
                    const eraEvents = timelineEvents.filter(e => 
                      originalEra && e.yearNumeric >= originalEra.startYear && e.yearNumeric <= originalEra.endYear
                    );
                    return (
                      <button
                        key={era.id}
                        onClick={() => setActiveEra(activeEra === era.id ? null : era.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeEra === era.id 
                            ? "bg-primary/10 border border-primary" 
                            : "bg-background hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: originalEra?.color }}
                          />
                          <span className="font-medium text-sm text-foreground">{era.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground pl-5">
                          {originalEra && originalEra.startYear < 0 
                            ? `${Math.abs(originalEra.startYear)} ${t('sidebar.bce') !== 'sidebar.bce' ? t('sidebar.bce') : 'v. Chr.'}` 
                            : originalEra?.startYear} – {originalEra && originalEra.endYear < 0 
                            ? `${Math.abs(originalEra.endYear)} ${t('sidebar.bce') !== 'sidebar.bce' ? t('sidebar.bce') : 'v. Chr.'}` 
                            : originalEra?.endYear}
                        </div>
                        <div className="text-xs text-muted-foreground pl-5 mt-1">
                          {eraEvents.length} {t('sidebar.events') !== 'sidebar.events' ? t('sidebar.events') : 'Ereignisse'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Milestones */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t('sidebar.keyMilestones') !== 'sidebar.keyMilestones' ? t('sidebar.keyMilestones') : 'Wichtige Meilensteine'}
                </h3>
                <div className="space-y-2">
                  {translatedEvents
                    .filter(e => e.significance === "major")
                    .slice(0, 6)
                    .map((event) => (
                      <button
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          scrollToEvent(event.id);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span>{event.icon}</span>
                          <span className="text-sm font-medium text-foreground truncate">{event.title}</span>
                        </div>
                        <div className="text-xs text-muted-foreground pl-6">{event.year}</div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t('sidebar.relatedPages') !== 'sidebar.relatedPages' ? t('sidebar.relatedPages') : 'Verwandte Seiten'}
                </h3>
                <div className="space-y-2">
                  <Link
                    href={`/${lang}/geschichte/urspruenge`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span>🌱</span>
                    <span className="text-sm text-foreground">
                      {t('sidebar.origins') !== 'sidebar.origins' ? t('sidebar.origins') : 'Die Ursprünge'}
                    </span>
                  </Link>
                  <Link
                    href={`/${lang}/geschichte/verbreitung`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span>⛵</span>
                    <span className="text-sm text-foreground">
                      {t('sidebar.spreadPacific') !== 'sidebar.spreadPacific' ? t('sidebar.spreadPacific') : 'Verbreitung im Pazifik'}
                    </span>
                  </Link>
                  <Link
                    href={`/${lang}/geschichte/moderne`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span>🏛️</span>
                    <span className="text-sm text-foreground">
                      {t('sidebar.modernHistory') !== 'sidebar.modernHistory' ? t('sidebar.modernHistory') : 'Moderne Geschichte'}
                    </span>
                  </Link>
                  <Link
                    href={`/${lang}/kultur/weltkarte`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span>🗺️</span>
                    <span className="text-sm text-foreground">
                      {t('sidebar.interactiveMap') !== 'sidebar.interactiveMap' ? t('sidebar.interactiveMap') : 'Interaktive Weltkarte'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Selected Event Modal */}
      {selectedEvent && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl shadow-2xl max-h-[60vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedEvent.icon}</span>
                <h3 className="font-semibold text-foreground">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {selectedEvent.year} • {selectedEvent.location}
            </div>
            <p className="text-foreground mb-4">{selectedEvent.details || selectedEvent.description}</p>
            {selectedEvent.links && selectedEvent.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedEvent.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
