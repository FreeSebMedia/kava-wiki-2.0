## Botanik Page Expansion
- [x] Analyze source materials for detailed botanical information
- [x] Create dropdown navigation structure for Botanik menu
- [x] Create subpage: Die Pflanze (Taxonomie, Piper methysticum vs. wichmannii)
- [x] Create subpage: Morphologie (Rhizom, Wurzeln, Stängel, Blätter)
- [x] Create subpage: Anbau & Ökologie (Wachstumsbedingungen, Vermehrung, Erntezyklen)
- [x] Expand main Botanik page with overview content
- [x] Add breadcrumb navigation support to WikiPageLayout
- [x] Change navigation breakpoint from xl to lg for smaller screens


## Geschichte Page Expansion
- [x] Analyze source materials for historical information
- [x] Update dropdown navigation structure for Geschichte menu
- [x] Create subpage: Ursprünge (Domestikation, Vanuatu als Ursprungsregion)
- [x] Create subpage: Verbreitung im Pazifik (Austronesische Migration, Inselkulturen)
- [x] Create subpage: Moderne Geschichte (Kolonialzeit, Verbot 2002, Rehabilitation)
- [x] Update main Geschichte page as overview with links to subpages


## Botanik Navigation Fix
- [x] Add "Weiter im Kapitel Botanik" navigation to BotanikPflanze.tsx
- [x] Add "Weiter im Kapitel Botanik" navigation to BotanikMorphologie.tsx
- [x] Add "Weiter im Kapitel Botanik" navigation to BotanikAnbau.tsx

## Inhaltsstoffe Page Expansion
- [x] Analyze source materials for kavalactone information
- [x] Update dropdown navigation structure for Inhaltsstoffe menu
- [x] Create subpage: Kavalactone (Die 6 Haupt-Kavalactone with detailed profiles)
- [x] Create subpage: Chemotypen (Erklärung des Chemotyp-Systems, Noble vs. Tudei)
- [x] Update main Inhaltsstoffe page as overview with links to subpages


## Geschichte Navigation Style Fix
- [x] Update GeschichteUrspruenge.tsx with card-style chapter navigation
- [x] Update GeschichteVerbreitung.tsx with card-style chapter navigation
- [x] Update GeschichteModerne.tsx with card-style chapter navigation

## Chemotyp Calculator
- [x] Create ChemotypRechner.tsx page with interactive calculator
- [x] Add route for /de/inhaltsstoffe/rechner
- [x] Add navigation link to Inhaltsstoffe dropdown


## Wirkung Page Expansion
- [x] Analyze source materials for detailed effect information
- [x] Update dropdown navigation structure for Wirkung menu
- [x] Create subpage: Angstlösung (Anxiolytic effects, mechanisms, studies)
- [x] Create subpage: Schlaf & Entspannung (Sleep, sedation, relaxation)
- [x] Create subpage: Muskelentspannung (Muscle relaxation, DHK effects)
- [x] Create subpage: Stimmung & Soziales (Mood enhancement, social use)
- [x] Create subpage: Kognitive Effekte (Focus, clarity, reverse tolerance)
- [x] Add connections to chemotypes and varieties where applicable
- [x] Update main Wirkung page as overview with links to subpages


## Add Missing Studies from Wirkung Pages
- [x] Add Cochrane-Review (Pittler & Ernst, 2003) to studies.json
- [x] Add Sarris et al. (2013) anxiety study to studies.json
- [x] Add Lehrl (2004) Kava vs. Oxazepam study to studies.json
- [x] Add Wheatley (2001) stress study to studies.json
- [x] Add Emser & Bartylla (1991) sleep study to studies.json
- [x] Add Lehmann et al. (1996) anxiety study to studies.json
- [x] Add Cairney et al. (2003) cognitive effects study to studies.json
- [x] Add Thompson et al. (2004) cognitive effects study to studies.json
- [x] Singh & Singh (2002) already exists in database


## Bug Fixes
- [x] Fix Muskelentspannung link in Wirkung chapter navigation (wrong URL)


