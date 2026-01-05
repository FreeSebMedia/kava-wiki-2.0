/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 * USAGE FROM PARENT COMPONENT:
 * ======
 *
 * const mapRef = useRef<google.maps.Map | null>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime, google map itself is in charge of the re-rendering, not react state.
 * </MapView>
 *
 * ======
 * Available Libraries and Core Features:
 * -------------------------------
 * 📍 MARKER (from `marker` library)
 * - Attaches to map using { map, position }
 * new google.maps.marker.AdvancedMarkerElement({
 *   map,
 *   position: { lat: 37.7749, lng: -122.4194 },
 *   title: "San Francisco",
 * });
 *
 * -------------------------------
 * 🏢 PLACES (from `places` library)
 * - Does not attach directly to map; use data with your map manually.
 * const place = new google.maps.places.Place({ id: PLACE_ID });
 * await place.fetchFields({ fields: ["displayName", "location"] });
 * map.setCenter(place.location);
 * new google.maps.marker.AdvancedMarkerElement({ map, position: place.location });
 *
 * -------------------------------
 * 🧭 GEOCODER (from `geocoding` library)
 * - Standalone service; manually apply results to map.
 * const geocoder = new google.maps.Geocoder();
 * geocoder.geocode({ address: "New York" }, (results, status) => {
 *   if (status === "OK" && results[0]) {
 *     map.setCenter(results[0].geometry.location);
 *     new google.maps.marker.AdvancedMarkerElement({
 *       map,
 *       position: results[0].geometry.location,
 *     });
 *   }
 * });
 *
 * -------------------------------
 * 📐 GEOMETRY (from `geometry` library)
 * - Pure utility functions; not attached to map.
 * const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
 *
 * -------------------------------
 * 🛣️ ROUTES (from `routes` library)
 * - Combines DirectionsService (standalone) + DirectionsRenderer (map-attached)
 * const directionsService = new google.maps.DirectionsService();
 * const directionsRenderer = new google.maps.DirectionsRenderer({ map });
 * directionsService.route(
 *   { origin, destination, travelMode: "DRIVING" },
 *   (result, status) => {
 *     if (status === "OK") directionsRenderer.setDirections(result);
 *   }
 * );
 *
 * ======
 * IMPORTANT NOTES:
 * - All map-attached objects need the `map` reference from `onMapReady`.
 * - Standalone services (Geocoder, DirectionsService, etc.) don't need `map`.
 * - Always check `status === "OK"` before using results.
 * - Use `AdvancedMarkerElement` for modern marker support.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { hasMapsConsent } from "./CookieConsent";
import { Map, MapPin, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google?: typeof google;
    __googleMapsLoading?: Promise<void>;
    __googleMapsLoaded?: boolean;
  }
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Singleton pattern for loading Google Maps API
 * Ensures the script is only loaded once across all components
 */
function loadMapScript(): Promise<void> {
  // If already loaded, return immediately
  if (window.__googleMapsLoaded && window.google?.maps) {
    return Promise.resolve();
  }
  
  // If currently loading, return the existing promise
  if (window.__googleMapsLoading) {
    return window.__googleMapsLoading;
  }
  
  // Check if script tag already exists
  const existingScript = document.querySelector(
    'script[src*="maps/api/js"]'
  );
  if (existingScript && window.google?.maps) {
    window.__googleMapsLoaded = true;
    return Promise.resolve();
  }
  
  // Create new loading promise
  window.__googleMapsLoading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      window.__googleMapsLoaded = true;
      resolve();
    };
    script.onerror = () => {
      window.__googleMapsLoading = undefined;
      console.error("Failed to load Google Maps script");
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });
  
  return window.__googleMapsLoading;
}

// Consent placeholder component
function MapConsentPlaceholder({ className, onAccept }: { className?: string; onAccept: () => void }) {
  return (
    <div className={cn(
      "w-full h-[500px] bg-[#f5f1eb] rounded-xl border border-[#2d5a27]/20 flex flex-col items-center justify-center p-8 text-center",
      className
    )}>
      <div className="p-4 rounded-full bg-[#2d5a27]/10 mb-4">
        <Map className="w-12 h-12 text-[#2d5a27]" />
      </div>
      <h3 className="font-serif text-xl text-[#2d5a27] mb-2">
        Google Maps deaktiviert
      </h3>
      <p className="text-[#5c4a3d]/70 max-w-md mb-6">
        Um die interaktive Karte anzuzeigen, müssen Sie der Verwendung von Google Maps zustimmen. 
        Google kann dabei Daten wie Ihre IP-Adresse verarbeiten.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onAccept}
          className="bg-[#2d5a27] hover:bg-[#4a7c43] text-white"
        >
          <Cookie className="w-4 h-4 mr-2" />
          Karten aktivieren
        </Button>
        <Button
          variant="outline"
          className="border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10"
          onClick={() => window.location.href = "/de/datenschutz#cookies"}
        >
          Mehr erfahren
        </Button>
      </div>
    </div>
  );
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const initialized = useRef(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  // Check consent on mount
  useEffect(() => {
    setHasConsent(hasMapsConsent());
  }, []);

  const init = useCallback(async () => {
    // Prevent double initialization
    if (initialized.current) return;
    initialized.current = true;
    
    try {
      await loadMapScript();
      if (!mapContainer.current) {
        console.error("Map container not found");
        return;
      }
      if (!window.google?.maps) {
        console.error("Google Maps not available");
        return;
      }
      map.current = new window.google.maps.Map(mapContainer.current, {
        zoom: initialZoom,
        center: initialCenter,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapId: "DEMO_MAP_ID",
      });
      if (onMapReady) {
        onMapReady(map.current);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      initialized.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCenter, initialZoom, onMapReady]);

  useEffect(() => {
    if (hasConsent) {
      init();
    }
  }, [init, hasConsent]);

  // Handle consent acceptance
  const handleAcceptMaps = () => {
    // Update consent in localStorage
    const CONSENT_KEY = "kava-wiki-cookie-consent";
    const PREFERENCES_KEY = "kava-wiki-cookie-preferences";
    
    // Get existing preferences or create new
    let prefs = {
      necessary: true,
      functional: false,
      analytics: false,
      maps: true,
    };
    
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      try {
        prefs = { ...JSON.parse(stored), maps: true };
      } catch {
        // Use default
      }
    }
    
    localStorage.setItem(CONSENT_KEY, "true");
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    setHasConsent(true);
  };

  // Show loading state while checking consent
  if (hasConsent === null) {
    return (
      <div className={cn("w-full h-[500px] bg-[#f5f1eb] rounded-xl animate-pulse", className)} />
    );
  }

  // Show consent placeholder if no consent
  if (!hasConsent) {
    return <MapConsentPlaceholder className={className} onAccept={handleAcceptMaps} />;
  }

  return (
    <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />
  );
}
