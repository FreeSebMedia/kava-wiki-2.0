import { Link } from "wouter";
import { 
  Home, 
  Search, 
  BookOpen, 
  Leaf, 
  FlaskConical, 
  Globe, 
  HelpCircle,
  ArrowLeft,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const quickLinks = [
    { 
      href: "/de", 
      icon: Home, 
      label: "Startseite",
      description: "Zurück zur Übersicht"
    },
    { 
      href: "/de/botanik", 
      icon: Leaf, 
      label: "Botanik",
      description: "Die Kava-Pflanze"
    },
    { 
      href: "/de/wirkung", 
      icon: FlaskConical, 
      label: "Wirkung",
      description: "Effekte & Anwendung"
    },
    { 
      href: "/de/sorten", 
      icon: Globe, 
      label: "Sorten",
      description: "Noble Kava Varietäten"
    },
    { 
      href: "/de/studien", 
      icon: BookOpen, 
      label: "Studien",
      description: "Wissenschaftliche Forschung"
    },
    { 
      href: "/de/faq", 
      icon: HelpCircle, 
      label: "FAQ",
      description: "Häufige Fragen"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3ef] to-[#e8e4dc] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1a3a1a]/10 bg-white/80 backdrop-blur-sm">
        <div className="container py-4">
          <Link href="/de" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo-kava-wiki.png" 
              alt="Kava Wiki Logo" 
              className="h-8 w-8"
            />
            <span className="font-serif text-xl font-bold text-[#1a3a1a]">Kava Wiki</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            {/* Decorative Kava leaves */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-[#1a3a1a]">
                <path 
                  fill="currentColor" 
                  d="M100,20 Q140,60 130,100 Q120,140 100,180 Q80,140 70,100 Q60,60 100,20 Z"
                />
                <path 
                  fill="currentColor" 
                  d="M60,40 Q80,70 75,100 Q70,130 60,160 Q50,130 45,100 Q40,70 60,40 Z"
                  opacity="0.7"
                />
                <path 
                  fill="currentColor" 
                  d="M140,40 Q160,70 155,100 Q150,130 140,160 Q130,130 125,100 Q120,70 140,40 Z"
                  opacity="0.7"
                />
              </svg>
            </div>
            
            {/* 404 Number */}
            <div className="relative">
              <h1 className="font-serif text-[150px] md:text-[200px] font-bold text-[#1a3a1a]/10 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#1a3a1a]/10">
                  <Compass className="w-12 h-12 text-[#1a3a1a] mx-auto mb-2" />
                  <p className="text-[#1a3a1a] font-medium">Seite nicht gefunden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a1a] mb-4">
              Diese Wurzel führt ins Leere
            </h2>
            <p className="text-lg text-[#1a3a1a]/70 max-w-xl mx-auto">
              Die gesuchte Seite existiert nicht oder wurde verschoben. 
              Vielleicht finden Sie, was Sie suchen, über einen der folgenden Links.
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-10">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="border-[#1a3a1a]/20 text-[#1a3a1a] hover:bg-[#1a3a1a]/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur vorherigen Seite
            </Button>
          </div>

          {/* Quick Links Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#1a3a1a]/10">
            <h3 className="font-serif text-xl font-semibold text-[#1a3a1a] mb-6 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Beliebte Seiten
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="group flex flex-col items-center p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#1a3a1a] transition-all duration-300"
                >
                  <link.icon className="w-8 h-8 text-[#1a3a1a] group-hover:text-white mb-2 transition-colors" />
                  <span className="font-medium text-[#1a3a1a] group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-[#1a3a1a]/60 group-hover:text-white/70 transition-colors">
                    {link.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 text-[#1a3a1a]/60">
            <p>
              Nutzen Sie das{" "}
              <Link href="/de/glossar" className="text-[#1a3a1a] underline hover:no-underline">
                Glossar
              </Link>
              {" "}oder die{" "}
              <Link href="/de/faq" className="text-[#1a3a1a] underline hover:no-underline">
                FAQ
              </Link>
              {" "}um Antworten auf Ihre Fragen zu finden.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a3a1a]/10 bg-white/80 backdrop-blur-sm py-6">
        <div className="container text-center text-sm text-[#1a3a1a]/60">
          <p>
            © {new Date().getFullYear()} Kava Wiki – Das Wissensportal über Piper methysticum
          </p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/de/impressum" className="hover:text-[#1a3a1a] transition-colors">
              Impressum
            </Link>
            <span>•</span>
            <Link href="/de/datenschutz" className="hover:text-[#1a3a1a] transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