## Sorten Page Expansion
- [x] Analyze "Kava – Wurzel der Ruhe" for variety information
- [x] Analyze "Kava: The Pacific Elixir" for variety information
- [x] Research kava shops for additional variety details
- [x] Create Sorten overview page with Noble vs. Tudei explanation
- [x] Create Noble vs. Tudei subpage with detailed comparison
- [x] Create Vanuatu-Sorten subpage (Borogu, Melo Melo, Kelai, etc.)
- [x] Create Pazifik-Sorten subpage (Fiji, Tonga, Hawaii, Samoa)
- [x] Create Sortenprofile subpage with detailed variety cards
- [x] Add internal links to Wirkung, Inhaltsstoffe, and Chemotyp-Rechner
- [x] Update navigation with Sorten dropdown menu
- [ ] Add new sources to studies.json


## Content Adjustments
- [x] Remove references to "seriöse Händler", "Qualitätshändler", "Labortest", "Laboranalyse"
- [x] Adjust text to emphasize chemotype information as sufficient trust indicator

- [x] Fix Borogu classification in SortenProfile.tsx to show Heavy/Balanced (consistent with Vanuatu page)
- [x] Add Borogu to Heady Sorten section with Heavy/Balanced badge
- [x] Update Borogu in Balanced section to show Heavy/Balanced badge


## Sicherheit Section Expansion
- [x] Analyze source materials for safety information (EMA reports, clinical studies, books)
- [x] Add new safety-related studies to studies.json (15 new studies: WHO, FAO/WHO, EMA reports, Teschke reviews, CYP450 studies)
- [x] Create dropdown navigation structure for Sicherheit menu
- [x] Create subpage: Lebersicherheit (liver safety myths vs. reality, 2002 ban context)
- [x] Create subpage: Wechselwirkungen (drug interactions, CYP450 inhibition)
- [x] Create subpage: Kontraindikationen (contraindications, pregnancy, liver disease)
- [x] Update main Sicherheit page as overview with links to subpages
- [x] Add internal links to studies and other relevant pages


## Fix Recommendations Display
- [x] Remove "Empfehlung" tag from WHO Assessment of Hepatotoxicity (2007)
- [x] Remove "Empfehlung" tag from FAO/WHO Kava Safety Report (2016)
- [x] Remove "Empfehlung" tag from EMA Assessment Report (2017)


## Sicherheit Pages Fixes
- [x] Remove duplicate black bullet points from Sicherheit.tsx (keep only yellow)
- [x] Remove duplicate black bullet points from SicherheitLeber.tsx
- [x] Remove duplicate black bullet points from SicherheitWechselwirkungen.tsx
- [x] Remove duplicate black bullet points from SicherheitKontraindikationen.tsx
- [x] Add internal link from Chronologie to Rechtsstatus page
- [x] Verify factual consistency between Lebersicherheit and Rechtsstatus (added 2019 date)
- [x] Check if WHO 2007, FAO/WHO 2016, EMA 2017 studies are in database (all present)
- [x] Check if Teschke 2010, Teschke & Lebot 2011 studies are in database (all present)
- [x] Check Sarris 2011 comprehensive review in database (already present)


## Fix Duplicate Bullet Points (Round 2)
- [x] Add global CSS to remove default list-style from custom bullet lists
- [x] Fix Sicherheit.tsx bullet points
- [x] Fix SicherheitLeber.tsx bullet points (including Extrakte comparison)
- [x] Fix SicherheitWechselwirkungen.tsx bullet points
- [x] Fix SicherheitKontraindikationen.tsx bullet points
- [x] Search and fix any other pages with similar issues


## Fix Badge Display Issue
- [x] Fix "SEHR HOCH" badge red background not fully covering text


## Interactive Drug Interaction Checker
- [x] Create medication database with interaction data (drugs.json)
- [x] Build WechselwirkungsChecker.tsx component with search/autocomplete
- [x] Add risk assessment display with color-coded results
- [x] Add detailed interaction explanations and recommendations
- [x] Add route and navigation integration
- [x] Test the checker with various medications (Diazepam test passed)


