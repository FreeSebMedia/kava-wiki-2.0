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

const LANGUAGE_NAMES = {
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

async function translateText(text, targetLang) {
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
          content: `You are a professional translator specializing in botanical and scientific content about Kava (Piper methysticum). Translate the following JSON content from German to ${LANGUAGE_NAMES[targetLang]}. 

CRITICAL RULES:
1. Preserve ALL JSON structure exactly - do not add or remove any keys
2. Only translate the string VALUES, never the keys
3. Keep HTML tags like <em>, <strong> exactly as they are - DO NOT translate tag names
4. Keep scientific names in Latin (e.g., "Piper methysticum", "P. methysticum") unchanged
5. Keep technical terms like "Kavalacton", "Kavain", "DHM" unchanged
6. Keep measurement units and numbers unchanged
7. Arrays must remain arrays with the same number of elements
8. Return ONLY valid JSON, no explanations or markdown

Example of correct HTML handling:
Input: "Die <strong>Seitenwurzeln</strong> sind wichtig"
Output: "The <strong>lateral roots</strong> are important"

NOT: "The <fort>lateral roots</fort> are important"`
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

async function translateToLanguage(targetLang) {
  const localesDir = path.join(__dirname, '..', 'client', 'src', 'locales');
  const sourceFile = path.join(localesDir, 'de', 'botanik-morphologie.json');
  const targetDir = path.join(localesDir, targetLang);
  const targetFile = path.join(targetDir, 'botanik-morphologie.json');

  // Read source file
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  console.log(`Translating botanik-morphologie.json to ${LANGUAGE_NAMES[targetLang]} (${targetLang})...`);

  try {
    const translatedContent = await translateText(sourceContent, targetLang);
    
    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write translated file
    fs.writeFileSync(targetFile, JSON.stringify(translatedContent, null, 2), 'utf-8');
    console.log(`✓ Successfully translated to ${targetLang}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to translate to ${targetLang}:`, error.message);
    return false;
  }
}

// Get target language from command line argument
const targetLang = process.argv[2];

if (!targetLang) {
  console.error('Usage: node translate-botanik-morphologie.mjs <language_code>');
  console.error('Available languages:', Object.keys(LANGUAGE_NAMES).join(', '));
  process.exit(1);
}

if (!LANGUAGE_NAMES[targetLang]) {
  console.error(`Unknown language code: ${targetLang}`);
  console.error('Available languages:', Object.keys(LANGUAGE_NAMES).join(', '));
  process.exit(1);
}

translateToLanguage(targetLang);
