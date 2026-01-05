import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OpenAIAPIKEy;

if (!OPENAI_API_KEY) {
  console.error('Error: OpenAIAPIKEy environment variable is not set');
  process.exit(1);
}

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

async function translateWithOpenAI(text, targetLang) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in botanical and scientific content about Kava (Piper methysticum). Translate the following JSON content from German to ${languageNames[targetLang]}. 

IMPORTANT RULES:
1. Maintain the exact JSON structure - do not change keys, only translate values
2. Keep scientific names in Latin (e.g., "Piper methysticum", "Piper wichmannii") unchanged
3. Keep HTML tags like <em>, <strong> intact but translate the text within them
4. Keep numbers, measurements, and units as-is
5. Translate naturally for the target language, not word-for-word
6. For table data in arrays, translate all string values but keep the structure
7. Return ONLY valid JSON, no explanations or markdown`
        },
        {
          role: 'user',
          content: JSON.stringify(text, null, 2)
        }
      ],
      temperature: 0.3,
      max_tokens: 16000
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Clean up the response - remove markdown code blocks if present
  let cleanContent = content.trim();
  if (cleanContent.startsWith('```json')) {
    cleanContent = cleanContent.slice(7);
  } else if (cleanContent.startsWith('```')) {
    cleanContent = cleanContent.slice(3);
  }
  if (cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(0, -3);
  }
  
  return JSON.parse(cleanContent.trim());
}

async function translateFile(targetLang) {
  const localesDir = path.join(__dirname, '..', 'client', 'src', 'locales');
  const sourceFile = path.join(localesDir, 'de', 'botanik-anbau.json');
  const targetDir = path.join(localesDir, targetLang);
  const targetFile = path.join(targetDir, 'botanik-anbau.json');

  // Check if target file already exists
  if (fs.existsSync(targetFile)) {
    console.log(`[${targetLang}] Translation already exists, skipping...`);
    return;
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`[${targetLang}] Starting translation to ${languageNames[targetLang]}...`);

  // Read source file
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  try {
    // Translate content
    const translatedContent = await translateWithOpenAI(sourceContent, targetLang);
    
    // Write translated file
    fs.writeFileSync(targetFile, JSON.stringify(translatedContent, null, 2), 'utf-8');
    console.log(`[${targetLang}] ✓ Translation completed and saved`);
  } catch (error) {
    console.error(`[${targetLang}] ✗ Translation failed:`, error.message);
    throw error;
  }
}

// Get target language from command line argument
const targetLang = process.argv[2];

if (!targetLang) {
  console.error('Usage: node translate-botanik-anbau.mjs <language_code>');
  console.error('Available languages:', Object.keys(languageNames).join(', '));
  process.exit(1);
}

if (!languageNames[targetLang]) {
  console.error(`Unknown language code: ${targetLang}`);
  console.error('Available languages:', Object.keys(languageNames).join(', '));
  process.exit(1);
}

translateFile(targetLang).catch(error => {
  console.error('Translation failed:', error);
  process.exit(1);
});