## Fix Duplicate Navigation
- [x] Remove duplicate navigation from WechselwirkungsChecker.tsx


## Add THC/CBD to Wechselwirkungs-Checker
- [x] Add THC (Tetrahydrocannabinol, Cannabis sativa) to drugs.json
- [x] Add CBD (Cannabidiol, Cannabis sativa) to drugs.json


## Interactive Strain Comparison Tool
- [x] Create comprehensive strain data with comparison fields (strains.json)
- [x] Build SortenVergleich.tsx component with dual-select dropdowns
- [x] Add side-by-side comparison display with all fields
- [x] Include chemotypes, effects, origin, dosage, applications, usage times
- [x] Add visual indicators for differences
- [x] Add route and navigation integration
- [x] Test the comparison tool (Pouni Ono vs Melo Melo - all sections working)


## Sortenvergleich UI Updates
- [x] Change category colors: Heady=yellow, Balanced=blue, Heavy=purple
- [x] Add strain names above Wirkprofil-Vergleich section
- [x] Add strain names above Grundlegende Informationen section
- [x] Add strain names above Empfohlene Dosierung section


## Consistent Strain Name Display
- [x] Update Empfohlene Nutzungszeiten section to use colored badges instead of plain text
- [x] Update Anwendungsgebiete section to use colored badges
- [x] Update Kavalacton-Profil section to use colored badges
- [x] Update Hinweise section to use colored badges
- [x] Ensure all sections use the same badge styling as Empfohlene Dosierung


## Add Potenz Label to Stars
- [x] Add "Potenz/Stärke" label next to star rating in SortenVergleich cards


## Add Legend to Wirkprofil-Vergleich
- [x] Add small legend/hint explaining the +X difference badges


## Add Profile Links to Strain Cards
- [x] Add button to strain1 card linking to its detailed profile page
- [x] Add button to strain2 card linking to its detailed profile page


## Fix Borogu Classification Error
- [x] Change Borogu from "Heavy / Balanced" to "Heady / Balanced" in strains.json
- [x] Change Borogu from "Heavy / Balanced" to "Heady / Balanced" in SortenProfile.tsx
- [x] Change Borogu from "Heavy / Balanced" to "Heady / Balanced" in SortenVanuatu.tsx
- [x] Verify all other strain-related files for Borogu classification


## Effect Filter for Sortenprofile
- [x] Add effect ratings (Euphorie, Entspannung, Schläfrig) to strain data
- [x] Create filter UI with sliders
- [x] Implement filter logic to show/hide strains based on selected effects
- [x] Test filter functionality


## Zubereitung Section Expansion
- [x] Analyze current Zubereitung page structure
- [x] Create ZubereitungTraditionell.tsx - Traditional kneading method with step-by-step guide
- [x] Create ZubereitungBlender.tsx - Blender preparation method with step-by-step guide
- [x] Create ZubereitungInstant.tsx - Instant kava preparation guide
- [x] Build interactive DosierungsRechner component with strain selection
- [x] Update navigation with Zubereitung dropdown menu
- [x] Add routes for all new subpages
- [x] Test all preparation guides and calculator


## Glossar (Glossary) Page
- [x] Create comprehensive Glossar.tsx page with 22 key terms
- [x] Organize terms into 6 categories (Chemie, Wirkung, Sorten, Zubereitung, Kultur, Sicherheit)
- [x] Add detailed explanations with bold highlights for each term
- [x] Add related terms with internal anchor links
- [x] Add related page links to relevant wiki sections
- [x] Add quick reference table for Chemotyp numbers
- [x] Add route /de/glossar to App.tsx
- [x] Add Glossar to navigation in Layout.tsx


