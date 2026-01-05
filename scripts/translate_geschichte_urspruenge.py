import json
import os
import sys
from openai import OpenAI

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

def translate_json(client, source_json, target_lang, lang_name):
    prompt = f"""Translate the following JSON content from English to {lang_name}. 
Keep all JSON keys exactly as they are (do not translate keys).
Only translate the string values.
Maintain the exact JSON structure.
For arrays of objects, translate all string values within them.
Do not add any explanation, just return the valid JSON.

{json.dumps(source_json, ensure_ascii=False, indent=2)}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are a professional translator specializing in {lang_name}. Translate JSON content accurately while preserving structure."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    
    result = response.choices[0].message.content
    # Clean up potential markdown code blocks
    if result.startswith("```"):
        result = result.split("```")[1]
        if result.startswith("json"):
            result = result[4:]
    result = result.strip()
    
    return json.loads(result)

def main():
    if len(sys.argv) < 2:
        print("Usage: python translate_geschichte_urspruenge.py <lang_code>")
        sys.exit(1)
    
    target_lang = sys.argv[1]
    if target_lang not in LANGUAGES:
        print(f"Unknown language: {target_lang}")
        sys.exit(1)
    
    lang_name = LANGUAGES[target_lang]
    print(f"Translating to {lang_name} ({target_lang})...")
    
    # Initialize OpenAI client
    client = OpenAI(api_key=os.environ.get('OpenAIAPIKEy'))
    
    # Load English source
    source_path = '/home/ubuntu/kava-wiki/client/src/locales/en/geschichte-urspruenge.json'
    with open(source_path, 'r', encoding='utf-8') as f:
        source_json = json.load(f)
    
    # Translate
    translated = translate_json(client, source_json, target_lang, lang_name)
    
    # Save
    target_dir = f'/home/ubuntu/kava-wiki/client/src/locales/{target_lang}'
    os.makedirs(target_dir, exist_ok=True)
    target_path = f'{target_dir}/geschichte-urspruenge.json'
    
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)
    
    print(f"Saved to {target_path}")

if __name__ == "__main__":
    main()
