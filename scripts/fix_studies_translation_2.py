import json

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
        
    updated_studies = []
    
    for study in studies:
        # Translate the specific study summary
        if "Toxicity of kava pyrones" in study.get('title', ''):
            print(f"Translating summary for: {study.get('title')}")
            study['summary'] = "Fallstudie zur Toxizität von Kava-Pyronen. Die Autoren kritisieren den Rückzug von Kava-Präparaten in Deutschland im Jahr 2002 als unbegründete Überreaktion. Sie argumentieren, dass Kava-Pyrone wirksame Anxiolytika sind und die wenigen Fälle von Hepatotoxizität (ca. 2 von 36) wahrscheinlich auf einen immunologisch vermittelten, idiosynkratischen Mechanismus zurückzuführen sind, nicht auf direkte Toxizität. Die Inzidenz von Nebenwirkungen wird als vergleichbar mit Benzodiazepinen eingeschätzt. Weder die Fallbewertungen des BfArM noch die Ablehnung der therapeutischen Wirksamkeit seien wissenschaftlich fundiert."
            
        updated_studies.append(study)

    with open(json_path, 'w') as f:
        json.dump(updated_studies, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully updated translation in studies.json.")

if __name__ == "__main__":
    main()
