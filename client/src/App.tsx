import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Botanik from "./pages/Botanik";
import BotanikPflanze from "./pages/BotanikPflanze";
import BotanikMorphologie from "./pages/BotanikMorphologie";
import BotanikAnbau from "./pages/BotanikAnbau";
import Geschichte from "./pages/Geschichte";
import GeschichteUrspruenge from "./pages/GeschichteUrspruenge";
import GeschichteVerbreitung from "./pages/GeschichteVerbreitung";
import GeschichteModerne from "./pages/GeschichteModerne";
import GeschichteZeitleiste from "./pages/GeschichteZeitleiste";
import Inhaltsstoffe from "./pages/Inhaltsstoffe";
import InhaltsstoffeKavalactone from "./pages/InhaltsstoffeKavalactone";
import InhaltsstoffeChemotypen from "./pages/InhaltsstoffeChemotypen";
import ChemotypRechner from "./pages/ChemotypRechner";
import Studien from "./pages/Studien";
import Wirkung from "./pages/Wirkung";
import WirkungAngst from "./pages/WirkungAngst";
import WirkungSchlaf from "./pages/WirkungSchlaf";
import WirkungMuskel from "./pages/WirkungMuskel";
import WirkungStimmung from "./pages/WirkungStimmung";
import WirkungKognition from "./pages/WirkungKognition";
import Sicherheit from "./pages/Sicherheit";
import SicherheitLeber from "./pages/SicherheitLeber";
import SicherheitWechselwirkungen from "./pages/SicherheitWechselwirkungen";
import SicherheitKontraindikationen from "./pages/SicherheitKontraindikationen";
import SicherheitChecker from "./pages/SicherheitChecker";
import Kultur from "./pages/Kultur";
import KulturZeremonien from "./pages/KulturZeremonien";
import KulturNakamal from "./pages/KulturNakamal";
import KulturModerne from "./pages/KulturModerne";
import KavaWeltkarte from "./pages/KavaWeltkarte";
import KavaBarFinder from "./pages/KavaBarFinder";
import Zubereitung from "./pages/Zubereitung";
import ZubereitungTraditionell from "./pages/ZubereitungTraditionell";
import ZubereitungBlender from "./pages/ZubereitungBlender";
import ZubereitungInstant from "./pages/ZubereitungInstant";
import DosierungsRechner from "./pages/DosierungsRechner";
import Sorten from "./pages/Sorten";
import SortenNobleTudei from "./pages/SortenNobleTudei";
import SortenVanuatu from "./pages/SortenVanuatu";
import SortenPazifik from "./pages/SortenPazifik";
import SortenProfile from "./pages/SortenProfile";
import SortenVergleich from "./pages/SortenVergleich";
import Rechtsstatus from "./pages/Rechtsstatus";
import Glossar from "./pages/Glossar";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import FAQ from "./pages/FAQ";
import CookieConsent from "./components/CookieConsent";
import LanguageRedirect from "./components/LanguageRedirect";
import { LanguageProvider } from "./contexts/LanguageContext";

