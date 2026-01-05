#!/usr/bin/env node
/**
 * Script to translate botanik.json to a target language using OpenAI API
 * Usage: node translate-botanik.mjs <target_language_code>
 * Example: node translate-botanik.mjs es
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.OpenAIAPIKEy;
const targetLang = process.argv[2];

// Language names for better translation context
const languageNames = {
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

if (!apiKey) {
  console.error('ERROR: OpenAIAPIKEy environment variable is not set');
  process.exit(1);
}

if (!targetLang || !languageNames[targetLang]) {
  console.error('Usage: node translate-botanik.mjs <language_code>');
  console.error('Available languages:', Object.keys(languageNames).join(', '));
  process.exit(1);
}

const sourcePath = path.join(__dirname, '../client/src/locales/de/botanik.json');
const targetPath = path.join(__dirname, `../client/src/locales/${targetLang}/botanik.json`);

// Read source file
const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

console.log(`\n🌍 Translating botanik.json to ${languageNames[targetLang]} (${targetLang})...\n`);

// Function to call OpenAI API
function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in botanical and scientific content. Translate the following JSON content from German to ${languageNames[targetLang]}. 

IMPORTANT RULES:
1. Preserve ALL JSON structure, keys, and formatting exactly
2. Only translate the string VALUES, never the keys
3. Keep scientific names (like "Piper methysticum", "Piper wichmannii") in Latin/italics format
4. Keep HTML tags (<strong>, <em>, etc.) intact
5. Maintain technical botanical terminology accuracy
6. Keep proper nouns like place names (Vanuatu, Fiji, Tonga, etc.) unchanged
7. Return ONLY valid JSON, no explanations or markdown`
        },
        {
          role: 'user',
          content: JSON.stringify(sourceContent, null, 2)
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(responseData);
            const content = response.choices[0].message.content;
            resolve(content);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API error ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function translateAndSave() {
  try {
    console.log('📤 Sending to OpenAI API...');
    const translatedContent = await callOpenAI();
    
    // Clean up the response (remove potential markdown code blocks)
    let cleanedContent = translatedContent.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    }
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();
    
    // Validate JSON
    console.log('✅ Validating JSON...');
    const parsedContent = JSON.parse(cleanedContent);
    
    // Ensure target directory exists
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Write translated file
    fs.writeFileSync(targetPath, JSON.stringify(parsedContent, null, 2) + '\n');
    
    console.log(`\n✅ Successfully translated to ${languageNames[targetLang]}!`);
    console.log(`📁 Saved to: ${targetPath}\n`);
    
    // Show a sample of the translation
    console.log('--- Sample Translation ---');
    console.log('Title:', parsedContent.page?.title || 'N/A');
    console.log('Subtitle:', parsedContent.page?.subtitle || 'N/A');
    console.log('Category:', parsedContent.page?.category || 'N/A');
    
  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    process.exit(1);
  }
}

translateAndSave();
