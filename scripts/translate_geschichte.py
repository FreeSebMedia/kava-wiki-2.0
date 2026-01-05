#!/usr/bin/env python3
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

# Language mapping
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

def translate_json(source_json, target_lang, lang_name):
    prompt = f"""Translate the following JSON content from German to {lang_name}. 
Keep the JSON structure exactly the same, only translate the text values.
Do not translate proper nouns like "Kava", "Piper methysticum", "Piper wichmannii", "Noble Kava", "Yaqona", "'Awa", "Lapita", "Georg Forster", "James Cook".
Keep scientific terms and plant names in their original form.
Return ONLY the translated JSON, no explanations.

{json.dumps(source_json, ensure_ascii=False, indent=2)}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional translator. Translate JSON content accurately while preserving the exact JSON structure."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    
    result = response.choices[0].message.content.strip()
    
    if result.startswith('```'):
        result = result.split('\n', 1)[1]
        if result.endswith('```'):
            result = result.rsplit('```', 1)[0]
    
    return json.loads(result)

def main():
    if len(sys.argv) < 2:
        print("Usage: python translate_geschichte.py <lang_code>")
        sys.exit(1)
    
    lang_code = sys.argv[1]
    
    if lang_code not in LANGUAGES:
        print(f"Error: Unknown language code '{lang_code}'")
        sys.exit(1)
    
    lang_name = LANGUAGES[lang_code]
    
    source_path = '/home/ubuntu/kava-wiki/client/src/locales/de/geschichte.json'
    with open(source_path, 'r', encoding='utf-8') as f:
        source_json = json.load(f)
    
    print(f"Translating to {lang_name} ({lang_code})...")
    
    translated = translate_json(source_json, lang_code, lang_name)
    
    target_path = f'/home/ubuntu/kava-wiki/client/src/locales/{lang_code}/geschichte.json'
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)
    
    print(f"Saved to {target_path}")

if __name__ == '__main__':
    main()