// Placeholder components for routes we haven't built yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container py-24 text-center">
    <h1 className="font-serif text-4xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">Inhalt wird erstellt...</p>
  </div>
);
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <LanguageRedirect />
      <Layout>
        <Switch>
          {/* Root path - handled by LanguageRedirect for browser language detection */}
          <Route path="/" component={() => null} />
          
          {/* German Routes */}
          <Route path="/de" component={Home} />
          
          {/* Botanik Section with Subpages */}
          <Route path="/de/botanik" component={Botanik} />
          <Route path="/de/botanik/pflanze" component={BotanikPflanze} />
          <Route path="/de/botanik/morphologie" component={BotanikMorphologie} />
          <Route path="/de/botanik/anbau" component={BotanikAnbau} />
          
          {/* Geschichte Section with Subpages */}
          <Route path="/de/geschichte" component={Geschichte} />
          <Route path="/de/geschichte/urspruenge" component={GeschichteUrspruenge} />
          <Route path="/de/geschichte/verbreitung" component={GeschichteVerbreitung} />
          <Route path="/de/geschichte/moderne" component={GeschichteModerne} />
          <Route path="/de/geschichte/zeitleiste" component={GeschichteZeitleiste} />
          
          {/* Inhaltsstoffe Section with Subpages */}
          <Route path="/de/inhaltsstoffe" component={Inhaltsstoffe} />
          <Route path="/de/inhaltsstoffe/kavalactone" component={InhaltsstoffeKavalactone} />
          <Route path="/de/inhaltsstoffe/chemotypen" component={InhaltsstoffeChemotypen} />
          <Route path="/de/inhaltsstoffe/rechner" component={ChemotypRechner} />
          
          {/* Wirkung Section with Subpages */}
          <Route path="/de/wirkung" component={Wirkung} />
          <Route path="/de/wirkung/angst" component={WirkungAngst} />
          <Route path="/de/wirkung/schlaf" component={WirkungSchlaf} />
          <Route path="/de/wirkung/muskel" component={WirkungMuskel} />
          <Route path="/de/wirkung/stimmung" component={WirkungStimmung} />
          <Route path="/de/wirkung/kognition" component={WirkungKognition} />
          
          {/* Sorten Section with Subpages */}
          <Route path="/de/sorten" component={Sorten} />
          <Route path="/de/sorten/noble-tudei" component={SortenNobleTudei} />
          <Route path="/de/sorten/vanuatu" component={SortenVanuatu} />
          <Route path="/de/sorten/pazifik" component={SortenPazifik} />
          <Route path="/de/sorten/profile" component={SortenProfile} />
          <Route path="/de/sorten/vergleich" component={SortenVergleich} />
          
          <Route path="/de/studien" component={Studien} />
          <Route path="/de/sicherheit" component={Sicherheit} />
          <Route path="/de/sicherheit/leber" component={SicherheitLeber} />
          <Route path="/de/sicherheit/wechselwirkungen" component={SicherheitWechselwirkungen} />
          <Route path="/de/sicherheit/kontraindikationen" component={SicherheitKontraindikationen} />
          <Route path="/de/sicherheit/checker" component={SicherheitChecker} />
          <Route path="/de/zubereitung" component={Zubereitung} />
          <Route path="/de/zubereitung/traditionell" component={ZubereitungTraditionell} />
          <Route path="/de/zubereitung/blender" component={ZubereitungBlender} />
          <Route path="/de/zubereitung/instant" component={ZubereitungInstant} />
          <Route path="/de/zubereitung/rechner" component={DosierungsRechner} />
          <Route path="/de/rechtsstatus" component={Rechtsstatus} />
          <Route path="/de/kultur" component={Kultur} />
          <Route path="/de/kultur/zeremonien" component={KulturZeremonien} />
          <Route path="/de/kultur/nakamal" component={KulturNakamal} />
          <Route path="/de/kultur/moderne" component={KulturModerne} />
          <Route path="/de/kultur/weltkarte" component={KavaWeltkarte} />
          <Route path="/de/kultur/kava-bars" component={KavaBarFinder} />
          <Route path="/de/glossar" component={Glossar} />
          <Route path="/de/impressum" component={Impressum} />
          <Route path="/de/datenschutz" component={Datenschutz} />
          <Route path="/de/faq" component={FAQ} />
          
          {/* All Language Routes - Botanik Section */}
          {/* Each language gets its own botanik route that uses the translation files */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik`} path={`/${lang}/botanik`} component={Botanik} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik-pflanze`} path={`/${lang}/botanik/pflanze`} component={BotanikPflanze} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik-morphologie`} path={`/${lang}/botanik/morphologie`} component={BotanikMorphologie} />
          ))}
          
          {/* Language home pages */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-home`} path={`/${lang}`} component={Home} />
          ))}
          
          {/* Multilingual Botanik routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik`} path={`/${lang}/botanik`} component={Botanik} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik-pflanze`} path={`/${lang}/botanik/pflanze`} component={BotanikPflanze} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik-morphologie`} path={`/${lang}/botanik/morphologie`} component={BotanikMorphologie} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-botanik-anbau`} path={`/${lang}/botanik/anbau`} component={BotanikAnbau} />
          ))}
          
          {/* Multilingual Geschichte routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-geschichte`} path={`/${lang}/geschichte`} component={Geschichte} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-geschichte-urspruenge`} path={`/${lang}/geschichte/urspruenge`} component={GeschichteUrspruenge} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-geschichte-verbreitung`} path={`/${lang}/geschichte/verbreitung`} component={GeschichteVerbreitung} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-geschichte-moderne`} path={`/${lang}/geschichte/moderne`} component={GeschichteModerne} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-geschichte-zeitleiste`} path={`/${lang}/geschichte/zeitleiste`} component={GeschichteZeitleiste} />
          ))}
          
          {/* Multilingual Wirkung routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung`} path={`/${lang}/wirkung`} component={Wirkung} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung-angst`} path={`/${lang}/wirkung/angst`} component={WirkungAngst} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung-schlaf`} path={`/${lang}/wirkung/schlaf`} component={WirkungSchlaf} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung-muskel`} path={`/${lang}/wirkung/muskel`} component={WirkungMuskel} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung-stimmung`} path={`/${lang}/wirkung/stimmung`} component={WirkungStimmung} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-wirkung-kognition`} path={`/${lang}/wirkung/kognition`} component={WirkungKognition} />
          ))}
          
          {/* Multilingual Kultur routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur`} path={`/${lang}/kultur`} component={Kultur} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur-zeremonien`} path={`/${lang}/kultur/zeremonien`} component={KulturZeremonien} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur-nakamal`} path={`/${lang}/kultur/nakamal`} component={KulturNakamal} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur-moderne`} path={`/${lang}/kultur/moderne`} component={KulturModerne} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur-weltkarte`} path={`/${lang}/kultur/weltkarte`} component={KavaWeltkarte} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-kultur-kava-bars`} path={`/${lang}/kultur/kava-bars`} component={KavaBarFinder} />
          ))}
          
          {/* Multilingual Inhaltsstoffe routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-inhaltsstoffe`} path={`/${lang}/inhaltsstoffe`} component={Inhaltsstoffe} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-inhaltsstoffe-kavalactone`} path={`/${lang}/inhaltsstoffe/kavalactone`} component={InhaltsstoffeKavalactone} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-inhaltsstoffe-chemotypen`} path={`/${lang}/inhaltsstoffe/chemotypen`} component={InhaltsstoffeChemotypen} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-inhaltsstoffe-rechner`} path={`/${lang}/inhaltsstoffe/rechner`} component={ChemotypRechner} />
          ))}
          
          {/* Multilingual Sorten routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten`} path={`/${lang}/sorten`} component={Sorten} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten-noble-tudei`} path={`/${lang}/sorten/noble-tudei`} component={SortenNobleTudei} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten-vanuatu`} path={`/${lang}/sorten/vanuatu`} component={SortenVanuatu} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten-pazifik`} path={`/${lang}/sorten/pazifik`} component={SortenPazifik} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten-profile`} path={`/${lang}/sorten/profile`} component={SortenProfile} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-sorten-vergleich`} path={`/${lang}/sorten/vergleich`} component={SortenVergleich} />
          ))}
          
          {/* Multilingual Sicherheit routes - dynamic lang parameter */}
          <Route path="/:lang/sicherheit" component={Sicherheit} />
          <Route path="/:lang/sicherheit/leber" component={SicherheitLeber} />
          <Route path="/:lang/sicherheit/wechselwirkungen" component={SicherheitWechselwirkungen} />
          <Route path="/:lang/sicherheit/kontraindikationen" component={SicherheitKontraindikationen} />
          <Route path="/:lang/sicherheit/checker" component={SicherheitChecker} />
          
          {/* Multilingual Zubereitung routes */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-zubereitung`} path={`/${lang}/zubereitung`} component={Zubereitung} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-zubereitung-traditionell`} path={`/${lang}/zubereitung/traditionell`} component={ZubereitungTraditionell} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-zubereitung-blender`} path={`/${lang}/zubereitung/blender`} component={ZubereitungBlender} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-zubereitung-instant`} path={`/${lang}/zubereitung/instant`} component={ZubereitungInstant} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-zubereitung-rechner`} path={`/${lang}/zubereitung/rechner`} component={DosierungsRechner} />
          ))}
          
          {/* Multilingual Other pages */}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-studien`} path={`/${lang}/studien`} component={Studien} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-rechtsstatus`} path={`/${lang}/rechtsstatus`} component={Rechtsstatus} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-glossar`} path={`/${lang}/glossar`} component={Glossar} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-impressum`} path={`/${lang}/impressum`} component={Impressum} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-datenschutz`} path={`/${lang}/datenschutz`} component={Datenschutz} />
          ))}
          {['en', 'es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'].map(lang => (
            <Route key={`${lang}-faq`} path={`/${lang}/faq`} component={FAQ} />
          ))}
          
          {/* Fallback for other routes within language paths */}
          <Route path="/:lang/*" component={Home} />

          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