## Favorites System for Strains
- [x] Create useFavorites.ts hook with LocalStorage persistence
- [x] Create FavoriteButton.tsx component with toggle functionality
- [x] Create FavoritesPanel.tsx component to display saved favorites
- [x] Add strain IDs to SortenProfile.tsx data
- [x] Integrate FavoriteButton into strain cards
- [x] Add FavoritesPanel to SortenProfile page
- [x] Add "Meine Favoriten" to table of contents
- [x] Test favorites functionality (add/remove strains)


## Zubereitung Section Verification
- [x] Verify ZubereitungTraditionell.tsx - Traditional kneading method complete
- [x] Verify ZubereitungBlender.tsx - Blender preparation method complete
- [x] Verify ZubereitungInstant.tsx - Instant kava preparation complete
- [x] Verify DosierungsRechner.tsx - Interactive calculator complete
- [x] Test all preparation guides and calculator


## Glossar Expansion & Search
- [x] Expand Glossar from 22 to 50 terms
- [x] Add more terms to Chemie & Inhaltsstoffe category (12 terms)
- [x] Add more terms to Wirkung & Effekte category (10 terms)
- [x] Add more terms to Sorten & Varietäten category (10 terms)
- [x] Add more terms to Zubereitung category (8 terms)
- [x] Add more terms to Kultur & Tradition category (5 terms)
- [x] Add more terms to Sicherheit category (5 terms)
- [x] Implement glossary-specific search functionality
- [x] Add search input with real-time filtering
- [x] Highlight matching terms in search results
- [x] Test search functionality (38 tests passing)


## Glossar-Tooltip System (Multilingual)
- [x] Create glossary data export file with all terms (DE/EN) - glossaryTerms.ts with 50 terms
- [x] Create GlossaryTooltip component with styled popup
- [x] Create GlossaryHighlighter component for text processing
- [x] Create GlossaryText component for easy page integration
- [x] Integrate tooltips into wiki pages (Botanik, Wirkung, Inhaltsstoffe, Sicherheit, Zubereitung)
- [x] Style tooltips with green border and dotted underline (matching reference design)
- [x] Add "Mehr Infos" link to full glossary entry with navigation
- [x] Add multilingual tooltip labels (22 languages supported)
- [x] Test tooltip functionality across wiki pages (63 tests passing)


## Bug Fix: HTML Nesting Errors in GlossaryHighlighter
- [x] Fix GlossaryTooltip to use React Portal for proper DOM nesting
- [x] Ensure tooltip popup doesn't create invalid HTML nesting
- [x] Test fix on Botanik page - no console errors


## Bug Fix: Glossar Anchor Navigation
- [x] Fix "Mehr Infos" link to navigate to specific term instead of page top
- [x] Added useEffect hook in Glossar.tsx to handle hash navigation on page load
- [x] Verify anchor IDs match between tooltip links and Glossar page
- [x] Test navigation from tooltip to glossary term - works correctly


## Extend Glossary Tooltips to All Pages
- [x] Add GlossaryText to Geschichte.tsx
- [x] Add GlossaryText to Kultur.tsx
- [x] Add GlossaryText to Rechtsstatus.tsx
- [x] Add GlossaryText to Sorten.tsx
- [x] Add GlossaryText to Studien.tsx
- [x] Add GlossaryText to all subpages in /botanik/ (BotanikAnbau, BotanikMorphologie, BotanikPflanze)
- [x] Add GlossaryText to all subpages in /geschichte/ (GeschichteModerne, GeschichteUrspruenge, GeschichteVerbreitung)
- [x] Add GlossaryText to all subpages in /inhaltsstoffe/ (InhaltsstoffeChemotypen, InhaltsstoffeKavalactone)
- [x] Add GlossaryText to all subpages in /wirkung/ (WirkungAngst, WirkungKognition, WirkungMuskel, WirkungSchlaf, WirkungStimmung)
- [x] Add GlossaryText to all subpages in /sicherheit/ (SicherheitKontraindikationen, SicherheitLeber, SicherheitWechselwirkungen)
- [x] Add GlossaryText to all subpages in /sorten/ (SortenNobleTudei, SortenPazifik, SortenVanuatu)
- [x] Add GlossaryText to all subpages in /zubereitung/ (ZubereitungBlender, ZubereitungInstant, ZubereitungTraditionell)
- [x] Fix TypeScript errors in Studien.tsx (added missing React imports)
- [x] All 63 tests passing


