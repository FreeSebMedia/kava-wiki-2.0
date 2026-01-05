import json
import os

# Explicit mapping of filenames/IDs to correct metadata based on 'AnweisungenzurKorrektur..rtf'
FIXES = {
    "AssessmentoftheefficacyofPipermethysticum(Micrembryeae-Piperaceae)asabioinsecticide,andorspinosadcombinedwithattractiveplantvolatilesforanovellureandkillstrategyagainstBactroceratryoni(Diptera-Tephritidae)inlaboratory.pdf": {
        "title": "Assessment of the efficacy of Piper methysticum (Micrembryeae: Piperaceae) as a bioinsecticide...",
        "authors": "Journal of Economic Entomology",
        "publication": "Journal of Economic Entomology",
        "year": "2024",
        "summary": "Untersuchung der Wirksamkeit von Piper methysticum als Bioinsektizid gegen Bactrocera tryoni.",
        "url": "/documents/studies/AssessmentoftheefficacyofPipermethysticum(Micrembryeae-Piperaceae)asabioinsecticide,andorspinosadcombinedwithattractiveplantvolatilesforanovellureandkillstrategyagainstBactroceratryoni(Diptera-Tephritidae)inlaboratory.pdf"
    },
    "AvinAshiteshPrasad-FinalPublishedpaper.pdf": {
        "title": "Kava (Piper methysticum)-An Important Source of Income for the Rural Farmers in Fiji Islands",
        "authors": "Avin Ashitesh Prasad",
        "publication": "Advances in Crop Science and Technology",
        "year": "2015",
        "summary": "Studie über die wirtschaftliche Bedeutung von Kava für ländliche Bauern auf den Fidschi-Inseln.",
        "url": "/documents/studies/AvinAshiteshPrasad-FinalPublishedpaper.pdf"
    },
    "call-scientific-data-use-hmpc-assessment-work-piper-methysticum-g-forst-rhizoma_en.pdf": {
        "title": "Call for scientific data for use in HMPC assessment work on Piper methysticum G. Forst., rhizoma",
        "authors": "Committee on Herbal Medicinal Products (HMPC)",
        "publication": "EMA/HMPC/33463/2015",
        "year": "2015",
        "summary": "Aufruf der EMA zur Einreichung wissenschaftlicher Daten für die Bewertung von Kava-Wurzelstock.",
        "url": "/documents/studies/call-scientific-data-use-hmpc-assessment-work-piper-methysticum-g-forst-rhizoma_en.pdf"
    },
    "dorlivete,+e216101220479.pdf": {
        "title": "Piper methysticum G. Forst (Piperaceae) in the central nervous system: phytochemistry, pharmacology and mechanism of action",
        "authors": "Research, Society and Development",
        "publication": "Research, Society and Development",
        "year": "2021",
        "summary": "Untersuchung der phytochemischen Zusammensetzung und der pharmakologischen Wirkmechanismen von Kava im ZNS.",
        "url": "/documents/studies/dorlivete,+e216101220479.pdf"
    },
    "Assessmentoftheriskofhepatotoxicitywithkavaproducts.pdf": {
        "title": "Assessment of the risk of hepatotoxicity with kava products",
        "authors": "World Health Organization (WHO)",
        "publication": "WHO",
        "year": "2007",
        "summary": "Bewertung des Risikos von Hepatotoxizität durch Kava-Produkte durch die WHO.",
        "url": "/documents/studies/Assessmentoftheriskofhepatotoxicitywithkavaproducts.pdf"
    },
    "AssessmentreportonPipermethysticumG.Forst.,rhizoma.pdf": {
        "title": "Assessment report on Piper methysticum G. Forst., rhizoma",
        "authors": "Committee on Herbal Medicinal Products (HMPC)",
        "publication": "EMA/HMPC/450589/2016",
        "year": "2016",
        "summary": "Offizieller Bewertungsbericht der EMA über Kava-Wurzelstock.",
        "url": "/documents/studies/AssessmentreportonPipermethysticumG.Forst.,rhizoma.pdf"
    },
    "ListofreferencessupportingtheassessmentofPipermethysticumG.Forst.,rhizoma.pdf": {
        "title": "List of references supporting the assessment of Piper methysticum G. Forst., rhizoma",
        "authors": "Committee on Herbal Medicinal Products (HMPC)",
        "publication": "EMA/HMPC/450587/2016",
        "year": "2016",
        "summary": "Liste der Referenzen, die die Bewertung von Kava durch die EMA stützen.",
        "url": "/documents/studies/ListofreferencessupportingtheassessmentofPipermethysticumG.Forst.,rhizoma.pdf"
    },
    "Kava(Pipermethysticum)beveragefortraditionalandrecreationaluse.pdf": {
        "title": "Kava (Piper methysticum) beverage for traditional and recreational use",
        "authors": "Food Standards – Australia New Zealand",
        "publication": "Food Standards – Australia New Zealand",
        "year": "2021",
        "summary": "Bericht über die traditionelle und freizeitliche Nutzung von Kava-Getränken.",
        "url": "/documents/studies/Kava(Pipermethysticum)beveragefortraditionalandrecreationaluse.pdf"
    },
    "kava-clinical-factsheet.pdf": {
        "title": "Kava (Kavalactones) Fact Sheet",
        "authors": "Unknown",
        "publication": "Clinical Fact Sheet",
        "year": "Unknown",
        "summary": "Klinisches Faktenblatt zu Kava und Kavalactonen.",
        "url": "/documents/studies/kava-clinical-factsheet.pdf"
    },
    "overview-comments-received-draft-public-statement-piper-methysticum-g-forst-rhizoma_en(1).pdf": {
        "title": "Overview of comments received on draft public statement on Piper methysticum G. Forst., rhizoma",
        "authors": "Committee on Herbal Medicinal Products (HMPC)",
        "publication": "EMA/HMPC/326583/2017",
        "year": "2017",
        "summary": "Übersicht der Kommentare zum Entwurf der öffentlichen Stellungnahme zu Kava.",
        "url": "/documents/studies/overview-comments-received-draft-public-statement-piper-methysticum-g-forst-rhizoma_en(1).pdf"
    },
    "MeasuringtheChemicalandCytotoxicVariabilityofCommerciallyAvailableKava(PipermethysticumG.Forster).pdf": {
        "title": "Measuring the Chemical and Cytotoxic Variability of Commercially Available Kava (Piper methysticum G. Forster)",
        "authors": "Unknown",
        "publication": "Unknown",
        "year": "Unknown",
        "summary": "Messung der chemischen und zytotoxischen Variabilität von kommerziell erhältlichem Kava.",
        "url": "/documents/studies/MeasuringtheChemicalandCytotoxicVariabilityofCommerciallyAvailableKava(PipermethysticumG.Forster).pdf"
    },
    "pmm-kava-20200811-web.pdf": {
        "title": "Review of the published literature pertaining to the safety of Kava for use in conventional foods",
        "authors": "Ph.D., Toxicologist Division of Food Ingredients (DFI)",
        "publication": "FDA Memorandum",
        "year": "2020",
        "summary": "Zusammenfassung der veröffentlichten Literatur zur Sicherheit von Kava in konventionellen Lebensmitteln.",
        "url": "/documents/studies/pmm-kava-20200811-web.pdf"
    },
    "PipermethysticumG.Forst(Piperaceae)inthecentralnervoussystem-phytochemistry,pharmacologyandmechanismofaction.pdf": {
        "title": "Piper methysticum G. Forst (Piperaceae) in the central nervous system: phytochemistry, pharmacology and mechanism of action",
        "authors": "Research, Society and Development",
        "publication": "Research, Society and Development",
        "year": "2021",
        "summary": "Untersuchung der phytochemischen Zusammensetzung und der pharmakologischen Wirkmechanismen von Kava im ZNS.",
        "url": "/documents/studies/PipermethysticumG.Forst(Piperaceae)inthecentralnervoussystem-phytochemistry,pharmacologyandmechanismofaction.pdf"
    },
    "Re-introductionofKava(Pipermethysticum)totheEU-IsThereaWayForward.pdf": {
        "title": "Re-introduction of Kava (Piper methysticum) to the EU: Is There a Way Forward?",
        "authors": "Unknown",
        "publication": "Perspectives",
        "year": "Unknown",
        "summary": "Diskussion über die Wiedereinführung von Kava in die EU und mögliche Lösungswege.",
        "url": "/documents/studies/Re-introductionofKava(Pipermethysticum)totheEU-IsThereaWayForward.pdf"
    },
    "ToxicityofKavaKava.pdf": {
        "title": "Toxicity of Kava Kava",
        "authors": "Unknown",
        "publication": "HHS Public Access",
        "year": "2018",
        "summary": "Untersuchung der Toxizität von Kava Kava.",
        "url": "/documents/studies/ToxicityofKavaKava.pdf"
    },
    "PublicLegalOpinionLegal_Classification_of_Kava_(Piper_methysticum)_as_a_Food_in_the_EU.pdf": {
        "title": "Legal Classification of Kava (Piper methysticum) as a Food in the EU",
        "authors": "Unknown",
        "publication": "Legal Opinion",
        "year": "Unknown",
        "summary": "Rechtliche Einordnung von Kava als Lebensmittel in der EU.",
        "url": "/documents/studies/PublicLegalOpinionLegal_Classification_of_Kava_(Piper_methysticum)_as_a_Food_in_the_EU.pdf"
    }
}

