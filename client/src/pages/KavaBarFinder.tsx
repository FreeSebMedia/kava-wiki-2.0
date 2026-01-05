import { useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { MapView } from "@/components/Map";
import { kavaBars, countries, features, KavaBar, getUniqueStates } from "@/data/kavaBars";
import { 
  ChevronRight, Search, MapPin, Star, Clock, Phone, Globe, 
  Instagram, ExternalLink, Filter, X, ChevronDown, ChevronUp,
  DollarSign, Check, Navigation
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export default function KavaBarFinder() {
  const [location] = useLocation();
  const lang = location.split('/')[1] || 'de';
  
  const { translations, isLoading } = useTranslations({
    namespaces: ['kulturKavaBars'],
    lang: lang as any
  });
  
  const t = translations.kulturKavaBars || {};
  const meta = t.meta || {};
  const breadcrumb = t.breadcrumb || {};
  const viewToggle = t.viewToggle || {};
  const search = t.search || {};
  const filter = t.filter || {};
  const bar = t.bar || {};
  const empty = t.empty || {};
  const stats = t.stats || {};
  const cta = t.cta || {};
  const related = t.related || {};
  const navigation = t.navigation || {};
  const featureLabels = t.featureLabels || {};
  const countryNames = t.countryNames || {};
  const barsTranslations = t.bars || {};

  const getFeatureLabel = (featureId: string) => {
    return featureLabels[featureId] || features.find(f => f.id === featureId)?.label || featureId;
  };

  const getCountryName = (countryCode: string) => {
    return countryNames[countryCode] || countries.find(c => c.code === countryCode)?.name || countryCode;
  };

  const getBarDescription = (barId: string, fallback: string) => {
    return barsTranslations[barId]?.description || fallback;
  };

  const getBarSpecialties = (barId: string, fallback: string[] | undefined): string[] => {
    return barsTranslations[barId]?.specialties || fallback || [];
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<KavaBar | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const availableStates = useMemo(() => {
    if (!selectedCountry) return [];
    return getUniqueStates(selectedCountry);
  }, [selectedCountry]);

  const filteredBars = useMemo(() => {
    return kavaBars.filter(bar => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          bar.name.toLowerCase().includes(query) ||
          bar.city.toLowerCase().includes(query) ||
          bar.state.toLowerCase().includes(query) ||
          bar.country.toLowerCase().includes(query) ||
          bar.address.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      if (selectedCountry && bar.countryCode !== selectedCountry) return false;
      if (selectedState && bar.state !== selectedState) return false;
      if (minRating > 0 && bar.rating < minRating) return false;
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every(f => bar.features.includes(f));
        if (!hasAllFeatures) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCountry, selectedState, minRating, selectedFeatures]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry(null);
    setSelectedState(null);
    setMinRating(0);
    setSelectedFeatures([]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCountry) count++;
    if (selectedState) count++;
    if (minRating > 0) count++;
    count += selectedFeatures.length;
    return count;
  }, [selectedCountry, selectedState, minRating, selectedFeatures]);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
    markers.forEach(marker => marker.map = null);
    
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
    const bounds = new google.maps.LatLngBounds();

    filteredBars.forEach(kavaBar => {
      const position = { lat: kavaBar.coordinates.lat, lng: kavaBar.coordinates.lng };
      bounds.extend(position);

      const markerContent = document.createElement("div");
      markerContent.className = "kava-marker";
      markerContent.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2d5016 0%, #1a3009 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        ">
          <span style="font-size: 14px;">🥥</span>
          <span>${kavaBar.name.length > 15 ? kavaBar.name.substring(0, 15) + '...' : kavaBar.name}</span>
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        content: markerContent,
        title: kavaBar.name
      });

      marker.addListener("click", () => {
        setSelectedBar(kavaBar);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    if (filteredBars.length > 0) {
      map.fitBounds(bounds);
      const listener = google.maps.event.addListener(map, "idle", () => {
        const zoom = map.getZoom();
        if (zoom && zoom > 12) map.setZoom(12);
        google.maps.event.removeListener(listener);
      });
    } else {
      map.setCenter({ lat: 20, lng: -100 });
      map.setZoom(3);
    }
  }, [filteredBars]);

  useMemo(() => {
    if (mapInstance && viewMode === "map") {
      handleMapReady(mapInstance);
    }
  }, [filteredBars, mapInstance, viewMode]);

  const getPriceLevel = (level: number) => {
    return Array(3).fill(0).map((_, i) => (
      <DollarSign 
        key={i} 
        className={`w-3 h-3 ${i < level ? 'text-primary' : 'text-muted-foreground/30'}`} 
      />
    ));
  };

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : i < rating ? 'text-amber-500 fill-amber-500/50' : 'text-muted-foreground/30'}`} 
      />
    ));
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
            <span className="text-foreground">{breadcrumb.current || "Kava-Bar Finder"}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {meta.title || "Kava-Bar Finder"}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {meta.description || "Finde Kava-Bars weltweit."}
              </p>
            </div>
            
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {viewToggle.list || "Liste"}
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "map" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {viewToggle.map || "Karte"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={search.placeholder || "Suche nach Name, Stadt oder Land..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                activeFilterCount > 0 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">{filter.button || "Filter"}</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary-foreground text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
              {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isFilterOpen && (
            <div className="mt-4 p-4 bg-card border border-border rounded-xl">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{filter.country || "Land"}</label>
                  <select
                    value={selectedCountry || ""}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value || null);
                      setSelectedState(null);
                    }}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">{filter.allCountries || "Alle Länder"}</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {getCountryName(country.code)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{filter.region || "Region/Staat"}</label>
                  <select
                    value={selectedState || ""}
                    onChange={(e) => setSelectedState(e.target.value || null)}
                    disabled={!selectedCountry || availableStates.length === 0}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                  >
                    <option value="">{filter.allRegions || "Alle Regionen"}</option>
                    {availableStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{filter.minRating || "Mindestbewertung"}</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value={0}>{filter.allRatings || "Alle Bewertungen"}</option>
                    <option value={4}>⭐ {filter.rating4Plus || "4+ Sterne"}</option>
                    <option value={4.5}>⭐ {filter.rating45Plus || "4.5+ Sterne"}</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded-lg transition-all"
                  >
                    {filter.clearFilters || "Filter zurücksetzen"}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">{filter.features || "Ausstattung"}</label>
                <div className="flex flex-wrap gap-2">
                  {features.map(feature => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <span>{feature.icon}</span>
                      <span>{getFeatureLabel(feature.id)}</span>
                      {selectedFeatures.includes(feature.id) && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container py-4">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredBars.length}</span> {filteredBars.length !== 1 ? (search.resultPlural || "Kava-Bars gefunden") : (search.resultSingular || "Kava-Bar gefunden")}
        </p>
      </div>

      <div className="container pb-12">
        {viewMode === "list" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBars.map(kavaBar => (
              <div
                key={kavaBar.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer ${
                  selectedBar?.id === kavaBar.id ? "border-primary shadow-lg" : "border-border"
                }`}
                onClick={() => setSelectedBar(selectedBar?.id === kavaBar.id ? null : kavaBar)}
              >
                <div className="p-4 border-b border-border">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{kavaBar.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {kavaBar.city}, {kavaBar.state}
                      </p>
                    </div>
                    <div className="text-2xl">
                      {countries.find(c => c.code === kavaBar.countryCode)?.flag}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      {getRatingStars(kavaBar.rating)}
                      <span className="ml-1 text-sm font-medium">{kavaBar.rating}</span>
                      <span className="text-xs text-muted-foreground">({kavaBar.reviewCount})</span>
                    </div>
                    <div className="flex items-center">
                      {getPriceLevel(kavaBar.priceLevel)}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {getBarDescription(kavaBar.id, kavaBar.description)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {kavaBar.features.slice(0, 4).map(featureId => {
                      const feature = features.find(f => f.id === featureId);
                      return feature ? (
                        <span key={featureId} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {feature.icon} {getFeatureLabel(feature.id)}
                        </span>
                      ) : null;
                    })}
                    {kavaBar.features.length > 4 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        +{kavaBar.features.length - 4}
                      </span>
                    )}
                  </div>

                  {kavaBar.verified && (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <Check className="w-3 h-3" />
                      <span>{bar.verified || "Verifiziert"}</span>
                    </div>
                  )}
                </div>

                {selectedBar?.id === kavaBar.id && (
                  <div className="p-4 border-t border-border bg-muted/30">
                    <div className="mb-3">
                      <p className="text-sm font-medium text-foreground mb-1">{bar.address || "Adresse"}</p>
                      <p className="text-sm text-muted-foreground">
                        {kavaBar.address}<br />
                        {kavaBar.postalCode} {kavaBar.city}, {kavaBar.state}<br />
                        {kavaBar.country}
                      </p>
                    </div>

                    {kavaBar.hours && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {bar.hours || "Öffnungszeiten"}
                        </p>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          {Object.entries(kavaBar.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day.slice(0, 2)}</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {getBarSpecialties(kavaBar.id, kavaBar.specialties).length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-foreground mb-1">{bar.specialties || "Spezialitäten"}</p>
                        <div className="flex flex-wrap gap-1">
                          {getBarSpecialties(kavaBar.id, kavaBar.specialties).map((specialty, i) => (
                            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {kavaBar.phone && (
                        <a
                          href={`tel:${kavaBar.phone}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:border-primary/50 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="w-3 h-3" />
                          {bar.call || "Anrufen"}
                        </a>
                      )}
                      {kavaBar.website && (
                        <a
                          href={kavaBar.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:border-primary/50 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-3 h-3" />
                          {bar.website || "Website"}
                        </a>
                      )}
                      {kavaBar.instagram && (
                        <a
                          href={`https://instagram.com/${kavaBar.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:border-primary/50 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram className="w-3 h-3" />
                          Instagram
                        </a>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kavaBar.name + ' ' + kavaBar.address + ' ' + kavaBar.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Navigation className="w-3 h-3" />
                        {bar.route || "Route"}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="h-[600px] rounded-xl overflow-hidden border border-border">
              <MapView
                key="kava-bar-finder-map"
                onMapReady={handleMapReady}
                className="w-full h-full"
              />
            </div>

            <div className="h-[600px] overflow-y-auto scrollbar-thin space-y-4">
              {selectedBar ? (
                <div className="bg-card border border-primary rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <button
                      onClick={() => setSelectedBar(null)}
                      className="text-sm text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      {bar.backToList || "Zurück zur Liste"}
                    </button>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-xl">{selectedBar.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {selectedBar.city}, {selectedBar.state}
                        </p>
                      </div>
                      <div className="text-3xl">
                        {countries.find(c => c.code === selectedBar.countryCode)?.flag}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-3">
                      {getRatingStars(selectedBar.rating)}
                      <span className="ml-1 font-medium">{selectedBar.rating}</span>
                      <span className="text-sm text-muted-foreground">({selectedBar.reviewCount} {bar.reviews || "Bewertungen"})</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-muted-foreground">{getBarDescription(selectedBar.id, selectedBar.description)}</p>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{bar.address || "Adresse"}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedBar.address}<br />
                        {selectedBar.postalCode} {selectedBar.city}<br />
                        {selectedBar.country}
                      </p>
                    </div>

                    {selectedBar.hours && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {bar.hours || "Öffnungszeiten"}
                        </p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {Object.entries(selectedBar.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">{bar.features || "Ausstattung"}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBar.features.map(featureId => {
                          const feature = features.find(f => f.id === featureId);
                          return feature ? (
                            <span key={featureId} className="text-sm bg-muted px-3 py-1 rounded-full">
                              {feature.icon} {getFeatureLabel(feature.id)}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {getBarSpecialties(selectedBar.id, selectedBar.specialties).length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">{bar.specialties || "Spezialitäten"}</p>
                        <div className="flex flex-wrap gap-2">
                          {getBarSpecialties(selectedBar.id, selectedBar.specialties).map((specialty, i) => (
                            <span key={i} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedBar.phone && (
                        <a
                          href={`tel:${selectedBar.phone}`}
                          className="flex items-center gap-1 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          {bar.call || "Anrufen"}
                        </a>
                      )}
                      {selectedBar.website && (
                        <a
                          href={selectedBar.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-all"
                        >
                          <Globe className="w-4 h-4" />
                          {bar.website || "Website"}
                        </a>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBar.name + ' ' + selectedBar.address + ' ' + selectedBar.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                      >
                        <Navigation className="w-4 h-4" />
                        {bar.routePlan || "Route planen"}
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                filteredBars.map(kavaBar => (
                  <button
                    key={kavaBar.id}
                    onClick={() => setSelectedBar(kavaBar)}
                    className="w-full text-left bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground">{kavaBar.name}</h4>
                        <p className="text-sm text-muted-foreground">{kavaBar.city}, {kavaBar.state}</p>
                      </div>
                      <span className="text-xl">{countries.find(c => c.code === kavaBar.countryCode)?.flag}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{kavaBar.rating}</span>
                      <span className="text-xs text-muted-foreground">({kavaBar.reviewCount})</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {filteredBars.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🥥</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{empty.title || "Keine Kava-Bars gefunden"}</h3>
            <p className="text-muted-foreground mb-4">
              {empty.description || "Versuche andere Suchbegriffe oder Filter."}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
            >
              {empty.resetButton || "Filter zurücksetzen"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-muted/30 border-t border-border">
        <div className="container py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{stats.title || "Kava-Bar Statistiken"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{kavaBars.length}</div>
              <div className="text-muted-foreground">{stats.bars || "Kava-Bars"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{countries.length}</div>
              <div className="text-muted-foreground">{stats.countries || "Länder"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {kavaBars.filter(b => b.countryCode === "US").length}
              </div>
              <div className="text-muted-foreground">{stats.inUSA || "in den USA"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {kavaBars.filter(b => b.verified).length}
              </div>
              <div className="text-muted-foreground">{stats.verified || "Verifiziert"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">{cta.title || "Kennst du eine Kava-Bar?"}</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {cta.description || "Hilf uns, die Datenbank zu erweitern!"}
          </p>
          <Link
            href={(navigation.kontakt || "/de/kontakt").replace('/de/', `/${lang}/`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all"
          >
            {cta.button || "Kava-Bar vorschlagen"}
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="container pb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">{related.title || "Verwandte Seiten"}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href={(navigation.nakamal || "/de/kultur/nakamal").replace('/de/', `/${lang}/`)}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
          >
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-medium text-foreground">{related.nakamal?.title || "Nakamal & Kava-Bars"}</div>
              <div className="text-sm text-muted-foreground">{related.nakamal?.subtitle || "Geschichte der Kava-Trinkkultur"}</div>
            </div>
          </Link>
          <Link
            href={(navigation.moderne || "/de/kultur/moderne").replace('/de/', `/${lang}/`)}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
          >
            <span className="text-2xl">🌍</span>
            <div>
              <div className="font-medium text-foreground">{related.moderne?.title || "Moderne Kava-Kultur"}</div>
              <div className="text-sm text-muted-foreground">{related.moderne?.subtitle || "Globale Verbreitung heute"}</div>
            </div>
          </Link>
          <Link
            href={(navigation.weltkarte || "/de/kultur/weltkarte").replace('/de/', `/${lang}/`)}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
          >
            <span className="text-2xl">🗺️</span>
            <div>
              <div className="font-medium text-foreground">{related.weltkarte?.title || "Interaktive Weltkarte"}</div>
              <div className="text-sm text-muted-foreground">{related.weltkarte?.subtitle || "Kava-Regionen entdecken"}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
