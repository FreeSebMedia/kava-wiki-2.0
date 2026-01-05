import json
import os
import subprocess
import re

# Load manual data from batches
def load_batch_data():
    manual_data = {}
    
    files = [
        "/home/ubuntu/fetch_study_metadata_batch_1.json",
        "/home/ubuntu/fetch_study_metadata_batch_2.json"
    ]
    
    for file_path in files:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                data = json.load(f)
                for item in data.get('results', []):
                    if not item.get('error'):
                        # Normalize URL/DOI to match ID or existing URL
                        url = item['input']
                        manual_data[url] = item['output']
                        
                        # Also map by DOI if present in URL
                        doi_match = re.search(r'10\.\d{4,}/[-._;()/:a-zA-Z0-9]+', url)
                        if doi_match:
                            manual_data[doi_match.group(0)] = item['output']
                            
    return manual_data

def extract_text_from_pdf(pdf_path):
    try:
        # Extract first 3 pages to be safe
        result = subprocess.run(['pdftotext', '-f', '1', '-l', '3', '-layout', pdf_path, '-'], capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return ""

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

def is_junk_line(line):
    line = line.strip().lower()
    junk_starts = ['downloaded from', 'http', 'www', 'vol.', 'no.', 'pp.', 'page', 'copyright', 'journal of', 'clinical medicine', 'review article', 'original article', 'research article']
    if len(line) < 5: return True
    if any(line.startswith(s) for s in junk_starts): return True
    if re.match(r'^\d+$', line): return True # Page numbers
    return False

def smart_title_extraction(text, filename):
    lines = text.split('\n')
    candidates = []
    
    # Skip first few lines if they look like headers
    start_idx = 0
    for i, line in enumerate(lines[:10]):
        if is_junk_line(line):
            continue
        else:
            start_idx = i
            break
            
    # Collect potential title lines
    title_buffer = []
    for line in lines[start_idx:start_idx+5]:
        if not is_junk_line(line):
            title_buffer.append(line.strip())
        else:
            if title_buffer: break # Stop at first junk line after title start
            
    if title_buffer:
        title = " ".join(title_buffer)
        # Cleanup
        title = re.sub(r'\s+', ' ', title).strip()
        if len(title) > 10:
            return title
            
    # Fallback to filename cleanup
    return filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')

def smart_summary_extraction(text):
    # Try to find Abstract section
    match = re.search(r'(?:Abstract|Summary|Zusammenfassung)\s*\n(.*?)(?:Introduction|Einleitung|Keywords|1\.|Key words)', text, re.DOTALL | re.IGNORECASE)
    if match:
        summary = clean_text(match.group(1))
        if len(summary) > 50:
            return summary[:800] + ("..." if len(summary) > 800 else "")
            
    # Fallback: First substantial paragraph
    paragraphs = text.split('\n\n')
    for p in paragraphs:
        cleaned = clean_text(p)
        if len(cleaned) > 200 and "References" not in cleaned and "Copyright" not in cleaned:
            return cleaned[:800] + "..."
            
    return "Zusammenfassung wird generiert..."

def main():
    json_path = "/home/ubuntu/kava-wiki/client/src/data/studies.json"
    pdf_dir = "/home/ubuntu/kava-wiki/client/public/documents/studies"
    
    with open(json_path, 'r') as f:
        studies = json.load(f)
        
    manual_data = load_batch_data()
    
    updated_studies = []
    
    for study in studies:
        # 1. Apply Manual Data Updates (from Batches)
        # Check if URL or DOI matches
        matched_data = None
        if study.get('url') in manual_data:
            matched_data = manual_data[study['url']]
        else:
            # Try to find DOI in study URL
            doi_match = re.search(r'10\.\d{4,}/[-._;()/:a-zA-Z0-9]+', study.get('url', ''))
            if doi_match and doi_match.group(0) in manual_data:
                matched_data = manual_data[doi_match.group(0)]
                
        if matched_data:
            print(f"Updating {study['title']} with manual data...")
            study['title'] = matched_data['title']
            study['authors'] = matched_data['authors']
            study['publication'] = matched_data['publication']
            study['year'] = matched_data['year']
            study['summary'] = matched_data['summary_de']
            
        # 2. Apply Advanced PDF Analysis
        elif study.get('type') == 'pdf_document' or study['id'].endswith('.pdf'):
            pdf_filename = study['id']
            pdf_path = os.path.join(pdf_dir, pdf_filename)
            
            if os.path.exists(pdf_path):
                print(f"Re-analyzing PDF: {pdf_filename}")
                raw_text = extract_text_from_pdf(pdf_path)
                
                # Only update if we don't have a good title yet (heuristic)
                # Or if the current title looks like a filename
                if study['title'] == pdf_filename or '_' in study['title'] or '.pdf' in study['title']:
                    new_title = smart_title_extraction(raw_text, pdf_filename)
                    study['title'] = new_title
                    
                # Always try to improve summary if it's generic
                if "Zusammenfassung wird generiert" in study['summary'] or len(study['summary']) < 50:
                    study['summary'] = smart_summary_extraction(raw_text)
                    
                study['url'] = f"/documents/studies/{pdf_filename}"
                study['publication'] = "PDF Download"

        updated_studies.append(study)
        
    with open(json_path, 'w') as f:
        json.dump(updated_studies, f, indent=2, ensure_ascii=False)
        
    print("Finished updating studies.json")

if __name__ == "__main__":
    main()