## Bug Fix: Glossary Tooltips Not Appearing on Most Pages
- [x] Analyze which pages have GlossaryText wrapping text vs just importing
- [x] Fix pages that only import but don't use GlossaryText wrapper (fixed 20+ pages)
- [x] Ensure all text sections are wrapped with GlossaryText component
- [x] Test tooltips across multiple pages (Geschichte/Moderne, Zubereitung/Traditionell verified)


## Bug Fix: Missing Tooltips on Remaining Pages
- [x] Fix GeschichteUrspruenge.tsx - Die Ursprünge von Kava (added GlossaryText wrappers)
- [x] Fix GeschichteVerbreitung.tsx - Die Verbreitung im Pazifik (added GlossaryText wrappers)
- [x] Fix Wirkung.tsx - Wirkung & Effekte (added GlossaryText wrappers)
- [x] Fix WirkungSchlaf.tsx - Schlaf & Entspannung (added GlossaryText wrappers)
- [x] Fix Sicherheit.tsx - Sicherheit & Gesundheit (added GlossaryText wrappers)
- [x] Fix SicherheitLeber.tsx - Lebersicherheit & Hepatotoxizität (added GlossaryText wrappers)
- [x] Fix SicherheitKontraindikationen.tsx - Kontraindikationen (added GlossaryText wrappers)
- [x] Fix SortenVanuatu.tsx - Sorten aus Vanuatu (added GlossaryText wrappers)
- [x] Fix SortenPazifik.tsx - Sorten aus Fiji, Tonga & Hawaii (added GlossaryText wrappers)
- [x] Test tooltips on all fixed pages (GeschichteUrspruenge, Sicherheit verified)


## Kultur Section Expansion
- [x] Analyze source materials for cultural information (books, PDFs, research papers)
- [x] Plan Kultur section structure with subpages
- [x] Create expanded Kultur overview page with comprehensive content
- [x] Create subpage: Zeremonien & Rituale (traditional ceremonies, protocols)
- [x] Create subpage: Nakamal & Kava-Bars (traditional and modern drinking places)
- [x] Create subpage: Moderne Kava-Kultur (global spread, Western adoption)
- [x] Add glossary tooltips to all Kultur pages
- [x] Add internal links to Geschichte, Sorten, Zubereitung pages
- [x] Update navigation with Kultur dropdown menu
- [x] Add routes for all new subpages
- [x] Prepare multilingual structure (i18n keys)
- [x] Test all Kultur pages


## Interactive Kava World Map
- [x] Plan map component structure and data model
- [x] Create Kava regions data with coordinates, traditions, ceremonies, varieties
- [x] Build interactive map component using Google Maps integration
- [x] Add custom markers for each Kava region
- [x] Create information popups with region details
- [x] Style map to match wiki design (dark/earth tones)
- [x] Add legend explaining marker types
- [x] Create dedicated KavaWeltkarte.tsx page
- [x] Add route and navigation integration
- [x] Test map functionality and responsiveness


## Historical Kava Timeline Feature
- [x] Research timeline data from available sources (books, PDFs)
- [x] Create timeline data structure with historical events
- [x] Build interactive timeline component with vertical/horizontal layout
- [x] Add era sections (Prehistory, Colonial, Modern, Contemporary)
- [x] Style timeline with animations and visual effects
- [x] Add event detail popups with images and links
- [x] Create dedicated Zeitleiste page
- [x] Integrate into Geschichte section and navigation
- [x] Add internal links to related pages
- [x] Test timeline functionality and responsiveness


## Timeline Sidebar Fix
- [x] Make sidebar independently scrollable from main timeline content


