
import pdfplumber

def parse_epfo_and_itr(path):
    epfo_entries = []
    itr_entries = []

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            lines = text.split('\n')

            for line in lines:
                if "Establishment Name" in line or "EPFO" in line:
                    epfo_entries.append(line.strip())
                elif "TDS" in line or "Form 26AS" in line or "Deductor" in line:
                    itr_entries.append(line.strip())

    return {
        "epfo_data": epfo_entries,
        "form26as_data": itr_entries
    }
