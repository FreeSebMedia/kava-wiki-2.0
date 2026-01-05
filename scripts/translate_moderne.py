#!/usr/bin/env python3
import json
import os
import sys
from pathlib import Path
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OpenAIAPIKEy'))

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
    'zh': 'Chinese',
    'ru': 'Russian',
    'ka': 'Georgian',
}

def translate_text(text, target_lang):
    """Translate text using OpenAI API"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a professional translator. Translate the following JSON content to {target_lang}. Preserve all JSON structure, keys, and HTML tags. Only translate the values."
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            temperature=0.3,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error translating to {target_lang}: {e}")
        return None

def translate_json_file(source_file, target_lang_code, target_lang_name):
    """Translate a JSON file to target language"""
    try:
        with open(source_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"Translating to {target_lang_name}...", end=" ", flush=True)
        
        translated = translate_text(content, target_lang_name)
        
        if translated:
            target_dir = f"/home/ubuntu/kava-wiki/client/src/locales/{target_lang_code}"
            os.makedirs(target_dir, exist_ok=True)
            
            target_file = f"{target_dir}/geschichte-moderne.json"
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(translated)
            
            print("✓")
            return True
        else:
            print("✗")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    source_file = "/home/ubuntu/kava-wiki/client/src/locales/de/geschichte-moderne.json"
    
    if not os.path.exists(source_file):
        print(f"Source file not found: {source_file}")
        sys.exit(1)
    
    success_count = 0
    for lang_code, lang_name in LANGUAGES.items():
        if translate_json_file(source_file, lang_code, lang_name):
            success_count += 1
    
    print(f"\nTranslation complete: {success_count}/{len(LANGUAGES)} languages")