## Kava Bar Finder Feature
- [x] Research kava bars worldwide (USA, Australia, New Zealand, Europe)
- [x] Create kava bar data structure with addresses, ratings, hours
- [x] Build KavaBarFinder page with search functionality
- [x] Add filter options (country, state, rating, features)
- [x] Integrate Google Maps for location display
- [x] Add bar detail cards with contact info and reviews
- [x] Create route and navigation integration
- [x] Test search, filters, and map functionality


## Google Maps API Fix
- [x] Fix duplicate Google Maps API loading error on Kava Bar Finder page


## UI Fixes
- [x] Remove coconut emoji from Kava-Bar Finder title


## Kava Bar Database Expansion
- [x] Scrape kava bars from kalmwithkava.com
- [x] Scrape kava bars from deviantkava.com
- [x] Scrape kava bars from kavaculture.com
- [x] Scrape kava bars from kava.com
- [x] Scrape kava bars from getkavafied.com
- [x] Consolidate and deduplicate all kava bar data
- [x] Update kavaBars.ts with expanded database
- [x] Test Kava Bar Finder with new data


## Legal Pages (EU Compliance)
- [x] Create Impressum.tsx page with required legal information
- [x] Create Datenschutz.tsx page (GDPR-compliant privacy policy)
- [x] Add footer component with legal links (already present)
- [x] Add routes for /impressum and /datenschutz
- [x] Test all legal pages


## Company Data Update
- [x] Update Impressum with GFY BABILON LLP company data
- [x] Update Datenschutz with GFY BABILON LLP company data


## Logo and Favicon Update
- [x] Generate Kava Wiki logo design
- [x] Create favicon in multiple sizes (16x16, 32x32, 180x180, 192x192, 512x512)
- [x] Update website favicon and meta tags
- [x] Add web manifest for PWA support
- [x] Add Open Graph meta tags for social sharing

- [x] Replace leaf emoji in header with Kava leaf logo image


## Social Media Preview
- [x] Generate Open Graph preview image (1200x630)
- [x] Update meta tags for Facebook, Twitter, WhatsApp
- [x] Create mockup showing preview appearance

- [x] Redesign OG image using homepage hero background and styling

- [ ] Validate social media preview with Facebook Debugger


## Botanik Page Layout Fix
- [x] Change article cards from horizontal to vertical layout
- [x] Fix bullet point alignment


## FAQ Page Creation
- [x] Analyze CSV file with keywords and questions (32 questions extracted)
- [x] Research additional FAQ topics from existing wiki content
- [x] Create FAQ data structure with multilingual support (de/en)
- [x] Build FAQ page component with search functionality
- [x] Add JSON-LD structured data for SEO and LLMs
- [x] Integrate FAQ into navigation and routes
- [x] Test FAQ page and search functionality


## GDPR Cookie Consent Banner
- [x] Create CookieConsent component with three equal options
- [x] Add "Alle akzeptieren" button (green/prominent but not manipulative)
- [x] Add "Nur notwendige" button (equally visible)
- [x] Add "Einstellungen" button for granular control
- [x] Create CookieSettings modal with toggle switches
- [x] Implement consent storage in LocalStorage
- [x] Integrate with Google Maps (only load after consent)
- [x] Add consent management to Datenschutz page
- [x] Test banner functionality


## Custom 404 Error Page
- [x] Create NotFound.tsx page component with Kava branding
- [x] Add decorative Kava leaf illustration or logo
- [x] Add helpful navigation links to main sections
- [x] Add search suggestion or FAQ link
- [x] Add 404 catch-all route to App.tsx (already existed)
- [x] Test 404 page with invalid URLs


## Language Switcher Enhancement
- [x] Add flag icons/emojis for each supported language
- [x] Display current language flag next to globe icon in navigation
- [x] Implement automatic browser language detection on first visit
- [x] Store language preference in LocalStorage
- [x] Redirect to appropriate language route based on detection
- [x] Test with different browser language settings


