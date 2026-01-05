import json

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
        
    updated_studies = []
    
    for study in studies:
        # Translate the specific study summary
        if "Nekrotisierende Hepatitis nach Einnahme pflanzlicher Heilmittel" in study.get('title', ''):
            print(f"Translating summary for: {study.get('title')}")
            study['summary'] = "Die Studie beschreibt zwei unabhängige Fälle von nekrotisierender Hepatitis bei Frauen (39 und 42 Jahre). WICHTIG: Nur einer der Fälle stand im Zusammenhang mit Kava (Piper methysticum), der andere wurde durch Schöllkraut (Chelidonium majus) verursacht. Beide Patientinnen erholten sich nach Absetzen der pflanzlichen Mittel schnell, was einen kausalen Zusammenhang nahelegt."
            
        updated_studies.append(study)

    with open(json_path, 'w') as f:
        json.dump(updated_studies, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully updated translation in studies.json.")

if __name__ == "__main__":
    main()
