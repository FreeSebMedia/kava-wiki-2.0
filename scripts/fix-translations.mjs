import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '../client/src/locales');

// Languages to process (excluding de and en which are correct)
const languages = ['es', 'fr', 'nl', 'pl', 'cs', 'pt', 'it', 'ro', 'hu', 'bg', 'el', 'tr', 'no', 'da', 'fi', 'sv', 'ja', 'zh', 'ru', 'ka'];

// Translation for "Inhalt" (Table of Contents) in all languages
const inhaltTranslations = {
  de: 'Inhalt',
  en: 'Contents',
  es: 'Contenido',
  fr: 'Sommaire',
  nl: 'Inhoud',
  pl: 'Spis treści',
  cs: 'Obsah',
  pt: 'Conteúdo',
  it: 'Indice',
  ro: 'Cuprins',
  hu: 'Tartalom',
  bg: 'Съдържание',
  el: 'Περιεχόμενα',
  tr: 'İçindekiler',
  no: 'Innhold',
  da: 'Indhold',
  fi: 'Sisältö',
  sv: 'Innehåll',
  ja: '目次',
  zh: '目录',
  ru: 'Содержание',
  ka: 'შინაარსი'
};

// Function to remove HTML tags from specific fields
function removeHtmlTags(text) {
  if (typeof text !== 'string') return text;
  // Remove <em>, </em>, <strong>, </strong>, and angle brackets around text
  return text
    .replace(/<em>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/<([^>]+)>/g, '$1'); // Remove angle brackets but keep content
}

// Function to process TOC entries (should not have HTML)
function processTocEntry(text) {
  return removeHtmlTags(text);
}

// Function to process subtitle (should not have HTML for display purposes)
function processSubtitle(text) {
  return removeHtmlTags(text);
}

// Process botanik-pflanze.json for each language
for (const lang of languages) {
  const filePath = path.join(localesDir, lang, 'botanik-pflanze.json');
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${lang} - file not found`);
    continue;
  }
  
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Fix subtitle
    if (content.page && content.page.subtitle) {
      content.page.subtitle = processSubtitle(content.page.subtitle);
    }
    
    // Fix TOC entries
    if (content.toc) {
      for (const key of Object.keys(content.toc)) {
        content.toc[key] = processTocEntry(content.toc[key]);
      }
    }
    
    // Fix wichmannii title
    if (content.wichmannii && content.wichmannii.title) {
      content.wichmannii.title = processTocEntry(content.wichmannii.title);
    }
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Fixed ${lang}/botanik-pflanze.json`);
  } catch (error) {
    console.error(`Error processing ${lang}:`, error.message);
  }
}

// Add Inhalt translations to common.json for all languages
const allLanguages = ['de', 'en', ...languages];

for (const lang of allLanguages) {
  const commonPath = path.join(localesDir, lang, 'common.json');
  
  let content = {};
  if (fs.existsSync(commonPath)) {
    try {
      content = JSON.parse(fs.readFileSync(commonPath, 'utf-8'));
    } catch (e) {
      console.log(`Creating new common.json for ${lang}`);
    }
  }
  
  // Add toc section with inhalt translation
  if (!content.toc) {
    content.toc = {};
  }
  content.toc.title = inhaltTranslations[lang] || 'Contents';
  
  // Ensure directory exists
  const langDir = path.join(localesDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  
  fs.writeFileSync(commonPath, JSON.stringify(content, null, 2));
  console.log(`Updated ${lang}/common.json with Inhalt translation`);
}

console.log('\\nAll translations fixed!');
