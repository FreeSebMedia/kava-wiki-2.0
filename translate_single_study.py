import json
import os

# Path to the studies database
studies_path = '/home/ubuntu/kava-wiki/client/src/data/studies.json'

# Load the database
with open(studies_path, 'r', encoding='utf-8') as f:
    studies = json.load(f)

# Target title and translation
target_title_part = "Inhibition of Cytochrome P450 3A4 by Extracts and Kavalactones"
german_summary = "Diese Studie untersucht die Hemmung des Enzyms Cytochrom P450 3A4 (CYP3A4) durch Kava-Extrakte und isolierte Kavalactone. CYP3A4 ist ein zentrales Enzym für den Abbau vieler Medikamente. Die Ergebnisse zeigen, dass Kava dieses Enzym hemmen kann, was das Potenzial für Wechselwirkungen mit anderen Arzneimitteln erhöht, die über denselben Stoffwechselweg abgebaut werden."

updated = False

def normalize(text):
    return " ".join(text.lower().split())

normalized_target = normalize(target_title_part)

for study in studies:
    title = normalize(study.get('title', ''))
    
    if normalized_target in title:
        study['summary'] = german_summary
        updated = True
        print(f"Updated: {study['title']}")
        break

if not updated:
    print(f"Warning: Study containing '{target_title_part}' not found.")
else:
    # Save the updated database
    with open(studies_path, 'w', encoding='utf-8') as f:
        json.dump(studies, f, indent=2, ensure_ascii=False)
    print("Database saved successfully.")
