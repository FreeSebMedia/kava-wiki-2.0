# Kava Wiki 2.0

A comprehensive multilingual knowledge portal about **Piper methysticum** (Kava) - the Pacific relaxation root.

## Features

- **22 Languages**: DE, EN, ES, FR, NL, PL, CS, PT, IT, RO, HU, BG, EL, TR, NO, DA, FI, SV, JA, ZH, RU, KA
- **~35 Wiki Pages** with full translations
- **Interactive Glossary** with 50+ terms across 6 categories
- **Kava Bar Finder** with world map and 68 locations
- **Study Database** with 100+ scientific sources
- **Dosage Calculator** for preparation
- **Legal Status Map** for EU countries
- **Dark/Light Theme** support
- **Cookie Consent** GDPR compliant

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, TailwindCSS, Radix UI
- **Backend**: Express, tRPC, Drizzle ORM
- **Database**: PostgreSQL
- **Package Manager**: pnpm

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/FreeSebMedia/kava-wiki-2.0.git
cd kava-wiki-2.0

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5000`

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
kava-wiki/
├── client/                 # Frontend (React + Vite)
│   ├── public/            # Static assets (images, favicons)
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── locales/       # i18n translations (22 languages)
│       ├── hooks/         # Custom React hooks
│       └── data/          # JSON data files
├── server/                # Backend (Express + tRPC)
│   └── _core/            # Core server functionality
├── drizzle/              # Database schema and migrations
└── scripts/              # Utility scripts (translation)
```

## Translation System

The wiki uses a custom translation system with JSON files:

- **Translation files**: `client/src/locales/{lang}/{namespace}.json`
- **Hook**: `useTranslations({ namespaces: ['page'], lang })`
- **Script**: `scripts/translate-universal.mjs` (requires OpenAI API key)

### Adding Translations

```bash
# Translate a namespace to specific languages
node scripts/translate-universal.mjs glossar.json --langs en,fr,es --batch 3
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key (for translations) | No |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Wiki Sections

1. **Botanik** (Botany) - Plant morphology, taxonomy, cultivation
2. **Geschichte** (History) - Historical origins and trade
3. **Inhaltsstoffe** (Ingredients) - Kavalactones, chemotypes
4. **Wirkung** (Effects) - Anxiety, sleep, cognition, mood
5. **Sorten** (Varieties) - Noble vs Tudei, Pacific regions
6. **Sicherheit** (Safety) - Liver, interactions, contraindications
7. **Zubereitung** (Preparation) - Traditional, blender, instant
8. **Kultur** (Culture) - Ceremonies, Nakamal, modern usage

## License

MIT

## Credits

Developed with scientific accuracy and cultural respect for the Pacific Kava tradition.
