import json
import os

# Explicit mapping of filenames/IDs to correct metadata
# Based on user feedback and manual verification
FIXES = {
    "Are-evaluationofkava(Pipermethysticum).pdf": {
        "title": "A re-evaluation of kava (Piper methysticum)",
        "authors": "E. Ernst",
        "publication": "British Journal of Clinical Pharmacology",
        "year": "2007",
        "summary": "Eine systematische Neubewertung der Sicherheit von Kava. Der Autor argumentiert, dass das Verbot von Kava auf einer überzogenen Bewertung der Risiken basierte und dass bei korrekter Anwendung der therapeutische Nutzen die Risiken überwiegt. Die Hepatotoxizität wird als seltenes, idiosynkratisches Ereignis eingestuft.",
        "url": "/documents/studies/Are-evaluationofkava(Pipermethysticum).pdf"
    },
    "AnUpdatedReviewonthePsychoactive,ToxicandAnticancerPropertiesofKava.pdf": {
        "title": "An Updated Review on the Psychoactive, Toxic and Anticancer Properties of Kava",
        "authors": "Rita B. Soares, Ricardo Jorge Dinis-Oliveira, Nuno G. Oliveira",
        "publication": "Journal of Clinical Medicine",
        "year": "2022",
        "summary": "Ein aktueller Review, der die psychoaktiven Wirkungen, die Toxizität und die potenziellen krebshemmenden Eigenschaften von Kava beleuchtet. Die Autoren diskutieren die Mechanismen der Kavalactone und die Kontroverse um die Lebertoxizität.",
        "url": "/documents/studies/AnUpdatedReviewonthePsychoactive,ToxicandAnticancerPropertiesofKava.pdf"
    },
    "PrevalenceandUsePatternsofKava(PiperMethysticum)inaUsNationallyRepresentativeSample.pdf": {
        "title": "Prevalence and Use Patterns of Kava (Piper methysticum) in a US Nationally Representative Sample",
        "authors": "O.A. Ojo, et al.",
        "publication": "Substance Use & Misuse",
        "year": "2021",
        "summary": "Diese Studie untersucht die Verbreitung und Nutzungsmuster von Kava in den USA basierend auf national repräsentativen Daten. Sie zeigt, dass Kava zunehmend als Alternative zu Alkohol und zur Angstlösung genutzt wird.",
        "url": "/documents/studies/PrevalenceandUsePatternsofKava(PiperMethysticum)inaUsNationallyRepresentativeSample.pdf"
    },
    "Kava: a review of the safety of": { # Matching by partial title if ID is messy
        "title": "Kava: a review of the safety of traditional and recreational beverage consumption",
        "authors": "World Health Organization (WHO)",
        "publication": "WHO Technical Report",
        "year": "2016",
        "summary": "Ein umfassender Bericht der WHO, der die Sicherheit von Kava als traditionelles Getränk bestätigt. Der Bericht kommt zu dem Schluss, dass Kava bei traditioneller Zubereitung ein akzeptables Sicherheitsprofil aufweist und Leberprobleme extrem selten sind.",
        "url": "/documents/studies/Kava-areviewofthesafetyoftraditionalandrecreationalbeverageconsumption.pdf"
    },
    "Kava-areviewofthesafetyoftraditionalandrecreationalbeverageconsumption.pdf": {
        "title": "Kava: a review of the safety of traditional and recreational beverage consumption",
        "authors": "World Health Organization (WHO)",
        "publication": "WHO Technical Report",
        "year": "2016",
        "summary": "Ein umfassender Bericht der WHO, der die Sicherheit von Kava als traditionelles Getränk bestätigt. Der Bericht kommt zu dem Schluss, dass Kava bei traditioneller Zubereitung ein akzeptables Sicherheitsprofil aufweist und Leberprobleme extrem selten sind.",
        "url": "/documents/studies/Kava-areviewofthesafetyoftraditionalandrecreationalbeverageconsumption.pdf"
    },
    "AssessmentreportonPipermethysticumG.Forst.,rhizoma.pdf": {
        "title": "Assessment report on Piper methysticum G. Forst., rhizoma",
        "authors": "European Medicines Agency (EMA)",
        "publication": "EMA/HMPC/450589/2016",
        "year": "2016",
        "summary": "Offizieller Bewertungsbericht der EMA über Kava-Wurzelstock. Der Bericht analysiert die verfügbaren Daten zu Wirksamkeit und Sicherheit und bildet die Basis für die regulatorische Einschätzung in der EU.",
        "url": "/documents/studies/AssessmentreportonPipermethysticumG.Forst.,rhizoma.pdf"
    },
    "public-statement-piper-methysticum-g-forst-rhizoma_en.pdf": {
        "title": "Public statement on Piper methysticum G. Forst., rhizoma",
        "authors": "European Medicines Agency (EMA)",
        "publication": "EMA/HMPC/450588/2016",
        "year": "2016",
        "summary": "Öffentliche Stellungnahme der EMA zu Kava. Sie fasst die Bedenken hinsichtlich der Hepatotoxizität zusammen und erklärt, warum Kava derzeit nicht als traditionelles pflanzliches Arzneimittel in der EU registriert werden kann.",
        "url": "/documents/studies/public-statement-piper-methysticum-g-forst-rhizoma_en.pdf"
    },
    "overview-comments-received-draft-public-statement-piper-methysticum-g-forst-rhizoma_en.pdf": {
        "title": "Overview of comments received on draft public statement on Piper methysticum G. Forst., rhizoma",
        "authors": "European Medicines Agency (EMA)",
        "publication": "EMA/HMPC/149766/2017",
        "year": "2017",
        "summary": "Zusammenfassung der Kommentare von Experten und Organisationen zum Entwurf der EMA-Stellungnahme. Enthält wichtige Gegenargumente zur Bewertung der Hepatotoxizität.",
        "url": "/documents/studies/overview-comments-received-draft-public-statement-piper-methysticum-g-forst-rhizoma_en.pdf"
    },
    "Research, Society and Development, v. 10, n. 12, e216101220479, 2021": {
        "title": "Phytochemistry, pharmacology and mechanism of action of Piper methysticum G. Forst (Piperaceae) in the central nervous system",
        "authors": "Research, Society and Development",
        "publication": "Research, Society and Development",
        "year": "2021",
        "summary": "Diese Studie untersucht die phytochemische Zusammensetzung und die pharmakologischen Wirkmechanismen von Kava im Zentralnervensystem, insbesondere die angstlösende und neuroprotektive Wirkung.",
        "url": "/documents/studies/PipermethysticumG.Forst(Piperaceae)inthecentralnervoussystem-phytochemistry,pharmacologyandmechanismofaction.pdf"
    },
    "10.1093/toxsci/kfh067": {
        "title": "In Vitro Toxicity of Kava Alkaloid, Pipermethystine, in HepG2 Cells Compared to Kavalactones",
        "authors": "Nerurkar P.V., Dragull K., Tang C.S.",
        "publication": "Toxicological Sciences",
        "year": "2004",
        "summary": "Die Studie zeigt, dass Pipermethystin (ein Alkaloid aus oberirdischen Pflanzenteilen) in vitro stark zytotoxisch wirkt und ATP-Level sowie Mitochondrienfunktion stört, während Kavalactone (aus der Wurzel) selbst in hohen Konzentrationen keine Toxizität zeigten. Dies deutet darauf hin, dass Pipermethystin zu den seltenen hepatotoxischen Reaktionen beitragen könnte.",
        "url": "https://doi.org/10.1093/toxsci/kfh067"
    },
    "10.1201/9781420023374": {
        "title": "Kava: From Ethnology to Pharmacology",
        "authors": "Yadhu N. Singh (Editor)",
        "publication": "CRC Press",
        "year": "2004",
        "summary": "Ein umfassendes Werk, das Geschichte, Botanik, Chemie und Pharmakologie von Kava behandelt. Es balanciert klinische Studien zu therapeutischen Vorteilen mit einer Bewertung bekannter Nebenwirkungen und Interaktionen.",
        "url": "https://www.taylorfrancis.com/books/edit/10.1201/9780367800994/kava-yadhu-singh"
    },
    "10.5694/j.1326-5377.2003.tb05286.x": {
        "title": "Fatal fulminant hepatic failure induced by a natural therapy containing kava",
        "authors": "Gow P.J., Connelly N.J., Crowley P., Angus P.W., Hill R.L.",
        "publication": "Medical Journal of Australia",
        "year": "2003",
        "summary": "Bericht über den ersten australischen Fall von akutem Leberversagen nach Einnahme eines Kombinationspräparats (Kava + Passionsblume). Die Patientin verstarb nach einer Lebertransplantation. Der Fall unterstreicht die Notwendigkeit, auch bei pflanzlichen Mitteln auf mögliche Hepatotoxizität zu achten.",
        "url": "https://doi.org/10.5694/j.1326-5377.2003.tb05286.x"
    },
    "10.4088/JCP.v64n0215c": {
        "title": "Acute Liver Failure After Administration of the Herbal Tranquilizer Kava-Kava (Piper methysticum)",
        "authors": "Humberston C.L., Akhtar J., Krenzelok E.P.",
        "publication": "Journal of Clinical Psychiatry",
        "year": "2003",
        "summary": "Ein Fallbericht über akutes Leberversagen nach Kava-Einnahme. Die Autoren diskutieren die klinischen Implikationen und warnen vor unkontrollierter Einnahme.",
        "url": "https://doi.org/10.4088/JCP.v64n0215c"
    },
    "10.1124/jpet.103.049072": {
        "title": "Cytochrome P450 2E1 (CYP2E1) Is the Principal Enzyme Responsible for Urethane Metabolism",
        "authors": "Hoffler U., El-Masri H.A., Ghanayem B.I.",
        "publication": "Journal of Pharmacology and Experimental Therapeutics",
        "year": "2003",
        "summary": "Untersuchung zum Metabolismus von Urethan durch CYP2E1. Relevant für Kava, da Kava CYP-Enzyme beeinflussen kann und somit Wechselwirkungen mit anderen Substanzen möglich sind.",
        "url": "https://doi.org/10.1124/jpet.103.049072"
    },
    "10.1001/jama.289.1.36": {
        "title": "Hepatic Toxicity Possibly Associated With Kava-Containing Products—United States, Germany, and Switzerland, 1999-2002",
        "authors": "Centers for Disease Control and Prevention (CDC)",
        "publication": "JAMA",
        "year": "2003",
        "summary": "Bericht der CDC über Fälle von Lebertoxizität in den USA und Europa. Dieser Bericht war maßgeblich für die Warnungen der FDA und anderer Behörden.",
        "url": "https://doi.org/10.1001/jama.289.1.36"
    },
    "10.1097/00004583-200206000-00001": {
        "title": "Kava-Induced Fulminant Hepatic Failure",
        "authors": "Escher M., Desmeules J., Giostra E., Mentha G.",
        "publication": "Journal of the American Academy of Child & Adolescent Psychiatry",
        "year": "2002",
        "summary": "Detaillierter Fallbericht über fulminantes Leberversagen bei einem Patienten, der Kava einnahm. Diskutiert mögliche Mechanismen und Risikofaktoren.",
        "url": "https://doi.org/10.1097/00004583-200206000-00001"
    },
    "10.7326/0003-4819-135-1-200107030-00036": {
        "title": "Kava Hepatotoxicity",
        "authors": "Kraft M., Spahn T.W., Menzel J., et al.",
        "publication": "Annals of Internal Medicine",
        "year": "2001",
        "summary": "Diskussion über die Hepatotoxizität von Kava. Die Autoren analysieren klinische Fälle und fordern strengere Überwachung und Regulierung.",
        "url": "https://doi.org/10.7326/0003-4819-135-1-200107030-00036"
    },
    "10.1007/s100720070109": {
        "title": "Myoglobinuria after ingestion of extracts of guarana, Ginkgo biloba and kava",
        "authors": "Donadio V., Bonsi P., Zele I., et al.",
        "publication": "Neurological Sciences",
        "year": "2000",
        "summary": "Ein seltener Fall von Myoglobinurie (Muskelzerfall) nach Einnahme einer Kombination aus Guarana, Ginkgo und Kava. Zeigt die Risiken von Mehrfachkombinationen auf.",
        "url": "https://doi.org/10.1007/s100720070109"
    },
    "10.1093/ajhp/56.10.957": {
        "title": "Kava: Piper methysticum",
        "authors": "Pepping J.",
        "publication": "American Journal of Health-System Pharmacy",
        "year": "1999",
        "summary": "Ein Übersichtsartikel für Apotheker über die Pharmakologie, klinische Anwendung und Sicherheit von Kava. Fasst den damaligen Wissensstand vor den großen Verboten zusammen.",
        "url": "https://doi.org/10.1093/ajhp/56.10.957"
    },
    "10.1080/004982599238173": {
        "title": "Biotransformation of alprazolam by members of the human cytochrome P4503A subfamily",
        "authors": "Ghibellini G., Vasist L.S., Leslie K.R., et al.",
        "publication": "Xenobiotica",
        "year": "1999",
        "summary": "Untersuchung zum Abbau von Alprazolam durch CYP3A4. Relevant für Kava, da Kava dieses Enzym hemmen kann und somit die Wirkung von Alprazolam verstärken könnte.",
        "url": "https://doi.org/10.1080/004982599238173"
    },
    "10.7326/0003-4819-125-11-199612010-00023": {
        "title": "Coma from the Health Food Store: Interaction between Kava and Alprazolam",
        "authors": "Almeida J.C., Grimsley E.W.",
        "publication": "Annals of Internal Medicine",
        "year": "1996",
        "summary": "Ein klassischer Fallbericht über einen Patienten, der nach der Kombination von Kava und Alprazolam ins Koma fiel. Belegt die potenziell gefährliche Wechselwirkung mit Benzodiazepinen.",
        "url": "https://doi.org/10.7326/0003-4819-125-11-199612010-00023"
    },
    "10.1136/jnnp.58.5.639": {
        "title": "Kava and dopamine antagonism",
        "authors": "Schelosky L., Raffauf C., Jendroska K., Poewe W.",
        "publication": "Journal of Neurology, Neurosurgery & Psychiatry",
        "year": "1995",
        "summary": "Bericht über extrapyramidale Nebenwirkungen (ähnlich Parkinson) bei Kava-Einnahme. Deutet auf einen Dopamin-Antagonismus durch Kavalactone hin.",
        "url": "https://doi.org/10.1136/jnnp.58.5.639"
    },
    "10.1021/jm50002a007": {
        "title": "A Chemical and Pharmacological Investigation of Piper Methysticum Forst",
        "authors": "Klohs M.W., Keller F., Williams R.E.",
        "publication": "Journal of Medicinal Chemistry",
        "year": "1959",
        "summary": "Eine frühe, grundlegende Untersuchung der chemischen Bestandteile und pharmakologischen Wirkungen von Kava. Historisch bedeutsam für die Isolierung von Kavalactonen.",
        "url": "https://doi.org/10.1021/jm50002a007"
    }
}

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
        
    updated_count = 0
    
    for study in studies:
        # Check by ID (filename)
        study_id = study.get('id', '')
        
        # Check by URL (DOI)
        study_url = study.get('url', '')
        
        # Find match in FIXES
        match = None
        if study_id in FIXES:
            match = FIXES[study_id]
        elif study_url in FIXES:
            match = FIXES[study_url]
        # Try matching by partial ID for DOI-based IDs
        else:
            for key in FIXES:
                if key in study_id or key in study_url:
                    match = FIXES[key]
                    break
        
        if match:
            print(f"Fixing entry: {study.get('title', 'Unknown')}")
            study['title'] = match['title']
            study['authors'] = match['authors']
            study['publication'] = match['publication']
            study['year'] = match['year']
            study['summary'] = match['summary']
            # Only update URL if it's a PDF path correction, keep DOI links if they are valid
            if '/documents/studies/' in match['url']:
                 study['url'] = match['url']
            
            updated_count += 1
            
    with open(json_path, 'w') as f:
        json.dump(studies, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully updated {updated_count} entries in studies.json")

if __name__ == "__main__":
    main()