# List of IDs/Titles to remove
REMOVE_LIST = [
    "kava_novel_food_rechtsgutachten.pdf",
    "kava_novel_food_legal_opinion.pdf",
    "CallforscientificdataforuseinHMPCassessmentworkonPipermethysticumG.Forst.,rhizoma.pdf", # Duplicate
    "final-assessment-report-piper-methysticum-g-forst-rhizoma_en(1).pdf", # Duplicate
    "final-list-references-supporting-assessment-piper-methysticum-g-forst-rhizoma_en(1).pdf", # Duplicate
    "overview-comments-received-draft-public-statement-piper-methysticum-g-forst-rhizoma_en.pdf", # Duplicate
    "public-statement-piper-methysticum-g-forst-rhizoma_en.pdf" # Duplicate check
]

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
        
    updated_studies = []
    seen_titles = set()
    
    for study in studies:
        # Remove unwanted entries
        if study.get('id') in REMOVE_LIST or study.get('title') in REMOVE_LIST:
            print(f"Removing entry: {study.get('title')}")
            continue
            
        # Check for duplicates based on title (normalized)
        title_norm = study.get('title', '').strip().lower()
        if title_norm in seen_titles:
             # Check if it's one of the specific duplicates mentioned
             if "21 november 2017" in title_norm or "22 november 2016" in title_norm:
                 print(f"Removing duplicate: {study.get('title')}")
                 continue
        
        # Apply Fixes
        study_id = study.get('id', '')
        if study_id in FIXES:
            match = FIXES[study_id]
            print(f"Fixing entry: {study.get('title')} -> {match['title']}")
            study['title'] = match['title']
            study['authors'] = match['authors']
            study['publication'] = match['publication']
            study['year'] = match['year']
            study['summary'] = match['summary']
            study['url'] = match['url']
            
        # Fix specific URL issue
        if "O%CC%88ffentlichesGutachten" in study.get('url', ''):
             study['url'] = "/documents/studies/ÖffentlichesGutachtenRechtliche_Einordnung_von_Kava_(Piper_methysticum)_als_Lebensmittel_in_der_EU.pdf"

        # Add to updated list if not skipped
        updated_studies.append(study)
        seen_titles.add(study.get('title', '').strip().lower())

    with open(json_path, 'w') as f:
        json.dump(updated_studies, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully processed studies.json. Total entries: {len(updated_studies)}")

if __name__ == "__main__":
    main()
