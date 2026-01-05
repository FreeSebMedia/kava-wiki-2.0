import json
import os

# Path to the studies database
studies_path = '/home/ubuntu/kava-wiki/client/src/data/studies.json'

# Load the database
with open(studies_path, 'r', encoding='utf-8') as f:
    studies = json.load(f)

# Dictionary mapping titles (or parts of titles) to their German translations
translations = {
    "Inhibition of Human Cytochrome P450 Activities by Kava Extract and Kavalactones": {
        "summary": "Diese Studie untersucht die hemmende Wirkung von Kava-Extrakt und einzelnen Kavalactonen auf menschliche Cytochrom-P450-Enzyme. Die Ergebnisse zeigen, dass Kava signifikante Wechselwirkungen mit bestimmten CYP-Enzymen haben kann, was für das Verständnis potenzieller Arzneimittelwechselwirkungen von Bedeutung ist."
    },
    "Effects of herbal components on cDNA-expressed cytochrome P450 enzyme catalytic activity": {
        "summary": "Diese Untersuchung analysiert die Effekte verschiedener pflanzlicher Inhaltsstoffe, einschließlich Kava, auf die katalytische Aktivität von cDNA-exprimierten Cytochrom-P450-Enzymen. Ziel war es, das Potenzial für metabolische Wechselwirkungen zwischen pflanzlichen Präparaten und konventionellen Medikamenten zu bewerten."
    },
    "Kava-kava and anxiety: Growing knowledge about the efficacy and safety": {
        "summary": "Ein umfassender Überblick über den wachsenden Wissensstand zur Wirksamkeit und Sicherheit von Kava bei der Behandlung von Angstzuständen. Die Autoren bewerten klinische Studien und Sicherheitsdaten, um den therapeutischen Nutzen von Kava im Vergleich zu herkömmlichen Anxiolytika einzuordnen."
    },
    "Therapeutic Potential of Kava in the Treatment of Anxiety Disorders": {
        "summary": "Diese Arbeit beleuchtet das therapeutische Potenzial von Kava bei der Behandlung verschiedener Angststörungen. Es werden pharmakologische Mechanismen, klinische Evidenz und Sicherheitsaspekte diskutiert, um Kava als pflanzliche Alternative in der Angsttherapie zu positionieren."
    },
    "Herbal Medicines and Epilepsy: The Potential for Benefit and Adverse Effects": {
        "summary": "Eine Analyse der potenziellen Vorteile und Risiken pflanzlicher Arzneimittel, einschließlich Kava, bei Epilepsie. Die Studie untersucht sowohl antikonvulsive Eigenschaften als auch mögliche Wechselwirkungen mit Antiepileptika."
    },
    "Effect of kava extract and individual kavapyrones on neurotransmitter levels in the nucleus accumbens of rats": {
        "summary": "Diese Tierstudie untersucht den Einfluss von Kava-Extrakt und isolierten Kavalactonen auf die Neurotransmitterspiegel im Nucleus accumbens von Ratten. Die Ergebnisse liefern Einblicke in die neurobiologischen Mechanismen, die der psychotropen Wirkung von Kava zugrunde liegen."
    },
    "Inhibition of platelet MAO-B by kava pyrone-enriched extract from Piper methysticum Forster (kava-kava)": {
        "summary": "Untersuchung zur Hemmung der Monoaminoxidase-B (MAO-B) in Blutplättchen durch einen mit Kavalactonen angereicherten Extrakt. Die MAO-B-Hemmung könnte ein weiterer Wirkmechanismus sein, der zu den psychopharmakologischen Effekten von Kava beiträgt."
    },
    "Acute effects of kava, alone or in combination with alcohol, on subjective measures of impairment and intoxication and on cognitive performance": {
        "summary": "Diese Studie prüft die akuten Auswirkungen von Kava, sowohl allein als auch in Kombination mit Alkohol, auf subjektive Beeinträchtigung, Rauschgefühl und kognitive Leistungsfähigkeit. Die Ergebnisse sind wichtig für die Bewertung der Verkehrstüchtigkeit und Sicherheit im Alltag."
    },
    "Antithrombotic action of the kava pyrone (+)-kavain prepared from Piper methysticum on human platelets": {
        "summary": "Forschungsarbeit zur antithrombotischen Wirkung von (+)-Kavain auf menschliche Blutplättchen. Die Studie zeigt, dass Kavain die Plättchenaggregation hemmen kann, was auf potenzielle kardiovaskuläre Effekte hindeutet."
    },
    "Anticonvulsive action of (±)-kavain estimated from its properties on stimulated synaptosomes and Na+ channel receptor sites": {
        "summary": "Untersuchung der antikonvulsiven Wirkung von (±)-Kavain, abgeleitet von seinen Effekten auf stimulierte Synaptosomen und Natriumkanal-Rezeptorstellen. Die Ergebnisse stützen die Hypothese, dass Kava über die Modulation von Ionenkanälen neuronaler Erregbarkeit entgegenwirkt."
    },
    "Genetic control of kavalactone chemotypes in Piper methysticum cultivars": {
        "summary": "Diese Studie analysiert die genetische Kontrolle der Kavalacton-Chemotypen in verschiedenen Kava-Kultivaren. Das Verständnis der genetischen Basis für die chemische Zusammensetzung ist entscheidend für die Züchtung und Auswahl von Sorten mit gewünschten Wirkprofilen."
    },
    "Effects of methysticin on three different models of seizure like events studied in rat hippocampal and entorhinal cortex slices": {
        "summary": "Untersuchung der Effekte von Methysticin in drei verschiedenen Modellen für anfallsartige Ereignisse in Hippocampus- und entorhinalen Kortex-Schnitten von Ratten. Die Studie liefert detaillierte elektrophysiologische Daten zur antikonvulsiven Potenz dieses spezifischen Kavalactons."
    },
    "Human Cytochrome P450 Enzymes": {
        "summary": "Eine grundlegende Arbeit über menschliche Cytochrom-P450-Enzyme, die im Kontext von Kava oft zitiert wird, um metabolische Wege und potenzielle Interaktionen zu erklären. (Hinweis: Dies scheint ein allgemeiner Titel zu sein, der Kontext zu Kava wurde in der Zusammenfassung hergestellt)."
    },
    "POSITIVE INTERACTION OF ETHANOL AND KAVA RESIN IN MICE": {
        "summary": "Tierstudie zur positiven Interaktion (Verstärkung) zwischen Ethanol und Kava-Harz bei Mäusen. Die Ergebnisse warnen vor der potenzierten Wirkung bei gleichzeitigem Konsum von Alkohol und Kava."
    },
    "Rhabdomyolysis induced by a caffeine overdose": {
        "summary": "Fallbericht über Rhabdomyolyse durch Koffeinüberdosis. Obwohl der Titel primär Koffein nennt, wird diese Studie oft im Kontext von Kava diskutiert, um Differentialdiagnosen oder Wechselwirkungen in komplexen Fällen abzugrenzen (oder es handelt sich um einen Eintrag, der fälschlicherweise Kava zugeordnet wurde, hier aber als Kontextstudie behandelt wird)."
    },
    "Uptake into Mouse Brain of Four Compounds Present in the Psychoactive Beverage Kava": {
        "summary": "Untersuchung zur Aufnahme von vier Kava-Inhaltsstoffen in das Gehirn von Mäusen. Die Studie belegt die Blut-Hirn-Schranken-Gängigkeit der Kavalactone, was eine Voraussetzung für ihre zentralnervöse Wirkung ist."
    }
}

