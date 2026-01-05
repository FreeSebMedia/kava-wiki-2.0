import pandas as pd
import json
import os
import glob
import re

def clean_text(text):
    if pd.isna(text):
        return ""
    return str(text).strip()

def process_excel(file_path):
    df = pd.read_excel(file_path)
    studies = []
    
    for _, row in df.iterrows():
        # Extract year from publication date
        pub_date = str(row.get('Publication date', ''))
        year = pub_date.split('-')[0] if '-' in pub_date else pub_date
        
        study = {
            "id": clean_text(row.get('DOI', '')),
            "title": clean_text(row.get('Title', '')),
            "authors": clean_text(row.get('Authors', '')),
            "publication": clean_text(row.get('Journal', '')),
            "year": year,
            "summary": clean_text(row.get('Abstract', '')), # Will need manual refinement or LLM summary later
            "significance": "", # To be filled
            "url": f"https://doi.org/{clean_text(row.get('DOI', ''))}" if row.get('DOI') else "",
            "type": "scientific_paper",
            "category": "Pharmacology & Safety" # Default category, can be refined
        }
        studies.append(study)
    return studies

def process_pdfs(upload_dir):
    pdf_studies = []
    pdf_files = glob.glob(os.path.join(upload_dir, "*.pdf"))
    
    for pdf_path in pdf_files:
        filename = os.path.basename(pdf_path)
        
        # Skip the books as they are handled separately
        if "KavaBuch" in filename or "WurzelderRuhe" in filename:
            continue
            
        # Simple extraction from filename - can be improved
        title = filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')
        
        study = {
            "id": filename,
            "title": title,
            "authors": "",
            "publication": "PDF Document",
            "year": "2025", # Default/Unknown
            "summary": "PDF Document available for download/reference.",
            "significance": "",
            "url": "", # Local file reference or needs upload
            "type": "pdf_document",
            "category": "General Research"
        }
        pdf_studies.append(study)
    return pdf_studies

def main():
    excel_path = "/home/ubuntu/upload/2025-12-16_14-18-25_34_66650823.xlsx"
    upload_dir = "/home/ubuntu/upload"
    output_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    
    all_studies = []
    
    # 1. Add Books (Featured)
    books = [
        {
            "id": "book-lebot",
            "title": "Kava: The Pacific Elixir - The Definitive Guide to Its Ethnobotany, History, and Chemistry",
            "authors": "Vincent Lebot, Mark Merlin, Lamont Lindstrom",
            "publication": "Yale University Press",
            "year": "1997",
            "summary": "Das Standardwerk über Kava. Umfassende Abhandlung über Botanik, Chemie, Ethnobotanik, Anthropologie und Ökonomie von Piper methysticum.",
            "significance": "Das wichtigste wissenschaftliche Referenzwerk für Kava-Forschung.",
            "url": "",
            "type": "book",
            "category": "Standard Works",
            "featured": True
        },
        {
            "id": "book-wurzel-der-ruhe",
            "title": "Kava – Wurzel der Ruhe",
            "authors": "User (Kava-mode.com)",
            "publication": "Self-published",
            "year": "2025",
            "summary": "Ein umfassender Leitfaden zu Wirkung, Anwendung, Geschichte & Kultur.",
            "significance": "Praxisnaher, moderner Leitfaden für deutschsprachige Anwender.",
            "url": "",
            "type": "book",
            "category": "Standard Works",
            "featured": True
        }
    ]
    all_studies.extend(books)
    
    # 2. Process Excel
    if os.path.exists(excel_path):
        print(f"Processing Excel: {excel_path}")
        excel_studies = process_excel(excel_path)
        all_studies.extend(excel_studies)
    
    # 3. Process PDFs
    print(f"Processing PDFs from: {upload_dir}")
    pdf_studies = process_pdfs(upload_dir)
    all_studies.extend(pdf_studies)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Write JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_studies, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully wrote {len(all_studies)} entries to {output_path}")

if __name__ == "__main__":
    main()
