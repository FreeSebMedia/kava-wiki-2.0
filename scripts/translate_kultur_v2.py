#!/usr/bin/env python3
"""
Script to translate kultur.json from German to all supported languages using OpenAI API.
Translates in sections to avoid timeout issues.
"""

import json
import os
import sys
import time
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

def translate_section(section_json, target_lang_name, section_name):
    """Translate a section of JSON content using OpenAI API"""
    
    prompt = f"""Translate this JSON from German to {target_lang_name}. 

Rules:
- Only translate string VALUES, keep all keys unchanged
- Keep HTML tags (<strong>, <em>) intact
- Keep proper nouns: Kava, Nakamal, Tanoa, Bilo, Yaqona, Sevusevu, Noble Kava
- Return ONLY valid JSON, no markdown or explanations

JSON to translate:
{json.dumps(section_json, ensure_ascii=False, indent=2)}"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a translator. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=8000,
            timeout=60
        )
        
        result = response.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if result.startswith('```'):
            lines = result.split('\n')
            if lines[-1].strip() == '```':
                result = '\n'.join(lines[1:-1])
            else:
                result = '\n'.join(lines[1:])
        if result.startswith('json'):
            result = result[4:].strip()
        
        return json.loads(result)
    except Exception as e:
        print(f"  Error in section {section_name}: {e}")
        return section_json  # Return original on error

def translate_full_json(source_json, target_lang, target_lang_name):
    """Translate the full JSON by sections"""
    
    translated = {}
    
    # Translate each top-level section separately
    sections = list(source_json.keys())
    total = len(sections)
    
    for i, section in enumerate(sections):
        print(f"  [{i+1}/{total}] Translating section: {section}...", end=" ", flush=True)
        section_data = {section: source_json[section]}
        translated_section = translate_section(section_data, target_lang_name, section)
        translated[section] = translated_section.get(section, source_json[section])
        print("✓")
        time.sleep(0.5)  # Small delay between API calls
    
    return translated

def save_translation(translated_json, lang_code):
    """Save translated JSON to the appropriate locale folder"""
    dir_path = f'/home/ubuntu/kava-wiki/client/src/locales/{lang_code}'
    os.makedirs(dir_path, exist_ok=True)
    
    path = f'{dir_path}/kultur.json'
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(translated_json, f, ensure_ascii=False, indent=2)
    print(f"  Saved: {path}")

def main():
    # Check if specific language is requested
    target_lang = sys.argv[1] if len(sys.argv) > 1 else None
    
    # Load source German JSON
    print("Loading source German JSON...")
    source_json = load_source_json('de')
    print(f"Loaded {len(source_json)} sections\n")
    
    if target_lang:
        # Translate single language
        if target_lang not in LANGUAGES:
            print(f"Error: Unknown language code '{target_lang}'")
            print(f"Available: {', '.join(LANGUAGES.keys())}")
            sys.exit(1)
        
        lang_name = LANGUAGES[target_lang]
        print(f"Translating to {lang_name} ({target_lang})...")
        try:
            translated = translate_full_json(source_json, target_lang, lang_name)
            save_translation(translated, target_lang)
            print(f"\n✓ Successfully translated to {lang_name}")
        except Exception as e:
            print(f"\n✗ Error translating to {lang_name}: {e}")
    else:
        # Translate all languages
        success = 0
        failed = 0
        for lang_code, lang_name in LANGUAGES.items():
            print(f"\n{'='*50}")
            print(f"Translating to {lang_name} ({lang_code})...")
            print('='*50)
            try:
                translated = translate_full_json(source_json, lang_code, lang_name)
                save_translation(translated, lang_code)
                print(f"✓ Successfully translated to {lang_name}")
                success += 1
            except Exception as e:
                print(f"✗ Error translating to {lang_name}: {e}")
                failed += 1
                continue
        
        print(f"\n{'='*50}")
        print(f"Translation complete: {success} successful, {failed} failed")
        print('='*50)

if __name__ == '__main__':
    main()