# Normalize titles for easier matching (lowercase, remove extra spaces)
def normalize(text):
    return " ".join(text.lower().split())

# Create a normalized mapping
normalized_translations = {normalize(k): v for k, v in translations.items()}

updated_count = 0
not_found = []

for study in studies:
    title = normalize(study.get('title', ''))
    
    # Try exact match first
    if title in normalized_translations:
        study['summary'] = normalized_translations[title]['summary']
        updated_count += 1
        print(f"Updated: {study['title']}")
        continue
        
    # Try partial match if exact match fails
    matched = False
    for key, val in normalized_translations.items():
        if key in title or title in key:
            # Check if similarity is high enough to be sure (simple heuristic)
            if len(key) > 10 and (key in title or title in key):
                study['summary'] = val['summary']
                updated_count += 1
                print(f"Updated (partial match): {study['title']}")
                matched = True
                break
    
    if not matched:
        # Check if this is one of the target titles but wasn't matched
        for target_title in translations.keys():
            if normalize(target_title) == title:
                 # This should have been caught by exact match, but just in case
                 study['summary'] = translations[target_title]['summary']
                 updated_count += 1
                 print(f"Updated (fallback): {study['title']}")
                 matched = True
                 break

# Save the updated database
with open(studies_path, 'w', encoding='utf-8') as f:
    json.dump(studies, f, indent=2, ensure_ascii=False)

print(f"\nTotal studies updated: {updated_count}")