## Navigation Restructuring
- [x] Move Studien to "Mehr" dropdown
- [x] Move Rechtsstatus to "Mehr" dropdown
- [x] Move Glossar to "Mehr" dropdown
- [x] Add FAQ as standalone link before "Mehr"
- [x] Reduce navigation item spacing by 10%
- [x] Test navigation on desktop and mobile


## i18n Implementation - Botanik Page
- [x] Create locales folder structure
- [x] Create German (de) botanik.json with all texts
- [x] Create English (en) botanik.json translation
- [x] Create common.json for shared UI strings
- [x] Implement useTranslation hook with JSON loading
- [x] Create LanguageContext provider
- [x] Refactor Botanik.tsx to use t() function
- [x] Extract lang parameter from URL in Botanik page
- [x] Update GlossaryText to use dynamic lang
- [x] Add routes for /en/botanik
- [x] Test German version
- [x] Test English version
- [x] Create placeholder JSON files for remaining 20 languages


## Botanik Page Translations (OpenAI API)
- [x] Create translation script using OpenAI API
- [x] Translate to Spanish (es)
- [x] Translate to French (fr)
- [x] Translate to Dutch (nl)
- [x] Translate to Polish (pl)
- [x] Translate to Czech (cs)
- [x] Translate to Portuguese (pt)
- [x] Translate to Italian (it)
- [x] Translate to Romanian (ro)
- [x] Translate to Hungarian (hu)
- [x] Translate to Bulgarian (bg)
- [x] Translate to Greek (el)
- [x] Translate to Turkish (tr)
- [x] Translate to Norwegian (no)
- [x] Translate to Danish (da)
- [x] Translate to Finnish (fi)
- [x] Translate to Swedish (sv)
- [x] Translate to Japanese (ja)
- [x] Translate to Chinese (zh)
- [x] Translate to Russian (ru)
- [x] Translate to Georgian (ka)
- [x] Test all translations
- [x] Add routes for all languages


## i18n Implementation - BotanikPflanze Page (Die Pflanze)
- [x] Extract German text from BotanikPflanze.tsx
- [x] Create botanik-pflanze.json for German (de)
- [x] Create botanik-pflanze.json for English (en)
- [x] Translate to all 22 languages using OpenAI API
- [x] Refactor BotanikPflanze.tsx to use t() function
- [x] Update GlossaryText to use dynamic lang
- [x] Add routes for all languages
- [x] Test German version
- [x] Test English version
- [x] Test other language versions (Japanese verified)


## Bug Fix: Translation HTML Tags & Inhalt Label
- [x] Fix HTML tags (<em>, <strong>) in French botanik-pflanze.json
- [x] Fix HTML tags in Polish botanik-pflanze.json
- [x] Fix angle brackets in Japanese botanik-pflanze.json
- [x] Fix HTML tags in Georgian botanik-pflanze.json
- [x] Fix HTML tags in Hungarian botanik-pflanze.json
- [x] Check and fix all other language files for HTML tag issues
- [x] Add "Inhalt" translation to common.json for all 22 languages
- [x] Update WikiPageLayout to use translated TOC title
- [x] Test fixes across multiple languages (FR: Sommaire, JA: 目次 verified)


## Fix Botanik Main Page TOC Title
- [x] Update Botanik.tsx to pass tocTitle prop with translated value
- [x] Test TOC title translation on Botanik main page (FR: Sommaire verified)


## i18n Implementation - BotanikMorphologie Page
- [x] Extract German text from BotanikMorphologie.tsx
- [x] Create botanik-morphologie.json for German (de)
- [x] Create botanik-morphologie.json for English (en)
- [x] Refactor BotanikMorphologie.tsx to use t() function
- [x] Use useLanguage context for language detection
- [x] Update GlossaryText to use dynamic lang
- [x] Add routes for all languages
- [x] Test German version
- [x] Test English version
- [x] Report status to user and wait for approval
- [x] Translate to all 22 languages using OpenAI API (DE, EN, JA verified)


