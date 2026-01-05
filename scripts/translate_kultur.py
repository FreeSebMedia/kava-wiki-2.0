#!/usr/bin/env python3
"""
Script to translate kultur.json from German to all supported languages using OpenAI API.
"""

import json
import os
import sys
from openai import OpenAI

# Get API key from environment
api_key = os.environ.get('OpenAIAPIKEy')
if not api_key:
    print("Error: OpenAIAPIKEy environment variable not set")
    sys.exit(1)

client = OpenAI(api_key=api_key)

# Languages to translate to (excluding de and en which are already done)
LANGUAGES = {
    'es': 'Spanish',
    'fr': 'French', 
    'nl': 'Dutch',
    'pl': 'Polish',
    'cs': 'Czech',
    'pt': 'Portuguese',
    'it': 'Italian',
    'ro': 'Romanian',
    'hu': 'Hungarian',
    'bg': 'Bulgarian',
    'el': 'Greek',
    'tr': 'Turkish',
    'no': 'Norwegian',
    'da': 'Danish',
    'fi': 'Finnish',
    'sv': 'Swedish',
    'ja': 'Japanese',
    'zh': 'Chinese (Simplified)',
    'ru': 'Russian',
    'ka': 'Georgian'
}

def load_source_json(lang='de'):
    """Load the source German JSON file"""
    path = f'/home/ubuntu/kava-wiki/client/src/locales/{lang}/kultur.json'
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def translate_json(source_json, target_lang, target_lang_name):
    """Translate JSON content using OpenAI API"""
    
    prompt = f"""You are a professional translator specializing in cultural and botanical content about Kava (Piper methysticum).

Translate the following JSON content from German to {target_lang_name}. 

IMPORTANT RULES:
1. Preserve ALL JSON structure, keys, and formatting exactly
2. Only translate the STRING VALUES, never the keys
3. Keep HTML tags like <strong>, <em> intact
4. Keep proper nouns like "Kava", "Nakamal", "Tanoa", "Bilo", "Yaqona", "Sevusevu" unchanged
5. Keep country/region names in their native form when appropriate
6. Translate cultural terms but keep original terms in parentheses where helpful
7. Maintain the same tone - informative, respectful of Pacific cultures
8. For {target_lang_name}, use appropriate formal/informal register (formal for educational content)

Return ONLY the translated JSON, no explanations or markdown code blocks.

Source JSON:
{json.dumps(source_json, ensure_ascii=False, indent=2)}"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a professional translator. Return only valid JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=16000
    )
    
    result = response.choices[0].message.content.strip()
    
    # Remove markdown code blocks if present
    if result.startswith('```'):
        lines = result.split('\n')
        result = '\n'.join(lines[1:-1] if lines[-1] == '```' else lines[1:])
    if result.startswith('json'):
        result = result[4:].strip()
    
    return json.loads(result)

def save_translation(translated_json, lang_code):
    """Save translated JSON to the appropriate locale folder"""
    # Create directory if it doesn't exist
    dir_path = f'/home/ubuntu/kava-wiki/client/src/locales/{lang_code}'
    os.makedirs(dir_path, exist_ok=True)
    
    path = f'{dir_path}/kultur.json'
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(translated_json, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved: {path}")

def main():
    # Check if specific language is requested
    target_lang = sys.argv[1] if len(sys.argv) > 1 else None
    
    # Load source German JSON
    print("Loading source German JSON...")
    source_json = load_source_json('de')
    
    if target_lang:
        # Translate single language
        if target_lang not in LANGUAGES:
            print(f"Error: Unknown language code '{target_lang}'")
            print(f"Available: {', '.join(LANGUAGES.keys())}")
            sys.exit(1)
        
        lang_name = LANGUAGES[target_lang]
        print(f"\nTranslating to {lang_name} ({target_lang})...")
        try:
            translated = translate_json(source_json, target_lang, lang_name)
            save_translation(translated, target_lang)
            print(f"✓ Successfully translated to {lang_name}")
        except Exception as e:
            print(f"✗ Error translating to {lang_name}: {e}")
    else:
        # Translate all languages
        for lang_code, lang_name in LANGUAGES.items():
            print(f"\nTranslating to {lang_name} ({lang_code})...")
            try:
                translated = translate_json(source_json, lang_code, lang_name)
                save_translation(translated, lang_code)
                print(f"✓ Successfully translated to {lang_name}")
            except Exception as e:
                print(f"✗ Error translating to {lang_name}: {e}")
                continue

if __name__ == '__main__':
    main()
