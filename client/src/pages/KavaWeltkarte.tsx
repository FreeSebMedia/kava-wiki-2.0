import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MapView } from "@/components/Map";
import { kavaRegions, categoryInfo, KavaRegion } from "@/data/kavaRegions";
import { ChevronRight, MapPin, X, ExternalLink, Leaf, Users, Calendar, Globe } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export default function KavaWeltkarte() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['kulturWeltkarte'],
    lang: lang as any
  });
  
  const t = translations.kulturWeltkarte || {};
  const meta = t.meta || {};
  const breadcrumb = t.breadcrumb || {};
  const filter = t.filter || {};
  const map = t.map || {};
  const detail = t.detail || {};
  const grid = t.grid || {};
  const stats = t.stats || {};
  const related = t.related || {};
  const navigation = t.navigation || {};

  const [selectedRegion, setSelectedRegion] = useState<KavaRegion | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const pacificCenter = { lat: -10, lng: 170 };

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    infoWindowRef.current = new google.maps.InfoWindow();

    kavaRegions.forEach((region) => {
      const markerElement = document.createElement("div");
      markerElement.className = "kava-marker";
      markerElement.innerHTML = `
        <div class="marker-container" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transform: translateY(-50%);
        ">
          <div class="marker-pin" style="
            width: 36px;
            height: 36px;
            background: ${categoryInfo[region.category].color};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-size: 18px;
            transition: transform 0.2s ease;
          ">${region.flag}</div>
          <div class="marker-label" style="
            background: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            color: #1a1a1a;
            margin-top: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            white-space: nowrap;
          ">${region.name}</div>
        </div>
      `;

      markerElement.addEventListener("mouseenter", () => {
        const pin = markerElement.querySelector(".marker-pin") as HTMLElement;
        if (pin) pin.style.transform = "scale(1.2)";
      });
      markerElement.addEventListener("mouseleave", () => {
        const pin = markerElement.querySelector(".marker-pin") as HTMLElement;
        if (pin) pin.style.transform = "scale(1)";
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: region.coordinates,
        title: region.name,
        content: markerElement,
      });

      marker.addListener("click", () => {
        setSelectedRegion(region);
        map.panTo(region.coordinates);
        map.setZoom(6);
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const region = kavaRegions[index];
      if (!activeCategory || region.category === activeCategory) {
        marker.map = mapRef.current;
      } else {
        marker.map = null;
      }
    });
  }, [activeCategory]);

  const resetView = () => {
    setSelectedRegion(null);
    if (mapRef.current) {
      mapRef.current.panTo(pacificCenter);
      mapRef.current.setZoom(3);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      origin: filter.origin || "Ursprungsregion",
      major: filter.major || "Hauptanbaugebiet",
      secondary: filter.secondary || "Sekundäre Region",
      diaspora: filter.diaspora || "Diaspora & Westen"
    };
    return labels[category] || categoryInfo[category]?.label || category;
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="container py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">{breadcrumb.home || "Home"}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${lang}/kultur`} className="hover:text-primary transition-colors">{breadcrumb.kultur || "Kultur"}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{breadcrumb.current || "Weltkarte"}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {meta.title || "Kava-Weltkarte"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {meta.description || "Entdecken Sie die Kava-Regionen des Pazifiks."}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:border-primary"
            }`}
          >
            {filter.all || "Alle Regionen"}
          </button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: info.color }}
              />
              {getCategoryLabel(key)}
            </button>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
          <MapView
            key="kava-weltkarte-map"
            className="h-[500px] md:h-[600px]"
            initialCenter={pacificCenter}
            initialZoom={3}
            onMapReady={handleMapReady}
          />

          {selectedRegion && (
            <button
              onClick={resetView}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              {map.backToOverview || "Zurück zur Übersicht"}
            </button>
          )}
        </div>

        {selectedRegion && (
          <div className="mt-8 bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <div 
                className="p-6 md:p-8"
                style={{ 
                  background: `linear-gradient(135deg, ${categoryInfo[selectedRegion.category].color}20, ${categoryInfo[selectedRegion.category].color}05)` 
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{selectedRegion.flag}</span>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {selectedRegion.name}
                        </h2>
                        {selectedRegion.localName && selectedRegion.localName !== selectedRegion.name && (
                          <p className="text-muted-foreground">{selectedRegion.localName}</p>
                        )}
                      </div>
                    </div>
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: categoryInfo[selectedRegion.category].color }}
                    >
                      {getCategoryLabel(selectedRegion.category)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="p-2 hover:bg-black/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <p className="text-foreground leading-relaxed">
                    {selectedRegion.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {selectedRegion.traditions.ceremonyName}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {selectedRegion.traditions.ceremonyDescription}
                    </p>
                    <ul className="space-y-2">
                      {selectedRegion.traditions.keyRituals.map((ritual, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">●</span>
                          <span className="text-foreground">{ritual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {detail.varietiesTitle || "Kava-Sorten"}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegion.varieties.map((variety, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {variety}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {detail.culturalSignificance || "Kulturelle Bedeutung"}
                    </h4>
                    <p className="text-foreground">
                      {selectedRegion.culturalSignificance}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {detail.today || "Heute"}
                    </h4>
                    <p className="text-foreground">
                      {selectedRegion.modernStatus}
                    </p>
                  </div>
                </div>

                {selectedRegion.links.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {detail.readMore || "Weiterlesen"}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedRegion.links.map((link, index) => (
                        <Link
                          key={index}
                          href={link.url.replace('/de/', `/${lang}/`)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                        >
                          {link.label}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedRegion && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {grid.title || "Alle Kava-Regionen"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {kavaRegions
                .filter(r => !activeCategory || r.category === activeCategory)
                .map((region) => (
                <button
                  key={region.id}
                  onClick={() => {
                    setSelectedRegion(region);
                    if (mapRef.current) {
                      mapRef.current.panTo(region.coordinates);
                      mapRef.current.setZoom(6);
                    }
                  }}
                  className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {region.name}
                      </h3>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: categoryInfo[region.category].color }}
                      >
                        {getCategoryLabel(region.category)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {region.traditions.ceremonyName}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {kavaRegions.filter(r => r.category === "origin").length}
            </div>
            <div className="text-sm text-muted-foreground">{stats.originRegions || "Ursprungsregionen"}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {kavaRegions.filter(r => r.category === "major").length}
            </div>
            <div className="text-sm text-muted-foreground">{stats.majorAreas || "Hauptanbaugebiete"}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {kavaRegions.length}
            </div>
            <div className="text-sm text-muted-foreground">{stats.totalRegions || "Regionen insgesamt"}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">3000+</div>
            <div className="text-sm text-muted-foreground">{stats.yearsTradition || "Jahre Tradition"}</div>
          </div>
        </div>

        <div className="mt-12 bg-card border border-border rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">{related.title || "Verwandte Themen"}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={(navigation.zeremonien || "/de/kultur/zeremonien").replace('/de/', `/${lang}/`)}
              className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-primary transition-colors"
            >
              <Users className="w-8 h-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">{related.zeremonien?.title || "Zeremonien"}</div>
                <div className="text-sm text-muted-foreground">{related.zeremonien?.subtitle || "Rituale & Protokolle"}</div>
              </div>
            </Link>
            <Link
              href={(navigation.nakamal || "/de/kultur/nakamal").replace('/de/', `/${lang}/`)}
              className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-primary transition-colors"
            >
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">{related.nakamal?.title || "Nakamal"}</div>
                <div className="text-sm text-muted-foreground">{related.nakamal?.subtitle || "Kava-Bars weltweit"}</div>
              </div>
            </Link>
            <Link
              href={(navigation.sorten || "/de/sorten").replace('/de/', `/${lang}/`)}
              className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-primary transition-colors"
            >
              <Leaf className="w-8 h-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">{related.sorten?.title || "Sorten"}</div>
                <div className="text-sm text-muted-foreground">{related.sorten?.subtitle || "Varietäten erkunden"}</div>
              </div>
            </Link>
            <Link
              href={(navigation.geschichte || "/de/geschichte").replace('/de/', `/${lang}/`)}
              className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-primary transition-colors"
            >
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">{related.geschichte?.title || "Geschichte"}</div>
                <div className="text-sm text-muted-foreground">{related.geschichte?.subtitle || "3000 Jahre Kava"}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
