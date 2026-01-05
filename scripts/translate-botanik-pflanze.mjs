import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OpenAIAPIKEy;

const languageNames = {
  de: 'German',
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

async function translateToLanguage(sourceJson, targetLang) {
  const languageName = languageNames[targetLang];
  
  console.log(`🌍 Translating botanik-pflanze.json to ${languageName} (${targetLang})...`);
  
  const prompt = `You are a professional translator specializing in botanical and scientific content. Translate the following JSON content from German to ${languageName}.

IMPORTANT RULES:
1. Keep ALL JSON keys exactly as they are (do not translate keys)
2. Only translate the string VALUES
3. Preserve all HTML tags like <strong>, <em>, etc. exactly as they are
4. Keep scientific names in Latin (e.g., "Piper methysticum", "Piper wichmannii") - do NOT translate them
5. Keep proper nouns like place names (Vanuatu, Fiji, Tonga, etc.)
6. Maintain the exact JSON structure
7. Return ONLY valid JSON, no explanations

JSON to translate:
${JSON.stringify(sourceJson, null, 2)}`;

  console.log('📤 Sending to OpenAI API...');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a professional translator. Return only valid JSON without any markdown formatting or code blocks.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 8000
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let translatedContent = data.choices[0].message.content;
  
  // Clean up potential markdown formatting
  translatedContent = translatedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  // Validate JSON
  console.log('✅ Validating JSON...');
  const parsed = JSON.parse(translatedContent);
  
  return parsed;
}

async function main() {
  const targetLang = process.argv[2];
  
  if (!targetLang) {
    console.log('Usage: node translate-botanik-pflanze.mjs <language-code>');
    console.log('Available languages:', Object.keys(languageNames).join(', '));
    process.exit(1);
  }
  
  if (!languageNames[targetLang]) {
    console.error(`Unknown language: ${targetLang}`);
    process.exit(1);
  }
  
  if (targetLang === 'de') {
    console.log('German is the source language, no translation needed.');
    process.exit(0);
  }
  
  // Read source German file
  const sourcePath = path.join(process.cwd(), 'client/src/locales/de/botanik-pflanze.json');
  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
  
  try {
    const translated = await translateToLanguage(sourceContent, targetLang);
    
    // Ensure target directory exists
    const targetDir = path.join(process.cwd(), `client/src/locales/${targetLang}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Write translated file
    const targetPath = path.join(targetDir, 'botanik-pflanze.json');
    fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2));
    
    console.log(`✅ Successfully translated to ${languageNames[targetLang]}!`);
    console.log(`📁 Saved to: ${targetPath}`);
    
    // Show sample
    console.log('--- Sample Translation ---');
    console.log('Title:', translated.page?.title);
    console.log('Subtitle:', translated.page?.subtitle);
    console.log('Category:', translated.page?.category);
    
  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    process.exit(1);
  }
}

main();
