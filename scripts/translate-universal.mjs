#!/usr/bin/env node
/**
 * Universal Translation Script for Kava Wiki
 * Translates any JSON file from German to all supported languages using OpenAI API
 * 
 * Usage: node translate-universal.mjs <filename> [--batch <size>] [--langs <codes>]
 * Example: node translate-universal.mjs wirkung.json
 * Example: node translate-universal.mjs wirkung.json --batch 5
 * Example: node translate-universal.mjs wirkung.json --langs es,fr,it
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.OPENAI_API_KEY;
const filename = process.argv[2];

const LANGUAGES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  nl: 'Dutch',
  pl: 'Polish',
  cs: 'Czech',
  pt: 'Portuguese',
  it: 'Italian',
  ro: 'Romanian',
  hu: 'Hungarian',
  bg: 'Bulgarian',
  el: 'Greek',
  tr: 'Turkish',
  no: 'Norwegian',
  da: 'Danish',
  fi: 'Finnish',
  sv: 'Swedish',
  ja: 'Japanese',
  zh: 'Chinese (Simplified)',
  ru: 'Russian',
  ka: 'Georgian'
};

function parseArgs() {
  const args = process.argv.slice(3);
  let batchSize = 5;
  let specificLangs = null;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--batch' && args[i + 1]) {
      batchSize = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--langs' && args[i + 1]) {
      specificLangs = args[i + 1].split(',');
      i++;
    }
  }
  
  return { batchSize, specificLangs };
}

if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

if (!filename) {
  console.error('Usage: node translate-universal.mjs <filename.json> [--batch <size>] [--langs <codes>]');
  console.error('Example: node translate-universal.mjs wirkung.json --batch 5');
  console.error('Available languages:', Object.keys(LANGUAGES).join(', '));
  process.exit(1);
}

const { batchSize, specificLangs } = parseArgs();
const localesDir = path.join(__dirname, '../client/src/locales');
const sourcePath = path.join(localesDir, 'de', filename);

if (!fs.existsSync(sourcePath)) {
  console.error(`ERROR: Source file not found: ${sourcePath}`);
  process.exit(1);
}

const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
const langsToTranslate = specificLangs 
  ? specificLangs.filter(l => LANGUAGES[l])
  : Object.keys(LANGUAGES);

console.log(`\n🌍 Universal Translator for Kava Wiki`);
console.log(`📄 File: ${filename}`);
console.log(`🔢 Batch size: ${batchSize}`);
console.log(`🌐 Languages: ${langsToTranslate.length} (${langsToTranslate.join(', ')})\n`);

async function callOpenAI(content, targetLang, targetLangName) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in botanical and scientific content about Kava (Piper methysticum). Translate the following JSON content from German to ${targetLangName}.

IMPORTANT RULES:
1. Preserve ALL JSON structure, keys, and formatting exactly
2. Only translate the string VALUES, never the keys
3. Keep scientific names (like "Piper methysticum", "Kavalactone") unchanged
4. Keep HTML tags (<strong>, <em>, etc.) intact
5. Keep proper nouns like place names (Vanuatu, Fiji, Tonga, Hawaii, etc.) unchanged
6. Keep product/strain names unchanged (e.g., Borogu, Melo Melo, Pouni Ono)
7. Translate cultural terms but keep original terms in parentheses where helpful
8. Maintain the same tone - informative, scientific, respectful
9. Return ONLY valid JSON, no explanations or markdown code blocks`
        },
        {
          role: 'user',
          content: JSON.stringify(content, null, 2)
        }
      ],
      temperature: 0.3,
      max_tokens: 16000
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  let result = data.choices[0].message.content.trim();
  
  if (result.startsWith('```json')) {
    result = result.slice(7);
  }
  if (result.startsWith('```')) {
    result = result.slice(3);
  }
  if (result.endsWith('```')) {
    result = result.slice(0, -3);
  }
  
  return JSON.parse(result.trim());
}

async function translateBatch(langs) {
  const results = [];
  
  for (const lang of langs) {
    const langName = LANGUAGES[lang];
    const targetPath = path.join(localesDir, lang, filename);
    
    try {
      console.log(`  📤 Translating to ${langName} (${lang})...`);
      const translated = await callOpenAI(sourceContent, lang, langName);
      
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2) + '\n');
      console.log(`  ✅ ${langName} saved to ${targetPath}`);
      results.push({ lang, success: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`  ❌ ${langName} failed: ${error.message}`);
      results.push({ lang, success: false, error: error.message });
    }
  }
  
  return results;
}

async function main() {
  const allResults = [];
  
  for (let i = 0; i < langsToTranslate.length; i += batchSize) {
    const batch = langsToTranslate.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(langsToTranslate.length / batchSize);
    
    console.log(`\n📦 Batch ${batchNum}/${totalBatches}: ${batch.join(', ')}`);
    
    const results = await translateBatch(batch);
    allResults.push(...results);
    
    if (i + batchSize < langsToTranslate.length) {
      console.log(`  ⏳ Waiting 2 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  
  const successful = allResults.filter(r => r.success);
  const failed = allResults.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${allResults.length}`);
  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.map(f => f.lang).join(', ')}`);
  }
  
  console.log('\n🎉 Translation complete!\n');
}

main().catch(console.error);