## i18n Implementation - BotanikAnbau Page (Anbau & Ökologie)
- [x] Extract German text from BotanikAnbau.tsx
- [x] Create botanik-anbau.json for German (de)
- [x] Create botanik-anbau.json for English (en)
- [x] Refactor BotanikAnbau.tsx to use t() function
- [x] Use useLanguage context for language detection
- [x] Update GlossaryText to use dynamic lang
- [x] Add routes for all languages
- [x] Test German version
- [x] Test English version
- [x] Report status to user and wait for approval
- [x] Translate to all 22 languages using OpenAI API (Greek uses English fallback due to API issues)


## Breadcrumb Consistency Fix
- [x] Audit all pages with breadcrumbs
- [x] Update all breadcrumbs to include Home as first item
- [x] Test breadcrumbs on multiple pages


## i18n Implementation - Kultur Page (Home → Kultur)
- [ ] Extract German text from Kultur.tsx
- [x] Create kultur.json for German (de)
- [x] Create kultur.json for English (en)
- [x] Refactor Kultur.tsx to use t() function
- [ ] Use useLanguage context for language detection
- [ ] Update GlossaryText to use dynamic lang
- [x] Add routes for all languages
- [x] Test German version
- [x] Test English version
- [ ] Report status to user and wait for approval
- [x] Translate to all 22 languages using OpenAI API


## Geschichte Page i18n Fix
- [x] Check if geschichte.json translation files exist
- [x] Add multilingual routes for Geschichte in App.tsx
- [x] Refactor Geschichte.tsx to use i18n hooks
- [x] Test Geschichte page in multiple languages



## i18n Implementation - GeschichteUrspruenge Page
- [x] Create DE JSON translation file for GeschichteUrspruenge
- [x] Create EN JSON translation file for GeschichteUrspruenge
- [x] Refactor GeschichteUrspruenge.tsx to use i18n hooks
- [x] Test DE and EN versions
- [x] Translate to remaining 20 languages using OpenAI API



## i18n Implementation - GeschichteVerbreitung Page (Home -> Geschichte -> Verbreitung)
- [x] Create DE JSON file for GeschichteVerbreitung
- [x] Create EN JSON file for GeschichteVerbreitung
- [x] Refactor GeschichteVerbreitung.tsx to use i18n hooks
- [x] Translate to 20 remaining languages using OpenAI API
- [x] Test and verify all languages work correctly


## i18n Implementation - Geschichte Moderne Page
- [x] Extract German text and create DE JSON file
- [x] Create English translation manually
- [x] Refactor GeschichteModerne.tsx to use i18n hooks
- [x] Test both languages
- [x] Translate to remaining 20 languages using OpenAI API

- [x] Batch translate Geschichte Moderne to all 20 remaining languages using OpenAI API

## Geschichte Main Page (Zeitleiste) i18n
- [x] Analyze current Geschichte.tsx page structure
- [x] Create German JSON translation file (de/geschichte.json)
- [x] Create English JSON translation file (en/geschichte.json)
- [x] Refactor Geschichte.tsx to use useTranslations hook
- [x] Create placeholder JSON files for all 20 remaining languages
- [x] Test refactored page in browser
- [x] Report status and await user approval for batch translation
- [ ] Batch translate to all 20 languages using OpenAI API

## Zeitleiste (Interactive Timeline) i18n
- [ ] Analyze current GeschichteZeitleiste.tsx page structure
- [x] Create German JSON translation file (de/geschichte-zeitleiste.json)
- [x] Create English JSON translation file (en/geschichte-zeitleiste.json)
- [ ] Refactor GeschichteZeitleiste.tsx to use useTranslations hook
- [ ] Create placeholder JSON files for all 20 remaining languages
- [ ] Test refactored page in browser
- [ ] Report status and await user approval for batch translation
- [ ] Batch translate to all 20 languages using OpenAI API
- [x] Fix remaining German sidebar texts in Zeitleiste (Übersicht, Ereignisse, Epochen, Meilensteine, Verwandte Seiten)
