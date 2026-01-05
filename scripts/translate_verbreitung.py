import json
import os
import sys
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OpenAIAPIKEy"))

def translate_json(source_json, target_lang, lang_name):
    prompt = f"""Translate the following JSON content from English to {lang_name}. 
Keep all JSON keys exactly as they are - only translate the string values.
Maintain the same JSON structure. Do not translate proper nouns like 'Kava', 'Lapita', 'Fiji', 'Tonga', 'Samoa', 'Hawaii', 'Yaqona', 'Sakau', etc.
Keep HTML tags like <strong>, <em> intact.
Return ONLY valid JSON, no explanations.

{json.dumps(source_json, ensure_ascii=False, indent=2)}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    
    result = response.choices[0].message.content
    # Clean up response - remove markdown code blocks if present
    if result.startswith("```"):
        result = result.split("```")[1]
        if result.startswith("json"):
            result = result[4:]
    result = result.strip()
    
    return json.loads(result)

def main():
    target_lang = sys.argv[1]
    lang_names = {
        'es': 'Spanish', 'fr': 'French', 'nl': 'Dutch', 'pl': 'Polish',
        'cs': 'Czech', 'pt': 'Portuguese', 'it': 'Italian', 'ro': 'Romanian',
        'hu': 'Hungarian', 'bg': 'Bulgarian', 'el': 'Greek', 'tr': 'Turkish',
        'no': 'Norwegian', 'da': 'Danish', 'fi': 'Finnish', 'sv': 'Swedish',
        'ja': 'Japanese', 'zh': 'Chinese (Simplified)', 'ru': 'Russian', 'ka': 'Georgian'
    }
    
    source_path = '/home/ubuntu/kava-wiki/client/src/locales/en/geschichte-verbreitung.json'
    target_path = f'/home/ubuntu/kava-wiki/client/src/locales/{target_lang}/geschichte-verbreitung.json'
    
    with open(source_path, 'r', encoding='utf-8') as f:
        source = json.load(f)
    
    translated = translate_json(source, target_lang, lang_names[target_lang])
    
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)
    
    print(f"Translated to {lang_names[target_lang]} ({target_lang})")

if __name__ == "__main__":
    main()
