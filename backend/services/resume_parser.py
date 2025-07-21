
import pdfplumber

def parse_resume(path):
    employers = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
            lines = text.split('\n')
            for line in lines:
                # Simple rule: Look for lines containing 'at' or 'from' as job indicators
                if any(keyword in line.lower() for keyword in [' at ', ' from ', ' - ']):
                    employers.append(line.strip())
    return employers
