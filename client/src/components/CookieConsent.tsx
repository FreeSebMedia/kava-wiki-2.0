import { useState, useEffect } from "react";
import { X, Cookie, Shield, BarChart3, Map, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Cookie consent categories
export interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean; // Language, theme preferences
  analytics: boolean; // Usage statistics
  maps: boolean; // Google Maps
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  maps: false,
};

// Storage key
const CONSENT_KEY = "kava-wiki-cookie-consent";
const PREFERENCES_KEY = "kava-wiki-cookie-preferences";

// Get stored consent
export function getStoredConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "true";
}

// Get stored preferences
export function getStoredPreferences(): CookiePreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  const stored = localStorage.getItem(PREFERENCES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }
  return DEFAULT_PREFERENCES;
}

// Check if maps consent is given
export function hasMapsConsent(): boolean {
  const prefs = getStoredPreferences();
  return prefs.maps;
}

// Check if analytics consent is given
export function hasAnalyticsConsent(): boolean {
  const prefs = getStoredPreferences();
  return prefs.analytics;
}

interface CategoryToggleProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function CategoryToggle({ id, title, description, icon, checked, disabled, onChange }: CategoryToggleProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f5f1eb]/50 border border-[#2d5a27]/10">
      <div className="p-2 rounded-lg bg-[#2d5a27]/10 text-[#2d5a27] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor={id} className="font-medium text-[#2d5a27] cursor-pointer">
            {title}
          </label>
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={onChange}
            disabled={disabled}
            className="data-[state=checked]:bg-[#2d5a27]"
          />
        </div>
        <p className="text-sm text-[#5c4a3d]/70 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  // Check if consent was already given
  useEffect(() => {
    const hasConsent = getStoredConsent();
    if (!hasConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save consent and preferences
  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, "true");
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowSettings(false);
    
    // Reload page to apply new preferences (especially for maps)
    window.location.reload();
  };

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      maps: true,
    };
    saveConsent(allAccepted);
  };

  // Accept only necessary cookies
  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      maps: false,
    };
    saveConsent(necessaryOnly);
  };

  // Save custom preferences
  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

  // Update a single preference
  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={() => {}} // Prevent closing by clicking backdrop
      />
      
      {/* Banner */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#2d5a27]/10 text-[#2d5a27]">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl text-[#2d5a27] mb-2">
                Datenschutz-Einstellungen
              </h2>
              <p className="text-[#5c4a3d]/80 text-sm leading-relaxed">
                Wir verwenden Cookies und ähnliche Technologien, um Ihre Erfahrung zu verbessern. 
                Sie können wählen, welche Kategorien Sie zulassen möchten. 
                <a href="/de/datenschutz" className="text-[#2d5a27] hover:underline ml-1">
                  Mehr erfahren
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Settings Panel (expandable) */}
        {showSettings && (
          <div className="px-6 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            <CategoryToggle
              id="necessary"
              title="Notwendig"
              description="Erforderlich für die Grundfunktionen der Website. Kann nicht deaktiviert werden."
              icon={<Shield className="w-5 h-5" />}
              checked={true}
              disabled={true}
              onChange={() => {}}
            />
            
            <CategoryToggle
              id="functional"
              title="Funktional"
              description="Speichert Ihre Einstellungen wie Sprache und Theme für ein besseres Erlebnis."
              icon={<Cookie className="w-5 h-5" />}
              checked={preferences.functional}
              onChange={(checked) => updatePreference("functional", checked)}
            />
            
            <CategoryToggle
              id="analytics"
              title="Statistik"
              description="Hilft uns zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern."
              icon={<BarChart3 className="w-5 h-5" />}
              checked={preferences.analytics}
              onChange={(checked) => updatePreference("analytics", checked)}
            />
            
            <CategoryToggle
              id="maps"
              title="Karten (Google Maps)"
              description="Ermöglicht die Anzeige interaktiver Karten für die Kava-Weltkarte und den Kava-Bar Finder."
              icon={<Map className="w-5 h-5" />}
              checked={preferences.maps}
              onChange={(checked) => updatePreference("maps", checked)}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 pt-4 bg-[#f5f1eb]/30 border-t border-[#2d5a27]/10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Settings Toggle / Save Button */}
            {showSettings ? (
              <Button
                onClick={saveCustomPreferences}
                variant="outline"
                className="flex-1 border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10 h-12"
              >
                Auswahl speichern
              </Button>
            ) : (
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="flex-1 border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10 h-12"
              >
                <span>Einstellungen</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {/* Necessary Only Button */}
            <Button
              onClick={acceptNecessary}
              variant="outline"
              className="flex-1 border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10 h-12"
            >
              Nur notwendige
            </Button>
            
            {/* Accept All Button - slightly more prominent but not manipulative */}
            <Button
              onClick={acceptAll}
              className="flex-1 bg-[#2d5a27] hover:bg-[#4a7c43] text-white h-12 font-medium"
            >
              Alle akzeptieren
            </Button>
          </div>
          
          {/* Settings collapse button when expanded */}
          {showSettings && (
            <button
              onClick={() => setShowSettings(false)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-sm text-[#5c4a3d]/60 hover:text-[#2d5a27] transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
              Einstellungen ausblenden
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Component to manage consent from Datenschutz page
export function CookieSettingsManager() {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferences(getStoredPreferences());
  }, []);

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setSaved(true);
    
    // Show success message briefly then reload
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(PREFERENCES_KEY);
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <CategoryToggle
          id="settings-necessary"
          title="Notwendig"
          description="Erforderlich für die Grundfunktionen der Website. Kann nicht deaktiviert werden."
          icon={<Shield className="w-5 h-5" />}
          checked={true}
          disabled={true}
          onChange={() => {}}
        />
        
        <CategoryToggle
          id="settings-functional"
          title="Funktional"
          description="Speichert Ihre Einstellungen wie Sprache und Theme für ein besseres Erlebnis."
          icon={<Cookie className="w-5 h-5" />}
          checked={preferences.functional}
          onChange={(checked) => updatePreference("functional", checked)}
        />
        
        <CategoryToggle
          id="settings-analytics"
          title="Statistik"
          description="Hilft uns zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern."
          icon={<BarChart3 className="w-5 h-5" />}
          checked={preferences.analytics}
          onChange={(checked) => updatePreference("analytics", checked)}
        />
        
        <CategoryToggle
          id="settings-maps"
          title="Karten (Google Maps)"
          description="Ermöglicht die Anzeige interaktiver Karten für die Kava-Weltkarte und den Kava-Bar Finder."
          icon={<Map className="w-5 h-5" />}
          checked={preferences.maps}
          onChange={(checked) => updatePreference("maps", checked)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={savePreferences}
          className="flex-1 bg-[#2d5a27] hover:bg-[#4a7c43] text-white"
        >
          {saved ? "✓ Gespeichert" : "Einstellungen speichern"}
        </Button>
        <Button
          onClick={resetConsent}
          variant="outline"
          className="flex-1 border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27]/10"
        >
          Einwilligung zurücksetzen
        </Button>
      </div>
    </div>
  );
}
