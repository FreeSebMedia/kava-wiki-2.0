import { Link } from "wouter";
import { ChevronRight, Shield, Cookie, Server, Eye, Lock, UserCheck, Mail, ExternalLink, Scale, Settings } from "lucide-react";
import { CookieSettingsManager } from "@/components/CookieConsent";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#ebe5d5]">
      {/* Breadcrumb */}
      <div className="bg-[#2d4a2d]/5 border-b border-[#2d4a2d]/10">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5c7c5c]">
            <Link href="/de" className="hover:text-[#2d4a2d] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2d4a2d] font-medium">Datenschutzerklärung</span>
          </nav>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2d4a2d]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#2d4a2d]" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#2d4a2d]">Datenschutzerklärung</h1>
            </div>
            <p className="text-lg text-[#5c7c5c]">
              Informationen zum Datenschutz gemäß DSGVO
            </p>
            <p className="text-sm text-[#5c7c5c] mt-2">
              Stand: Dezember 2024
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#2d4a2d]/10 mb-8">
            <h2 className="font-semibold text-[#2d4a2d] mb-4">Inhaltsverzeichnis</h2>
            <nav className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#verantwortlicher" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">1. Verantwortlicher</a>
              <a href="#grundsaetze" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">2. Grundsätze der Datenverarbeitung</a>
              <a href="#hosting" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">3. Hosting und Server-Logs</a>
              <a href="#cookies" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">4. Cookies und Local Storage</a>
              <a href="#analytics" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">5. Analyse und Statistiken</a>
              <a href="#maps" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">6. Google Maps</a>
              <a href="#rechte" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">7. Ihre Rechte</a>
              <a href="#aenderungen" className="text-[#5c7c5c] hover:text-[#2d4a2d] transition-colors">8. Änderungen</a>
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* 1. Verantwortlicher */}
            <section id="verantwortlicher" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-[#5c7c5c]" />
                1. Verantwortlicher
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer 
                  nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger 
                  datenschutzrechtlicher Bestimmungen ist:
                </p>
                
                <div className="bg-[#f5f1e8] rounded-xl p-6">
                  <p className="font-medium">Kava Wiki</p>
                  <p>GFY BABILON LLP</p>
                  <p>44322 Yale Rd, Unit 3B #182</p>
                  <p>Chilliwack, BC V2R 4H1, Canada</p>
                  <p className="mt-3">
                    <Mail className="w-4 h-4 inline mr-2 text-[#5c7c5c]" />
                    E-Mail: contact@kavakava.wiki
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Grundsätze */}
            <section id="grundsaetze" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#5c7c5c]" />
                2. Grundsätze der Datenverarbeitung
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten 
                  Ihre personenbezogenen Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen 
                  Website sowie unserer Inhalte und Leistungen erforderlich ist.
                </p>
                
                <p className="leading-relaxed">
                  Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des 
                  Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer 
                  Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten 
                  durch gesetzliche Vorschriften gestattet ist.
                </p>

                <div className="bg-[#f5f1e8] rounded-xl p-6 mt-4">
                  <h3 className="font-semibold text-[#2d4a2d] mb-3">Rechtsgrundlagen nach Art. 6 DSGVO:</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Art. 6 Abs. 1 lit. a:</strong> Einwilligung des Betroffenen</p>
                    <p><strong>Art. 6 Abs. 1 lit. b:</strong> Erfüllung eines Vertrags</p>
                    <p><strong>Art. 6 Abs. 1 lit. c:</strong> Rechtliche Verpflichtung</p>
                    <p><strong>Art. 6 Abs. 1 lit. f:</strong> Berechtigtes Interesse</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Hosting */}
            <section id="hosting" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <Server className="w-5 h-5 text-[#5c7c5c]" />
                3. Hosting und Server-Log-Dateien
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Diese Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen 
                  Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters 
                  gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und 
                  Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige 
                  Daten, die über eine Website generiert werden, handeln.
                </p>

                <h3 className="font-semibold text-[#2d4a2d] mt-6 mb-3">Server-Log-Dateien</h3>
                <p className="leading-relaxed">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten 
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                
                <div className="bg-[#f5f1e8] rounded-xl p-6 mt-4">
                  <div className="space-y-2 text-sm">
                    <p>• Browsertyp und Browserversion</p>
                    <p>• Verwendetes Betriebssystem</p>
                    <p>• Referrer URL (die zuvor besuchte Seite)</p>
                    <p>• Hostname des zugreifenden Rechners</p>
                    <p>• Uhrzeit der Serveranfrage</p>
                    <p>• IP-Adresse (anonymisiert)</p>
                  </div>
                </div>

                <p className="leading-relaxed mt-4">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
                  Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
                  Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien 
                  Darstellung und der Optimierung seiner Website.
                </p>
              </div>
            </section>

            {/* 4. Cookies */}
            <section id="cookies" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <Cookie className="w-5 h-5 text-[#5c7c5c]" />
                4. Cookies und Local Storage
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Diese Website verwendet Cookies und den Local Storage Ihres Browsers. Cookies sind 
                  kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert. 
                  Local Storage ist ein Speicherbereich in Ihrem Browser für Website-Daten.
                </p>

                <h3 className="font-semibold text-[#2d4a2d] mt-6 mb-3">Verwendete Speichertechnologien:</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#2d4a2d]/10">
                        <th className="text-left p-3 font-semibold text-[#2d4a2d]">Name</th>
                        <th className="text-left p-3 font-semibold text-[#2d4a2d]">Zweck</th>
                        <th className="text-left p-3 font-semibold text-[#2d4a2d]">Speicherdauer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2d4a2d]/10">
                        <td className="p-3">theme</td>
                        <td className="p-3">Speichert Ihre Farbschema-Präferenz (hell/dunkel)</td>
                        <td className="p-3">Dauerhaft</td>
                      </tr>
                      <tr className="border-b border-[#2d4a2d]/10">
                        <td className="p-3">language</td>
                        <td className="p-3">Speichert Ihre Spracheinstellung</td>
                        <td className="p-3">Dauerhaft</td>
                      </tr>
                      <tr className="border-b border-[#2d4a2d]/10">
                        <td className="p-3">favorites</td>
                        <td className="p-3">Speichert Ihre favorisierten Kava-Sorten</td>
                        <td className="p-3">Dauerhaft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="leading-relaxed mt-4">
                  Diese Daten werden ausschließlich lokal in Ihrem Browser gespeichert und nicht an 
                  unsere Server übertragen. Sie können Ihren Browser so einstellen, dass Sie über das 
                  Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die 
                  Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das 
                  automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                </p>

                {/* Cookie Settings Manager */}
                <div className="mt-8 pt-6 border-t border-[#2d4a2d]/10">
                  <h3 className="font-semibold text-[#2d4a2d] mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Cookie-Einstellungen verwalten
                  </h3>
                  <p className="text-sm text-[#5c7c5c] mb-4">
                    Hier können Sie Ihre Cookie-Präferenzen jederzeit anpassen oder Ihre Einwilligung zurücksetzen.
                  </p>
                  <CookieSettingsManager />
                </div>
              </div>
            </section>

            {/* 5. Analytics */}
            <section id="analytics" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <Eye className="w-5 h-5 text-[#5c7c5c]" />
                5. Analyse und Statistiken
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Zur Verbesserung unserer Website nutzen wir ein datenschutzfreundliches Analyse-Tool, 
                  das keine personenbezogenen Daten speichert und keine Cookies setzt. Die Analyse 
                  erfolgt auf Basis anonymisierter Daten.
                </p>

                <div className="bg-[#f5f1e8] rounded-xl p-6 mt-4">
                  <h3 className="font-semibold text-[#2d4a2d] mb-3">Erfasste anonyme Daten:</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Seitenaufrufe (ohne IP-Adresse)</p>
                    <p>• Ungefährer Standort (Land/Region, nicht Stadt)</p>
                    <p>• Gerätetyp (Desktop/Mobil/Tablet)</p>
                    <p>• Browser und Betriebssystem</p>
                    <p>• Verweisende Website</p>
                  </div>
                </div>

                <p className="leading-relaxed mt-4">
                  Diese Daten werden ausschließlich in aggregierter Form verwendet und ermöglichen 
                  keine Identifizierung einzelner Nutzer. Die Rechtsgrundlage hierfür ist Art. 6 
                  Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Verbesserung unseres Angebots).
                </p>
              </div>
            </section>

            {/* 6. Google Maps */}
            <section id="maps" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-[#5c7c5c]" />
                6. Google Maps
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Diese Website nutzt den Kartendienst Google Maps über eine API. Anbieter ist die 
                  Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>

                <p className="leading-relaxed">
                  Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu 
                  speichern. Diese Informationen werden in der Regel an einen Server von Google in 
                  den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen 
                  Einfluss auf diese Datenübertragung.
                </p>

                <p className="leading-relaxed">
                  Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung 
                  unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der 
                  Website angegebenen Orte (Kava-Bars). Dies stellt ein berechtigtes Interesse im 
                  Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                </p>

                <div className="bg-[#f5f1e8] rounded-xl p-6 mt-4">
                  <p className="text-sm">
                    Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung 
                    von Google: 
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#2d4a2d] underline hover:no-underline ml-1"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Ihre Rechte */}
            <section id="rechte" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-[#5c7c5c]" />
                7. Ihre Rechte als betroffene Person
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden 
                  personenbezogenen Daten:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Auskunftsrecht (Art. 15 DSGVO)</h3>
                    <p className="text-sm">Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</p>
                  </div>
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Berichtigungsrecht (Art. 16 DSGVO)</h3>
                    <p className="text-sm">Sie können die Berichtigung unrichtiger oder Vervollständigung Ihrer Daten verlangen.</p>
                  </div>
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Löschungsrecht (Art. 17 DSGVO)</h3>
                    <p className="text-sm">Sie können die Löschung Ihrer bei uns gespeicherten Daten verlangen.</p>
                  </div>
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Einschränkung (Art. 18 DSGVO)</h3>
                    <p className="text-sm">Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</p>
                  </div>
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                    <p className="text-sm">Sie können verlangen, Ihre Daten in einem übertragbaren Format zu erhalten.</p>
                  </div>
                  <div className="bg-[#f5f1e8] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2d4a2d] mb-2">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                    <p className="text-sm">Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen.</p>
                  </div>
                </div>

                <div className="bg-amber-50/80 rounded-xl p-6 mt-6 border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">Beschwerderecht bei der Aufsichtsbehörde</h3>
                  <p className="text-sm text-amber-900">
                    Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die 
                    Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Änderungen */}
            <section id="aenderungen" className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2d4a2d]/10 scroll-mt-24">
              <h2 className="font-serif text-2xl text-[#2d4a2d] mb-6">
                8. Änderungen dieser Datenschutzerklärung
              </h2>
              
              <div className="space-y-4 text-[#3d5a3d]">
                <p className="leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
                  in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. 
                  Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </div>
            </section>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/de/impressum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d4a2d] text-white rounded-xl hover:bg-[#3d5a3d] transition-colors"
              >
                <Scale className="w-4 h-4" />
                Impressum
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
