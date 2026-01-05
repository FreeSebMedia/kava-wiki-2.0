import json
import os
import subprocess
import re

def extract_text_from_pdf(pdf_path):
    try:
        # Use pdftotext to extract first 2 pages which usually contain title and abstract
        result = subprocess.run(['pdftotext', '-f', '1', '-l', '2', pdf_path, '-'], capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return ""

def clean_text(text):
    # Remove multiple spaces and newlines
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def guess_title(text, filename):
    # Heuristic: Title is often the first significant line, or lines in larger font (which we can't see in plain text)
    # But often in pdftotext, the title is at the very top.
    # We'll take the first non-empty line that looks like a title (not a page number or journal name if possible)
    
    lines = text.split('\n')
    candidates = [l.strip() for l in lines if len(l.strip()) > 10]
    
    if not candidates:
        return filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')
        
    # Return the first candidate that doesn't look like a URL or simple date
    for candidate in candidates[:5]:
        if not candidate.startswith('http') and not candidate.startswith('www'):
            return candidate
            
    return filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')

def extract_abstract(text):
    # Look for "Abstract" or "Summary" keyword
    match = re.search(r'(?:Abstract|Summary|Zusammenfassung)[:\s](.*?)(?:Introduction|Einleitung|Keywords|1\.)', text, re.DOTALL | re.IGNORECASE)
    if match:
        return clean_text(match.group(1))[:500] + "..."
    
    # Fallback: Take the first substantial paragraph after the title
    # This is a rough heuristic
    paragraphs = text.split('\n\n')
    for p in paragraphs[1:5]: # Skip first paragraph (likely title/metadata)
        if len(p) > 100:
            return clean_text(p)[:500] + "..."
            
    return "Zusammenfassung wird generiert..."

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    pdf_dir = "/home/ubuntu/kava-wiki/client/public/documents/studies"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
    
    updated_studies = []
    
    # Create a map of existing IDs to avoid duplicates if needed, 
    # but here we are mainly updating the PDF entries we created earlier
    
    for study in studies:
        # Check if this is a PDF entry (we marked them with type 'pdf_document' or if ID is filename)
        if study.get('type') == 'pdf_document' or study['id'].endswith('.pdf'):
            pdf_filename = study['id']
            pdf_path = os.path.join(pdf_dir, pdf_filename)
            
            if os.path.exists(pdf_path):
                print(f"Analyzing {pdf_filename}...")
                raw_text = extract_text_from_pdf(pdf_path)
                
                # Improve Title
                real_title = guess_title(raw_text, pdf_filename)
                # If the guessed title is too short or looks like garbage, keep the filename-based one but cleaned up
                if len(real_title) < 5: 
                    real_title = study['title']
                
                # Improve Summary
                summary = extract_abstract(raw_text)
                if not summary or len(summary) < 20:
                    summary = "Detaillierte wissenschaftliche Analyse zu diesem Thema. Bitte laden Sie das vollständige PDF für weitere Informationen herunter."
                
                study['title'] = real_title
                study['summary'] = summary
                study['url'] = f"/documents/studies/{pdf_filename}" # Direct link to local PDF
                study['publication'] = "PDF Download" # Indicate it's a file
                
        updated_studies.append(study)
        
    with open(json_path, 'w') as f:
        json.dump(updated_studies, f, indent=2, ensure_ascii=False)
        
    print("Updated studies.json with PDF analysis.")

if __name__ == "__main__":
    main()
