import { Link } from "wouter";
import { ChevronRight, Mail, Globe, FileText, Scale, AlertTriangle } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#ebe5d5]">
      {/* Breadcrumb */}
      <div className="bg-[#2d4a2d]/5 border-b border-[#2d4a2d]/10">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5c7c5c]">
            <Link href="/de" className="hover:text-[#2d4a2d] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2d4a2d] font-medium">Impressum</span>
          </nav>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2d4a2d]/10 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#2d4a2d]" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#2d4a2d]">Impressum</h1>
            </div>
            <p className="text-lg text-[#5c7c5c]">
              Angaben gemäß § 5 TMG und § 55 RStV
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Betreiber */}
            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#5c7c5c]" />
                Angaben zum Betreiber
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="font-medium text-lg">Kava Wiki</p>
                <p>
                  Dieses Projekt ist ein nicht-kommerzielles Informationsportal über die Kava-Pflanze 
                  (Piper methysticum) und dient ausschließlich Bildungszwecken.
                </p>
                
                <div className="bg-[#f5f1e8] rounded-xl p-6 mt-6">
                  <p className="text-sm text-[#5c7c5c] mb-2">Verantwortlich für den Inhalt:</p>
                  <p className="font-medium">GFY BABILON LLP</p>
                  <p>44322 Yale Rd</p>
                  <p>Unit 3B #182</p>
                  <p>Chilliwack, BC V2R 4H1</p>
                  <p>Canada</p>
                </div>
              </div>
            </section>

            {/* Kontakt */}
            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5c7c5c]" />
                Kontakt
              </h2>
              
              <div className="space-y-3 text-[#3d5a3d]">
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#5c7c5c]" />
                  <span>E-Mail: contact@kavakava.wiki</span>
                </p>
                <p className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#5c7c5c]" />
                  <span>Website: kavakava.wiki</span>
                </p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-[#5c7c5c]" />
                Haftungsausschluss (Disclaimer)
              </h2>
              
              <div className="space-y-6 text-[#3d5a3d]">
                <div>
                  <h3 className="font-semibold text-[#2d4a2d] mb-2">Haftung für Inhalte</h3>
                  <p className="leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                    Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d4a2d] mb-2">Haftung für Links</h3>
                  <p className="leading-relaxed">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                    mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                    Verlinkung nicht erkennbar.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d4a2d] mb-2">Urheberrecht</h3>
                  <p className="leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                    nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                </div>
              </div>
            </section>

            {/* Medizinischer Hinweis */}
            <section className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
              <h2 className="font-serif text-2xl text-amber-800 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Wichtiger Hinweis
              </h2>
              
              <div className="space-y-4 text-amber-900">
                <p className="leading-relaxed">
                  <strong>Keine medizinische Beratung:</strong> Die auf dieser Website bereitgestellten 
                  Informationen dienen ausschließlich Bildungs- und Informationszwecken. Sie stellen keine 
                  medizinische Beratung dar und ersetzen nicht die Konsultation eines qualifizierten 
                  Arztes oder Apothekers.
                </p>
                <p className="leading-relaxed">
                  <strong>Eigenverantwortung:</strong> Die Nutzung der auf dieser Website bereitgestellten 
                  Informationen erfolgt auf eigene Verantwortung. Vor der Anwendung von Kava oder anderen 
                  pflanzlichen Substanzen sollten Sie immer einen Arzt konsultieren, insbesondere wenn Sie 
                  Medikamente einnehmen oder unter gesundheitlichen Beschwerden leiden.
                </p>
                <p className="leading-relaxed">
                  <strong>Rechtlicher Status:</strong> Der rechtliche Status von Kava variiert je nach Land. 
                  Informieren Sie sich über die geltenden Gesetze in Ihrem Land, bevor Sie Kava erwerben 
                  oder konsumieren.
                </p>
              </div>
            </section>

            {/* Streitschlichtung */}
            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6">
                Streitschlichtung
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2d4a2d] underline hover:no-underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/de/datenschutz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d4a2d] text-white rounded-xl hover:bg-[#3d5a3d] transition-colors"
              >
                <FileText className="w-4 h-4" />
                Datenschutzerklärung
              </Link>
              <Link 
                href="/de"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 text-[#2d4a2d] rounded-xl hover:bg-white transition-colors border border-[#2d4a2d]/20"
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
